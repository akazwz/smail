export const BASE_URL = "https://smail.pw";

export const MARKDOWN_BASE_PATHS = [
	"/about",
	"/faq",
	"/privacy",
	"/terms",
	"/temporary-email-no-registration",
	"/disposable-email-for-verification",
	"/temporary-email-for-registration",
	"/online-temporary-email",
	"/can-temporary-email-send",
	"/smail-vs-smailpro",
] as const;

export type MarkdownPageSlug =
	(typeof MARKDOWN_BASE_PATHS)[number] extends `/${infer Slug}` ? Slug : never;

export const BLOG_BASE_PATH = "/blog";

export function isMarkdownBasePath(pathname: string): boolean {
	return (MARKDOWN_BASE_PATHS as readonly string[]).includes(pathname);
}

export function isBlogBasePath(pathname: string): boolean {
	return (
		pathname === BLOG_BASE_PATH || pathname.startsWith(`${BLOG_BASE_PATH}/`)
	);
}
