import { CheckCircleIcon, GlobeIcon, ShieldIcon, ZapIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

import type { Route } from "./+types/about";

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "关于Smail团队 - 致力于打造最安全的临时邮箱平台" },
		{
			name: "description",
			content:
				"了解Smail团队和我们的使命：为全球用户提供免费、安全、无广告的临时邮箱服务。专注隐私保护，助力用户远离垃圾邮件困扰，打造最可靠的一次性邮箱平台。",
		},
	];
}

export default function About() {
	const features = [
		{
			icon: ZapIcon,
			title: "即时创建",
			description: "无需注册，一键生成临时邮箱地址，立即开始使用",
		},
		{
			icon: ShieldIcon,
			title: "隐私保护",
			description: "保护您的真实邮箱地址，避免垃圾邮件和隐私泄露",
		},
		{
			icon: GlobeIcon,
			title: "全球访问",
			description: "支持全球用户访问，无地域限制，随时随地使用",
		},
		{
			icon: CheckCircleIcon,
			title: "完全免费",
			description: "永久免费使用，无隐藏费用，无广告干扰",
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50">
			{/* Hero Section */}
			<section className="py-10 sm:py-16 lg:py-20">
				<div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4 text-center">
					<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4 sm:mb-6">
						关于{" "}
						<span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
							Smail
						</span>
					</h1>
					<p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8">
						Smail
						是一个免费、安全、易用的临时邮箱服务，帮助您保护隐私，避免垃圾邮件
					</p>
				</div>
			</section>

			{/* Features */}
			<section className="py-8 sm:py-16">
				<div className="max-w-screen-xl mx-auto px-3 sm:px-4">
					<h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
						为什么选择 Smail？
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
						{features.map((feature) => (
							<Card
								key={feature.title}
								className="text-center hover:shadow-lg transition-shadow"
							>
								<CardHeader className="pb-3 sm:pb-4">
									<feature.icon className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
									<CardTitle className="text-lg sm:text-xl">
										{feature.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-gray-600 text-sm sm:text-base">
										{feature.description}
									</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Mission */}
			<section className="py-8 sm:py-16 bg-white">
				<div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4">
					<div className="text-center mb-8 sm:mb-12">
						<h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
							我们的使命
						</h2>
						<p className="text-base sm:text-lg text-gray-600">
							在数字化时代，隐私保护变得越来越重要。我们致力于为用户提供简单、安全的临时邮箱服务，
							让每个人都能轻松保护自己的隐私。
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
						<div className="text-center">
							<div className="bg-blue-100 w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
								<span className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
									1
								</span>
							</div>
							<h3 className="text-lg sm:text-xl font-semibold mb-2">
								简单易用
							</h3>
							<p className="text-gray-600 text-sm sm:text-base">
								无需复杂的注册流程，一键即可获得临时邮箱
							</p>
						</div>
						<div className="text-center">
							<div className="bg-green-100 w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
								<span className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
									2
								</span>
							</div>
							<h3 className="text-lg sm:text-xl font-semibold mb-2">
								安全可靠
							</h3>
							<p className="text-gray-600 text-sm sm:text-base">
								采用最新的安全技术，保护您的邮件内容安全
							</p>
						</div>
						<div className="text-center">
							<div className="bg-purple-100 w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
								<span className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">
									3
								</span>
							</div>
							<h3 className="text-lg sm:text-xl font-semibold mb-2">
								持续改进
							</h3>
							<p className="text-gray-600 text-sm sm:text-base">
								我们不断优化服务，为用户提供更好的体验
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-8 sm:py-16">
				<div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4 text-center">
					<h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
						准备好开始使用了吗？
					</h2>
					<p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
						立即获取您的临时邮箱，开始保护您的隐私
					</p>
					<Button
						asChild
						size="lg"
						className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
					>
						<Link to="/">立即开始</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}
