import type { ParentProps } from "solid-js";

import { type Dictionary, DictionaryContext } from "../dictionary.ts";

export const dictionary: Dictionary = {
	home: {
		title: "smail.pw - Email tạm thời, mail ảo miễn phí nhận mã OTP",
		description:
			"Tạo email tạm thời (mail ảo, temp mail) miễn phí ngay trên smail.pw. Dùng hộp thư dùng một lần để nhận mã OTP, đăng ký nhanh và hạn chế thư rác.",
		keywords:
			"smail, smail temp mail, email tạm thời, mail ảo, temp mail, email dùng một lần, tạo email tạm thời, email không cần đăng ký, email nhận mã OTP, smail.pw",
		heroTitle: "Hộp thư email tạm thời chỉ với một chạm.",
		heroDescription:
			"Tạo địa chỉ mail ảo để đăng ký tài khoản và nhận mã OTP trong vài giây. Địa chỉ không bao giờ thay đổi trừ khi bạn tự đổi.",
		copy: "Sao chép",
		copied: "Đã sao chép",
		deleteAddress: "Xóa địa chỉ",
		replaceAddress: "Đổi địa chỉ",
		replaceConfirmTitle: "Đổi địa chỉ này?",
		deleteConfirmTitle: "Xóa địa chỉ này?",
		confirmBody:
			"Bạn sẽ không thể mở {address} hay hộp thư của địa chỉ này nữa. Thao tác này không thể hoàn tác.",
		generating: "Đang tạo...",
		noAddressTitle: "Chưa có email dùng một lần",
		noAddressDescription:
			"Tạo một địa chỉ tạm thời để đăng ký tài khoản và xác minh một lần.",
		generateAddress: "Tạo địa chỉ",
		actionFailed: "Không thực hiện được. Vui lòng thử lại.",
		inboxTitle: "Thư mới nhất",
		emptyInboxTitle: "Hộp thư của bạn đang chờ thư",
		emptyInboxDescription:
			"Chưa có thư nào. Thư mới sẽ hiện ở đây ngay lập tức.",
		refreshInbox: "Làm mới",
		refreshingInbox: "Đang làm mới...",
		liveOn: "Đang nhận thư trực tiếp",
		liveOff: "Mất kết nối, đang kết nối lại",
		safetyHint:
			"Đừng dùng địa chỉ này cho ngân hàng, công việc hay mã của các tài khoản quan trọng. Mặc định địa chỉ được lưu lâu dài, nhưng không có gì bảo đảm.",
		badge: "Địa chỉ không tự đổi · Không cần đăng ký",
		modal: {
			title: "Xem thư",
			from: "Từ",
			time: "Thời gian",
			loading: "Đang tải...",
			empty: "Không có nội dung",
		},
		narrative: {
			title: "Vì sao nên dùng email tạm thời smail.pw",
			description:
				"smail.pw là công cụ tạo email tạm thời (mail ảo, temp mail) miễn phí cho việc đăng ký ít rủi ro, nhận mã OTP và tải xuống một lần. Tạo hộp thư dùng một lần trong vài giây và giữ nguyên địa chỉ cho đến khi bạn đổi.",
			points: [
				"Phù hợp để đăng ký bằng email tạm thời và nhận mã xác minh",
				"Không cần đăng ký hay đặt mật khẩu, có mail ảo dùng ngay",
				"Thư mới tự hiện ra, không cần làm mới liên tục",
				"Hãy dùng hộp thư lâu dài cho ngân hàng, công việc và các tài khoản gắn với danh tính",
			],
		},
		jsonLdDescription:
			"smail.pw cung cấp hộp thư email tạm thời (mail ảo) miễn phí để đăng ký và nhận mã OTP, với địa chỉ giữ nguyên cho đến khi bạn đổi.",
	},
	layout: {
		siteSubtitle: "hộp thư tạm thời",
		about: "Giới thiệu",
		faq: "Hỏi đáp",
		blog: "Blog",
		contact: "Liên hệ",
		privacy: "Chính sách quyền riêng tư",
		terms: "Điều khoản sử dụng",
		language: "Ngôn ngữ",
		copyright: "Hộp thư gọn gàng, danh tính kín đáo.",
	},
	common: {
		close: "Đóng",
		cancel: "Hủy",
	},
	guides: {
		title: "Hướng dẫn email tạm thời phổ biến",
		items: [
			{
				label: "Email tạm thời không cần đăng ký",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Email dùng một lần để xác minh",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Email tạm thời để đăng ký tài khoản",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Email tạm thời trực tuyến",
				path: "/online-temporary-email",
			},
		],
	},
	contact: {
		metaTitle: "Liên hệ | smail.pw",
		metaDescription:
			"Liên hệ smail.pw: để lại lời nhắn nếu bạn có câu hỏi, góp ý hoặc đề nghị hợp tác.",
		title: "Liên hệ hỗ trợ",
		description:
			"Hãy để lại lời nhắn bên dưới. Câu hỏi, góp ý và đề nghị hợp tác đều được chào đón.",
		formTitle: "Để lại lời nhắn",
		messageLabel: "Lời nhắn",
		messagePlaceholder:
			"Đã xảy ra chuyện gì, hoặc bạn muốn nói gì với chúng tôi?",
		contactLabel: "Cách liên hệ với bạn (không bắt buộc)",
		contactHint: "Địa chỉ email, chỉ khi bạn muốn được trả lời",
		send: "Gửi lời nhắn",
		sending: "Đang gửi...",
		sent: "Cảm ơn bạn, chúng tôi đã nhận được lời nhắn.",
		tooMany:
			"Đã có quá nhiều lời nhắn được gửi từ mạng của bạn. Vui lòng thử lại sau.",
		failed: "Không gửi được lời nhắn. Vui lòng thử lại sau giây lát.",
		faqHint:
			"Trước khi liên hệ, bạn hãy xem trang Hỏi đáp trước. Có thể câu trả lời đã có sẵn ở đó.",
		faqCta: "Mở trang Hỏi đáp",
		homeCta: "Về trang chủ",
	},
	blog: {
		title: "Hướng dẫn, mẹo và cách sửa lỗi email tạm thời | smail.pw",
		description:
			"Hướng dẫn dùng email tạm thời, kinh nghiệm thực tế và mẹo xử lý sự cố khi xác minh và dùng hộp thư dùng một lần.",
		header: "Blog smail.pw",
		subheader: "Hướng dẫn và cách xử lý sự cố cho người dùng email tạm thời",
		readArticle: "Đọc bài viết",
		prevPage: "Trước",
		nextPage: "Sau",
		backToBlog: "Quay lại blog",
		relatedPosts: "Bài viết liên quan",
		postTitleSuffix: " | Blog smail.pw",
		pageSummary: "Trang {page}/{total} · {size} bài mỗi trang",
		readingTime: "{minutes} phút đọc",
		posts: [
			{
				slug: "is-temporary-email-safe",
				title:
					"Email tạm thời có an toàn không? Những gì nó bảo vệ và không bảo vệ",
				description:
					"Địa chỉ tạm thời bảo vệ những gì, không bảo vệ những gì, và smail.pw xử lý quyền mở hộp thư, việc lưu trữ và cách hiển thị email ra sao.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "why-websites-block-temporary-email",
				title: "Vì sao một số trang web từ chối địa chỉ email tạm thời",
				description:
					"Biểu mẫu đăng ký phát hiện địa chỉ dùng một lần ra sao, vì sao trang web chặn chúng và cách nào thực sự hiệu quả khi địa chỉ tạm thời bị từ chối.",
				publishedAt: "2026-10-08",
				readingMinutes: 5,
			},
			{
				slug: "how-email-ends-up-on-spam-lists",
				title:
					"Địa chỉ email của bạn lọt vào danh sách thư rác như thế nào (và cách ngăn chặn)",
				description:
					"Kẻ phát tán thư rác và bên tiếp thị lấy địa chỉ của bạn từ đâu, thói quen nào làm lộ nó, và một quy tắc đơn giản để chọn địa chỉ cho từng trang web.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "temporary-email-best-practices",
				title: "Kinh nghiệm dùng email tạm thời để đăng ký an toàn hơn",
				description:
					"Tìm hiểu các kinh nghiệm thực tế khi dùng email tạm thời để giảm thư rác, tránh bị khóa tài khoản và bảo vệ hộp thư chính.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "temporary-email-vs-email-alias",
				title: "Email tạm thời và bí danh email: nên dùng loại nào?",
				description:
					"So sánh hộp thư tạm thời và bí danh email (email alias) về quyền riêng tư, khả năng khôi phục và độ an toàn lâu dài của tài khoản.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "otp-email-not-arriving-fixes",
				title: "Không nhận được email OTP? 8 cách xử lý nhanh thường hiệu quả",
				description:
					"Xử lý email xác minh đến chậm bằng danh sách kiểm tra thực tế: lỗi gửi lại mã, bị bên gửi chặn và cách làm mới hộp thư.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
		],
	},
	md: {
		meta: {
			about: {
				title: "Giới thiệu smail.pw | Email tạm thời & tạo mail ảo",
				description:
					"Tìm hiểu cách email tạm thời smail.pw hoạt động, khi nào nên dùng mail ảo và những giới hạn quan trọng của hộp thư dùng một lần.",
			},
			faq: {
				title: "Hỏi đáp email tạm thời (OTP, mail ảo, nhận thư) | smail.pw",
				description:
					"Hỏi đáp về email tạm thời smail.pw: cách tạo mail ảo, địa chỉ và thư được lưu bao lâu, lỗi nhận mã OTP và giới hạn an toàn của hộp thư dùng một lần.",
			},
			privacy: {
				title: "Chính sách quyền riêng tư | smail.pw",
				description:
					"Xem smail.pw có thể xử lý những dữ liệu nào, dữ liệu tạm thời được lưu bao lâu và quyền riêng tư được xử lý ra sao.",
			},
			terms: {
				title: "Điều khoản sử dụng | smail.pw",
				description:
					"Xem điều khoản sử dụng smail.pw, gồm quy định sử dụng hợp lệ, tuyên bố miễn trừ và các giới hạn của dịch vụ.",
			},
			"temporary-email-no-registration": {
				title: "Email tạm thời không cần đăng ký (mail ảo) | smail.pw",
				description:
					"Dùng mail ảo không cần đăng ký, không mật khẩu, không thông tin cá nhân. Tạo hộp thư tạm thời tức thì và nhận email trong vài giây.",
			},
			"disposable-email-for-verification": {
				title: "Email dùng một lần để xác minh & nhận mã OTP | smail.pw",
				description:
					"Nhận mã OTP và email xác minh trong hộp thư dùng một lần, giữ cho hộp thư cá nhân của bạn riêng tư và không có thư rác.",
			},
			"temporary-email-for-registration": {
				title: "Email tạm thời để đăng ký tài khoản (mail ảo) | smail.pw",
				description:
					"Dùng email tạm thời khi đăng ký, tạo tài khoản dùng thử và các lần đăng ký một lần mà không để lộ hộp thư lâu dài của bạn.",
			},
			"online-temporary-email": {
				title: "Email tạm thời online (mail ảo dùng ngay) | smail.pw",
				description:
					"Có ngay hộp thư email tạm thời trực tuyến để nhận liên kết xác minh, mã OTP và nhận thư một lần.",
			},
			"can-temporary-email-send": {
				title: "Email tạm thời có gửi thư được không? | smail.pw",
				description:
					"Tìm hiểu email tạm thời có gửi thư được không, vì sao nhiều mail ảo chỉ nhận thư và khi nào nên dùng hộp thư lâu dài.",
			},
			"smail-vs-smailpro": {
				title: "smail.pw và smailpro / smail pro | Làm rõ thương hiệu",
				description:
					"Thông tin chính thức: smail.pw là dịch vụ email tạm thời độc lập, không liên kết với smailpro hay các sản phẩm có tên tương tự.",
			},
		},
		breadcrumbHome: "Trang chủ",
		cta: {
			title: "Bắt đầu dùng hộp thư tạm thời ngay",
			description:
				"Tạo địa chỉ dùng một lần chỉ với một chạm, rồi xem các hướng dẫn đăng ký và nhận OTP phổ biến nhất bên dưới.",
			action: "Tạo email tạm thời",
		},
	},
};

export default function Provider(props: ParentProps) {
	return (
		<DictionaryContext value={dictionary}>{props.children}</DictionaryContext>
	);
}
