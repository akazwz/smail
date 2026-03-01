import type { Locale } from "./config";

export interface Dictionary {
	home: {
		title: string;
		description: string;
		keywords: string;
		heroTag: string;
		heroTitle: string;
		heroDescription: string;
		loadingAddresses: string;
		currentAddress: string;
		copy: string;
		copied: string;
		deleteAddress: string;
		deleting: string;
		generateNew: string;
		generating: string;
		noAddressTitle: string;
		noAddressDescription: string;
		generateAddress: string;
		stats: {
			lifetimeValue: string;
			refreshValue: string;
			registrationValue: string;
			lifetime: string;
			refresh: string;
			registration: string;
		};
		inboxTag: string;
		inboxTitle: string;
		tapToOpen: string;
		loadingEmails: string;
		emptyInboxTitle: string;
		emptyInboxDescription: string;
		refreshInbox: string;
		refreshingInbox: string;
		lastRefresh: string;
		safetyHint: string;
		modal: {
			title: string;
			from: string;
			time: string;
			loading: string;
			empty: string;
		};
	};
	layout: {
		siteSubtitle: string;
		nav: {
			home: string;
			about: string;
			faq: string;
		};
		footerTag: string;
		footerDescription: string;
		footerLinks: {
			faq: string;
			privacy: string;
			terms: string;
			about: string;
		};
		copyright: string;
		themeToLight: string;
		themeToDark: string;
	};
}

const en: Dictionary = {
	home: {
		title: "smail.pw Temporary Email (24h) - Free Temp Mail for OTP & Sign-Ups",
		description:
			"Generate free temporary email (temp mail) instantly on smail.pw. Use a 24-hour disposable inbox for OTP verification, quick sign-ups, and spam control.",
		keywords:
			"smail, smail temp mail, temporary email, temp mail, disposable email, temporary email generator, 24 hour temporary email, no registration email, otp email, smail.pw",
		heroTag: "Disposable mailbox",
		heroTitle: "Create a 24-hour temporary email inbox in one tap.",
		heroDescription:
			"Generate a temp mail address for sign-ups and OTP links in seconds. Messages auto-expire after 24 hours to reduce data exposure.",
		loadingAddresses: "Loading addresses...",
		currentAddress: "Current disposable address",
		copy: "Copy",
		copied: "Copied",
		deleteAddress: "Delete address",
		deleting: "Deleting...",
		generateNew: "Generate new",
		generating: "Generating...",
		noAddressTitle: "No disposable email yet",
		noAddressDescription:
			"Generate a temporary address to use for sign-ups and one-off verifications.",
		generateAddress: "Generate address",
		stats: {
			lifetimeValue: "24h",
			refreshValue: "Instant",
			registrationValue: "Zero",
			lifetime: "Email retention",
			refresh: "Inbox refresh",
			registration: "Registration",
		},
		inboxTag: "Inbox",
		inboxTitle: "Latest emails",
		tapToOpen: "Tap to open",
		loadingEmails: "Loading emails...",
		emptyInboxTitle: "Your inbox is waiting",
		emptyInboxDescription:
			"No emails yet. Messages will appear here instantly.",
		refreshInbox: "Refresh",
		refreshingInbox: "Refreshing...",
		lastRefresh: "Last refresh",
		safetyHint:
			"Do not use this address for banking, work, or critical account codes. Messages are automatically removed after 24 hours.",
		modal: {
			title: "Message preview",
			from: "From",
			time: "Time",
			loading: "Loading...",
			empty: "No content",
		},
	},
	layout: {
		siteSubtitle: "temporary inbox",
		nav: {
			home: "Home",
			about: "About",
			faq: "FAQ",
		},
		footerTag: "privacy-first utilities",
		footerDescription:
			"Disposable inbox for sign-up verification, app testing, and short-lived communication without exposing your personal mailbox.",
		footerLinks: {
			faq: "FAQ",
			privacy: "Privacy Policy",
			terms: "Terms of Use",
			about: "About smail.pw",
		},
		copyright: "Clean inbox, clean identity.",
		themeToLight: "☀ Light",
		themeToDark: "🌙 Dark",
	},
};

