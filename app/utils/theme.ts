export type ThemeMode = "dark" | "light";

export const DEFAULT_THEME: ThemeMode = "light";
export const THEME_COOKIE_NAME = "smail-theme";
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isThemeMode(
	value: string | null | undefined,
): value is ThemeMode {
	return value === "dark" || value === "light";
}

export function parseThemeFromCookieHeader(
	cookieHeader: string | null | undefined,
): ThemeMode {
	if (!cookieHeader) {
		return DEFAULT_THEME;
	}

	const pairs = cookieHeader.split(";");
	for (const pair of pairs) {
		const [name, rawValue] = pair.trim().split("=");
		if (name !== THEME_COOKIE_NAME) {
			continue;
		}
		if (isThemeMode(rawValue)) {
			return rawValue;
		}
	}

	return DEFAULT_THEME;
}

export function createThemeCookie(theme: ThemeMode): string {
	return `${THEME_COOKIE_NAME}=${theme}; Path=/; Max-Age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
}
