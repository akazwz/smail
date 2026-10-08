import * as stylex from "@stylexjs/stylex";

import { base } from "./base.ts";
import { Icon } from "./Icon.tsx";
import { color, radius, space, text } from "./tokens.stylex.ts";

const styles = stylex.create({
	card: {
		display: "grid",
		gridTemplateRows: "auto auto 1fr auto",
		gap: space.md,
		height: "100%",
		padding: space.xl,
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: { default: color.border, ":hover": color.borderStrong },
		borderRadius: radius.md,
		backgroundColor: color.raised,
		color: color.text,
		textDecoration: "none",
		transitionDuration: "120ms",
		transitionProperty: "border-color",
	},
	meta: {
		color: color.subtle,
		fontSize: text.sm,
		fontVariantNumeric: "tabular-nums",
	},
	title: {
		fontSize: text.lg,
		fontWeight: 600,
		letterSpacing: "-0.01em",
		lineHeight: 1.35,
		textWrap: "balance",
		// 中日韩文字只在标点和空格处换行，不把一个词拆到两行。
		wordBreak: "keep-all",
		overflowWrap: "anywhere",
	},
	note: { color: color.muted, lineHeight: 1.6 },
	action: {
		display: "inline-flex",
		alignItems: "center",
		gap: space.xxs,
		fontSize: text.sm,
		fontWeight: 600,
	},
});

// 整张都是链接的卡片：文章列表这类“标题 + 摘要”的条目。
// 一行里的几张卡片等高，`action` 始终贴在底部。
export function CardLink(props: {
	href: string;
	title: string;
	meta?: string;
	note?: string;
	action?: string;
}) {
	return (
		<a href={props.href} {...stylex.attrs(styles.card, base.focusRing)}>
			<span {...stylex.attrs(styles.meta)}>{props.meta}</span>
			<span {...stylex.attrs(styles.title)}>{props.title}</span>
			<span {...stylex.attrs(styles.note)}>{props.note}</span>
			{props.action && (
				<span {...stylex.attrs(styles.action)}>
					{props.action}
					<Icon name="forward" size={14} />
				</span>
			)}
		</a>
	);
}