const zh: Dictionary = {
	home: {
		title: "临时邮箱生成器（24小时）- 免费一次性邮箱免注册收验证码 | smail.pw",
		description:
			"免费临时邮箱生成器，一键创建 24 小时一次性邮箱。适合临时邮箱注册、验证码接收与在线临时收信，减少垃圾邮件。",
		keywords:
			"临时邮箱, 一次性邮箱, 临时邮箱生成器, 免费临时邮箱, 24小时临时邮箱, 24小时邮箱, 验证码邮箱, 免注册临时邮箱, 在线临时邮箱, 国内临时邮箱, 临时邮箱注册, 邮箱生成器",
		heroTag: "一次性邮箱",
		heroTitle: "免费临时邮箱生成器：一键创建 24 小时收件箱。",
		heroDescription:
			"适合临时邮箱注册、验证码与一次性下载。邮件 24 小时后自动清理，减少真实邮箱暴露。",
		loadingAddresses: "正在加载邮箱地址...",
		currentAddress: "当前临时邮箱",
		copy: "复制",
		copied: "已复制",
		deleteAddress: "删除地址",
		deleting: "删除中...",
		generateNew: "生成新地址",
		generating: "生成中...",
		noAddressTitle: "还没有临时邮箱",
		noAddressDescription: "生成一个临时邮箱，用于注册和一次性验证。",
		generateAddress: "生成地址",
		stats: {
			lifetimeValue: "24小时",
			refreshValue: "即时",
			registrationValue: "零门槛",
			lifetime: "邮件保留",
			refresh: "收件箱刷新",
			registration: "无需注册",
		},
		inboxTag: "收件箱",
		inboxTitle: "最新邮件",
		tapToOpen: "点击查看",
		loadingEmails: "正在加载邮件...",
		emptyInboxTitle: "收件箱等待中",
		emptyInboxDescription: "暂时没有邮件，收到后会立即显示在这里。",
		refreshInbox: "刷新",
		refreshingInbox: "刷新中...",
		lastRefresh: "最近刷新",
		safetyHint:
			"请勿用于银行、工作或重要账号验证码。邮件会在 24 小时后自动删除。",
		modal: {
			title: "邮件预览",
			from: "发件人",
			time: "时间",
			loading: "加载中...",
			empty: "暂无内容",
		},
	},
	layout: {
		siteSubtitle: "临时收件箱",
		nav: {
			home: "首页",
			about: "关于",
			faq: "常见问题",
		},
		footerTag: "隐私优先工具",
		footerDescription:
			"用于注册验证、测试和短期收信的临时邮箱服务，避免泄露你的个人邮箱地址。",
		footerLinks: {
			faq: "常见问题",
			privacy: "隐私政策",
			terms: "使用条款",
			about: "关于 smail.pw",
		},
		copyright: "让邮箱更干净，让身份更安全。",
		themeToLight: "☀ 浅色",
		themeToDark: "🌙 深色",
	},
};

const es: Dictionary = {
	home: {
		title: "Correo temporal gratis 24h sin registro para OTP | smail.pw",
		description:
			"Generador de correo temporal gratis (temp mail) para registros y códigos OTP. Crea un buzón desechable de 24 horas al instante.",
		keywords:
			"correo temporal, correo temporal gratis, email temporal, email desechable, temp mail, 24 horas, sin registro, codigo otp, smail.pw",
		heroTag: "Buzón temporal",
		heroTitle: "Protege tu privacidad con un buzón en un clic.",
		heroDescription:
			"Genera una dirección temporal para registros y verificaciones, y elimínala cuando termines.",
		loadingAddresses: "Cargando direcciones...",
		currentAddress: "Dirección temporal actual",
		copy: "Copiar",
		copied: "Copiado",
		deleteAddress: "Eliminar dirección",
		deleting: "Eliminando...",
		generateNew: "Generar nueva",
		generating: "Generando...",
		noAddressTitle: "Aún no tienes correo temporal",
		noAddressDescription:
			"Genera una dirección temporal para registros y verificaciones rápidas.",
		generateAddress: "Generar dirección",
		stats: {
			lifetimeValue: "24h",
			refreshValue: "Instantáneo",
			registrationValue: "Cero",
			lifetime: "Vida útil",
			refresh: "Actualización",
			registration: "Registro",
		},
		inboxTag: "Bandeja",
		inboxTitle: "Últimos correos",
		tapToOpen: "Pulsa para abrir",
		loadingEmails: "Cargando correos...",
		emptyInboxTitle: "Tu bandeja te espera",
		emptyInboxDescription: "Aún no hay correos. Aparecerán aquí al instante.",
		refreshInbox: "Actualizar",
		refreshingInbox: "Actualizando...",
		lastRefresh: "Última actualización",
		safetyHint:
			"No uses esta dirección para banca, trabajo o códigos de cuentas importantes.",
		modal: {
			title: "Vista previa",
			from: "De",
			time: "Hora",
			loading: "Cargando...",
			empty: "Sin contenido",
		},
	},
	layout: {
		siteSubtitle: "buzón temporal",
		nav: { home: "Inicio", about: "Acerca de", faq: "FAQ" },
		footerTag: "utilidades centradas en privacidad",
		footerDescription:
			"Buzón desechable para verificaciones, pruebas y comunicaciones cortas sin exponer tu correo principal.",
		footerLinks: {
			faq: "FAQ",
			privacy: "Privacidad",
			terms: "Términos",
			about: "Sobre smail.pw",
		},
		copyright: "Bandeja limpia, identidad limpia.",
		themeToLight: "☀ Claro",
		themeToDark: "🌙 Oscuro",
	},
};

