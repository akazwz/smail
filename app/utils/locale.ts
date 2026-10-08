import { useLocation } from "@solidjs/router";
import { createMemo } from "solid-js";

import { getLocaleFromPathname, type Locale } from "#/i18n/config.ts";

/** 当前页面的语言，从 URL 前缀得出。 */
export function useLocale(): () => Locale {
	const location = useLocation();
	return createMemo(() => getLocaleFromPathname(location.pathname));
}
