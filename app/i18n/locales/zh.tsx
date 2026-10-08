import type { ParentProps } from "solid-js";

import { type Dictionary, DictionaryContext } from "../dictionary.ts";

export const dictionary: Dictionary = {
	home: {
		title: "临时邮箱生成器 - 免费一次性邮箱免注册收验证码 | smail.pw",
		description:
			"在 smail.pw 一键生成免费临时邮箱（一次性邮箱），免注册即可接收验证码、完成网站注册，让主邮箱少收垃圾邮件。",
		keywords:
			"临时邮箱, 一次性邮箱, 临时邮箱生成器, 免费临时邮箱, 验证码邮箱, 免注册临时邮箱, 在线临时邮箱, 临时邮箱注册, 邮箱生成器",
		heroTitle: "免费临时邮箱：一键生成，马上收信。",
		heroDescription:
			"适合注册、验证码与一次性下载。地址不会自己变，除非你主动更换。",
		copy: "复制",
		copied: "已复制",
		deleteAddress: "删除地址",
		replaceAddress: "更换地址",
		replaceConfirmTitle: "更换这个地址？",
		deleteConfirmTitle: "删除这个地址？",
		confirmBody: "之后将无法再打开 {address} 和它的收件箱，而且不能恢复。",
		generating: "生成中...",
		noAddressTitle: "还没有临时邮箱",
		noAddressDescription: "生成一个临时地址，用于注册和一次性验证。",
		generateAddress: "生成地址",
		actionFailed: "没有成功，请再试一次。",
		inboxTitle: "最新邮件",
		emptyInboxTitle: "正在等待新邮件",
		emptyInboxDescription: "暂时没有邮件，收到后会立即显示在这里。",
		refreshInbox: "刷新",
		refreshingInbox: "刷新中...",
		liveOn: "实时接收中",
		liveOff: "连接已断开，正在重连",
		safetyHint:
			"请勿用于银行、工作或重要账号验证码。地址和邮件默认长期保留，但不做保证。",
		badge: "地址 长期有效 · 零门槛 无需注册",
		modal: {
			title: "邮件预览",
			from: "发件人",
			time: "时间",
			loading: "加载中...",
			empty: "暂无内容",
		},
		narrative: {
			title: "为什么选择 smail.pw 临时邮箱",
			description:
				"smail.pw 是免费的临时邮箱生成器，适合低风险注册、接收验证码（OTP）和一次性下载。几秒钟就能生成一个一次性邮箱，地址在你主动更换之前不会变。",
			points: [
				"适合用临时邮箱注册账号、接收验证码",
				"不用注册，不用设密码，打开就能用",
				"新邮件会自动出现，不用反复刷新",
				"银行、工作和涉及身份的重要账号，请使用长期邮箱",
			],
		},
		jsonLdDescription:
			"smail.pw 提供免费临时邮箱（一次性邮箱），可用于注册和接收验证码，地址在你主动更换之前保持不变。",
	},
	layout: {
		siteSubtitle: "临时收件箱",
		about: "关于",
		faq: "常见问题",
		blog: "博客",
		contact: "联系",
		privacy: "隐私政策",
		terms: "使用条款",
		language: "语言",
		copyright: "让邮箱更干净，让身份更安全。",
	},
	common: {
		close: "关闭",
		cancel: "取消",
	},
	guides: {
		title: "热门临时邮箱指南",
		items: [
			{
				label: "免注册临时邮箱",
				path: "/temporary-email-no-registration",
			},
			{
				label: "接收验证码的一次性邮箱",
				path: "/disposable-email-for-verification",
			},
			{
				label: "临时邮箱注册指南",
				path: "/temporary-email-for-registration",
			},
			{
				label: "在线临时邮箱",
				path: "/online-temporary-email",
			},
		],
	},
	contact: {
		metaTitle: "联系我们 | smail.pw",
		metaDescription: "联系 smail.pw：给我们留言，问题反馈、建议和合作都欢迎。",
		title: "联系我们",
		description: "直接在下面留言就行。问题反馈、建议和合作都欢迎。",
		formTitle: "给我们留言",
		messageLabel: "留言内容",
		messagePlaceholder: "遇到了什么问题，或者想告诉我们什么？",
		contactLabel: "联系方式（选填）",
		contactHint: "邮箱地址，需要回复时再填",
		send: "提交留言",
		sending: "提交中...",
		sent: "已收到你的留言，谢谢。",
		tooMany: "来自你所在网络的留言太多了，请稍后再试。",
		failed: "留言没有发出去，请稍后再试。",
		faqHint: "联系我们之前，建议先看看常见问题页面，那里可能已经有答案。",
		faqCta: "查看常见问题",
		homeCta: "返回首页",
	},
	blog: {
		title: "临时邮箱使用指南、技巧与问题排查 | smail.pw",
		description:
			"临时邮箱的使用指南、最佳实践和排查技巧，帮你顺利接收验证码、用好一次性邮箱。",
		header: "smail.pw 博客",
		subheader: "写给临时邮箱用户的使用指南与问题排查",
		readArticle: "阅读全文",
		prevPage: "上一页",
		nextPage: "下一页",
		backToBlog: "返回博客",
		relatedPosts: "相关文章",
		postTitleSuffix: " | smail.pw 博客",
		pageSummary: "第 {page} / {total} 页 · 每页 {size} 篇",
		readingTime: "{minutes} 分钟阅读",
		posts: [
			{
				slug: "is-temporary-email-safe",
				title: "临时邮箱安全吗？它能保护什么，不能保护什么",
				description:
					"临时邮箱能保护什么、保护不了什么，以及 smail.pw 在收件箱访问、存储和邮件显示上是怎么做的。",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "why-websites-block-temporary-email",
				title: "为什么有些网站不接受临时邮箱",
				description:
					"注册表单是怎么认出一次性邮箱的，网站为什么要屏蔽，以及临时邮箱被拒之后真正管用的办法。",
				publishedAt: "2026-10-08",
				readingMinutes: 5,
			},
			{
				slug: "how-email-ends-up-on-spam-lists",
				title: "你的邮箱地址是怎么进到垃圾邮件名单里的（以及怎么防）",
				description:
					"发垃圾邮件和做营销的人从哪里拿到你的地址，哪些习惯会把它泄露出去，以及一条判断“这个网站该给哪个邮箱”的简单规则。",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "temporary-email-best-practices",
				title: "临时邮箱最佳实践：更安全地完成注册",
				description:
					"几条实用的临时邮箱使用建议：减少垃圾邮件，避免账号登不上，保护好主邮箱。",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "temporary-email-vs-email-alias",
				title: "临时邮箱 vs 邮箱别名：到底该用哪种？",
				description:
					"从隐私、账号找回和长期账号安全三个方面，比较临时邮箱和邮箱别名。",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "otp-email-not-arriving-fixes",
				title: "收不到验证码邮件？8 个通常管用的解决办法",
				description:
					"验证码邮件迟迟不到？按这份清单逐项排查：重新发送、发件方屏蔽、刷新收件箱。",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
		],
	},
	md: {
		meta: {
			about: {
				title: "关于 smail.pw | 临时邮箱生成器",
				description:
					"了解 smail.pw 临时邮箱怎么用、适合哪些场景，以及一次性邮箱不适合用来做什么。",
			},
			faq: {
				title: "临时邮箱常见问题（验证码/收信/注册）| smail.pw",
				description:
					"smail.pw 临时邮箱常见问题：怎么生成地址、地址和邮件保留多久、收不到验证码怎么办，以及一次性邮箱的安全限制。",
			},
			privacy: {
				title: "隐私政策 | smail.pw",
				description:
					"了解 smail.pw 可能处理哪些数据、这些数据保留多久，以及我们如何对待你的隐私。",
			},
			terms: {
				title: "使用条款 | smail.pw",
				description:
					"smail.pw 的使用条款，包括可接受的使用方式、免责声明和服务限制。",
			},
			"temporary-email-no-registration": {
				title: "免注册临时邮箱（无需注册）| smail.pw",
				description:
					"免注册临时邮箱：不用密码，不用填个人信息，一键生成临时收件箱，几秒钟就能收到邮件。",
			},
			"disposable-email-for-verification": {
				title: "验证码一次性邮箱（OTP 临时邮箱）| smail.pw",
				description:
					"用一次性邮箱接收验证码（OTP）和验证邮件，不暴露个人邮箱，也不给它招来垃圾邮件。",
			},
			"temporary-email-for-registration": {
				title: "注册用临时邮箱（临时邮箱注册）| smail.pw",
				description:
					"注册账号、开通试用或只用一次的服务时，用临时邮箱接收验证邮件，不必暴露长期使用的邮箱。",
			},
			"online-temporary-email": {
				title: "在线临时邮箱（即时收信）| smail.pw",
				description:
					"打开网页就能用的在线临时邮箱，用来接收验证链接、验证码（OTP）和一次性邮件。",
			},
			"can-temporary-email-send": {
				title: "临时邮箱可以发送邮件吗？| smail.pw",
				description:
					"临时邮箱能不能发邮件？为什么多数临时邮箱只能收信，以及什么时候该改用长期邮箱。",
			},
			"smail-vs-smailpro": {
				title: "smail.pw 与 smailpro / smail pro 关系说明",
				description:
					"官方说明：smail.pw 是独立的临时邮箱服务，与 smailpro 及其他名称相近的产品没有任何关联。",
			},
		},
		breadcrumbHome: "首页",
		cta: {
			title: "立即开始使用临时邮箱",
			description:
				"一键生成一次性邮箱地址，再看看下面最常用的注册和验证码指南。",
			action: "生成临时邮箱",
		},
	},
};

export default function Provider(props: ParentProps) {
	return (
		<DictionaryContext value={dictionary}>{props.children}</DictionaryContext>
	);
}