const fr: Dictionary = {
	home: {
		title: "Email temporaire gratuit 24h sans inscription | smail.pw",
		description:
			"Générateur d'email temporaire gratuit (temp mail) pour inscriptions rapides et codes OTP. Créez une boîte jetable 24h immédiatement.",
		keywords:
			"email temporaire, email jetable, temp mail, 24h, sans inscription, code otp, boite mail temporaire, smail.pw",
		heroTag: "Boîte temporaire",
		heroTitle: "Protégez votre vie privée en un clic.",
		heroDescription:
			"Créez une adresse temporaire pour les inscriptions et vérifications, puis supprimez-la quand c'est fini.",
		loadingAddresses: "Chargement des adresses...",
		currentAddress: "Adresse temporaire actuelle",
		copy: "Copier",
		copied: "Copié",
		deleteAddress: "Supprimer l'adresse",
		deleting: "Suppression...",
		generateNew: "Nouvelle adresse",
		generating: "Génération...",
		noAddressTitle: "Aucune adresse temporaire",
		noAddressDescription:
			"Générez une adresse temporaire pour inscriptions et vérifications.",
		generateAddress: "Générer une adresse",
		stats: {
			lifetimeValue: "24h",
			refreshValue: "Instantané",
			registrationValue: "Zéro",
			lifetime: "Durée",
			refresh: "Rafraîchissement",
			registration: "Inscription",
		},
		inboxTag: "Boîte",
		inboxTitle: "Derniers emails",
		tapToOpen: "Ouvrir",
		loadingEmails: "Chargement des emails...",
		emptyInboxTitle: "Votre boîte vous attend",
		emptyInboxDescription:
			"Aucun email pour l'instant. Ils apparaîtront ici immédiatement.",
		refreshInbox: "Rafraîchir",
		refreshingInbox: "Actualisation...",
		lastRefresh: "Dernière mise à jour",
		safetyHint:
			"N’utilisez pas cette adresse pour la banque, le travail ou des codes de comptes importants.",
		modal: {
			title: "Aperçu du message",
			from: "De",
			time: "Heure",
			loading: "Chargement...",
			empty: "Aucun contenu",
		},
	},
	layout: {
		siteSubtitle: "boîte temporaire",
		nav: { home: "Accueil", about: "À propos", faq: "FAQ" },
		footerTag: "outils orientés confidentialité",
		footerDescription:
			"Boîte jetable pour vérifications, tests et messages courts sans exposer votre boîte principale.",
		footerLinks: {
			faq: "FAQ",
			privacy: "Confidentialité",
			terms: "Conditions",
			about: "À propos de smail.pw",
		},
		copyright: "Boîte propre, identité propre.",
		themeToLight: "☀ Clair",
		themeToDark: "🌙 Sombre",
	},
};

