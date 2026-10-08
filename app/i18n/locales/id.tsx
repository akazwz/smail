import type { ParentProps } from "solid-js";

import { type Dictionary, DictionaryContext } from "../dictionary.ts";

export const dictionary: Dictionary = {
	home: {
		title: "smail.pw Email Sementara - Temp Mail Gratis untuk Kode OTP",
		description:
			"Buat email sementara (temp mail) gratis secara instan di smail.pw. Pakai kotak masuk sekali pakai untuk kode OTP, daftar akun, dan menghindari spam.",
		keywords:
			"smail, smail temp mail, email sementara, temp mail, email sekali pakai, generator email sementara, email tanpa daftar, email kode OTP, smail.pw",
		heroTitle: "Kotak masuk email sementara dalam sekali ketuk.",
		heroDescription:
			"Buat alamat temp mail untuk pendaftaran dan kode OTP dalam hitungan detik. Alamat tidak pernah berubah kecuali Anda sendiri yang menggantinya.",
		copy: "Salin",
		copied: "Tersalin",
		deleteAddress: "Hapus alamat",
		replaceAddress: "Ganti alamat",
		replaceConfirmTitle: "Ganti alamat ini?",
		deleteConfirmTitle: "Hapus alamat ini?",
		confirmBody:
			"Anda tidak akan bisa lagi membuka {address} maupun kotak masuknya. Tindakan ini tidak dapat dibatalkan.",
		generating: "Membuat...",
		noAddressTitle: "Belum ada email sekali pakai",
		noAddressDescription:
			"Buat alamat sementara untuk pendaftaran dan verifikasi sekali pakai.",
		generateAddress: "Buat alamat",
		actionFailed: "Tidak berhasil. Silakan coba lagi.",
		inboxTitle: "Email terbaru",
		emptyInboxTitle: "Kotak masuk Anda sudah siap",
		emptyInboxDescription:
			"Belum ada email. Pesan baru akan langsung muncul di sini.",
		refreshInbox: "Muat ulang",
		refreshingInbox: "Memuat ulang...",
		liveOn: "Menerima secara real-time",
		liveOff: "Terputus, menyambungkan ulang",
		safetyHint:
			"Jangan gunakan alamat ini untuk perbankan, pekerjaan, atau kode akun penting. Secara default alamat disimpan jangka panjang, tetapi tanpa jaminan.",
		badge: "Alamat tetap sama · Tanpa registrasi",
		modal: {
			title: "Pratinjau pesan",
			from: "Dari",
			time: "Waktu",
			loading: "Memuat...",
			empty: "Tidak ada isi",
		},
		narrative: {
			title: "Mengapa memakai email sementara smail.pw",
			description:
				"smail.pw adalah generator email sementara (temp mail) gratis untuk pendaftaran berisiko rendah, verifikasi kode OTP, dan unduhan sekali pakai. Buat kotak masuk sekali pakai dalam hitungan detik dan pakai alamat yang sama sampai Anda menggantinya.",
			points: [
				"Cocok untuk pendaftaran dengan email sementara dan penerimaan kode verifikasi",
				"Tanpa daftar akun dan tanpa membuat kata sandi, temp mail langsung bisa dipakai",
				"Email baru muncul dengan sendirinya, tanpa perlu terus memuat ulang",
				"Gunakan email permanen untuk perbankan, pekerjaan, dan akun yang menyangkut identitas penting",
			],
		},
		jsonLdDescription:
			"smail.pw menyediakan kotak masuk email sementara (temp mail) gratis untuk pendaftaran dan verifikasi kode OTP, dengan alamat yang tetap sama sampai Anda menggantinya.",
	},
	layout: {
		siteSubtitle: "kotak masuk sementara",
		about: "Tentang",
		faq: "FAQ",
		blog: "Blog",
		contact: "Kontak",
		privacy: "Kebijakan Privasi",
		terms: "Ketentuan Penggunaan",
		language: "Bahasa",
		copyright: "Kotak masuk bersih, identitas terjaga.",
	},
	common: {
		close: "Tutup",
		cancel: "Batal",
	},
	guides: {
		title: "Panduan email sementara populer",
		items: [
			{
				label: "Email Sementara Tanpa Daftar",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Email Sekali Pakai untuk Verifikasi",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Email Sementara untuk Pendaftaran",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Email Sementara Online",
				path: "/online-temporary-email",
			},
		],
	},
	contact: {
		metaTitle: "Kontak | smail.pw",
		metaDescription:
			"Hubungi smail.pw: tinggalkan pesan berisi pertanyaan, masukan, atau tawaran kerja sama.",
		title: "Hubungi dukungan",
		description:
			"Tinggalkan pesan di bawah ini. Pertanyaan, masukan, dan tawaran kerja sama semuanya kami terima.",
		formTitle: "Tinggalkan pesan",
		messageLabel: "Pesan",
		messagePlaceholder: "Apa yang terjadi, atau apa yang ingin Anda sampaikan?",
		contactLabel: "Cara menghubungi Anda (opsional)",
		contactHint: "Alamat email, hanya jika Anda ingin dibalas",
		send: "Kirim pesan",
		sending: "Mengirim...",
		sent: "Terima kasih, pesan Anda sudah kami terima.",
		tooMany:
			"Terlalu banyak pesan dikirim dari jaringan Anda. Silakan coba lagi nanti.",
		failed: "Pesan tidak dapat dikirim. Silakan coba lagi sebentar lagi.",
		faqHint:
			"Sebelum menghubungi kami, silakan periksa halaman FAQ terlebih dahulu. Jawaban Anda mungkin sudah ada di sana.",
		faqCta: "Buka FAQ",
		homeCta: "Kembali ke beranda",
	},
	blog: {
		title: "Panduan, Tips & Solusi Email Sementara | smail.pw",
		description:
			"Panduan email sementara, praktik terbaik, dan tips mengatasi masalah verifikasi serta penggunaan kotak masuk sekali pakai.",
		header: "Blog smail.pw",
		subheader: "Panduan dan pemecahan masalah untuk pengguna email sementara",
		readArticle: "Baca artikel",
		prevPage: "Sebelumnya",
		nextPage: "Berikutnya",
		backToBlog: "Kembali ke blog",
		relatedPosts: "Artikel terkait",
		postTitleSuffix: " | Blog smail.pw",
		pageSummary: "Halaman {page} dari {total} · {size} artikel per halaman",
		readingTime: "{minutes} menit baca",
		posts: [
			{
				slug: "is-temporary-email-safe",
				title:
					"Apakah Email Sementara Aman? Apa yang Dilindungi dan Apa yang Tidak",
				description:
					"Apa yang dilindungi alamat sementara, apa yang tidak, dan bagaimana smail.pw menangani akses kotak masuk, penyimpanan, dan tampilan email.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "why-websites-block-temporary-email",
				title: "Mengapa Sebagian Situs Menolak Alamat Email Sementara",
				description:
					"Cara formulir pendaftaran mendeteksi alamat sekali pakai, alasan situs memblokirnya, dan apa yang benar-benar berhasil saat alamat sementara Anda ditolak.",
				publishedAt: "2026-10-08",
				readingMinutes: 5,
			},
			{
				slug: "how-email-ends-up-on-spam-lists",
				title:
					"Bagaimana Alamat Email Anda Masuk ke Daftar Spam (dan Cara Mencegahnya)",
				description:
					"Dari mana pengirim spam dan pemasar mendapatkan alamat Anda, kebiasaan apa yang membocorkannya, dan aturan sederhana untuk memilih alamat bagi tiap situs.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "temporary-email-best-practices",
				title: "Praktik Terbaik Email Sementara agar Daftar Akun Lebih Aman",
				description:
					"Pelajari praktik terbaik email sementara untuk mengurangi spam, mencegah akun terkunci, dan melindungi kotak masuk utama Anda.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "temporary-email-vs-email-alias",
				title: "Email Sementara vs Alias Email: Mana yang Sebaiknya Dipakai?",
				description:
					"Bandingkan kotak masuk sementara dan alias email dari sisi privasi, pemulihan, dan keamanan akun jangka panjang.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "otp-email-not-arriving-fixes",
				title: "Email OTP Tidak Masuk? 8 Solusi Cepat yang Biasanya Berhasil",
				description:
					"Atasi email verifikasi yang terlambat dengan daftar periksa praktis: kendala kirim ulang, pemblokiran pengirim, dan cara memuat ulang kotak masuk.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
		],
	},
	md: {
		meta: {
			about: {
				title: "Tentang smail.pw | Email Sementara & Generator Temp Mail",
				description:
					"Pelajari cara kerja email sementara smail.pw, kapan sebaiknya memakai temp mail, dan batasan penting kotak masuk sekali pakai.",
			},
			faq: {
				title: "FAQ Email Sementara (OTP, Temp Mail, Pengiriman) | smail.pw",
				description:
					"FAQ email sementara smail.pw: cara membuat temp mail, berapa lama alamat dan pesan disimpan, kendala kode OTP, dan batas keamanan kotak masuk sekali pakai.",
			},
			privacy: {
				title: "Kebijakan Privasi | smail.pw",
				description:
					"Lihat data apa saja yang mungkin diproses smail.pw, berapa lama data sementara disimpan, dan bagaimana privasi ditangani.",
			},
			terms: {
				title: "Ketentuan Penggunaan | smail.pw",
				description:
					"Baca ketentuan penggunaan smail.pw, termasuk penggunaan yang diperbolehkan, penafian, dan batasan layanan.",
			},
			"temporary-email-no-registration": {
				title: "Email Sementara Tanpa Daftar (Temp Mail Instan) | smail.pw",
				description:
					"Pakai temp mail tanpa daftar, tanpa kata sandi, dan tanpa data pribadi. Buat kotak masuk sementara secara instan dan terima email dalam hitungan detik.",
			},
			"disposable-email-for-verification": {
				title: "Email Sekali Pakai untuk Verifikasi & Kode OTP | smail.pw",
				description:
					"Terima kode OTP dan email verifikasi di kotak masuk sekali pakai, sementara email pribadi Anda tetap privat dan bebas spam.",
			},
			"temporary-email-for-registration": {
				title: "Email Sementara untuk Daftar Akun (Temp Mail) | smail.pw",
				description:
					"Gunakan email sementara untuk pendaftaran, akun uji coba, dan onboarding sekali pakai tanpa membagikan email jangka panjang Anda.",
			},
			"online-temporary-email": {
				title: "Email Sementara Online (Temp Mail Instan) | smail.pw",
				description:
					"Dapatkan kotak masuk email sementara online secara instan untuk tautan verifikasi, pesan OTP, dan penerimaan email sekali pakai.",
			},
			"can-temporary-email-send": {
				title: "Bisakah Email Sementara Mengirim Pesan? | smail.pw",
				description:
					"Pahami apakah email sementara bisa mengirim pesan, mengapa banyak temp mail hanya bisa menerima, dan kapan sebaiknya memakai email permanen.",
			},
			"smail-vs-smailpro": {
				title: "smail.pw vs smailpro / smail pro | Klarifikasi Merek",
				description:
					"Klarifikasi resmi: smail.pw adalah layanan email sementara independen dan tidak berafiliasi dengan smailpro atau produk bernama serupa.",
			},
		},
		breadcrumbHome: "Beranda",
		cta: {
			title: "Mulai kotak masuk sementara Anda sekarang",
			description:
				"Buat alamat sekali pakai dalam sekali ketuk, lalu buka panduan pendaftaran dan OTP yang paling sering dicari di bawah ini.",
			action: "Buat email sementara",
		},
	},
};

export default function Provider(props: ParentProps) {
	return (
		<DictionaryContext value={dictionary}>{props.children}</DictionaryContext>
	);
}
