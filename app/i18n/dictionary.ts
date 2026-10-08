import { createContext, useContext } from "solid-js";

import type { BlogPostMeta } from "#/blog/data.ts";
import type { MarkdownPageSlug } from "#/seo.config.ts";

/**
 * 一种语言的全部文案。每种语言一个文件（`locales/<语言>.tsx`），各自打成一个分块：
 * 访客只下载自己语言的那一份。所有语言文件都必须满足这个类型，漏翻译在类型检查时就报错。
 */
export interface Dictionary {
	home: {
		title: string;
		description: string;
		keywords: string;
		heroTitle: string;
		heroDescription: string;
		badge: string;
		copy: string;
		copied: string;
		deleteAddress: string;
		replaceAddress: string;
		// 更换、删除地址前的确认框。
		replaceConfirmTitle: string;
		deleteConfirmTitle: string;
		// 模板：{address} 是当前地址。
		confirmBody: string;
		generating: string;
		noAddressTitle: string;
		noAddressDescription: string;
		generateAddress: string;
		// 生成、更换、删除地址或刷新没成功时的提示。
		actionFailed: string;
		inboxTitle: string;
		emptyInboxTitle: string;
		emptyInboxDescription: string;
		refreshInbox: string;
		refreshingInbox: string;
		liveOn: string;
		liveOff: string;
		safetyHint: string;
		modal: {
			title: string;
			from: string;
			time: string;
			loading: string;
			empty: string;
		};
		narrative: { title: string; description: string; points: string[] };
		jsonLdDescription: string;
	};
	layout: {
		siteSubtitle: string;
		about: string;
		faq: string;
		blog: string;
		contact: string;
		privacy: string;
		terms: string;
		language: string;
		copyright: string;
	};
	common: { close: string; cancel: string };
	guides: { title: string; items: { label: string; path: string }[] };
	contact: {
		metaTitle: string;
		metaDescription: string;
		title: string;
		description: string;
		// 留言表单
		formTitle: string;
		messageLabel: string;
		messagePlaceholder: string;
		contactLabel: string;
		// 显示在联系方式输入框下面的一行说明。
		contactHint: string;
		send: string;
		sending: string;
		sent: string;
		tooMany: string;
		failed: string;
		faqHint: string;
		faqCta: string;
		homeCta: string;
	};
	blog: {
		title: string;
		description: string;
		header: string;
		subheader: string;
		readArticle: string;
		prevPage: string;
		nextPage: string;
		backToBlog: string;
		relatedPosts: string;
		postTitleSuffix: string;
		// 模板：{page} 当前页，{total} 总页数，{size} 每页篇数。
		pageSummary: string;
		// 模板：{minutes} 阅读分钟数。
		readingTime: string;
		posts: BlogPostMeta[];
	};
	md: {
		meta: Record<MarkdownPageSlug, { title: string; description: string }>;
		breadcrumbHome: string;
		cta: { title: string; description: string; action: string };
	};
}

export const DictionaryContext = createContext<Dictionary>();

/** 当前语言的文案。语言一变，整棵页面树会在新语言下重新挂载，所以这里拿到的是普通对象。 */
export function useDictionary(): Dictionary {
	return useContext(DictionaryContext);
}
