import * as stylex from "@stylexjs/stylex";
import { createMemo, Errored, Loading, Show } from "solid-js";

import { getEmailBody } from "#/data.ts";
import type { Dictionary } from "#/i18n/dictionary.ts";
import { Spinner } from "#/ui/Spinner.tsx";
import { color, radius, space, text } from "#/ui/tokens.stylex.ts";
import type { Email } from "#contract";

const styles = stylex.create({
	details: {
		display: "grid",
		gridTemplateColumns: {
			default: "repeat(2, minmax(0, 1fr))",
			"@media (max-width: 640px)": "minmax(0, 1fr)",
		},
		gap: space.md,
		margin: 0,
	},
	detail: { display: "grid", gap: space.xxs, minWidth: 0 },
	label: { color: color.subtle, fontSize: text.xs },
	value: {
		margin: 0,
		fontSize: text.sm,
		fontVariantNumeric: "tabular-nums",
		overflowWrap: "anywhere",
	},
	frame: {
		display: "block",
		width: "100%",
		height: "min(60dvh, 40rem)",
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: color.border,
		borderRadius: radius.sm,
		backgroundColor: color.paper,
	},
	placeholder: {
		display: "grid",
		placeItems: "center",
		height: "min(60dvh, 40rem)",
		borderWidth: "1px",
		borderStyle: "dashed",
		borderColor: color.borderStrong,
		borderRadius: radius.sm,
		color: color.muted,
		fontSize: text.sm,
	},
});

/** 对话框里的一封邮件：发件人、时间，正文放在沙箱 iframe 里（只能点链接开新标签页）。 */
export function EmailView(props: {
	email: Email;
	copy: Dictionary["home"]["modal"];
}) {
	const body = createMemo(() => getEmailBody(props.email.id));

	const empty = () => (
		<div {...stylex.attrs(styles.placeholder)}>{props.copy.empty}</div>
	);

	return (
		<>
			<dl {...stylex.attrs(styles.details)}>
				<div {...stylex.attrs(styles.detail)}>
					<dt {...stylex.attrs(styles.label)}>{props.copy.from}</dt>
					<dd {...stylex.attrs(styles.value)}>
						{props.email.from_name} &lt;{props.email.from_address}&gt;
					</dd>
				</div>
				<div {...stylex.attrs(styles.detail)}>
					<dt {...stylex.attrs(styles.label)}>{props.copy.time}</dt>
					<dd {...stylex.attrs(styles.value)}>
						{new Date(props.email.time).toLocaleString()}
					</dd>
				</div>
			</dl>
			<Errored fallback={empty()}>
				<Loading
					fallback={
						<div {...stylex.attrs(styles.placeholder)}>
							<Spinner label={props.copy.loading} />
						</div>
					}
				>
					<Show when={body()} fallback={empty()}>
						{(html) => (
							<iframe
								srcdoc={html()}
								title={props.copy.title}
								// 不给脚本、表单、同源等任何权限，只允许点链接时开新标签页，
								// 而且新标签页不继承沙箱（否则目标网站也用不了）。
								sandbox="allow-popups allow-popups-to-escape-sandbox"
								referrerpolicy="no-referrer"
								{...stylex.attrs(styles.frame)}
							/>
						)}
					</Show>
				</Loading>
			</Errored>
		</>
	);
}
