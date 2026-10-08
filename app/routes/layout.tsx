import { useLocation, useNavigate } from "@solidjs/router";
import * as stylex from "@stylexjs/stylex";
import { createEffect, For, type ParentProps } from "solid-js";

import {
	getLocaleDirection,
	LOCALE_LABELS,
	type Locale,
	toLocalePath,
} from "#/i18n/config.ts";
import { useDictionary } from "#/i18n/dictionary.ts";
import { SITE_NAME } from "#/seo.config.ts";
import { base } from "#/ui/base.ts";
import { Brand } from "#/ui/Brand.tsx";
import { Select } from "#/ui/Select.tsx";
import { TextLink } from "#/ui/TextLink.tsx";
import { color, font, frame, radius, space, text } from "#/ui/tokens.stylex.ts";
import { useLocale } from "#/utils/locale.ts";

const LOCALE_OPTIONS = (
	Object.entries(LOCALE_LABELS) as [Locale, string][]
).map(([value, label]) => ({ value, label }));

const DARK = "@media (prefers-color-scheme: dark)";

const styles = stylex.create({
	root: {
		display: "flex",
		flexDirection: "column",
		minHeight: "100dvh",
		backgroundColor: color.bg,
		// 页面最顶上一层很淡的橙色光晕，从视口上沿往下散开，页眉也在它里面。
		backgroundImage: {
			default: `radial-gradient(60rem 28rem at 50% 0, color-mix(in srgb, ${color.accent} 9%, transparent), transparent 72%)`,
			[DARK]: `radial-gradient(60rem 28rem at 50% 0, color-mix(in srgb, ${color.accent} 13%, transparent), transparent 72%)`,
		},
		backgroundRepeat: "no-repeat",
		color: color.text,
		fontFamily: font.body,
		fontSize: text.md,
		lineHeight: 1.5,
	},
	// 页眉和页脚与正文共用同一个宽度和留白。
	bar: {
		display: "flex",
		alignItems: "center",
		gap: space.xl,
		width: "100%",
		maxWidth: frame.width,
		marginInline: "auto",
		paddingBlock: space.xl,
		paddingInline: frame.gutter,
	},
	home: {
		marginInlineEnd: "auto",
		borderRadius: radius.xs,
		textDecoration: "none",
	},
	// 手机上页眉只留标志和语言，导航在页脚。
	nav: {
		display: { default: "flex", "@media (max-width: 640px)": "none" },
		alignItems: "center",
		gap: space.xl,
	},
	main: { display: "flex", flexDirection: "column", flexGrow: 1 },
	footer: {
		width: "100%",
		maxWidth: frame.width,
		marginInline: "auto",
		paddingInline: frame.gutter,
	},
	footerInner: {
		display: "flex",
		flexWrap: "wrap",
		alignItems: "baseline",
		justifyContent: "space-between",
		columnGap: space.xl,
		rowGap: space.md,
		paddingBlock: space.xl,
		borderBlockStartWidth: "1px",
		borderBlockStartStyle: "solid",
		borderBlockStartColor: color.border,
		color: color.subtle,
		fontSize: text.sm,
	},
	copyright: { margin: 0 },
	footerLinks: {
		display: "flex",
		flexWrap: "wrap",
		columnGap: space.lg,
		rowGap: space.xs,
	},
});

export default function Layout(props: ParentProps) {
	const location = useLocation();
	const navigate = useNavigate();
	const locale = useLocale();
	const copy = useDictionary().layout;

	const localizeLink = (path: string) => toLocalePath(path, locale());

	const isActive = (path: string) => {
		const target = localizeLink(path);
		return (
			location.pathname === target || location.pathname.startsWith(`${target}/`)
		);
	};

	const navItems = [
		{ path: "/about", label: copy.about },
		{ path: "/faq", label: copy.faq },
		{ path: "/blog", label: copy.blog },
		{ path: "/contact", label: copy.contact },
	];

	const footerItems = [
		...navItems,
		{ path: "/privacy", label: copy.privacy },
		{ path: "/terms", label: copy.terms },
	];

	createEffect(
		() => locale(),
		(nextLocale) => {
			document.documentElement.lang = nextLocale;
			document.documentElement.dir = getLocaleDirection(nextLocale);
		},
	);

	return (
		<div {...stylex.attrs(styles.root)}>
			<header {...stylex.attrs(styles.bar)}>
				<a
					href={localizeLink("/")}
					{...stylex.attrs(styles.home, base.focusRing)}
				>
					<Brand name={SITE_NAME} />
				</a>
				<nav aria-label={copy.siteSubtitle} {...stylex.attrs(styles.nav)}>
					<For each={navItems} keyed={(item) => item.path}>
						{(item) => (
							<TextLink
								href={localizeLink(item().path)}
								active={isActive(item().path)}
							>
								{item().label}
							</TextLink>
						)}
					</For>
				</nav>
				<Select
					icon="globe"
					label={copy.language}
					value={locale()}
					options={LOCALE_OPTIONS}
					onChange={(target) => {
						if (target !== locale()) {
							navigate(
								`${toLocalePath(location.pathname, target)}${location.search}${location.hash}`,
							);
						}
					}}
				/>
			</header>

			<main {...stylex.attrs(styles.main)}>{props.children}</main>

			<footer {...stylex.attrs(styles.footer)}>
				<div {...stylex.attrs(styles.footerInner)}>
					<p {...stylex.attrs(styles.copyright)}>
						© {new Date().getUTCFullYear()} {SITE_NAME} · {copy.copyright}
					</p>
					<nav {...stylex.attrs(styles.footerLinks)}>
						<For each={footerItems} keyed={(item) => item.path}>
							{(item) => (
								<TextLink tone="subtle" href={localizeLink(item().path)}>
									{item().label}
								</TextLink>
							)}
						</For>
					</nav>
				</div>
			</footer>
		</div>
	);
}
