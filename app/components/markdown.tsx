import type { JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";

import { type Locale, toLocalePath } from "#/i18n/config.ts";
import type { MarkdownNode } from "#/types/markdown.ts";
import { base } from "#/ui/base.ts";
import { color, radius, space, text } from "#/ui/tokens.stylex.ts";
import { useLocale } from "#/utils/locale.ts";

const styles = stylex.create({
	root: {
		color: color.text,
		fontSize: "1.0625rem",
		lineHeight: 1.75,
		overflowWrap: "break-word",
	},
	// 每篇内容以一个 `##` 开头，它就是页面标题；其余小节用 `###`。
	// 渲染时各提一级，页面才有唯一的 h1。
	title: {
		marginBlockStart: 0,
		marginBlockEnd: space.xxl,
		fontSize: text.display,
		fontWeight: 750,
		letterSpacing: "-0.035em",
		lineHeight: 1.08,
		textWrap: "balance",
		wordBreak: "keep-all",
		overflowWrap: "anywhere",
	},
	heading: {
		marginBlockStart: { default: space.xxl, ":first-child": 0 },
		marginBlockEnd: space.sm,
		fontSize: text.xl,
		fontWeight: 700,
		letterSpacing: "-0.02em",
		lineHeight: 1.3,
		wordBreak: "keep-all",
		overflowWrap: "anywhere",
	},
	p: {
		marginBlockStart: 0,
		marginBlockEnd: space.lg,
		color: color.muted,
		textWrap: "pretty",
	},
	list: {
		marginBlockStart: 0,
		marginBlockEnd: space.lg,
		paddingInlineStart: space.xl,
		color: color.muted,
	},
	li: {
		marginBlockEnd: space.xs,
		paddingInlineStart: space.xs,
	},
	a: {
		borderRadius: radius.xs,
		color: color.text,
		textDecoration: "underline",
		textDecorationColor: {
			default: color.borderStrong,
			":hover": "currentColor",
		},
		textDecorationThickness: "1px",
		textUnderlineOffset: "0.2em",
	},
	strong: { color: color.text, fontWeight: 600 },
});

function renderNodes(nodes: MarkdownNode[], locale: Locale): JSX.Element {
	return nodes.map((node) => renderNode(node, locale));
}

// 正文里的站内链接都写成不带语言前缀的路径（/faq），这里补上当前语言，
// 否则非英语页面里的链接会跳到英语页面。站外链接原样输出。
function toHref(href: string | undefined, locale: Locale): string | undefined {
	return href?.startsWith("/") && !href.startsWith("//")
		? toLocalePath(href, locale)
		: href;
}

// 内容里实际出现的标签就这几种；没列出的标签只输出它的子内容。
function renderNode(node: MarkdownNode, locale: Locale): JSX.Element {
	if (typeof node === "string") {
		return node;
	}
	const children = renderNodes(node.children, locale);
	switch (node.name) {
		case "h2":
			return <h1 {...stylex.attrs(styles.title)}>{children}</h1>;
		case "h3":
			return <h2 {...stylex.attrs(styles.heading)}>{children}</h2>;
		case "p":
			return <p {...stylex.attrs(styles.p)}>{children}</p>;
		case "ul":
			return <ul {...stylex.attrs(styles.list)}>{children}</ul>;
		case "ol":
			return <ol {...stylex.attrs(styles.list)}>{children}</ol>;
		case "li":
			return <li {...stylex.attrs(styles.li)}>{children}</li>;
		case "a":
			return (
				<a
					href={toHref(node.attributes.href, locale)}
					{...stylex.attrs(styles.a, base.focusRing)}
				>
					{children}
				</a>
			);
		case "strong":
			return <strong {...stylex.attrs(styles.strong)}>{children}</strong>;
		case "em":
			return <em>{children}</em>;
		default:
			return children;
	}
}

/** 把服务端解析好的 Markdown 树渲染成带样式的正文。 */
export function Markdown(props: { nodes: MarkdownNode[] }) {
	const locale = useLocale();
	return (
		<article {...stylex.attrs(styles.root)}>
			{renderNodes(props.nodes, locale())}
		</article>
	);
}