const de: Dictionary = {
	home: {
		title: "Temporäre E-Mail kostenlos (24h) ohne Registrierung | smail.pw",
		description:
			"Kostenloser Temp-Mail-Generator für Registrierungen und OTP-Codes. Erstelle sofort ein 24h Wegwerf-Postfach ohne Konto.",
		keywords:
			"temporäre email, wegwerf-email, temp mail, 24h email, ohne registrierung, otp code email, smail.pw",
		heroTag: "Temporäres Postfach",
		heroTitle: "Schütze deine Privatsphäre mit einem Klick.",
		heroDescription:
			"Erstelle eine temporäre Adresse für Registrierungen und Bestätigungen und lösche sie danach.",
		loadingAddresses: "Adressen werden geladen...",
		currentAddress: "Aktuelle Wegwerfadresse",
		copy: "Kopieren",
		copied: "Kopiert",
		deleteAddress: "Adresse löschen",
		deleting: "Wird gelöscht...",
		generateNew: "Neu generieren",
		generating: "Wird generiert...",
		noAddressTitle: "Noch keine Wegwerfadresse",
		noAddressDescription:
			"Erzeuge eine temporäre Adresse für schnelle Registrierungen und Verifizierungen.",
		generateAddress: "Adresse erzeugen",
		stats: {
			lifetimeValue: "24h",
			refreshValue: "Sofort",
			registrationValue: "Null",
			lifetime: "Lebensdauer",
			refresh: "Aktualisierung",
			registration: "Registrierung",
		},
		inboxTag: "Posteingang",
		inboxTitle: "Neueste E-Mails",
		tapToOpen: "Zum Öffnen tippen",
		loadingEmails: "E-Mails werden geladen...",
		emptyInboxTitle: "Dein Posteingang wartet",
		emptyInboxDescription:
			"Noch keine E-Mails. Neue Nachrichten erscheinen sofort hier.",
		refreshInbox: "Aktualisieren",
		refreshingInbox: "Wird aktualisiert...",
		lastRefresh: "Zuletzt aktualisiert",
		safetyHint: "Nicht für Banking, Arbeit oder wichtige Kontocodes verwenden.",
		modal: {
			title: "Nachrichtenvorschau",
			from: "Von",
			time: "Zeit",
			loading: "Lädt...",
			empty: "Kein Inhalt",
		},
	},
	layout: {
		siteSubtitle: "temporäres Postfach",
		nav: { home: "Start", about: "Über", faq: "FAQ" },
		footerTag: "datenschutzorientierte tools",
		footerDescription:
			"Wegwerf-Postfach für Verifizierungen, Tests und kurze Kommunikation ohne dein Hauptpostfach preiszugeben.",
		footerLinks: {
			faq: "FAQ",
			privacy: "Datenschutz",
			terms: "Nutzungsbedingungen",
			about: "Über smail.pw",
		},
		copyright: "Sauberes Postfach, saubere Identität.",
		themeToLight: "☀ Hell",
		themeToDark: "🌙 Dunkel",
	},
};

const ja: Dictionary = {
	home: {
		title: "一時メール（24時間）無料・登録不要でOTP受信 | smail.pw",
		description:
			"無料の一時メール（temp mail）生成サービス。登録不要で24時間の使い捨て受信箱を作成し、認証コードを受け取れます。",
		keywords:
			"一時メール, 使い捨てメール, テンプメール, 24時間メール, 登録不要メール, OTP, 認証メール, smail.pw",
		heroTag: "一時メールボックス",
		heroTitle: "ワンクリックでプライバシーを保護。",
		heroDescription:
			"登録や認証用に一時アドレスを作成し、不要になったら削除できます。",
		loadingAddresses: "アドレスを読み込み中...",
		currentAddress: "現在の一時アドレス",
		copy: "コピー",
		copied: "コピー済み",
		deleteAddress: "アドレス削除",
		deleting: "削除中...",
		generateNew: "新規生成",
		generating: "生成中...",
		noAddressTitle: "一時メールがまだありません",
		noAddressDescription: "登録や認証のために一時アドレスを生成してください。",
		generateAddress: "アドレス生成",
		stats: {
			lifetimeValue: "24時間",
			refreshValue: "即時",
			registrationValue: "不要",
			lifetime: "有効期間",
			refresh: "受信更新",
			registration: "登録",
		},
		inboxTag: "受信箱",
		inboxTitle: "最新メール",
		tapToOpen: "タップして開く",
		loadingEmails: "メールを読み込み中...",
		emptyInboxTitle: "受信箱は準備完了です",
		emptyInboxDescription:
			"まだメールはありません。届くとすぐここに表示されます。",
		refreshInbox: "更新",
		refreshingInbox: "更新中...",
		lastRefresh: "最終更新",
		safetyHint:
			"銀行・仕事・重要アカウントの認証コードには使用しないでください。",
		modal: {
			title: "メッセージプレビュー",
			from: "差出人",
			time: "時刻",
			loading: "読み込み中...",
			empty: "内容なし",
		},
	},
	layout: {
		siteSubtitle: "一時受信箱",
		nav: { home: "ホーム", about: "概要", faq: "FAQ" },
		footerTag: "プライバシー重視のツール",
		footerDescription:
			"主要メールを公開せず、認証・テスト・短期利用に使える使い捨て受信箱です。",
		footerLinks: {
			faq: "FAQ",
			privacy: "プライバシー",
			terms: "利用規約",
			about: "smail.pw について",
		},
		copyright: "受信箱をクリーンに、アイデンティティもクリーンに。",
		themeToLight: "☀ ライト",
		themeToDark: "🌙 ダーク",
	},
};

