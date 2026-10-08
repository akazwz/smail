import type { ParentProps } from "solid-js";

import { type Dictionary, DictionaryContext } from "../dictionary.ts";

export const dictionary: Dictionary = {
	home: {
		title: "Temporäre E-Mail kostenlos ohne Registrierung | smail.pw",
		description:
			"Erstelle auf smail.pw sofort eine kostenlose temporäre E-Mail (Temp Mail). Dein Wegwerf-Postfach für OTP-Codes, schnelle Registrierungen und weniger Spam.",
		keywords:
			"smail, smail temp mail, temporäre email, wegwerf-email, temp mail, temporäre email generator, email ohne registrierung, otp code email, smail.pw",
		heroTitle: "Ein temporäres E-Mail-Postfach mit einem Klick.",
		heroDescription:
			"Erstelle in Sekunden eine Temp-Mail-Adresse für Registrierungen und OTP-Codes. Die Adresse ändert sich nie, außer du wechselst sie selbst.",
		copy: "Kopieren",
		copied: "Kopiert",
		deleteAddress: "Adresse löschen",
		replaceAddress: "Adresse ersetzen",
		replaceConfirmTitle: "Diese Adresse ersetzen?",
		deleteConfirmTitle: "Diese Adresse löschen?",
		confirmBody:
			"Du kannst {address} und den zugehörigen Posteingang danach nicht mehr öffnen. Das lässt sich nicht rückgängig machen.",
		generating: "Wird generiert...",
		noAddressTitle: "Noch keine Wegwerfadresse",
		noAddressDescription:
			"Generiere eine temporäre Adresse für Registrierungen und einmalige Verifizierungen.",
		generateAddress: "Adresse generieren",
		actionFailed: "Das hat nicht geklappt. Bitte versuch es noch einmal.",
		inboxTitle: "Neueste E-Mails",
		emptyInboxTitle: "Dein Posteingang wartet",
		emptyInboxDescription:
			"Noch keine E-Mails. Neue Nachrichten erscheinen hier sofort.",
		refreshInbox: "Aktualisieren",
		refreshingInbox: "Wird aktualisiert...",
		liveOn: "Live-Empfang aktiv",
		liveOff: "Getrennt, Verbindung wird wiederhergestellt",
		safetyHint:
			"Nutze diese Adresse nicht für Banking, Arbeit oder Codes wichtiger Konten. Sie bleibt standardmäßig langfristig erhalten, aber ohne Garantie.",
		badge: "Adresse bleibt gleich · Ohne Registrierung",
		modal: {
			title: "Nachrichtenvorschau",
			from: "Von",
			time: "Zeit",
			loading: "Wird geladen...",
			empty: "Kein Inhalt",
		},
		narrative: {
			title: "Warum die temporäre E-Mail von smail.pw nutzen",
			description:
				"smail.pw ist ein kostenloser Generator für temporäre E-Mails (Temp Mail) für risikoarme Registrierungen, OTP-Verifizierung und einmalige Downloads. Erstelle in Sekunden ein Wegwerf-Postfach und behalte dieselbe Adresse, bis du sie selbst wechselst.",
			points: [
				"Gut geeignet für Registrierungen mit temporärer E-Mail und den Empfang von Bestätigungscodes",
				"Keine Registrierung, kein Passwort: Deine Temp Mail ist sofort startklar",
				"Neue E-Mails erscheinen von selbst, ohne dass du ständig aktualisieren musst",
				"Für Banking, Arbeit und Konten, an denen deine Identität hängt, nutze ein dauerhaftes Postfach",
			],
		},
		jsonLdDescription:
			"smail.pw bietet kostenlose temporäre E-Mail-Postfächer (Temp Mail) für Registrierung und OTP-Verifizierung – mit einer Adresse, die gleich bleibt, bis du sie wechselst.",
	},
	layout: {
		siteSubtitle: "temporäres Postfach",
		about: "Über uns",
		faq: "FAQ",
		blog: "Blog",
		contact: "Kontakt",
		privacy: "Datenschutz",
		terms: "Nutzungsbedingungen",
		language: "Sprache",
		copyright: "Sauberes Postfach, geschützte Identität.",
	},
	common: {
		close: "Schließen",
		cancel: "Abbrechen",
	},
	guides: {
		title: "Beliebte Ratgeber zur temporären E-Mail",
		items: [
			{
				label: "Temporäre E-Mail ohne Registrierung",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Wegwerf-E-Mail für die Verifizierung",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Temporäre E-Mail für die Registrierung",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Temporäre E-Mail online",
				path: "/online-temporary-email",
			},
		],
	},
	contact: {
		metaTitle: "Kontakt | smail.pw",
		metaDescription:
			"Kontakt zu smail.pw: Hinterlasse uns eine Nachricht mit einer Frage, Feedback oder einer Kooperationsanfrage.",
		title: "Support kontaktieren",
		description:
			"Hinterlasse uns unten eine Nachricht. Fragen, Feedback und Kooperationsanfragen sind alle willkommen.",
		formTitle: "Nachricht hinterlassen",
		messageLabel: "Nachricht",
		messagePlaceholder: "Was ist passiert, oder was möchtest du uns mitteilen?",
		contactLabel: "So erreichen wir dich (optional)",
		contactHint: "Eine E-Mail-Adresse, nur wenn du eine Antwort möchtest",
		send: "Nachricht senden",
		sending: "Wird gesendet...",
		sent: "Danke, deine Nachricht ist angekommen.",
		tooMany:
			"Aus deinem Netzwerk wurden zu viele Nachrichten gesendet. Bitte versuch es später noch einmal.",
		failed:
			"Die Nachricht konnte nicht gesendet werden. Bitte versuch es gleich noch einmal.",
		faqHint:
			"Bevor du uns kontaktierst, schau bitte zuerst in unsere FAQ. Vielleicht findest du dort bereits die Antwort.",
		faqCta: "FAQ öffnen",
		homeCta: "Zur Startseite",
	},
	blog: {
		title: "Temporäre E-Mail: Ratgeber, Tipps und Hilfe | smail.pw",
		description:
			"Ratgeber, Best Practices und Tipps zur Fehlerbehebung rund um temporäre E-Mails, Verifizierung und Wegwerf-Postfächer.",
		header: "smail.pw Blog",
		subheader: "Ratgeber und Fehlerbehebung für Nutzer temporärer E-Mails",
		readArticle: "Artikel lesen",
		prevPage: "Zurück",
		nextPage: "Weiter",
		backToBlog: "Zurück zum Blog",
		relatedPosts: "Ähnliche Artikel",
		postTitleSuffix: " | smail.pw Blog",
		pageSummary: "Seite {page} von {total} · {size} Artikel pro Seite",
		readingTime: "{minutes} Min. Lesezeit",
		posts: [
			{
				slug: "is-temporary-email-safe",
				title:
					"Ist eine temporäre E-Mail sicher? Was sie schützt und was nicht",
				description:
					"Was eine temporäre Adresse schützt, was nicht, und wie smail.pw mit Postfachzugriff, Speicherung und der Anzeige von E-Mails umgeht.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "why-websites-block-temporary-email",
				title: "Warum manche Websites temporäre E-Mail-Adressen ablehnen",
				description:
					"Wie Registrierungsformulare Wegwerfadressen erkennen, warum Websites sie sperren und was wirklich hilft, wenn deine temporäre Adresse abgelehnt wird.",
				publishedAt: "2026-10-08",
				readingMinutes: 5,
			},
			{
				slug: "how-email-ends-up-on-spam-lists",
				title:
					"Wie deine E-Mail-Adresse auf Spam-Listen landet (und wie du es verhinderst)",
				description:
					"Woher Spammer und Werbetreibende deine Adresse haben, welche Gewohnheiten sie preisgeben und eine einfache Regel, welche Adresse du welcher Website gibst.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "temporary-email-best-practices",
				title: "Temporäre E-Mail: Best Practices für sicherere Registrierungen",
				description:
					"Praktische Best Practices für temporäre E-Mails: weniger Spam, keine ausgesperrten Konten und ein geschütztes Hauptpostfach.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "temporary-email-vs-email-alias",
				title: "Temporäre E-Mail vs. E-Mail-Alias: Was solltest du nutzen?",
				description:
					"Temporäre Postfächer und E-Mail-Aliasse im Vergleich: Datenschutz, Wiederherstellung und langfristige Kontosicherheit.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "otp-email-not-arriving-fixes",
				title: "OTP-Mail kommt nicht an? 8 schnelle Lösungen, die meist helfen",
				description:
					"Verzögerte Bestätigungsmails beheben: eine praktische Checkliste für erneutes Senden, Sperren beim Absender und das Aktualisieren des Posteingangs.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
		],
	},
	md: {
		meta: {
			about: {
				title: "Über smail.pw | Temporäre E-Mail & Temp Mail",
				description:
					"Erfahre, wie die temporäre E-Mail von smail.pw funktioniert, wann Temp Mail sinnvoll ist und welche Grenzen für Wegwerf-Postfächer gelten.",
			},
			faq: {
				title: "FAQ zur temporären E-Mail (OTP, Temp Mail) | smail.pw",
				description:
					"FAQ zur temporären E-Mail von smail.pw: Einrichtung, Aufbewahrung von Adressen und Nachrichten, OTP-Zustellprobleme und Sicherheitsgrenzen.",
			},
			privacy: {
				title: "Datenschutzerklärung | smail.pw",
				description:
					"Erfahre, welche Daten smail.pw verarbeiten kann, wie lange temporäre Daten aufbewahrt werden und wie wir mit Datenschutz umgehen.",
			},
			terms: {
				title: "Nutzungsbedingungen | smail.pw",
				description:
					"Lies die Nutzungsbedingungen von smail.pw: zulässige Nutzung, Haftungsausschlüsse und Grenzen des Dienstes.",
			},
			"temporary-email-no-registration": {
				title: "Temporäre E-Mail ohne Registrierung | smail.pw",
				description:
					"Temp Mail ohne Registrierung, ohne Passwort und ohne persönliche Daten. Erstelle sofort ein temporäres Postfach und empfange E-Mails in Sekunden.",
			},
			"disposable-email-for-verification": {
				title: "Wegwerf-E-Mail für Verifizierung und OTP | smail.pw",
				description:
					"Empfange OTP-Codes und Bestätigungsmails in einem Wegwerf-Postfach – dein persönliches Postfach bleibt privat und frei von Spam.",
			},
			"temporary-email-for-registration": {
				title: "Temporäre E-Mail für die Registrierung | smail.pw",
				description:
					"Nutze eine temporäre E-Mail für Registrierungen, Testzugänge und einmalige Anmeldungen, ohne dein dauerhaftes Postfach preiszugeben.",
			},
			"online-temporary-email": {
				title: "Temporäre E-Mail online – sofort nutzbar | smail.pw",
				description:
					"Hol dir sofort ein temporäres E-Mail-Postfach online – für Bestätigungslinks, OTP-Nachrichten und einmaligen E-Mail-Empfang.",
			},
			"can-temporary-email-send": {
				title: "Kann eine temporäre E-Mail Nachrichten senden? | smail.pw",
				description:
					"Kann eine temporäre E-Mail Nachrichten senden? Warum viele Temp-Mail-Postfächer nur empfangen und wann du besser ein dauerhaftes Postfach nutzt.",
			},
			"smail-vs-smailpro": {
				title: "smail.pw vs smailpro / smail pro | Markenklarstellung",
				description:
					"Offizielle Klarstellung: smail.pw ist ein unabhängiger Dienst für temporäre E-Mails ohne Verbindung zu smailpro oder ähnlich benannten Produkten.",
			},
		},
		breadcrumbHome: "Startseite",
		cta: {
			title: "Starte jetzt dein temporäres Postfach",
			description:
				"Erstelle mit einem Klick eine Wegwerfadresse und öffne dann unten die wichtigsten Ratgeber zu Registrierung und OTP.",
			action: "Temporäre E-Mail generieren",
		},
	},
};

export default function Provider(props: ParentProps) {
	return (
		<DictionaryContext value={dictionary}>{props.children}</DictionaryContext>
	);
}
