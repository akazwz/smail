import { DurableObject } from "cloudflare:workers";

/**
 * 所有在线访客共用的一个推送中心：只负责把“某个地址来新邮件了”转发给正在看这个地址的浏览器。
 * 它不存任何数据，也不发邮件内容——浏览器收到信号后仍然走 GET /api/inbox 取数。
 *
 * 用的是 WebSocket Hibernation：连接空着的时候对象可以休眠，不计时长费。
 * 每条连接用它的地址做 tag，通知时按 tag 找连接。
 */
export class InboxHub extends DurableObject {
	async fetch(request: Request): Promise<Response> {
		// 地址由 Worker 入口校验过会话后放在这个头里，不接受浏览器自己传的。
		const address = request.headers.get("x-inbox-address");
		if (request.headers.get("Upgrade") !== "websocket" || !address) {
			return new Response("Expected a WebSocket upgrade", { status: 426 });
		}

		const { 0: client, 1: server } = new WebSocketPair();
		this.ctx.acceptWebSocket(server, [address]);
		// 心跳由运行时直接应答，不用唤醒对象。
		this.ctx.setWebSocketAutoResponse(
			new WebSocketRequestResponsePair("ping", "pong"),
		);
		return new Response(null, { status: 101, webSocket: client });
	}

	/** 通知正在看这个地址的所有连接，返回通知到的连接数。 */
	notify(address: string): number {
		const sockets = this.ctx.getWebSockets(address);
		for (const socket of sockets) {
			try {
				socket.send("mail");
			} catch {
				// 对端已经断开，运行时稍后会回收这条连接
			}
		}
		return sockets.length;
	}

	webSocketClose(socket: WebSocket, code: number, reason: string): void {
		try {
			socket.close(code, reason);
		} catch {
			// 已经关闭
		}
	}
}