const ko: Dictionary = {
	home: {
		title: "임시 이메일 24시간 무료, 가입 없이 OTP 수신 | smail.pw",
		description:
			"무료 임시 이메일(temp mail) 생성기. 가입 없이 24시간 일회용 메일함을 만들고 인증 코드(OTP)를 빠르게 받으세요.",
		keywords:
			"임시 이메일, 일회용 이메일, 템프 메일, 24시간 메일, 가입 없는 이메일, OTP 메일, 인증 메일, smail.pw",
		heroTag: "임시 메일함",
		heroTitle: "한 번의 클릭으로 개인정보 보호.",
		heroDescription:
			"회원가입 및 인증용 임시 주소를 만들고, 사용 후 바로 삭제하세요.",
		loadingAddresses: "주소 불러오는 중...",
		currentAddress: "현재 임시 주소",
		copy: "복사",
		copied: "복사됨",
		deleteAddress: "주소 삭제",
		deleting: "삭제 중...",
		generateNew: "새로 생성",
		generating: "생성 중...",
		noAddressTitle: "아직 임시 이메일이 없습니다",
		noAddressDescription: "가입 및 인증에 사용할 임시 주소를 생성하세요.",
		generateAddress: "주소 생성",
		stats: {
			lifetimeValue: "24시간",
			refreshValue: "즉시",
			registrationValue: "없음",
			lifetime: "유효기간",
			refresh: "새로고침",
			registration: "가입",
		},
		inboxTag: "받은편지함",
		inboxTitle: "최신 메일",
		tapToOpen: "탭하여 열기",
		loadingEmails: "메일 불러오는 중...",
		emptyInboxTitle: "받은편지함이 준비되었습니다",
		emptyInboxDescription: "아직 메일이 없습니다. 도착하면 즉시 표시됩니다.",
		refreshInbox: "새로고침",
		refreshingInbox: "새로고침 중...",
		lastRefresh: "최근 새로고침",
		safetyHint: "은행·업무·중요 계정 인증코드에는 사용하지 마세요.",
		modal: {
			title: "메일 미리보기",
			from: "보낸사람",
			time: "시간",
			loading: "불러오는 중...",
			empty: "내용 없음",
		},
	},
	layout: {
		siteSubtitle: "임시 받은편지함",
		nav: { home: "홈", about: "소개", faq: "FAQ" },
		footerTag: "프라이버시 중심 도구",
		footerDescription:
			"주 이메일을 노출하지 않고 인증, 테스트, 단기 사용에 적합한 일회용 메일함입니다.",
		footerLinks: {
			faq: "FAQ",
			privacy: "개인정보",
			terms: "이용약관",
			about: "smail.pw 소개",
		},
		copyright: "깔끔한 메일함, 깔끔한 신원.",
		themeToLight: "☀ 라이트",
		themeToDark: "🌙 다크",
	},
};

