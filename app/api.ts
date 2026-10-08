import type { Inbox, MessagePayload } from "#contract";

// 收件箱的接口在 Worker 上（见 worker/src/index.ts），页面本身是静态文件。
// 这些函数只在浏览器里调用：构建时渲染页面不会、也不能取任何人的收件箱。

// 和会话有关的请求一个一个发，不并发。
// 地址记在 cookie 里，每个响应都可能重写这个 cookie（到期续期时就会）。两个请求同时在路上，
// 后到的响应会盖掉先到的：一次“取收件箱”如果晚于“更换地址”返回，会把旧地址写回去。
let lastCall: Promise<unknown> = Promise.resolve();

function call(path: string, init?: RequestInit): Promise<Response> {
	const next = lastCall.then(() =>
		fetch(path, { credentials: "same-origin", ...init }),
	);
	// 前一个请求失败不该连累后一个。
	lastCall = next.catch(() => {});
	return next;
}

async function readInbox(path: string, init?: RequestInit): Promise<Inbox> {
	const response = await call(path, init);
	if (!response.ok) {
		throw new Error(`${path} answered ${response.status}`);
	}
	return response.json();
}

export function fetchInbox(): Promise<Inbox> {
	return readInbox("/api/inbox");
}

/**
 * 生成一个地址，返回它的收件箱。
 * `replace` 为 true（用户确认了更换）时原来的地址作废；否则会话里已经有地址的话
 * Worker 不会动它，返回的就是现有的收件箱。
 */
export function generateAddress(replace: boolean): Promise<Inbox> {
	return readInbox(replace ? "/api/address" : "/api/address?keep=1", {
		method: "POST",
	});
}

/** 删除地址，返回删除之后的（空）收件箱。 */
export function deleteAddress(): Promise<Inbox> {
	return readInbox("/api/address", { method: "DELETE" });
}

/** 邮件正文（一份完整的 HTML 文档）；不存在或不属于当前地址时是 null。 */
export async function fetchEmailBody(id: string): Promise<string | null> {
	const path = `/api/email/${encodeURIComponent(id)}`;
	const response = await call(path);
	if (response.status === 404) {
		return null;
	}
	if (!response.ok) {
		throw new Error(`${path} answered ${response.status}`);
	}
	return response.text();
}

/** 提交联系页的留言。"too_many" 表示这个来源或全站的留言数到了上限。 */
export async function sendMessage(
	payload: MessagePayload,
): Promise<"sent" | "too_many"> {
	const response = await fetch("/api/messages", {
		method: "POST",
		credentials: "same-origin",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	if (response.status === 429) {
		return "too_many";
	}
	if (!response.ok) {
		throw new Error(`/api/messages answered ${response.status}`);
	}
	return "sent";
}
