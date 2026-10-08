import { type BlogPostMeta, getBlogPageCount } from "#/blog/data.ts";
import {
	DEFAULT_LOCALE,
	isKnownLocale,
	type Locale,
	SUPPORTED_LOCALES,
	toIntlLocale,
	toLocalePath,
} from "#/i18n/config.ts";
import type { Dictionary } from "#/i18n/dictionary.ts";
import { BASE_URL, BLOG_BASE_PATH, MARKDOWN_BASE_PATHS } from "#/seo.config.ts";

// sitemap 和 RSS 要用到每种语言的文章列表，这里一次性全部引入（只在服务端）。
const dictionaries = import.meta.glob<Dictionary>("./i18n/locales/*.tsx", {
	eager: true,
	import: "dictionary",
});

function getDictionary(locale: Locale): Dictionary {
	const dictionary = dictionaries[`./i18n/locales/${locale}.tsx`];
	if (!dictionary) {
		throw new Error(`Missing dictionary for locale "${locale}"`);
	}
	return dictionary;
}

function listBlogPosts(locale: Locale): BlogPostMeta[] {
	return getDictionary(locale).blog.posts;
}

const STATIC_PATHS = ["/", "/contact"] as const;

/** 站点内所有页面的路径：预渲染的爬虫靠它知道有哪些页面。 */
export function listPagePaths(): string[] {
	const paths = new Set<string>();

	for (const locale of SUPPORTED_LOCALES) {
		for (const staticPath of STATIC_PATHS) {
			paths.add(toLocalePath(staticPath, locale));
		}
	}

	for (const locale of SUPPORTED_LOCALES) {
		for (const basePath of MARKDOWN_BASE_PATHS) {
			paths.add(toLocalePath(basePath, locale));
		}
	}

	for (const locale of SUPPORTED_LOCALES) {
		const posts = listBlogPosts(locale);
		paths.add(toLocalePath(BLOG_BASE_PATH, locale));

		const totalPages = getBlogPageCount(posts);
		for (let page = 2; page <= totalPages; page++) {
			paths.add(toLocalePath(`${BLOG_BASE_PATH}/page/${page}`, locale));
		}

		for (const post of posts) {
			paths.add(toLocalePath(`${BLOG_BASE_PATH}/${post.slug}`, locale));
		}
	}

	return [...paths];
}

function robots(): Response {
	const body = [
		"User-agent: *",
		"Allow: /",
		"Disallow: /api/",
		"",
		`Sitemap: ${BASE_URL}/sitemap.xml`,
		// 每种语言一份 RSS。
		...SUPPORTED_LOCALES.map(
			(locale) => `Feed: ${BASE_URL}${toLocalePath("/rss.xml", locale)}`,
		),
		"",
	].join("\n");

	return new Response(body, {
		status: 200,
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
}

function toRfc822Date(value: string): string {
	return new Date(value).toUTCString();
}

function rss(lang: string | undefined): Response {
	if (lang !== undefined && !isKnownLocale(lang)) {
		return new Response("Not Found", { status: 404 });
	}
	// 默认语言不带前缀（/rss.xml），其余每种语言都有自己的一份。
	if (lang === DEFAULT_LOCALE) {
		return new Response("Not Found", { status: 404 });
	}
	const normalizedLocale = lang ?? DEFAULT_LOCALE;

	const { blog } = getDictionary(normalizedLocale);
	const feedCopy = {
		title: blog.header,
		description: blog.description,
		language: toIntlLocale(normalizedLocale),
	};
	const posts = blog.posts;
	const feedUrl = `${BASE_URL}${toLocalePath("/rss.xml", normalizedLocale)}`;
	const blogUrl = `${BASE_URL}${toLocalePath("/blog", normalizedLocale)}`;

	const body =
		`<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<rss version="2.0">\n` +
		`<channel>\n` +
		`<title>${escapeXml(feedCopy.title)}</title>\n` +
		`<link>${escapeXml(blogUrl)}</link>\n` +
		`<description>${escapeXml(feedCopy.description)}</description>\n` +
		`<language>${feedCopy.language}</language>\n` +
		`<atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />\n` +
		posts
			.map((post) => {
				const postUrl = `${BASE_URL}${toLocalePath(`/blog/${post.slug}`, normalizedLocale)}`;
				const updated = post.updatedAt ?? post.publishedAt;
				return (
					`<item>\n` +
					`<title>${escapeXml(post.title)}</title>\n` +
					`<link>${escapeXml(postUrl)}</link>\n` +
					`<guid isPermaLink="true">${escapeXml(postUrl)}</guid>\n` +
					`<description>${escapeXml(post.description)}</description>\n` +
					`<pubDate>${toRfc822Date(post.publishedAt)}</pubDate>\n` +
					`<lastBuildDate>${toRfc822Date(updated)}</lastBuildDate>\n` +
					`</item>\n`
				);
			})
			.join("") +
		`</channel>\n` +
		`</rss>\n`;

	return new Response(body, {
		status: 200,
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, max-age=1800",
		},
	});
}

function escapeXml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}

/** 每种语言一份 RSS，加上 robots.txt。sitemap.xml 由预渲染器生成（见 vite.config.ts）。 */
export function listFeedPaths(): string[] {
	return [
		"/robots.txt",
		...SUPPORTED_LOCALES.map((locale) => toLocalePath("/rss.xml", locale)),
	];
}

/**
 * robots / RSS。它们不是页面，构建时和页面一起被渲染成静态文件
 * （见 app/middleware.ts），线上没有任何代码在生成它们。返回 null 表示不是这类请求。
 */
export function handleFeedRoute(request: Request): Response | null {
	const { pathname } = new URL(request.url);

	if (pathname === "/robots.txt") {
		return robots();
	}
	const rssMatch = /^(?:\/([^/]+))?\/rss\.xml$/.exec(pathname);
	if (rssMatch) {
		return rss(rssMatch[1]);
	}
	return null;
}
