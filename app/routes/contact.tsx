import { ClockIcon, MailIcon, MessageCircleIcon } from "lucide-react";
import { Form, Link, data, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

import type { Route } from "./+types/contact";

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "联系我们 - smail 临时邮箱" },
		{ name: "description", content: "联系smail团队，获取帮助或提供反馈建议" },
	];
}

export async function action({ request }: Route.ActionArgs) {
	// 模拟处理联系表单
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const formData = await request.formData();
	const name = formData.get("name");
	const email = formData.get("email");
	const subject = formData.get("subject");
	const message = formData.get("message");

	// 这里应该发送邮件或保存到数据库
	console.log("Contact form submitted:", { name, email, subject, message });

	// 重定向到感谢页面或显示成功消息
	return redirect("/contact?success=true");
}

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url);
	const success = url.searchParams.get("success");

	return data({ success: success === "true" });
}

interface LoaderData {
	success: boolean;
}

interface ComponentProps {
	loaderData?: LoaderData;
}

export default function Contact({ loaderData }: ComponentProps) {
	const { success } = loaderData || { success: false };

	return (
		<div className="min-h-dvh bg-gray-50">
			{/* Header */}
			<header className="bg-white border-b">
				<div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
					<Button asChild variant="ghost" size="sm">
						<Link to="/">
							<span className="font-bold text-xl">Smail</span>
						</Link>
					</Button>
					<nav className="flex items-center gap-4">
						<Button asChild variant="ghost" size="sm">
							<Link to="/about">关于我们</Link>
						</Button>
						<Button asChild variant="ghost" size="sm">
							<Link to="/faq">FAQ</Link>
						</Button>
						<Button asChild>
							<Link to="/">开始使用</Link>
						</Button>
					</nav>
				</div>
			</header>

			{/* Hero Section */}
			<section className="py-16 bg-white">
				<div className="max-w-4xl mx-auto px-4 text-center">
					<div className="flex justify-center mb-6">
						<div className="bg-blue-100 p-4 rounded-full">
							<MessageCircleIcon className="w-8 h-8 text-blue-600" />
						</div>
					</div>
					<h1 className="text-4xl font-bold text-gray-900 mb-4">联系我们</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						有问题或建议？我们很乐意听取您的意见
					</p>
				</div>
			</section>

			{success && (
				<section className="py-8">
					<div className="max-w-4xl mx-auto px-4">
						<Card className="bg-green-50 border-green-200">
							<CardContent className="pt-6">
								<div className="text-center">
									<h3 className="text-lg font-semibold text-green-800 mb-2">
										消息发送成功！
									</h3>
									<p className="text-green-600">
										感谢您的反馈，我们会尽快回复您的消息。
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</section>
			)}

			{/* Contact Form & Info */}
			<section className="py-16">
				<div className="max-w-6xl mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* Contact Form */}
						<div>
							<Card>
								<CardHeader>
									<CardTitle>发送消息</CardTitle>
									<CardDescription>
										填写下面的表单，我们会尽快回复您
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Form method="post" className="space-y-4">
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div>
												<label
													htmlFor="name"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													姓名 *
												</label>
												<input
													type="text"
													id="name"
													name="name"
													required
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
													placeholder="请输入您的姓名"
												/>
											</div>
											<div>
												<label
													htmlFor="email"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													邮箱 *
												</label>
												<input
													type="email"
													id="email"
													name="email"
													required
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
													placeholder="请输入您的邮箱"
												/>
											</div>
										</div>
										<div>
											<label
												htmlFor="subject"
												className="block text-sm font-medium text-gray-700 mb-1"
											>
												主题 *
											</label>
											<select
												id="subject"
												name="subject"
												required
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											>
												<option value="">请选择主题</option>
												<option value="bug">问题反馈</option>
												<option value="feature">功能建议</option>
												<option value="help">使用帮助</option>
												<option value="business">商务合作</option>
												<option value="other">其他</option>
											</select>
										</div>
										<div>
											<label
												htmlFor="message"
												className="block text-sm font-medium text-gray-700 mb-1"
											>
												消息 *
											</label>
											<textarea
												id="message"
												name="message"
												required
												rows={6}
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
												placeholder="请详细描述您的问题或建议..."
											/>
										</div>
										<Button type="submit" className="w-full">
											发送消息
										</Button>
									</Form>
								</CardContent>
							</Card>
						</div>

						{/* Contact Info */}
						<div>
							<div className="space-y-6">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<MailIcon className="w-5 h-5 text-blue-600" />
											邮箱联系
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-gray-600 mb-2">
											您也可以直接发送邮件给我们：
										</p>
										<a
											href="mailto:support@smail.pw"
											className="text-blue-600 font-medium hover:underline"
										>
											support@smail.pw
										</a>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<ClockIcon className="w-5 h-5 text-green-600" />
											响应时间
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-2">
											<div className="flex justify-between">
												<span className="text-gray-600">一般问题：</span>
												<span className="font-medium">24小时内</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">紧急问题：</span>
												<span className="font-medium">12小时内</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">商务合作：</span>
												<span className="font-medium">48小时内</span>
											</div>
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>常见问题</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-gray-600 mb-4">
											在联系我们之前，您可以先查看我们的常见问题页面，也许能找到您要的答案。
										</p>
										<Button asChild variant="outline" className="w-full">
											<Link to="/faq">查看 FAQ</Link>
										</Button>
									</CardContent>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Additional Help */}
			<section className="py-16 bg-white">
				<div className="max-w-4xl mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						其他获取帮助的方式
					</h2>
					<p className="text-lg text-gray-600 mb-8">
						我们提供多种方式来为您提供支持
					</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<Card className="text-center">
							<CardContent className="pt-6">
								<div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									<MessageCircleIcon className="w-8 h-8 text-blue-600" />
								</div>
								<h3 className="text-xl font-semibold mb-2">在线文档</h3>
								<p className="text-gray-600 mb-4">
									查看详细的使用说明和帮助文档
								</p>
								<Button variant="outline" size="sm">
									查看文档
								</Button>
							</CardContent>
						</Card>
						<Card className="text-center">
							<CardContent className="pt-6">
								<div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									<MailIcon className="w-8 h-8 text-green-600" />
								</div>
								<h3 className="text-xl font-semibold mb-2">邮件支持</h3>
								<p className="text-gray-600 mb-4">发送邮件给我们的支持团队</p>
								<Button variant="outline" size="sm">
									发送邮件
								</Button>
							</CardContent>
						</Card>
						<Card className="text-center">
							<CardContent className="pt-6">
								<div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									<ClockIcon className="w-8 h-8 text-purple-600" />
								</div>
								<h3 className="text-xl font-semibold mb-2">快速响应</h3>
								<p className="text-gray-600 mb-4">
									我们承诺在24小时内回复您的问题
								</p>
								<Button variant="outline" size="sm">
									了解更多
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</div>
	);
}
