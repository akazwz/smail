import type { LoaderFunctionArgs } from "react-router";

export function loader({ request }: LoaderFunctionArgs) {
	const host =
		request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");

	if (!host) {
		throw new Error("Could not determine domain URL.");
	}

	const protocol = host.includes("localhost") ? "http" : "https";
	const domain = `${protocol}://${host}`;

	// 使用当前日期，ISO 8601格式
	const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD格式

	// 网站主要页面 - 只包含实际存在的路由
	const pages = [
		{
			url: "",
			changefreq: "daily",
			priority: "1.0",
			lastmod: currentDate,
		},
		{
			url: "/about",
			changefreq: "monthly",
			priority: "0.8",
			lastmod: currentDate,
		},
		{
			url: "/contact",
			changefreq: "monthly",
			priority: "0.7",
			lastmod: currentDate,
		},
		{
			url: "/faq",
			changefreq: "monthly",
			priority: "0.7",
			lastmod: currentDate,
		},
		{
			url: "/privacy",
			changefreq: "yearly",
			priority: "0.5",
			lastmod: currentDate,
		},
		{
			url: "/terms",
			changefreq: "yearly",
			priority: "0.5",
			lastmod: currentDate,
		},
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>${domain}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
	)
	.join("\n")}
</urlset>`;

	return new Response(sitemap, {
		status: 200,
		headers: {
			"Content-Type": "application/xml",
			"Cache-Control": "public, max-age=3600", // 缓存1小时
		},
	});
}
