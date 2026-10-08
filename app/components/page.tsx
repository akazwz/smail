import type { JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { Show } from "solid-js";

import { color, frame, space, text } from "#/ui/tokens.stylex.ts";

const STACKED = "@media (max-width: 900px)";

const styles = stylex.create({
	// minmax(0, 1fr)：里面有不换行的长文字时，列也不会被撑出屏幕。
	page: {
		display: "grid",
		gridTemplateColumns: "minmax(0, 1fr)",
		gap: space.section,
		width: "100%",
		maxWidth: frame.width,
		marginInline: "auto",
		paddingBlock: space.section,
		paddingInline: frame.gutter,
	},
	intro: { display: "grid", gap: space.lg, maxWidth: "48rem" },
	title: {
		margin: 0,
		fontSize: text.display,
		fontWeight: 750,
		letterSpacing: "-0.035em",
		lineHeight: 1.08,
		textWrap: "balance",
		wordBreak: "keep-all",
		overflowWrap: "anywhere",
	},
	lead: {
		margin: 0,
		maxWidth: "36rem",
		color: color.muted,
		fontSize: text.lg,
		lineHeight: 1.6,
		textWrap: "pretty",
		wordBreak: "keep-all",
		overflowWrap: "anywhere",
	},
	columns: {
		display: "grid",
		alignItems: "start",
		// 所有等宽两栏用同一个间距，上下两排的栏边才对得齐。
		columnGap: space.xxl,
		rowGap: space.section,
	},
	even: {
		gridTemplateColumns: {
			default: "minmax(0, 1fr) minmax(0, 1fr)",
			[STACKED]: "minmax(0, 1fr)",
		},
	},
	// 正文保持适合阅读的行宽，侧栏固定宽度，多出来的空间留在两者之间。
	article: {
		gridTemplateColumns: {
			default: "minmax(0, 44rem) minmax(0, 20rem)",
			[STACKED]: "minmax(0, 1fr)",
		},
		justifyContent: "space-between",
	},
	aside: {
		display: "grid",
		gridTemplateColumns: "minmax(0, 1fr)",
		gap: space.xxl,
		position: { default: "sticky", [STACKED]: "static" },
		insetBlockStart: space.xxl,
	},
	section: {
		display: "grid",
		gridTemplateColumns: "minmax(0, 1fr)",
		alignContent: "start",
		gap: space.lg,
	},
	// 行式区块：左边标题、右边内容，每一行上方一条细线。
	row: {
		display: "grid",
		gridTemplateColumns: {
			default: "minmax(0, 20rem) minmax(0, 1fr)",
			[STACKED]: "minmax(0, 1fr)",
		},
		alignItems: "start",
		columnGap: space.xxl,
		rowGap: space.lg,
		paddingBlock: space.xxl,
		borderBlockStartWidth: "1px",
		borderBlockStartStyle: "solid",
		borderBlockStartColor: color.border,
	},
	rowBody: {
		display: "grid",
		gridTemplateColumns: "minmax(0, 1fr)",
		gap: space.lg,
	},
	sectionTitle: {
		margin: 0,
		fontSize: text.xl,
		fontWeight: 700,
		letterSpacing: "-0.02em",
		lineHeight: 1.25,
		textWrap: "balance",
		wordBreak: "keep-all",
		overflowWrap: "anywhere",
	},
	// 侧栏里的区块：标题和正文一样大，只靠字重区分。
	sectionTitleCompact: { fontSize: text.md, letterSpacing: 0, lineHeight: 1.4 },
});

// 页面主体：统一的内容宽度和上下留白，直接子元素是一个个大区块。
export function Page(props: { children: JSX.Element }) {
	return <div {...stylex.attrs(styles.page)}>{props.children}</div>;
}

// 页面开头：唯一的 h1，下面可以跟一句导语和主要操作。
export function PageIntro(props: {
	title: string;
	lead?: string;
	children?: JSX.Element;
}) {
	return (
		<header {...stylex.attrs(styles.intro)}>
			<h1 {...stylex.attrs(styles.title)}>{props.title}</h1>
			<Show when={props.lead}>
				<p {...stylex.attrs(styles.lead)}>{props.lead}</p>
			</Show>
			{props.children}
		</header>
	);
}

// 大屏两栏、小屏上下堆叠，放正好两个子元素。
// `even` 两栏等宽；`article` 是正文加侧栏。
export function Columns(props: {
	children: JSX.Element;
	layout?: "even" | "article";
}) {
	return (
		<div {...stylex.attrs(styles.columns, styles[props.layout ?? "even"])}>
			{props.children}
		</div>
	);
}

// 正文旁边的侧栏：大屏上随滚动停在顶部。
export function Aside(props: { children: JSX.Element }) {
	return <aside {...stylex.attrs(styles.aside)}>{props.children}</aside>;
}

// 页面里带标题的一块内容。`compact` 用在侧栏里。
export function Section(props: {
	title: string;
	children: JSX.Element;
	compact?: boolean;
}) {
	return (
		<section {...stylex.attrs(styles.section)}>
			<h2
				{...stylex.attrs(
					styles.sectionTitle,
					props.compact && styles.sectionTitleCompact,
				)}
			>
				{props.title}
			</h2>
			{props.children}
		</section>
	);
}

// 一组连续的行式区块：行与行之间不再留区块间距。
export function Rows(props: { children: JSX.Element }) {
	return <div>{props.children}</div>;
}

// 行式区块：左边一栏放标题，右边放内容。放在 <Rows> 里。
export function Row(props: { title: string; children: JSX.Element }) {
	return (
		<section {...stylex.attrs(styles.row)}>
			<h2 {...stylex.attrs(styles.sectionTitle)}>{props.title}</h2>
			<div {...stylex.attrs(styles.rowBody)}>{props.children}</div>
		</section>
	);
}
