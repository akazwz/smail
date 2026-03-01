import Markdoc from "@markdoc/markdoc";
import { Link, redirect } from "react-router";
import {
	DEFAULT_LOCALE,
	type Locale,
	normalizePathname,
	resolveLocaleParam,
	stripDefaultLocalePrefix,
	stripLocalePrefix,
	toLocalePath,
} from "~/i18n/config";
import { BASE_URL, isMarkdownLocaleIndexable } from "~/seo.config";
import { mergeRouteMeta } from "~/utils/meta";
import type { Route } from "./+types/md";

const KNOWN_MD_PAGES = [
	"about",
	"faq",
	"privacy",
	"terms",
	"temporary-email-24-hours",
	"temporary-email-no-registration",
	"disposable-email-for-verification",
	"temporary-email-for-registration",
	"online-temporary-email",
	"domestic-temporary-email",
	"can-temporary-email-send",
	"smail-vs-smailpro",
] as const;

type MarkdownPageSlug = (typeof KNOWN_MD_PAGES)[number];

const INFO_MD_PAGES = ["about", "faq", "privacy", "terms"] as const;
const ARTICLE_MD_PAGES = [
	"temporary-email-24-hours",
	"temporary-email-no-registration",
	"disposable-email-for-verification",
	"temporary-email-for-registration",
	"online-temporary-email",
	"domestic-temporary-email",
	"can-temporary-email-send",
	"smail-vs-smailpro",
] as const;

type InfoMarkdownSlug = (typeof INFO_MD_PAGES)[number];
type ArticleMarkdownSlug = (typeof ARTICLE_MD_PAGES)[number];

const markdownSources = import.meta.glob("../md/**/*.md", {
	query: "?raw",
	import: "default",
}) as Record<string, () => Promise<string>>;

type FaqEntry = {
	question: string;
	answer: string;
};

