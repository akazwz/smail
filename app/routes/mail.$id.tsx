import {
	ArrowLeft,
	Download,
	File,
	FileText,
	Image,
	Loader2,
	Paperclip,
} from "lucide-react";
import React from "react";
import { Link, data, useNavigation } from "react-router";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import {
	createDB,
	getEmailAttachments,
	getEmailById,
	markEmailAsRead,
} from "~/lib/db";

import type { Route } from "./+types/mail.$id";

// 生成邮件 HTML 内容
function generateEmailHTML(email: {
	fromAddress: string;
	toAddress: string;
	subject?: string | null;
	htmlContent?: string | null;
	textContent?: string | null;
	receivedAt: Date;
}) {
	const content =
		email.htmlContent || email.textContent?.replace(/\n/g, "<br>") || "";

	return `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>邮件内容</title>
			<style>
				body {
					font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
					line-height: 1.6;
					margin: 20px;
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
					text-decoration: underline;
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
			<div class="email-content">
				${content}
			</div>
			<script>
				// 自动调整 iframe 高度
				function resizeIframe() {
					const height = document.body.scrollHeight;
					window.parent.postMessage({ type: 'resize', height }, '*');
				}
				
				// 页面加载完成后调整高度
				if (document.readyState === 'loading') {
					document.addEventListener('DOMContentLoaded', resizeIframe);
				} else {
					resizeIframe();
				}
				
				// 监听内容变化
				const observer = new MutationObserver(resizeIframe);
				observer.observe(document.body, { 
					childList: true, 
					subtree: true,
					attributes: true 
				});
			</script>
		</body>
		</html>
	`;
}

