import type { JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";

import { Dot } from "./Dot.tsx";
import { color, radius, space, text } from "./tokens.stylex.ts";

const styles = stylex.create({
	badge: {
		display: "inline-flex",
		alignItems: "center",
		gap: space.sm,
		paddingBlock: space.xs,
		paddingInline: space.md,
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: color.border,
		borderRadius: radius.full,
		backgroundColor: color.raised,
		color: color.muted,
		fontSize: text.sm,
		lineHeight: 1.4,
		whiteSpace: "nowrap",
	},
});

// 一枚胶囊形的小标签：一句简短的状态或属性。`dot` 在前面加一个状态点。
export function Badge(props: { children: JSX.Element; dot?: "new" | "live" }) {
	return (
		<span {...stylex.attrs(styles.badge)}>
			{props.dot && <Dot tone={props.dot} />}
			{props.children}
		</span>
	);
}
