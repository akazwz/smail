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
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

const RTL_LOCALES = new Set<Locale>(["ar"]);

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

function escapeRegExp(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripLeadingLocalePrefix(pathname: string, locale: Locale): string {
	const normalized = normalizePathname(pathname);
	const pattern = new RegExp(`^/${escapeRegExp(locale)}(?:/|$)`);
	if (!pattern.test(normalized)) {
		return normalized;
	}
	const stripped = normalized.slice(locale.length + 1);
	if (!stripped) {
		return "/";
	}
	return stripped.startsWith("/") ? stripped : `/${stripped}`;
}

export function stripDefaultLocalePrefix(pathname: string): string {
	return stripLeadingLocalePrefix(pathname, DEFAULT_LOCALE);
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

export function resolveLocaleParam(lang: string | undefined): {
	locale: Locale;
	shouldRedirectToDefault: boolean;
	isInvalid: boolean;
} {
	if (!lang) {
		return {
			locale: DEFAULT_LOCALE,
			shouldRedirectToDefault: false,
			isInvalid: false,
		};
	}

	if (!isKnownLocale(lang)) {
		return {
			locale: DEFAULT_LOCALE,
			shouldRedirectToDefault: false,
			isInvalid: true,
		};
	}

	if (lang === DEFAULT_LOCALE) {
		return {
			locale: DEFAULT_LOCALE,
			shouldRedirectToDefault: true,
			isInvalid: false,
		};
	}

	return {
		locale: lang,
		shouldRedirectToDefault: false,
		isInvalid: false,
	};
}

export function isKnownLocale(value: string | undefined): value is Locale {
	if (!value) {
		return false;
	}
	return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
