import { Link } from "react-router";
import {
	DEFAULT_LOCALE,
	resolveLocaleParam,
	toLocalePath,
	type Locale,
} from "~/i18n/config";
import { BASE_URL } from "~/seo.config";
import { mergeRouteMeta } from "~/utils/meta";
import type { Route } from "./+types/contact";

const SUPPORT_EMAIL = "support@smail.pw";

type ContactCopy = {
	metaTitle: string;
	metaDescription: string;
	tag: string;
	title: string;
	description: string;
	emailLabel: string;
	emailCta: string;
	faqHint: string;
	faqCta: string;
	homeCta: string;
};

const CONTACT_COPY: Record<Locale, ContactCopy> = {
	en: {
		metaTitle: "Contact | smail.pw",
		metaDescription: "Contact smail.pw support by email.",
		tag: "Support",
		title: "Contact support",
		description:
			"For support, feedback, or cooperation requests, please email us directly.",
		emailLabel: "Support email",
		emailCta: "Send email",
		faqHint:
			"Before contacting us, please check the FAQ page first. Your answer may already be there.",
		faqCta: "Open FAQ",
		homeCta: "Back to homepage",
	},
	zh: {
		metaTitle: "联系我们 | smail.pw",
		metaDescription: "通过邮箱联系 smail.pw 支持团队。",
		tag: "支持",
		title: "联系支持团队",
		description:
			"如需技术支持、反馈建议或合作咨询，请直接发送邮件联系我们。",
		emailLabel: "支持邮箱",
		emailCta: "发送邮件",
		faqHint:
			"在联系我们之前，您可以先查看我们的常见问题页面，也许能找到您要的答案。",
		faqCta: "查看常见问题",
		homeCta: "返回首页",
	},
	es: {
		metaTitle: "Contacto | smail.pw",
		metaDescription: "Contacta con soporte de smail.pw por correo.",
		tag: "Soporte",
		title: "Contactar soporte",
		description:
			"Para soporte, comentarios o colaboración, contáctanos por correo electrónico.",
		emailLabel: "Correo de soporte",
		emailCta: "Enviar correo",
		faqHint:
			"Antes de contactarnos, revisa la página de preguntas frecuentes; puede que ya esté tu respuesta.",
		faqCta: "Ver FAQ",
		homeCta: "Volver al inicio",
	},
	fr: {
		metaTitle: "Contact | smail.pw",
		metaDescription: "Contacter le support smail.pw par email.",
		tag: "Support",
		title: "Contacter le support",
		description:
			"Pour le support, les retours ou la coopération, contactez-nous par email.",
		emailLabel: "Email support",
		emailCta: "Envoyer un email",
		faqHint:
			"Avant de nous contacter, consultez d'abord notre FAQ : vous y trouverez peut-être déjà la réponse.",
		faqCta: "Voir la FAQ",
		homeCta: "Retour à l'accueil",
	},
	de: {
		metaTitle: "Kontakt | smail.pw",
		metaDescription: "Kontaktiere den smail.pw Support per E-Mail.",
		tag: "Support",
		title: "Support kontaktieren",
		description:
			"Für Support, Feedback oder Kooperation kontaktiere uns bitte per E-Mail.",
		emailLabel: "Support-E-Mail",
		emailCta: "E-Mail senden",
		faqHint:
			"Bevor du uns kontaktierst, schau bitte zuerst in unsere FAQ. Vielleicht findest du dort bereits die Antwort.",
		faqCta: "FAQ öffnen",
		homeCta: "Zur Startseite",
	},
	ja: {
		metaTitle: "お問い合わせ | smail.pw",
		metaDescription: "smail.pw サポートへの連絡先メール。",
		tag: "サポート",
		title: "サポートへ連絡",
		description:
			"サポート、フィードバック、提携のご相談はメールでご連絡ください。",
		emailLabel: "サポートメール",
		emailCta: "メールを送信",
		faqHint:
			"お問い合わせ前に、まずよくある質問ページをご確認ください。解決策が見つかる場合があります。",
		faqCta: "FAQを見る",
		homeCta: "ホームへ戻る",
	},
	ko: {
		metaTitle: "문의하기 | smail.pw",
		metaDescription: "smail.pw 지원팀에 이메일로 문의하세요.",
		tag: "지원",
		title: "지원팀 문의",
		description: "지원, 피드백, 협업 문의는 이메일로 연락해 주세요.",
		emailLabel: "지원 이메일",
		emailCta: "이메일 보내기",
		faqHint:
			"문의하시기 전에 먼저 자주 묻는 질문 페이지를 확인해 주세요. 원하는 답변이 이미 있을 수 있습니다.",
		faqCta: "FAQ 보기",
		homeCta: "홈으로 돌아가기",
	},
	ru: {
		metaTitle: "Контакты | smail.pw",
		metaDescription: "Свяжитесь с поддержкой smail.pw по email.",
		tag: "Поддержка",
		title: "Связаться с поддержкой",
		description:
			"По вопросам поддержки, обратной связи и сотрудничества пишите на email.",
		emailLabel: "Email поддержки",
		emailCta: "Отправить письмо",
		faqHint:
			"Перед обращением в поддержку проверьте страницу FAQ — возможно, нужный ответ уже есть.",
		faqCta: "Открыть FAQ",
		homeCta: "На главную",
	},
	pt: {
		metaTitle: "Contato | smail.pw",
		metaDescription: "Entre em contato com o suporte da smail.pw por email.",
		tag: "Suporte",
		title: "Falar com o suporte",
		description:
			"Para suporte, feedback ou parceria, envie um email diretamente.",
		emailLabel: "Email de suporte",
		emailCta: "Enviar email",
		faqHint:
			"Antes de entrar em contato, veja nossa página de FAQ; a resposta pode já estar lá.",
		faqCta: "Ver FAQ",
		homeCta: "Voltar para início",
	},
	ar: {
		metaTitle: "اتصل بنا | smail.pw",
		metaDescription: "تواصل مع دعم smail.pw عبر البريد الإلكتروني.",
		tag: "الدعم",
		title: "التواصل مع الدعم",
		description:
			"للدعم أو الملاحظات أو التعاون، يرجى مراسلتنا مباشرة عبر البريد الإلكتروني.",
		emailLabel: "بريد الدعم",
		emailCta: "إرسال بريد",
		faqHint:
			"قبل التواصل معنا، يمكنك الاطلاع أولاً على صفحة الأسئلة الشائعة، فقد تجد الإجابة التي تحتاجها.",
		faqCta: "عرض الأسئلة الشائعة",
		homeCta: "العودة إلى الرئيسية",
	},
};

