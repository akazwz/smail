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
		{ title: "联系Smail团队 - 技术支持、反馈建议、商务合作" },
		{
			name: "description",
			content:
				"联系Smail团队获取技术支持、反馈问题或合作咨询。我们提供多种联系方式，快速响应用户需求。如遇临时邮箱使用问题、功能建议或商务合作，欢迎随时联系我们。",
		},
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
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50">
			{/* Hero Section */}
			<section className="py-8 sm:py-16 bg-white">
				<div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4 text-center">
					<div className="flex justify-center mb-4 sm:mb-6">
						<div className="bg-blue-100 p-3 sm:p-4 rounded-full">
							<MessageCircleIcon className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />
						</div>
					</div>
					<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
						<span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
							联系我们
						</span>
					</h1>
					<p className="text-base sm:text-lg lg:text-xl text-gray-600">
						有问题或建议？我们很乐意听取您的意见
					</p>
				</div>
			</section>

			{success && (
				<section className="py-4 sm:py-8">
					<div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4">
						<Card className="bg-green-50 border-green-200">
							<CardContent className="pt-4 sm:pt-6">
								<div className="text-center">
									<h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2">
										消息发送成功！
									</h3>
									<p className="text-green-600 text-sm sm:text-base">
										感谢您的反馈，我们会尽快回复您的消息。
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</section>
			)}

			{/* Contact Form & Info */}
			<section className="py-8 sm:py-16">
				<div className="max-w-screen-xl mx-auto px-3 sm:px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
						{/* Contact Form */}
						<div>
							<Card>
								<CardHeader>
									<CardTitle className="text-lg sm:text-xl">发送消息</CardTitle>
									<CardDescription className="text-sm sm:text-base">
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
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
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
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
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
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
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
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
												placeholder="请详细描述您的问题或建议..."
											/>
										</div>
										<Button
											type="submit"
											className="w-full text-sm sm:text-base"
										>
											发送消息
										</Button>
									</Form>
								</CardContent>
							</Card>
						</div>

						{/* Contact Info */}
						<div>
							<div className="space-y-4 sm:space-y-6">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
											<MailIcon className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
											邮箱联系
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-gray-600 mb-2 text-sm sm:text-base">
											您也可以直接发送邮件给我们：
										</p>
										<a
											href="mailto:support@smail.pw"
											className="text-blue-600 font-medium hover:underline text-sm sm:text-base break-all"
										>
											support@smail.pw
										</a>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
											<ClockIcon className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
											响应时间
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-2 text-sm sm:text-base">
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
										<CardTitle className="text-lg sm:text-xl">
											常见问题
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-gray-600 mb-4 text-sm sm:text-base">
											在联系我们之前，您可以先查看我们的常见问题页面，也许能找到您要的答案。
										</p>
										<Button
											asChild
											variant="outline"
											className="w-full text-sm sm:text-base"
										>
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
			<section className="py-8 sm:py-16 bg-white">
				<div className="max-w-screen-xl mx-auto px-3 sm:px-4">
					<div className="text-center mb-8 sm:mb-12">
						<h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
							其他获取帮助的方式
						</h2>
						<p className="text-base sm:text-lg text-gray-600">
							我们提供多种方式来为您提供支持
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
						<Card className="w-full text-center">
							<CardContent className="pt-4 sm:pt-6">
								<div className="bg-blue-100 w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
									<MessageCircleIcon className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-blue-600" />
								</div>
								<h3 className="text-lg sm:text-xl font-semibold mb-2">
									在线文档
								</h3>
								<p className="text-gray-600 mb-4 text-sm sm:text-base">
									查看详细的使用说明和帮助文档
								</p>
								<Button
									variant="outline"
									size="sm"
									className="text-xs sm:text-sm"
								>
									查看文档
								</Button>
							</CardContent>
						</Card>
						<Card className="w-full text-center">
							<CardContent className="pt-4 sm:pt-6">
								<div className="bg-green-100 w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
									<MailIcon className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-green-600" />
								</div>
								<h3 className="text-lg sm:text-xl font-semibold mb-2">
									邮件支持
								</h3>
								<p className="text-gray-600 mb-4 text-sm sm:text-base">
									发送邮件给我们的支持团队
								</p>
								<Button
									variant="outline"
									size="sm"
									className="text-xs sm:text-sm"
								>
									发送邮件
								</Button>
							</CardContent>
						</Card>
						<Card className="w-full text-center">
							<CardContent className="pt-4 sm:pt-6">
								<div className="bg-purple-100 w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
									<ClockIcon className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-purple-600" />
								</div>
								<h3 className="text-lg sm:text-xl font-semibold mb-2">
									快速响应
								</h3>
								<p className="text-gray-600 mb-4 text-sm sm:text-base">
									我们承诺在24小时内回复您的问题
								</p>
								<Button
									variant="outline"
									size="sm"
									className="text-xs sm:text-sm"
								>
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
