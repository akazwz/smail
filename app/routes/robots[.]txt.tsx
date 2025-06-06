import type { LoaderFunctionArgs } from "react-router";

export function loader({ request }: LoaderFunctionArgs) {
	const host =
		request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");

	if (!host) {
		throw new Error("Could not determine domain URL.");
	}

	const protocol = host.includes("localhost") ? "http" : "https";
	const domain = `${protocol}://${host}`;

	const robotsText = `User-agent: *
Allow: /

# 不需要爬取的路径
Disallow: /api/
Disallow: /_dev/
Disallow: /admin/
Disallow: /mail/
Disallow: /attachment/
Disallow: /dev/

# 隐私保护 - 邮件内容页面
User-agent: *
Disallow: /mail/*

# 开发环境页面
User-agent: *
Disallow: /dev/*

# 附件下载页面
User-agent: *
Disallow: /attachment/*

# Sitemap位置
Sitemap: ${domain}/sitemap.xml`;

	return new Response(robotsText, {
		status: 200,
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=86400", // 缓存24小时
		},
	});
}
