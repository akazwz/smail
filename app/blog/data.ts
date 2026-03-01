import type { Locale } from "~/i18n/config";

export const BLOG_LOCALES = [
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
export const BLOG_PAGE_SIZE = 6;

export type BlogLocale = (typeof BLOG_LOCALES)[number];

export type BlogPostMeta = {
	slug: string;
	title: string;
	description: string;
	publishedAt: string;
	updatedAt?: string;
	readingMinutes: number;
};

const BLOG_POSTS: Record<BlogLocale, BlogPostMeta[]> = {
	en: [
		{
			slug: "temporary-email-best-practices",
			title: "Temporary Email Best Practices for Safer Sign-Ups",
			description:
				"Learn practical temporary email best practices to reduce spam, avoid lockouts, and protect your primary inbox.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "Temporary Email vs Email Alias: Which One Should You Use?",
			description:
				"Compare temporary inboxes and email aliases by privacy, recovery, and long-term account safety.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "OTP Email Not Arriving? 8 Fast Fixes That Usually Work",
			description:
				"Troubleshoot delayed verification emails with a practical checklist for resend issues, sender blocks, and inbox refresh flow.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	zh: [
		{
			slug: "temporary-email-best-practices",
			title: "临时邮箱最佳实践：更安全地完成注册",
			description:
				"用一套可执行的方法减少垃圾邮件、避免账号锁死，并保护你的主邮箱。",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "临时邮箱 vs 邮箱别名：到底该用哪种？",
			description:
				"从隐私、可恢复性、长期账号安全三个角度，比较临时邮箱与邮箱别名。",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "收不到验证码邮件？8 个高效排查方法",
			description:
				"快速定位验证码邮件延迟或丢失问题：重发、拦截、刷新策略与备用方案。",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	es: [
		{
			slug: "temporary-email-best-practices",
			title: "Buenas prácticas de correo temporal para registros más seguros",
			description:
				"Aprende prácticas de correo temporal para reducir spam, evitar bloqueos y proteger tu bandeja principal.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "Correo temporal vs alias de correo: ¿cuál te conviene?",
			description:
				"Compara correo temporal y alias por privacidad, recuperación y seguridad de cuentas a largo plazo.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "¿No llega el correo OTP? 8 soluciones rápidas que funcionan",
			description:
				"Resuelve correos de verificación retrasados con una lista práctica de reenvío, bloqueos del remitente y refresco del buzón.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	fr: [
		{
			slug: "temporary-email-best-practices",
			title:
				"Bonnes pratiques d'email temporaire pour des inscriptions plus sûres",
			description:
				"Découvrez des pratiques concrètes pour réduire le spam, éviter les blocages et protéger votre boîte principale.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "Email temporaire vs alias email : lequel choisir ?",
			description:
				"Comparez email temporaire et alias selon la confidentialité, la récupération et la sécurité à long terme.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "Email OTP non reçu ? 8 solutions rapides qui marchent",
			description:
				"Résolvez les retards d'emails de vérification avec une checklist pratique : renvoi, filtrage et rafraîchissement.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	de: [
		{
			slug: "temporary-email-best-practices",
			title:
				"Best Practices für temporäre E-Mails bei sicheren Registrierungen",
			description:
				"Praktische Regeln, um Spam zu reduzieren, Kontosperren zu vermeiden und dein Hauptpostfach zu schützen.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "Temporäre E-Mail vs E-Mail-Alias: Was ist besser?",
			description:
				"Vergleiche temporäre Postfächer und Aliase nach Datenschutz, Wiederherstellung und Kontosicherheit.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "OTP-Mail kommt nicht an? 8 schnelle Lösungen",
			description:
				"Behebe verzögerte Verifizierungsmails mit einer klaren Checkliste für Neuversand, Blocklisten und Postfach-Refresh.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	ja: [
		{
			slug: "temporary-email-best-practices",
			title: "安全な登録のための一時メール運用ベストプラクティス",
			description:
				"スパム削減、ロックアウト回避、メイン受信箱保護のための実践的な一時メール運用を解説します。",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "一時メールとメールエイリアスの違い：どちらを使うべき？",
			description:
				"プライバシー、復旧性、長期アカウント安全性の観点で一時メールとエイリアスを比較します。",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "OTPメールが届かない？効果的な8つの対処法",
			description:
				"再送、送信元ポリシー、受信箱更新の順で確認できる実用チェックリストを紹介します。",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	ko: [
		{
			slug: "temporary-email-best-practices",
			title: "더 안전한 가입을 위한 임시 이메일 모범 사례",
			description:
				"스팸을 줄이고 계정 잠금을 피하며 기본 받은편지함을 보호하는 실전형 임시 이메일 전략입니다.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "임시 이메일 vs 이메일 별칭: 무엇을 써야 할까?",
			description:
				"개인정보 보호, 복구 가능성, 장기 계정 안정성 기준으로 임시 이메일과 별칭을 비교합니다.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "OTP 메일이 안 오나요? 빠르게 해결하는 8가지 방법",
			description:
				"재전송, 발신 도메인 정책, 받은편지함 새로고침을 중심으로 지연된 인증 메일을 해결하세요.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	ru: [
		{
			slug: "temporary-email-best-practices",
			title: "Лучшие практики временной почты для более безопасных регистраций",
			description:
				"Практические рекомендации, как снизить спам, избежать блокировок и защитить основной почтовый ящик.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "Временная почта vs почтовый алиас: что выбрать?",
			description:
				"Сравнение временной почты и алиасов по приватности, восстановлению доступа и долгосрочной безопасности.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "OTP-письмо не приходит? 8 быстрых решений",
			description:
				"Пошаговый чеклист для задержек писем подтверждения: повторная отправка, политика отправителя и обновление ящика.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	pt: [
		{
			slug: "temporary-email-best-practices",
			title: "Boas práticas de email temporário para cadastros mais seguros",
			description:
				"Aprenda práticas para reduzir spam, evitar bloqueios e proteger sua caixa principal com email temporário.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "Email temporário vs alias de email: qual usar?",
			description:
				"Compare email temporário e alias por privacidade, recuperação e segurança de conta no longo prazo.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "Email OTP não chega? 8 correções rápidas",
			description:
				"Resolva atrasos de email de verificação com checklist prático de reenvio, bloqueios do remetente e atualização da caixa.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	ar: [
		{
			slug: "temporary-email-best-practices",
			title: "أفضل ممارسات البريد المؤقت لتسجيلات أكثر أمانًا",
			description:
				"تعرف على ممارسات عملية لتقليل الرسائل المزعجة وتجنب قفل الحسابات وحماية صندوق بريدك الأساسي.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "البريد المؤقت مقابل الاسم المستعار للبريد: أيهما تختار؟",
			description:
				"مقارنة بين البريد المؤقت والاسم المستعار من حيث الخصوصية واستعادة الحساب وأمان الاستخدام طويل المدى.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "لا تصلك رسالة OTP؟ 8 حلول سريعة وفعالة",
			description:
				"عالج تأخر رسائل التحقق عبر قائمة عملية تشمل إعادة الإرسال وسياسة المرسل وتحديث صندوق الوارد.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
};

export function toBlogLocale(locale: Locale): BlogLocale {
	if ((BLOG_LOCALES as readonly string[]).includes(locale)) {
		return locale as BlogLocale;
	}
	return "en";
}

export function listBlogPosts(locale: Locale): BlogPostMeta[] {
	return BLOG_POSTS[toBlogLocale(locale)];
}

export function getBlogPageCount(locale: Locale): number {
	const totalPosts = listBlogPosts(locale).length;
	return Math.max(1, Math.ceil(totalPosts / BLOG_PAGE_SIZE));
}

export function getBlogPostsByPage(
	locale: Locale,
	page: number,
): BlogPostMeta[] {
	const safePage = Math.max(1, page);
	const start = (safePage - 1) * BLOG_PAGE_SIZE;
	return listBlogPosts(locale).slice(start, start + BLOG_PAGE_SIZE);
}

export function getBlogPostMeta(
	locale: Locale,
	slug: string,
): BlogPostMeta | null {
	const posts = listBlogPosts(locale);
	return posts.find((post) => post.slug === slug) ?? null;
}

export function getAllBlogSlugs(): string[] {
	const slugs = new Set<string>();
	for (const locale of BLOG_LOCALES) {
		for (const post of BLOG_POSTS[locale]) {
			slugs.add(post.slug);
		}
	}
	return Array.from(slugs);
}
