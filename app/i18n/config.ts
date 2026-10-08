export const DEFAULT_LOCALE = "en" as const;
export const SUPPORTED_LOCALES = [
	"en",
	"zh",
	"es",
	"fr",
	"de",
	"ja",
	"ko",
	"ru",
	"pt",
	"ar",
	"id",
	"vi",
	"hi",
	"bn",
	"ur",
	"tr",
	"th",
	"it",
	"pl",
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

const RTL_LOCALES = new Set<Locale>(["ar", "ur"]);

export const LOCALE_LABELS: Record<Locale, string> = {
	en: "English",
	zh: "中文",
	es: "Español",
	fr: "Français",
	de: "Deutsch",
	ja: "日本語",
	ko: "한국어",
	ru: "Русский",
	pt: "Português",
	ar: "العربية",
	id: "Bahasa Indonesia",
	vi: "Tiếng Việt",
	hi: "हिन्दी",
	bn: "বাংলা",
	ur: "اردو",
	tr: "Türkçe",
	th: "ไทย",
	it: "Italiano",
	pl: "Polski",
};

export function normalizePathname(pathname: string): string {
	if (!pathname) {
		return "/";
	}
	if (pathname !== "/" && pathname.endsWith("/")) {
		return pathname.slice(0, -1);
	}
	return pathname;
}

export function getLocaleFromPathname(pathname: string): Locale {
	const normalized = normalizePathname(pathname);
	for (const locale of SUPPORTED_LOCALES) {
		if (locale === DEFAULT_LOCALE) {
			continue;
		}
		if (normalized === `/${locale}` || normalized.startsWith(`/${locale}/`)) {
			return locale;
		}
	}
	return DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname: string): string {
	const normalized = normalizePathname(pathname);
	for (const locale of SUPPORTED_LOCALES) {
		if (normalized === `/${locale}` || normalized.startsWith(`/${locale}/`)) {
			const stripped = normalized.slice(locale.length + 1);
			return stripped.length > 0 ? stripped : "/";
		}
	}
	return normalized;
}

export function toLocalePath(pathname: string, locale: Locale): string {
	const basePath = stripLocalePrefix(pathname);
	if (locale === DEFAULT_LOCALE) {
		return basePath;
	}
	return basePath === "/" ? `/${locale}` : `/${locale}${basePath}`;
}

export function getLocaleDirection(locale: Locale): "ltr" | "rtl" {
	return RTL_LOCALES.has(locale) ? "rtl" : "ltr";
}

export function toIntlLocale(locale: Locale): string {
	switch (locale) {
		case "en":
			return "en-US";
		case "zh":
			return "zh-CN";
		case "pt":
			return "pt-BR";
		default:
			return locale;
	}
}

export function isKnownLocale(value: string | undefined): value is Locale {
	if (!value) {
		return false;
	}
	return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
