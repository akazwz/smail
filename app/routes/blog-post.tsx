import { useParams } from "@solidjs/router";
import * as stylex from "@stylexjs/stylex";
import { createMemo, Show } from "solid-js";

import type { BlogPostMeta } from "#/blog/data.ts";
import { JsonLd } from "#/components/json-ld.tsx";
import { Markdown } from "#/components/markdown.tsx";
import { Aside, Columns, Page, Section } from "#/components/page.tsx";
import { getBlogPost } from "#/data.ts";
import { toLocalePath } from "#/i18n/config.ts";
import { useDictionary } from "#/i18n/dictionary.ts";
import { BASE_URL } from "#/seo.config.ts";
import { Icon } from "#/ui/Icon.tsx";
import { LinkList } from "#/ui/LinkList.tsx";
import { TextLink } from "#/ui/TextLink.tsx";
import { color, space, text } from "#/ui/tokens.stylex.ts";
import { usePageHead } from "#/utils/head.ts";
import { useLocale } from "#/utils/locale.ts";
import { fillTemplate } from "#/utils/template.ts";

import {
	formatBlogPublishedDate,
	getBlogPostMetaTitle,
	toLanguageTag,
} from "./blog.tsx";
import NotFound from "./not-found.tsx";

const styles = stylex.create({
	article: {
		display: "grid",
		gridTemplateColumns: "minmax(0, 1fr)",
		gap: space.xl,
	},
	top: {
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
		columnGap: space.lg,
		rowGap: space.xs,
		color: color.subtle,
		fontSize: text.sm,
		fontVariantNumeric: "tabular-nums",
	},
	back: { display: "inline-flex", alignItems: "center", gap: space.xxs },
});

function BlogPost(props: { post: BlogPostMeta }) {
	const locale = useLocale();
	const { blog } = useDictionary();
	const nodes = createMemo(() => getBlogPost(locale(), props.post.slug));
	const postPath = () => `/blog/${props.post.slug}`;
	const related = () =>
		blog.posts.filter((item) => item.slug !== props.post.slug).slice(0, 3);

	usePageHead(() => ({
		title: getBlogPostMetaTitle(props.post.title, blog.postTitleSuffix),
		description: props.post.description,
		robots: "index, follow",
	}));

	const articleJsonLd = () => {
		const articleUrl = `${BASE_URL}${toLocalePath(postPath(), locale())}`;
		return {
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			headline: props.post.title,
			description: props.post.description,
			datePublished: props.post.publishedAt,
			dateModified: props.post.updatedAt ?? props.post.publishedAt,
			inLanguage: toLanguageTag(locale()),
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
	};

	return (
		<Page>
			<JsonLd data={articleJsonLd()} />
			<Columns layout="article">
				<div {...stylex.attrs(styles.article)}>
					<div {...stylex.attrs(styles.top)}>
						<TextLink
							href={toLocalePath("/blog", locale())}
							xstyle={styles.back}
						>
							<Icon name="back" size={16} />
							{blog.backToBlog}
						</TextLink>
						<span>
							{formatBlogPublishedDate(props.post.publishedAt, locale())} ·{" "}
							{fillTemplate(blog.readingTime, {
								minutes: props.post.readingMinutes,
							})}
						</span>
					</div>
					<Markdown nodes={nodes() ?? []} />
				</div>
				<Show when={related().length > 0}>
					<Aside>
						<Section title={blog.relatedPosts} compact>
							<LinkList
								items={related().map((post) => ({
									href: toLocalePath(`/blog/${post.slug}`, locale()),
									label: post.title,
									meta: formatBlogPublishedDate(post.publishedAt, locale()),
								}))}
							/>
						</Section>
					</Aside>
				</Show>
			</Columns>
		</Page>
	);
}

export default function BlogPostPage() {
	const params = useParams();
	const { blog } = useDictionary();
	const post = () => blog.posts.find((item) => item.slug === params.slug);

	return (
		<Show when={post()} fallback={<NotFound />}>
			{(current) => <BlogPost post={current()} />}
		</Show>
	);
}