const FAQ_JSON_LD_COPY: Partial<Record<Locale, FaqEntry[]>> = {
	en: [
		{
			question: "What is smail.pw?",
			answer:
				"smail.pw is a temporary email service for disposable inboxes used in low-risk sign-ups and verifications.",
		},
		{
			question: "How long are emails kept?",
			answer:
				"Emails are retained for up to 24 hours and then automatically removed.",
		},
		{
			question: "Do I need to register?",
			answer: "No account, password, or profile setup is required.",
		},
		{
			question: "Can I use it for banking or critical accounts?",
			answer:
				"No. Use a permanent secure mailbox for banking, work, legal, and recovery-critical services.",
		},
		{
			question: "Is smail.pw the same as smail pro or smailpro?",
			answer:
				"No. smail.pw is an independent temporary email service and is not affiliated with other similarly named sites.",
		},
	],
	zh: [
		{
			question: "smail.pw 是什么？",
			answer: "smail.pw 是临时邮箱服务，可用于低风险注册和验证码接收。",
		},
		{
			question: "邮件会保留多久？",
			answer: "邮件内容最多保留 24 小时，之后会自动清理。",
		},
		{
			question: "需要注册账号吗？",
			answer: "不需要账号、密码或个人资料即可使用。",
		},
		{
			question: "能用于银行或重要账号吗？",
			answer: "不建议。银行、工作、法律和账号找回等重要场景请使用长期邮箱。",
		},
		{
			question: "smail.pw 和 smail pro / smailpro 是同一个吗？",
			answer: "不是。smail.pw 是独立站点，与其他同名或近似名称服务没有关联。",
		},
		{
			question: "国内临时邮箱收不到验证码怎么办？",
			answer:
				"常见原因是发件方延迟或平台限制临时邮箱域名。建议先确认地址无误，再重发并刷新收件箱。",
		},
	],
	es: [
		{
			question: "¿Qué es smail.pw?",
			answer:
				"smail.pw es un servicio de correo temporal para registros y verificación de bajo riesgo.",
		},
		{
			question: "¿Cuánto tiempo se guardan los correos?",
			answer:
				"Los mensajes se conservan hasta 24 horas y luego se eliminan automáticamente.",
		},
		{
			question: "¿Necesito registrarme?",
			answer: "No. Puedes usarlo sin cuenta, contraseña ni perfil.",
		},
		{
			question: "¿Puedo usarlo para banca o cuentas críticas?",
			answer:
				"No. Para banca, trabajo y recuperación de cuentas usa un correo permanente.",
		},
		{
			question: "¿Puede el correo temporal enviar mensajes?",
			answer:
				"Normalmente no. En la mayoría de casos es un buzón de recepción para OTP y verificación.",
		},
		{
			question: "¿smail.pw es lo mismo que smailpro?",
			answer:
				"No. smail.pw es un servicio independiente y no está afiliado con marcas similares.",
		},
	],
	fr: [
		{
			question: "Qu'est-ce que smail.pw ?",
			answer:
				"smail.pw est un service d'email temporaire pour inscriptions et vérifications à faible risque.",
		},
		{
			question: "Combien de temps les emails sont-ils conservés ?",
			answer:
				"Les emails sont conservés jusqu'à 24 heures puis supprimés automatiquement.",
		},
		{
			question: "Faut-il créer un compte ?",
			answer: "Non. Aucun compte, mot de passe ou profil n'est requis.",
		},
		{
			question: "Puis-je l'utiliser pour des comptes sensibles ?",
			answer:
				"Non. Pour banque, travail et récupération de compte, utilisez une boîte permanente.",
		},
		{
			question: "Un email temporaire peut-il envoyer des messages ?",
			answer:
				"En général non. La plupart des boîtes temporaires sont conçues pour la réception OTP et vérification.",
		},
		{
			question: "smail.pw est-il identique à smailpro ?",
			answer:
				"Non. smail.pw est un service indépendant sans affiliation avec des marques au nom proche.",
		},
	],
	de: [
		{
			question: "Was ist smail.pw?",
			answer:
				"smail.pw ist ein Dienst für temporäre E-Mails bei risikoarmen Registrierungen und Verifizierungen.",
		},
		{
			question: "Wie lange werden Nachrichten gespeichert?",
			answer:
				"Nachrichten bleiben bis zu 24 Stunden erhalten und werden danach automatisch gelöscht.",
		},
		{
			question: "Muss ich mich registrieren?",
			answer: "Nein. Kein Konto, Passwort oder Profil ist erforderlich.",
		},
		{
			question: "Ist das für Banking oder wichtige Konten geeignet?",
			answer:
				"Nein. Für Banking, Arbeit und Wiederherstellung nutze eine dauerhafte Mailbox.",
		},
		{
			question: "Kann temporäre E-Mail Nachrichten senden?",
			answer:
				"Meist nicht. In der Regel ist Temp-Mail für Empfang von OTP- und Bestätigungsnachrichten gedacht.",
		},
		{
			question: "Ist smail.pw dasselbe wie smailpro?",
			answer:
				"Nein. smail.pw ist ein unabhängiger Dienst ohne Zugehörigkeit zu ähnlich benannten Marken.",
		},
	],
	ja: [
		{
			question: "smail.pw とは？",
			answer: "smail.pw は低リスクな登録や認証向けの一時メールサービスです。",
		},
		{
			question: "メールはどれくらい保存されますか？",
			answer: "メールは最大24時間保持され、その後自動削除されます。",
		},
		{
			question: "登録は必要ですか？",
			answer: "不要です。アカウントやパスワードなしで利用できます。",
		},
		{
			question: "銀行や重要アカウントに使えますか？",
			answer:
				"いいえ。銀行・業務・アカウント復旧には恒久的なメールを使ってください。",
		},
		{
			question: "一時メールは送信できますか？",
			answer:
				"通常はできません。多くの一時メールはOTPや確認メールの受信専用です。",
		},
		{
			question: "smail.pw は smailpro と同じですか？",
			answer:
				"いいえ。smail.pw は独立サービスで、類似名称サービスとの提携はありません。",
		},
	],
	ko: [
		{
			question: "smail.pw는 무엇인가요?",
			answer: "smail.pw는 저위험 가입과 인증을 위한 임시 이메일 서비스입니다.",
		},
		{
			question: "메일은 얼마나 보관되나요?",
			answer: "메일은 최대 24시간 보관되며 이후 자동 삭제됩니다.",
		},
		{
			question: "회원가입이 필요한가요?",
			answer: "아니요. 계정, 비밀번호, 프로필 없이 사용할 수 있습니다.",
		},
		{
			question: "은행이나 중요한 계정에 써도 되나요?",
			answer:
				"권장하지 않습니다. 은행, 업무, 계정 복구에는 장기 메일함을 사용하세요.",
		},
		{
			question: "임시 이메일로 발신할 수 있나요?",
			answer:
				"보통 불가능합니다. 대부분 OTP와 확인 메일 수신 전용으로 설계됩니다.",
		},
		{
			question: "smail.pw는 smailpro와 같은 서비스인가요?",
			answer:
				"아니요. smail.pw는 독립 서비스이며 유사 명칭 브랜드와 제휴되어 있지 않습니다.",
		},
	],
	ru: [
		{
			question: "Что такое smail.pw?",
			answer:
				"smail.pw — сервис временной почты для низкорисковых регистраций и подтверждений.",
		},
		{
			question: "Сколько хранятся письма?",
			answer: "Письма хранятся до 24 часов, затем удаляются автоматически.",
		},
		{
			question: "Нужна регистрация?",
			answer: "Нет. Аккаунт, пароль и профиль не требуются.",
		},
		{
			question: "Можно использовать для банковских и важных аккаунтов?",
			answer:
				"Нет. Для банка, работы и восстановления аккаунта используйте постоянную почту.",
		},
		{
			question: "Можно ли отправлять письма с временной почты?",
			answer:
				"Обычно нет. Временные ящики чаще всего работают только для приема OTP и подтверждений.",
		},
		{
			question: "smail.pw это то же самое, что smailpro?",
			answer:
				"Нет. smail.pw — независимый сервис и не связан с похожими брендами.",
		},
	],
	pt: [
		{
			question: "O que é o smail.pw?",
			answer:
				"smail.pw é um serviço de email temporário para cadastro e verificação de baixo risco.",
		},
		{
			question: "Por quanto tempo os emails ficam disponíveis?",
			answer:
				"As mensagens ficam disponíveis por até 24 horas e depois são removidas automaticamente.",
		},
		{
			question: "Preciso criar conta?",
			answer: "Não. Não exige conta, senha nem perfil.",
		},
		{
			question: "Posso usar para banco ou contas críticas?",
			answer:
				"Não. Para banco, trabalho e recuperação de conta use um email permanente.",
		},
		{
			question: "Email temporário pode enviar mensagens?",
			answer:
				"Normalmente não. Em geral ele é voltado ao recebimento de OTP e emails de confirmação.",
		},
		{
			question: "smail.pw é o mesmo serviço que smailpro?",
			answer:
				"Não. smail.pw é independente e não possui afiliação com marcas de nome parecido.",
		},
	],
	ar: [
		{
			question: "ما هو smail.pw؟",
			answer: "smail.pw خدمة بريد مؤقت لعمليات التسجيل والتحقق منخفضة المخاطر.",
		},
		{
			question: "كم مدة الاحتفاظ بالرسائل؟",
			answer: "يتم الاحتفاظ بالرسائل حتى 24 ساعة ثم تُحذف تلقائيًا.",
		},
		{
			question: "هل أحتاج إلى تسجيل حساب؟",
			answer: "لا. لا حاجة إلى حساب أو كلمة مرور أو ملف شخصي.",
		},
		{
			question: "هل يصلح للحسابات البنكية أو المهمة؟",
			answer:
				"لا. للحسابات البنكية والعمل واستعادة الحساب استخدم بريدًا دائمًا وآمنًا.",
		},
		{
			question: "هل يمكن للبريد المؤقت إرسال الرسائل؟",
			answer:
				"غالبًا لا. معظم خدمات البريد المؤقت مخصصة لاستقبال OTP ورسائل التحقق فقط.",
		},
		{
			question: "هل smail.pw هو نفسه smailpro؟",
			answer:
				"لا. smail.pw خدمة مستقلة وغير تابعة لخدمات أخرى ذات أسماء مشابهة.",
		},
	],
};

const mdMetaCopy: Record<
	MarkdownPageSlug,
	Partial<Record<Locale, { title: string; description: string }>> & {
		en: { title: string; description: string };
	}
