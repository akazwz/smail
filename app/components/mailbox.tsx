import type { JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { createSignal, Show } from "solid-js";

import { type Locale, toIntlLocale } from "#/i18n/config.ts";
import { useDictionary } from "#/i18n/dictionary.ts";
import { Button } from "#/ui/Button.tsx";
import { ConfirmDialog } from "#/ui/ConfirmDialog.tsx";
import { Dot } from "#/ui/Dot.tsx";
import { Icon } from "#/ui/Icon.tsx";
import { Skeleton } from "#/ui/Skeleton.tsx";
import { color, radius, shadow, space, text } from "#/ui/tokens.stylex.ts";
import type { InboxController } from "#/utils/inbox.ts";
import { useLocale } from "#/utils/locale.ts";
import { fillTemplate } from "#/utils/template.ts";

const NARROW = "@media (max-width: 640px)";
// 这个宽度以下，地址独占一行，按钮在它下面。用屏幕宽度来定，不看内容有多长：
// 这样没有地址、占位、有地址三种状态下一定是同一种排法。
const STACKED = "@media (max-width: 720px)";

const spin = stylex.keyframes({ to: { transform: "rotate(360deg)" } });

const styles = stylex.create({
	// 整个邮箱是一个“窗口”：上面是地址栏，下面是收件箱。
	window: {
		width: "100%",
		maxWidth: "54rem",
		marginInline: "auto",
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: color.border,
		borderRadius: radius.lg,
		backgroundColor: color.raised,
		boxShadow: shadow.floating,
		overflow: "clip",
		textAlign: "start",
	},
	// 收件箱那一块。只用来给提示条定位。
	stage: { position: "relative" },
	// 操作没成功时浮在收件箱顶上的一句话，紧挨着上面那排按钮。
	// 浮在上面、不占位置：窗口的尺寸不能因为它变；也不放进会滚动的那一层，免得被滚走。
	notice: {
		position: "absolute",
		insetBlockStart: space.md,
		insetInline: space.lg,
		width: "fit-content",
		maxWidth: `calc(100% - 2 * ${space.lg})`,
		marginBlock: 0,
		marginInline: "auto",
		paddingBlock: space.sm,
		paddingInline: space.lg,
		borderRadius: radius.full,
		backgroundColor: color.text,
		boxShadow: shadow.raised,
		color: color.bg,
		fontSize: text.sm,
		lineHeight: 1.4,
		textAlign: "center",
	},
	bar: {
		display: "flex",
		flexWrap: { default: "nowrap", [STACKED]: "wrap" },
		alignItems: "center",
		columnGap: space.lg,
		rowGap: space.md,
		paddingBlock: space.lg,
		paddingInline: { default: space.xl, [NARROW]: space.lg },
		borderBlockEndWidth: "1px",
		borderBlockEndStyle: "solid",
		borderBlockEndColor: color.border,
		backgroundColor: color.surface,
	},
	mark: {
		display: { default: "grid", [STACKED]: "none" },
		flexShrink: 0,
		placeContent: "center",
		width: "2.5rem",
		height: "2.5rem",
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: color.border,
		borderRadius: radius.full,
		backgroundColor: color.raised,
		color: color.muted,
	},
	// 地址的位置：占满这一行剩下的宽度。它是一个尺寸容器，里面那一行的字号按它的宽度算。
	slot: {
		containerType: "inline-size",
		flexBasis: { default: 0, [STACKED]: "100%" },
		flexGrow: 1,
		minWidth: 0,
	},
	// 地址这一行。字号跟着可用宽度缩放，保证地址排成一行不折行——折行会让地址栏变高，
	// 而占位块只有一行，刷新时下面的内容就会跳一下。
	// 19 是量出来的：新生成的地址最宽约 18em（见 worker/src/address.ts 里对名字长度的限制）。
	// 里面放的是地址、提示语还是占位块，这一行都一样高。
	line: {
		display: "flex",
		alignItems: "center",
		minWidth: 0,
		minHeight: "1.3em",
		fontSize: "clamp(0.8125rem, calc(100cqi / 19), 1.375rem)",
	},
	address: {
		minWidth: 0,
		margin: 0,
		fontWeight: 600,
		letterSpacing: "-0.01em",
		lineHeight: 1.3,
		// 早先生成的地址可能更长，实在放不下才折行。
		overflowWrap: "anywhere",
		userSelect: "all",
	},
	domain: { color: color.accentText },
	placeholder: {
		minWidth: 0,
		margin: 0,
		overflow: "hidden",
		color: color.muted,
		fontSize: "min(0.9375rem, 1em)",
		lineHeight: 1.3,
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
	},
	// 按钮的位置：高度按最高的那个按钮（“生成地址”）算，换成小按钮或占位块也不变。
	actions: {
		display: "flex",
		flexShrink: 0,
		alignItems: "center",
		gap: space.xs,
		minHeight: "2.75rem",
	},
	group: { display: "flex", flexGrow: 1, alignItems: "center", gap: space.xs },
	ghostAddress: { width: "min(100%, 14em)", height: "0.8em" },
	ghostCopy: { width: "4.75rem", height: "2rem" },
	ghostIcon: { width: "2rem", height: "2rem" },
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		gap: space.md,
		paddingBlock: space.sm,
		paddingInlineStart: { default: space.xl, [NARROW]: space.lg },
		paddingInlineEnd: { default: space.md, [NARROW]: space.sm },
		borderBlockEndWidth: "1px",
		borderBlockEndStyle: "solid",
		borderBlockEndColor: color.border,
	},
	// 最小高度等于右边的刷新按钮：没有地址时右边是空的，这一行也不变矮。
	heading: {
		display: "flex",
		alignItems: "center",
		gap: space.sm,
		minWidth: 0,
		minHeight: "2rem",
	},
	// 标题不折行，放不下就省略：折成两行会让这一行变高，而没有地址时右边是空的、不会折，
	// 两种状态高度就不一样了。
	title: {
		minWidth: 0,
		margin: 0,
		overflow: "hidden",
		color: color.subtle,
		fontSize: text.sm,
		fontWeight: 600,
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
	},
	tools: {
		display: "flex",
		flexShrink: 0,
		alignItems: "center",
		gap: space.sm,
	},
	// 窄屏上把位置让给标题：时间是次要信息。
	time: {
		display: { default: "inline", "@media (max-width: 480px)": "none" },
		color: color.subtle,
		fontSize: text.sm,
		fontVariantNumeric: "tabular-nums",
		whiteSpace: "nowrap",
	},
	// 高度固定：没有地址、正在取、空收件箱、很多邮件，窗口都一样高；邮件多了在里面滚动。
	body: {
		display: "grid",
		gridTemplateColumns: "minmax(0, 1fr)",
		height: { default: "24rem", [NARROW]: "22rem" },
		overflowY: "auto",
	},
	still: { display: "grid" },
	spinning: {
		animationName: {
			default: spin,
			"@media (prefers-reduced-motion: reduce)": "none",
		},
		animationDuration: "800ms",
		animationIterationCount: "infinite",
		animationTimingFunction: "linear",
	},
});

