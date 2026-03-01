import { Link, redirect } from "react-router";
import {
	BLOG_PAGE_SIZE,
	getBlogPageCount,
	getBlogPostsByPage,
	listBlogPosts,
} from "~/blog/data";
import {
	DEFAULT_LOCALE,
	type Locale,
	resolveLocaleParam,
	stripDefaultLocalePrefix,
	toIntlLocale,
	toLocalePath,
} from "~/i18n/config";
import { BASE_URL, isBlogLocaleIndexable } from "~/seo.config";
import { mergeRouteMeta } from "~/utils/meta";
import type { Route } from "./+types/blog";

function getLocaleFromParams(lang: string | undefined): Locale {
	const { locale } = resolveLocaleParam(lang);
	return locale;
}

type BlogCopy = {
	title: string;
	description: string;
	header: string;
	subheader: string;
	tag: string;
	readArticle: string;
	prevPage: string;
	nextPage: string;
	backToBlog: string;
	relatedPosts: string;
	currentArticle: string;
	postTitleSuffix: string;
};

const BLOG_COPY: Record<Locale, BlogCopy> = {
	en: {
		title: "Temporary Email Guides, Tips & Fixes | smail.pw",
		description:
			"Temporary email guides, best practices, and troubleshooting tips for verification and disposable inbox workflows.",
		header: "smail.pw Blog",
		subheader: "Guides and troubleshooting for temporary email users",
		tag: "Blog",
		readArticle: "Read article",
		prevPage: "Prev",
		nextPage: "Next",
		backToBlog: "Back to blog",
		relatedPosts: "Related posts",
		currentArticle: "Current article",
		postTitleSuffix: " | smail.pw Blog",
	},
	zh: {
		title:
			"临时邮箱博客：注册、验证码、隐私保护与收信排障实用完整指南 | smail.pw",
		description:
			"临时邮箱使用指南：最佳实践、收信排障、临时邮箱与邮箱别名对比。",
		header: "smail.pw 博客",
		subheader: "临时邮箱使用指南与实用排障手册",
		tag: "博客",
		readArticle: "阅读全文",
		prevPage: "上一页",
		nextPage: "下一页",
		backToBlog: "返回博客",
		relatedPosts: "相关文章",
		currentArticle: "当前文章",
		postTitleSuffix: " | smail.pw 临时邮箱博客实用指南",
	},
	es: {
		title: "Blog de correo temporal: guías y soluciones | smail.pw",
		description:
			"Guías de correo temporal, buenas prácticas y pasos de solución para registros, verificación y bandejas desechables.",
		header: "Blog de smail.pw",
		subheader:
			"Guías y resolución de problemas para usuarios de correo temporal",
		tag: "Blog",
		readArticle: "Leer artículo",
		prevPage: "Anterior",
		nextPage: "Siguiente",
		backToBlog: "Volver al blog",
		relatedPosts: "Artículos relacionados",
		currentArticle: "Artículo actual",
		postTitleSuffix: " | Blog de smail.pw",
	},
	fr: {
		title: "Blog email temporaire: guides et dépannage | smail.pw",
		description:
			"Guides d'email temporaire, bonnes pratiques et dépannage pour l'inscription, la vérification et les boîtes jetables.",
		header: "Blog smail.pw",
		subheader: "Guides et dépannage pour les utilisateurs d'email temporaire",
		tag: "Blog",
		readArticle: "Lire l'article",
		prevPage: "Précédent",
		nextPage: "Suivant",
		backToBlog: "Retour au blog",
		relatedPosts: "Articles liés",
		currentArticle: "Article actuel",
		postTitleSuffix: " | Blog smail.pw",
	},
	de: {
		title: "Temporäre E-Mail Blog: Ratgeber und Hilfe | smail.pw",
		description:
			"Ratgeber, Best Practices und Fehlerbehebung für temporäre E-Mails bei Registrierung und Verifizierung.",
		header: "smail.pw Blog",
		subheader: "Leitfäden und Fehlerbehebung für Nutzer temporärer E-Mails",
		tag: "Blog",
		readArticle: "Artikel lesen",
		prevPage: "Zurück",
		nextPage: "Weiter",
		backToBlog: "Zurück zum Blog",
		relatedPosts: "Ähnliche Artikel",
		currentArticle: "Aktueller Artikel",
		postTitleSuffix: " | smail.pw Blog",
	},
	ja: {
		title:
			"一時メールブログ：登録・認証・受信トラブルの実用解決ガイド | smail.pw",
		description:
			"一時メールの使い方、ベストプラクティス、認証や受信トラブルの解決手順をまとめたガイドです。",
		header: "smail.pw ブログ",
		subheader: "一時メール利用者向けガイドとトラブル解決",
		tag: "ブログ",
		readArticle: "記事を読む",
		prevPage: "前へ",
		nextPage: "次へ",
		backToBlog: "ブログに戻る",
		relatedPosts: "関連記事",
		currentArticle: "現在の記事",
		postTitleSuffix: " | smail.pw 一時メールブログ",
	},
	ko: {
		title: "임시 이메일 블로그: 가입·인증·수신 문제 해결 가이드 | smail.pw",
		description:
			"임시 이메일 사용 가이드, 모범 사례, 가입·인증·수신 문제 해결 방법을 제공합니다.",
		header: "smail.pw 블로그",
		subheader: "임시 이메일 사용자를 위한 가이드와 문제 해결",
		tag: "블로그",
		readArticle: "기사 읽기",
		prevPage: "이전",
		nextPage: "다음",
		backToBlog: "블로그로 돌아가기",
		relatedPosts: "관련 글",
		currentArticle: "현재 글",
		postTitleSuffix: " | smail.pw 임시 이메일 블로그",
	},
	ru: {
		title: "Блог временной почты: руководства и решения | smail.pw",
		description:
			"Руководства по временной почте, лучшие практики и устранение проблем для регистрации и подтверждений.",
		header: "Блог smail.pw",
		subheader: "Гайды и устранение проблем для пользователей временной почты",
		tag: "Блог",
		readArticle: "Читать статью",
		prevPage: "Назад",
		nextPage: "Далее",
		backToBlog: "Назад в блог",
		relatedPosts: "Похожие статьи",
		currentArticle: "Текущая статья",
		postTitleSuffix: " | Блог smail.pw",
	},
	pt: {
		title: "Blog de email temporário: guias e soluções | smail.pw",
		description:
			"Guias de email temporário, boas práticas e resolução de problemas para cadastro, verificação e caixas descartáveis.",
		header: "Blog smail.pw",
		subheader: "Guias e solução de problemas para usuários de email temporário",
		tag: "Blog",
		readArticle: "Ler artigo",
		prevPage: "Anterior",
		nextPage: "Próxima",
		backToBlog: "Voltar ao blog",
		relatedPosts: "Artigos relacionados",
		currentArticle: "Artigo atual",
		postTitleSuffix: " | Blog smail.pw",
	},
	ar: {
		title: "مدونة البريد المؤقت: أدلة وحلول للمشكلات | smail.pw",
		description:
			"أدلة البريد المؤقت، أفضل الممارسات، وحلول مشكلات التسجيل والتحقق واستقبال الرسائل.",
		header: "مدونة smail.pw",
		subheader: "أدلة وحلول لمستخدمي البريد المؤقت",
		tag: "مدونة",
		readArticle: "اقرأ المقال",
		prevPage: "السابق",
		nextPage: "التالي",
		backToBlog: "العودة إلى المدونة",
		relatedPosts: "مقالات ذات صلة",
		currentArticle: "المقال الحالي",
		postTitleSuffix: " | مدونة smail.pw",
	},
};

