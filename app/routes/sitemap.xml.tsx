import { getAllBlogSlugs, getBlogPageCount } from "~/blog/data";
import { SUPPORTED_LOCALES, toLocalePath } from "~/i18n/config";
import {
	BASE_URL,
	BLOG_BASE_PATH,
	BLOG_INDEXABLE_LOCALES,
	MARKDOWN_BASE_PATHS,
	MARKDOWN_INDEXABLE_LOCALES,
} from "~/seo.config";

const STATIC_PATHS = ["/", "/contact"] as const;

export async function loader() {
	const lastmod = new Date().toISOString();
	const seen = new Set<string>();
	const allPaths: string[] = [];

	for (const locale of SUPPORTED_LOCALES) {
		for (const staticPath of STATIC_PATHS) {
			const localizedPath = toLocalePath(staticPath, locale);
			if (seen.has(localizedPath)) {
				continue;
			}
			seen.add(localizedPath);
			allPaths.push(localizedPath);
		}
	}

	for (const locale of MARKDOWN_INDEXABLE_LOCALES) {
		for (const basePath of MARKDOWN_BASE_PATHS) {
			const localizedPath = toLocalePath(basePath, locale);
			if (seen.has(localizedPath)) {
				continue;
			}
			seen.add(localizedPath);
			allPaths.push(localizedPath);
		}
	}

	const blogSlugs = getAllBlogSlugs();
	for (const locale of BLOG_INDEXABLE_LOCALES) {
		const blogListPath = toLocalePath(BLOG_BASE_PATH, locale);
		if (!seen.has(blogListPath)) {
			seen.add(blogListPath);
			allPaths.push(blogListPath);
		}

		const totalPages = getBlogPageCount(locale);
		for (let page = 2; page <= totalPages; page++) {
			const pagedPath = toLocalePath(`${BLOG_BASE_PATH}/page/${page}`, locale);
			if (seen.has(pagedPath)) {
				continue;
			}
			seen.add(pagedPath);
			allPaths.push(pagedPath);
		}

		for (const slug of blogSlugs) {
			const blogPostPath = toLocalePath(`${BLOG_BASE_PATH}/${slug}`, locale);
			if (seen.has(blogPostPath)) {
				continue;
			}
			seen.add(blogPostPath);
			allPaths.push(blogPostPath);
		}
	}

	const body =
		`<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
		allPaths
			.map((path) => {
				return `\n  <url>\n    <loc>${BASE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
			})
			.join("") +
		"\n</urlset>\n";

	return new Response(body, {
		status: 200,
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
}
