import type { JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";

import { color, radius, space } from "./tokens.stylex.ts";

const styles = stylex.create({
	card: {
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: color.border,
		borderRadius: radius.md,
		backgroundColor: color.raised,
		// 贴边的内容（标题栏、列表行的悬停底色）跟着卡片的圆角裁掉。
		overflow: "clip",
	},
	padded: {
		padding: { default: space.xxl, "@media (max-width: 640px)": space.xl },
	},
	compact: { padding: space.xl },
});

// 浮在页面上的一块内容区，把一组相关的东西和周围分开。
// `padding="none"` 给自带标题栏或分隔线列表的内容用，由内容自己贴边。
export function Card(props: {
	children: JSX.Element;
	padding?: "normal" | "compact" | "none";
	xstyle?: stylex.StyleXStyles;
}) {
	return (
		<div
			{...stylex.attrs(
				styles.card,
				props.padding === "compact" && styles.compact,
				props.padding === undefined && styles.padded,
				props.padding === "normal" && styles.padded,
				props.xstyle,
			)}
		>
			{props.children}
		</div>
	);
}