> = {
	about: {
		en: {
			title: "About smail.pw | Temporary Email & Temp Mail Generator",
			description:
				"Learn how smail.pw temporary email works, when to use temp mail, and important limits for disposable inbox workflows.",
		},
		zh: {
			title: "关于 smail.pw | 临时邮箱生成器",
			description:
				"了解 smail.pw 临时邮箱生成器的用途、适用场景与一次性邮箱使用边界。",
		},
		es: {
			title: "Acerca de smail.pw | Correo temporal",
			description:
				"Conoce qué es smail.pw, cuándo usar correo temporal y qué límites tiene un buzón desechable.",
		},
		fr: {
			title: "À propos de smail.pw | Email temporaire",
			description:
				"Découvrez ce qu'est smail.pw, quand utiliser un email temporaire et ses limites importantes.",
		},
		de: {
			title: "Über smail.pw | Temporäre E-Mail",
			description:
				"Erfahre, was smail.pw ist, wann temporäre E-Mails sinnvoll sind und welche Grenzen gelten.",
		},
		ja: {
			title: "smail.pw について | 一時メール",
			description:
				"smail.pw の用途、一時メールが有効な場面、利用上の重要な制約を確認できます。",
		},
		ko: {
			title: "smail.pw 소개 | 임시 이메일",
			description:
				"smail.pw의 목적, 임시 이메일 사용이 적합한 상황, 이용 시 한계를 확인하세요.",
		},
		ru: {
			title: "О smail.pw | Временная почта",
			description:
				"Узнайте, что такое smail.pw, когда использовать временную почту и какие есть ограничения.",
		},
		pt: {
			title: "Sobre o smail.pw | Email temporário",
			description:
				"Entenda o que é o smail.pw, quando usar email temporário e quais limites você deve considerar.",
		},
		ar: {
			title: "حول smail.pw | بريد مؤقت",
			description:
				"تعرّف على smail.pw ومتى تستخدم البريد المؤقت وما الحدود المهمة التي يجب الانتباه لها.",
		},
	},
	faq: {
		en: {
			title: "Temporary Email FAQ (OTP, Temp Mail, Delivery) | smail.pw",
			description:
				"Temporary email FAQ covering temp mail setup, 24-hour retention, OTP delivery issues, and disposable inbox safety limits on smail.pw.",
		},
		zh: {
			title: "临时邮箱常见问题（验证码/收信/注册）| smail.pw",
			description:
				"临时邮箱与一次性邮箱常见问题：24小时保留、验证码收信异常、临时邮箱注册场景、使用限制与安全建议。",
		},
		es: {
			title: "Preguntas frecuentes | smail.pw",
			description:
				"Consulta dudas comunes sobre uso del correo temporal, retención, entrega de mensajes y límites del servicio.",
		},
		fr: {
			title: "FAQ | smail.pw email temporaire",
			description:
				"Retrouvez les questions courantes sur l'usage, la rétention, la livraison des emails et les limites du service.",
		},
		de: {
			title: "FAQ | smail.pw temporäre E-Mail",
			description:
				"Häufige Fragen zu Nutzung, Aufbewahrung, Zustellproblemen und Servicegrenzen der temporären E-Mail.",
		},
		ja: {
			title: "よくある質問 | smail.pw 一時メール",
			description:
				"一時メールの使い方、保持期間、受信トラブル、サービス制限に関する主な質問をまとめています。",
		},
		ko: {
			title: "자주 묻는 질문 | smail.pw 임시 이메일",
			description:
				"임시 이메일 사용법, 보관 기간, 수신 문제, 서비스 제한에 대한 주요 질문을 확인하세요.",
		},
		ru: {
			title: "FAQ | smail.pw временная почта",
			description:
				"Частые вопросы о временной почте: использование, срок хранения, доставка писем и ограничения сервиса.",
		},
		pt: {
			title: "Perguntas frequentes | smail.pw",
			description:
				"Veja dúvidas comuns sobre uso do email temporário, retenção de mensagens, entrega e limites do serviço.",
		},
		ar: {
			title: "الأسئلة الشائعة | smail.pw",
			description:
				"اطّلع على الأسئلة الشائعة حول استخدام البريد المؤقت ومدة الاحتفاظ ومشكلات الاستلام وحدود الخدمة.",
		},
	},
	privacy: {
		en: {
			title: "Privacy Policy | smail.pw",
			description:
				"See what data smail.pw may process, how long temporary data is retained, and how privacy is handled.",
		},
		zh: {
			title: "隐私政策 | smail.pw",
			description: "查看 smail.pw 可能处理的数据类型、保留周期与隐私处理方式。",
		},
		es: {
			title: "Política de privacidad | smail.pw",
			description:
				"Consulta qué datos puede tratar smail.pw, cuánto tiempo se conservan y cómo se protege la privacidad.",
		},
		fr: {
			title: "Politique de confidentialité | smail.pw",
			description:
				"Découvrez quelles données smail.pw peut traiter, leur durée de conservation et la gestion de la confidentialité.",
		},
		de: {
			title: "Datenschutzrichtlinie | smail.pw",
			description:
				"Sieh, welche Daten smail.pw verarbeiten kann, wie lange sie gespeichert werden und wie Datenschutz umgesetzt wird.",
		},
		ja: {
			title: "プライバシーポリシー | smail.pw",
			description:
				"smail.pw が扱う可能性のあるデータ、保持期間、プライバシー保護の方針を確認できます。",
		},
		ko: {
			title: "개인정보 처리방침 | smail.pw",
			description:
				"smail.pw에서 처리할 수 있는 데이터 유형, 보관 기간, 개인정보 보호 방식에 대해 확인하세요.",
		},
		ru: {
			title: "Политика конфиденциальности | smail.pw",
			description:
				"Узнайте, какие данные может обрабатывать smail.pw, сроки хранения и подход к конфиденциальности.",
		},
		pt: {
			title: "Política de privacidade | smail.pw",
			description:
				"Veja quais dados o smail.pw pode processar, por quanto tempo são mantidos e como a privacidade é tratada.",
		},
		ar: {
			title: "سياسة الخصوصية | smail.pw",
			description:
				"تعرّف على البيانات التي قد يعالجها smail.pw ومدة الاحتفاظ بها وكيفية التعامل مع الخصوصية.",
		},
	},
	terms: {
		en: {
			title: "Terms of Use | smail.pw",
			description:
				"Review the terms for using smail.pw, including acceptable use, disclaimers, and service limitations.",
		},
		zh: {
			title: "使用条款 | smail.pw",
			description: "了解 smail.pw 的使用规则、服务边界与免责声明。",
		},
		es: {
			title: "Términos de uso | smail.pw",
			description:
				"Revisa las reglas de uso de smail.pw, incluyendo usos permitidos, avisos legales y límites del servicio.",
		},
		fr: {
			title: "Conditions d'utilisation | smail.pw",
			description:
				"Consultez les conditions d'usage de smail.pw, y compris l'usage autorisé, les exclusions et limites du service.",
		},
		de: {
			title: "Nutzungsbedingungen | smail.pw",
			description:
				"Prüfe die Nutzungsregeln von smail.pw inklusive zulässiger Nutzung, Haftungsausschlüssen und Servicegrenzen.",
		},
		ja: {
			title: "利用規約 | smail.pw",
			description:
				"smail.pw の利用条件、許容される利用、免責事項、サービス範囲の制限を確認できます。",
		},
		ko: {
			title: "이용약관 | smail.pw",
			description:
				"smail.pw 이용 규정, 허용 범위, 면책 고지, 서비스 제한 사항을 확인하세요.",
		},
		ru: {
			title: "Условия использования | smail.pw",
			description:
				"Ознакомьтесь с правилами использования smail.pw, допустимым применением, отказом от ответственности и ограничениями.",
		},
		pt: {
			title: "Termos de uso | smail.pw",
			description:
				"Revise os termos do smail.pw, incluindo uso aceitável, avisos legais e limitações do serviço.",
		},
		ar: {
			title: "شروط الاستخدام | smail.pw",
			description:
				"راجع شروط استخدام smail.pw بما يشمل الاستخدام المقبول وإخلاء المسؤولية وحدود الخدمة.",
		},
	},
	"temporary-email-24-hours": {
		en: {
			title: "24 Hour Temporary Email (Temp Mail) | smail.pw",
			description:
				"Create a 24 hour email temp mail inbox for sign-ups and OTP verification codes without exposing your primary mailbox.",
		},
		zh: {
			title: "24小时临时邮箱（24小时邮箱）| smail.pw",
			description:
				"获取 24 小时临时邮箱（一次性邮箱），用于临时邮箱注册、验证码与短期收信，自动过期更省心。",
		},
		es: {
			title: "Correo temporal 24 horas (email desechable) | smail.pw",
			description:
				"Usa un correo temporal de 24 horas para registros y códigos OTP sin exponer tu email principal.",
		},
		fr: {
			title: "Email temporaire 24 heures (boîte jetable) | smail.pw",
			description:
				"Créez une boîte temporaire 24h pour inscription et codes OTP sans exposer votre email principal.",
		},
		de: {
			title: "24-Stunden-Temporäre E-Mail | smail.pw",
			description:
				"Nutze eine temporäre 24h-Adresse für Registrierung und OTP-Verifizierung ohne deine Hauptadresse offenzulegen.",
		},
		ja: {
			title: "24時間一時メール（使い捨てメール）| smail.pw",
			description:
				"登録やOTP認証に使える24時間の一時受信箱。メインアドレスを公開せず利用できます。",
		},
		ko: {
			title: "24시간 임시 이메일(일회용 메일) | smail.pw",
			description:
				"가입과 OTP 인증에 쓰는 24시간 임시 메일함으로 기본 주소 노출을 줄이세요.",
		},
		ru: {
			title: "Временная почта на 24 часа | smail.pw",
			description:
				"Используйте временный ящик на 24 часа для регистрации и OTP-кодов, не раскрывая основной адрес.",
		},
		pt: {
			title: "Email temporário de 24 horas | smail.pw",
			description:
				"Crie um inbox temporário de 24h para cadastro e códigos OTP sem expor seu email principal.",
		},
		ar: {
			title: "بريد مؤقت لمدة 24 ساعة | smail.pw",
			description:
				"أنشئ صندوقًا مؤقتًا لمدة 24 ساعة للتسجيل ورموز OTP دون كشف بريدك الأساسي.",
		},
	},
	"temporary-email-no-registration": {
		en: {
			title: "Temporary Email No Registration (No Signup Temp Mail) | smail.pw",
			description:
				"Use no registration temp mail with no password or personal details. Generate a temporary inbox instantly and receive email in seconds.",
		},
		zh: {
			title: "免注册临时邮箱（无需注册）| smail.pw",
			description:
				"免注册临时邮箱，无需账号和密码即可快速生成一次性邮箱，适合临时邮箱注册与验证码收信。",
		},
		es: {
			title: "Correo temporal sin registro (sin cuenta) | smail.pw",
			description:
				"Recibe emails en segundos sin crear cuenta ni contraseña con un buzón temporal para registro y verificación.",
		},
		fr: {
			title: "Email temporaire sans inscription | smail.pw",
			description:
				"Recevez des emails sans compte ni mot de passe avec une boîte temporaire immédiate pour inscription et vérification.",
		},
		de: {
			title: "Temporäre E-Mail ohne Registrierung | smail.pw",
			description:
				"Empfange E-Mails ohne Konto und Passwort mit einem sofort nutzbaren temporären Postfach für Anmeldung und Verifizierung.",
		},
		ja: {
			title: "登録不要の一時メール | smail.pw",
			description:
				"アカウント作成やパスワード不要で、登録・認証に使える一時メール受信箱をすぐ利用できます。",
		},
		ko: {
			title: "가입 없는 임시 이메일 | smail.pw",
			description:
				"회원가입과 비밀번호 없이 즉시 사용 가능한 임시 메일함으로 가입/인증 메일을 빠르게 수신하세요.",
		},
		ru: {
			title: "Временная почта без регистрации | smail.pw",
			description:
				"Получайте письма мгновенно без аккаунта и пароля через временный ящик для регистрации и подтверждения.",
		},
		pt: {
			title: "Email temporário sem cadastro | smail.pw",
			description:
				"Receba emails rapidamente sem criar conta ou senha com uma caixa temporária imediata para cadastro e verificação.",
		},
		ar: {
			title: "بريد مؤقت بدون تسجيل | smail.pw",
			description:
				"استقبل الرسائل فورًا بدون إنشاء حساب أو كلمة مرور عبر صندوق بريد مؤقت سريع للتسجيل والتحقق.",
		},
	},
	"disposable-email-for-verification": {
		en: {
			title: "Disposable Email for Verification & OTP | smail.pw",
			description:
				"Receive OTP and verification emails in a disposable email inbox while keeping your personal mailbox private and spam-free.",
		},
		zh: {
			title: "验证码一次性邮箱（OTP临时邮箱）| smail.pw",
			description:
				"使用验证码一次性邮箱接收 OTP 与确认邮件，适合临时邮箱注册场景，减少垃圾邮件并保护真实邮箱隐私。",
		},
		es: {
			title: "Correo desechable para verificación y OTP | smail.pw",
			description:
				"Recibe OTP y enlaces de confirmación en un buzón desechable sin llenar tu correo personal de spam.",
		},
		fr: {
			title: "Email jetable pour vérification et OTP | smail.pw",
			description:
				"Recevez OTP et liens de confirmation dans une boîte jetable sans encombrer votre adresse personnelle.",
		},
		de: {
			title: "Wegwerf-E-Mail für Verifizierung und OTP | smail.pw",
			description:
				"Empfange OTP-Codes und Bestätigungslinks im Wegwerf-Postfach und halte dein Hauptpostfach sauber.",
		},
		ja: {
			title: "認証コード用の使い捨てメール（OTP）| smail.pw",
			description:
				"OTPや確認リンクを使い捨て受信箱で受け取り、個人メールのノイズと露出を減らせます。",
		},
		ko: {
			title: "인증용 일회용 이메일(OTP) | smail.pw",
			description:
				"OTP와 확인 링크를 일회용 메일함으로 받아 기본 메일함의 노출과 스팸을 줄이세요.",
		},
		ru: {
			title: "Одноразовая почта для верификации и OTP | smail.pw",
			description:
				"Получайте OTP и письма подтверждения в одноразовом ящике, не засоряя основной почтовый адрес.",
		},
		pt: {
			title: "Email descartável para verificação e OTP | smail.pw",
			description:
				"Receba OTP e links de confirmação em inbox descartável sem expor nem lotar seu email principal.",
		},
		ar: {
			title: "بريد مؤقت للتحقق ورموز OTP | smail.pw",
			description:
				"استقبل رموز OTP وروابط التأكيد في بريد مؤقت دون إزعاج أو كشف بريدك الشخصي الأساسي.",
		},
	},
	"temporary-email-for-registration": {
		en: {
			title: "Temporary Email for Registration (Signup Temp Mail) | smail.pw",
			description:
				"Use temporary email for registration flows, trial sign-ups, and one-off onboarding without exposing your long-term mailbox.",
		},
		zh: {
			title: "临时邮箱注册专用（注册临时邮箱）| smail.pw",
			description:
				"用于临时邮箱注册、试用账号和低风险平台注册，快速收验证码并减少真实邮箱暴露。",
		},
		es: {
			title: "Correo temporal para registro | smail.pw",
			description:
				"Usa un correo temporal para registros y pruebas sin exponer tu bandeja principal a spam futuro.",
		},
		fr: {
			title: "Email temporaire pour inscription | smail.pw",
			description:
				"Utilisez un email temporaire pour l'inscription et les essais sans exposer votre boîte principale.",
		},
		de: {
			title: "Temporäre E-Mail für Registrierung | smail.pw",
			description:
				"Nutze temporäre E-Mail für Registrierungen und Testaccounts, ohne dein Hauptpostfach preiszugeben.",
		},
		ja: {
			title: "登録向け一時メール | smail.pw",
			description:
				"登録やトライアル開始時に使える一時メール。メインアドレスの露出を抑えられます。",
		},
		ko: {
			title: "가입용 임시 이메일 | smail.pw",
			description:
				"회원가입과 체험 등록에 쓰는 임시 이메일로 기본 메일함 노출과 스팸 유입을 줄이세요.",
		},
		ru: {
			title: "Временная почта для регистрации | smail.pw",
			description:
				"Используйте временную почту для регистраций и тестовых аккаунтов без риска для основного адреса.",
		},
		pt: {
			title: "Email temporário para cadastro | smail.pw",
			description:
				"Use email temporário em cadastros e testes sem expor sua caixa principal a spam recorrente.",
		},
		ar: {
			title: "بريد مؤقت للتسجيل | smail.pw",
			description:
				"استخدم بريدًا مؤقتًا لعمليات التسجيل والتجربة دون كشف صندوق بريدك الأساسي على المدى الطويل.",
		},
	},
	"online-temporary-email": {
		en: {
			title: "Online Temporary Email Inbox (Instant Temp Mail) | smail.pw",
			description:
				"Get an online temporary email inbox instantly for verification links, OTP messages, and short-term email reception.",
		},
		zh: {
			title: "在线临时邮箱（即时收信）| smail.pw",
			description:
				"在线临时邮箱即时可用，适合验证码、确认链接和短期收信场景，支持快速刷新。",
		},
		es: {
			title: "Correo temporal online inmediato | smail.pw",
			description:
				"Obtén una bandeja temporal online al instante para OTP, enlaces de verificación y correos de uso corto.",
		},
		fr: {
			title: "Email temporaire en ligne immédiat | smail.pw",
			description:
				"Obtenez une boîte temporaire en ligne pour OTP, liens de vérification et réception courte durée.",
		},
		de: {
			title: "Online-Temporäre E-Mail sofort | smail.pw",
			description:
				"Erhalte sofort ein Online-Temp-Postfach für OTP-Codes, Bestätigungslinks und Kurzzeit-Empfang.",
		},
		ja: {
			title: "オンライン一時メール（即時受信）| smail.pw",
			description:
				"OTPや確認リンクの受信に使えるオンライン一時メールをすぐ利用できます。",
		},
		ko: {
			title: "온라인 임시 이메일 즉시 사용 | smail.pw",
			description:
				"OTP와 확인 링크 수신에 적합한 온라인 임시 메일함을 즉시 생성해 사용하세요.",
		},
		ru: {
			title: "Онлайн временная почта мгновенно | smail.pw",
			description:
				"Мгновенно получите онлайн-временный ящик для OTP, ссылок подтверждения и коротких сценариев.",
		},
		pt: {
			title: "Email temporário online imediato | smail.pw",
			description:
				"Gere inbox temporário online na hora para OTP, links de confirmação e recebimento de curto prazo.",
		},
		ar: {
			title: "بريد مؤقت أونلاين فوري | smail.pw",
			description:
				"احصل على صندوق بريد مؤقت عبر الإنترنت فورًا لاستقبال OTP وروابط التحقق والرسائل قصيرة المدة.",
		},
	},
	"domestic-temporary-email": {
		en: {
			title:
				"Domestic Temporary Email Guide (Regional Delivery Tips) | smail.pw",
			description:
				"Read domestic temporary email delivery tips, common verification issues, and retry steps when OTP messages are delayed.",
		},
		zh: {
			title: "国内临时邮箱收信指南 | smail.pw",
			description:
				"国内临时邮箱场景下的验证码接收建议：常见延迟原因、重发步骤和收信排查方法。",
		},
		es: {
			title: "Guía de correo temporal local | smail.pw",
			description:
				"Consulta recomendaciones de entrega local para correo temporal y cómo resolver retrasos de OTP.",
		},
		fr: {
			title: "Guide d'email temporaire local | smail.pw",
			description:
				"Conseils de délivrabilité locale pour email temporaire et résolution des retards de code OTP.",
		},
		de: {
			title: "Leitfaden für lokale temporäre E-Mail | smail.pw",
			description:
				"Tipps zur lokalen Zustellung bei temporärer E-Mail und zur Fehlerbehebung bei verzögerten OTP-Codes.",
		},
		ja: {
			title: "国内向け一時メール受信ガイド | smail.pw",
			description:
				"地域内サービスで一時メールを使う際の受信遅延対策やOTP再送手順をまとめています。",
		},
		ko: {
			title: "국내 임시 이메일 수신 가이드 | smail.pw",
			description:
				"국내 서비스에서 임시 메일 사용 시 OTP 지연 원인과 재전송/새로고침 대응법을 확인하세요.",
		},
		ru: {
			title: "Локальная временная почта: гайд | smail.pw",
			description:
				"Советы по локальной доставке временной почты и действия при задержке OTP-сообщений.",
		},
		pt: {
			title: "Guia de email temporário local | smail.pw",
			description:
				"Veja dicas de entrega local para email temporário e etapas para corrigir atrasos de OTP.",
		},
		ar: {
			title: "دليل البريد المؤقت المحلي | smail.pw",
			description:
				"تعرف على نصائح التسليم المحلي للبريد المؤقت وخطوات معالجة تأخر رسائل OTP.",
		},
	},
	"can-temporary-email-send": {
		en: {
			title:
				"Can Temporary Email Send Messages? (Receive-Only Explained) | smail.pw",
			description:
				"Understand whether temporary email can send messages, why many temp inboxes are receive-only, and when to use a permanent mailbox instead.",
		},
		zh: {
			title: "临时邮箱可以发送邮件吗？| smail.pw",
			description:
				"解释临时邮箱发送能力与限制：为什么多数临时邮箱仅收信，以及何时应切换到长期邮箱。",
		},
		es: {
			title: "¿El correo temporal puede enviar mensajes? | smail.pw",
			description:
				"Conoce por qué muchos buzones temporales son solo de recepción y cuándo debes usar correo permanente.",
		},
		fr: {
			title: "Un email temporaire peut-il envoyer des messages ? | smail.pw",
			description:
				"Comprenez pourquoi de nombreuses boîtes temporaires sont en réception seule et quand utiliser un email permanent.",
		},
		de: {
			title: "Kann temporäre E-Mail Nachrichten senden? | smail.pw",
			description:
				"Erfahre, warum viele Temp-Mail-Postfächer nur empfangen und wann ein dauerhaftes Postfach nötig ist.",
		},
		ja: {
			title: "一時メールは送信できる？ | smail.pw",
			description:
				"多くの一時メールが受信専用である理由と、恒久メールへ切り替えるべき場面を解説します。",
		},
		ko: {
			title: "임시 이메일로 발신할 수 있나요? | smail.pw",
			description:
				"임시 메일함이 수신 전용인 이유와, 언제 장기 메일 서비스로 전환해야 하는지 설명합니다.",
		},
		ru: {
			title: "Можно ли отправлять письма с временной почты? | smail.pw",
			description:
				"Разбираем, почему временные ящики часто только для приема и когда нужен постоянный адрес.",
		},
		pt: {
			title: "Email temporário pode enviar mensagens? | smail.pw",
			description:
				"Entenda por que muitas caixas temporárias são só para receber e quando usar um email permanente.",
		},
		ar: {
			title: "هل يمكن للبريد المؤقت إرسال رسائل؟ | smail.pw",
			description:
				"تعرف لماذا تكون معظم صناديق البريد المؤقت للاستقبال فقط ومتى تحتاج إلى بريد دائم للإرسال.",
		},
	},
	"smail-vs-smailpro": {
		en: {
			title: "smail.pw vs smailpro / smail pro | Brand Clarification",
			description:
				"Official clarification: smail.pw is an independent temporary email service and is not affiliated with smailpro or similarly named products.",
		},
		zh: {
			title: "smail.pw 与 smailpro / smail pro 关系说明",
			description:
				"官方说明：smail.pw 是独立临时邮箱服务，与 smailpro 或同名近似产品无隶属关系。",
		},
		es: {
			title: "smail.pw vs smailpro | Aclaración de marca",
			description:
				"Aclaración oficial: smail.pw es un servicio independiente y no está afiliado con smailpro.",
		},
		fr: {
			title: "smail.pw vs smailpro | Clarification de marque",
			description:
				"Clarification officielle: smail.pw est un service indépendant non affilié à smailpro.",
		},
		de: {
			title: "smail.pw vs smailpro | Markenhinweis",
			description:
				"Offizieller Hinweis: smail.pw ist ein unabhängiger Dienst ohne Verbindung zu smailpro.",
		},
		ja: {
			title: "smail.pw と smailpro の違い | 公式説明",
			description:
				"公式説明: smail.pw は独立した一時メールサービスで、smailpro との提携はありません。",
		},
		ko: {
			title: "smail.pw vs smailpro | 브랜드 안내",
			description:
				"공식 안내: smail.pw는 독립 서비스이며 smailpro와 제휴 또는 동일 서비스가 아닙니다.",
		},
		ru: {
			title: "smail.pw и smailpro | Разъяснение бренда",
			description:
				"Официально: smail.pw — независимый сервис и не связан со smailpro.",
		},
		pt: {
			title: "smail.pw vs smailpro | Esclarecimento de marca",
			description:
				"Esclarecimento oficial: smail.pw é um serviço independente e não afiliado ao smailpro.",
		},
		ar: {
			title: "smail.pw مقابل smailpro | توضيح العلامة",
			description:
				"توضيح رسمي: smail.pw خدمة مستقلة وليست تابعة لـ smailpro أو لخدمات مشابهة الاسم.",
		},
	},
};

