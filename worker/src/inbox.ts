import { env } from "cloudflare:workers";
import Parser from "postal-mime";

import type { Email, Inbox } from "./contract.ts";
import { toBodyHtml } from "./mail.ts";

function wrapEmailContent(content: string): string {
	return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            margin: 16px;
            color: #333;
            background: white;
        }
        .email-content {
            max-width: 100%;
            word-wrap: break-word;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        a {
            color: #2563eb;
        }
        blockquote {
            border-left: 4px solid #e5e7eb;
            margin: 1em 0;
            padding: 0 1em;
            color: #6b7280;
        }
        pre {
            background: #f3f4f6;
            padding: 1em;
            border-radius: 6px;
            overflow-x: auto;
            white-space: pre-wrap;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
        }
        th, td {
            border: 1px solid #e5e7eb;
            padding: 8px 12px;
            text-align: left;
        }
        th {
            background: #f9fafb;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="email-content">${content}</div>
</body>
</html>`;
}

/**
 * 让邮件里的每个链接都在新标签页打开。
 *
 * 邮件正文显示在一个不能运行脚本的沙箱 iframe 里。链接如果在沙箱里打开，目标网站
 * 也跑不了脚本，验证页面基本都用不了；新标签页则是一个正常的页面。
 * 加 noopener / noreferrer：打开的页面拿不到我们这边的窗口，也看不到来源地址。
 */
function openLinksInNewTab(html: string): Promise<string> {
	return new HTMLRewriter()
		.on("a[href]", {
			element(link) {
				link.setAttribute("target", "_blank");
				link.setAttribute("rel", "noopener noreferrer");
			},
		})
		.on("base", {
			// <base target> 会改掉所有链接的打开方式，去掉这个属性。
			// <base href> 要留着：邮件里的相对链接和图片靠它才指向发件方的网站。
			element(base) {
				base.removeAttribute("target");
			},
		})
		.transform(new Response(html))
		.text();
}

/** 会话里那个地址的收件箱；没有地址就是空的。 */
export async function readInbox(addresses: string[]): Promise<Inbox> {
	const address = addresses[0];
	const emails = address
		? ((
				await env.D1.prepare(
					"SELECT * FROM emails WHERE to_address = ? ORDER BY time DESC LIMIT 100",
				)
					.bind(address)
					.all()
			).results as Email[])
		: [];
	return { addresses, emails, renderedAt: Date.now() };
}

/** 邮件正文（包好的 HTML 文档）；不存在或不属于会话里的地址时返回 null。 */
export async function readEmailBody(
	id: string,
	addresses: string[],
): Promise<string | null> {
	if (!id) {
		return null;
	}
	const mail = await env.D1.prepare("SELECT * FROM emails WHERE id = ?")
		.bind(id)
		.first<Email>();
	if (!mail || !addresses.includes(mail.to_address)) {
		return null;
	}

	const object = await env.R2.get(id);
	if (!object) {
		return null;
	}

	const message = await new Parser().parse(object.body);
	return openLinksInNewTab(wrapEmailContent(toBodyHtml(message)));
}
