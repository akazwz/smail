import * as stylex from "@stylexjs/stylex";
import { For, Show } from "solid-js";

import {
	BLOG_PAGE_SIZE,
	getBlogPageCount,
	getBlogPostsByPage,
} from "#/blog/data.ts";
import { JsonLd } from "#/components/json-ld.tsx";
import { Page, PageIntro } from "#/components/page.tsx";
import { type Locale, toIntlLocale, toLocalePath } from "#/i18n/config.ts";
import { useDictionary } from "#/i18n/dictionary.ts";
import { BASE_URL } from "#/seo.config.ts";
import { ButtonLink } from "#/ui/Button.tsx";
import { CardLink } from "#/ui/CardLink.tsx";
import { color, space, text } from "#/ui/tokens.stylex.ts";
import { usePageHead } from "#/utils/head.ts";
import { useLocale } from "#/utils/locale.ts";
import { fillTemplate } from "#/utils/template.ts";

const styles = stylex.create({
	body: {
		display: "grid",
		gridTemplateColumns: "minmax(0, 1fr)",
		gap: space.xl,
	},
	// 一行能放几张放几张。
	posts: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 19rem), 1fr))",
		gap: space.xl,
		margin: 0,
		padding: 0,
		listStyleType: "none",
	},
	pagination: {
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
		gap: space.sm,
	},
	summary: { margin: 0, color: color.subtle, fontSize: text.sm },
});

export function getBlogPostMetaTitle(
	postTitle: string,
	localizedSuffix: string,
): string {
	const maxTitleLength = 60;
	const titleWithLocalizedSuffix = `${postTitle}${localizedSuffix}`;
	if (titleWithLocalizedSuffix.length <= maxTitleLength) {
		return titleWithLocalizedSuffix;
	}

	const fallbackSuffix = " | smail.pw";
	const titleWithFallbackSuffix = `${postTitle}${fallbackSuffix}`;
	if (titleWithFallbackSuffix.length <= maxTitleLength) {
		return titleWithFallbackSuffix;
	}

	if (postTitle.length <= maxTitleLength) {
		return postTitle;
	}

	return `${postTitle.slice(0, maxTitleLength - 1)}…`;
}

export function toLanguageTag(locale: Locale): string {
	return toIntlLocale(locale);
}

export function formatBlogPublishedDate(
	publishedAt: string,
	locale: Locale,
): string {
	return new Date(publishedAt).toLocaleDateString(toIntlLocale(locale), {
		timeZone: "UTC",
	});
}

function getBlogPagePath(page: number): string {
	return page <= 1 ? "/blog" : `/blog/page/${page}`;
}

export function BlogListView(props: { page: number }) {
	const locale = useLocale();
	const { blog } = useDictionary();
	const totalPages = getBlogPageCount(blog.posts);
	const posts = () => getBlogPostsByPage(blog.posts, props.page);
	const pageNumbers = Array.from(
		{ length: totalPages },
		(_, index) => index + 1,
	);
	const isCurrentPage = (pageNumber: number) => pageNumber === props.page;

	usePageHead(() => ({
		title: props.page > 1 ? `${blog.title} · ${props.page}` : blog.title,
		description: blog.description,
		robots: "index, follow",
	}));

	const itemListJsonLd = () => ({
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: blog.header,
		description: blog.description,
		inLanguage: toLanguageTag(locale()),
		url: `${BASE_URL}${toLocalePath(getBlogPagePath(props.page), locale())}`,
		numberOfItems: blog.posts.length,
		itemListElement: posts().map((post, index) => ({
			"@type": "ListItem",
			position: (props.page - 1) * BLOG_PAGE_SIZE + index + 1,
			url: `${BASE_URL}${toLocalePath(`/blog/${post.slug}`, locale())}`,
			name: post.title,
		})),
	});

	return (
		<Page>
			<JsonLd data={itemListJsonLd()} />
			<PageIntro title={blog.header} lead={blog.subheader} />

			<div {...stylex.attrs(styles.body)}>
				<ul {...stylex.attrs(styles.posts)}>
					<For each={posts()} keyed={(post) => post.slug}>
						{(post) => (
							<li>
								<CardLink
									href={toLocalePath(`/blog/${post().slug}`, locale())}
									meta={`${formatBlogPublishedDate(post().publishedAt, locale())} · ${fillTemplate(blog.readingTime, { minutes: post().readingMinutes })}`}
									title={post().title}
									note={post().description}
									action={blog.readArticle}
								/>
							</li>
						)}
					</For>
				</ul>

				<Show when={totalPages > 1}>
					<nav aria-label={blog.header} {...stylex.attrs(styles.pagination)}>
						<Show when={props.page > 1}>
							<ButtonLink
								size="sm"
								href={toLocalePath(getBlogPagePath(props.page - 1), locale())}
							>
								{blog.prevPage}
							</ButtonLink>
						</Show>
						<For each={pageNumbers}>
							{(pageNumber) => (
								<ButtonLink
									size="sm"
									variant={isCurrentPage(pageNumber) ? "solid" : "outline"}
									href={toLocalePath(getBlogPagePath(pageNumber), locale())}
									aria-current={isCurrentPage(pageNumber) ? "page" : undefined}
								>
									{pageNumber}
								</ButtonLink>
							)}
						</For>
						<Show when={props.page < totalPages}>
							<ButtonLink
								size="sm"
								href={toLocalePath(getBlogPagePath(props.page + 1), locale())}
							>
								{blog.nextPage}
							</ButtonLink>
						</Show>
					</nav>
					<p {...stylex.attrs(styles.summary)}>
						{fillTemplate(blog.pageSummary, {
							page: props.page,
							total: totalPages,
							size: BLOG_PAGE_SIZE,
						})}
					</p>
				</Show>
			</div>
		</Page>
	);
}

export default function BlogListPage() {
	return <BlogListView page={1} />;
}
