import type { LoaderFunctionArgs } from "react-router";

export function loader({ request }: LoaderFunctionArgs) {
	const host =
		request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");

	if (!host) {
		throw new Error("Could not determine domain URL.");
	}

	const protocol = host.includes("localhost") ? "http" : "https";
	const domain = `${protocol}://${host}`;

	// 网站主要页面
	const pages = [
		{
			url: "",
			changefreq: "daily",
			priority: "1.0",
			lastmod: new Date().toISOString().split("T")[0],
		},
		{
			url: "/about",
			changefreq: "monthly",
			priority: "0.8",
			lastmod: "2024-12-01",
		},
		{
			url: "/faq",
			changefreq: "monthly",
			priority: "0.7",
			lastmod: "2024-12-01",
		},
		{
			url: "/contact",
			changefreq: "monthly",
			priority: "0.6",
			lastmod: "2024-12-01",
		},
		{
			url: "/privacy",
			changefreq: "monthly",
			priority: "0.5",
			lastmod: "2024-12-01",
		},
		{
			url: "/terms",
			changefreq: "monthly",
			priority: "0.5",
			lastmod: "2024-12-01",
		},
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
	.map(
		(page) => `  <url>
    <loc>${domain}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${domain}${page.url}" />
  </url>`,
	)
	.join("\n")}
</urlset>`;

	return new Response(sitemap, {
		status: 200,
		headers: {
			"Content-Type": "application/xml",
			"xml-version": "1.0",
			encoding: "UTF-8",
			"Cache-Control": "public, max-age=3600", // 缓存1小时
		},
	});
}
