import { ChevronDownIcon, HelpCircleIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

import type { Route } from "./+types/faq";

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "常见问题 - smail 临时邮箱" },
		{
			name: "description",
			content: "smail临时邮箱常见问题解答，帮助您更好地使用我们的服务",
		},
	];
}

export default function FAQ() {
	const faqs = [
		{
			id: "what-is-temp-email",
			question: "什么是临时邮箱？",
			answer:
				"临时邮箱是一种短期使用的电子邮件地址，通常用于注册网站、验证服务或保护您的主邮箱不受垃圾邮件侵扰。它们在一定时间后会自动失效。",
		},
		{
			id: "is-free",
			question: "Smail临时邮箱是免费的吗？",
			answer:
				"是的，Smail完全免费。我们不收取任何费用，也没有隐藏收费。您可以无限制地使用我们的服务。",
		},
		{
			id: "retention-time",
			question: "我的临时邮箱会保留多长时间？",
			answer:
				"目前我们的临时邮箱会保留24小时。在此期间，您可以正常接收邮件。过期后，邮箱地址将被回收，邮件也会被删除。",
		},
		{
			id: "can-send",
			question: "我可以发送邮件吗？",
			answer:
				"目前Smail只支持接收邮件，不支持发送邮件。这是为了防止垃圾邮件传播和保护我们的服务质量。",
		},
		{
			id: "security",
			question: "我的邮件内容安全吗？",
			answer:
				"我们非常重视用户隐私。所有邮件在传输过程中都经过加密处理，服务器上的邮件也会定期清理。但请注意，临时邮箱主要用于临时用途，不建议用于重要信息。",
		},
		{
			id: "verification-issues",
			question: "为什么收不到某些网站的验证邮件？",
			answer:
				"某些网站可能会屏蔽临时邮箱域名。如果遇到这种情况，您可以尝试刷新生成新的邮箱地址，或者联系网站客服。",
		},
		{
			id: "custom-address",
			question: "我可以自定义邮箱地址吗？",
			answer:
				"目前不支持自定义邮箱地址。我们会随机生成易于记忆的邮箱地址，确保每个用户获得独特的地址。",
		},
		{
			id: "email-limits",
			question: "有邮件数量限制吗？",
			answer:
				"没有严格的数量限制，但为了保证服务质量，我们可能会对异常使用行为进行限制。正常使用完全没有问题。",
		},
		{
			id: "attachments",
			question: "支持附件吗？",
			answer:
				"是的，我们支持接收包含附件的邮件。但出于安全考虑，我们会对附件进行安全扫描，恶意文件将被阻止。",
		},
		{
			id: "support",
			question: "如何联系客服？",
			answer:
				"如果您遇到问题或有任何建议，可以通过我们的联系页面发送消息，我们会尽快回复您。",
		},
	];

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
						<Button asChild variant="ghost" size="sm" className="text-xs sm:text-sm px-2 sm:px-4">
							<Link to="/about">关于我们</Link>
						</Button>
						<Button asChild variant="ghost" size="sm" className="text-xs sm:text-sm px-2 sm:px-4">
							<Link to="/contact">联系我们</Link>
						</Button>
						<Button asChild className="text-xs sm:text-sm px-2 sm:px-4">
							<Link to="/">开始使用</Link>
						</Button>
					</nav>
				</div>
			</header>

			{/* Hero Section */}
			<section className="py-8 sm:py-16 bg-white">
				<div className="max-w-screen-xl mx-auto px-3 sm:px-4 text-center">
					<div className="flex justify-center mb-4 sm:mb-6">
						<div className="bg-blue-100 p-3 sm:p-4 rounded-full">
							<HelpCircleIcon className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />
						</div>
					</div>
					<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">常见问题</h1>
					<p className="text-base sm:text-lg lg:text-xl text-gray-600">
						找到您关于Smail临时邮箱服务的答案
					</p>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="py-8 sm:py-16">
				<div className="max-w-4xl mx-auto px-3 sm:px-4">
					<div className="space-y-3 sm:space-y-4">
						{faqs.map((faq) => (
							<Card key={faq.id} className="hover:shadow-md transition-shadow">
								<CardHeader className="pb-2 sm:pb-4">
									<CardTitle className="flex items-center justify-between text-left text-sm sm:text-base lg:text-lg">
										<span className="pr-2">{faq.question}</span>
										<ChevronDownIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 flex-shrink-0" />
									</CardTitle>
								</CardHeader>
								<CardContent className="pt-0">
									<CardDescription className="text-gray-600 text-sm sm:text-base leading-relaxed">
										{faq.answer}
									</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Help Section */}
			<section className="py-8 sm:py-16 bg-white">
				<div className="max-w-2xl mx-auto px-3 sm:px-4 text-center">
					<h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
						还有其他问题？
					</h2>
					<p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
						如果您没有找到想要的答案，请随时联系我们
					</p>
					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
						<Button asChild variant="outline" size="lg" className="text-sm sm:text-base">
							<Link to="/contact">联系客服</Link>
						</Button>
						<Button asChild size="lg" className="text-sm sm:text-base">
							<Link to="/">立即使用</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Quick Start */}
			<section className="py-8 sm:py-16 bg-blue-50">
				<div className="max-w-screen-xl mx-auto px-3 sm:px-4">
					<h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
						快速开始使用
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
						<div className="w-full text-center">
							<div className="bg-blue-600 text-white w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl font-bold">
								1
							</div>
							<h3 className="text-lg sm:text-xl font-semibold mb-2">访问主页</h3>
							<p className="text-gray-600 text-sm sm:text-base">
								打开Smail主页，系统会自动为您生成临时邮箱
							</p>
						</div>
						<div className="w-full text-center">
							<div className="bg-blue-600 text-white w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl font-bold">
								2
							</div>
							<h3 className="text-lg sm:text-xl font-semibold mb-2">复制邮箱地址</h3>
							<p className="text-gray-600 text-sm sm:text-base">
								点击复制按钮，将临时邮箱地址用于注册或验证
							</p>
						</div>
						<div className="w-full text-center">
							<div className="bg-blue-600 text-white w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl font-bold">
								3
							</div>
							<h3 className="text-lg sm:text-xl font-semibold mb-2">接收邮件</h3>
							<p className="text-gray-600 text-sm sm:text-base">
								刷新页面即可查看收到的邮件，点击可查看详情
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
