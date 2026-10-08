import Parser, { type Email as ParsedEmail } from "postal-mime";

// 单封邮件原文的存储上限。超过的只存正文：附件本来就不在页面上展示，丢掉不影响阅读。
const MAX_STORED_BYTES = 5 * 1024 * 1024;

const encoder = new TextEncoder();

function escapeHtml(value: string): string {
	return value.replace(
		/[&<>"']/g,
		(character) =>
			({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
				character
			] ?? character,
	);
}

/** 邮件正文的 HTML：有 HTML 版本就用它，否则把纯文本转义后原样排版。 */
export function toBodyHtml(message: ParsedEmail): string {
	return message.html || `<pre>${escapeHtml(message.text || "")}</pre>`;
}

function toBase64Lines(bytes: Uint8Array): string {
	const lines: string[] = [];
	// 每行 57 字节正好是 76 个 base64 字符。
	for (let offset = 0; offset < bytes.length; offset += 57) {
		let binary = "";
		for (const byte of bytes.subarray(offset, offset + 57)) {
			binary += String.fromCharCode(byte);
		}
		lines.push(btoa(binary));
	}
	return lines.join("\r\n");
}

/** 只含正文的最小邮件：超大的邮件存这个，读取时仍然走同一套解析。 */
function buildBodyOnlyMessage(message: ParsedEmail): Uint8Array {
	let body = encoder.encode(toBodyHtml(message));
	if (body.length > MAX_STORED_BYTES) {
		body = body.subarray(0, MAX_STORED_BYTES);
	}
	return encoder.encode(
		[
			"MIME-Version: 1.0",
			"Content-Type: text/html; charset=utf-8",
			"Content-Transfer-Encoding: base64",
			"",
			toBase64Lines(body),
			"",
		].join("\r\n"),
	);
}

/**
 * 收一封邮件：原文进 R2，元数据进 D1。
 * 先写 R2 再写 D1——列表里出现的邮件一定打得开；D1 失败时把刚写的原文删掉。
 */
export async function receiveEmail(
	msg: ForwardableEmailMessage,
	env: Pick<Env, "D1" | "R2">,
): Promise<void> {
	const raw = await new Response(msg.raw).arrayBuffer();
	const parsed = await new Parser().parse(raw);
	const id = crypto.randomUUID();

	await env.R2.put(
		id,
		raw.byteLength > MAX_STORED_BYTES ? buildBodyOnlyMessage(parsed) : raw,
	);

	try {
		// 发件人名和主题都可能没有；D1 不接受 undefined。
		await env.D1.prepare(
			"INSERT INTO emails (id, to_address, from_name, from_address, subject, time) VALUES (?, ?, ?, ?, ?, ?)",
		)
			.bind(
				id,
				msg.to,
				parsed.from?.name ?? "",
				parsed.from?.address ?? msg.from,
				parsed.subject ?? "",
				Date.now(),
			)
			.run();
	} catch (error) {
		await env.R2.delete(id).catch(() => {});
		throw error;
	}
}
