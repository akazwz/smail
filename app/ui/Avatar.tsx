import * as stylex from "@stylexjs/stylex";

import { color, radius, text, tone } from "./tokens.stylex.ts";

const styles = stylex.create({
	avatar: {
		display: "grid",
		flexShrink: 0,
		placeContent: "center",
		width: "2.5rem",
		height: "2.5rem",
		borderRadius: radius.full,
		color: color.onTone,
		fontSize: text.md,
		fontWeight: 600,
		lineHeight: 1,
		textTransform: "uppercase",
		userSelect: "none",
	},
	tomato: { backgroundColor: tone.tomato },
	amber: { backgroundColor: tone.amber },
	grass: { backgroundColor: tone.grass },
	teal: { backgroundColor: tone.teal },
	blue: { backgroundColor: tone.blue },
	iris: { backgroundColor: tone.iris },
	plum: { backgroundColor: tone.plum },
	pink: { backgroundColor: tone.pink },
});

// 每种底色的完整样式先算好：StyleX 不能用函数的返回值去取 styles 的下标。
const tones = [
	stylex.attrs(styles.avatar, styles.tomato),
	stylex.attrs(styles.avatar, styles.amber),
	stylex.attrs(styles.avatar, styles.grass),
	stylex.attrs(styles.avatar, styles.teal),
	stylex.attrs(styles.avatar, styles.blue),
	stylex.attrs(styles.avatar, styles.iris),
	stylex.attrs(styles.avatar, styles.plum),
	stylex.attrs(styles.avatar, styles.pink),
];

// FNV-1a，取高位：只看低位的话，结尾相同的地址（都是 .com）会落到同一种颜色上。
function pickTone(seed: string) {
	let hash = 0x811c9dc5;
	for (let index = 0; index < seed.length; index++) {
		hash ^= seed.charCodeAt(index);
		hash = Math.imul(hash, 0x01000193) >>> 0;
	}
	return tones[(hash >>> 16) % tones.length]!;
}

// 用名字的首字母代表一个人或一个发件方。`seed` 决定底色，同一个 seed 颜色不变。
// 纯装饰：旁边总有名字，所以对读屏器隐藏。
export function Avatar(props: { name: string; seed: string }) {
	const initial = () => [...props.name.trim()][0] ?? "?";
	return (
		<span aria-hidden="true" {...pickTone(props.seed)}>
			{initial()}
		</span>
	);
}
