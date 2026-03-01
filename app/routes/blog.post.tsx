import Markdoc from "@markdoc/markdoc";
import { Link, redirect } from "react-router";
import { getBlogPostMeta, listBlogPosts, toBlogLocale } from "~/blog/data";
import {
	DEFAULT_LOCALE,
	type Locale,
	resolveLocaleParam,
	stripDefaultLocalePrefix,
	toLocalePath,
} from "~/i18n/config";
import { BASE_URL, isBlogLocaleIndexable } from "~/seo.config";
import { mergeRouteMeta } from "~/utils/meta";
import type { Route } from "./+types/blog.post";
import {
	formatBlogPublishedDate,
	getBlogNotFoundMetaTitle,
	getBlogPostMetaTitle,
	getBlogUiCopy,
	toLanguageTag,
} from "./blog";

const blogSources = import.meta.glob("../blog/**/*.md", {
	query: "?raw",
	import: "default",
}) as Record<string, () => Promise<string>>;

function getLocaleFromParams(lang: string | undefined): Locale {
	const { locale } = resolveLocaleParam(lang);
	return locale;
}

export function meta({ params, matches }: Route.MetaArgs) {
	const locale = getLocaleFromParams(params.lang);
	const slug = params.slug ?? "";
	const post = getBlogPostMeta(locale, slug);
	if (!post) {
		return mergeRouteMeta(matches, [
			{ title: getBlogNotFoundMetaTitle(locale) },
			{ name: "robots", content: "noindex, nofollow" },
		]);
	}

	return mergeRouteMeta(matches, [
		{ title: getBlogPostMetaTitle(locale, post.title) },
		{ name: "description", content: post.description },
		{
			name: "robots",
			content: isBlogLocaleIndexable(locale)
				? "index, follow"
				: "noindex, follow",
		},
	]);
}

export async function loader({ params, request }: Route.LoaderArgs) {
	const { locale, shouldRedirectToDefault, isInvalid } = resolveLocaleParam(
		params.lang,
	);
	if (isInvalid) {
		throw new Response("Not Found", { status: 404 });
	}

	if (shouldRedirectToDefault) {
		const url = new URL(request.url);
		const normalizedPath = stripDefaultLocalePrefix(url.pathname);
		throw redirect(`${normalizedPath}${url.search}`, 301);
	}

	const slug = params.slug ?? "";
	const post = getBlogPostMeta(locale, slug);
	if (!post) {
		throw new Response("Not Found", { status: 404 });
	}

	const contentLocale = toBlogLocale(locale);
	const preferredPath = `../blog/${contentLocale}/${slug}.md`;
	const fallbackPath = `../blog/${DEFAULT_LOCALE}/${slug}.md`;
	const sourceLoader = blogSources[preferredPath] ?? blogSources[fallbackPath];
	const source = sourceLoader ? await sourceLoader().catch(() => null) : null;
	if (!source) {
		throw new Response("Not Found", { status: 404 });
	}

	const ast = Markdoc.parse(source);
	const content = Markdoc.transform(ast);
	const html = Markdoc.renderers.html(content);
	const related = listBlogPosts(locale)
		.filter((item) => item.slug !== slug)
		.slice(0, 3);

	return { locale, post, html, related };
}

export default function BlogPostPage({ loaderData }: Route.ComponentProps) {
	const locale = loaderData.locale || DEFAULT_LOCALE;
	const uiCopy = getBlogUiCopy(locale);
	const postPath = `/blog/${loaderData.post.slug}`;
	const articleUrl = `${BASE_URL}${toLocalePath(postPath, locale)}`;
	const articleJsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: loaderData.post.title,
		description: loaderData.post.description,
		datePublished: loaderData.post.publishedAt,
		dateModified: loaderData.post.updatedAt ?? loaderData.post.publishedAt,
		inLanguage: toLanguageTag(locale),
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": articleUrl,
		},
		author: {
			"@type": "Organization",
			name: "smail.pw",
		},
		publisher: {
			"@type": "Organization",
			name: "smail.pw",
			logo: {
				"@type": "ImageObject",
				url: `${BASE_URL}/favicon.ico`,
			},
		},
		url: articleUrl,
	};

	return (
		<div className="flex flex-1 py-3 sm:py-4">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
			/>
			<div className="grid w-full gap-4 lg:grid-cols-[1fr,280px]">
				<div className="markdown-shell">
					<div className="mb-5 flex flex-wrap items-center gap-2 text-xs">
						<Link
							to={toLocalePath("/blog", locale)}
							prefetch="viewport"
							className="theme-badge px-3 py-1"
						>
							{uiCopy.backToBlog}
						</Link>
						<span className="text-theme-faint">
							{formatBlogPublishedDate(loaderData.post.publishedAt, locale)}{" "}
							· {loaderData.post.readingMinutes} min
						</span>
					</div>
					<article
						className="prose prose-sm sm:prose-base max-w-none"
						dangerouslySetInnerHTML={{ __html: loaderData.html }}
					/>
				</div>

				<aside className="glass-panel h-fit p-4 sm:p-5">
					<p className="text-theme-faint text-[11px] font-semibold uppercase tracking-[0.16em]">
						{uiCopy.relatedPosts}
					</p>
					<div className="mt-3 space-y-2.5">
						{loaderData.related.map((post) => (
							<Link
								key={post.slug}
								to={toLocalePath(`/blog/${post.slug}`, locale)}
								prefetch="viewport"
								className="theme-card block p-3"
							>
								<p className="text-theme-primary line-clamp-2 text-sm font-semibold">
									{post.title}
								</p>
								<p className="text-theme-faint mt-1 text-[11px]">
									{formatBlogPublishedDate(post.publishedAt, locale)}
								</p>
							</Link>
						))}
					</div>
					<div className="mt-4 border-t border-theme-soft pt-3">
						<Link
							to={toLocalePath(postPath, locale)}
							className="text-theme-faint text-[11px]"
						>
							{uiCopy.currentArticle}
						</Link>
					</div>
				</aside>
			</div>
		</div>
	);
}
