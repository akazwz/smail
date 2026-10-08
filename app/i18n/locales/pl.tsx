import type { ParentProps } from "solid-js";

import { type Dictionary, DictionaryContext } from "../dictionary.ts";

export const dictionary: Dictionary = {
	home: {
		title: "smail.pw – tymczasowy email za darmo do OTP i rejestracji",
		description:
			"Wygeneruj darmowy tymczasowy email (temp mail) na smail.pw w kilka sekund. Jednorazowa skrzynka do kodów OTP, szybkich rejestracji i ochrony przed spamem.",
		keywords:
			"smail, smail temp mail, tymczasowy email, poczta tymczasowa, tymczasowy adres e-mail, temp mail, jednorazowy email, generator tymczasowych adresów e-mail, email bez rejestracji, email do kodów otp, smail.pw",
		heroTitle: "Tymczasowa skrzynka e-mail jednym kliknięciem.",
		heroDescription:
			"W kilka sekund wygeneruj adres temp mail do rejestracji i kodów OTP. Adres nigdy się nie zmienia, chyba że Ty go zmienisz.",
		copy: "Kopiuj",
		copied: "Skopiowano",
		deleteAddress: "Usuń adres",
		replaceAddress: "Zastąp adres",
		replaceConfirmTitle: "Zastąpić ten adres?",
		deleteConfirmTitle: "Usunąć ten adres?",
		confirmBody:
			"Nie otworzysz już adresu {address} ani jego skrzynki. Tej operacji nie można cofnąć.",
		generating: "Generowanie...",
		noAddressTitle: "Nie masz jeszcze jednorazowego adresu",
		noAddressDescription:
			"Wygeneruj tymczasowy adres do rejestracji i jednorazowych weryfikacji.",
		generateAddress: "Wygeneruj adres",
		actionFailed: "Nie udało się. Spróbuj ponownie.",
		inboxTitle: "Najnowsze wiadomości",
		emptyInboxTitle: "Twoja skrzynka czeka",
		emptyInboxDescription:
			"Nie ma jeszcze wiadomości. Nowe pojawią się tutaj natychmiast.",
		refreshInbox: "Odśwież",
		refreshingInbox: "Odświeżanie...",
		liveOn: "Odbiór na żywo",
		liveOff: "Rozłączono, ponowne łączenie",
		safetyHint:
			"Nie używaj tego adresu do bankowości, pracy ani kodów do ważnych kont. Domyślnie jest przechowywany długoterminowo, ale bez gwarancji.",
		badge: "Adres się nie zmienia · Bez rejestracji",
		modal: {
			title: "Podgląd wiadomości",
			from: "Od",
			time: "Czas",
			loading: "Ładowanie...",
			empty: "Brak treści",
		},
		narrative: {
			title: "Dlaczego warto używać tymczasowego emaila smail.pw",
			description:
				"smail.pw to darmowy generator tymczasowych adresów e-mail (temp mail) do rejestracji niskiego ryzyka, weryfikacji kodem OTP i jednorazowych pobrań. Utwórz jednorazową skrzynkę w kilka sekund i zachowaj ten sam adres, dopóki go nie zmienisz.",
			points: [
				"Sprawdza się przy rejestracji na tymczasowy email i odbieraniu kodów weryfikacyjnych",
				"Bez zakładania konta i ustawiania hasła – temp mail jest gotowy od razu",
				"Nowe wiadomości pojawiają się same, bez ciągłego odświeżania",
				"Do bankowości, pracy i kont powiązanych z Twoją tożsamością używaj stałej skrzynki",
			],
		},
		jsonLdDescription:
			"smail.pw udostępnia darmowe tymczasowe skrzynki e-mail (temp mail) do rejestracji i weryfikacji OTP, z adresem, który pozostaje ten sam, dopóki go nie zmienisz.",
	},
	layout: {
		siteSubtitle: "tymczasowa skrzynka",
		about: "O nas",
		faq: "FAQ",
		blog: "Blog",
		contact: "Kontakt",
		privacy: "Polityka prywatności",
		terms: "Regulamin",
		language: "Język",
		copyright: "Czysta skrzynka, czysta tożsamość.",
	},
	common: {
		close: "Zamknij",
		cancel: "Anuluj",
	},
	guides: {
		title: "Popularne poradniki o tymczasowym emailu",
		items: [
			{
				label: "Tymczasowy email bez rejestracji",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Jednorazowy email do weryfikacji",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Tymczasowy email do rejestracji",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Tymczasowy email online",
				path: "/online-temporary-email",
			},
		],
	},
	contact: {
		metaTitle: "Kontakt | smail.pw",
		metaDescription:
			"Kontakt ze smail.pw: zostaw nam wiadomość z pytaniem, uwagą lub propozycją współpracy.",
		title: "Kontakt z pomocą techniczną",
		description:
			"Zostaw nam wiadomość poniżej. Czekamy na pytania, uwagi i propozycje współpracy.",
		formTitle: "Zostaw wiadomość",
		messageLabel: "Wiadomość",
		messagePlaceholder: "Co się stało albo co chcesz nam przekazać?",
		contactLabel: "Jak się z Tobą skontaktować (opcjonalnie)",
		contactHint: "Adres e-mail, tylko jeśli chcesz dostać odpowiedź",
		send: "Wyślij wiadomość",
		sending: "Wysyłanie...",
		sent: "Dziękujemy, Twoja wiadomość do nas dotarła.",
		tooMany:
			"Z Twojej sieci wysłano zbyt wiele wiadomości. Spróbuj ponownie później.",
		failed: "Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę.",
		faqHint:
			"Zanim do nas napiszesz, zajrzyj na stronę FAQ. Być może odpowiedź już tam jest.",
		faqCta: "Otwórz FAQ",
		homeCta: "Wróć na stronę główną",
	},
	blog: {
		title: "Tymczasowy email: poradniki, wskazówki i rozwiązania | smail.pw",
		description:
			"Poradniki, dobre praktyki i wskazówki, jak rozwiązywać problemy z tymczasowym emailem, weryfikacją i jednorazowymi skrzynkami.",
		header: "Blog smail.pw",
		subheader:
			"Poradniki i rozwiązywanie problemów dla użytkowników tymczasowego emaila",
		readArticle: "Czytaj artykuł",
		prevPage: "Poprzednia",
		nextPage: "Następna",
		backToBlog: "Wróć do bloga",
		relatedPosts: "Powiązane artykuły",
		postTitleSuffix: " | Blog smail.pw",
		pageSummary: "Strona {page} z {total} · artykułów na stronę: {size}",
		readingTime: "{minutes} min czytania",
		posts: [
			{
				slug: "is-temporary-email-safe",
				title: "Czy tymczasowy email jest bezpieczny? Co chroni, a czego nie",
				description:
					"Co chroni tymczasowy adres, a czego nie, oraz jak smail.pw podchodzi do dostępu do skrzynki, przechowywania i wyświetlania wiadomości.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "why-websites-block-temporary-email",
				title: "Dlaczego niektóre strony odrzucają tymczasowe adresy e-mail",
				description:
					"Jak formularze rejestracji wykrywają jednorazowe adresy, dlaczego serwisy je blokują i co naprawdę działa, gdy Twój tymczasowy adres zostaje odrzucony.",
				publishedAt: "2026-10-08",
				readingMinutes: 5,
			},
			{
				slug: "how-email-ends-up-on-spam-lists",
				title:
					"Jak Twój adres e-mail trafia na listy spamowe (i jak temu zapobiec)",
				description:
					"Skąd spamerzy i marketerzy biorą Twój adres, które nawyki go ujawniają i prosta reguła, który adres podać której stronie.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "temporary-email-best-practices",
				title: "Tymczasowy email: dobre praktyki bezpieczniejszej rejestracji",
				description:
					"Poznaj praktyczne zasady korzystania z tymczasowego emaila: mniej spamu, mniej zablokowanych kont i lepiej chroniona główna skrzynka.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "temporary-email-vs-email-alias",
				title: "Tymczasowy email czy alias e-mail: co wybrać?",
				description:
					"Porównaj tymczasowe skrzynki i aliasy e-mail pod kątem prywatności, odzyskiwania dostępu i długoterminowego bezpieczeństwa konta.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "otp-email-not-arriving-fixes",
				title:
					"E-mail z kodem OTP nie dochodzi? 8 szybkich sposobów, które zwykle działają",
				description:
					"Opóźnione wiadomości weryfikacyjne? Praktyczna lista kroków: ponowne wysłanie kodu, blokady po stronie nadawcy i odświeżanie skrzynki.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
		],
	},
	md: {
		meta: {
			about: {
				title: "O smail.pw | Tymczasowy email i generator temp mail",
				description:
					"Dowiedz się, jak działa tymczasowy email smail.pw, kiedy warto użyć temp mail i jakie ograniczenia mają jednorazowe skrzynki.",
			},
			faq: {
				title:
					"Tymczasowy email – FAQ (OTP, temp mail, dostarczanie) | smail.pw",
				description:
					"FAQ o tymczasowym emailu smail.pw: pierwsze kroki, jak długo przechowywane są adresy i wiadomości, problemy z kodami OTP i granice bezpieczeństwa.",
			},
			privacy: {
				title: "Polityka prywatności | smail.pw",
				description:
					"Sprawdź, jakie dane może przetwarzać smail.pw, jak długo przechowywane są dane tymczasowe i jak dbamy o prywatność.",
			},
			terms: {
				title: "Regulamin | smail.pw",
				description:
					"Zapoznaj się z zasadami korzystania ze smail.pw: dozwolone użycie, wyłączenia gwarancji i ograniczenia usługi.",
			},
			"temporary-email-no-registration": {
				title: "Tymczasowy email bez rejestracji (temp mail) | smail.pw",
				description:
					"Korzystaj z temp mail bez rejestracji, hasła i danych osobowych. Wygeneruj tymczasową skrzynkę od ręki i odbieraj wiadomości w kilka sekund.",
			},
			"disposable-email-for-verification": {
				title: "Jednorazowy email do weryfikacji i kodów OTP | smail.pw",
				description:
					"Odbieraj kody OTP i wiadomości weryfikacyjne w jednorazowej skrzynce, a prywatną pocztę zachowaj dla siebie i bez spamu.",
			},
			"temporary-email-for-registration": {
				title: "Tymczasowy email do rejestracji (temp mail) | smail.pw",
				description:
					"Używaj tymczasowego emaila przy rejestracji, kontach próbnych i jednorazowych zapisach, nie ujawniając swojej stałej skrzynki.",
			},
			"online-temporary-email": {
				title: "Tymczasowy email online (temp mail od ręki) | smail.pw",
				description:
					"Załóż od ręki tymczasową skrzynkę e-mail online na linki weryfikacyjne, kody OTP i jednorazowy odbiór poczty.",
			},
			"can-temporary-email-send": {
				title: "Tymczasowy email: czy można wysyłać? (Tylko odbiór) | smail.pw",
				description:
					"Sprawdź, czy z tymczasowego emaila można wysyłać wiadomości, dlaczego wiele skrzynek temp mail działa tylko na odbiór i kiedy lepiej użyć stałej poczty.",
			},
			"smail-vs-smailpro": {
				title: "smail.pw a smailpro / smail pro | Wyjaśnienie dotyczące marki",
				description:
					"Oficjalne wyjaśnienie: smail.pw to niezależna usługa tymczasowego emaila, niepowiązana ze smailpro ani z produktami o podobnych nazwach.",
			},
		},
		breadcrumbHome: "Strona główna",
		cta: {
			title: "Uruchom swoją tymczasową skrzynkę już teraz",
			description:
				"Utwórz jednorazowy adres jednym kliknięciem, a potem zajrzyj do najpopularniejszych poradników o rejestracji i kodach OTP poniżej.",
			action: "Wygeneruj tymczasowy email",
		},
	},
};

export default function Provider(props: ParentProps) {
	return (
		<DictionaryContext value={dictionary}>{props.children}</DictionaryContext>
	);
}