const ru: Dictionary = {
	home: {
		title: "Временная почта 24 часа бесплатно без регистрации | smail.pw",
		description:
			"Бесплатный temp mail для регистраций и OTP-кодов. Создайте одноразовый почтовый ящик на 24 часа без аккаунта.",
		keywords:
			"временная почта, одноразовая почта, temp mail, почта 24 часа, без регистрации, otp код, smail.pw",
		heroTag: "Временный ящик",
		heroTitle: "Защитите приватность в один клик.",
		heroDescription:
			"Создайте временный адрес для регистраций и подтверждений, затем удалите его, когда закончите.",
		loadingAddresses: "Загрузка адресов...",
		currentAddress: "Текущий временный адрес",
		copy: "Копировать",
		copied: "Скопировано",
		deleteAddress: "Удалить адрес",
		deleting: "Удаление...",
		generateNew: "Создать новый",
		generating: "Создание...",
		noAddressTitle: "Пока нет временного адреса",
		noAddressDescription:
			"Создайте временный адрес для регистраций и разовых проверок.",
		generateAddress: "Создать адрес",
		stats: {
			lifetimeValue: "24ч",
			refreshValue: "Мгновенно",
			registrationValue: "Ноль",
			lifetime: "Срок",
			refresh: "Обновление",
			registration: "Регистрация",
		},
		inboxTag: "Входящие",
		inboxTitle: "Последние письма",
		tapToOpen: "Нажмите, чтобы открыть",
		loadingEmails: "Загрузка писем...",
		emptyInboxTitle: "Ваш ящик готов",
		emptyInboxDescription:
			"Писем пока нет. Новые сообщения появятся здесь мгновенно.",
		refreshInbox: "Обновить",
		refreshingInbox: "Обновление...",
		lastRefresh: "Последнее обновление",
		safetyHint:
			"Не используйте этот адрес для банковских, рабочих или важных кодов аккаунтов.",
		modal: {
			title: "Предпросмотр",
			from: "От",
			time: "Время",
			loading: "Загрузка...",
			empty: "Нет содержимого",
		},
	},
	layout: {
		siteSubtitle: "временный ящик",
		nav: { home: "Главная", about: "О сервисе", faq: "FAQ" },
		footerTag: "инструменты с фокусом на приватность",
		footerDescription:
			"Одноразовый ящик для подтверждений, тестов и коротких сообщений без раскрытия вашей основной почты.",
		footerLinks: {
			faq: "FAQ",
			privacy: "Конфиденциальность",
			terms: "Условия",
			about: "О smail.pw",
		},
		copyright: "Чистый ящик, чистая идентичность.",
		themeToLight: "☀ Светлая",
		themeToDark: "🌙 Тёмная",
	},
};

const pt: Dictionary = {
	home: {
		title: "Email temporário grátis 24h sem cadastro para OTP | smail.pw",
		description:
			"Gerador de temp mail grátis para cadastro e códigos OTP. Crie uma caixa descartável de 24h instantaneamente.",
		keywords:
			"email temporario, email temporário, email descartavel, temp mail, 24h, sem cadastro, codigo otp, smail.pw",
		heroTag: "Caixa temporária",
		heroTitle: "Proteja sua privacidade com um clique.",
		heroDescription:
			"Gere um endereço temporário para cadastros e verificações e exclua quando terminar.",
		loadingAddresses: "Carregando endereços...",
		currentAddress: "Endereço temporário atual",
		copy: "Copiar",
		copied: "Copiado",
		deleteAddress: "Excluir endereço",
		deleting: "Excluindo...",
		generateNew: "Gerar novo",
		generating: "Gerando...",
		noAddressTitle: "Ainda não há e-mail temporário",
		noAddressDescription:
			"Gere um endereço temporário para cadastros e verificações rápidas.",
		generateAddress: "Gerar endereço",
		stats: {
			lifetimeValue: "24h",
			refreshValue: "Instantâneo",
			registrationValue: "Zero",
			lifetime: "Duração",
			refresh: "Atualização",
			registration: "Cadastro",
		},
		inboxTag: "Caixa de entrada",
		inboxTitle: "E-mails recentes",
		tapToOpen: "Toque para abrir",
		loadingEmails: "Carregando e-mails...",
		emptyInboxTitle: "Sua caixa está pronta",
		emptyInboxDescription:
			"Ainda não há e-mails. Eles aparecerão aqui instantaneamente.",
		refreshInbox: "Atualizar",
		refreshingInbox: "Atualizando...",
		lastRefresh: "Última atualização",
		safetyHint:
			"Não use este endereço para banco, trabalho ou códigos de contas importantes.",
		modal: {
			title: "Pré-visualização",
			from: "De",
			time: "Hora",
			loading: "Carregando...",
			empty: "Sem conteúdo",
		},
	},
	layout: {
		siteSubtitle: "caixa temporária",
		nav: { home: "Início", about: "Sobre", faq: "FAQ" },
		footerTag: "utilitários com foco em privacidade",
		footerDescription:
			"Caixa descartável para verificações, testes e comunicações curtas sem expor seu e-mail principal.",
		footerLinks: {
			faq: "FAQ",
			privacy: "Privacidade",
			terms: "Termos",
			about: "Sobre smail.pw",
		},
		copyright: "Caixa limpa, identidade limpa.",
		themeToLight: "☀ Claro",
		themeToDark: "🌙 Escuro",
	},
};

