import type { ParentProps } from "solid-js";

import { type Dictionary, DictionaryContext } from "../dictionary.ts";

export const dictionary: Dictionary = {
	home: {
		title: "Email temporaire gratuit sans inscription | smail.pw",
		description:
			"Créez un email temporaire gratuit (temp mail) en un instant sur smail.pw. Une boîte jetable pour vos codes OTP, vos inscriptions rapides et moins de spam.",
		keywords:
			"smail, smail temp mail, email temporaire, email jetable, temp mail, générateur d'email temporaire, email sans inscription, code otp, boite mail temporaire, smail.pw",
		heroTitle: "Une boîte email temporaire en un clic.",
		heroDescription:
			"Créez en quelques secondes une adresse email temporaire pour vos inscriptions et vos codes OTP. L'adresse ne change jamais, sauf si vous décidez d'en changer.",
		copy: "Copier",
		copied: "Copié",
		deleteAddress: "Supprimer l'adresse",
		replaceAddress: "Remplacer l'adresse",
		replaceConfirmTitle: "Remplacer cette adresse ?",
		deleteConfirmTitle: "Supprimer cette adresse ?",
		confirmBody:
			"Vous ne pourrez plus ouvrir {address} ni sa boîte de réception. Cette action est irréversible.",
		generating: "Génération...",
		noAddressTitle: "Pas encore d'adresse jetable",
		noAddressDescription:
			"Générez une adresse temporaire pour vos inscriptions et vos vérifications ponctuelles.",
		generateAddress: "Générer une adresse",
		actionFailed: "Cela n'a pas fonctionné. Veuillez réessayer.",
		inboxTitle: "Derniers emails",
		emptyInboxTitle: "Votre boîte de réception vous attend",
		emptyInboxDescription:
			"Aucun email pour l'instant. Les messages apparaîtront ici instantanément.",
		refreshInbox: "Actualiser",
		refreshingInbox: "Actualisation...",
		liveOn: "Réception en direct",
		liveOff: "Déconnecté, reconnexion en cours",
		safetyHint:
			"N'utilisez pas cette adresse pour la banque, le travail ou les codes de comptes importants. Elle est conservée à long terme par défaut, sans garantie.",
		badge: "L'adresse reste la même · Sans inscription",
		modal: {
			title: "Aperçu du message",
			from: "De",
			time: "Heure",
			loading: "Chargement...",
			empty: "Aucun contenu",
		},
		narrative: {
			title: "Pourquoi utiliser l'email temporaire smail.pw",
			description:
				"smail.pw est un générateur d'email temporaire gratuit (temp mail) pour les inscriptions à faible risque, la vérification par OTP et les téléchargements ponctuels. Créez une boîte jetable en quelques secondes et gardez la même adresse tant que vous ne la changez pas.",
			points: [
				"Idéal pour s'inscrire avec un email temporaire et recevoir des codes de vérification",
				"Ni inscription ni mot de passe : votre temp mail est prêt tout de suite",
				"Les nouveaux emails s'affichent d'eux-mêmes, sans avoir à actualiser sans cesse",
				"Pour la banque, le travail et les comptes liés à votre identité, utilisez une boîte mail permanente",
			],
		},
		jsonLdDescription:
			"smail.pw fournit des boîtes email temporaires gratuites (temp mail) pour l'inscription et la vérification par OTP, avec une adresse qui reste la même tant que vous ne la changez pas.",
	},
	layout: {
		siteSubtitle: "boîte temporaire",
		about: "À propos",
		faq: "FAQ",
		blog: "Blog",
		contact: "Contact",
		privacy: "Confidentialité",
		terms: "Conditions d'utilisation",
		language: "Langue",
		copyright: "Boîte de réception propre, identité préservée.",
	},
	common: {
		close: "Fermer",
		cancel: "Annuler",
	},
	guides: {
		title: "Guides populaires sur l'email temporaire",
		items: [
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
			{
				label: "Email temporaire en ligne",
				path: "/online-temporary-email",
			},
		],
	},
	contact: {
		metaTitle: "Contact | smail.pw",
		metaDescription:
			"Contactez smail.pw : laissez-nous un message pour une question, un retour ou une proposition de collaboration.",
		title: "Contacter le support",
		description:
			"Laissez-nous un message ci-dessous. Questions, retours et propositions de collaboration sont les bienvenus.",
		formTitle: "Laisser un message",
		messageLabel: "Message",
		messagePlaceholder: "Que s'est-il passé, ou que souhaitez-vous nous dire ?",
		contactLabel: "Comment vous joindre (facultatif)",
		contactHint: "Une adresse email, seulement si vous voulez une réponse",
		send: "Envoyer le message",
		sending: "Envoi...",
		sent: "Merci, votre message a bien été reçu.",
		tooMany:
			"Trop de messages ont été envoyés depuis votre réseau. Veuillez réessayer plus tard.",
		failed:
			"Le message n'a pas pu être envoyé. Veuillez réessayer dans un instant.",
		faqHint:
			"Avant de nous contacter, consultez d'abord notre FAQ : vous y trouverez peut-être déjà la réponse.",
		faqCta: "Ouvrir la FAQ",
		homeCta: "Retour à l'accueil",
	},
	blog: {
		title: "Email temporaire : guides, conseils et dépannage | smail.pw",
		description:
			"Guides, bonnes pratiques et conseils de dépannage sur l'email temporaire, pour la vérification et l'usage des boîtes jetables.",
		header: "Blog smail.pw",
		subheader: "Guides et dépannage pour les utilisateurs d'email temporaire",
		readArticle: "Lire l'article",
		prevPage: "Précédent",
		nextPage: "Suivant",
		backToBlog: "Retour au blog",
		relatedPosts: "Articles liés",
		postTitleSuffix: " | Blog smail.pw",
		pageSummary: "Page {page} sur {total} · {size} articles par page",
		readingTime: "{minutes} min de lecture",
		posts: [
			{
				slug: "is-temporary-email-safe",
				title:
					"L'email temporaire est-il sûr ? Ce qu'il protège et ce qu'il ne protège pas",
				description:
					"Ce qu'une adresse temporaire protège, ce qu'elle ne protège pas, et comment smail.pw gère l'accès à la boîte, le stockage et l'affichage des emails.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "why-websites-block-temporary-email",
				title:
					"Pourquoi certains sites refusent les adresses email temporaires",
				description:
					"Comment les formulaires d'inscription détectent les adresses jetables, pourquoi les sites les bloquent et ce qui marche vraiment quand votre adresse temporaire est refusée.",
				publishedAt: "2026-10-08",
				readingMinutes: 5,
			},
			{
				slug: "how-email-ends-up-on-spam-lists",
				title:
					"Comment votre adresse email se retrouve sur des listes de spam (et comment l'éviter)",
				description:
					"D'où les spammeurs et les services marketing tiennent votre adresse, quelles habitudes la font fuiter, et une règle simple pour savoir quelle adresse donner à chaque site.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "temporary-email-best-practices",
				title:
					"Bonnes pratiques d'email temporaire pour des inscriptions plus sûres",
				description:
					"Des bonnes pratiques concrètes pour réduire le spam, éviter de perdre l'accès à vos comptes et protéger votre boîte principale.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "temporary-email-vs-email-alias",
				title: "Email temporaire vs alias email : lequel choisir ?",
				description:
					"Comparez boîtes temporaires et alias email : confidentialité, récupération de compte et sécurité à long terme.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "otp-email-not-arriving-fixes",
				title: "Email OTP non reçu ? 8 solutions rapides qui marchent",
				description:
					"Dépannez les emails de vérification en retard avec une checklist pratique : renvoi du code, blocage par l'expéditeur et actualisation de la boîte.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
		],
	},
	md: {
		meta: {
			about: {
				title: "À propos de smail.pw | Email temporaire et temp mail",
				description:
					"Découvrez comment fonctionne l'email temporaire smail.pw, quand utiliser un temp mail et les limites importantes d'une boîte jetable.",
			},
			faq: {
				title: "FAQ email temporaire (OTP, temp mail, réception) | smail.pw",
				description:
					"FAQ de l'email temporaire smail.pw : mise en route, durée de conservation des adresses et des messages, codes OTP non reçus et limites de sécurité.",
			},
			privacy: {
				title: "Politique de confidentialité | smail.pw",
				description:
					"Découvrez quelles données smail.pw peut traiter, combien de temps les données temporaires sont conservées et comment la confidentialité est gérée.",
			},
			terms: {
				title: "Conditions d'utilisation | smail.pw",
				description:
					"Consultez les conditions d'utilisation de smail.pw : usages autorisés, exclusions de garantie et limites du service.",
			},
			"temporary-email-no-registration": {
				title: "Email temporaire sans inscription | smail.pw",
				description:
					"Un temp mail sans inscription, sans mot de passe ni données personnelles. Générez une boîte temporaire et recevez vos emails en quelques secondes.",
			},
			"disposable-email-for-verification": {
				title: "Email jetable pour vérification et OTP | smail.pw",
				description:
					"Recevez vos codes OTP et emails de vérification dans une boîte jetable, tout en gardant votre boîte personnelle privée et sans spam.",
			},
			"temporary-email-for-registration": {
				title: "Email temporaire pour inscription | smail.pw",
				description:
					"Utilisez un email temporaire pour vos inscriptions, vos essais et vos créations de compte ponctuelles, sans exposer votre boîte principale.",
			},
			"online-temporary-email": {
				title: "Email temporaire en ligne instantané | smail.pw",
				description:
					"Obtenez instantanément une boîte email temporaire en ligne pour vos liens de vérification, vos codes OTP et vos réceptions ponctuelles.",
			},
			"can-temporary-email-send": {
				title: "Un email temporaire peut-il envoyer des messages ? | smail.pw",
				description:
					"Un email temporaire peut-il envoyer des messages ? Pourquoi beaucoup de boîtes temporaires sont en réception seule et quand préférer une boîte permanente.",
			},
			"smail-vs-smailpro": {
				title: "smail.pw vs smailpro / smail pro | Clarification de marque",
				description:
					"Clarification officielle : smail.pw est un service d'email temporaire indépendant, sans lien avec smailpro ni avec les produits au nom similaire.",
			},
		},
		breadcrumbHome: "Accueil",
		cta: {
			title: "Créez votre boîte temporaire dès maintenant",
			description:
				"Créez une adresse jetable en un clic, puis consultez ci-dessous les guides les plus utiles sur l'inscription et les codes OTP.",
			action: "Générer un email temporaire",
		},
	},
};

export default function Provider(props: ParentProps) {
	return (
		<DictionaryContext value={dictionary}>{props.children}</DictionaryContext>
	);
}
