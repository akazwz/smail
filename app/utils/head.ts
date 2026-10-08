import { useLocation } from "@solidjs/router";
import { useHead } from "@solidjs/web";

import {
	DEFAULT_LOCALE,
	getLocaleFromPathname,
	normalizePathname,
	SUPPORTED_LOCALES,
	stripLocalePrefix,
	toIntlLocale,
	toLocalePath,
} from "#/i18n/config.ts";
import { BASE_URL } from "#/seo.config.ts";

const OG_IMAGE_URL = `${BASE_URL}/og.png`;

type PageHead = {
	title: string;
	description?: string;
	keywords?: string;
	robots: string;
};

type HeadTag = Parameters<typeof useHead>[0] extends infer T
	? T extends { tag: string }
		? T
		: never
	: never;

function meta(
	attribute: "name" | "property",
	key: string,
	content: string,
): HeadTag {
	return { tag: "meta", key, props: { [attribute]: key, content } };
}

/** 站点级 SEO 标签：canonical、hreflang、RSS、Open Graph。 */
function getSiteHead(rawPathname: string): HeadTag[] {
	const pathname = normalizePathname(rawPathname);
	const locale = getLocaleFromPathname(pathname);
	const basePath = stripLocalePrefix(pathname);
	// 每种语言的页面都以自己为准，RSS 也指向自己语言的那份。
	const canonicalPath = toLocalePath(basePath, locale);
	const canonicalUrl = `${BASE_URL}${canonicalPath}`;
	return [
		{
			tag: "link",
			key: "canonical",
			props: { rel: "canonical", href: canonicalUrl },
		},
		...SUPPORTED_LOCALES.map((supportedLocale): HeadTag => ({
			tag: "link",
			key: `alternate:${supportedLocale}`,
			props: {
				rel: "alternate",
				hreflang: supportedLocale,
				href: `${BASE_URL}${toLocalePath(basePath, supportedLocale)}`,
			},
		})),
		{
			tag: "link",
			key: "alternate:x-default",
			props: {
				rel: "alternate",
				hreflang: "x-default",
				href: `${BASE_URL}${toLocalePath(basePath, DEFAULT_LOCALE)}`,
			},
		},
		{
			tag: "link",
			key: "alternate:rss",
			props: {
				rel: "alternate",
				type: "application/rss+xml",
				title: "smail.pw Blog RSS",
				href: `${BASE_URL}${toLocalePath("/rss.xml", locale)}`,
			},
		},
		meta("property", "og:type", "website"),
		meta("property", "og:site_name", "smail.pw"),
		meta("property", "og:url", canonicalUrl),
		meta("property", "og:locale", toIntlLocale(locale).replace("-", "_")),
		// 分享图是一张品牌图：只有标志和 smail.pw，不带任何语言的文字，也不带邮箱地址。所有页面、所有语言共用。
		meta("property", "og:image", OG_IMAGE_URL),
		meta("property", "og:image:width", "1200"),
		meta("property", "og:image:height", "630"),
		meta("property", "og:image:alt", "smail.pw"),
		meta("name", "twitter:card", "summary_large_image"),
		meta("name", "twitter:image", OG_IMAGE_URL),
	];
}

/** 每个页面调用一次，输出该页的 title / description / robots 以及站点级标签。 */
export function usePageHead(page: () => PageHead): void {
	const location = useLocation();

	useHead(() => {
		const { title, description, keywords, robots } = page();
		const tags = getSiteHead(location.pathname);
		tags.push({ tag: "title", key: "title", props: { children: title } });
		// 分享卡片用这一页自己的标题和描述，语言和页面一致。
		tags.push(meta("property", "og:title", title));
		tags.push(meta("name", "twitter:title", title));
		if (description) {
			tags.push(meta("name", "description", description));
			tags.push(meta("property", "og:description", description));
			tags.push(meta("name", "twitter:description", description));
		}
		if (keywords) {
			tags.push(meta("name", "keywords", keywords));
		}
		tags.push(meta("name", "robots", robots));
		return tags;
	});
}
