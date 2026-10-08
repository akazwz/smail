import * as stylex from "@stylexjs/stylex";

import { color } from "./tokens.stylex.ts";

// 多个组件共用的样式，和组件自己的样式并排使用：
// stylex.attrs(styles.item, base.focusRing)
export const base = stylex.create({
	// 所有可交互元素（包括链接）的键盘焦点环。
	focusRing: {
		outlineColor: color.accent,
		outlineOffset: "2px",
		outlineStyle: { default: "none", ":focus-visible": "solid" },
		outlineWidth: "2px",
	},
	// 只给读屏器读、不显示。
	visuallyHidden: {
		position: "absolute",
		width: "1px",
		height: "1px",
		overflow: "hidden",
		clipPath: "inset(50%)",
		whiteSpace: "nowrap",
	},
});