const HOME_BREADCRUMB_LABEL: Record<Locale, string> = {
	en: "Home",
	zh: "首页",
	es: "Inicio",
	fr: "Accueil",
	de: "Startseite",
	ja: "ホーム",
	ko: "홈",
	ru: "Главная",
	pt: "Início",
	ar: "الرئيسية",
};

type InternalCtaCopy = {
	title: string;
	description: string;
	links: Array<{ label: string; path: string }>;
};

const INTERNAL_CTA_COPY: Record<Locale, InternalCtaCopy> = {
	en: {
		title: "Start your temporary inbox now",
		description:
			"Create a disposable address in one tap, then open the most common registration and OTP guides below.",
		links: [
			{ label: "Generate temporary email", path: "/" },
			{
				label: "Temporary email for registration",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Disposable email for verification",
				path: "/disposable-email-for-verification",
			},
		],
	},
	zh: {
		title: "立即开始使用临时邮箱",
		description: "一键生成一次性邮箱，再查看常用的临时邮箱注册与验证码指南。",
		links: [
			{ label: "生成临时邮箱", path: "/" },
			{ label: "临时邮箱注册指南", path: "/temporary-email-for-registration" },
			{ label: "验证码一次性邮箱", path: "/disposable-email-for-verification" },
		],
	},
	es: {
		title: "Empieza ahora con correo temporal",
		description:
			"Genera una dirección desechable en un clic y revisa las guías clave para registro y OTP.",
		links: [
			{ label: "Generar correo temporal", path: "/" },
			{
				label: "Correo temporal para registro",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Correo para verificación OTP",
				path: "/disposable-email-for-verification",
			},
		],
	},
	fr: {
		title: "Démarrez votre boîte temporaire",
		description:
			"Créez une adresse jetable en un clic puis consultez les guides essentiels inscription et OTP.",
		links: [
			{ label: "Générer un email temporaire", path: "/" },
			{
				label: "Email temporaire pour inscription",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Email pour vérification OTP",
				path: "/disposable-email-for-verification",
			},
		],
	},
	de: {
		title: "Temporäres Postfach sofort starten",
		description:
			"Erstelle eine Wegwerfadresse mit einem Klick und nutze die wichtigsten Guides zu Anmeldung und OTP.",
		links: [
			{ label: "Temporäre E-Mail erzeugen", path: "/" },
			{
				label: "Temporäre E-Mail für Registrierung",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Wegwerf-E-Mail für OTP",
				path: "/disposable-email-for-verification",
			},
		],
	},
	ja: {
		title: "今すぐ一時メールを開始",
		description:
			"ワンタップで使い捨てアドレスを作成し、登録とOTPの主要ガイドを確認できます。",
		links: [
			{ label: "一時メールを生成", path: "/" },
			{
				label: "登録向け一時メール",
				path: "/temporary-email-for-registration",
			},
			{
				label: "OTP認証向け使い捨てメール",
				path: "/disposable-email-for-verification",
			},
		],
	},
	ko: {
		title: "지금 임시 이메일 시작하기",
		description:
			"한 번에 일회용 주소를 만들고 가입/OTP 핵심 가이드를 바로 확인하세요.",
		links: [
			{ label: "임시 이메일 생성", path: "/" },
			{
				label: "가입용 임시 이메일",
				path: "/temporary-email-for-registration",
			},
			{
				label: "OTP 인증용 일회용 이메일",
				path: "/disposable-email-for-verification",
			},
		],
	},
	ru: {
		title: "Запустите временный ящик сейчас",
		description:
			"Создайте одноразовый адрес в один клик и изучите ключевые гайды по регистрации и OTP.",
		links: [
			{ label: "Создать временную почту", path: "/" },
			{
				label: "Временная почта для регистрации",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Одноразовая почта для OTP",
				path: "/disposable-email-for-verification",
			},
		],
	},
	pt: {
		title: "Comece sua caixa temporária agora",
		description:
			"Gere um endereço descartável em um clique e acesse os guias mais úteis para cadastro e OTP.",
		links: [
			{ label: "Gerar email temporário", path: "/" },
			{
				label: "Email temporário para cadastro",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Email para verificação OTP",
				path: "/disposable-email-for-verification",
			},
		],
	},
	ar: {
		title: "ابدأ صندوق البريد المؤقت الآن",
		description:
			"أنشئ عنوانًا مؤقتًا بنقرة واحدة ثم راجع أهم أدلة التسجيل والتحقق عبر OTP.",
		links: [
			{ label: "إنشاء بريد مؤقت", path: "/" },
			{ label: "بريد مؤقت للتسجيل", path: "/temporary-email-for-registration" },
			{
				label: "بريد مؤقت لرموز OTP",
				path: "/disposable-email-for-verification",
			},
		],
	},
};

