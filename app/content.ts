import { isKnownLocale } from "#/i18n/config.ts";
import { isMarkdownBasePath } from "#/seo.config.ts";
import type { MarkdownNode } from "#/types/markdown.ts";

// 内容页和博客的正文。Markdown 在构建时就解析成了结构树（见 vite/markdown.ts），
// 每个文件是一个独立的静态分块：预渲染时直接读，站内跳转时浏览器按需下载，都不经过 Worker。

type Trees = Record<string, () => Promise<MarkdownNode[]>>;

const markdownTrees = import.meta.glob("./md/**/*.md", {
	query: "?tree",
	import: "default",
}) as Trees;

const blogTrees = import.meta.glob("./blog/**/*.md", {
	query: "?tree",
	import: "default",
}) as Trees;

// 该有的文件没有，就报错，不拿空白正文顶上：预渲染会因此失败，构建时就能发现。
// 分块下载失败（比如新版本上线后旧标签页要的文件已经不在了）也照常抛出，
// 由 app.tsx 里的 vite:preloadError 处理。
function load(trees: Trees, file: string): Promise<MarkdownNode[]> {
	const loadTree = trees[file];
	if (!loadTree) {
		const message = `Missing content file: app/${file.slice(2)}`;
		// 预渲染出错时只会报一句笼统的“Internal Server Error”，把缺的是哪个文件打出来。
		console.error(message);
		return Promise.reject(new Error(message));
	}
	return loadTree();
}

export function loadMarkdownPage(
	locale: string,
	slug: string,
): Promise<MarkdownNode[] | null> {
	if (!isKnownLocale(locale) || !isMarkdownBasePath(`/${slug}`)) {
		return Promise.resolve(null);
	}
	// 不回退到英语：每种语言都要有自己的那份文件。
	return load(markdownTrees, `./md/${locale}/${slug}.md`);
}

export function loadBlogPost(
	locale: string,
	slug: string,
): Promise<MarkdownNode[] | null> {
	if (!isKnownLocale(locale)) {
		return Promise.resolve(null);
	}
	// 调用方只会拿词典里登记过的文章来要正文（见 routes/blog-post.tsx），所以查不到就是漏了文件。
	return load(blogTrees, `./blog/${locale}/${slug}.md`);
}
