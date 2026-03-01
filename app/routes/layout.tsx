import { useEffect, useRef, useState } from "react";
import {
	Link,
	NavLink,
	Outlet,
	redirect,
	useLocation,
	useNavigate,
} from "react-router";
import {
	LOCALE_LABELS,
	type Locale,
	resolveLocaleParam,
	stripDefaultLocalePrefix,
	toLocalePath,
} from "~/i18n/config";
import { getDictionary } from "~/i18n/messages";
import {
	createThemeCookie,
	parseThemeFromCookieHeader,
	type ThemeMode,
} from "~/utils/theme";
import type { Route } from "./+types/layout";

const CONTACT_LABELS: Record<Locale, string> = {
	en: "Contact",
	zh: "联系",
	es: "Contacto",
	fr: "Contact",
	de: "Kontakt",
	ja: "お問い合わせ",
	ko: "문의",
	ru: "Контакты",
	pt: "Contato",
	ar: "اتصل بنا",
};

export async function loader({ params, request }: Route.LoaderArgs) {
	const { locale, shouldRedirectToDefault, isInvalid } = resolveLocaleParam(
		params.lang,
	);
	if (isInvalid) {
		throw new Response("Not Found", { status: 404 });
	}
	if (shouldRedirectToDefault) {
		const url = new URL(request.url);
		const normalizedPath = stripDefaultLocalePrefix(url.pathname);
		throw redirect(`${normalizedPath}${url.search}`, 301);
	}
	const theme = parseThemeFromCookieHeader(request.headers.get("Cookie"));
	return {
		locale,
		theme,
		renderedYear: new Date().getUTCFullYear(),
	};
}