// 根据文件类型返回图标
function getFileIcon(filename?: string | null, contentType?: string | null) {
	if (!filename && !contentType) return <File className="w-4 h-4" />;

	const extension = filename?.toLowerCase().split(".").pop();
	const mimeType = contentType?.toLowerCase();

	if (
		mimeType?.startsWith("image/") ||
		["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension || "")
	) {
		return <Image className="w-4 h-4" />;
	}

	if (
		mimeType?.includes("text/") ||
		["txt", "md", "html", "css", "js", "json"].includes(extension || "")
	) {
		return <FileText className="w-4 h-4" />;
	}

	return <File className="w-4 h-4" />;
}

// 格式化文件大小
function formatFileSize(bytes?: number | null) {
	if (!bytes) return "Unknown size";
	const sizes = ["Bytes", "KB", "MB", "GB"];
	if (bytes === 0) return "0 Bytes";
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${Math.round((bytes / 1024 ** i) * 100) / 100} ${sizes[i]}`;
}

export function meta({ data }: Route.MetaArgs) {
	if (!data?.email) {
		return [
			{ title: "邮件详情 - Smail临时邮箱" },
			{
				name: "description",
				content: "查看您在Smail临时邮箱中收到的邮件详情。",
			},
			// 即使是404页面也要阻止索引
			{ name: "robots", content: "noindex, nofollow, noarchive, nosnippet, noimageindex" },
			{ name: "googlebot", content: "noindex, nofollow, noarchive, nosnippet, noimageindex" },
			{ name: "bingbot", content: "noindex, nofollow, noarchive, nosnippet, noimageindex" },
		];
	}

	const { email } = data;
	const fromDomain = email.fromAddress.split("@")[1] || "未知发件人";
	const shortSubject = email.subject?.substring(0, 30) || "无主题";

	return [
		{ title: `${shortSubject} - 来自${fromDomain}的邮件 | Smail临时邮箱` },
		{
			name: "description",
			content: `查看来自${email.fromAddress}的邮件"${email.subject || "无主题"}"。接收时间：${new Date(email.receivedAt).toLocaleDateString("zh-CN")}。`,
		},
		// 阻止搜索引擎索引邮件内容页面
		{ name: "robots", content: "noindex, nofollow, noarchive, nosnippet, noimageindex" },
		{ name: "googlebot", content: "noindex, nofollow, noarchive, nosnippet, noimageindex" },
		{ name: "bingbot", content: "noindex, nofollow, noarchive, nosnippet, noimageindex" },
		// 阻止缓存
		{ "http-equiv": "cache-control", content: "no-cache, no-store, must-revalidate" },
		{ "http-equiv": "pragma", content: "no-cache" },
		{ "http-equiv": "expires", content: "0" },
	];
}

export async function loader({ params, context }: Route.LoaderArgs) {
	const { id } = params;

	if (!id) {
		throw new Response("邮件 ID 是必需的", { status: 400 });
	}

	try {
		const db = createDB();

		// 获取邮件详情
		const email = await getEmailById(db, id);

		if (!email) {
			throw new Response("邮件未找到", { status: 404 });
		}

		// 获取附件列表
		const attachments = await getEmailAttachments(db, id);

		// 标记邮件为已读
		if (!email.isRead) {
			await markEmailAsRead(db, id);
		}

		// 生成邮件 HTML 内容
		const emailHTML = generateEmailHTML(email);

		return data({
			email,
			attachments,
			emailHTML,
		});
	} catch (error) {
		console.error("Error loading email:", error);

		if (error instanceof Response) {
			throw error;
		}

		throw new Response("服务器错误", { status: 500 });
	}
}

export default function MailDetail({ loaderData }: Route.ComponentProps) {
	const navigation = useNavigation();
	const { email, attachments, emailHTML } = loaderData;

	// 格式化日期
	const formattedDate = new Date(email.receivedAt).toLocaleString("zh-CN", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});

	// 处理 iframe 高度调整
	const handleIframeMessage = React.useCallback((event: MessageEvent) => {
		if (event.data.type === "resize") {
			const iframe = document.getElementById(
				"email-content-iframe",
			) as HTMLIFrameElement;
			if (iframe) {
				iframe.style.height = `${event.data.height}px`;
			}
		}
	}, []);

	// 监听来自 iframe 的消息
	React.useEffect(() => {
		window.addEventListener("message", handleIframeMessage);
		return () => window.removeEventListener("message", handleIframeMessage);
	}, [handleIframeMessage]);

	return (
		<div className="h-screen bg-gray-50 flex flex-col">
			{/* Header */}
			<header className="bg-white border-b px-3 sm:px-4 py-3 shrink-0">
				<div className="w-full flex items-center justify-between">
					<div className="flex items-center gap-2 sm:gap-3">
						<Button
							asChild
							variant="ghost"
							size="sm"
							className="text-xs sm:text-sm p-1 sm:p-2"
						>
							<Link to="/">
								<ArrowLeft className="w-3 sm:w-4 h-3 sm:h-4" />
								<span className="hidden sm:inline ml-1">返回收件箱</span>
								<span className="sm:hidden">返回</span>
							</Link>
						</Button>
						<Separator orientation="vertical" className="h-4 sm:h-6" />
						<span className="text-xs sm:text-sm text-gray-600">邮件详情</span>
					</div>

					<div className="flex items-center gap-2">
						{navigation.state === "loading" && (
							<Loader2 className="w-3 sm:w-4 h-3 sm:h-4 animate-spin" />
						)}
					</div>
				</div>
			</header>

			{/* Email Header - Compact */}
			<div className="bg-white border-b px-3 sm:px-4 py-3 shrink-0">
				<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
					<div className="flex-1 min-w-0">
						<h1 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 break-words">
							{email.subject || "(无主题)"}
						</h1>
						<div className="space-y-1 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-4 text-xs sm:text-sm text-gray-600">
							<div className="truncate">
								<strong>发件人:</strong> {email.fromAddress}
							</div>
							<div className="truncate">
								<strong>收件人:</strong> {email.toAddress}
							</div>
							<div>
								<strong>时间:</strong> {formattedDate}
							</div>
						</div>
					</div>

					<div className="flex items-center gap-2 flex-shrink-0">
						<Badge
							variant={email.isRead ? "secondary" : "default"}
							className="text-xs"
						>
							{email.isRead ? "已读" : "未读"}
						</Badge>
						<span className="text-xs text-gray-500">
							{formatFileSize(email.size)}
						</span>
					</div>
				</div>

				{/* Attachments - Compact */}
				{attachments.length > 0 && (
					<div className="mt-3 pt-3 border-t">
						<div className="flex items-center gap-2 mb-2">
							<Paperclip className="w-3 sm:w-4 h-3 sm:h-4" />
							<span className="text-xs sm:text-sm font-medium">
								附件 ({attachments.length})
							</span>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
							{attachments.map((attachment) => (
								<div
									key={attachment.id}
									className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 border rounded text-xs"
								>
									{getFileIcon(attachment.filename, attachment.contentType)}
									<div className="flex-1 min-w-0">
										<div className="truncate font-medium">
											{attachment.filename || "未命名附件"}
										</div>
										<div className="text-gray-500 text-xs">
											{formatFileSize(attachment.size)}
										</div>
									</div>
									{attachment.uploadStatus === "uploaded" ? (
										<a
											href={`/attachment/${attachment.id}`}
											className="inline-flex items-center justify-center h-6 w-6 p-0 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground flex-shrink-0"
											title="下载附件"
										>
											<Download className="w-3 h-3" />
										</a>
									) : (
										<span className="text-xs text-gray-400 flex-shrink-0">
											{attachment.uploadStatus === "pending"
												? "处理中"
												: "失败"}
										</span>
									)}
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Email Content - Full Height */}
			<div className="flex-1 min-h-0 bg-white">
				<iframe
					id="email-content-iframe"
					srcDoc={emailHTML}
					className="w-full h-full border-0"
					sandbox="allow-same-origin"
					title="邮件内容"
				/>
			</div>
		</div>
	);
}
