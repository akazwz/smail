// 各语言的文章列表在 app/i18n/locales/<语言>.tsx 里。
export const BLOG_PAGE_SIZE = 6;

export type BlogPostMeta = {
	slug: string;
	title: string;
	description: string;
	publishedAt: string;
	updatedAt?: string;
	readingMinutes: number;
};

export function getBlogPageCount(posts: BlogPostMeta[]): number {
	return Math.max(1, Math.ceil(posts.length / BLOG_PAGE_SIZE));
}

export function getBlogPostsByPage(
	posts: BlogPostMeta[],
	page: number,
): BlogPostMeta[] {
	const start = (Math.max(1, page) - 1) * BLOG_PAGE_SIZE;
	return posts.slice(start, start + BLOG_PAGE_SIZE);
}