function isKnownMarkdownSlug(value: string): value is MarkdownPageSlug {
	return (KNOWN_MD_PAGES as readonly string[]).includes(value);
}

function isInfoMarkdownSlug(
	value: MarkdownPageSlug,
): value is InfoMarkdownSlug {
	return (INFO_MD_PAGES as readonly string[]).includes(value);
}

function isArticleMarkdownSlug(
	value: MarkdownPageSlug,
): value is ArticleMarkdownSlug {
	return (ARTICLE_MD_PAGES as readonly string[]).includes(value);
}

function getMarkdownSeoCopy(locale: Locale, slug: MarkdownPageSlug) {
	return mdMetaCopy[slug][locale] ?? mdMetaCopy[slug][DEFAULT_LOCALE];
}

function getMarkdownSlugFromPathname(
	pathname: string,
): MarkdownPageSlug | null {
	const normalized = normalizePathname(pathname);
	const basePath = stripLocalePrefix(normalized);
	const slug = basePath.replace(/^\//, "");
	if (!isKnownMarkdownSlug(slug)) {
		return null;
	}
	return slug;
}

function getFaqJsonLd(locale: Locale, pageUrl: string) {
	const entries =
		FAQ_JSON_LD_COPY[locale] ?? FAQ_JSON_LD_COPY[DEFAULT_LOCALE] ?? [];
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: entries.map((entry) => ({
			"@type": "Question",
			name: entry.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: entry.answer,
			},
		})),
		url: pageUrl,
	};
}

