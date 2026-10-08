import { env } from "cloudflare:workers";

type SessionData = {
	addresses: string[];
	addressIssuedAt?: number;
	// 上一次把 cookie 重新发给浏览器的时间。
	renewedAt?: number;
};

export type SessionState = {
	data: SessionData;
	dirty: boolean;
};

const SESSION_COOKIE_NAME = "__session";
// 地址长期有效：只要用户不删除、不更换，就一直是这一个。浏览器给 cookie 的寿命上限
// 大约是 400 天，所以隔一段时间重发一次，常来的用户不会到期。
const SESSION_MAX_AGE_SECONDS = 400 * 24 * 60 * 60;
const SESSION_RENEW_AFTER_MS = 7 * 24 * 60 * 60 * 1000;
const encoder = new TextEncoder();

function getSessionSecrets(): string[] {
	const rotatedSecrets = (env.SESSION_SECRETS ?? "")
		.split(",")
		.map((secret) => secret.trim())
		.filter(Boolean);
	if (rotatedSecrets.length > 0) {
		return rotatedSecrets;
	}

	if (import.meta.env.DEV) {
		return ["local-dev-session-secret-change-me"];
	}

	throw new Error(
		"Missing session cookie secret. Set SESSION_SECRETS before starting the app.",
	);
}

function createKey(secret: string, usage: "sign" | "verify") {
	return crypto.subtle.importKey(
		"raw",
		encoder.encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		[usage],
	);
}

function toBinaryString(bytes: Uint8Array): string {
	let result = "";
	for (const byte of bytes) {
		result += String.fromCharCode(byte);
	}
	return result;
}

function fromBinaryString(value: string): Uint8Array<ArrayBuffer> {
	const bytes = new Uint8Array(value.length);
	for (let index = 0; index < value.length; index++) {
		bytes[index] = value.charCodeAt(index);
	}
	return bytes;
}

// Cookie 格式与之前 React Router 的 createCookieSessionStorage 保持一致
// （base64(JSON) + "." + HMAC-SHA256 签名），上线后已有用户的地址不会丢。
async function sign(value: string, secret: string): Promise<string> {
	const key = await createKey(secret, "sign");
	const signature = await crypto.subtle.sign(
		"HMAC",
		key,
		encoder.encode(value),
	);
	const hash = btoa(toBinaryString(new Uint8Array(signature))).replace(
		/=+$/,
		"",
	);
	return `${value}.${hash}`;
}

async function unsign(cookie: string, secret: string): Promise<string | null> {
	const index = cookie.lastIndexOf(".");
	if (index < 0) {
		return null;
	}
	const value = cookie.slice(0, index);
	try {
		const key = await createKey(secret, "verify");
		const valid = await crypto.subtle.verify(
			"HMAC",
			key,
			fromBinaryString(atob(cookie.slice(index + 1))),
			encoder.encode(value),
		);
		return valid ? value : null;
	} catch {
		return null;
	}
}

export function readCookie(
	cookieHeader: string | null,
	name: string,
): string | null {
	if (!cookieHeader) {
		return null;
	}
	for (const pair of cookieHeader.split(";")) {
		const separator = pair.indexOf("=");
		if (separator < 0 || pair.slice(0, separator).trim() !== name) {
			continue;
		}
		try {
			return decodeURIComponent(pair.slice(separator + 1).trim());
		} catch {
			return null;
		}
	}
	return null;
}

function toSessionData(value: unknown): SessionData {
	const record = (value && typeof value === "object" ? value : {}) as Record<
		string,
		unknown
	>;
	const addresses = Array.isArray(record.addresses)
		? record.addresses.filter(
				(address): address is string => typeof address === "string",
			)
		: [];
	const addressIssuedAt =
		typeof record.addressIssuedAt === "number"
			? record.addressIssuedAt
			: undefined;
	const data: SessionData = { addresses };
	if (addressIssuedAt !== undefined) {
		data.addressIssuedAt = addressIssuedAt;
	}
	if (typeof record.renewedAt === "number") {
		data.renewedAt = record.renewedAt;
	}
	return data;
}

async function parseSessionCookie(
	cookieHeader: string | null,
): Promise<SessionData> {
	const cookie = readCookie(cookieHeader, SESSION_COOKIE_NAME);
	if (!cookie) {
		return { addresses: [] };
	}
	// 轮换密钥期间，旧密钥签的 cookie 也要认：每个密钥都验一遍，取第一个验得过的。
	const candidates = await Promise.all(
		getSessionSecrets().map((secret) => unsign(cookie, secret)),
	);
	const value = candidates.find((candidate) => candidate !== null);
	if (value === undefined) {
		return { addresses: [] };
	}
	try {
		const json = new TextDecoder().decode(fromBinaryString(atob(value)));
		return toSessionData(JSON.parse(json));
	} catch {
		return { addresses: [] };
	}
}

/**
 * 读取会话。地址不会过期；这里只负责隔一段时间把 cookie 续上。
 */
export async function loadSession(request: Request): Promise<SessionState> {
	const data = await parseSessionCookie(request.headers.get("Cookie"));
	const state: SessionState = { data, dirty: false };
	if (data.addresses.length === 0) {
		return state;
	}

	const now = Date.now();
	if (!data.addressIssuedAt) {
		data.addressIssuedAt = now;
		state.dirty = true;
	}
	if (!data.renewedAt || now - data.renewedAt >= SESSION_RENEW_AFTER_MS) {
		data.renewedAt = now;
		state.dirty = true;
	}
	return state;
}

export async function serializeSession(data: SessionData): Promise<string> {
	const payload = btoa(toBinaryString(encoder.encode(JSON.stringify(data))));
	const value = await sign(payload, getSessionSecrets()[0]!);
	const attributes = [
		`${SESSION_COOKIE_NAME}=${encodeURIComponent(value)}`,
		`Max-Age=${SESSION_MAX_AGE_SECONDS}`,
		"Path=/",
		"HttpOnly",
		"SameSite=Lax",
	];
	if (!import.meta.env.DEV) {
		attributes.push("Secure");
	}
	return attributes.join("; ");
}
