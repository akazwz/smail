import { useEffect, useState } from "react";
import {
	data,
	Link,
	redirect,
	useFetcher,
	useRevalidator,
} from "react-router";
import { commitSession, getSession } from "~/.server/session";
import {
	DEFAULT_LOCALE,
	type Locale,
	resolveLocaleParam,
	stripDefaultLocalePrefix,
	toIntlLocale,
	toLocalePath,
} from "~/i18n/config";
import { getDictionary } from "~/i18n/messages";
import { BASE_URL } from "~/seo.config";
import type { Email, EmailDetail } from "~/types/email";
import { generateEmailAddress } from "~/utils/mail";
import { MAIL_RETENTION_MS } from "~/utils/mail-retention";
import { mergeRouteMeta } from "~/utils/meta";
import type { Route } from "./+types/home";

function getLocaleFromParams(lang: string | undefined): Locale {
	const { locale } = resolveLocaleParam(lang);
	return locale;
}

function formatRefreshTime(timestamp: number, locale: Locale): string {
	return new Date(timestamp).toLocaleTimeString(toIntlLocale(locale), {
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "UTC",
	});
}

const SEO_GUIDES_COPY: Record<
	Locale,
	{ title: string; items: Array<{ label: string; path: string }> }
> = {
	en: {
		title: "Popular temporary email guides",
		items: [
			{ label: "24 Hour Temporary Email", path: "/temporary-email-24-hours" },
			{
				label: "Temporary Email No Registration",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Disposable Email for Verification",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Temporary Email for Registration",
				path: "/temporary-email-for-registration",
			},
			{ label: "Online Temporary Email", path: "/online-temporary-email" },
		],
	},
	zh: {
		title: "热门临时邮箱指南",
		items: [
			{ label: "24 小时临时邮箱", path: "/temporary-email-24-hours" },
			{ label: "免注册临时邮箱", path: "/temporary-email-no-registration" },
			{ label: "验证码一次性邮箱", path: "/disposable-email-for-verification" },
			{ label: "临时邮箱注册指南", path: "/temporary-email-for-registration" },
			{ label: "在线临时邮箱", path: "/online-temporary-email" },
		],
	},
	es: {
		title: "Guías populares de correo temporal",
		items: [
			{ label: "Correo temporal 24 horas", path: "/temporary-email-24-hours" },
			{
				label: "Correo temporal sin registro",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Correo desechable para verificación",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Correo temporal para registro",
				path: "/temporary-email-for-registration",
			},
			{ label: "Correo temporal online", path: "/online-temporary-email" },
		],
	},
	fr: {
		title: "Guides populaires d'email temporaire",
		items: [
			{
				label: "Email temporaire 24 heures",
				path: "/temporary-email-24-hours",
			},
			{
				label: "Email temporaire sans inscription",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Email jetable pour vérification",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Email temporaire pour inscription",
				path: "/temporary-email-for-registration",
			},
			{ label: "Email temporaire en ligne", path: "/online-temporary-email" },
		],
	},
	de: {
		title: "Beliebte Temp-Mail-Anleitungen",
		items: [
			{
				label: "24-Stunden-Temporäre E-Mail",
				path: "/temporary-email-24-hours",
			},
			{
				label: "Temporäre E-Mail ohne Registrierung",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Wegwerf-E-Mail für Verifizierung",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Temporäre E-Mail für Registrierung",
				path: "/temporary-email-for-registration",
			},
			{ label: "Online-Temporäre E-Mail", path: "/online-temporary-email" },
		],
	},
	ja: {
		title: "人気の一時メールガイド",
		items: [
			{ label: "24時間一時メール", path: "/temporary-email-24-hours" },
			{
				label: "登録不要の一時メール",
				path: "/temporary-email-no-registration",
			},
			{
				label: "認証用使い捨てメール",
				path: "/disposable-email-for-verification",
			},
			{
				label: "登録向け一時メール",
				path: "/temporary-email-for-registration",
			},
			{ label: "オンライン一時メール", path: "/online-temporary-email" },
		],
	},
	ko: {
		title: "인기 임시 이메일 가이드",
		items: [
			{ label: "24시간 임시 이메일", path: "/temporary-email-24-hours" },
			{
				label: "가입 없는 임시 이메일",
				path: "/temporary-email-no-registration",
			},
			{
				label: "인증용 일회용 이메일",
				path: "/disposable-email-for-verification",
			},
			{
				label: "가입용 임시 이메일",
				path: "/temporary-email-for-registration",
			},
			{ label: "온라인 임시 이메일", path: "/online-temporary-email" },
		],
	},
	ru: {
		title: "Популярные гайды по временной почте",
		items: [
			{
				label: "Временная почта на 24 часа",
				path: "/temporary-email-24-hours",
			},
			{
				label: "Временная почта без регистрации",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Одноразовая почта для верификации",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Временная почта для регистрации",
				path: "/temporary-email-for-registration",
			},
			{ label: "Онлайн временная почта", path: "/online-temporary-email" },
		],
	},
	pt: {
		title: "Guias populares de email temporário",
		items: [
			{ label: "Email temporário 24 horas", path: "/temporary-email-24-hours" },
			{
				label: "Email temporário sem cadastro",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Email descartável para verificação",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Email temporário para cadastro",
				path: "/temporary-email-for-registration",
			},
			{ label: "Email temporário online", path: "/online-temporary-email" },
		],
	},
	ar: {
		title: "أدلة البريد المؤقت الشائعة",
		items: [
			{ label: "بريد مؤقت لمدة 24 ساعة", path: "/temporary-email-24-hours" },
			{
				label: "بريد مؤقت بدون تسجيل",
				path: "/temporary-email-no-registration",
			},
			{
				label: "بريد مؤقت لرموز التحقق",
				path: "/disposable-email-for-verification",
			},
			{ label: "بريد مؤقت للتسجيل", path: "/temporary-email-for-registration" },
			{ label: "بريد مؤقت أونلاين", path: "/online-temporary-email" },
		],
	},
};