function getHeadlineFromMetaTitle(title: string): string {
	const [headline] = title.split("|");
	return headline?.trim() || title;
}

function getArticleJsonLd(
	locale: Locale,
	slug: ArticleMarkdownSlug,
	pageUrl: string,
) {
	const pageMeta = getMarkdownSeoCopy(locale, slug);
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: getHeadlineFromMetaTitle(pageMeta.title),
		description: pageMeta.description,
		inLanguage: locale,
		mainEntityOfPage: pageUrl,
		datePublished: "2026-03-01",
		dateModified: "2026-03-01",
		author: {
			"@type": "Organization",
			name: "smail.pw",
		},
		publisher: {
			"@type": "Organization",
			name: "smail.pw",
			url: BASE_URL,
		},
	};
}

function getBreadcrumbJsonLd(
	locale: Locale,
	slug: ArticleMarkdownSlug,
	pageUrl: string,
) {
	const pageMeta = getMarkdownSeoCopy(locale, slug);
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name:
					HOME_BREADCRUMB_LABEL[locale] ??
					HOME_BREADCRUMB_LABEL[DEFAULT_LOCALE],
				item: `${BASE_URL}${toLocalePath("/", locale)}`,
			},
			{
				"@type": "ListItem",
				position: 2,
				name: getHeadlineFromMetaTitle(pageMeta.title),
				item: pageUrl,
			},
		],
	};
}