function getBlogCopy(locale: Locale): BlogCopy {
	return BLOG_COPY[locale];
}

export function getBlogListCopy(locale: Locale): {
	title: string;
	description: string;
	header: string;
	subheader: string;
} {
	const copy = getBlogCopy(locale);
	return {
		title: copy.title,
		description: copy.description,
		header: copy.header,
		subheader: copy.subheader,
	};
}

export function getBlogUiCopy(
	locale: Locale,
): Omit<
	BlogCopy,
	"title" | "description" | "header" | "subheader" | "postTitleSuffix"
> {
	const {
		tag,
		readArticle,
		prevPage,
		nextPage,
		backToBlog,
		relatedPosts,
		currentArticle,
	} = getBlogCopy(locale);
	return {
		tag,
		readArticle,
		prevPage,
		nextPage,
		backToBlog,
		relatedPosts,
		currentArticle,
	};
}

export function getBlogPostMetaTitle(
	locale: Locale,
	postTitle: string,
): string {
	const maxTitleLength = 60;
	const localizedSuffix = getBlogCopy(locale).postTitleSuffix;
	const titleWithLocalizedSuffix = `${postTitle}${localizedSuffix}`;
	if (titleWithLocalizedSuffix.length <= maxTitleLength) {
		return titleWithLocalizedSuffix;
	}

	const fallbackSuffix = " | smail.pw";
	const titleWithFallbackSuffix = `${postTitle}${fallbackSuffix}`;
	if (titleWithFallbackSuffix.length <= maxTitleLength) {
		return titleWithFallbackSuffix;
	}

	if (postTitle.length <= maxTitleLength) {
		return postTitle;
	}

	return `${postTitle.slice(0, maxTitleLength - 1)}…`;
}

