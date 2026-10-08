import { readFile } from "node:fs/promises";

// 这个包是 CommonJS 的，Node 加载构建配置时只认默认导入。
import Markdoc, { type RenderableTreeNode } from "@markdoc/markdoc";
import type { Plugin } from "vite";

// 和 app/types/markdown.ts 里的 MarkdownNode 是同一个形状。
type MarkdownNode =
	| string
	| {
			name: string;
			attributes: Record<string, string>;
			children: MarkdownNode[];
	  };

const QUERY = "?tree";

function toMarkdownNodes(
	node: RenderableTreeNode | RenderableTreeNode[],
): MarkdownNode[] {
	if (Array.isArray(node)) {
		return node.flatMap(toMarkdownNodes);
	}
	if (node === null || node === undefined || typeof node === "boolean") {
		return [];
	}
	if (Markdoc.Tag.isTag(node)) {
		const attributes: Record<string, string> = {};
		for (const [key, value] of Object.entries(node.attributes)) {
			if (typeof value === "string") {
				attributes[key] = value;
			}
		}
		return [
			{ name: node.name, attributes, children: toMarkdownNodes(node.children) },
		];
	}
	return [String(node)];
}

/**
 * 构建时把 Markdown 解析成结构树：`import tree from "./page.md?tree"` 得到的就是解析好的 JSON。
 * 这样 Markdoc 只在构建时运行，Worker 和浏览器拿到的都是现成的数据。
 */
export function markdownTree(): Plugin {
	return {
		name: "smail:markdown-tree",
		enforce: "pre",
		async load(id) {
			if (!id.endsWith(`.md${QUERY}`)) {
				return null;
			}
			const file = id.slice(0, -QUERY.length);
			this.addWatchFile(file);
			const source = await readFile(file, "utf8");
			// 根节点是 <article>，页面自己提供外层容器，这里只要它的内容。
			const nodes = toMarkdownNodes(
				Markdoc.transform(Markdoc.parse(source)),
			).flatMap((node) =>
				typeof node !== "string" && node.name === "article"
					? node.children
					: [node],
			);
			return `export default ${JSON.stringify(nodes)};`;
		},
	};
}
