import { generateEmailAddress } from "./address.ts";
import { INBOX_MARKER_COOKIE } from "./contract.ts";
import { readEmailBody, readInbox } from "./inbox.ts";
import { receiveEmail } from "./mail.ts";
import { saveMessage } from "./messages.ts";
import {
	loadSession,
	readCookie,
	type SessionState,
	serializeSession,
} from "./session.ts";

export { InboxHub } from "./inbox-hub.ts";

// 所有在线访客连同一个推送中心。以后要分片，只改这一处的取名规则。
const HUB_NAME = "all";

const MARKER_MAX_AGE_SECONDS = 400 * 24 * 60 * 60;

function json(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Cache-Control": "no-store",
		},
	});
}

/** 解不出来的（畸形的 % 编码）当成空字符串，后面自然查不到。 */
function safeDecode(value: string): string {
	try {
		return decodeURIComponent(value);
	} catch {
		return "";
	}
}

/** 新邮件推送的 WebSocket：只有会话里持有地址的同源页面能连上。 */
async function connectLiveInbox(
	request: Request,
	ctx: ExecutionContext,
): Promise<Response> {
	const url = new URL(request.url);
	if (request.headers.get("Origin") !== url.origin) {
		return new Response("Forbidden", { status: 403 });
	}
	const address = (await loadSession(request)).data.addresses[0];
	if (!address) {
		return new Response("No address", { status: 404 });
	}

	const forwarded = new Request(request, {
		headers: new Headers(request.headers),
	});
	forwarded.headers.set("x-inbox-address", address);
	return ctx.exports.InboxHub.getByName(HUB_NAME).fetch(forwarded);
}

async function route(
	request: Request,
	url: URL,
	session: SessionState,
): Promise<Response> {
	const { method } = request;
	const { pathname } = url;

	if (method === "GET" && pathname === "/api/inbox") {
		return json(await readInbox(session.data.addresses));
	}

	if (pathname === "/api/address") {
		if (method === "POST") {
			// keep=1：已经有地址就不动它。页面在“没有地址、点生成”时带这个参数——它可能只是
			// 还不知道这个会话有地址（收件箱没取回来、取失败了、或者是别的标签页生成的），
			// 这时不该把原地址悄悄顶掉。不带参数就是更换：用户确认过了，原地址作废。
			if (
				session.data.addresses.length > 0 &&
				url.searchParams.get("keep") === "1"
			) {
				return json(await readInbox(session.data.addresses));
			}
			const now = Date.now();
			session.data = {
				addresses: [generateEmailAddress()],
				addressIssuedAt: now,
				renewedAt: now,
			};
			session.dirty = true;
			// 把新的收件箱一并带回去，页面不用再来取一次。
			return json(await readInbox(session.data.addresses));
		}
		if (method === "DELETE") {
			session.data = { addresses: [] };
			session.dirty = true;
			return json(await readInbox(session.data.addresses));
		}
	}

	const email = /^\/api\/email\/([^/]+)$/.exec(pathname);
	if (method === "GET" && email) {
		const body = await readEmailBody(
			safeDecode(email[1]!),
			session.data.addresses,
		);
		return body === null
			? json({ error: "not_found" }, 404)
			: new Response(body, {
					headers: {
						"Content-Type": "text/html; charset=utf-8",
						"Cache-Control": "no-store",
						// 邮件是别人写的 HTML。页面把它放在沙箱 iframe 里显示；这个响应头保证
						// 就算有人直接在地址栏打开这个地址，里面的脚本也不会以本站的身份运行。
						"Content-Security-Policy":
							"sandbox allow-popups allow-popups-to-escape-sandbox",
						"X-Content-Type-Options": "nosniff",
					},
				});
	}

	return json({ error: "not_found" }, 404);
}

/** /api/* 的所有接口。页面本身是静态文件，不经过这里。 */
async function handleApi(
	request: Request,
	ctx: ExecutionContext,
): Promise<Response> {
	const url = new URL(request.url);
	if (url.pathname === "/api/inbox/live") {
		return connectLiveInbox(request, ctx);
	}
	// 会改动会话的请求只接受本站页面发来的。
	if (
		request.method !== "GET" &&
		request.method !== "HEAD" &&
		request.headers.get("Origin") !== url.origin
	) {
		return json({ error: "forbidden" }, 403);
	}

	// 留言和会话无关，不读也不写 cookie。
	if (request.method === "POST" && url.pathname === "/api/messages") {
		const outcome = await saveMessage(request);
		if (outcome === "saved") {
			return new Response(null, { status: 204 });
		}
		return json({ error: outcome }, outcome === "too_many" ? 429 : 400);
	}

	const session = await loadSession(request);
	const response = await route(request, url, session);

	if (session.dirty) {
		response.headers.append("Set-Cookie", await serializeSession(session.data));
	}
	// 让页面读得到的那个标记和会话保持一致。
	const marker = session.data.addresses.length > 0 ? "1" : "0";
	if (
		readCookie(request.headers.get("Cookie"), INBOX_MARKER_COOKIE) !== marker
	) {
		response.headers.append(
			"Set-Cookie",
			`${INBOX_MARKER_COOKIE}=${marker}; Max-Age=${MARKER_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`,
		);
	}
	return response;
}

export default {
	async fetch(request, _env, ctx) {
		try {
			return await handleApi(request, ctx);
		} catch (error) {
			console.error("api_failed", String(error));
			return json({ error: "internal" }, 500);
		}
	},
	async email(msg, env, ctx) {
		await receiveEmail(msg, env);

		// 邮件已经存好；通知失败不影响收信，页面上还有手动刷新。
		ctx.waitUntil(
			ctx.exports.InboxHub.getByName(HUB_NAME)
				.notify(msg.to)
				.catch((error: unknown) => {
					console.error("inbox_notify_failed", String(error));
				}),
		);
	},
} satisfies ExportedHandler<Env>;
