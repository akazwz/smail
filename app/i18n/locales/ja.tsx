import type { ParentProps } from "solid-js";

import { type Dictionary, DictionaryContext } from "../dictionary.ts";

export const dictionary: Dictionary = {
	home: {
		title: "一時メール 無料・登録不要でOTP受信 | smail.pw",
		description:
			"smail.pw で無料の一時メール（捨てアド）をすぐに作成。使い捨ての受信箱で、認証コード（OTP）の受信、手早い会員登録、迷惑メール対策ができます。",
		keywords:
			"一時メール, 使い捨てメール, 捨てアド, 捨てメアド, テンプメール, 一時メール作成, 登録不要メール, OTP, 認証メール, smail, smail.pw",
		heroTitle: "ワンタップで、一時メールの受信箱を。",
		heroDescription:
			"会員登録や認証コードの受信に使える一時メールアドレスを、数秒で生成できます。自分で変更しないかぎり、アドレスは変わりません。",
		copy: "コピー",
		copied: "コピー済み",
		deleteAddress: "アドレスを削除",
		replaceAddress: "アドレスを置き換える",
		replaceConfirmTitle: "このアドレスを置き換えますか？",
		deleteConfirmTitle: "このアドレスを削除しますか？",
		confirmBody:
			"{address} とその受信箱は、今後開けなくなります。この操作は元に戻せません。",
		generating: "生成中...",
		noAddressTitle: "使い捨てアドレスはまだありません",
		noAddressDescription:
			"会員登録や一度きりの認証に使える一時アドレスを生成しましょう。",
		generateAddress: "アドレスを生成",
		actionFailed: "うまくいきませんでした。もう一度お試しください。",
		inboxTitle: "最新のメール",
		emptyInboxTitle: "受信箱の準備ができました",
		emptyInboxDescription:
			"まだメールはありません。届くとすぐにここに表示されます。",
		refreshInbox: "更新",
		refreshingInbox: "更新中...",
		liveOn: "リアルタイム受信中",
		liveOff: "接続が切れました。再接続中",
		safetyHint:
			"銀行、仕事、重要なアカウントの認証コードには、このアドレスを使わないでください。アドレスは原則として長期間保持されますが、保証はありません。",
		badge: "変わらないアドレス · 登録不要",
		modal: {
			title: "メールのプレビュー",
			from: "差出人",
			time: "日時",
			loading: "読み込み中...",
			empty: "本文がありません",
		},
		narrative: {
			title: "smail.pw の一時メールを使う理由",
			description:
				"smail.pw は、リスクの低い会員登録、OTP 認証、一度きりのダウンロードに使える無料の一時メール（temp mail）生成サービスです。使い捨ての受信箱を数秒で作成でき、アドレスは自分で変更するまで変わりません。",
			points: [
				"一時メールでの会員登録や、認証コードの受信に最適",
				"アカウント登録もパスワード設定も不要で、すぐに使える",
				"新着メールは自動で表示され、何度も更新する必要なし",
				"銀行、仕事、本人確認に関わる重要なアカウントには、長期的に使えるメールアドレスを",
			],
		},
		jsonLdDescription:
			"smail.pw は、会員登録や OTP 認証に使える無料の一時メール（temp mail）の受信箱を提供します。アドレスは自分で変更するまで変わりません。",
	},
	layout: {
		siteSubtitle: "一時受信箱",
		about: "概要",
		faq: "FAQ",
		blog: "ブログ",
		contact: "お問い合わせ",
		privacy: "プライバシーポリシー",
		terms: "利用規約",
		language: "言語",
		copyright: "受信箱をクリーンに、アイデンティティもクリーンに。",
	},
	common: {
		close: "閉じる",
		cancel: "キャンセル",
	},
	guides: {
		title: "人気の一時メールガイド",
		items: [
			{
				label: "登録不要の一時メール",
				path: "/temporary-email-no-registration",
			},
			{
				label: "認証用の使い捨てメール",
				path: "/disposable-email-for-verification",
			},
			{
				label: "会員登録用の一時メール",
				path: "/temporary-email-for-registration",
			},
			{
				label: "オンライン一時メール",
				path: "/online-temporary-email",
			},
		],
	},
	contact: {
		metaTitle: "お問い合わせ | smail.pw",
		metaDescription:
			"smail.pw へのお問い合わせ：ご質問、ご意見、提携のご相談は、メッセージでお寄せください。",
		title: "サポートへのお問い合わせ",
		description:
			"下のフォームからメッセージをお送りください。ご質問、ご意見、提携のご相談など、どのような内容でも歓迎します。",
		formTitle: "メッセージを送る",
		messageLabel: "メッセージ",
		messagePlaceholder: "起きたことや、お伝えになりたいことをお書きください",
		contactLabel: "ご連絡先（任意）",
		contactHint: "返信をご希望の場合のみ、メールアドレスをご記入ください",
		send: "メッセージを送信",
		sending: "送信中...",
		sent: "ありがとうございます。メッセージを受け付けました。",
		tooMany:
			"お使いのネットワークからの送信が多すぎます。しばらくしてからもう一度お試しください。",
		failed:
			"メッセージを送信できませんでした。少し時間をおいてもう一度お試しください。",
		faqHint:
			"お問い合わせの前に、まず「よくある質問」ページをご確認ください。答えがすでに載っているかもしれません。",
		faqCta: "よくある質問を見る",
		homeCta: "ホームに戻る",
	},
	blog: {
		title: "一時メールの使い方ガイド・コツ・トラブル解決 | smail.pw",
		description:
			"一時メールの使い方、ベストプラクティス、認証メールや使い捨て受信箱のトラブル解決のコツをまとめています。",
		header: "smail.pw ブログ",
		subheader: "一時メールを使う方のためのガイドとトラブル解決",
		readArticle: "記事を読む",
		prevPage: "前へ",
		nextPage: "次へ",
		backToBlog: "ブログに戻る",
		relatedPosts: "関連記事",
		postTitleSuffix: " | smail.pw ブログ",
		pageSummary: "{page} / {total} ページ · 1 ページあたり {size} 件",
		readingTime: "{minutes} 分で読めます",
		posts: [
			{
				slug: "is-temporary-email-safe",
				title: "一時メールは安全？守れるものと守れないもの",
				description:
					"一時アドレスが守るもの、守れないもの、そして smail.pw での受信箱へのアクセス、保存、メール表示の仕組みを解説します。",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "why-websites-block-temporary-email",
				title: "一時メールアドレスを受け付けないウェブサイトがあるのはなぜ？",
				description:
					"登録フォームが使い捨てアドレスを見分ける仕組み、サイトがブロックする理由、一時アドレスが拒否されたときに本当に効果のある対処法を解説します。",
				publishedAt: "2026-10-08",
				readingMinutes: 5,
			},
			{
				slug: "how-email-ends-up-on-spam-lists",
				title:
					"メールアドレスはなぜ迷惑メールのリストに載るのか（そして防ぐ方法）",
				description:
					"迷惑メール業者やマーケティング担当者がアドレスを手に入れる経路、アドレスが漏れる習慣、サイトごとにどのアドレスを渡すかを決めるシンプルなルールを紹介します。",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "temporary-email-best-practices",
				title: "安全に会員登録するための一時メール活用ベストプラクティス",
				description:
					"迷惑メールを減らし、アカウントの締め出しを防ぎ、メインの受信箱を守るための、実践的な一時メールの使い方を紹介します。",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "temporary-email-vs-email-alias",
				title: "一時メールとメールエイリアスの違い：どちらを使うべき？",
				description:
					"一時メールの受信箱とメールエイリアスを、プライバシー、復旧のしやすさ、アカウントの長期的な安全性の観点から比較します。",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "otp-email-not-arriving-fixes",
				title: "認証コード（OTP）メールが届かない？すぐ試せる8つの対処法",
				description:
					"認証メールが遅れているときに、再送信のトラブル、送信元によるブロック、受信箱の更新を順に確認できる実用的なチェックリストです。",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
		],
	},
	md: {
		meta: {
			about: {
				title: "smail.pw について | 一時メール",
				description:
					"smail.pw の一時メールの仕組み、一時メールが役立つ場面、使い捨て受信箱を使ううえでの重要な制限を紹介します。",
			},
			faq: {
				title: "よくある質問 | smail.pw 一時メール",
				description:
					"一時メールの始め方、アドレスとメールの保持期間、OTP が届かないときの対処、安全に使うための制限をまとめた smail.pw の FAQ です。",
			},
			privacy: {
				title: "プライバシーポリシー | smail.pw",
				description:
					"smail.pw が取り扱う可能性のあるデータ、一時的なデータの保持期間、プライバシーの取り扱いについて説明します。",
			},
			terms: {
				title: "利用規約 | smail.pw",
				description:
					"禁止事項、免責事項、サービスの制限など、smail.pw の利用条件をご確認ください。",
			},
			"temporary-email-no-registration": {
				title: "登録不要の一時メール | smail.pw",
				description:
					"パスワードも個人情報もいらない、登録不要の一時メール。一時受信箱をすぐに生成し、数秒でメールを受け取れます。",
			},
			"disposable-email-for-verification": {
				title: "認証コード用の使い捨てメール（OTP）| smail.pw",
				description:
					"OTP や認証メールを使い捨ての受信箱で受け取り、個人のメールアドレスを知らせずに迷惑メールを防げます。",
			},
			"temporary-email-for-registration": {
				title: "会員登録用の一時メール | smail.pw",
				description:
					"会員登録、トライアルの申し込み、一度きりの初期設定に。長く使っているメールアドレスを知らせずに一時メールで登録できます。",
			},
			"online-temporary-email": {
				title: "オンライン一時メール（即時受信）| smail.pw",
				description:
					"確認リンクや OTP メールの受信、一度きりのメール受信に使えるオンライン一時メールの受信箱を、すぐに利用できます。",
			},
			"can-temporary-email-send": {
				title: "一時メールは送信できる？ | smail.pw",
				description:
					"一時メールでメールを送信できるのか、多くの一時受信箱が受信専用である理由、長期的に使えるメールアドレスを使うべき場面を解説します。",
			},
			"smail-vs-smailpro": {
				title: "smail.pw と smailpro の違い | 公式説明",
				description:
					"公式のご案内：smail.pw は独立した一時メールサービスであり、smailpro や類似の名称を持つサービスとは関係ありません。",
			},
		},
		breadcrumbHome: "ホーム",
		cta: {
			title: "今すぐ一時メールの受信箱を使う",
			description:
				"ワンタップで使い捨てアドレスを作成したら、下記の会員登録・OTP 関連の定番ガイドもご覧ください。",
			action: "一時メールを生成",
		},
	},
};

export default function Provider(props: ParentProps) {
	return (
		<DictionaryContext value={dictionary}>{props.children}</DictionaryContext>
	);
}
