import { Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export function Navigation({ currentPath = "/" }: { currentPath?: string }) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navItems = [
		{ href: "/", label: "首页", description: "获取临时邮箱" },
		{ href: "/about", label: "关于", description: "了解 Smail" },
		{ href: "/faq", label: "FAQ", description: "常见问题" },
		{ href: "/contact", label: "联系", description: "联系我们" },
	];

	return (
		<header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link
						to="/"
						className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
					>
						<div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-2">
							<Mail className="h-6 w-6 text-white" />
						</div>
						<div>
							<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
								Smail
							</h1>
							<p className="text-sm text-gray-600">临时邮箱服务</p>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						{navItems.map((item) => (
							<Link
								key={item.href}
								to={item.href}
								className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-blue-600 ${
									currentPath === item.href
										? "text-blue-600 bg-blue-50"
										: "text-gray-700 hover:bg-gray-50"
								}`}
							>
								{item.label}
							</Link>
						))}
						<Button
							asChild
							className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
						>
							<Link to="/">开始使用</Link>
						</Button>
					</nav>

					{/* Mobile Menu Button */}
					<button
						type="button"
						className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						aria-label="切换菜单"
					>
						{isMobileMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</button>
				</div>

				{/* Mobile Navigation */}
				{isMobileMenuOpen && (
					<nav className="md:hidden mt-4 pb-4 border-t border-gray-100">
						<div className="pt-4 space-y-2">
							{navItems.map((item) => (
								<Link
									key={item.href}
									to={item.href}
									className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
										currentPath === item.href
											? "text-blue-600 bg-blue-50"
											: "text-gray-700 hover:bg-gray-50"
									}`}
									onClick={() => setIsMobileMenuOpen(false)}
								>
									<div>
										<div>{item.label}</div>
										<div className="text-xs text-gray-500 mt-1">
											{item.description}
										</div>
									</div>
								</Link>
							))}
							<div className="pt-2">
								<Button
									asChild
									className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
								>
									<Link to="/">开始使用</Link>
								</Button>
							</div>
						</div>
					</nav>
				)}
			</div>
		</header>
	);
}