export function getBlogNotFoundMetaTitle(locale: Locale): string {
	return getBlogCopy(locale).title;
}

export function formatBlogPageTitle(
	_locale: Locale,
	baseTitle: string,
	page: number,
): string {
	return `${baseTitle} · ${page}`;
}

export function formatBlogPaginationSummary(
	locale: Locale,
	page: number,
	totalPages: number,
): string {
	switch (locale) {
		case "zh":
			return `第 ${page} / ${totalPages} 页 · 每页 ${BLOG_PAGE_SIZE} 篇`;
		case "es":
			return `Página ${page} de ${totalPages} · ${BLOG_PAGE_SIZE} artículos por página`;
		case "fr":
			return `Page ${page} sur ${totalPages} · ${BLOG_PAGE_SIZE} articles par page`;
		case "de":
			return `Seite ${page} von ${totalPages} · ${BLOG_PAGE_SIZE} Artikel pro Seite`;
		case "ja":
			return `${page}/${totalPages}ページ · 1ページあたり${BLOG_PAGE_SIZE}件`;
		case "ko":
			return `${page} / ${totalPages}페이지 · 페이지당 ${BLOG_PAGE_SIZE}개`;
		case "ru":
			return `Страница ${page} из ${totalPages} · ${BLOG_PAGE_SIZE} статей на странице`;
		case "pt":
			return `Página ${page} de ${totalPages} · ${BLOG_PAGE_SIZE} artigos por página`;
		case "ar":
			return `الصفحة ${page} من ${totalPages} · ${BLOG_PAGE_SIZE} مقالات لكل صفحة`;
		default:
			return `Page ${page} of ${totalPages} · ${BLOG_PAGE_SIZE} posts per page`;
	}
}

export function toLanguageTag(locale: Locale): string {
	return toIntlLocale(locale);
}

export function formatBlogPublishedDate(
	publishedAt: string,
	locale: Locale,
): string {
	return new Date(publishedAt).toLocaleDateString(toIntlLocale(locale), {
		timeZone: "UTC",
	});
}

export function getBlogPagePath(page: number): string {
	return page <= 1 ? "/blog" : `/blog/page/${page}`;
}

