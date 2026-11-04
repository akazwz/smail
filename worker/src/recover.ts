import { env } from "cloudflare:workers";

import { normalizeAddress } from "./address.ts";
import { RECOVERY_TOKEN_PATTERN } from "./contract.ts";

// 地址恢复：站长核实归属后签发一条链接（worker/d1.mjs 的 recover 命令），
// 访客在自己的浏览器里点确认，页面把链接里的 token 发到这里兑换。
// 每条链接只能兑换一次，过期或被作废就不能再用。数据库里只有 token 的哈希。

const MAX_REQUEST_LENGTH = 1000;

async function hashToken(token: string): Promise<string> {
	const digest = await crypto.subtle.digest(
		"SHA-256",
		new TextEncoder().encode(token),
	);
	return [...new Uint8Array(digest)]
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
}

/** 兑换一条恢复链接，成功时返回要交还的地址；无效、过期、用过或作废都是 null。 */
export async function redeemRecovery(request: Request): Promise<string | null> {
	const raw = await request.text();
	if (raw.length > MAX_REQUEST_LENGTH) {
		return null;
	}
	let token: unknown;
	try {
		token = (JSON.parse(raw) as { token?: unknown } | null)?.token;
	} catch {
		return null;
	}
	if (typeof token !== "string" || !RECOVERY_TOKEN_PATTERN.test(token)) {
		return null;
	}

	// 一条语句里判断并标记为已兑换：两个请求同时拿同一条链接来，只有一个拿得到地址。
	const now = Date.now();
	const row = await env.D1.prepare(
		`UPDATE recoveries SET redeemed_at = ?1
		WHERE token_hash = ?2 AND redeemed_at IS NULL AND revoked_at IS NULL AND redeem_expires_at > ?1
		RETURNING address`,
	)
		.bind(now, await hashToken(token))
		.first<{ address: string }>();
	return row ? normalizeAddress(row.address) : null;
}
