/** Markdoc 渲染树的可序列化形式：服务端解析，客户端按标签套样式。 */
export type MarkdownNode =
	| string
	| {
			name: string;
			attributes: Record<string, string>;
			children: MarkdownNode[];
	  };
