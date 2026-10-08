import { useParams } from "@solidjs/router";
import * as stylex from "@stylexjs/stylex";
import { createMemo, Show } from "solid-js";

import { GuideLinks } from "#/components/guide-links.tsx";
import { JsonLd } from "#/components/json-ld.tsx";
import { Markdown } from "#/components/markdown.tsx";
import { Aside, Columns, Page } from "#/components/page.tsx";
import { getMarkdownPage } from "#/data.ts";
import { type Locale, toLocalePath } from "#/i18n/config.ts";
import { useDictionary } from "#/i18n/dictionary.ts";
import { BASE_URL, SITE_NAME, type MarkdownPageSlug } from "#/seo.config.ts";
import type { MarkdownNode } from "#/types/markdown.ts";
import { ButtonLink } from "#/ui/Button.tsx";
import { Card } from "#/ui/Card.tsx";
import { Icon } from "#/ui/Icon.tsx";
import { color, space, text } from "#/ui/tokens.stylex.ts";
import { usePageHead } from "#/utils/head.ts";
import { useLocale } from "#/utils/locale.ts";

const INFO_PAGES: ReadonlySet<MarkdownPageSlug> = new Set([
	"about",
	"faq",
	"privacy",
	"terms",
]);

const styles = stylex.create({
	cta: { display: "grid", gap: space.md, justifyItems: "start" },
	ctaTitle: { margin: 0, fontSize: text.md, fontWeight: 600, lineHeight: 1.4 },
	ctaText: {
		margin: 0,
		color: color.muted,
		fontSize: text.sm,
		lineHeight: 1.6,
	},
});

function getHeadline(title: string): string {
	const [headline] = title.split("|");
	return headline?.trim() || title;
}

function toText(node: MarkdownNode): string {
	if (typeof node === "string") {
		return node;
	}
	// 列表的各项之间补一个空格，其余标签直接拼接。
	const separator = node.name === "ul" || node.name === "ol" ? " " : "";
	return node.children.map(toText).join(separator).trim();
}

/**
 * FAQ 页的结构化数据直接从正文里取：### 是问题，它后面到下一个 ### 之前的内容是答案。
 * 这样搜索引擎读到的问答和页面上显示的永远一致，也不用在文案里再维护一份。
 */
function getFaqJsonLd(nodes: MarkdownNode[], pageUrl: string) {
	const entries: { question: string; answer: string[] }[] = [];
	for (const node of nodes) {
		if (typeof node === "string") {
			continue;
		}
		if (node.name === "h3") {
			entries.push({ question: toText(node), answer: [] });
		} else {
			entries.at(-1)?.answer.push(toText(node));
		}
	}
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: entries
			.filter((entry) => entry.answer.length > 0)
			.map((entry) => ({
				"@type": "Question",
				name: entry.question,
				acceptedAnswer: {
					"@type": "Answer",
					text: entry.answer.join(" "),
				},
			})),
		url: pageUrl,
	};
}

function getArticleJsonLd(
	locale: Locale,
	meta: { title: string; description: string },
	pageUrl: string,
) {
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: getHeadline(meta.title),
		description: meta.description,
		inLanguage: locale,
		mainEntityOfPage: pageUrl,
		datePublished: "2026-03-01",
		// 内容整体改过之后把这个日期改成当天。
		dateModified: "2026-10-07",
		author: {
			"@type": "Organization",
			name: SITE_NAME,
		},
		publisher: {
			"@type": "Organization",
			name: SITE_NAME,
			url: BASE_URL,
		},
	};
}

function getBreadcrumbJsonLd(
	locale: Locale,
	homeLabel: string,
	meta: { title: string },
	pageUrl: string,
) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: homeLabel,
				item: `${BASE_URL}${toLocalePath("/", locale)}`,
			},
			{
				"@type": "ListItem",
				position: 2,
				name: getHeadline(meta.title),
				item: pageUrl,
			},
		],
	};
}

export default function MarkdownPage() {
	const params = useParams();
	const locale = useLocale();
	const { md } = useDictionary();
	// 路由的 matchFilters 已保证 slug 是已知页面
	const slug = () => params.slug as MarkdownPageSlug;
	const nodes = createMemo(() => getMarkdownPage(locale(), slug()));
	const meta = () => md.meta[slug()];
	const pageUrl = () => `${BASE_URL}${toLocalePath(`/${slug()}`, locale())}`;
	const isInfoPage = () => INFO_PAGES.has(slug());
	const isFaqPage = () => slug() === "faq";

	usePageHead(() => ({
		title: meta().title,
		description: meta().description,
		robots: "index, follow",
	}));

	return (
		<Page>
			<Show when={isFaqPage()}>
				<JsonLd data={getFaqJsonLd(nodes() ?? [], pageUrl())} />
			</Show>
			<Show when={!isInfoPage()}>
				<JsonLd data={getArticleJsonLd(locale(), meta(), pageUrl())} />
				<JsonLd
					data={getBreadcrumbJsonLd(
						locale(),
						md.breadcrumbHome,
						meta(),
						pageUrl(),
					)}
				/>
			</Show>
			<Columns layout="article">
				<Markdown nodes={nodes() ?? []} />
				<Aside>
					<Show when={isInfoPage()}>
						<Card padding="compact" xstyle={styles.cta}>
							<h2 {...stylex.attrs(styles.ctaTitle)}>{md.cta.title}</h2>
							<p {...stylex.attrs(styles.ctaText)}>{md.cta.description}</p>
							<ButtonLink
								variant="solid"
								size="sm"
								href={toLocalePath("/", locale())}
							>
								<Icon name="mail" size={14} />
								{md.cta.action}
							</ButtonLink>
						</Card>
					</Show>
					<GuideLinks compact />
				</Aside>
			</Columns>
		</Page>
	);
}
