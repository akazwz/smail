import randomName from "@scaleway/random-name";
import { Loader2Icon, RefreshCcwIcon } from "lucide-react";
import { customAlphabet } from "nanoid";
import React from "react";
import {
	Form,
	Link,
	data,
	redirect,
	useNavigation,
	useRevalidator,
} from "react-router";

import { commitSession, getSession } from "~/.server/session";
import { CopyButton } from "~/components/copy-button";
import { MailItem } from "~/components/mail-item";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
	createDB,
	getEmailsByAddress,
	getMailboxStats,
	getOrCreateMailbox,
} from "~/lib/db";

import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "Smail - 免费临时邮箱服务 | 一次性邮箱 | 保护隐私" },
		{
			name: "description",
			content:
				"Smail是最好用的免费临时邮箱服务。无需注册，即时获取临时邮箱地址，保护您的真实邮箱免受垃圾邮件骚扰。支持附件，24小时有效，完全免费使用。",
		},
		{
			name: "keywords",
			content:
				"临时邮箱,一次性邮箱,临时邮件,临时email,免费邮箱,隐私保护,垃圾邮件防护,临时邮箱网站,免费临时邮箱,临时邮箱服务,24小时邮箱,无需注册邮箱",
		},

		// Open Graph 优化
		{ property: "og:title", content: "Smail - 免费临时邮箱服务" },
		{
			property: "og:description",
			content:
				"保护隐私的免费临时邮箱，无需注册，即时使用，24小时有效，支持附件下载。",
		},
		{ property: "og:type", content: "website" },
		{ property: "og:url", content: "https://smail.pw" },
		{ property: "og:site_name", content: "Smail" },
		{ property: "og:locale", content: "zh_CN" },

		// Twitter Card
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: "Smail - 免费临时邮箱服务" },
		{
			name: "twitter:description",
			content: "保护隐私的免费临时邮箱，无需注册，即时使用。",
		},

		// 额外的SEO优化
		{
			name: "robots",
			content:
				"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
		},
		{ name: "googlebot", content: "index, follow" },
		{ name: "bingbot", content: "index, follow" },
		{ name: "format-detection", content: "telephone=no" },
		{ name: "theme-color", content: "#2563eb" },

		// 结构化数据
		{ name: "application-name", content: "Smail" },
		{ name: "apple-mobile-web-app-title", content: "Smail" },
		{ name: "msapplication-TileColor", content: "#2563eb" },
	];
}

function generateEmail() {
	const name = randomName();
	const random = customAlphabet("0123456789", 4)();
	return `${name}-${random}@smail.pw`;
}

export async function loader({ request, context }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	let email = session.get("email");

	if (!email) {
		email = generateEmail();
		session.set("email", email);
		return data(
			{
				email,
				mails: [],
				stats: { total: 0, unread: 0 },
			},
			{
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			},
		);
	}

	try {
		// 创建数据库连接
		const db = createDB();

		// 获取或创建邮箱
		const mailbox = await getOrCreateMailbox(db, email);

		// 获取邮件列表
		const emails = await getEmailsByAddress(db, email);

		// 获取统计信息
		const stats = await getMailboxStats(db, mailbox.id);

		// 转换邮件数据格式以适配前端组件
		const mails = emails.map((emailRecord) => ({
			id: emailRecord.id,
			name: emailRecord.fromAddress.split("@")[0] || emailRecord.fromAddress,
			email: emailRecord.fromAddress,
			subject: emailRecord.subject || "(无主题)",
			date: emailRecord.receivedAt.toISOString().split("T")[0], // 格式化日期
			isRead: emailRecord.isRead,
		}));

		return { email, mails, stats };
	} catch (error) {
		console.error("Error loading emails:", error);
		// 出错时返回空数据
		return {
			email,
			mails: [],
			stats: { total: 0, unread: 0 },
		};
	}
}

