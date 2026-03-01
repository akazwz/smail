import { Link, redirect } from "react-router";
import {
	BLOG_PAGE_SIZE,
	getBlogPageCount,
	getBlogPostsByPage,
	listBlogPosts,
} from "~/blog/data";
import {
	DEFAULT_LOCALE,
	type Locale,
	resolveLocaleParam,
	stripDefaultLocalePrefix,
	toLocalePath,
} from "~/i18n/config";
import { BASE_URL, isBlogLocaleIndexable } from "~/seo.config";
import { mergeRouteMeta } from "~/utils/meta";
import type { Route } from "./+types/blog.page";
import {
	formatBlogPageTitle,
	formatBlogPaginationSummary,
	formatBlogPublishedDate,
	getBlogListCopy,
	getBlogPagePath,
	getBlogUiCopy,
	toLanguageTag,
} from "./blog";

function getLocaleFromParams(lang: string | undefined): Locale {
	const { locale } = resolveLocaleParam(lang);
	return locale;
}

function parsePageParam(pageParam: string | undefined): number | null {
	if (!pageParam) {
		return null;
	}
	if (!/^\d+$/.test(pageParam)) {
		return null;
	}
	const parsed = Number.parseInt(pageParam, 10);
	if (!Number.isSafeInteger(parsed) || parsed < 1) {
		return null;
	}
	return parsed;
}

export function meta({ params, loaderData, matches }: Route.MetaArgs) {
	const locale = getLocaleFromParams(params.lang);
	const copy = getBlogListCopy(locale);
	const currentPage = loaderData?.page ?? parsePageParam(params.page) ?? 2;

	return mergeRouteMeta(matches, [
		{ title: formatBlogPageTitle(locale, copy.title, currentPage) },
		{ name: "description", content: copy.description },
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

	const page = parsePageParam(params.page);
	if (!page) {
		throw new Response("Not Found", { status: 404 });
	}

	const url = new URL(request.url);
	if (shouldRedirectToDefault) {
		const normalizedPath = stripDefaultLocalePrefix(url.pathname);
		throw redirect(`${normalizedPath}${url.search}`, 301);
	}

	if (page === 1) {
		throw redirect(`${toLocalePath("/blog", locale)}${url.search}`, 301);
	}

	const totalPosts = listBlogPosts(locale).length;
	const totalPages = getBlogPageCount(locale);
	if (page > totalPages) {
		throw new Response("Not Found", { status: 404 });
	}

	return {
		locale,
		page,
		totalPosts,
		totalPages,
		posts: getBlogPostsByPage(locale, page),
	};
}

export default function BlogPagedListPage({
	loaderData,
}: Route.ComponentProps) {
	const locale = loaderData.locale || DEFAULT_LOCALE;
	const copy = getBlogListCopy(locale);
	const uiCopy = getBlogUiCopy(locale);
	const blogUrl = `${BASE_URL}${toLocalePath(getBlogPagePath(loaderData.page), locale)}`;
	const itemListJsonLd = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: copy.header,
		description: copy.description,
		inLanguage: toLanguageTag(locale),
		url: blogUrl,
		numberOfItems: loaderData.totalPosts,
		itemListElement: loaderData.posts.map((post, index) => ({
			"@type": "ListItem",
			position: (loaderData.page - 1) * BLOG_PAGE_SIZE + index + 1,
			url: `${BASE_URL}${toLocalePath(`/blog/${post.slug}`, locale)}`,
			name: post.title,
		})),
	};

	return (
		<div className="flex flex-1 py-3 sm:py-4">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
			/>
			<div className="glass-panel w-full px-4 py-5 sm:px-6 sm:py-6">
				<header className="mb-6 space-y-2">
					<p className="soft-tag">{uiCopy.tag}</p>
					<h1 className="text-theme-primary font-display text-2xl font-bold sm:text-3xl">
						{copy.header}
					</h1>
					<p className="text-theme-secondary text-sm">{copy.subheader}</p>
				</header>

				<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
					{loaderData.posts.map((post) => (
						<article
							key={post.slug}
							className="theme-card flex h-full flex-col p-4"
						>
							<p className="text-theme-faint text-[11px]">
								{formatBlogPublishedDate(post.publishedAt, locale)}{" "}
								· {post.readingMinutes} min
							</p>
							<h2 className="text-theme-primary font-display mt-2 line-clamp-2 text-base font-semibold">
								{post.title}
							</h2>
							<p className="text-theme-muted mt-2 line-clamp-4 text-sm">
								{post.description}
							</p>
							<div className="mt-4">
								<Link
									to={toLocalePath(`/blog/${post.slug}`, locale)}
									prefetch="viewport"
									className="theme-badge inline-flex px-3 py-1.5 text-[11px] font-semibold"
								>
									{uiCopy.readArticle}
								</Link>
							</div>
						</article>
					))}
				</div>

				{loaderData.totalPages > 1 && (
					<nav
						className="mt-6 flex flex-wrap items-center gap-2"
						aria-label="Blog pagination"
					>
						{loaderData.page > 1 && (
							<Link
								to={toLocalePath(getBlogPagePath(loaderData.page - 1), locale)}
								prefetch="viewport"
								className="theme-badge px-3 py-1.5 text-[11px] font-semibold hover:brightness-95"
							>
								{uiCopy.prevPage}
							</Link>
						)}
						{Array.from(
							{ length: loaderData.totalPages },
							(_, index) => index + 1,
						).map((pageNumber) => {
							const isCurrent = pageNumber === loaderData.page;
							return (
								<Link
									key={pageNumber}
									to={toLocalePath(getBlogPagePath(pageNumber), locale)}
									prefetch="viewport"
									aria-current={isCurrent ? "page" : undefined}
									className={`theme-badge px-3 py-1.5 text-[11px] font-semibold ${isCurrent ? "brightness-95" : "hover:brightness-95"}`}
								>
									{pageNumber}
								</Link>
							);
						})}
						{loaderData.page < loaderData.totalPages && (
							<Link
								to={toLocalePath(getBlogPagePath(loaderData.page + 1), locale)}
								prefetch="viewport"
								className="theme-badge ml-1 px-3 py-1.5 text-[11px] font-semibold hover:brightness-95"
							>
								{uiCopy.nextPage}
							</Link>
						)}
					</nav>
				)}

				<p className="text-theme-faint mt-3 text-[11px]">
					{formatBlogPaginationSummary(
						locale,
						loaderData.page,
						loaderData.totalPages,
					)}
				</p>
			</div>
		</div>
	);
}
