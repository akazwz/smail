import { FileTextIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

import type { Route } from "./+types/terms";

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "服务使用条款 - Smail临时邮箱用户协议及使用规范" },
		{
			name: "description",
			content:
				"阅读Smail临时邮箱完整服务条款，包含使用规则、服务范围、用户责任、免责声明等。了解免费临时邮件服务的合理使用政策，确保安全合规使用一次性邮箱。",
		},
	];
}

export default function Terms() {
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
							<FileTextIcon className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />
						</div>
					</div>
					<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
						服务条款
					</h1>
					<p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-3 sm:mb-4">
						使用Smail服务前，请仔细阅读以下服务条款
					</p>
					<p className="text-sm text-gray-500">最后更新时间：2025年1月15日</p>
				</div>
			</section>

			{/* Terms Content */}
			<section className="py-8 sm:py-16">
				<div className="max-w-screen-lg mx-auto px-3 sm:px-4">
					<div className="space-y-6 sm:space-y-8">
						<Card>
							<CardHeader>
								<CardTitle>服务概述</CardTitle>
								<CardDescription>Smail提供的服务内容和范围</CardDescription>
							</CardHeader>
							<CardContent className="prose max-w-none">
								<p className="text-gray-600 mb-4">
									Smail（以下简称"我们"或"本服务"）是一个免费的临时邮箱服务平台。
									通过使用我们的服务，您可以：
								</p>
								<ul className="list-disc pl-6 space-y-1 text-gray-600">
									<li>获取临时的电子邮件地址</li>
									<li>接收发送到该地址的邮件</li>
									<li>查看邮件内容和附件</li>
									<li>在邮箱过期前正常使用邮箱功能</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>接受条款</CardTitle>
								<CardDescription>使用服务即表示您同意这些条款</CardDescription>
							</CardHeader>
							<CardContent className="prose max-w-none">
								<p className="text-gray-600">
									通过访问和使用Smail服务，您确认已阅读、理解并同意受本服务条款的约束。
									如果您不同意这些条款，请不要使用我们的服务。
								</p>
								<p className="text-gray-600 mt-4">
									我们保留随时修改这些条款的权利。修改后的条款将在发布后立即生效。
									继续使用服务即表示您接受修改后的条款。
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>使用规则</CardTitle>
								<CardDescription>使用服务时必须遵守的规则</CardDescription>
							</CardHeader>
							<CardContent className="prose max-w-none">
								<h4 className="font-semibold mb-2">允许的使用</h4>
								<ul className="list-disc pl-6 space-y-1 text-gray-600">
									<li>用于网站注册和邮箱验证</li>
									<li>接收临时性的邮件通知</li>
									<li>保护主邮箱隐私</li>
									<li>测试邮件系统功能</li>
								</ul>

								<h4 className="font-semibold mb-2 mt-4">禁止的使用</h4>
								<ul className="list-disc pl-6 space-y-1 text-gray-600">
									<li>用于非法活动或违法行为</li>
									<li>传播垃圾邮件或恶意内容</li>
									<li>尝试破坏或干扰服务运行</li>
									<li>滥用服务资源（如大量请求）</li>
									<li>用于商业营销或广告目的</li>
									<li>侵犯他人隐私或知识产权</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>服务限制</CardTitle>
								<CardDescription>服务的技术限制和使用限制</CardDescription>
							</CardHeader>
							<CardContent className="prose max-w-none">
								<ul className="list-disc pl-6 space-y-2 text-gray-600">
									<li>
										<strong>邮箱有效期：</strong>临时邮箱通常在24小时后自动过期
									</li>
									<li>
										<strong>存储限制：</strong>单个邮箱最多存储100封邮件
									</li>
									<li>
										<strong>附件大小：</strong>支持最大25MB的附件
									</li>
									<li>
										<strong>只能接收：</strong>不支持发送邮件功能
									</li>
									<li>
										<strong>访问频率：</strong>每分钟最多刷新10次
									</li>
									<li>
										<strong>数据保留：</strong>邮件在邮箱过期后自动删除
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>隐私和数据</CardTitle>
								<CardDescription>关于您的数据和隐私保护</CardDescription>
							</CardHeader>
							<CardContent className="prose max-w-none">
								<p className="text-gray-600 mb-4">
									请注意，临时邮箱服务的特性决定了以下重要事项：
								</p>
								<ul className="list-disc pl-6 space-y-2 text-gray-600">
									<li>
										<strong>数据临时性：</strong>
										所有数据都是临时的，会在邮箱过期后删除
									</li>
									<li>
										<strong>不适合敏感信息：</strong>请勿用于接收重要或敏感信息
									</li>
									<li>
										<strong>无法恢复：</strong>过期删除的数据无法恢复
									</li>
									<li>
										<strong>隐私保护：</strong>我们遵循隐私政策保护您的数据
									</li>
								</ul>
								<p className="text-gray-600 mt-4">
									详细的隐私保护措施请参考我们的
									<Link to="/privacy" className="text-blue-600 hover:underline">
										隐私政策
									</Link>
									。
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>免责声明</CardTitle>
								<CardDescription>服务提供的免责声明</CardDescription>
							</CardHeader>
							<CardContent className="prose max-w-none">
								<ul className="list-disc pl-6 space-y-2 text-gray-600">
									<li>
										<strong>服务可用性：</strong>
										我们努力保持服务正常运行，但不保证100%可用性
									</li>
									<li>
										<strong>数据丢失：</strong>对于任何数据丢失，我们不承担责任
									</li>
									<li>
										<strong>第三方内容：</strong>
										对于接收到的邮件内容，我们不负责也不认可
									</li>
									<li>
										<strong>服务中断：</strong>
										因维护、升级或其他原因导致的服务中断
									</li>
									<li>
										<strong>安全风险：</strong>
										用户应自行评估使用临时邮箱的安全风险
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>知识产权</CardTitle>
								<CardDescription>关于服务的知识产权说明</CardDescription>
							</CardHeader>
							<CardContent className="prose max-w-none">
								<p className="text-gray-600 mb-4">
									Smail服务的所有内容，包括但不限于：
								</p>
								<ul className="list-disc pl-6 space-y-1 text-gray-600">
									<li>网站设计和界面</li>
									<li>软件代码和技术</li>
									<li>商标和标识</li>
									<li>文档和说明</li>
								</ul>
								<p className="text-gray-600 mt-4">
									均为我们所有或经过授权使用。未经明确许可，不得复制、修改或用于商业目的。
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>服务变更和终止</CardTitle>
								<CardDescription>关于服务的变更和终止</CardDescription>
							</CardHeader>
							<CardContent className="prose max-w-none">
								<h4 className="font-semibold mb-2">服务变更</h4>
								<p className="text-gray-600 mb-4">
									我们保留随时修改、暂停或终止部分或全部服务的权利，包括：
								</p>
								<ul className="list-disc pl-6 space-y-1 text-gray-600">
									<li>功能更新或调整</li>
									<li>技术升级或维护</li>
									<li>政策或条款修改</li>
								</ul>

								<h4 className="font-semibold mb-2 mt-4">服务终止</h4>
								<p className="text-gray-600">
									我们可能因以下原因终止或限制用户对服务的访问：
								</p>
								<ul className="list-disc pl-6 space-y-1 text-gray-600">
									<li>违反服务条款</li>
									<li>滥用服务资源</li>
									<li>技术或商业原因</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>法律适用</CardTitle>
								<CardDescription>适用的法律和争议解决</CardDescription>
							</CardHeader>
							<CardContent className="prose max-w-none">
								<p className="text-gray-600 mb-4">
									本服务条款受服务提供地法律管辖。如有争议，双方应首先通过友好协商解决。
								</p>
								<p className="text-gray-600 mb-4">
									如协商无法解决争议，任何一方均可通过适当的法律途径寻求解决，包括但不限于：
								</p>
								<ul className="list-disc pl-6 space-y-1 text-gray-600 mb-4">
									<li>在线争议解决平台</li>
									<li>仲裁机构</li>
									<li>有管辖权的法院</li>
								</ul>
								<p className="text-gray-600">
									如本条款的任何部分被认定为无效或不可执行，其余部分仍然有效。
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>联系我们</CardTitle>
								<CardDescription>如何就服务条款联系我们</CardDescription>
							</CardHeader>
							<CardContent className="prose max-w-none">
								<p className="text-gray-600 mb-4">
									如果您对本服务条款有任何问题，请通过以下方式联系我们：
								</p>
								<ul className="list-disc pl-6 space-y-1 text-gray-600">
									<li>邮箱：legal@smail.pw</li>
									<li>
										联系表单：通过我们的
										<Link
											to="/contact"
											className="text-blue-600 hover:underline"
										>
											联系页面
										</Link>
									</li>
								</ul>
								<p className="text-gray-600 mt-4">
									我们会在收到您的询问后尽快回复。
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
						同意条款并开始使用
					</h2>
					<p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
						通过使用我们的服务，您确认已阅读并同意上述服务条款
					</p>
					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
						<Button asChild size="lg" className="text-sm sm:text-base">
							<Link to="/">同意并开始使用</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="text-sm sm:text-base"
						>
							<Link to="/contact">有疑问？联系我们</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
