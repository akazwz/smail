import { createRouter } from "@solidjs/router";
import { lazy } from "solid-js";

import { getBlogPost, getMarkdownPage } from "#/data.ts";
import {
	DEFAULT_LOCALE,
	isKnownLocale,
	type Locale,
	SUPPORTED_LOCALES,
} from "#/i18n/config.ts";
import Home from "#/routes/home.tsx";
import { MARKDOWN_BASE_PATHS } from "#/seo.config.ts";

const LOCALE_PREFIXES = SUPPORTED_LOCALES.filter(
	(locale) => locale !== DEFAULT_LOCALE,
);
const MARKDOWN_SLUGS = MARKDOWN_BASE_PATHS.map((path) => path.slice(1));

const lang = [...LOCALE_PREFIXES];

function toLocale(value: string | undefined): Locale {
	return isKnownLocale(value) ? value : DEFAULT_LOCALE;
}

export const Router = createRouter({
	routes: [
		{
			path: "/:lang?",
			matchFilters: { lang },
			component: Home,
		},
		{
			path: "/:lang?/contact",
			matchFilters: { lang },
			component: lazy(() => import("#/routes/contact.tsx")),
		},
		{
			path: "/:lang?/blog",
			matchFilters: { lang },
			component: lazy(() => import("#/routes/blog.tsx")),
		},
		{
			path: "/:lang?/blog/page/:page",
			matchFilters: { lang, page: /^\d+$/ },
			component: lazy(() => import("#/routes/blog-page.tsx")),
		},
		{
			path: "/:lang?/blog/:slug",
			matchFilters: { lang },
			component: lazy(() => import("#/routes/blog-post.tsx")),
			preload: ({ params }) =>
				void getBlogPost(toLocale(params.lang), params.slug ?? ""),
		},
		{
			path: "/:lang?/:slug",
			matchFilters: { lang, slug: MARKDOWN_SLUGS },
			component: lazy(() => import("#/routes/md.tsx")),
			preload: ({ params }) =>
				void getMarkdownPage(toLocale(params.lang), params.slug ?? ""),
		},
		{ path: "*404", component: lazy(() => import("#/routes/not-found.tsx")) },
	],
});