function getSeoGuides(locale: Locale): {
	title: string;
	items: Array<{ label: string; path: string }>;
} {
	return SEO_GUIDES_COPY[locale] ?? SEO_GUIDES_COPY.en;
}

type SeoNarrative = {
	title: string;
	description: string;
	points: string[];
};

const SEO_NARRATIVE_COPY: Record<Locale, SeoNarrative> = {
	en: {
		title: "Why use smail.pw temporary email",
		description:
			"smail.pw is a free temporary email generator (temp mail) for low-risk sign-ups, OTP verification, and one-time downloads. Create a 24-hour disposable inbox in seconds.",
		points: [
			"Works well for temporary email registration and verification code workflows",
			"No sign-up or password setup for quick temp mail access",
			"Useful when users search smail temp mail or no-registration disposable inbox",
			"Use a permanent mailbox for banking, work, and identity-critical accounts",
		],
	},
	zh: {
		title: "为什么选择 smail.pw 临时邮箱",
		description:
			"smail.pw 是免费临时邮箱生成器，覆盖临时邮箱、一次性邮箱、24小时邮箱等常见场景。适合临时邮箱注册、验证码（OTP）接收和在线临时收信。",
		points: [
			"适合临时邮箱注册、活动领取、下载验证等低风险场景",
			"免注册、免密码，作为免费临时邮箱快速使用，减少真实邮箱暴露",
			"部分站点会限制临时邮箱域名，收不到信可尝试重发与刷新",
			"银行、工作和重要账号请务必使用长期邮箱",
		],
	},
	es: {
		title: "Por qué usar el correo temporal de smail.pw",
		description:
			"smail.pw ofrece correo temporal gratis (temp mail) para registros rápidos, verificación OTP y descargas puntuales con retención de 24 horas.",
		points: [
			"Útil para flujos de registro y verificación de bajo riesgo",
			"Sin cuenta ni contraseña para empezar de inmediato",
			"Si no llega el correo, prueba reenviar y actualizar la bandeja",
		],
	},
	fr: {
		title: "Pourquoi utiliser l'email temporaire smail.pw",
		description:
			"smail.pw fournit un email temporaire gratuit (temp mail) pour inscription rapide, OTP et usages ponctuels avec rétention de 24h.",
		points: [
			"Adapté aux inscriptions et vérifications à faible risque",
			"Aucun compte ni mot de passe requis pour commencer",
			"En cas de non-réception, renvoyez le code puis rafraîchissez la boîte",
		],
	},
	de: {
		title: "Warum temporäre E-Mail von smail.pw",
		description:
			"smail.pw bietet kostenlose Temp Mail für schnelle Registrierungen, OTP-Verifizierung und einmalige Nutzung mit 24h Aufbewahrung.",
		points: [
			"Ideal für risikoarme Registrierung und Verifizierung",
			"Kein Konto und kein Passwort für den Sofortstart",
			"Bei fehlender Zustellung: erneut senden und Posteingang aktualisieren",
		],
	},
	ja: {
		title: "smail.pw の一時メールを使う理由",
		description:
			"smail.pw は無料の一時メール（temp mail）です。登録・OTP認証・短期利用向けに24時間の受信箱をすぐ作成できます。",
		points: [
			"低リスクの登録と認証フローに最適",
			"アカウント登録やパスワード設定が不要",
			"届かない場合は再送と受信箱更新を試してください",
		],
	},
	ko: {
		title: "smail.pw 임시 이메일을 쓰는 이유",
		description:
			"smail.pw는 무료 임시 이메일(temp mail) 서비스로, 가입/OTP 인증/일회성 사용에 맞춘 24시간 메일함을 즉시 제공합니다.",
		points: [
			"저위험 가입 및 인증 흐름에 적합",
			"계정 생성과 비밀번호 없이 바로 사용",
			"메일이 안 오면 재전송 후 받은편지함을 새로고침",
		],
	},
	ru: {
		title: "Почему стоит использовать временную почту smail.pw",
		description:
			"smail.pw — бесплатный temp mail для быстрых регистраций, OTP-подтверждений и одноразовых задач с хранением до 24 часов.",
		points: [
			"Подходит для низкорисковых регистраций и подтверждений",
			"Без аккаунта и пароля — можно начать сразу",
			"Если письмо не пришло, попробуйте повторную отправку и обновление",
		],
	},
	pt: {
		title: "Por que usar o email temporário do smail.pw",
		description:
			"smail.pw oferece temp mail grátis para cadastro rápido, OTP e uso pontual, com caixa descartável por 24 horas.",
		points: [
			"Bom para cadastro e verificação de baixo risco",
			"Sem conta e sem senha para começar imediatamente",
			"Se o email atrasar, reenvie e atualize a caixa de entrada",
		],
	},
	ar: {
		title: "لماذا تستخدم البريد المؤقت من smail.pw",
		description:
			"يوفر smail.pw بريدًا مؤقتًا مجانيًا (temp mail) للتسجيل السريع ورموز OTP والاستخدام القصير مع احتفاظ لمدة 24 ساعة.",
		points: [
			"مناسب لعمليات التسجيل والتحقق منخفضة المخاطر",
			"بدون حساب أو كلمة مرور لبدء الاستخدام فورًا",
			"عند تأخر الرسالة جرّب إعادة الإرسال ثم تحديث الوارد",
		],
	},
};

