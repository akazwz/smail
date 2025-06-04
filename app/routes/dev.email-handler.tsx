import { nanoid } from "nanoid";
import PostalMime from "postal-mime";
import type { ActionFunctionArgs } from "react-router";
import {
	cleanupExpiredEmails,
	createDB,
	getOrCreateMailbox,
	storeEmail,
} from "~/lib/db";

// 开发环境专用的邮件处理路由
// 模拟 Cloudflare Workers 的 email handler 功能

interface ParsedEmail {
	messageId?: string;
	from?: {
		name?: string;
		address?: string;
	};
	to?: Array<{
		name?: string;
		address?: string;
	}>;
	subject?: string;
	text?: string;
	html?: string;
	attachments?: Array<{
		filename?: string;
		mimeType?: string;
		size?: number;
		contentId?: string;
		related?: boolean;
		content?: ArrayBuffer;
	}>;
}

export async function action({ request, context }: ActionFunctionArgs) {
	if (import.meta.env.PROD) {
		// 生产环境不应该使用这个路由
		throw new Response("Not Found", { status: 404 });
	}

	try {
		console.log("🧪 [DEV] Simulating email handler...");

		// 从查询参数获取邮件信息
		const url = new URL(request.url);
		const fromAddress = url.searchParams.get("from");
		const toAddress = url.searchParams.get("to");

		if (!fromAddress || !toAddress) {
			throw new Response("Missing from or to parameter", { status: 400 });
		}

		console.log(`📧 [DEV] Simulated email: ${fromAddress} -> ${toAddress}`);

		// 获取请求体作为原始邮件内容
		const rawEmail = await request.text();
		const rawEmailBuffer = new TextEncoder().encode(rawEmail);

		console.log(`📝 [DEV] Raw email size: ${rawEmailBuffer.length} bytes`);

		// 解析邮件内容
		const parsedEmail = (await PostalMime.parse(rawEmailBuffer)) as ParsedEmail;

		console.log(`📋 [DEV] Parsed subject: ${parsedEmail.subject}`);
		console.log(`👤 [DEV] Parsed from: ${parsedEmail.from?.address}`);

		// 创建数据库实例
		const db = createDB();

		// 获取或创建邮箱记录
		const mailbox = await getOrCreateMailbox(db, toAddress);
		console.log(
			`📦 [DEV] Found/Created mailbox: ${mailbox.id} for ${mailbox.email}`,
		);

		// 获取环境变量（在开发环境中，这些应该指向preview资源）
		const { env } = await import("cloudflare:workers");

		// 使用完整的邮件存储函数，包括R2附件上传
		const emailId = await storeEmail(
			db,
			env.ATTACHMENTS, // 开发环境使用preview R2 bucket
			mailbox.id,
			parsedEmail,
			rawEmail,
			rawEmailBuffer.length,
			toAddress,
		);

		console.log(`✅ [DEV] Email stored successfully with ID: ${emailId}`);

		// 异步清理过期邮件
		cleanupExpiredEmails(db).catch((error) => {
			console.error("❌ [DEV] Failed to cleanup expired emails:", error);
		});

		return Response.json({
			success: true,
			emailId,
			message:
				"Email processed successfully in development mode with R2 storage",
		});
	} catch (error) {
		console.error("❌ [DEV] Error processing email:", error);
		return Response.json(
			{
				success: false,
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
}

export function loader() {
	return Response.json({
		message:
			"Development email handler - use POST to simulate email processing",
	});
}

export default function DevEmailHandler() {
	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-4">📧 开发环境邮件处理器</h1>
			<p className="text-gray-600 mb-4">
				这是一个开发环境专用的邮件处理路由，用于模拟 Cloudflare Workers 的 email
				handler 功能。
			</p>

			<div className="bg-blue-50 p-4 rounded-lg">
				<h2 className="font-semibold mb-2">使用方法：</h2>
				<code className="text-sm bg-gray-100 p-2 rounded block">
					POST
					/dev/email-handler?from=sender@example.com&to=recipient@example.com
				</code>
			</div>

			<div className="mt-4 bg-green-50 p-4 rounded-lg">
				<p className="text-sm text-green-800">
					✅ 开发环境支持完整功能：邮件解析、R2附件上传、数据库存储
				</p>
			</div>

			<div className="mt-4 bg-yellow-50 p-4 rounded-lg">
				<p className="text-sm text-yellow-800">
					⚠️ 注意：这个路由仅在开发环境中可用，生产环境会返回404。
				</p>
			</div>
		</div>
	);
}
