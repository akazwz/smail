import type { ParentProps } from "solid-js";

import { type Dictionary, DictionaryContext } from "../dictionary.ts";

export const dictionary: Dictionary = {
	home: {
		title: "smail.pw Geçici Mail - Ücretsiz Geçici E-posta, OTP ve Kayıt",
		description:
			"smail.pw ile anında ücretsiz geçici mail (geçici e-posta) oluşturun. OTP doğrulaması, hızlı kayıtlar ve spam'den korunmak için tek kullanımlık gelen kutusu.",
		keywords:
			"smail, smail geçici mail, geçici mail, geçici e-posta, temp mail, tek kullanımlık mail, geçici mail oluşturucu, üyeliksiz e-posta, otp e-posta, smail.pw",
		heroTitle: "Tek dokunuşla geçici e-posta kutusu.",
		heroDescription:
			"Kayıtlar ve OTP kodları için saniyeler içinde geçici mail adresi oluşturun. Adres, siz değiştirmediğiniz sürece asla değişmez.",
		copy: "Kopyala",
		copied: "Kopyalandı",
		deleteAddress: "Adresi sil",
		replaceAddress: "Adresi değiştir",
		replaceConfirmTitle: "Bu adres değiştirilsin mi?",
		deleteConfirmTitle: "Bu adres silinsin mi?",
		confirmBody:
			"{address} adresini ve gelen kutusunu artık açamayacaksınız. Bu işlem geri alınamaz.",
		generating: "Oluşturuluyor...",
		noAddressTitle: "Henüz tek kullanımlık e-postanız yok",
		noAddressDescription:
			"Kayıtlar ve tek seferlik doğrulamalar için geçici bir adres oluşturun.",
		generateAddress: "Adres oluştur",
		actionFailed: "İşlem tamamlanamadı. Lütfen tekrar deneyin.",
		inboxTitle: "Son e-postalar",
		emptyInboxTitle: "Gelen kutunuz bekliyor",
		emptyInboxDescription:
			"Henüz e-posta yok. Gelen iletiler anında burada görünür.",
		refreshInbox: "Yenile",
		refreshingInbox: "Yenileniyor...",
		liveOn: "E-postalar anlık alınıyor",
		liveOff: "Bağlantı kesildi, yeniden bağlanılıyor",
		safetyHint:
			"Bu adresi bankacılık, iş veya kritik hesap kodları için kullanmayın. Adres varsayılan olarak uzun süre saklanır, ancak bunun garantisi yoktur.",
		badge: "Adres aynı kalır · Üyelik gerekmez",
		modal: {
			title: "İleti önizlemesi",
			from: "Gönderen",
			time: "Zaman",
			loading: "Yükleniyor...",
			empty: "İçerik yok",
		},
		narrative: {
			title: "Neden smail.pw geçici mail kullanmalısınız?",
			description:
				"smail.pw; düşük riskli kayıtlar, OTP doğrulaması ve tek seferlik indirmeler için ücretsiz bir geçici e-posta (geçici mail) oluşturucudur. Saniyeler içinde tek kullanımlık bir gelen kutusu oluşturun ve siz değiştirene kadar aynı adresi kullanın.",
			points: [
				"Geçici e-postayla kayıt ve doğrulama kodu işlemleri için uygundur",
				"Geçici maile hızlıca erişmek için üye olmanız veya şifre belirlemeniz gerekmez",
				"Yeni e-postalar kendiliğinden görünür, sürekli yenilemeniz gerekmez",
				"Bankacılık, iş ve kimliğinizle ilgili kritik hesaplar için kalıcı bir e-posta hesabı kullanın",
			],
		},
		jsonLdDescription:
			"smail.pw, kayıt ve OTP doğrulaması için ücretsiz geçici e-posta (geçici mail) gelen kutuları sunar; adresiniz siz değiştirene kadar aynı kalır.",
	},
	layout: {
		siteSubtitle: "geçici gelen kutusu",
		about: "Hakkında",
		faq: "SSS",
		blog: "Blog",
		contact: "İletişim",
		privacy: "Gizlilik Politikası",
		terms: "Kullanım Koşulları",
		language: "Dil",
		copyright: "Temiz gelen kutusu, temiz kimlik.",
	},
	common: {
		close: "Kapat",
		cancel: "İptal",
	},
	guides: {
		title: "Popüler geçici mail rehberleri",
		items: [
			{
				label: "Üyelik Gerektirmeyen Geçici Mail",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Doğrulama için Tek Kullanımlık Mail",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Kayıt için Geçici Mail",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Online Geçici Mail",
				path: "/online-temporary-email",
			},
		],
	},
	contact: {
		metaTitle: "İletişim | smail.pw",
		metaDescription:
			"smail.pw ile iletişime geçin: sorunuz, geri bildiriminiz veya iş birliği talebiniz için bize mesaj bırakın.",
		title: "Destek ekibine ulaşın",
		description:
			"Aşağıdan bize mesaj bırakın. Sorularınızı, geri bildirimlerinizi ve iş birliği taleplerinizi bekliyoruz.",
		formTitle: "Mesaj bırakın",
		messageLabel: "Mesaj",
		messagePlaceholder: "Ne oldu ya da bize ne iletmek istersiniz?",
		contactLabel: "Size nasıl ulaşalım? (isteğe bağlı)",
		contactHint: "Yalnızca yanıt istiyorsanız bir e-posta adresi",
		send: "Mesajı gönder",
		sending: "Gönderiliyor...",
		sent: "Teşekkürler, mesajınız bize ulaştı.",
		tooMany:
			"Ağınızdan çok fazla mesaj gönderildi. Lütfen daha sonra tekrar deneyin.",
		failed: "Mesaj gönderilemedi. Lütfen biraz sonra tekrar deneyin.",
		faqHint:
			"Bize yazmadan önce lütfen SSS sayfasına göz atın. Aradığınız yanıt orada olabilir.",
		faqCta: "SSS sayfasını aç",
		homeCta: "Ana sayfaya dön",
	},
	blog: {
		title: "Geçici Mail Rehberleri, İpuçları ve Çözümler | smail.pw",
		description:
			"Doğrulama ve tek kullanımlık gelen kutusu kullanımı için geçici e-posta rehberleri, kullanım önerileri ve sorun giderme ipuçları.",
		header: "smail.pw Blog",
		subheader:
			"Geçici e-posta kullananlar için rehberler ve sorun giderme yazıları",
		readArticle: "Yazıyı oku",
		prevPage: "Önceki",
		nextPage: "Sonraki",
		backToBlog: "Bloga dön",
		relatedPosts: "İlgili yazılar",
		postTitleSuffix: " | smail.pw Blog",
		pageSummary: "Sayfa {page} / {total} · Sayfa başına {size} yazı",
		readingTime: "{minutes} dk okuma",
		posts: [
			{
				slug: "is-temporary-email-safe",
				title: "Geçici Mail Güvenli mi? Neyi Korur, Neyi Korumaz?",
				description:
					"Geçici adresin neyi koruduğu, neyi korumadığı ve smail.pw'nin gelen kutusuna erişimi, saklamayı ve e-postaların görüntülenmesini nasıl ele aldığı.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "why-websites-block-temporary-email",
				title: "Bazı Web Siteleri Geçici Mail Adreslerini Neden Kabul Etmiyor?",
				description:
					"Kayıt formları tek kullanımlık adresleri nasıl tespit eder, siteler onları neden engeller ve geçici adresiniz reddedildiğinde gerçekten ne işe yarar?",
				publishedAt: "2026-10-08",
				readingMinutes: 5,
			},
			{
				slug: "how-email-ends-up-on-spam-lists",
				title:
					"E-posta Adresiniz Spam Listelerine Nasıl Düşüyor (ve Bunu Nasıl Durdurabilirsiniz)?",
				description:
					"Spam göndericileri ve pazarlamacılar adresinizi nereden bulur, hangi alışkanlıklar adresi sızdırır ve her web sitesine hangi adresi vereceğinize dair basit bir kural.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "temporary-email-best-practices",
				title: "Daha Güvenli Kayıtlar için Geçici Mail Kullanım Önerileri",
				description:
					"Spam'i azaltmak, hesabınıza erişimi kaybetmemek ve asıl gelen kutunuzu korumak için geçici e-postayı doğru kullanmanın pratik yolları.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "temporary-email-vs-email-alias",
				title: "Geçici Mail mi, E-posta Takma Adı mı? Hangisini Kullanmalı?",
				description:
					"Geçici gelen kutularını ve e-posta takma adlarını gizlilik, hesap kurtarma ve uzun vadeli hesap güvenliği açısından karşılaştırın.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "otp-email-not-arriving-fixes",
				title: "OTP E-postası Gelmiyor mu? Genelde İşe Yarayan 8 Hızlı Çözüm",
				description:
					"Geciken doğrulama e-postaları için pratik bir kontrol listesi: yeniden gönderme sorunları, gönderici engelleri ve gelen kutusunu yenileme adımları.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
		],
	},
	md: {
		meta: {
			about: {
				title: "smail.pw Hakkında | Geçici Mail ve Geçici E-posta Oluşturucu",
				description:
					"smail.pw geçici e-postanın nasıl çalıştığını, geçici maili ne zaman kullanacağınızı ve tek kullanımlık gelen kutusunun önemli sınırlarını öğrenin.",
			},
			faq: {
				title: "Geçici Mail SSS (OTP, Geçici E-posta, Teslimat) | smail.pw",
				description:
					"Geçici mail SSS: smail.pw'de adres oluşturma, adres ve iletilerin ne kadar saklandığı, OTP teslimat sorunları ve tek kullanımlık kutunun güvenlik sınırları.",
			},
			privacy: {
				title: "Gizlilik Politikası | smail.pw",
				description:
					"smail.pw'nin hangi verileri işleyebileceğini, geçici verilerin ne kadar süre saklandığını ve gizliliğin nasıl ele alındığını görün.",
			},
			terms: {
				title: "Kullanım Koşulları | smail.pw",
				description:
					"Kabul edilebilir kullanım, sorumluluk reddi ve hizmet sınırlamaları dahil olmak üzere smail.pw kullanım koşullarını inceleyin.",
			},
			"temporary-email-no-registration": {
				title: "Üyelik Gerektirmeyen Geçici Mail (Kayıtsız) | smail.pw",
				description:
					"Şifre veya kişisel bilgi vermeden, üye olmadan geçici mail kullanın. Anında geçici bir gelen kutusu oluşturun ve saniyeler içinde e-posta alın.",
			},
			"disposable-email-for-verification": {
				title: "Doğrulama ve OTP için Tek Kullanımlık Geçici Mail | smail.pw",
				description:
					"OTP ve doğrulama e-postalarını tek kullanımlık bir gelen kutusunda alın; kişisel e-posta adresiniz gizli kalsın, spam'den uzak dursun.",
			},
			"temporary-email-for-registration": {
				title: "Kayıt için Geçici Mail (Kayıt Olurken Kullanın) | smail.pw",
				description:
					"Kayıt işlemlerinde, deneme üyeliklerinde ve tek seferlik hesap açılışlarında uzun süreli e-posta adresinizi vermeden geçici e-posta kullanın.",
			},
			"online-temporary-email": {
				title: "Online Geçici Mail Kutusu (Anında Geçici E-posta) | smail.pw",
				description:
					"Doğrulama bağlantıları, OTP iletileri ve tek seferlik e-posta alımı için anında online geçici e-posta kutusu edinin.",
			},
			"can-temporary-email-send": {
				title:
					"Geçici Mail ile E-posta Gönderilir mi? (Yalnızca Alım) | smail.pw",
				description:
					"Geçici e-postayla ileti gönderilip gönderilemeyeceğini, birçok geçici kutunun neden yalnızca alım yaptığını ve ne zaman kalıcı bir e-posta gerektiğini öğrenin.",
			},
			"smail-vs-smailpro": {
				title: "smail.pw ve smailpro / smail pro | Marka Açıklaması",
				description:
					"Resmî açıklama: smail.pw bağımsız bir geçici e-posta hizmetidir; smailpro veya benzer adlı ürünlerle hiçbir bağlantısı yoktur.",
			},
		},
		breadcrumbHome: "Ana sayfa",
		cta: {
			title: "Geçici gelen kutunuzu hemen kullanmaya başlayın",
			description:
				"Tek dokunuşla tek kullanımlık bir adres oluşturun, ardından aşağıdaki en sık kullanılan kayıt ve OTP rehberlerine göz atın.",
			action: "Geçici e-posta oluştur",
		},
	},
};

export default function Provider(props: ParentProps) {
	return (
		<DictionaryContext value={dictionary}>{props.children}</DictionaryContext>
	);
}