function getSeoNarrative(locale: Locale): SeoNarrative {
	return SEO_NARRATIVE_COPY[locale] ?? SEO_NARRATIVE_COPY.en;
}

function getHomeJsonLd(locale: Locale) {
	const localizedHomeUrl = `${BASE_URL}${toLocalePath("/", locale)}`;
	const descriptionByLocale: Record<Locale, string> = {
		en: "smail.pw provides free temporary email (temp mail) inboxes for sign-up and OTP verification with 24-hour auto cleanup.",
		zh: "smail.pw 提供免费临时邮箱（一次性邮箱）服务，适合临时邮箱注册和验证码接收，邮件 24 小时后自动清理。",
		es: "smail.pw ofrece correo temporal gratis (temp mail) para registros y códigos OTP con limpieza automática en 24 horas.",
		fr: "smail.pw propose un email temporaire gratuit (temp mail) pour inscription et OTP avec suppression automatique après 24h.",
		de: "smail.pw bietet kostenlose temporäre E-Mail (Temp Mail) für Registrierung und OTP mit automatischer 24h-Bereinigung.",
		ja: "smail.pw は登録とOTP認証に使える無料の一時メール（temp mail）を提供し、24時間後に自動削除されます。",
		ko: "smail.pw는 가입과 OTP 인증에 쓰는 무료 임시 이메일(temp mail)을 제공하며 24시간 후 자동 정리됩니다.",
		ru: "smail.pw предоставляет бесплатную временную почту (temp mail) для регистрации и OTP с автоочисткой через 24 часа.",
		pt: "smail.pw oferece email temporário grátis (temp mail) para cadastro e OTP com limpeza automática após 24h.",
		ar: "يوفر smail.pw بريدًا مؤقتًا مجانيًا (temp mail) للتسجيل ورموز OTP مع حذف تلقائي بعد 24 ساعة.",
	};
	const description = descriptionByLocale[locale] ?? descriptionByLocale.en;

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				name: "smail.pw",
				url: localizedHomeUrl,
				inLanguage: locale,
				description,
				potentialAction: {
					"@type": "UseAction",
					target: localizedHomeUrl,
				},
			},
			{
				"@type": "WebApplication",
				name: "smail.pw Temporary Email",
				url: localizedHomeUrl,
				applicationCategory: "UtilitiesApplication",
				operatingSystem: "Web",
				inLanguage: locale,
				description,
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
			},
		],
	};
}

