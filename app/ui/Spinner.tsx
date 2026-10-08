import * as stylex from "@stylexjs/stylex";

import { base } from "./base.ts";
import { color, radius } from "./tokens.stylex.ts";

const spin = stylex.keyframes({ to: { transform: "rotate(360deg)" } });

const styles = stylex.create({
	spinner: {
		display: "inline-block",
		flexShrink: 0,
		width: "1.25rem",
		height: "1.25rem",
		borderWidth: "2px",
		borderStyle: "solid",
		borderColor: color.border,
		borderBlockStartColor: color.text,
		borderRadius: radius.full,
		animationDuration: {
			default: "700ms",
			"@media (prefers-reduced-motion: reduce)": "2400ms",
		},
		animationIterationCount: "infinite",
		animationName: spin,
		animationTimingFunction: "linear",
	},
});

// 一块区域正在加载。label 是写在区域里的文字：读屏器播报的是 live region 的内容。
export function Spinner(props: { label: string }) {
	return (
		<span role="status" {...stylex.attrs(styles.spinner)}>
			<span {...stylex.attrs(base.visuallyHidden)}>{props.label}</span>
		</span>
	);
}
