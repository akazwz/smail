import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

// 全局默认 meta 配置
export function meta() {
	return [
		{
			title:
				"Smail - 免费临时邮箱服务 | 一次性邮件地址生成器，无需注册即时使用，24小时有效保护隐私",
		},
		{
			name: "description",
			content:
				"Smail提供免费、安全、无广告的临时邮箱服务。无需注册，即时获取临时邮箱地址，保护您的隐私，避免垃圾邮件。24小时有效期，支持附件，完全免费。",
		},
		{
			name: "keywords",
			content:
				"临时邮箱,一次性邮箱,临时邮件,disposable email,temp mail,临时email,免费邮箱,隐私保护,垃圾邮件防护",
		},
		{ name: "author", content: "Smail Team" },
		{ name: "robots", content: "index, follow" },
		{ name: "googlebot", content: "index, follow" },

		// Open Graph 标签
		{ property: "og:type", content: "website" },
		{
			property: "og:title",
			content: "Smail - 免费临时邮箱服务 | 一次性邮件地址生成器",
		},
		{
			property: "og:description",
			content: "保护隐私的免费临时邮箱服务，无需注册，即时使用，24小时有效。",
		},
		{ property: "og:site_name", content: "Smail" },
		{ property: "og:locale", content: "zh_CN" },

		// Twitter Card
		{ name: "twitter:card", content: "summary_large_image" },
		{
			name: "twitter:title",
			content: "Smail - 免费临时邮箱服务 | 一次性邮件地址生成器",
		},
		{
			name: "twitter:description",
			content: "保护隐私的免费临时邮箱服务，无需注册，即时使用。",
		},

		// 移动端优化
		{ name: "format-detection", content: "telephone=no" },
		{ name: "mobile-web-app-capable", content: "yes" },
		{ name: "apple-mobile-web-app-capable", content: "yes" },
		{ name: "apple-mobile-web-app-status-bar-style", content: "default" },
		{ name: "apple-mobile-web-app-title", content: "Smail" },
	];
}

export const links: Route.LinksFunction = () => [
	// 字体预加载优化
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "preload",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
		as: "style",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},

	// Favicon and App Icons
	{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
	{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
	{
		rel: "icon",
		type: "image/png",
		sizes: "32x32",
		href: "/favicon-32.png",
	},
	{
		rel: "icon",
		type: "image/png",
		sizes: "16x16",
		href: "/favicon-16.png",
	},
	{ rel: "apple-touch-icon", sizes: "192x192", href: "/icon-192.png" },
	{ rel: "manifest", href: "/site.webmanifest" },

	// SEO 相关
	{ rel: "canonical", href: "https://smail.pw" },
	{ rel: "alternate", hrefLang: "zh-CN", href: "https://smail.pw" },
];

export function Layout({ children }: { children: React.ReactNode }) {
	// 结构化数据 JSON
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "WebApplication",
		name: "Smail",
		description: "免费临时邮箱服务，保护隐私，避免垃圾邮件",
		url: "https://smail.pw",
		applicationCategory: "UtilityApplication",
		operatingSystem: "Any",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
		author: {
			"@type": "Organization",
			name: "Smail Team",
		},
		keywords: "临时邮箱,一次性邮箱,临时邮件,disposable email,temp mail",
		applicationSubCategory: "Email Service",
		featureList: [
			"免费使用",
			"无需注册",
			"隐私保护",
			"24小时有效期",
			"支持附件",
			"实时接收邮件",
		],
	};

	return (
		<html lang="zh-CN">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, viewport-fit=cover"
				/>
				<Meta />
				<Links />

				{/* JSON-LD 结构化数据 */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/>

				{/* 统计脚本 */}
				<script
					defer
					src="https://u.pexni.com/script.js"
					data-website-id="09979220-99e5-4973-b1b2-5e46163fe2d2"
				/>
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