function getInternalCtaCopy(locale: Locale): InternalCtaCopy {
	return INTERNAL_CTA_COPY[locale] ?? INTERNAL_CTA_COPY[DEFAULT_LOCALE];
}

export function meta({ params, location, matches }: Route.MetaArgs) {
	const { locale } = resolveLocaleParam(params.lang);
	const slug = getMarkdownSlugFromPathname(location.pathname);
	if (!slug) {
		return mergeRouteMeta(matches, []);
	}
	const pageMeta = getMarkdownSeoCopy(locale, slug);

	return mergeRouteMeta(matches, [
		{ title: pageMeta.title },
		{ name: "description", content: pageMeta.description },
		{
			name: "robots",
			content: isMarkdownLocaleIndexable(locale)
				? "index, follow"
				: "noindex, follow",
		},
	]);
}

export async function loader({ params, request }: Route.LoaderArgs) {
	const { locale, shouldRedirectToDefault, isInvalid } = resolveLocaleParam(
		params.lang,
	);
	if (isInvalid) {
		throw new Response("Not Found", { status: 404 });
	}

	const url = new URL(request.url);
	if (shouldRedirectToDefault) {
		const normalizedPath = stripDefaultLocalePrefix(url.pathname);
		throw redirect(`${normalizedPath}${url.search}`, 301);
	}

	const pathname =
		url.pathname.endsWith("/") && url.pathname.length > 1
			? url.pathname.slice(0, -1)
			: url.pathname;
	const segments = pathname.split("/").filter(Boolean);
	const slug = segments[segments.length - 1] ?? "";
	if (!slug || slug === locale || slug === DEFAULT_LOCALE) {
		throw new Response("Not Found", { status: 404 });
	}
	if (!isKnownMarkdownSlug(slug)) {
		throw new Response("Not Found", { status: 404 });
	}

	const preferredPath = `../md/${locale}/${slug}.md`;
	const fallbackPath = `../md/${DEFAULT_LOCALE}/${slug}.md`;
	const sourceLoader =
		markdownSources[preferredPath] ??
		(locale !== DEFAULT_LOCALE ? markdownSources[fallbackPath] : undefined);
	const source = sourceLoader ? await sourceLoader().catch(() => null) : null;

	if (!source) {
		throw new Response("Not Found", { status: 404 });
	}
	const ast = Markdoc.parse(source);
	const content = Markdoc.transform(ast);
	const html = Markdoc.renderers.html(content);

	return { html, locale, slug: slug as MarkdownPageSlug };
}

