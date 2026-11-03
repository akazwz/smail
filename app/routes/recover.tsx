import { useNavigate } from "@solidjs/router";
import * as stylex from "@stylexjs/stylex";
import { createSignal, onSettled, Show } from "solid-js";

import { Page, PageIntro } from "#/components/page.tsx";
import { recoverAddress } from "#/data.ts";
import { toLocalePath } from "#/i18n/config.ts";
import { useDictionary } from "#/i18n/dictionary.ts";
import { Button, ButtonLink } from "#/ui/Button.tsx";
import { ConfirmDialog } from "#/ui/ConfirmDialog.tsx";
import { color, space, text } from "#/ui/tokens.stylex.ts";
import { usePageHead } from "#/utils/head.ts";
import { readInboxMarker } from "#/utils/inbox.ts";
import { useLocale } from "#/utils/locale.ts";
import { RECOVERY_TOKEN_PATTERN } from "#contract";

const styles = stylex.create({
	footer: {
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
		gap: space.md,
	},
	status: {
		margin: 0,
		maxWidth: "36rem",
		color: color.muted,
		fontSize: text.sm,
		lineHeight: 1.5,
	},
});

type Status = "waiting" | "ready" | "working" | "invalid" | "failed";

// 地址恢复页。访客丢了地址来求助，站长核实后发来一条链接（/recover#<token>），打开就是这一页。
// 打开时什么都不做，点了按钮才去兑换：聊天软件生成链接预览时不会把它用掉。
// token 只留在内存里。
export default function RecoverPage() {
	const locale = useLocale();
	const navigate = useNavigate();
	const { recover: copy, common } = useDictionary();
	// 预渲染出来的页面还没读链接，按钮先不能点。
	const [status, setStatus] = createSignal<Status>("waiting");
	const [confirming, setConfirming] = createSignal(false);
	let token = "";

	usePageHead(() => ({
		title: copy.metaTitle,
		description: copy.description,
		robots: "noindex, nofollow",
	}));

	// 读链接里的 token，读到就从地址栏去掉。
	// 页面已经开着时（比如刷新后显示无效，访客又在同一个标签页点了原链接），只有 # 后面变了，
	// 浏览器不会重新加载页面，只发一个 hashchange，所以也要在那时再读一遍。
	const readToken = (initial: boolean) => {
		const hash = location.hash.slice(1);
		if (!initial && (!hash || status() === "working")) {
			return;
		}
		if (hash) {
			history.replaceState(history.state, "", location.pathname);
		}
		if (RECOVERY_TOKEN_PATTERN.test(hash)) {
			token = hash;
			setStatus("ready");
		} else {
			setStatus("invalid");
		}
	};

	onSettled(() => {
		readToken(true);
		const onHashChange = () => readToken(false);
		window.addEventListener("hashchange", onHashChange);
		return () => window.removeEventListener("hashchange", onHashChange);
	});

	const redeem = async () => {
		setConfirming(false);
		setStatus("working");
		try {
			if (await recoverAddress(token)) {
				navigate(toLocalePath("/", locale()), { replace: true });
			} else {
				setStatus("invalid");
			}
		} catch {
			setStatus("failed");
		}
	};

	// 这个浏览器已经有地址时，恢复会把它换掉，没法撤销，先问一句。
	const start = () => {
		if (readInboxMarker() === "1") {
			setConfirming(true);
		} else {
			void redeem();
		}
	};

	const feedback = () => {
		switch (status()) {
			case "invalid":
				return copy.invalid;
			case "failed":
				return copy.failed;
			default:
				return "";
		}
	};

	return (
		<Page>
			<PageIntro title={copy.title} lead={copy.description}>
				<div {...stylex.attrs(styles.footer)}>
					<Show
						when={status() !== "invalid"}
						fallback={
							<ButtonLink href={toLocalePath("/contact", locale())}>
								{copy.contactCta}
							</ButtonLink>
						}
					>
						<Button
							disabled={status() !== "ready" && status() !== "failed"}
							onClick={start}
						>
							{status() === "working" ? copy.working : copy.action}
						</Button>
					</Show>
				</div>
				<p role="status" {...stylex.attrs(styles.status)}>
					{feedback()}
				</p>
			</PageIntro>
			<ConfirmDialog
				open={confirming()}
				title={copy.replaceConfirmTitle}
				confirmLabel={copy.action}
				cancelLabel={common.cancel}
				danger
				onCancel={() => setConfirming(false)}
				onConfirm={() => void redeem()}
			>
				{copy.replaceConfirmBody}
			</ConfirmDialog>
		</Page>
	);
}
