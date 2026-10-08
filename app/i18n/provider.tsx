import { Dynamic } from "@solidjs/web";
import { type Component, lazy, type ParentProps } from "solid-js";

import { useLocale } from "#/utils/locale.ts";

import type { Locale } from "./config.ts";

// 每种语言的文案是一个懒加载的分块，以“提供文案的组件”的形式加载：
// 服务端渲染时会把对应分块的地址写进页面，浏览器水合前先把它取回来，
// 文案本身不用再随 HTML 传一遍。
const providers: Record<Locale, Component<ParentProps>> = {
	en: lazy(() => import("./locales/en.tsx")),
	zh: lazy(() => import("./locales/zh.tsx")),
	es: lazy(() => import("./locales/es.tsx")),
	fr: lazy(() => import("./locales/fr.tsx")),
	de: lazy(() => import("./locales/de.tsx")),
	ja: lazy(() => import("./locales/ja.tsx")),
	ko: lazy(() => import("./locales/ko.tsx")),
	ru: lazy(() => import("./locales/ru.tsx")),
	pt: lazy(() => import("./locales/pt.tsx")),
	ar: lazy(() => import("./locales/ar.tsx")),
	id: lazy(() => import("./locales/id.tsx")),
	vi: lazy(() => import("./locales/vi.tsx")),
	hi: lazy(() => import("./locales/hi.tsx")),
	bn: lazy(() => import("./locales/bn.tsx")),
	ur: lazy(() => import("./locales/ur.tsx")),
	tr: lazy(() => import("./locales/tr.tsx")),
	th: lazy(() => import("./locales/th.tsx")),
	it: lazy(() => import("./locales/it.tsx")),
	pl: lazy(() => import("./locales/pl.tsx")),
};

/** 按 URL 里的语言加载文案，并提供给它下面的所有组件。 */
export function I18n(props: ParentProps) {
	const locale = useLocale();
	return <Dynamic component={providers[locale()]}>{props.children}</Dynamic>;
}
