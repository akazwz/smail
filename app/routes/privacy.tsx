import { ShieldIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

import type { Route } from "./+types/privacy";

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "隐私政策 - smail 临时邮箱" },
		{
			name: "description",
			content: "smail临时邮箱隐私政策，了解我们如何保护您的隐私和数据安全",
		},
	];
}

export default function Privacy() {
	return (
		<div className="min-h-dvh bg-gray-50">
			{/* Header */}
			<header className="bg-white border-b">
				<div className="max-w-screen-xl mx-auto px-3 sm:px-4 py-4 flex items-center justify-between">
					<Button asChild variant="ghost" size="sm">
						<Link to="/">
							<span className="font-bold text-xl">Smail</span>
						</Link>
					</Button>
					<nav className="flex items-center gap-1 sm:gap-4">
						<Button
							asChild
							variant="ghost"
							size="sm"
							className="text-xs sm:text-sm px-2 sm:px-4"
						>
							<Link to="/about">关于我们</Link>
						</Button>
						<Button
							asChild
							variant="ghost"
							size="sm"
							className="text-xs sm:text-sm px-2 sm:px-4"
						>
							<Link to="/faq">FAQ</Link>
						</Button>
						<Button asChild className="text-xs sm:text-sm px-2 sm:px-4">
							<Link to="/">开始使用</Link>
						</Button>
					</nav>
				</div>
			</header>

			{/* Hero Section */}
			<section className="py-8 sm:py-16 bg-white">
				<div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4 text-center">
					<div className="flex justify-center mb-4 sm:mb-6">
						<div className="bg-blue-100 p-3 sm:p-4 rounded-full">
							<ShieldIcon className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />
						</div>
					</div>
					<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
						隐私政策
					</h1>
					<p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-3 sm:mb-4">
						我们承诺保护您的隐私，以下是我们的隐私保护政策
					</p>
					<p className="text-sm text-gray-500">最后更新时间：2025年1月15日</p>
				</div>
			</section>

			{/* Privacy Content */}
			<section className="py-8 sm:py-16">
				<div className="max-w-screen-lg mx-auto px-3 sm:px-4">
					<div className="space-y-6 sm:space-y-8">
						<Card>
							<CardHeader>
								<CardTitle>信息收集</CardTitle>
								<CardDescription>
									我们收集哪些信息以及如何使用这些信息
								</CardDescription>
							</CardHeader>
							<CardContent className="prose max-w-none">
								<h4 className="font-semibold mb-2">自动收集的信息</h4>
								<ul className="list-disc pl-6 space-y-1 text-gray-600">
									<li>临时邮箱地址（系统自动生成）</li>
									<li>接收到的邮件内容</li>
									<li>访问时间和频率</li>
									<li>设备类型和浏览器信息</li>
									<li>IP地址（仅用于安全监控）</li>
								</ul>

								<h4 className="font-semibold mb-2 mt-4">用户提供的信息</h4>
								<ul className="list-disc pl-6 space-y-1 text-gray-600">
									<li>通过联系表单提供的个人信息</li>
									<li>反馈和建议内容</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>信息使用</CardTitle>
								<CardDescription>我们如何使用收集到的信息</CardDescription>
							</CardHeader>
							<CardContent className="prose max-w-none">
								<ul className="list-disc pl-6 space-y-2 text-gray-600">
									<li>
										<strong>提供服务：</strong>
										为您提供临时邮箱服务，显示接收到的邮件
									</li>
									<li>
										<strong>服务改进：</strong>分析使用模式以改进我们的服务质量
									</li>
									<li>
										<strong>安全保护：</strong>
										检测和防止滥用、垃圾邮件和安全威胁
									</li>
									<li>
										<strong>客户支持：</strong>回复您的问题和提供技术支持
									</li>
									<li>
										<strong>法律合规：</strong>遵守适用的法律法规要求
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>数据保护</CardTitle>
								<CardDescription>我们如何保护您的数据安全</CardDescription>
							</CardHeader>
							<CardContent className="prose max-w-none">
								<h4 className="font-semibold mb-2">技术保护措施</h4>
								<ul className="list-disc pl-6 space-y-1 text-gray-600">
									<li>所有数据传输均采用SSL/TLS加密</li>
									<li>服务器采用防火墙和入侵检测系统</li>
									<li>定期进行安全审计和漏洞扫描</li>
									<li>数据存储采用加密技术</li>
								</ul>

								<h4 className="font-semibold mb-2 mt-4">访问控制</h4>
								<ul className="list-disc pl-6 space-y-1 text-gray-600">
									<li>严格限制数据访问权限</li>
									<li>员工需要签署保密协议</li>
									<li>定期进行安全培训</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>数据保留</CardTitle>
								<CardDescription>我们保留数据的时间长度</CardDescription>
							</CardHeader>
							<CardContent className="prose max-w-none">
								<ul className="list-disc pl-6 space-y-2 text-gray-600">
									<li>
										<strong>邮件内容：</strong>
										临时邮箱过期后（通常24小时）自动删除
									</li>
									<li>
										<strong>访问日志：</strong>保留30天用于安全监控
									</li>
									<li>
										<strong>联系信息：</strong>用户主动提供的联系信息保留2年
									</li>
									<li>
										<strong>系统日志：</strong>保留90天用于故障排除
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>信息共享</CardTitle>
								<CardDescription>我们是否与第三方共享您的信息</CardDescription>
							</CardHeader>
							<CardContent className="prose max-w-none">
								<p className="text-gray-600 mb-4">
									我们承诺不会出售、交易或转让您的个人信息给第三方。在以下情况下，我们可能会共享信息：
								</p>
								<ul className="list-disc pl-6 space-y-2 text-gray-600">
									<li>
										<strong>法律要求：</strong>当法律要求或政府机构要求时
									</li>
									<li>
										<strong>服务提供商：</strong>
										与帮助我们运营服务的可信第三方（如云服务提供商）
									</li>
									<li>
										<strong>安全保护：</strong>
										为了保护我们的权利、财产或安全，以及用户和公众的安全
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>您的权利</CardTitle>
								<CardDescription>您对个人信息享有的权利</CardDescription>
							</CardHeader>
							<CardContent className="prose max-w-none">
								<ul className="list-disc pl-6 space-y-2 text-gray-600">
									<li>
										<strong>访问权：</strong>
										您有权了解我们收集和处理的关于您的信息
									</li>
									<li>
										<strong>更正权：</strong>您有权要求更正不准确的个人信息
									</li>
									<li>
										<strong>删除权：</strong>您有权要求删除您的个人信息
									</li>
									<li>
										<strong>限制处理权：</strong>
										在某些情况下，您有权限制我们处理您的信息
									</li>
									<li>
										<strong>投诉权：</strong>您有权向相关监管机构投诉
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Cookie 使用</CardTitle>
								<CardDescription>我们如何使用Cookie和类似技术</CardDescription>
							</CardHeader>
							<CardContent className="prose max-w-none">
								<p className="text-gray-600 mb-4">
									我们使用Cookie来改善您的使用体验：
								</p>
								<ul className="list-disc pl-6 space-y-2 text-gray-600">
									<li>
										<strong>必要Cookie：</strong>用于维持您的邮箱会话
									</li>
									<li>
										<strong>分析Cookie：</strong>
										帮助我们了解网站使用情况（匿名）
									</li>
									<li>
										<strong>功能Cookie：</strong>记住您的偏好设置
									</li>
								</ul>
								<p className="text-gray-600 mt-4">
									您可以通过浏览器设置控制Cookie的使用。
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>政策更新</CardTitle>
								<CardDescription>隐私政策的变更说明</CardDescription>
							</CardHeader>
							<CardContent className="prose max-w-none">
								<p className="text-gray-600">
									我们可能会不时更新此隐私政策。任何重大变更都会在网站上明显位置通知您。
									继续使用我们的服务即表示您接受更新后的隐私政策。
								</p>
								<p className="text-gray-600 mt-4">
									建议您定期查看此页面以了解最新的隐私保护信息。
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>联系我们</CardTitle>
								<CardDescription>如何就隐私问题联系我们</CardDescription>
							</CardHeader>
							<CardContent className="prose max-w-none">
								<p className="text-gray-600 mb-4">
									如果您对此隐私政策有任何问题或担忧，请通过以下方式联系我们：
								</p>
								<ul className="list-disc pl-6 space-y-1 text-gray-600">
									<li>邮箱：privacy@smail.pw</li>
									<li>联系表单：通过我们的联系页面</li>
								</ul>
								<p className="text-gray-600 mt-4">
									我们会在收到您的询问后48小时内回复。
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-8 sm:py-16 bg-white">
				<div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4 text-center">
					<h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
						放心使用我们的服务
					</h2>
					<p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
						我们承诺保护您的隐私，让您安心使用临时邮箱服务
					</p>
					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
						<Button asChild size="lg" className="text-sm sm:text-base">
							<Link to="/">开始使用</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="text-sm sm:text-base"
						>
							<Link to="/contact">联系我们</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