export async function action({ request, context }: Route.ActionArgs) {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	const formData = await request.formData();
	const action = formData.get("action");
	if (action === "refresh") {
		return redirect("/");
	}
	if (action === "delete") {
		const session = await getSession(request.headers.get("Cookie"));
		session.set("email", generateEmail());
		await commitSession(session);
		return redirect("/");
	}
	return null;
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const navigation = useNavigation();
	const revalidator = useRevalidator();
	const isSubmitting = navigation.state === "submitting";
	const isRefreshing =
		navigation.formData?.get("action") === "refresh" && isSubmitting;
	const isDeleting =
		navigation.formData?.get("action") === "delete" && isSubmitting;

	// 自动刷新逻辑 - 每30秒自动重新验证数据
	React.useEffect(() => {
		const interval = setInterval(() => {
			// 只有在页面可见且没有正在进行其他操作时才自动刷新
			if (
				document.visibilityState === "visible" &&
				navigation.state === "idle" &&
				revalidator.state === "idle"
			) {
				revalidator.revalidate();
			}
		}, 10000); // 10秒

		// 页面重新获得焦点时也刷新一次
		const handleFocus = () => {
			if (navigation.state === "idle" && revalidator.state === "idle") {
				revalidator.revalidate();
			}
		};

		window.addEventListener("focus", handleFocus);

		return () => {
			clearInterval(interval);
			window.removeEventListener("focus", handleFocus);
		};
	}, [navigation.state, revalidator]);

	// 判断是否正在自动刷新
	const isAutoRefreshing =
		revalidator.state === "loading" && navigation.state === "idle";

	return (
		<div className="min-h-dvh bg-gray-50">
			<header className="flex w-full items-center justify-between border-b bg-white px-4 py-3">
				<Button asChild variant="ghost" size="sm">
					<Link to="/">
						<span className="font-bold text-xl text-blue-600">Smail</span>
					</Link>
				</Button>
				<nav className="flex items-center gap-1 sm:gap-2">
					<Button
						asChild
						variant="ghost"
						size="sm"
						className="text-xs sm:text-sm px-2 sm:px-4"
					>
						<Link to="/about">关于</Link>
					</Button>
					<Button
						asChild
						variant="ghost"
						size="sm"
						className="text-xs sm:text-sm px-2 sm:px-4"
					>
						<Link to="/faq">FAQ</Link>
					</Button>
					<Button
						asChild
						variant="ghost"
						size="sm"
						className="text-xs sm:text-sm px-2 sm:px-4"
					>
						<Link to="/contact">联系</Link>
					</Button>
				</nav>
			</header>
			<main className="p-2 sm:p-4 flex flex-col gap-4 max-w-screen-xl mx-auto">
				{/* Hero Section */}
				<div className="text-center py-2 sm:py-4">
					<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 px-2">
						免费临时邮箱服务
					</h1>
					<p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4 max-w-2xl mx-auto px-2">
						保护您的隐私，避免垃圾邮件。无需注册，即时获取临时邮箱地址
					</p>
				</div>

				{/* Email Section */}
				<div className="w-full max-w-xl mx-auto">
					<div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
						{/* Header */}
						<div className="bg-gradient-to-r from-blue-500 to-blue-600 px-3 sm:px-4 py-3">
							<div className="text-center">
								<h2 className="text-base sm:text-lg font-semibold text-white mb-1">
									您的临时邮箱地址
								</h2>
								<p className="text-blue-100 text-xs sm:text-sm">
									有效期：24小时 | 自动刷新 | 完全免费
								</p>
							</div>
						</div>

						{/* Email Display */}
						<div className="p-3 sm:p-4">
							{/* Email Address Display */}
							<div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 sm:p-4 border border-gray-200">
								<div className="w-full">
									<div className="bg-white rounded-lg px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-300 w-full">
										<span className="font-mono text-sm sm:text-lg font-semibold text-gray-900 tracking-wide select-all break-all block text-center">
											{loaderData.email}
										</span>
									</div>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
								<CopyButton
									text={loaderData.email}
									size="sm"
									variant="default"
									className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm"
								/>
								<Form method="post">
									<Button
										variant="outline"
										size="sm"
										type="submit"
										name="action"
										value="delete"
										disabled={isDeleting}
										className="w-full border-gray-300 hover:bg-gray-50 text-sm"
									>
										{isDeleting ? (
											<>
												<Loader2Icon className="w-3 h-3 animate-spin mr-2" />
												生成中...
											</>
										) : (
											<>🔄 生成新邮箱</>
										)}
									</Button>
								</Form>
							</div>

							{/* Tips */}
							<div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
								<div className="flex items-start gap-2">
									<span className="text-blue-500 text-sm flex-shrink-0">
										💡
									</span>
									<div className="text-xs text-blue-700">
										<p className="font-medium mb-1">使用提示：</p>
										<p className="leading-relaxed">
											发送邮件到此地址即可在下方收件箱查看，邮箱24小时后自动过期。收件箱每10秒自动刷新检查新邮件。
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Inbox Section */}
				<div className="w-full max-w-4xl mx-auto border rounded-lg bg-white shadow-sm mt-2">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm font-medium p-3 sm:p-4 border-b bg-gray-50 rounded-t-lg gap-2 sm:gap-0">
						<div className="flex items-center gap-2 flex-wrap">
							<span className="text-base sm:text-lg font-semibold">收件箱</span>
							<span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
								{loaderData.stats.unread} 未读
							</span>
							<span className="text-gray-500 text-xs">
								共 {loaderData.stats.total} 封邮件
							</span>
							{isAutoRefreshing && (
								<span className="text-xs text-blue-600 flex items-center gap-1">
									<Loader2Icon className="w-3 h-3 animate-spin" />
									自动刷新中...
								</span>
							)}
						</div>
						<Form method="post" className="flex-shrink-0">
							<Button
								variant="secondary"
								size="sm"
								name="action"
								value="refresh"
								disabled={isRefreshing || isAutoRefreshing}
								className="text-xs sm:text-sm"
							>
								{isRefreshing ? (
									<>
										<Loader2Icon className="w-3 sm:w-4 h-3 sm:h-4 animate-spin mr-1" />
										刷新中...
									</>
								) : (
									<>
										<RefreshCcwIcon className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
										手动刷新
									</>
								)}
							</Button>
						</Form>
					</div>
					<ScrollArea className="h-80">
						{loaderData.mails.length > 0 ? (
							<div className="divide-y">
								{loaderData.mails.map((mail) => (
									<MailItem key={mail.id} {...mail} />
								))}
							</div>
						) : (
							<div className="flex flex-col items-center justify-center py-8 text-gray-500 px-4">
								<div className="text-4xl mb-3">📭</div>
								<h3 className="text-lg font-semibold mb-2 text-center">
									收件箱为空
								</h3>
								<p className="text-sm text-center">您还没有收到任何邮件</p>
								<p className="text-xs text-gray-400 mt-2 text-center break-all">
									发送邮件到 {loaderData.email} 来测试
								</p>
							</div>
						)}
					</ScrollArea>
				</div>

				{/* Features Section */}
				<div className="py-8 sm:py-16">
					<div className="max-w-screen-xl mx-auto px-3 sm:px-4">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
							<div className="w-full text-center p-4 sm:p-6 bg-white rounded-lg border">
								<div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔒</div>
								<h3 className="text-base sm:text-lg font-semibold mb-2">
									隐私保护
								</h3>
								<p className="text-gray-600 text-sm">
									保护您的真实邮箱地址，避免垃圾邮件和隐私泄露
								</p>
							</div>
							<div className="w-full text-center p-4 sm:p-6 bg-white rounded-lg border">
								<div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
								<h3 className="text-base sm:text-lg font-semibold mb-2">
									即时创建
								</h3>
								<p className="text-gray-600 text-sm">
									无需注册，一键生成临时邮箱地址，立即开始使用
								</p>
							</div>
							<div className="w-full text-center p-4 sm:p-6 bg-white rounded-lg border lg:col-span-1">
								<div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🌍</div>
								<h3 className="text-base sm:text-lg font-semibold mb-2">
									完全免费
								</h3>
								<p className="text-gray-600 text-sm">
									永久免费使用，无隐藏费用，无广告干扰
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className="bg-white border-t mt-8 sm:mt-16">
				<div className="max-w-screen-xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
						<div className="sm:col-span-2 lg:col-span-1">
							<h3 className="font-bold text-xl text-blue-600 mb-4">Smail</h3>
							<p className="text-gray-600 text-sm">
								免费、安全、易用的临时邮箱服务
							</p>
						</div>
						<div>
							<h4 className="font-semibold mb-4">服务</h4>
							<ul className="space-y-2 text-sm text-gray-600">
								<li>
									<Link to="/" className="hover:text-blue-600">
										临时邮箱
									</Link>
								</li>
								<li>
									<Link to="/faq" className="hover:text-blue-600">
										常见问题
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-4">公司</h4>
							<ul className="space-y-2 text-sm text-gray-600">
								<li>
									<Link to="/about" className="hover:text-blue-600">
										关于我们
									</Link>
								</li>
								<li>
									<Link to="/contact" className="hover:text-blue-600">
										联系我们
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-4">法律</h4>
							<ul className="space-y-2 text-sm text-gray-600">
								<li>
									<Link to="/privacy" className="hover:text-blue-600">
										隐私政策
									</Link>
								</li>
								<li>
									<Link to="/terms" className="hover:text-blue-600">
										服务条款
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-500 text-sm">
						<p>&copy; 2025 Smail. 保留所有权利。</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
