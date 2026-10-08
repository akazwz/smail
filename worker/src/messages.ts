import { env } from "cloudflare:workers";

import {
	CONTACT_MAX_LENGTH,
	MESSAGE_MAX_LENGTH,
	type MessagePayload,
} from "./contract.ts";

// 联系页的留言：存进 D1，站长定期来看，不发任何提醒。
// 公开的表单一定会被机器人盯上，所以有三道限制：陷阱字段、同一来源的频率、全站每天的总量。

const MAX_REQUEST_LENGTH = 10_000;
const HOUR_MS = 60 * 60 * 1000;
// 同一来源一小时内最多几条。
const SENDER_HOURLY_LIMIT = 5;
// 全站一天内最多几条：就算被人换着地址刷，表也不会无限变大。
const DAILY_LIMIT = 500;

export type MessageOutcome = "saved" | "invalid" | "too_many";

/** 来源网络地址的单向指纹。掺了密钥再哈希，拿到数据库也还原不出地址。 */
async function fingerprint(request: Request): Promise<string> {
	const address = request.headers.get("CF-Connecting-IP") ?? "unknown";
	const digest = await crypto.subtle.digest(
		"SHA-256",
		new TextEncoder().encode(`${env.SESSION_SECRETS ?? ""}:${address}`),
	);
	return [...new Uint8Array(digest).subarray(0, 16)]
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
}

function text(value: unknown): string {
	return typeof value === "string" ? value.trim() : "";
}

export async function saveMessage(request: Request): Promise<MessageOutcome> {
	// 声明的长度就超了的，不读内容直接拒绝。
	if (Number(request.headers.get("Content-Length")) > MAX_REQUEST_LENGTH) {
		return "invalid";
	}
	const raw = await request.text();
	if (raw.length > MAX_REQUEST_LENGTH) {
		return "invalid";
	}
	let payload: Partial<Record<keyof MessagePayload, unknown>>;
	try {
		payload = JSON.parse(raw);
	} catch {
		return "invalid";
	}
	if (!payload || typeof payload !== "object") {
		return "invalid";
	}

	// 陷阱字段：页面上看不见，人不会填，自动填表的机器人会填。
	// 填了就假装成功，不存也不告诉对方被识破了。
	if (text(payload.extra) !== "") {
		return "saved";
	}

	const message = text(payload.message);
	const contact = text(payload.contact);
	if (
		message.length === 0 ||
		message.length > MESSAGE_MAX_LENGTH ||
		contact.length > CONTACT_MAX_LENGTH
	) {
		return "invalid";
	}
	const locale = /^[a-z]{2}$/.test(text(payload.locale))
		? text(payload.locale)
		: "";

	const sender = await fingerprint(request);
	const now = Date.now();
	const recent = await env.D1.prepare(
		`SELECT
			(SELECT COUNT(*) FROM messages WHERE sender = ?1 AND time > ?2) AS fromSender,
			(SELECT COUNT(*) FROM messages WHERE time > ?3) AS today`,
	)
		.bind(sender, now - HOUR_MS, now - 24 * HOUR_MS)
		.first<{ fromSender: number; today: number }>();
	if (
		recent &&
		(recent.fromSender >= SENDER_HOURLY_LIMIT || recent.today >= DAILY_LIMIT)
	) {
		return "too_many";
	}

	await env.D1.prepare(
		"INSERT INTO messages (id, body, contact, locale, sender, time) VALUES (?, ?, ?, ?, ?, ?)",
	)
		.bind(crypto.randomUUID(), message, contact, locale, sender, now)
		.run();
	return "saved";
}
