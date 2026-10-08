import * as stylex from "@stylexjs/stylex";

import { color, radius } from "./tokens.stylex.ts";

const pulse = stylex.keyframes({ "50%": { opacity: 0.55 } });

const styles = stylex.create({
	block: {
		display: "inline-block",
		flexShrink: 0,
		maxWidth: "100%",
		height: "0.75em",
		borderRadius: radius.xs,
		backgroundColor: color.border,
		verticalAlign: "middle",
		animationName: {
			default: pulse,
			"@media (prefers-reduced-motion: reduce)": "none",
		},
		animationDuration: "1.6s",
		animationIterationCount: "infinite",
		animationTimingFunction: "ease-in-out",
	},
	round: { borderRadius: radius.full },
});

// 内容还没到时占住位置的灰块，内容到了页面不会跳。
// 默认是一行文字里的一段：放在文字原本所在的元素里，高度跟着字号走，不改变行高。
// `shape="round"` 两头全圆，用来占头像和按钮的位置。宽高用 `xstyle` 给。
export function Skeleton(props: {
	shape?: "line" | "round";
	xstyle?: stylex.StyleXStyles;
}) {
	return (
		<span
			aria-hidden="true"
			{...stylex.attrs(
				styles.block,
				props.shape === "round" && styles.round,
				props.xstyle,
			)}
		/>
	);
}
