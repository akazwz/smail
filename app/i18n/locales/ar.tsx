import type { ParentProps } from "solid-js";

import { type Dictionary, DictionaryContext } from "../dictionary.ts";

export const dictionary: Dictionary = {
	home: {
		title: "بريد مؤقت مجاني بدون تسجيل لاستلام OTP | smail.pw",
		description:
			"أنشئ بريدًا مؤقتًا مجانيًا (temp mail) فورًا على smail.pw. استخدم صندوق بريد مؤقتًا لرموز التحقق OTP والتسجيل السريع والحد من الرسائل المزعجة.",
		keywords:
			"smail, بريد مؤقت, بريد مؤقت مجاني, إيميل مؤقت, بريد وهمي, بريد للاستخدام مرة واحدة, temp mail, مولد بريد مؤقت, بريد بدون تسجيل, رمز otp, smail.pw",
		heroTitle: "صندوق بريد مؤقت بنقرة واحدة.",
		heroDescription:
			"أنشئ عنوان بريد مؤقت للتسجيل ورموز OTP خلال ثوانٍ. العنوان لا يتغيّر أبدًا ما لم تغيّره أنت.",
		copy: "نسخ",
		copied: "تم النسخ",
		deleteAddress: "حذف العنوان",
		replaceAddress: "استبدال العنوان",
		replaceConfirmTitle: "هل تريد استبدال هذا العنوان؟",
		deleteConfirmTitle: "هل تريد حذف هذا العنوان؟",
		confirmBody:
			"لن تتمكن بعد الآن من فتح العنوان {address} أو صندوق الوارد الخاص به. لا يمكن التراجع عن هذا الإجراء.",
		generating: "جارٍ الإنشاء...",
		noAddressTitle: "لا يوجد بريد مؤقت بعد",
		noAddressDescription:
			"أنشئ عنوانًا مؤقتًا لاستخدامه في التسجيل وعمليات التحقق لمرة واحدة.",
		generateAddress: "إنشاء عنوان",
		actionFailed: "لم تنجح العملية. يُرجى المحاولة مجددًا.",
		inboxTitle: "أحدث الرسائل",
		emptyInboxTitle: "صندوقك بانتظار الرسائل",
		emptyInboxDescription: "لا توجد رسائل بعد. ستظهر الرسائل هنا فور وصولها.",
		refreshInbox: "تحديث",
		refreshingInbox: "جارٍ التحديث...",
		liveOn: "استقبال مباشر",
		liveOff: "انقطع الاتصال، جارٍ إعادة الاتصال",
		safetyHint:
			"لا تستخدم هذا العنوان للبنوك أو العمل أو رموز الحسابات المهمة. يُحتفظ به لمدة طويلة افتراضيًا، دون أي ضمان.",
		badge: "عنوان لا يتغيّر · بدون تسجيل",
		modal: {
			title: "معاينة الرسالة",
			from: "من",
			time: "الوقت",
			loading: "جارٍ التحميل...",
			empty: "لا يوجد محتوى",
		},
		narrative: {
			title: "لماذا تستخدم البريد المؤقت من smail.pw",
			description:
				"smail.pw مولّد بريد مؤقت مجاني (temp mail) للتسجيلات منخفضة المخاطر ورموز التحقق OTP والتنزيلات لمرة واحدة. أنشئ صندوق بريد مؤقتًا خلال ثوانٍ واحتفظ بالعنوان نفسه إلى أن تغيّره بنفسك.",
			points: [
				"مناسب للتسجيل بالبريد المؤقت واستقبال رموز التحقق",
				"بدون تسجيل أو إعداد كلمة مرور، للوصول السريع إلى بريدك المؤقت",
				"الرسائل الجديدة تظهر تلقائيًا دون حاجة إلى التحديث المتكرر",
				"استخدم بريدًا دائمًا للبنوك والعمل والحسابات المرتبطة بهويتك",
			],
		},
		jsonLdDescription:
			"يوفّر smail.pw صناديق بريد مؤقت مجانية (temp mail) للتسجيل ورموز التحقق OTP، بعنوان يبقى كما هو إلى أن تغيّره بنفسك.",
	},
	layout: {
		siteSubtitle: "صندوق بريد مؤقت",
		about: "عن الخدمة",
		faq: "الأسئلة الشائعة",
		blog: "المدونة",
		contact: "اتصل بنا",
		privacy: "سياسة الخصوصية",
		terms: "شروط الاستخدام",
		language: "اللغة",
		copyright: "صندوق نظيف، وهوية مصونة.",
	},
	common: {
		close: "إغلاق",
		cancel: "إلغاء",
	},
	guides: {
		title: "أشهر أدلة البريد المؤقت",
		items: [
			{
				label: "بريد مؤقت بدون تسجيل",
				path: "/temporary-email-no-registration",
			},
			{
				label: "بريد مؤقت لرموز التحقق",
				path: "/disposable-email-for-verification",
			},
			{
				label: "بريد مؤقت للتسجيل",
				path: "/temporary-email-for-registration",
			},
			{
				label: "بريد مؤقت أونلاين",
				path: "/online-temporary-email",
			},
		],
	},
	contact: {
		metaTitle: "اتصل بنا | smail.pw",
		metaDescription:
			"تواصل مع smail.pw: اترك لنا رسالة تتضمن سؤالًا أو ملاحظة أو طلب تعاون.",
		title: "تواصل مع الدعم",
		description: "اترك لنا رسالة أدناه. نرحّب بالأسئلة والملاحظات وطلبات التعاون.",
		formTitle: "اترك رسالة",
		messageLabel: "الرسالة",
		messagePlaceholder: "ماذا حدث، أو ما الذي تودّ إخبارنا به؟",
		contactLabel: "وسيلة التواصل معك (اختياري)",
		contactHint: "عنوان بريد إلكتروني، فقط إذا أردت ردًّا",
		send: "إرسال الرسالة",
		sending: "جارٍ الإرسال...",
		sent: "شكرًا، تم استلام رسالتك.",
		tooMany: "أُرسل عدد كبير جدًا من الرسائل من شبكتك. يُرجى المحاولة لاحقًا.",
		failed: "تعذّر إرسال الرسالة. يُرجى المحاولة مجددًا بعد قليل.",
		faqHint:
			"قبل التواصل معنا، يُرجى الاطلاع أولًا على صفحة الأسئلة الشائعة، فقد تجد إجابتك هناك.",
		faqCta: "فتح الأسئلة الشائعة",
		homeCta: "العودة إلى الصفحة الرئيسية",
	},
	blog: {
		title: "مدونة البريد المؤقت: أدلة وحلول للمشكلات | smail.pw",
		description:
			"أدلة البريد المؤقت وأفضل الممارسات ونصائح حل المشكلات المتعلقة بالتحقق واستخدام صناديق البريد المؤقتة.",
		header: "مدونة smail.pw",
		subheader: "أدلة وحلول للمشكلات لمستخدمي البريد المؤقت",
		readArticle: "اقرأ المقال",
		prevPage: "السابق",
		nextPage: "التالي",
		backToBlog: "العودة إلى المدونة",
		relatedPosts: "مقالات ذات صلة",
		postTitleSuffix: " | مدونة smail.pw",
		pageSummary: "الصفحة {page} من {total} · عدد المقالات في الصفحة: {size}",
		readingTime: "دقائق القراءة: {minutes}",
		posts: [
			{
				slug: "is-temporary-email-safe",
				title: "هل البريد المؤقت آمن؟ ما الذي يحميه وما الذي لا يحميه",
				description:
					"ما الذي يحميه العنوان المؤقت وما الذي لا يحميه، وكيف يتعامل smail.pw مع الوصول إلى صندوق الوارد وتخزين الرسائل وعرضها.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "why-websites-block-temporary-email",
				title: "لماذا ترفض بعض المواقع عناوين البريد المؤقت",
				description:
					"كيف تكتشف نماذج التسجيل العناوين المؤقتة، ولماذا تحظرها المواقع، وما الذي ينفع فعلًا عندما يُرفض عنوانك المؤقت.",
				publishedAt: "2026-10-08",
				readingMinutes: 5,
			},
			{
				slug: "how-email-ends-up-on-spam-lists",
				title: "كيف يصل عنوان بريدك إلى قوائم الرسائل المزعجة (وكيف توقف ذلك)",
				description:
					"من أين يحصل مرسلو الرسائل المزعجة والمسوّقون على عنوانك، وما العادات التي تسرّبه، وقاعدة بسيطة لاختيار العنوان الذي تعطيه لكل موقع.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "temporary-email-best-practices",
				title: "أفضل ممارسات البريد المؤقت لتسجيل أكثر أمانًا",
				description:
					"تعرّف على أفضل الممارسات العملية للبريد المؤقت لتقليل الرسائل المزعجة وتجنّب فقدان الوصول إلى حساباتك وحماية بريدك الأساسي.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "temporary-email-vs-email-alias",
				title: "البريد المؤقت مقابل الاسم المستعار للبريد: أيهما تختار؟",
				description:
					"مقارنة بين صناديق البريد المؤقتة والأسماء المستعارة للبريد من حيث الخصوصية واستعادة الحساب وأمان الحساب على المدى الطويل.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "otp-email-not-arriving-fixes",
				title: "لا تصلك رسالة OTP؟ 8 حلول سريعة تنجح غالبًا",
				description:
					"عالج تأخر رسائل التحقق بقائمة عملية تشمل مشكلات إعادة الإرسال وحظر المرسِل وتحديث صندوق الوارد.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
		],
	},
	md: {
		meta: {
			about: {
				title: "حول smail.pw | بريد مؤقت",
				description:
					"تعرّف على طريقة عمل البريد المؤقت في smail.pw ومتى تستخدمه وأهم حدود استخدام صناديق البريد المؤقتة.",
			},
			faq: {
				title: "الأسئلة الشائعة عن البريد المؤقت | smail.pw",
				description:
					"أسئلة شائعة عن البريد المؤقت في smail.pw: إنشاء العنوان، مدة الاحتفاظ بالعناوين والرسائل، مشكلات وصول رموز OTP، وحدود الأمان.",
			},
			privacy: {
				title: "سياسة الخصوصية | smail.pw",
				description:
					"تعرّف على البيانات التي قد يعالجها smail.pw ومدة الاحتفاظ بالبيانات المؤقتة وكيف نتعامل مع الخصوصية.",
			},
			terms: {
				title: "شروط الاستخدام | smail.pw",
				description:
					"راجع شروط استخدام smail.pw، بما يشمل الاستخدام المقبول وإخلاء المسؤولية وحدود الخدمة.",
			},
			"temporary-email-no-registration": {
				title: "بريد مؤقت بدون تسجيل | smail.pw",
				description:
					"بريد مؤقت بدون تسجيل وبلا كلمة مرور أو بيانات شخصية. أنشئ صندوق بريد مؤقتًا فورًا واستقبل الرسائل خلال ثوانٍ.",
			},
			"disposable-email-for-verification": {
				title: "بريد مؤقت للتحقق ورموز OTP | smail.pw",
				description:
					"استقبل رموز OTP ورسائل التحقق في صندوق بريد مؤقت، وأبقِ بريدك الشخصي خاصًّا وخاليًا من الرسائل المزعجة.",
			},
			"temporary-email-for-registration": {
				title: "بريد مؤقت للتسجيل | smail.pw",
				description:
					"استخدم البريد المؤقت للتسجيل والحسابات التجريبية والاشتراكات لمرة واحدة دون كشف بريدك الدائم.",
			},
			"online-temporary-email": {
				title: "بريد مؤقت أونلاين فوري | smail.pw",
				description:
					"احصل فورًا على صندوق بريد مؤقت أونلاين لروابط التحقق ورسائل OTP واستقبال البريد لمرة واحدة.",
			},
			"can-temporary-email-send": {
				title: "هل يمكن للبريد المؤقت إرسال رسائل؟ | smail.pw",
				description:
					"هل يستطيع البريد المؤقت إرسال الرسائل؟ ولماذا تكون أغلب الصناديق المؤقتة للاستقبال فقط؟ ومتى تحتاج إلى بريد دائم؟",
			},
			"smail-vs-smailpro": {
				title: "smail.pw مقابل smailpro / smail pro | توضيح العلامة التجارية",
				description:
					"توضيح رسمي: smail.pw خدمة بريد مؤقت مستقلة، ولا تتبع smailpro ولا أي منتجات أخرى بأسماء مشابهة.",
			},
		},
		breadcrumbHome: "الرئيسية",
		cta: {
			title: "ابدأ صندوق بريدك المؤقت الآن",
			description:
				"أنشئ عنوانًا مؤقتًا بنقرة واحدة، ثم تصفّح أدناه أشهر أدلة التسجيل ورموز OTP.",
			action: "إنشاء بريد مؤقت",
		},
	},
};

export default function Provider(props: ParentProps) {
	return (
		<DictionaryContext value={dictionary}>{props.children}</DictionaryContext>
	);
}