const ar: Dictionary = {
	home: {
		title: "بريد مؤقت مجاني 24 ساعة بدون تسجيل لاستلام OTP | smail.pw",
		description:
			"مولّد بريد مؤقت مجاني (temp mail) للتسجيل السريع ورموز OTP. أنشئ صندوقًا للاستخدام مرة واحدة لمدة 24 ساعة فورًا.",
		keywords:
			"بريد مؤقت, بريد مؤقت مجاني, بريد للاستخدام مرة واحدة, temp mail, بريد 24 ساعة, بدون تسجيل, رمز otp, smail.pw",
		heroTag: "صندوق مؤقت",
		heroTitle: "احمِ خصوصيتك بنقرة واحدة.",
		heroDescription:
			"أنشئ عنوانًا مؤقتًا للتسجيلات ورسائل التحقق ثم احذفه عند الانتهاء.",
		loadingAddresses: "جارٍ تحميل العناوين...",
		currentAddress: "العنوان المؤقت الحالي",
		copy: "نسخ",
		copied: "تم النسخ",
		deleteAddress: "حذف العنوان",
		deleting: "جارٍ الحذف...",
		generateNew: "إنشاء جديد",
		generating: "جارٍ الإنشاء...",
		noAddressTitle: "لا يوجد بريد مؤقت بعد",
		noAddressDescription: "أنشئ عنوانًا مؤقتًا للتسجيل والتحقق السريع.",
		generateAddress: "إنشاء عنوان",
		stats: {
			lifetimeValue: "24س",
			refreshValue: "فوري",
			registrationValue: "صفر",
			lifetime: "مدة الصلاحية",
			refresh: "التحديث",
			registration: "التسجيل",
		},
		inboxTag: "الوارد",
		inboxTitle: "أحدث الرسائل",
		tapToOpen: "اضغط للفتح",
		loadingEmails: "جارٍ تحميل الرسائل...",
		emptyInboxTitle: "صندوقك بانتظارك",
		emptyInboxDescription: "لا توجد رسائل بعد. ستظهر هنا فور وصولها.",
		refreshInbox: "تحديث",
		refreshingInbox: "جارٍ التحديث...",
		lastRefresh: "آخر تحديث",
		safetyHint:
			"لا تستخدم هذا العنوان للبنوك أو العمل أو رموز الحسابات المهمة.",
		modal: {
			title: "معاينة الرسالة",
			from: "من",
			time: "الوقت",
			loading: "جارٍ التحميل...",
			empty: "لا يوجد محتوى",
		},
	},
	layout: {
		siteSubtitle: "صندوق مؤقت",
		nav: { home: "الرئيسية", about: "حول", faq: "الأسئلة الشائعة" },
		footerTag: "أدوات تركز على الخصوصية",
		footerDescription:
			"صندوق بريد مؤقت للتحقق والاختبار والتواصل القصير دون كشف بريدك الأساسي.",
		footerLinks: {
			faq: "الأسئلة الشائعة",
			privacy: "الخصوصية",
			terms: "الشروط",
			about: "حول smail.pw",
		},
		copyright: "صندوق نظيف، هوية أنظف.",
		themeToLight: "☀ فاتح",
		themeToDark: "🌙 داكن",
	},
};

const messages: Record<Locale, Dictionary> = {
	en,
	zh,
	es,
	fr,
	de,
	ja,
	ko,
	ru,
	pt,
	ar,
};

export function getDictionary(locale: Locale): Dictionary {
	return messages[locale];
}
