import type { ParentProps } from "solid-js";

import { type Dictionary, DictionaryContext } from "../dictionary.ts";

export const dictionary: Dictionary = {
	home: {
		title: "Correo temporal gratis sin registro para OTP | smail.pw",
		description:
			"Genera al instante un correo temporal gratis (temp mail) en smail.pw. Bandeja desechable para códigos OTP, registros rápidos y menos spam.",
		keywords:
			"correo temporal, correo temporal gratis, email temporal, email desechable, temp mail, sin registro, codigo otp, smail.pw",
		heroTitle: "Tu bandeja de correo temporal en un clic.",
		heroDescription:
			"Genera en segundos una dirección de correo temporal para registros y códigos OTP. La dirección nunca cambia a menos que tú la cambies.",
		copy: "Copiar",
		copied: "Copiado",
		deleteAddress: "Eliminar dirección",
		replaceAddress: "Reemplazar dirección",
		replaceConfirmTitle: "¿Reemplazar esta dirección?",
		deleteConfirmTitle: "¿Eliminar esta dirección?",
		confirmBody:
			"Ya no podrás abrir {address} ni su bandeja de entrada. Esta acción no se puede deshacer.",
		generating: "Generando...",
		noAddressTitle: "Aún no tienes un correo desechable",
		noAddressDescription:
			"Genera una dirección temporal para registros y verificaciones puntuales.",
		generateAddress: "Generar dirección",
		actionFailed: "No se pudo completar. Inténtalo de nuevo.",
		inboxTitle: "Últimos correos",
		emptyInboxTitle: "Tu bandeja de entrada te espera",
		emptyInboxDescription:
			"Aún no hay correos. Los mensajes aparecerán aquí al instante.",
		refreshInbox: "Actualizar",
		refreshingInbox: "Actualizando...",
		liveOn: "Recibiendo en tiempo real",
		liveOff: "Desconectado, reconectando",
		safetyHint:
			"No uses esta dirección para bancos, trabajo ni códigos de cuentas críticas. Se conserva a largo plazo por defecto, pero sin garantía.",
		badge: "Dirección fija · Sin registro",
		modal: {
			title: "Vista previa del mensaje",
			from: "De",
			time: "Hora",
			loading: "Cargando...",
			empty: "Sin contenido",
		},
		narrative: {
			title: "Por qué usar el correo temporal de smail.pw",
			description:
				"smail.pw es un generador gratuito de correo temporal (temp mail) para registros de bajo riesgo, verificación con OTP y descargas puntuales. Crea una bandeja desechable en segundos y conserva la misma dirección hasta que la cambies.",
			points: [
				"Ideal para registrarte con un correo temporal y recibir códigos de verificación",
				"Sin registro ni contraseña: acceso rápido a tu temp mail",
				"Los correos nuevos aparecen solos, sin necesidad de estar actualizando",
				"Para bancos, trabajo y cuentas ligadas a tu identidad, usa un correo permanente",
			],
		},
		jsonLdDescription:
			"smail.pw ofrece bandejas de correo temporal gratis (temp mail) para registros y verificación con OTP, con una dirección que no cambia hasta que tú la cambies.",
	},
	layout: {
		siteSubtitle: "bandeja temporal",
		about: "Acerca de",
		faq: "FAQ",
		blog: "Blog",
		contact: "Contacto",
		privacy: "Política de privacidad",
		terms: "Términos de uso",
		language: "Idioma",
		copyright: "Bandeja limpia, identidad limpia.",
	},
	common: {
		close: "Cerrar",
		cancel: "Cancelar",
	},
	guides: {
		title: "Guías populares de correo temporal",
		items: [
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
			{
				label: "Correo temporal online",
				path: "/online-temporary-email",
			},
		],
	},
	contact: {
		metaTitle: "Contacto | smail.pw",
		metaDescription:
			"Contacta a smail.pw: déjanos un mensaje con una pregunta, un comentario o una propuesta de colaboración.",
		title: "Contactar al soporte",
		description:
			"Déjanos un mensaje aquí abajo. Recibimos con gusto preguntas, comentarios y propuestas de colaboración.",
		formTitle: "Deja un mensaje",
		messageLabel: "Mensaje",
		messagePlaceholder: "¿Qué pasó o qué te gustaría contarnos?",
		contactLabel: "Cómo contactarte (opcional)",
		contactHint: "Un correo electrónico, solo si quieres respuesta",
		send: "Enviar mensaje",
		sending: "Enviando...",
		sent: "Gracias, recibimos tu mensaje.",
		tooMany:
			"Se enviaron demasiados mensajes desde tu red. Inténtalo de nuevo más tarde.",
		failed: "No se pudo enviar el mensaje. Inténtalo de nuevo en un momento.",
		faqHint:
			"Antes de escribirnos, revisa la página de preguntas frecuentes: puede que tu respuesta ya esté ahí.",
		faqCta: "Ver FAQ",
		homeCta: "Volver al inicio",
	},
	blog: {
		title: "Blog de correo temporal: guías y soluciones | smail.pw",
		description:
			"Guías de correo temporal, buenas prácticas y solución de problemas para la verificación y el uso de bandejas desechables.",
		header: "Blog de smail.pw",
		subheader:
			"Guías y solución de problemas para quienes usan correo temporal",
		readArticle: "Leer artículo",
		prevPage: "Anterior",
		nextPage: "Siguiente",
		backToBlog: "Volver al blog",
		relatedPosts: "Artículos relacionados",
		postTitleSuffix: " | Blog de smail.pw",
		pageSummary: "Página {page} de {total} · {size} artículos por página",
		readingTime: "{minutes} min de lectura",
		posts: [
			{
				slug: "is-temporary-email-safe",
				title: "¿Es seguro el correo temporal? Qué protege y qué no",
				description:
					"Qué protege una dirección temporal, qué no protege y cómo gestiona smail.pw el acceso a la bandeja de entrada, el almacenamiento y la visualización de los correos.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "why-websites-block-temporary-email",
				title:
					"Por qué algunos sitios web rechazan las direcciones de correo temporal",
				description:
					"Cómo detectan los formularios de registro las direcciones desechables, por qué los sitios las bloquean y qué funciona de verdad cuando rechazan tu dirección temporal.",
				publishedAt: "2026-10-08",
				readingMinutes: 5,
			},
			{
				slug: "how-email-ends-up-on-spam-lists",
				title:
					"Cómo termina tu dirección de correo en las listas de spam (y cómo evitarlo)",
				description:
					"De dónde sacan tu dirección los spammers y los equipos de marketing, qué hábitos la exponen y una regla sencilla para saber qué dirección dar en cada sitio web.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "temporary-email-best-practices",
				title: "Buenas prácticas de correo temporal para registros más seguros",
				description:
					"Buenas prácticas de correo temporal para reducir el spam, no quedarte sin acceso a tus cuentas y proteger tu bandeja principal.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "temporary-email-vs-email-alias",
				title: "Correo temporal vs alias de correo: ¿cuál te conviene?",
				description:
					"Compara las bandejas temporales y los alias de correo según privacidad, recuperación y seguridad de la cuenta a largo plazo.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "otp-email-not-arriving-fixes",
				title:
					"¿No llega el correo OTP? 8 soluciones rápidas que suelen funcionar",
				description:
					"Soluciona los retrasos de los correos de verificación con una lista práctica: reenvíos, bloqueos del remitente y actualización de la bandeja.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
		],
	},
	md: {
		meta: {
			about: {
				title: "Acerca de smail.pw | Correo temporal",
				description:
					"Conoce cómo funciona el correo temporal de smail.pw, cuándo usar un temp mail y los límites importantes de una bandeja desechable.",
			},
			faq: {
				title: "Preguntas frecuentes | smail.pw",
				description:
					"Dudas sobre el correo temporal de smail.pw: cómo empezar, cuánto se conservan direcciones y mensajes, problemas con OTP y límites de seguridad.",
			},
			privacy: {
				title: "Política de privacidad | smail.pw",
				description:
					"Consulta qué datos puede tratar smail.pw, cuánto tiempo se conservan los datos temporales y cómo se gestiona la privacidad.",
			},
			terms: {
				title: "Términos de uso | smail.pw",
				description:
					"Revisa los términos de uso de smail.pw: uso aceptable, exenciones de responsabilidad y limitaciones del servicio.",
			},
			"temporary-email-no-registration": {
				title: "Correo temporal sin registro (sin cuenta) | smail.pw",
				description:
					"Usa un correo temporal sin registro, sin contraseña ni datos personales. Genera una bandeja temporal al instante y recibe correos en segundos.",
			},
			"disposable-email-for-verification": {
				title: "Correo desechable para verificación y OTP | smail.pw",
				description:
					"Recibe códigos OTP y correos de verificación en una bandeja desechable y mantén tu correo personal privado y sin spam.",
			},
			"temporary-email-for-registration": {
				title: "Correo temporal para registro | smail.pw",
				description:
					"Usa un correo temporal para registros, pruebas gratuitas y altas puntuales sin exponer tu correo de siempre.",
			},
			"online-temporary-email": {
				title: "Correo temporal online inmediato | smail.pw",
				description:
					"Obtén al instante una bandeja de correo temporal online para enlaces de verificación, códigos OTP y recepción puntual de correos.",
			},
			"can-temporary-email-send": {
				title: "¿El correo temporal puede enviar mensajes? | smail.pw",
				description:
					"Descubre si un correo temporal puede enviar mensajes, por qué muchos son solo de recepción y cuándo conviene usar un correo permanente.",
			},
			"smail-vs-smailpro": {
				title: "smail.pw vs smailpro / smail pro | Aclaración de marca",
				description:
					"Aclaración oficial: smail.pw es un servicio independiente de correo temporal y no está afiliado a smailpro ni a productos de nombre similar.",
			},
		},
		breadcrumbHome: "Inicio",
		cta: {
			title: "Empieza a usar tu bandeja temporal ahora",
			description:
				"Crea una dirección desechable en un clic y luego abre las guías más comunes sobre registro y OTP que aparecen abajo.",
			action: "Generar correo temporal",
		},
	},
};

export default function Provider(props: ParentProps) {
	return (
		<DictionaryContext value={dictionary}>{props.children}</DictionaryContext>
	);
}
