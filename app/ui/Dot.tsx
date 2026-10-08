import * as stylex from "@stylexjs/stylex";

import { color, radius } from "./tokens.stylex.ts";

// 光环用的就是圆点自己的颜色（深色模式下也跟着变），只是越扩越淡。
const pulse = stylex.keyframes({
	"0%": {
		boxShadow: `0 0 0 0 color-mix(in srgb, ${color.live} 45%, transparent)`,
	},
	"70%": {
		boxShadow: `0 0 0 0.375rem color-mix(in srgb, ${color.live} 0%, transparent)`,
	},
	"100%": {
		boxShadow: `0 0 0 0 color-mix(in srgb, ${color.live} 0%, transparent)`,
	},
});

const styles = stylex.create({
	dot: {
		display: "inline-block",
		flexShrink: 0,
		width: "0.5rem",
		height: "0.5rem",
		borderRadius: radius.full,
		backgroundColor: color.accent,
	},
	// 正在工作：向外扩散的一圈。
	live: {
		backgroundColor: color.live,
		animationName: {
			default: pulse,
			"@media (prefers-reduced-motion: reduce)": "none",
		},
		animationDuration: "2s",
		animationIterationCount: "infinite",
	},
	// 停下了：灰色，不动。
	off: { backgroundColor: color.subtle, opacity: 0.6 },
});

// 一个状态点。默认表示“新的”；`tone="live"` 表示此刻正在工作，`tone="off"` 表示停下了。
// 只有它在传达这层意思时才给 label（同时作为悬停提示）；旁边已有文字说明就不用。
export function Dot(props: { label?: string; tone?: "new" | "live" | "off" }) {
	return (
		<span
			role={props.label ? "img" : undefined}
			aria-label={props.label}
			title={props.label}
			aria-hidden={props.label ? undefined : "true"}
			{...stylex.attrs(
				styles.dot,
				props.tone === "live" && styles.live,
				props.tone === "off" && styles.off,
			)}
		/>
	);
}
