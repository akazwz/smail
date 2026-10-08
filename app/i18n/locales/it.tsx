import type { ParentProps } from "solid-js";

import { type Dictionary, DictionaryContext } from "../dictionary.ts";

export const dictionary: Dictionary = {
	home: {
		title: "smail.pw - Email temporanea gratuita per OTP e registrazioni",
		description:
			"Crea subito un'email temporanea gratuita (temp mail) su smail.pw. Una casella usa e getta per codici OTP, registrazioni veloci e meno spam.",
		keywords:
			"smail, smail temp mail, email temporanea, mail temporanea, temp mail, email usa e getta, generatore email temporanea, email senza registrazione, email otp, smail.pw",
		heroTitle: "Una casella email temporanea in un tocco.",
		heroDescription:
			"Genera in pochi secondi un indirizzo temp mail per registrazioni e codici OTP. L'indirizzo non cambia mai, a meno che non sia tu a cambiarlo.",
		copy: "Copia",
		copied: "Copiato",
		deleteAddress: "Elimina indirizzo",
		replaceAddress: "Sostituisci indirizzo",
		replaceConfirmTitle: "Sostituire questo indirizzo?",
		deleteConfirmTitle: "Eliminare questo indirizzo?",
		confirmBody:
			"Non potrai più aprire {address} né la sua casella. L'operazione non può essere annullata.",
		generating: "Generazione...",
		noAddressTitle: "Ancora nessuna email usa e getta",
		noAddressDescription:
			"Genera un indirizzo temporaneo da usare per registrazioni e verifiche occasionali.",
		generateAddress: "Genera indirizzo",
		actionFailed: "Non è andata a buon fine. Riprova.",
		inboxTitle: "Ultime email",
		emptyInboxTitle: "La tua casella è in attesa",
		emptyInboxDescription:
			"Ancora nessuna email. I messaggi compariranno qui all'istante.",
		refreshInbox: "Aggiorna",
		refreshingInbox: "Aggiornamento...",
		liveOn: "Ricezione in tempo reale",
		liveOff: "Disconnesso, riconnessione in corso",
		safetyHint:
			"Non usare questo indirizzo per banca, lavoro o codici di account importanti. Viene conservato a lungo per impostazione predefinita, ma senza garanzie.",
		badge: "L'indirizzo non cambia · Senza registrazione",
		modal: {
			title: "Anteprima del messaggio",
			from: "Da",
			time: "Ora",
			loading: "Caricamento...",
			empty: "Nessun contenuto",
		},
		narrative: {
			title: "Perché usare l'email temporanea di smail.pw",
			description:
				"smail.pw è un generatore gratuito di email temporanee (temp mail) per registrazioni a basso rischio, verifiche con codice OTP e download occasionali. Crea una casella usa e getta in pochi secondi e tieni lo stesso indirizzo finché non lo cambi.",
			points: [
				"Ideale per registrarsi con un'email temporanea e ricevere codici di verifica",
				"Nessuna iscrizione e nessuna password da impostare: la temp mail è subito pronta",
				"Le nuove email compaiono da sole, senza dover aggiornare di continuo",
				"Per banca, lavoro e account legati alla tua identità usa una casella permanente",
			],
		},
		jsonLdDescription:
			"smail.pw offre caselle email temporanee (temp mail) gratuite per registrazioni e verifiche OTP, con un indirizzo che resta lo stesso finché non lo cambi.",
	},
	layout: {
		siteSubtitle: "casella temporanea",
		about: "Chi siamo",
		faq: "FAQ",
		blog: "Blog",
		contact: "Contatti",
		privacy: "Informativa sulla privacy",
		terms: "Termini di utilizzo",
		language: "Lingua",
		copyright: "Casella pulita, identità pulita.",
	},
	common: {
		close: "Chiudi",
		cancel: "Annulla",
	},
	guides: {
		title: "Guide più lette sull'email temporanea",
		items: [
			{
				label: "Email temporanea senza registrazione",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Email usa e getta per la verifica",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Email temporanea per registrazioni",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Email temporanea online",
				path: "/online-temporary-email",
			},
		],
	},
	contact: {
		metaTitle: "Contatti | smail.pw",
		metaDescription:
			"Contatta smail.pw: lasciaci un messaggio per una domanda, un suggerimento o una proposta di collaborazione.",
		title: "Contatta l'assistenza",
		description:
			"Lasciaci un messaggio qui sotto. Domande, suggerimenti e proposte di collaborazione sono tutti benvenuti.",
		formTitle: "Lascia un messaggio",
		messageLabel: "Messaggio",
		messagePlaceholder: "Che cosa è successo, o che cosa vorresti dirci?",
		contactLabel: "Come contattarti (facoltativo)",
		contactHint: "Un indirizzo email, solo se vuoi una risposta",
		send: "Invia messaggio",
		sending: "Invio in corso...",
		sent: "Grazie, abbiamo ricevuto il tuo messaggio.",
		tooMany:
			"Dalla tua rete sono stati inviati troppi messaggi. Riprova più tardi.",
		failed:
			"Non è stato possibile inviare il messaggio. Riprova tra un momento.",
		faqHint:
			"Prima di contattarci, dai un'occhiata alla pagina delle FAQ: la risposta potrebbe essere già lì.",
		faqCta: "Apri le FAQ",
		homeCta: "Torna alla home",
	},
	blog: {
		title: "Email temporanea: guide, consigli e soluzioni | smail.pw",
		description:
			"Guide, buone pratiche e consigli per risolvere i problemi con email temporanee, verifiche e caselle usa e getta.",
		header: "Blog di smail.pw",
		subheader: "Guide e soluzioni ai problemi per chi usa l'email temporanea",
		readArticle: "Leggi l'articolo",
		prevPage: "Precedente",
		nextPage: "Successiva",
		backToBlog: "Torna al blog",
		relatedPosts: "Articoli correlati",
		postTitleSuffix: " | Blog di smail.pw",
		pageSummary: "Pagina {page} di {total} · {size} articoli per pagina",
		readingTime: "{minutes} min di lettura",
		posts: [
			{
				slug: "is-temporary-email-safe",
				title: "L'email temporanea è sicura? Cosa protegge e cosa no",
				description:
					"Che cosa protegge un indirizzo temporaneo, che cosa no e come smail.pw gestisce l'accesso alla casella, la conservazione e la visualizzazione delle email.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "why-websites-block-temporary-email",
				title: "Perché alcuni siti rifiutano gli indirizzi email temporanei",
				description:
					"Come i moduli di registrazione riconoscono gli indirizzi usa e getta, perché i siti li bloccano e che cosa funziona davvero quando il tuo indirizzo temporaneo viene rifiutato.",
				publishedAt: "2026-10-08",
				readingMinutes: 5,
			},
			{
				slug: "how-email-ends-up-on-spam-lists",
				title:
					"Come il tuo indirizzo email finisce nelle liste di spam (e come evitarlo)",
				description:
					"Da dove spammer e marketing prendono il tuo indirizzo, quali abitudini lo espongono e una regola semplice per decidere quale indirizzo dare a ogni sito.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "temporary-email-best-practices",
				title: "Email temporanea: buone pratiche per registrazioni più sicure",
				description:
					"Scopri le buone pratiche per usare l'email temporanea: meno spam, nessun account bloccato e casella principale protetta.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "temporary-email-vs-email-alias",
				title: "Email temporanea o alias email: quale scegliere?",
				description:
					"Confronta caselle temporanee e alias email per privacy, recupero dell'accesso e sicurezza dell'account nel lungo periodo.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "otp-email-not-arriving-fixes",
				title:
					"L'email OTP non arriva? 8 rimedi rapidi che di solito funzionano",
				description:
					"Risolvi i ritardi delle email di verifica con una checklist pratica: nuovo invio, blocchi del mittente e aggiornamento della casella.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
		],
	},
	md: {
		meta: {
			about: {
				title: "Cos'è smail.pw | Email temporanea e generatore temp mail",
				description:
					"Scopri come funziona l'email temporanea di smail.pw, quando usare una temp mail e quali limiti hanno le caselle usa e getta.",
			},
			faq: {
				title: "FAQ email temporanea (OTP, temp mail, consegna) | smail.pw",
				description:
					"FAQ sull'email temporanea di smail.pw: come iniziare, per quanto restano indirizzi e messaggi, problemi con i codici OTP e limiti di sicurezza.",
			},
			privacy: {
				title: "Informativa sulla privacy | smail.pw",
				description:
					"Scopri quali dati può trattare smail.pw, per quanto vengono conservati i dati temporanei e come viene gestita la privacy.",
			},
			terms: {
				title: "Termini di utilizzo | smail.pw",
				description:
					"Leggi i termini di utilizzo di smail.pw: uso consentito, esclusioni di garanzia e limiti del servizio.",
			},
			"temporary-email-no-registration": {
				title: "Email temporanea senza registrazione (temp mail) | smail.pw",
				description:
					"Usa una temp mail senza registrazione, password o dati personali. Genera subito una casella temporanea e ricevi le email in pochi secondi.",
			},
			"disposable-email-for-verification": {
				title: "Email usa e getta per verifica e codici OTP | smail.pw",
				description:
					"Ricevi codici OTP ed email di verifica in una casella usa e getta, tenendo la tua casella personale riservata e libera dallo spam.",
			},
			"temporary-email-for-registration": {
				title: "Email temporanea per registrazioni e iscrizioni | smail.pw",
				description:
					"Usa un'email temporanea per registrazioni, account di prova e iscrizioni occasionali, senza esporre la casella che usi nel lungo periodo.",
			},
			"online-temporary-email": {
				title: "Email temporanea online (temp mail immediata) | smail.pw",
				description:
					"Ottieni subito una casella email temporanea online per link di verifica, codici OTP e ricezione occasionale di email.",
			},
			"can-temporary-email-send": {
				title: "Email temporanea: si può inviare? (Solo ricezione) | smail.pw",
				description:
					"Scopri se un'email temporanea può inviare messaggi, perché molte temp mail sono di sola ricezione e quando serve invece una casella permanente.",
			},
			"smail-vs-smailpro": {
				title: "smail.pw vs smailpro / smail pro | Chiarimento sul marchio",
				description:
					"Chiarimento ufficiale: smail.pw è un servizio indipendente di email temporanea e non è affiliato a smailpro né a prodotti dal nome simile.",
			},
		},
		breadcrumbHome: "Home",
		cta: {
			title: "Apri subito la tua casella temporanea",
			description:
				"Crea un indirizzo usa e getta in un tocco, poi consulta qui sotto le guide più utili su registrazioni e codici OTP.",
			action: "Genera email temporanea",
		},
	},
};

export default function Provider(props: ParentProps) {
	return (
		<DictionaryContext value={dictionary}>{props.children}</DictionaryContext>
	);
}
