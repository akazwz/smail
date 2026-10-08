import * as stylex from "@stylexjs/stylex";

// 设计变量。组件只引用这里的变量，不写死颜色、间距、圆角；
// 换肤时用 stylex.createTheme() 覆盖其中一组即可。
//
// 视觉基调：暖白纸色配墨黑，橙色只做点缀（域名、状态点、焦点环）。
// 层次靠字号和留白，不靠方框。

const DARK = "@media (prefers-color-scheme: dark)";

export const color = stylex.defineVars({
	bg: { default: "#faf9f6", [DARK]: "#0e0e0d" },
	// 悬停和轻微强调的填充。
	surface: { default: "#f1efe8", [DARK]: "#1a1917" },
	// 浮在页面之上的东西（对话框）。
	raised: { default: "#ffffff", [DARK]: "#181715" },
	border: { default: "#e6e3da", [DARK]: "#272622" },
	borderStrong: { default: "#cfcbbf", [DARK]: "#3b3934" },
	text: { default: "#16150f", [DARK]: "#f2f1ec" },
	muted: { default: "#5f5d55", [DARK]: "#a8a69c" },
	// 最弱的文字，用在 12–13px 的辅助信息上；在 bg 和 raised 上仍有 4.5:1。
	subtle: { default: "#74726a", [DARK]: "#8b897f" },
	// accent 是填充色，上面的文字用 onAccent。带强调色的文字用 accentText。
	accent: "#ff5a1f",
	accentText: { default: "#c2410c", [DARK]: "#ff7a45" },
	onAccent: "#16150f",
	// 没法撤销的操作（确认框里的确认按钮）。上面的文字用 onDanger。
	danger: { default: "#c62828", [DARK]: "#d32f2f" },
	onDanger: "#ffffff",
	// “正在工作”的状态点。
	live: { default: "#2b9a66", [DARK]: "#3dd68c" },
	// 头像底色（下面的 tone）上面的字。
	onTone: "#ffffff",
	// 邮件正文的底：邮件自带的样式按白底设计，深色模式下也保持白色。
	paper: "#ffffff",
	scrim: "rgb(0 0 0 / 0.55)",
});

// 头像底色。发件人地址决定用哪一个，同一个发件人始终是同一种颜色。
// 每一个都足够深，上面的白字有 4.5:1。
export const tone = stylex.defineVars({
	tomato: "#c8442b",
	amber: "#a85d0a",
	grass: "#3a7d44",
	teal: "#0f7b6f",
	blue: "#1f6fc2",
	iris: "#5753c6",
	plum: "#9c44a8",
	pink: "#bd3a86",
});

export const space = stylex.defineVars({
	xxs: "0.125rem",
	xs: "0.25rem",
	sm: "0.5rem",
	md: "0.75rem",
	lg: "1rem",
	xl: "1.5rem",
	xxl: "2.5rem",
	// 页面大区块之间的距离。
	section: { default: "5rem", "@media (max-width: 640px)": "3.5rem" },
});

// 页面骨架：全站共用的内容宽度和左右留白，页眉、正文、页脚靠它对齐。
export const frame = stylex.defineVars({
	width: "72rem",
	gutter: { default: "2.5rem", "@media (max-width: 640px)": "1.5rem" },
});

export const radius = stylex.defineVars({
	xs: "0.375rem",
	sm: "0.625rem",
	md: "1rem",
	lg: "1.25rem",
	full: "9999px",
});

export const text = stylex.defineVars({
	xs: "0.75rem",
	sm: "0.8125rem",
	md: "0.9375rem",
	lg: "1.0625rem",
	xl: "1.375rem",
	// 页面主标题，随视口缩放。
	display: "clamp(2rem, 1.2rem + 4vw, 3.25rem)",
	// 首页那一句大标题。
	hero: "clamp(2.125rem, 1.1rem + 4.4vw, 3.5rem)",
});

export const font = stylex.defineVars({
	// 全站只用这一套系统字体。不要在这里点名中日韩字体：点了名，日语页面里的汉字
	// 会被排在前面的中文字体抢走。不点名时浏览器按页面的 lang 自己挑对应语言的字体。
	body: "system-ui, -apple-system, sans-serif",
});

export const shadow = stylex.defineVars({
	// 页面上唯一的主角（首页的邮箱窗口）：更大、更柔的一层。
	floating: {
		default:
			"0 1px 1px rgb(22 21 15 / 0.04), 0 8px 24px rgb(22 21 15 / 0.06), 0 32px 80px rgb(22 21 15 / 0.08)",
		[DARK]:
			"0 1px 1px rgb(0 0 0 / 0.5), 0 8px 24px rgb(0 0 0 / 0.4), 0 32px 80px rgb(0 0 0 / 0.5)",
	},
	raised: {
		default: "0 1px 2px rgb(22 21 15 / 0.05), 0 12px 40px rgb(22 21 15 / 0.12)",
		[DARK]: "0 1px 2px rgb(0 0 0 / 0.4), 0 12px 40px rgb(0 0 0 / 0.5)",
	},
});