export function meta({ params, matches }: Route.MetaArgs) {
	const locale = getLocaleFromParams(params.lang);
	const copy = getBlogListCopy(locale);
	const metaItems = [
		{ title: copy.title },
		{ name: "description", content: copy.description },
		{
			name: "robots",
			content: isBlogLocaleIndexable(locale)
				? "index, follow"
				: "noindex, follow",
		},
	];

	return mergeRouteMeta(matches, metaItems);
}

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

	const totalPosts = listBlogPosts(locale).length;
	const totalPages = getBlogPageCount(locale);

	return {
		locale,
		page: 1,
		totalPosts,
		totalPages,
		posts: getBlogPostsByPage(locale, 1),
	};
}

export default function BlogListPage({ loaderData }: Route.ComponentProps) {
	const locale = loaderData.locale || DEFAULT_LOCALE;
	const copy = getBlogListCopy(locale);
	const uiCopy = getBlogUiCopy(locale);
	const blogUrl = `${BASE_URL}${toLocalePath(getBlogPagePath(loaderData.page), locale)}`;
	const itemListJsonLd = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: copy.header,
		description: copy.description,
		inLanguage: toLanguageTag(locale),
		url: blogUrl,
		numberOfItems: loaderData.totalPosts,
		itemListElement: loaderData.posts.map((post, index) => ({
			"@type": "ListItem",
			position: index + 1,
			url: `${BASE_URL}${toLocalePath(`/blog/${post.slug}`, locale)}`,
			name: post.title,
		})),
	};

	return (
		<div className="flex flex-1 py-3 sm:py-4">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
			/>
			<div className="glass-panel w-full px-4 py-5 sm:px-6 sm:py-6">
				<header className="mb-6 space-y-2">
					<p className="soft-tag">{uiCopy.tag}</p>
					<h1 className="text-theme-primary font-display text-2xl font-bold sm:text-3xl">
						{copy.header}
					</h1>
					<p className="text-theme-secondary text-sm">{copy.subheader}</p>
				</header>

				<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
					{loaderData.posts.map((post) => (
						<article
							key={post.slug}
							className="theme-card flex h-full flex-col p-4"
						>
							<p className="text-theme-faint text-[11px]">
								{formatBlogPublishedDate(post.publishedAt, locale)}{" "}
								· {post.readingMinutes} min
							</p>
							<h2 className="text-theme-primary font-display mt-2 line-clamp-2 text-base font-semibold">
								{post.title}
							</h2>
							<p className="text-theme-muted mt-2 line-clamp-4 text-sm">
								{post.description}
							</p>
							<div className="mt-4">
								<Link
									to={toLocalePath(`/blog/${post.slug}`, locale)}
									prefetch="viewport"
									className="theme-badge inline-flex px-3 py-1.5 text-[11px] font-semibold"
								>
									{uiCopy.readArticle}
								</Link>
							</div>
						</article>
					))}
				</div>

				{loaderData.totalPages > 1 && (
					<nav
						className="mt-6 flex flex-wrap items-center gap-2"
						aria-label="Blog pagination"
					>
						{Array.from(
							{ length: loaderData.totalPages },
							(_, index) => index + 1,
						).map((pageNumber) => {
							const isCurrent = pageNumber === loaderData.page;
							return (
								<Link
									key={pageNumber}
									to={toLocalePath(getBlogPagePath(pageNumber), locale)}
									prefetch="viewport"
									aria-current={isCurrent ? "page" : undefined}
									className={`theme-badge px-3 py-1.5 text-[11px] font-semibold ${isCurrent ? "brightness-95" : "hover:brightness-95"}`}
								>
									{pageNumber}
								</Link>
							);
						})}
						<Link
							to={toLocalePath(getBlogPagePath(2), locale)}
							prefetch="viewport"
							className="theme-badge ml-1 px-3 py-1.5 text-[11px] font-semibold hover:brightness-95"
						>
							{uiCopy.nextPage}
						</Link>
					</nav>
				)}

				{loaderData.totalPages > 1 && (
					<p className="text-theme-faint mt-3 text-[11px]">
						{formatBlogPaginationSummary(
							locale,
							loaderData.page,
							loaderData.totalPages,
						)}
					</p>
				)}
			</div>
		</div>
	);
}