export default function MarkdownPage({ loaderData }: Route.ComponentProps) {
	const pageUrl = `${BASE_URL}${toLocalePath(`/${loaderData.slug}`, loaderData.locale)}`;
	const faqJsonLd =
		loaderData.slug === "faq" ? getFaqJsonLd(loaderData.locale, pageUrl) : null;
	const articleJsonLd = isArticleMarkdownSlug(loaderData.slug)
		? getArticleJsonLd(loaderData.locale, loaderData.slug, pageUrl)
		: null;
	const breadcrumbJsonLd = isArticleMarkdownSlug(loaderData.slug)
		? getBreadcrumbJsonLd(loaderData.locale, loaderData.slug, pageUrl)
		: null;
	const infoCta = isInfoMarkdownSlug(loaderData.slug)
		? getInternalCtaCopy(loaderData.locale)
		: null;

	return (
		<div className="flex flex-1 py-3 sm:py-4">
			{faqJsonLd && faqJsonLd.mainEntity.length > 0 && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
				/>
			)}
			{articleJsonLd && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
				/>
			)}
			{breadcrumbJsonLd && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
				/>
			)}
			<div className="markdown-shell w-full">
				<article
					className="prose prose-sm sm:prose-base max-w-none"
					dangerouslySetInnerHTML={{ __html: loaderData.html }}
				/>
				{infoCta && (
					<section
						className="theme-card mt-6 space-y-3 p-4 sm:p-5"
						aria-label="Related temporary email pages"
					>
						<h2 className="text-theme-primary font-display text-lg font-semibold">
							{infoCta.title}
						</h2>
						<p className="text-theme-secondary text-sm leading-relaxed">
							{infoCta.description}
						</p>
						<div className="grid gap-2 sm:grid-cols-3">
							{infoCta.links.map((link) => (
								<Link
									key={link.path}
									to={toLocalePath(link.path, loaderData.locale)}
									prefetch="viewport"
									className="theme-badge flex items-center justify-between px-3 py-2 text-xs font-medium"
								>
									<span>{link.label}</span>
									<span aria-hidden="true">{"->"}</span>
								</Link>
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	);
}