function formatRefreshTime(timestamp: number, locale: Locale): string {
	// 访客自己的时区。收件箱只在浏览器里取，没有“服务端渲染的时间和浏览器对不上”的问题。
	return new Date(timestamp).toLocaleTimeString(toIntlLocale(locale), {
		hour: "2-digit",
		minute: "2-digit",
	});
}

// 首页的主角：一个邮箱“窗口”。地址栏在上（地址和它的操作），收件箱在下（`children` 是
// 邮件列表或空状态）。状态和操作都来自 `inbox`（见 app/utils/inbox.ts）。
//
// 窗口在各种状态下尺寸都一样，拿到地址、收到邮件前后页面不会跳。
//
// 首页是同一份静态 HTML。已有地址的访客在收件箱取回之前看到的是占位块：
// 带 data-guest 的是“没有地址”的内容，带 data-pending 的是占位块，
// 两者由 <html> 上的 data-inbox 二选一（见 global.css）。
export function Mailbox(props: {
	inbox: InboxController;
	children: JSX.Element;
}) {
	const locale = useLocale();
	const { home: copy, common } = useDictionary();
	const [copied, setCopied] = createSignal(false);
	// 正在等用户确认的那个不可撤销的操作。
	const [confirming, setConfirming] = createSignal<"replace" | "delete" | null>(
		null,
	);

	const { inbox, address, live, refreshing, pending, failed } = props.inbox;
	const busy = () => pending() !== null;

	const copyAddress = async (value: string) => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			// 剪贴板不可用时地址本身仍然可以手动选中
		}
	};

	const confirm = () => {
		const intent = confirming();
		setConfirming(null);
		if (intent === "replace") {
			props.inbox.replace();
		} else if (intent === "delete") {
			props.inbox.remove();
		}
	};

	return (
		<>
			<div {...stylex.attrs(styles.window)}>
				<div {...stylex.attrs(styles.bar)}>
					<span aria-hidden="true" {...stylex.attrs(styles.mark)}>
						<Icon name="mail" size={18} />
					</span>
					<div {...stylex.attrs(styles.slot)}>
						<div {...stylex.attrs(styles.line)}>
							<Show
								when={address()}
								fallback={
									<>
										<p data-guest="" {...stylex.attrs(styles.placeholder)}>
											{copy.noAddressTitle}
										</p>
										<span data-pending="" {...stylex.attrs(styles.group)}>
											<Skeleton xstyle={styles.ghostAddress} />
										</span>
									</>
								}
							>
								{(current) => (
									<p {...stylex.attrs(styles.address)}>
										{current().slice(0, current().lastIndexOf("@"))}
										<span {...stylex.attrs(styles.domain)}>
											{current().slice(current().lastIndexOf("@"))}
										</span>
									</p>
								)}
							</Show>
						</div>
					</div>
					<div {...stylex.attrs(styles.actions)}>
						<Show
							when={address()}
							fallback={
								<>
									<div data-guest="" {...stylex.attrs(styles.group)}>
										{/* 没取到不等于没有地址：这时不让生成，免得把原来的地址顶掉。 */}
										<Button
											disabled={busy() || inbox().status === "failed"}
											onClick={() => props.inbox.generate()}
										>
											<Icon name="plus" size={16} />
											{pending() === "generate"
												? copy.generating
												: copy.generateAddress}
										</Button>
									</div>
									<div data-pending="" {...stylex.attrs(styles.group)}>
										<Skeleton shape="round" xstyle={styles.ghostCopy} />
										<Skeleton shape="round" xstyle={styles.ghostIcon} />
										<Skeleton shape="round" xstyle={styles.ghostIcon} />
									</div>
								</>
							}
						>
							{(current) => (
								<>
									<Button size="sm" onClick={() => copyAddress(current())}>
										<Icon name={copied() ? "check" : "copy"} size={14} />
										{copied() ? copy.copied : copy.copy}
									</Button>
									{/* 换地址和删地址都没法撤销：先问一句，确认了才做。 */}
									<Button
										variant="quiet"
										size="sm"
										icon
										aria-label={copy.replaceAddress}
										title={copy.replaceAddress}
										disabled={busy()}
										onClick={() => setConfirming("replace")}
									>
										<Icon name="shuffle" size={16} />
									</Button>
									<Button
										variant="quiet"
										size="sm"
										icon
										aria-label={copy.deleteAddress}
										title={copy.deleteAddress}
										disabled={busy()}
										onClick={() => setConfirming("delete")}
									>
										<Icon name="trash" size={16} />
									</Button>
								</>
							)}
						</Show>
					</div>
				</div>
				<div {...stylex.attrs(styles.toolbar)}>
					<div {...stylex.attrs(styles.heading)}>
						<h2 {...stylex.attrs(styles.title)}>{copy.inboxTitle}</h2>
						<Show when={live() !== "pending"}>
							<Dot
								tone={live() === "live" ? "live" : "off"}
								label={live() === "live" ? copy.liveOn : copy.liveOff}
							/>
						</Show>
					</div>
					<Show when={address()}>
						<div {...stylex.attrs(styles.tools)}>
							<span {...stylex.attrs(styles.time)}>
								{formatRefreshTime(inbox().renderedAt, locale())}
							</span>
							<Button
								variant="quiet"
								size="sm"
								onClick={() => props.inbox.refresh()}
								disabled={refreshing()}
							>
								<span
									{...stylex.attrs(
										styles.still,
										refreshing() && styles.spinning,
									)}
								>
									<Icon name="refresh" size={14} />
								</span>
								{refreshing() ? copy.refreshingInbox : copy.refreshInbox}
							</Button>
						</div>
					</Show>
				</div>
				<div {...stylex.attrs(styles.stage)}>
					<div {...stylex.attrs(styles.body)}>{props.children}</div>
					<div role="status" aria-live="polite">
						<Show when={failed()}>
							<p {...stylex.attrs(styles.notice)}>{copy.actionFailed}</p>
						</Show>
					</div>
				</div>
			</div>

			<ConfirmDialog
				open={confirming() !== null}
				title={
					confirming() === "delete"
						? copy.deleteConfirmTitle
						: copy.replaceConfirmTitle
				}
				confirmLabel={
					confirming() === "delete" ? copy.deleteAddress : copy.replaceAddress
				}
				cancelLabel={common.cancel}
				danger
				onCancel={() => setConfirming(null)}
				onConfirm={confirm}
			>
				{fillTemplate(copy.confirmBody, { address: address() ?? "" })}
			</ConfirmDialog>
		</>
	);
}
