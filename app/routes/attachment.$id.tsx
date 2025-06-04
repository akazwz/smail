import { data } from "react-router";
import { getAttachmentById } from "~/lib/db";

import type { Route } from "./+types/attachment.$id";

export async function loader({ params }: Route.LoaderArgs) {
	const { id } = params;

	if (!id) {
		throw new Response("Attachment ID is required", { status: 400 });
	}

	try {
		console.log(`📥 [DOWNLOAD] Attempting to download attachment: ${id}`);

		// 获取附件详情和内容
		const result = await getAttachmentById(id);

		if (!result) {
			console.log(`❌ [DOWNLOAD] Attachment not found: ${id}`);
			throw new Response("Attachment not found", { status: 404 });
		}

		const { attachment, content } = result;

		console.log(
			`📄 [DOWNLOAD] Attachment found: ${attachment.filename} (${attachment.uploadStatus})`,
		);

		// 检查文件内容是否可用
		if (!content) {
			console.log(`❌ [DOWNLOAD] Attachment content not available: ${id}`);
			throw new Response("Attachment file not available", { status: 404 });
		}

		console.log(`✅ [DOWNLOAD] Serving attachment: ${attachment.filename}`);

		// 返回文件流
		return new Response(content.body, {
			headers: {
				"Content-Type": attachment.contentType || "application/octet-stream",
				"Content-Disposition": `attachment; filename="${attachment.filename || "attachment"}"`,
				"Content-Length": attachment.size?.toString() || "",
				"Cache-Control": "public, max-age=3600", // 缓存 1 小时
			},
		});
	} catch (error) {
		console.error("❌ [DOWNLOAD] Error serving attachment:", error);

		if (error instanceof Response) {
			throw error;
		}

		throw new Response("Internal server error", { status: 500 });
	}
}

// 重要：不要导出默认组件，这样React Router就不会渲染HTML
// export default function AttachmentRoute() {
// 	return null;
// }
