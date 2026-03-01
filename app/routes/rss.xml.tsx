import { listBlogPosts } from "~/blog/data";
import {
	DEFAULT_LOCALE,
	type Locale,
	resolveLocaleParam,
	toLocalePath,
} from "~/i18n/config";
import { BASE_URL } from "~/seo.config";
import type { Route } from "./+types/rss.xml";

function getFeedLocale(lang: string | undefined): Locale {
	const { locale, isInvalid } = resolveLocaleParam(lang);
	if (isInvalid) {
		throw new Response("Not Found", { status: 404 });
	}
	return locale;
}

function normalizeFeedLocale(locale: Locale): Locale {
	return locale === "zh" ? "zh" : DEFAULT_LOCALE;
}

function toRfc822Date(value: string): string {
	return new Date(value).toUTCString();
}

function getFeedCopy(locale: Locale): {
	title: string;
	description: string;
	language: string;
} {
	if (locale === "zh") {
		return {
			title: "smail.pw 博客",
			description: "临时邮箱使用指南、排障手册与隐私实践文章。",
			language: "zh-CN",
		};
	}

	return {
		title: "smail.pw Blog",
		description:
			"Temporary email guides, troubleshooting, and privacy best practices.",
		language: "en-US",
	};
}

export async function loader({ params, request }: Route.LoaderArgs) {
	const requestedLocale = getFeedLocale(params.lang);
	const normalizedLocale = normalizeFeedLocale(requestedLocale);
	const { shouldRedirectToDefault } = resolveLocaleParam(params.lang);
	const url = new URL(request.url);

	if (shouldRedirectToDefault || requestedLocale !== normalizedLocale) {
		throw new Response(null, {
			status: 301,
			headers: {
				Location: `${toLocalePath("/rss.xml", normalizedLocale)}${url.search}`,
			},
		});
	}

	const feedCopy = getFeedCopy(normalizedLocale);
	const posts = listBlogPosts(normalizedLocale);
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
