import type { ParentProps } from "solid-js";

import { type Dictionary, DictionaryContext } from "../dictionary.ts";

export const dictionary: Dictionary = {
	home: {
		title: "smail.pw Temporary Email - Free Temp Mail for OTP & Sign-Ups",
		description:
			"Generate a free temporary email (temp mail) instantly on smail.pw. Use a disposable inbox for OTP verification, quick sign-ups, and spam control.",
		keywords:
			"smail, smail temp mail, temporary email, temp mail, disposable email, temporary email generator, no registration email, otp email, smail.pw",
		heroTitle: "A temporary email inbox in one tap.",
		heroDescription:
			"Generate a temp mail address for sign-ups and OTP codes in seconds. The address never changes unless you change it.",
		copy: "Copy",
		copied: "Copied",
		deleteAddress: "Delete address",
		replaceAddress: "Replace address",
		replaceConfirmTitle: "Replace this address?",
		deleteConfirmTitle: "Delete this address?",
		confirmBody:
			"You will no longer be able to open {address} or its inbox. This cannot be undone.",
		generating: "Generating...",
		noAddressTitle: "No disposable email yet",
		noAddressDescription:
			"Generate a temporary address to use for sign-ups and one-off verifications.",
		generateAddress: "Generate address",
		actionFailed: "That didn't work. Please try again.",
		inboxTitle: "Latest emails",
		emptyInboxTitle: "Your inbox is waiting",
		emptyInboxDescription:
			"No emails yet. Messages will appear here instantly.",
		refreshInbox: "Refresh",
		refreshingInbox: "Refreshing...",
		liveOn: "Receiving live",
		liveOff: "Disconnected, reconnecting",
		safetyHint:
			"Do not use this address for banking, work, or critical account codes. It is kept long-term by default, with no guarantee.",
		badge: "Address stays the same · No registration",
		modal: {
			title: "Message preview",
			from: "From",
			time: "Time",
			loading: "Loading...",
			empty: "No content",
		},
		narrative: {
			title: "Why use smail.pw temporary email",
			description:
				"smail.pw is a free temporary email generator (temp mail) for low-risk sign-ups, OTP verification, and one-time downloads. Create a disposable inbox in seconds and keep the same address until you change it.",
			points: [
				"Works well for temporary email registration and verification code workflows",
				"No sign-up or password setup for quick temp mail access",
				"New emails show up on their own, with no need to keep refreshing",
				"Use a permanent mailbox for banking, work, and identity-critical accounts",
			],
		},
		jsonLdDescription:
			"smail.pw provides free temporary email (temp mail) inboxes for sign-up and OTP verification, with an address that stays the same until you change it.",
	},
	layout: {
		siteSubtitle: "temporary inbox",
		about: "About",
		faq: "FAQ",
		blog: "Blog",
		contact: "Contact",
		privacy: "Privacy Policy",
		terms: "Terms of Use",
		language: "Language",
		copyright: "Clean inbox, clean identity.",
	},
	common: {
		close: "Close",
		cancel: "Cancel",
	},
	guides: {
		title: "Popular temporary email guides",
		items: [
			{
				label: "Temporary Email No Registration",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Disposable Email for Verification",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Temporary Email for Registration",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Online Temporary Email",
				path: "/online-temporary-email",
			},
		],
	},
	contact: {
		metaTitle: "Contact | smail.pw",
		metaDescription:
			"Contact smail.pw: leave us a message with a question, feedback, or a cooperation request.",
		title: "Contact support",
		description:
			"Leave us a message below. Questions, feedback, and cooperation requests are all welcome.",
		formTitle: "Leave a message",
		messageLabel: "Message",
		messagePlaceholder: "What happened, or what would you like to tell us?",
		contactLabel: "How to reach you (optional)",
		contactHint: "An email address, only if you want a reply",
		send: "Send message",
		sending: "Sending...",
		sent: "Thanks, your message has been received.",
		tooMany:
			"Too many messages have been sent from your network. Please try again later.",
		failed: "The message could not be sent. Please try again in a moment.",
		faqHint:
			"Before contacting us, please check the FAQ page first. Your answer may already be there.",
		faqCta: "Open FAQ",
		homeCta: "Back to homepage",
	},
	blog: {
		title: "Temporary Email Guides, Tips & Fixes | smail.pw",
		description:
			"Temporary email guides, best practices, and troubleshooting tips for verification and disposable inbox workflows.",
		header: "smail.pw Blog",
		subheader: "Guides and troubleshooting for temporary email users",
		readArticle: "Read article",
		prevPage: "Prev",
		nextPage: "Next",
		backToBlog: "Back to blog",
		relatedPosts: "Related posts",
		postTitleSuffix: " | smail.pw Blog",
		pageSummary: "Page {page} of {total} · {size} posts per page",
		readingTime: "{minutes} min read",
		posts: [
			{
				slug: "is-temporary-email-safe",
				title: "Is Temporary Email Safe? What It Protects and What It Doesn't",
				description:
					"What a temporary address protects, what it does not, and how smail.pw handles inbox access, storage, and email display.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "why-websites-block-temporary-email",
				title: "Why Some Websites Reject Temporary Email Addresses",
				description:
					"How sign-up forms detect disposable addresses, why sites block them, and what actually works when your temporary address is refused.",
				publishedAt: "2026-10-08",
				readingMinutes: 5,
			},
			{
				slug: "how-email-ends-up-on-spam-lists",
				title:
					"How Your Email Address Ends Up on Spam Lists (and How to Stop It)",
				description:
					"Where spammers and marketers get your address, which habits leak it, and a simple rule for which address to give each website.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "temporary-email-best-practices",
				title: "Temporary Email Best Practices for Safer Sign-Ups",
				description:
					"Learn practical temporary email best practices to reduce spam, avoid lockouts, and protect your primary inbox.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "temporary-email-vs-email-alias",
				title: "Temporary Email vs Email Alias: Which One Should You Use?",
				description:
					"Compare temporary inboxes and email aliases by privacy, recovery, and long-term account safety.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "otp-email-not-arriving-fixes",
				title: "OTP Email Not Arriving? 8 Fast Fixes That Usually Work",
				description:
					"Troubleshoot delayed verification emails with a practical checklist for resend issues, sender blocks, and inbox refresh flow.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
		],
	},
	md: {
		meta: {
			about: {
				title: "About smail.pw | Temporary Email & Temp Mail Generator",
				description:
					"Learn how smail.pw temporary email works, when to use temp mail, and important limits for disposable inbox workflows.",
			},
			faq: {
				title: "Temporary Email FAQ (OTP, Temp Mail, Delivery) | smail.pw",
				description:
					"Temporary email FAQ covering temp mail setup, how long addresses and messages are kept, OTP delivery issues, and disposable inbox safety limits on smail.pw.",
			},
			privacy: {
				title: "Privacy Policy | smail.pw",
				description:
					"See what data smail.pw may process, how long temporary data is retained, and how privacy is handled.",
			},
			terms: {
				title: "Terms of Use | smail.pw",
				description:
					"Review the terms for using smail.pw, including acceptable use, disclaimers, and service limitations.",
			},
			"temporary-email-no-registration": {
				title:
					"Temporary Email No Registration (No Signup Temp Mail) | smail.pw",
				description:
					"Use no registration temp mail with no password or personal details. Generate a temporary inbox instantly and receive email in seconds.",
			},
			"disposable-email-for-verification": {
				title: "Disposable Email for Verification & OTP | smail.pw",
				description:
					"Receive OTP and verification emails in a disposable email inbox while keeping your personal mailbox private and spam-free.",
			},
			"temporary-email-for-registration": {
				title: "Temporary Email for Registration (Signup Temp Mail) | smail.pw",
				description:
					"Use temporary email for registration flows, trial sign-ups, and one-off onboarding without exposing your long-term mailbox.",
			},
			"online-temporary-email": {
				title: "Online Temporary Email Inbox (Instant Temp Mail) | smail.pw",
				description:
					"Get an online temporary email inbox instantly for verification links, OTP messages, and one-off email reception.",
			},
			"can-temporary-email-send": {
				title:
					"Can Temporary Email Send Messages? (Receive-Only Explained) | smail.pw",
				description:
					"Understand whether temporary email can send messages, why many temp inboxes are receive-only, and when to use a permanent mailbox instead.",
			},
			"smail-vs-smailpro": {
				title: "smail.pw vs smailpro / smail pro | Brand Clarification",
				description:
					"Official clarification: smail.pw is an independent temporary email service and is not affiliated with smailpro or similarly named products.",
			},
		},
		breadcrumbHome: "Home",
		cta: {
			title: "Start your temporary inbox now",
			description:
				"Create a disposable address in one tap, then open the most common registration and OTP guides below.",
			action: "Generate temporary email",
		},
	},
};

export default function Provider(props: ParentProps) {
	return (
		<DictionaryContext value={dictionary}>{props.children}</DictionaryContext>
	);
}
