import * as stylex from "@stylexjs/stylex";
import { Show } from "solid-js";

import { color, space, text } from "./tokens.stylex.ts";

const styles = stylex.create({
	brand: {
		display: "inline-flex",
		alignItems: "center",
		gap: space.sm,
		color: color.text,
	},
	mark: { display: "block", flexShrink: 0 },
	tile: { fill: color.text },
	envelope: { fill: color.bg },
	flap: { stroke: color.text },
	// 橙色的未读点，外面一圈和底色相同的描边把它和信封隔开。
	dot: { fill: color.accent, stroke: color.text },
	wordmark: { fontSize: text.lg, fontWeight: 700, letterSpacing: "-0.02em" },
	// 域名里的点用强调色：和图标里的那个点是同一个。
	wordmarkDot: { color: color.accent },
});

// 站点标志和字标。图形和 public/favicon.svg 是同一个：一只信封，右上角一个橙色的未读点。
// `name` 是站名，通常就是域名；里面的第一个点会用强调色显示。
export function Brand(props: { name: string }) {
	const dot = () => props.name.indexOf(".");
	return (
		<span {...stylex.attrs(styles.brand)}>
			<svg
				viewBox="0 0 32 32"
				width="28"
				height="28"
				aria-hidden="true"
				{...stylex.attrs(styles.mark)}
			>
				<rect width="32" height="32" rx="9" {...stylex.attrs(styles.tile)} />
				<rect
					x="6.5"
					y="9.5"
					width="19"
					height="14"
					rx="3.2"
					{...stylex.attrs(styles.envelope)}
				/>
				<path
					fill="none"
					stroke-width="2.2"
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m9.6 13 6.4 4.6 6.4-4.6"
					{...stylex.attrs(styles.flap)}
				/>
				<circle
					cx="25"
					cy="9.4"
					r="3.6"
					stroke-width="1.6"
					{...stylex.attrs(styles.dot)}
				/>
			</svg>
			<span {...stylex.attrs(styles.wordmark)}>
				<Show when={dot() > 0} fallback={props.name}>
					{props.name.slice(0, dot())}
					<span {...stylex.attrs(styles.wordmarkDot)}>.</span>
					{props.name.slice(dot() + 1)}
				</Show>
			</span>
		</span>
	);
}
