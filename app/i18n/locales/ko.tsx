import type { ParentProps } from "solid-js";

import { type Dictionary, DictionaryContext } from "../dictionary.ts";

export const dictionary: Dictionary = {
	home: {
		title: "임시 이메일 무료, 가입 없이 OTP 수신 | smail.pw",
		description:
			"smail.pw에서 무료 임시 이메일(temp mail)을 바로 만드세요. 일회용 받은편지함으로 OTP 인증, 빠른 회원가입, 스팸 차단을 해결할 수 있습니다.",
		keywords:
			"임시 이메일, 임시 메일, 일회용 이메일, 일회용 메일, 템프 메일, 임시 이메일 생성기, 가입 없는 이메일, OTP 메일, 인증 메일, smail, smail.pw",
		heroTitle: "탭 한 번으로 만드는 임시 이메일 받은편지함.",
		heroDescription:
			"회원가입과 OTP 코드 수신에 쓸 임시 메일 주소를 몇 초 만에 만드세요. 직접 바꾸기 전까지 주소는 바뀌지 않습니다.",
		copy: "복사",
		copied: "복사됨",
		deleteAddress: "주소 삭제",
		replaceAddress: "주소 교체",
		replaceConfirmTitle: "이 주소를 교체하시겠습니까?",
		deleteConfirmTitle: "이 주소를 삭제하시겠습니까?",
		confirmBody:
			"{address} 주소와 해당 받은편지함을 더 이상 열 수 없습니다. 이 작업은 되돌릴 수 없습니다.",
		generating: "생성 중...",
		noAddressTitle: "아직 일회용 이메일 주소가 없습니다",
		noAddressDescription:
			"회원가입과 일회성 인증에 사용할 임시 주소를 생성하세요.",
		generateAddress: "주소 생성",
		actionFailed: "처리하지 못했습니다. 다시 시도해 주세요.",
		inboxTitle: "최신 메일",
		emptyInboxTitle: "받은편지함이 준비되었습니다",
		emptyInboxDescription:
			"아직 메일이 없습니다. 메일이 도착하면 바로 여기에 표시됩니다.",
		refreshInbox: "새로고침",
		refreshingInbox: "새로고침 중...",
		liveOn: "실시간 수신 중",
		liveOff: "연결이 끊겼습니다. 다시 연결하는 중",
		safetyHint:
			"은행, 업무, 중요한 계정의 인증 코드에는 이 주소를 사용하지 마세요. 주소는 기본적으로 장기간 보관되지만 보장되지는 않습니다.",
		badge: "바뀌지 않는 주소 · 가입 불필요",
		modal: {
			title: "메일 미리보기",
			from: "보낸 사람",
			time: "시간",
			loading: "불러오는 중...",
			empty: "내용 없음",
		},
		narrative: {
			title: "smail.pw 임시 이메일을 쓰는 이유",
			description:
				"smail.pw는 위험도가 낮은 회원가입, OTP 인증, 일회성 다운로드를 위한 무료 임시 이메일 생성기(temp mail)입니다. 몇 초 만에 일회용 받은편지함을 만들 수 있고, 주소는 직접 바꾸기 전까지 그대로 유지됩니다.",
			points: [
				"임시 이메일을 이용한 회원가입과 인증 코드 수신에 적합",
				"가입이나 비밀번호 설정 없이 임시 메일을 바로 사용",
				"새 메일이 자동으로 표시되어 계속 새로고침할 필요 없음",
				"은행, 업무, 본인 확인이 중요한 계정에는 장기적으로 사용하는 이메일을 사용",
			],
		},
		jsonLdDescription:
			"smail.pw는 회원가입과 OTP 인증에 쓸 수 있는 무료 임시 이메일(temp mail) 받은편지함을 제공합니다. 주소는 직접 바꾸기 전까지 그대로 유지됩니다.",
	},
	layout: {
		siteSubtitle: "임시 받은편지함",
		about: "소개",
		faq: "FAQ",
		blog: "블로그",
		contact: "문의",
		privacy: "개인정보 처리방침",
		terms: "이용약관",
		language: "언어",
		copyright: "받은편지함도, 신원도 깔끔하게.",
	},
	common: {
		close: "닫기",
		cancel: "취소",
	},
	guides: {
		title: "인기 임시 이메일 가이드",
		items: [
			{
				label: "가입 없는 임시 이메일",
				path: "/temporary-email-no-registration",
			},
			{
				label: "인증용 일회용 이메일",
				path: "/disposable-email-for-verification",
			},
			{
				label: "회원가입용 임시 이메일",
				path: "/temporary-email-for-registration",
			},
			{
				label: "온라인 임시 이메일",
				path: "/online-temporary-email",
			},
		],
	},
	contact: {
		metaTitle: "문의하기 | smail.pw",
		metaDescription:
			"smail.pw 문의: 질문, 피드백, 제휴 문의를 메시지로 남겨 주세요.",
		title: "지원팀 문의",
		description:
			"아래에 메시지를 남겨 주세요. 질문, 피드백, 제휴 문의 모두 환영합니다.",
		formTitle: "메시지 남기기",
		messageLabel: "메시지",
		messagePlaceholder:
			"어떤 일이 있었는지, 또는 전하고 싶은 내용을 적어 주세요",
		contactLabel: "연락처(선택)",
		contactHint: "답장을 원하실 때만 이메일 주소를 적어 주세요",
		send: "메시지 보내기",
		sending: "보내는 중...",
		sent: "감사합니다. 메시지가 접수되었습니다.",
		tooMany:
			"사용 중인 네트워크에서 보낸 메시지가 너무 많습니다. 나중에 다시 시도해 주세요.",
		failed: "메시지를 보내지 못했습니다. 잠시 후 다시 시도해 주세요.",
		faqHint:
			"문의하시기 전에 먼저 자주 묻는 질문 페이지를 확인해 주세요. 원하는 답변이 이미 있을 수 있습니다.",
		faqCta: "자주 묻는 질문 보기",
		homeCta: "홈으로 돌아가기",
	},
	blog: {
		title: "임시 이메일 가이드, 팁, 문제 해결 | smail.pw",
		description:
			"임시 이메일 사용 가이드, 모범 사례, 인증 및 일회용 받은편지함 관련 문제 해결 팁을 제공합니다.",
		header: "smail.pw 블로그",
		subheader: "임시 이메일 사용자를 위한 가이드와 문제 해결",
		readArticle: "글 읽기",
		prevPage: "이전",
		nextPage: "다음",
		backToBlog: "블로그로 돌아가기",
		relatedPosts: "관련 글",
		postTitleSuffix: " | smail.pw 블로그",
		pageSummary: "{page} / {total}페이지 · 페이지당 글 {size}개",
		readingTime: "읽는 시간 {minutes}분",
		posts: [
			{
				slug: "is-temporary-email-safe",
				title: "임시 이메일은 안전할까? 보호해 주는 것과 그렇지 못한 것",
				description:
					"임시 주소가 보호해 주는 것과 그렇지 못한 것, 그리고 smail.pw가 받은편지함 접근, 보관, 메일 표시를 어떻게 처리하는지 알아봅니다.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "why-websites-block-temporary-email",
				title: "일부 웹사이트가 임시 이메일 주소를 거부하는 이유",
				description:
					"가입 양식이 일회용 주소를 알아내는 방법, 사이트가 차단하는 이유, 임시 주소가 거부되었을 때 실제로 효과가 있는 방법을 알아봅니다.",
				publishedAt: "2026-10-08",
				readingMinutes: 5,
			},
			{
				slug: "how-email-ends-up-on-spam-lists",
				title: "내 이메일 주소가 스팸 목록에 오르는 경로와 막는 방법",
				description:
					"스팸 발송자와 마케팅 담당자가 내 주소를 어디서 얻는지, 어떤 습관이 주소를 새게 하는지, 사이트마다 어떤 주소를 줄지 정하는 간단한 규칙을 알아봅니다.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "temporary-email-best-practices",
				title: "더 안전한 회원가입을 위한 임시 이메일 모범 사례",
				description:
					"스팸을 줄이고, 계정이 잠기는 일을 피하고, 평소 쓰는 메일함을 보호하는 실용적인 임시 이메일 사용법을 알아보세요.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "temporary-email-vs-email-alias",
				title: "임시 이메일 vs 이메일 별칭: 무엇을 써야 할까?",
				description:
					"개인정보 보호, 계정 복구, 장기적인 계정 안전성을 기준으로 임시 받은편지함과 이메일 별칭을 비교합니다.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "otp-email-not-arriving-fixes",
				title: "인증 코드(OTP) 메일이 안 오나요? 빠르게 해결하는 8가지 방법",
				description:
					"인증 메일이 늦어질 때 재전송 문제, 발신 측 차단, 받은편지함 새로고침을 순서대로 점검하는 실용 체크리스트입니다.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
		],
	},
	md: {
		meta: {
			about: {
				title: "smail.pw 소개 | 임시 이메일",
				description:
					"smail.pw 임시 이메일의 작동 방식, 임시 메일을 쓰기 좋은 상황, 일회용 받은편지함을 쓸 때 알아야 할 제한 사항을 확인하세요.",
			},
			faq: {
				title: "자주 묻는 질문 | smail.pw 임시 이메일",
				description:
					"임시 메일 시작 방법, 주소와 메일의 보관 기간, OTP 수신 문제, 일회용 받은편지함의 안전상 제한을 정리한 smail.pw FAQ입니다.",
			},
			privacy: {
				title: "개인정보 처리방침 | smail.pw",
				description:
					"smail.pw가 처리할 수 있는 데이터, 임시 데이터의 보관 기간, 개인정보 처리 방식을 확인하세요.",
			},
			terms: {
				title: "이용약관 | smail.pw",
				description:
					"허용되는 사용 범위, 면책 조항, 서비스 제한 사항 등 smail.pw 이용 조건을 확인하세요.",
			},
			"temporary-email-no-registration": {
				title: "가입 없는 임시 이메일 | smail.pw",
				description:
					"비밀번호도 개인정보도 필요 없는, 가입 없는 임시 메일을 사용하세요. 임시 받은편지함을 즉시 생성하고 몇 초 만에 메일을 받을 수 있습니다.",
			},
			"disposable-email-for-verification": {
				title: "인증용 일회용 이메일(OTP) | smail.pw",
				description:
					"OTP와 인증 메일을 일회용 받은편지함으로 받아, 개인 메일함을 노출하지 않고 스팸 없이 유지하세요.",
			},
			"temporary-email-for-registration": {
				title: "회원가입용 임시 이메일 | smail.pw",
				description:
					"회원가입, 체험판 신청, 일회성 온보딩에 임시 이메일을 사용해 오래 써 온 메일함을 노출하지 마세요.",
			},
			"online-temporary-email": {
				title: "온라인 임시 이메일 즉시 사용 | smail.pw",
				description:
					"인증 링크와 OTP 메일 수신, 일회성 메일 수신에 쓸 온라인 임시 이메일 받은편지함을 즉시 만드세요.",
			},
			"can-temporary-email-send": {
				title: "임시 이메일로 메일을 보낼 수 있나요? | smail.pw",
				description:
					"임시 이메일로 메일을 보낼 수 있는지, 많은 임시 받은편지함이 수신 전용인 이유, 장기적으로 사용하는 이메일이 필요한 경우를 설명합니다.",
			},
			"smail-vs-smailpro": {
				title: "smail.pw vs smailpro | 브랜드 안내",
				description:
					"공식 안내: smail.pw는 독립적인 임시 이메일 서비스이며, smailpro 및 이름이 비슷한 다른 서비스와 관련이 없습니다.",
			},
		},
		breadcrumbHome: "홈",
		cta: {
			title: "지금 임시 받은편지함 시작하기",
			description:
				"탭 한 번으로 일회용 주소를 만든 뒤, 아래에서 가장 많이 찾는 회원가입·OTP 가이드를 확인하세요.",
			action: "임시 이메일 생성",
		},
	},
};

export default function Provider(props: ParentProps) {
	return (
		<DictionaryContext value={dictionary}>{props.children}</DictionaryContext>
	);
}
