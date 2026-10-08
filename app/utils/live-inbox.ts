import { createEffect, createMemo, createSignal } from "solid-js";

const LIVE_PATH = "/api/inbox/live";
const PING_INTERVAL_MS = 30_000;
const MAX_RETRY_DELAY_MS = 30_000;

// pending：还没连上过（没有地址，或刚打开页面）；live：连着；offline：断了，正在重连。
type LiveStatus = "pending" | "live" | "offline";

/**
 * 订阅“当前地址来新邮件了”的推送。`address` 变了会换一条连接，没有地址就不连。
 * 收到推送、以及断线重连成功时都会调用 `onMail`——断线期间可能漏掉了通知。
 * 连不上时也会调用一次：可能是这个地址已经不在会话里了（在别的标签页删了、换了），
 * 重新取一次收件箱，`address` 跟着变，这里就不再空连。
 * 返回这条连接此刻的状态。
 */
export function useLiveInbox(
	address: () => string | undefined,
	onMail: () => void,
): () => LiveStatus {
	// 调用方给的往往是从收件箱数据里现算的地址，收件箱每刷新一次它就重算一次。
	// 先记成 memo：地址这个字符串没变就不重连，否则每来一封信都会断开重连，
	// 重连的空档里到的下一封信就收不到通知。
	const target = createMemo(address);
	// 记下状态属于哪个地址：换地址后旧连接的状态自然作废，不用在副作用里清。
	const [link, setLink] = createSignal<{ address: string; live: boolean }>();

	createEffect(target, (current) => {
		if (!current) {
			return;
		}

		let socket: WebSocket | undefined;
		let retryTimer: ReturnType<typeof setTimeout> | undefined;
		let pingTimer: ReturnType<typeof setInterval> | undefined;
		let attempts = 0;
		// 这一轮断线里已经对过账了。
		let resynced = false;
		let stopped = false;

		const connect = () => {
			const url = new URL(LIVE_PATH, location.href);
			url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
			const next = new WebSocket(url);
			socket = next;
			let opened = false;

			next.addEventListener("open", () => {
				opened = true;
				// 第一次连上不用刷新：页面上的数据是刚取的。
				if (attempts > 0) {
					onMail();
				}
				attempts = 0;
				resynced = false;
				setLink({ address: current, live: true });
				pingTimer = setInterval(() => next.send("ping"), PING_INTERVAL_MS);
			});
			next.addEventListener("message", (event) => {
				if (event.data === "mail") {
					onMail();
				}
			});
			next.addEventListener("close", () => {
				clearInterval(pingTimer);
				if (stopped) {
					return;
				}
				setLink({ address: current, live: false });
				// 根本没连上：对一下账。一轮断线里只对一次，
				// 不然推送服务出故障时，每次重试都会多带一次取收件箱的请求。
				if (!opened && !resynced) {
					resynced = true;
					onMail();
				}
				attempts += 1;
				const base = Math.min(1000 * 2 ** (attempts - 1), MAX_RETRY_DELAY_MS);
				// 加一点随机：服务重启时所有在线的页面同时断开，不能又在同一刻一起连回来。
				retryTimer = setTimeout(connect, base * (0.5 + Math.random()));
			});
		};

		connect();

		return () => {
			stopped = true;
			clearTimeout(retryTimer);
			clearInterval(pingTimer);
			socket?.close();
		};
	});

	return () => {
		const current = link();
		if (!current || current.address !== target()) {
			return "pending";
		}
		return current.live ? "live" : "offline";
	};
}
