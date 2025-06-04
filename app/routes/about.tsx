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
		{ title: "关于我们 - smail 临时邮箱" },
		{
			name: "description",
			content: "了解smail临时邮箱服务，免费、安全、无限制的临时邮箱解决方案",
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
		<div className="min-h-dvh bg-gradient-to-br from-blue-50 to-indigo-100">
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
							<Link to="/faq">FAQ</Link>
						</Button>
						<Button asChild variant="ghost" size="sm">
							<Link to="/contact">联系我们</Link>
						</Button>
						<Button asChild>
							<Link to="/">开始使用</Link>
						</Button>
					</nav>
				</div>
			</header>

			{/* Hero Section */}
			<section className="py-20">
				<div className="max-w-4xl mx-auto px-4 text-center">
					<h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
						关于 <span className="text-blue-600">Smail</span>
					</h1>
					<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
						Smail
						是一个免费、安全、易用的临时邮箱服务，帮助您保护隐私，避免垃圾邮件
					</p>
				</div>
			</section>

			{/* Features */}
			<section className="py-16">
				<div className="max-w-6xl mx-auto px-4">
					<h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
						为什么选择 Smail？
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{features.map((feature) => (
							<Card
								key={feature.title}
								className="text-center hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
									<CardTitle className="text-xl">{feature.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-gray-600">
										{feature.description}
									</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Mission */}
			<section className="py-16 bg-white">
				<div className="max-w-4xl mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							我们的使命
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							在数字化时代，隐私保护变得越来越重要。我们致力于为用户提供简单、安全的临时邮箱服务，
							让每个人都能轻松保护自己的隐私。
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-2xl font-bold text-blue-600">1</span>
							</div>
							<h3 className="text-xl font-semibold mb-2">简单易用</h3>
							<p className="text-gray-600">
								无需复杂的注册流程，一键即可获得临时邮箱
							</p>
						</div>
						<div className="text-center">
							<div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-2xl font-bold text-green-600">2</span>
							</div>
							<h3 className="text-xl font-semibold mb-2">安全可靠</h3>
							<p className="text-gray-600">
								采用最新的安全技术，保护您的邮件内容安全
							</p>
						</div>
						<div className="text-center">
							<div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-2xl font-bold text-purple-600">3</span>
							</div>
							<h3 className="text-xl font-semibold mb-2">持续改进</h3>
							<p className="text-gray-600">
								我们不断优化服务，为用户提供更好的体验
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16">
				<div className="max-w-4xl mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						准备好开始使用了吗？
					</h2>
					<p className="text-lg text-gray-600 mb-8">
						立即获取您的临时邮箱，开始保护您的隐私
					</p>
					<Button asChild size="lg" className="text-lg px-8 py-6">
						<Link to="/">立即开始</Link>
					</Button>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-12">
				<div className="max-w-6xl mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div>
							<h3 className="text-xl font-bold mb-4">Smail</h3>
							<p className="text-gray-400">免费、安全、易用的临时邮箱服务</p>
						</div>
						<div>
							<h4 className="font-semibold mb-4">服务</h4>
							<ul className="space-y-2 text-gray-400">
								<li>
									<Link to="/" className="hover:text-white">
										临时邮箱
									</Link>
								</li>
								<li>
									<Link to="/faq" className="hover:text-white">
										常见问题
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-4">公司</h4>
							<ul className="space-y-2 text-gray-400">
								<li>
									<Link to="/about" className="hover:text-white">
										关于我们
									</Link>
								</li>
								<li>
									<Link to="/contact" className="hover:text-white">
										联系我们
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-4">法律</h4>
							<ul className="space-y-2 text-gray-400">
								<li>
									<Link to="/privacy" className="hover:text-white">
										隐私政策
									</Link>
								</li>
								<li>
									<Link to="/terms" className="hover:text-white">
										服务条款
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
						<p>&copy; 2025 Smail. 保留所有权利。</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
