import { Github, Mail, MessageSquare, Shield, Twitter } from "lucide-react";
import { Link } from "react-router";

export function Footer() {
	return (
		<footer className="bg-gray-900 text-white">
			<div className="container mx-auto px-4 py-12">
				<div className="grid md:grid-cols-4 gap-8">
					{/* 品牌信息 */}
					<div className="col-span-1 md:col-span-2">
						<div className="flex items-center space-x-3 mb-4">
							<div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-2">
								<Mail className="h-6 w-6 text-white" />
							</div>
							<div>
								<h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
									Smail
								</h3>
								<p className="text-sm text-gray-400">临时邮箱服务</p>
							</div>
						</div>
						<p className="text-gray-300 leading-relaxed mb-4">
							保护您的隐私，避免垃圾邮件。提供安全、免费、无广告的临时邮箱服务。
							无需注册，即时获取，24小时有效期，完全保护您的真实邮箱地址。
						</p>
						<div className="flex space-x-4">
							<Link
								to="/contact"
								className="text-gray-400 hover:text-blue-400 transition-colors"
								aria-label="联系我们"
							>
								<MessageSquare className="h-5 w-5" />
							</Link>
							<a
								href="https://github.com/akazwz/smail"
								className="text-gray-400 hover:text-blue-400 transition-colors"
								aria-label="GitHub"
							>
								<Github className="h-5 w-5" />
							</a>
							<a
								href="https://twitter.com/akazwz_"
								className="text-gray-400 hover:text-blue-400 transition-colors"
								aria-label="Twitter"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Twitter className="h-5 w-5" />
							</a>
							<Link
								to="/privacy"
								className="text-gray-400 hover:text-blue-400 transition-colors"
								aria-label="隐私政策"
							>
								<Shield className="h-5 w-5" />
							</Link>
						</div>
					</div>

					{/* 快速链接 */}
					<div>
						<h4 className="text-lg font-semibold mb-4">快速链接</h4>
						<ul className="space-y-2">
							<li>
								<Link
									to="/"
									className="text-gray-300 hover:text-blue-400 transition-colors"
								>
									首页
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									className="text-gray-300 hover:text-blue-400 transition-colors"
								>
									关于我们
								</Link>
							</li>
							<li>
								<Link
									to="/faq"
									className="text-gray-300 hover:text-blue-400 transition-colors"
								>
									常见问题
								</Link>
							</li>
							<li>
								<Link
									to="/terms"
									className="text-gray-300 hover:text-blue-400 transition-colors"
								>
									使用条款
								</Link>
							</li>
						</ul>
					</div>

					{/* 联系我们 */}
					<div>
						<h4 className="text-lg font-semibold mb-4">帮助支持</h4>
						<ul className="space-y-2">
							<li>
								<Link
									to="/contact"
									className="text-gray-300 hover:text-blue-400 transition-colors"
								>
									联系我们
								</Link>
							</li>
							<li>
								<Link
									to="/privacy"
									className="text-gray-300 hover:text-blue-400 transition-colors"
								>
									隐私政策
								</Link>
							</li>
							<li>
								<Link
									to="/faq"
									className="text-gray-300 hover:text-blue-400 transition-colors"
								>
									使用帮助
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* 分割线 */}
				<div className="border-t border-gray-800 mt-8 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<div className="text-sm text-gray-400">
							© 2024 Smail. 保留所有权利.
						</div>
						<div className="flex space-x-6 text-sm text-gray-400">
							<span className="text-gray-500">免费 · 安全 · 隐私保护</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