export function meta({ params, matches }: Route.MetaArgs) {
	const locale = getLocaleFromParams(params.lang);
	const copy = getDictionary(locale).home;

	return mergeRouteMeta(matches, [
		{
			title: copy.title,
		},
		{
			name: "description",
			content: copy.description,
		},
		{
			name: "keywords",
			content: copy.keywords,
		},
		{
			name: "robots",
			content: "index, follow",
		},
	]);
}

function isAddressExpired(
	addressIssuedAt: number | undefined,
	now = Date.now(),
): boolean {
	if (!addressIssuedAt) {
		return false;
	}
	return now - addressIssuedAt >= MAIL_RETENTION_MS;
}

function EmailModal({
	email,
	onClose,
	copy,
}: {
	email: Email;
	onClose: () => void;
	copy: ReturnType<typeof getDictionary>["home"]["modal"];
}) {
	const [detail, setDetail] = useState<EmailDetail | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetch(`/api/email/${email.id}`, {
			credentials: "include",
		})
			.then((res) => res.json() as Promise<EmailDetail>)
			.then((emailDetail) => {
				setDetail(emailDetail);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, [email.id]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [onClose]);

	return (
		<div
			className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="email-preview-title"
				className="glass-panel modal-sheet flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="border-theme-soft flex items-start justify-between gap-3 border-b px-4 py-4 sm:px-5">
					<div className="space-y-1">
						<div className="text-theme-faint text-[11px] font-semibold uppercase tracking-[0.16em]">
							{copy.title}
						</div>
						<div
							id="email-preview-title"
							className="text-theme-primary font-display max-w-xl truncate pr-2 text-base font-semibold sm:text-[1.05rem]"
						>
							{email.subject}
						</div>
					</div>
					<button
						type="button"
						aria-label="Close email preview"
						onClick={onClose}
						className="border-theme-strong text-theme-secondary bg-theme-soft inline-flex h-8 w-8 items-center justify-center rounded-full border hover:brightness-95"
					>
						<svg
							viewBox="0 0 20 20"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.8"
							className="h-4 w-4"
							aria-hidden="true"
						>
							<path d="M5 5L15 15M15 5L5 15" strokeLinecap="round" />
						</svg>
					</button>
				</div>

				<div className="border-theme-soft text-theme-secondary grid gap-2.5 border-b px-4 py-3 text-[12px] leading-relaxed sm:grid-cols-2 sm:px-5">
					<div className="border-theme-soft bg-theme-subtle min-w-0 rounded-lg border px-3 py-2.5">
						<span className="text-theme-faint block text-[11px] font-semibold uppercase tracking-[0.1em]">
							{copy.from}
						</span>
						<p className="mt-1 break-all">
							{email.from_name} &lt;{email.from_address}&gt;
						</p>
					</div>
					<div className="border-theme-soft bg-theme-subtle rounded-lg border px-3 py-2.5">
						<span className="text-theme-faint block text-[11px] font-semibold uppercase tracking-[0.1em]">
							{copy.time}
						</span>
						<p className="mt-1">{new Date(email.time).toLocaleString()}</p>
					</div>
				</div>

				<div className="p-4 sm:p-5">
					{loading ? (
						<div className="text-theme-muted flex h-[min(62vh,700px)] items-center justify-center rounded-xl border border-dashed border-theme-soft text-[13px]">
							{copy.loading}
						</div>
					) : detail?.body ? (
						<iframe
							srcDoc={detail.body}
							title="Email content"
							className="border-theme-soft h-[min(62vh,700px)] w-full overflow-hidden rounded-xl border bg-white"
							sandbox=""
							referrerPolicy="no-referrer"
						/>
					) : (
						<div className="text-theme-muted flex h-[min(62vh,700px)] items-center justify-center rounded-xl border border-dashed border-theme-soft text-[13px]">
							{copy.empty}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function formatTime(
	timestamp: number,
	locale: Locale,
	referenceNow: number,
): string {
	const intlLocale = toIntlLocale(locale);
	const relative = new Intl.RelativeTimeFormat(intlLocale, { numeric: "auto" });
	const diffSeconds = Math.round((timestamp - referenceNow) / 1000);

	if (Math.abs(diffSeconds) < 60) {
		return relative.format(diffSeconds, "second");
	}

	const diffMinutes = Math.round(diffSeconds / 60);
	if (Math.abs(diffMinutes) < 60) {
		return relative.format(diffMinutes, "minute");
	}

	const diffHours = Math.round(diffMinutes / 60);
	if (Math.abs(diffHours) < 24) {
		return relative.format(diffHours, "hour");
	}

	const diffDays = Math.round(diffHours / 24);
	if (Math.abs(diffDays) < 7) {
		return relative.format(diffDays, "day");
	}

	return new Date(timestamp).toLocaleDateString(intlLocale, {
		timeZone: "UTC",
	});
}

async function getEmails(d1: D1Database, toAddress: string) {
	const { results } = await d1
		.prepare(
			"SELECT * FROM emails WHERE to_address = ? ORDER BY time DESC LIMIT 100",
		)
		.bind(toAddress)
		.all();
	return results as Email[];
}

export async function loader({ request, context, params }: Route.LoaderArgs) {
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

	const cookieHeader = request.headers.get("Cookie");
	const session = await getSession(cookieHeader);
	let addresses = (session.get("addresses") || []) as string[];
	const addressIssuedAt = session.get("addressIssuedAt");
	const now = Date.now();
	let shouldCommitSession = false;

	if (addresses.length > 0 && isAddressExpired(addressIssuedAt, now)) {
		addresses = [generateEmailAddress()];
		session.set("addresses", addresses);
		session.set("addressIssuedAt", now);
		shouldCommitSession = true;
	} else if (addresses.length > 0 && !addressIssuedAt) {
		session.set("addressIssuedAt", now);
		shouldCommitSession = true;
	}

	const emails =
		addresses.length > 0
			? await getEmails(context.cloudflare.env.D1, addresses[0]!)
			: [];

	if (shouldCommitSession) {
		const headers = new Headers();
		headers.set("Set-Cookie", await commitSession(session));
		return data(
			{
				addresses,
				emails,
				locale,
				renderedAt: now,
			},
			{ headers },
		);
	}

	return {
		addresses,
		emails,
		locale,
		renderedAt: now,
	};
}

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData();
	const intent = formData.get("intent");
	const cookieHeader = request.headers.get("Cookie");
	const session = await getSession(cookieHeader);
	let addresses: string[] = (session.get("addresses") || []) as string[];
	switch (intent) {
		case "generate": {
			addresses = [generateEmailAddress()];
			session.set("addressIssuedAt", Date.now());
			break;
		}
		case "delete": {
			addresses = [];
			session.unset("addressIssuedAt");
			break;
		}
	}
	session.set("addresses", addresses);
	const cookie = await commitSession(session);
	const headers = new Headers();
	headers.set("Set-Cookie", cookie);
	return data(
		{
			addresses: session.get("addresses") || [],
		},
		{
			headers,
		},
	);
}

export default function Home({ loaderData, actionData }: Route.ComponentProps) {
	const fetcher = useFetcher<typeof actionData>();
	const revalidator = useRevalidator();
	const [copied, setCopied] = useState(false);
	const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
	const [lastInboxRefreshAt, setLastInboxRefreshAt] = useState(() =>
		loaderData.renderedAt,
	);
	const locale = loaderData.locale || DEFAULT_LOCALE;
	const copy = getDictionary(locale).home;
	const seoGuides = getSeoGuides(locale);
	const seoNarrative = getSeoNarrative(locale);
	const homeJsonLd = getHomeJsonLd(locale);
	const addresses = fetcher.data?.addresses || loaderData.addresses;
	const emails = loaderData.emails;
	const isSubmitting = fetcher.state === "submitting";
	const submittingIntent = fetcher.formData?.get("intent");
	const isRefreshingInbox = revalidator.state !== "idle";

	useEffect(() => {
		setLastInboxRefreshAt(loaderData.renderedAt);
	}, [loaderData.renderedAt]);

	return (
		<div className="flex flex-1 py-3 sm:py-4">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
			/>
			<div className="grid w-full gap-4">
				<section className="glass-panel relative overflow-hidden px-4 py-4 sm:px-6 sm:py-5">
					<div
						className="absolute -left-20 -top-24 h-44 w-44 rounded-full opacity-80 blur-[88px]"
						style={{ background: "var(--accent-a)" }}
					/>
					<div
						className="absolute -right-14 top-20 h-36 w-36 rounded-full opacity-75 blur-[82px]"
						style={{ background: "var(--accent-b)" }}
					/>
					<div className="relative space-y-3">
						<header className="space-y-2.5">
							<p className="soft-tag">{copy.heroTag}</p>
							<h1 className="text-theme-primary font-display max-w-2xl text-xl leading-tight font-bold sm:text-3xl">
								{copy.heroTitle}
							</h1>
							<p className="text-theme-secondary max-w-xl text-sm leading-relaxed">
								{copy.heroDescription}
							</p>
						</header>

						<div className="theme-badge flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-1.5 text-[10px] sm:text-[11px]">
							<span className="text-theme-faint">
								<span className="text-theme-primary font-display font-semibold">
									{copy.stats.lifetimeValue}
								</span>{" "}
								{copy.stats.lifetime}
							</span>
							<span className="text-theme-faint">
								<span className="text-theme-primary font-display font-semibold">
									{copy.stats.refreshValue}
								</span>{" "}
								{copy.stats.refresh}
							</span>
							<span className="text-theme-faint">
								<span className="text-theme-primary font-display font-semibold">
									{copy.stats.registrationValue}
								</span>{" "}
								{copy.stats.registration}
							</span>
						</div>
					</div>
				</section>

				<section className="glass-panel px-4 py-4 sm:px-5 sm:py-4">
					<div className="grid gap-4">
						<div>
							<div className="mb-3 space-y-1">
								<p className="text-theme-faint text-[11px] font-semibold uppercase tracking-[0.16em]">
									{copy.currentAddress}
								</p>
								<p className="text-theme-muted hidden text-xs sm:block">
									{copy.noAddressDescription}
								</p>
							</div>
							<div className="space-y-4">
								{addresses.length > 0 ? (
									<>
										<div className="theme-card p-3">
												<div className="border-theme-soft bg-theme-subtle flex flex-col gap-2 rounded-xl border px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
													<div className="text-theme-primary min-w-0 text-sm font-semibold break-all sm:truncate">
														{addresses[0]}
													</div>
													<button
														type="button"
														className="neo-button-secondary w-full sm:w-auto sm:min-w-20"
														onClick={async () => {
															if (
																typeof navigator !== "undefined" &&
															navigator.clipboard
														) {
															try {
																await navigator.clipboard.writeText(
																	addresses[0] ?? "",
																);
																setCopied(true);
																setTimeout(() => setCopied(false), 1500);
															} catch {
																// ignore clipboard errors
															}
														}
													}}
												>
													{copied ? copy.copied : copy.copy}
												</button>
											</div>
										</div>

										<div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
											<button
												type="button"
												name="intent"
												value="generate"
												className="neo-button w-full justify-center sm:min-w-[10.5rem] sm:w-auto"
												onClick={() => {
													fetcher.submit(
														{ intent: "generate" },
														{ method: "post" },
													);
												}}
												disabled={isSubmitting}
											>
												{submittingIntent === "generate" && isSubmitting
													? copy.generating
													: copy.generateNew}
											</button>
											<button
												type="button"
												name="intent"
												value="delete"
												className="neo-button-secondary w-full justify-center sm:w-auto"
												onClick={() => {
													fetcher.submit(
														{ intent: "delete" },
														{ method: "post" },
													);
												}}
												disabled={isSubmitting}
											>
												{submittingIntent === "delete" && isSubmitting
													? copy.deleting
													: copy.deleteAddress}
											</button>
										</div>

										<p className="border-theme-soft bg-theme-subtle text-theme-faint rounded-lg border px-3 py-2 text-[11px] leading-relaxed">
											{copy.safetyHint}
										</p>
									</>
								) : (
									<div className="theme-card p-3">
										<div className="text-theme-primary text-sm font-semibold">
											{copy.noAddressTitle}
										</div>
										<p className="text-theme-muted mt-1 text-xs leading-relaxed">
											{copy.noAddressDescription}
										</p>
										<button
											type="button"
											name="intent"
											value="generate"
											className="neo-button mt-3 w-full justify-center sm:w-auto sm:min-w-[10.5rem]"
											onClick={() => {
												fetcher.submit(
													{ intent: "generate" },
													{ method: "post" },
												);
											}}
											disabled={isSubmitting}
										>
											{submittingIntent === "generate" && isSubmitting
												? copy.generating
												: copy.generateAddress}
										</button>
										<p className="border-theme-soft bg-theme-subtle text-theme-faint mt-3 rounded-lg border px-3 py-2 text-[11px] leading-relaxed">
											{copy.safetyHint}
										</p>
									</div>
								)}
							</div>
						</div>

						<div className="border-theme-soft border-t border-dashed pt-3">
							<div className="mb-3 flex items-start justify-between gap-3">
								<div>
									<p className="text-theme-faint text-[11px] font-semibold uppercase tracking-[0.16em]">
										{copy.inboxTag}
									</p>
									<p className="text-theme-primary font-display text-xl font-semibold">
										{copy.inboxTitle}
									</p>
									<p className="text-theme-faint mt-1 text-[11px]">
										{copy.lastRefresh}:{" "}
										{formatRefreshTime(lastInboxRefreshAt, locale)}
									</p>
								</div>
								<div className="flex flex-col items-end gap-2">
									<span className="theme-badge hidden px-3 py-1 text-[11px] font-medium sm:inline-flex">
										{copy.tapToOpen}
									</span>
									<button
										type="button"
										className="theme-badge px-3 py-1 text-[11px] font-semibold disabled:cursor-not-allowed disabled:opacity-60"
										onClick={() => {
											revalidator.revalidate();
										}}
										disabled={isRefreshingInbox}
									>
										{isRefreshingInbox
											? copy.refreshingInbox
											: copy.refreshInbox}
									</button>
								</div>
							</div>

							<div className="flex min-h-[360px] flex-col gap-2.5 overflow-y-auto py-1 pr-0.5">
								{emails.length === 0 ? (
									<div className="border-theme-strong bg-theme-subtle mt-6 rounded-2xl border border-dashed px-4 py-10 text-center">
										<p className="text-theme-primary font-display text-lg font-semibold">
											{copy.emptyInboxTitle}
										</p>
										<p className="text-theme-muted mt-1 text-sm">
											{copy.emptyInboxDescription}
										</p>
									</div>
								) : (
									emails.map((email) => (
										<button
											key={email.id}
											type="button"
											className="email-item"
											onClick={() => setSelectedEmail(email)}
										>
											<div className="min-w-0">
												<div className="flex items-start justify-between gap-3">
													<div className="text-theme-primary font-display truncate text-sm font-semibold">
														{email.subject}
													</div>
													<div className="text-theme-faint whitespace-nowrap text-[11px]">
														{formatTime(
															email.time,
															locale,
															loaderData.renderedAt,
														)}
													</div>
												</div>
												<div className="text-theme-muted mt-1 truncate text-xs">
													{email.from_name}
													<span className="text-theme-faint">
														{" "}
														&lt;{email.from_address}&gt;
													</span>
												</div>
											</div>
										</button>
									))
								)}
							</div>
						</div>
					</div>
				</section>

				<section className="glass-panel px-4 py-4 sm:px-5 sm:py-5">
					<h2 className="text-theme-primary font-display mb-3 text-lg font-semibold sm:text-xl">
						{seoNarrative.title}
					</h2>
					<div className="grid gap-3 lg:grid-cols-[0.92fr,1.08fr]">
						<div className="theme-card space-y-3 p-4">
							<p className="text-theme-faint text-[11px] font-semibold uppercase tracking-[0.16em]">
								{seoGuides.title}
							</p>
							<div className="grid gap-2 sm:grid-cols-2">
								{seoGuides.items.map((item) => (
									<Link
										key={item.path}
										to={toLocalePath(item.path, locale)}
										prefetch="viewport"
										className="theme-badge flex items-center justify-between px-3 py-1.5 text-[11px] font-medium"
									>
										<span>{item.label}</span>
										<span aria-hidden="true">{"->"}</span>
									</Link>
								))}
							</div>
						</div>

						<div className="theme-card space-y-3 p-4">
							<p className="text-theme-secondary text-xs leading-relaxed sm:text-sm">
								{seoNarrative.description}
							</p>
							<ul className="text-theme-muted list-disc space-y-1 pl-5 text-[11px] leading-relaxed sm:text-xs">
								{seoNarrative.points.map((point) => (
									<li key={point}>{point}</li>
								))}
							</ul>
						</div>
					</div>
				</section>
			</div>

			{selectedEmail && (
				<EmailModal
					email={selectedEmail}
					onClose={() => setSelectedEmail(null)}
					copy={copy.modal}
				/>
			)}
		</div>
	);
}