export default function Layout({ loaderData }: Route.ComponentProps) {
	const [theme, setTheme] = useState<ThemeMode>(loaderData.theme);
	const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const languageMenuRef = useRef<HTMLDivElement | null>(null);
	const mobileMenuRef = useRef<HTMLDivElement | null>(null);
	const location = useLocation();
	const navigate = useNavigate();
	const locale = loaderData.locale;
	const copy = getDictionary(locale).layout;
	const localeEntries = Object.entries(LOCALE_LABELS) as [Locale, string][];
	const currentLocaleLabel = LOCALE_LABELS[locale];
	const blogLabel = locale === "zh" ? "博客" : "Blog";
	const contactLabel = CONTACT_LABELS[locale] ?? CONTACT_LABELS.en;
	const mobileLanguageLabel = locale === "zh" ? "语言" : "Language";
	const mobileAppearanceLabel = locale === "zh" ? "界面" : "Appearance";

	const localizeLink = (path: string) => toLocalePath(path, locale);

	useEffect(() => {
		if (typeof document === "undefined") {
			return;
		}
		if (theme === "light") {
			document.documentElement.dataset.theme = "light";
		} else {
			delete document.documentElement.dataset.theme;
		}
	}, [theme]);

	useEffect(() => {
		setIsLanguageMenuOpen(false);
		setIsMobileMenuOpen(false);
	}, [location.pathname, location.search, location.hash]);

	useEffect(() => {
		if (!isLanguageMenuOpen && !isMobileMenuOpen) {
			return;
		}

		const handlePointerDown = (event: PointerEvent) => {
			const target = event.target;
			if (!(target instanceof Node)) {
				return;
			}
			if (isLanguageMenuOpen && !languageMenuRef.current?.contains(target)) {
				setIsLanguageMenuOpen(false);
			}
			if (isMobileMenuOpen && !mobileMenuRef.current?.contains(target)) {
				setIsMobileMenuOpen(false);
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsLanguageMenuOpen(false);
				setIsMobileMenuOpen(false);
			}
		};

		window.addEventListener("pointerdown", handlePointerDown);
		window.addEventListener("keydown", handleEscape);
		return () => {
			window.removeEventListener("pointerdown", handlePointerDown);
			window.removeEventListener("keydown", handleEscape);
		};
	}, [isLanguageMenuOpen, isMobileMenuOpen]);

	const toggleTheme = () => {
		const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
		setTheme(nextTheme);
		document.cookie = createThemeCookie(nextTheme);
	};

	const switchLocale = (nextLocale: Locale) => {
		if (nextLocale === locale) {
			setIsLanguageMenuOpen(false);
			setIsMobileMenuOpen(false);
			return;
		}
		const targetPath = `${toLocalePath(location.pathname, nextLocale)}${location.search}${location.hash}`;
		navigate(targetPath);
		setIsLanguageMenuOpen(false);
		setIsMobileMenuOpen(false);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<div className="min-h-dvh px-4 py-4 sm:px-6 sm:py-5">
			<div className="site-frame flex min-h-[calc(100dvh-2rem)] flex-col gap-4">
				<header className="glass-panel sticky top-2 z-40 px-4 py-3 sm:px-6">
					<div className="flex items-center gap-2 sm:gap-3">
						<Link
							to={localizeLink("/")}
							prefetch="viewport"
							className="group inline-flex items-center gap-2.5"
						>
							<span className="brand-badge relative inline-flex size-[36px]">
								<img
									src="/favicon.ico"
									alt="smail.pw logo"
									className="size-[20px]"
								/>
								<span className="absolute -inset-px -z-10 rounded-xl bg-blue-500/25 blur-sm transition group-hover:bg-cyan-400/35" />
							</span>
							<div className="space-y-0.5">
								<span className="font-display block text-base font-bold tracking-tight text-theme-primary">
									smail.pw
								</span>
								<span className="block text-[10px] uppercase tracking-[0.2em] text-theme-faint">
									{copy.siteSubtitle}
								</span>
							</div>
						</Link>
						<div className="flex-1" />
						<nav className="hidden items-center gap-2 text-xs font-semibold sm:flex">
							<NavLink
								to={localizeLink("/")}
								end
								prefetch="viewport"
								className={({ isActive }) =>
									isActive ? "nav-pill-active" : "nav-pill"
								}
							>
								{copy.nav.home}
							</NavLink>
							<NavLink
								to={localizeLink("/about")}
								prefetch="viewport"
								className={({ isActive }) =>
									isActive ? "nav-pill-active" : "nav-pill"
								}
							>
								{copy.nav.about}
							</NavLink>
							<NavLink
								to={localizeLink("/faq")}
								prefetch="viewport"
								className={({ isActive }) =>
									isActive ? "nav-pill-active" : "nav-pill"
								}
							>
								{copy.nav.faq}
							</NavLink>
							<NavLink
								to={localizeLink("/blog")}
								prefetch="viewport"
								className={({ isActive }) =>
									isActive ? "nav-pill-active" : "nav-pill"
								}
							>
								{blogLabel}
							</NavLink>
							<NavLink
								to={localizeLink("/contact")}
								prefetch="viewport"
								className={({ isActive }) =>
									isActive ? "nav-pill-active" : "nav-pill"
								}
							>
								{contactLabel}
							</NavLink>
						</nav>
						<div className="mobile-menu sm:hidden" ref={mobileMenuRef}>
							<button
								type="button"
								className="mobile-menu-trigger"
								aria-haspopup="menu"
								aria-label="Toggle navigation menu"
								aria-expanded={isMobileMenuOpen}
								aria-controls="mobile-nav-panel"
								onClick={() => {
									setIsLanguageMenuOpen(false);
									setIsMobileMenuOpen((open) => !open);
								}}
							>
								<svg
									viewBox="0 0 20 20"
									fill="none"
									aria-hidden="true"
									className="mobile-menu-icon"
								>
									{isMobileMenuOpen ? (
										<path
											d="M5 5L15 15M15 5L5 15"
											stroke="currentColor"
											strokeWidth="1.8"
											strokeLinecap="round"
										/>
									) : (
										<path
											d="M3.5 5.75H16.5M3.5 10H16.5M3.5 14.25H16.5"
											stroke="currentColor"
											strokeWidth="1.8"
											strokeLinecap="round"
										/>
									)}
								</svg>
							</button>
							<div
								id="mobile-nav-panel"
								className="mobile-menu-panel"
								role="menu"
								aria-label="Site navigation"
								aria-hidden={!isMobileMenuOpen}
								data-open={isMobileMenuOpen ? "true" : "false"}
							>
								<NavLink
									to={localizeLink("/")}
									end
									prefetch="viewport"
									onClick={closeMobileMenu}
									className={({ isActive }) =>
										isActive ? "mobile-menu-link-active" : "mobile-menu-link"
									}
								>
									{copy.nav.home}
								</NavLink>
								<NavLink
									to={localizeLink("/about")}
									prefetch="viewport"
									onClick={closeMobileMenu}
									className={({ isActive }) =>
										isActive ? "mobile-menu-link-active" : "mobile-menu-link"
									}
								>
									{copy.nav.about}
								</NavLink>
								<NavLink
									to={localizeLink("/faq")}
									prefetch="viewport"
									onClick={closeMobileMenu}
									className={({ isActive }) =>
										isActive ? "mobile-menu-link-active" : "mobile-menu-link"
									}
								>
									{copy.nav.faq}
								</NavLink>
								<NavLink
									to={localizeLink("/blog")}
									prefetch="viewport"
									onClick={closeMobileMenu}
									className={({ isActive }) =>
										isActive ? "mobile-menu-link-active" : "mobile-menu-link"
									}
								>
									{blogLabel}
								</NavLink>
								<NavLink
									to={localizeLink("/contact")}
									prefetch="viewport"
									onClick={closeMobileMenu}
									className={({ isActive }) =>
										isActive ? "mobile-menu-link-active" : "mobile-menu-link"
									}
								>
									{contactLabel}
								</NavLink>
								<div className="mobile-menu-section">
									<p className="mobile-menu-section-label">
										{mobileAppearanceLabel}
									</p>
									<button
										type="button"
										className="mobile-menu-link"
										onClick={() => {
											toggleTheme();
											closeMobileMenu();
										}}
									>
										{theme === "dark" ? copy.themeToLight : copy.themeToDark}
									</button>
								</div>
								<div className="mobile-menu-section">
									<p className="mobile-menu-section-label">
										{mobileLanguageLabel}
									</p>
									<div className="mobile-menu-locale-grid">
										{localeEntries.map(([localeCode, label]) => (
											<button
												key={`mobile-${localeCode}`}
												type="button"
												className="mobile-locale-chip"
												title={label}
												aria-label={label}
												data-active={localeCode === locale}
												onClick={() => switchLocale(localeCode)}
											>
												{localeCode}
											</button>
										))}
									</div>
								</div>
							</div>
						</div>
						<div
							className="language-menu hidden sm:block"
							ref={languageMenuRef}
						>
							<button
								type="button"
								className="language-menu-trigger"
								aria-haspopup="menu"
								aria-expanded={isLanguageMenuOpen}
								onClick={() => {
									setIsMobileMenuOpen(false);
									setIsLanguageMenuOpen((open) => !open);
								}}
							>
								<span className="language-menu-icon" aria-hidden="true">
									🌐
								</span>
								<span className="language-menu-label">
									{currentLocaleLabel}
								</span>
								<span
									className="language-menu-caret"
									aria-hidden="true"
									data-open={isLanguageMenuOpen}
								>
									▾
								</span>
							</button>
							<div
								className="language-menu-panel"
								role="menu"
								aria-label="Select language"
								aria-hidden={!isLanguageMenuOpen}
								data-open={isLanguageMenuOpen ? "true" : "false"}
							>
								{localeEntries.map(([localeCode, label]) => (
									<button
										key={localeCode}
										type="button"
										role="menuitemradio"
										aria-checked={localeCode === locale}
										className="language-menu-option"
										data-active={localeCode === locale}
										onClick={() => switchLocale(localeCode)}
									>
										<span className="language-menu-check" aria-hidden="true">
											{localeCode === locale ? "✓" : ""}
										</span>
										<span className="language-menu-option-label">{label}</span>
										<span className="language-menu-option-code">
											{localeCode}
										</span>
									</button>
								))}
							</div>
						</div>
						<button
							type="button"
							className="theme-toggle hidden sm:inline-flex"
							onClick={toggleTheme}
						>
							{theme === "dark" ? copy.themeToLight : copy.themeToDark}
						</button>
					</div>
				</header>

				<main className="flex flex-1 flex-col">
					<Outlet />
				</main>

				<footer className="glass-panel mt-auto px-4 py-5 sm:px-6 sm:py-6">
					<div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
						<div className="max-w-sm space-y-3">
							<p className="soft-tag">{copy.footerTag}</p>
							<p className="text-sm leading-relaxed text-theme-secondary">
								{copy.footerDescription}
							</p>
						</div>
						<div className="grid grid-cols-2 gap-x-10 gap-y-2 text-xs font-medium">
							<NavLink
								to={localizeLink("/faq")}
								prefetch="viewport"
								className="footer-link"
							>
								{copy.footerLinks.faq}
							</NavLink>
							<NavLink
								to={localizeLink("/privacy")}
								prefetch="viewport"
								className="footer-link"
							>
								{copy.footerLinks.privacy}
							</NavLink>
							<NavLink
								to={localizeLink("/terms")}
								prefetch="viewport"
								className="footer-link"
							>
								{copy.footerLinks.terms}
							</NavLink>
							<Link
								to={localizeLink("/about")}
								prefetch="viewport"
								className="footer-link"
							>
								{copy.footerLinks.about}
							</Link>
							<Link
								to={localizeLink("/blog")}
								prefetch="viewport"
								className="footer-link"
							>
								{blogLabel}
							</Link>
							<Link
								to={localizeLink("/contact")}
								prefetch="viewport"
								className="footer-link"
							>
								{contactLabel}
							</Link>
							<a
								href="https://smail.now/"
								target="_blank"
								rel="noopener noreferrer"
								className="footer-link"
							>
								smail.now
							</a>
						</div>
					</div>
					<div className="mt-5 border-t border-theme-soft pt-4 text-[11px] text-theme-faint">
						© {loaderData.renderedYear} smail.pw · {copy.copyright}
					</div>
				</footer>
			</div>
		</div>
	);
}