function getContactCopy(locale: Locale): ContactCopy {
	return CONTACT_COPY[locale] ?? CONTACT_COPY[DEFAULT_LOCALE];
}

export function meta({ params, matches }: Route.MetaArgs) {
	const { locale } = resolveLocaleParam(params.lang);
	const copy = getContactCopy(locale);
	return mergeRouteMeta(matches, [
		{ title: copy.metaTitle },
		{ name: "description", content: copy.metaDescription },
		{ name: "robots", content: "index, follow" },
	]);
}

export default function ContactPage({ params }: Route.ComponentProps) {
	const { locale } = resolveLocaleParam(params.lang);
	const copy = getContactCopy(locale);
	const contactUrl = `${BASE_URL}${toLocalePath("/contact", locale)}`;
	const contactJsonLd = {
		"@context": "https://schema.org",
		"@type": "ContactPage",
		url: contactUrl,
		name: copy.title,
		description: copy.description,
		mainEntity: {
			"@type": "Organization",
			name: "smail.pw",
			email: SUPPORT_EMAIL,
		},
	};

	return (
		<div className="flex flex-1 py-3 sm:py-4">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
			/>
			<section className="glass-panel w-full space-y-4 px-4 py-5 sm:px-6 sm:py-6">
				<p className="soft-tag">{copy.tag}</p>
				<h1 className="text-theme-primary font-display text-2xl font-bold sm:text-3xl">
					{copy.title}
				</h1>
				<p className="text-theme-secondary max-w-2xl text-sm leading-relaxed">
					{copy.description}
				</p>

				<div className="theme-card space-y-2 p-4">
					<p className="text-theme-faint text-[11px] font-semibold uppercase tracking-[0.16em]">
						{copy.emailLabel}
					</p>
					<a
						href={`mailto:${SUPPORT_EMAIL}`}
						className="theme-badge inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold"
					>
						<span>{copy.emailCta}</span>
						<span className="text-theme-faint">·</span>
						<span>{SUPPORT_EMAIL}</span>
						<span aria-hidden="true">{"->"}</span>
					</a>
				</div>

				<div className="theme-card space-y-2 p-4">
					<p className="text-theme-muted text-sm leading-relaxed">{copy.faqHint}</p>
					<Link
						to={toLocalePath("/faq", locale)}
						prefetch="viewport"
						className="theme-badge inline-flex px-3 py-2 text-xs font-semibold"
					>
						{copy.faqCta}
					</Link>
				</div>

				<Link
					to={toLocalePath("/", locale)}
					prefetch="viewport"
					className="theme-badge inline-flex px-3 py-2 text-xs font-semibold"
				>
					{copy.homeCta}
				</Link>
			</section>
		</div>
	);
}
