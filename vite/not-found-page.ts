import type { PrerenderIntegration } from "prerender-crawler";

/**
 * 生成 404.html：访问不存在的地址时，静态资源服务直接返回它（状态码 404），不经过 Worker。
 *
 * 它是一个不带应用脚本的独立小页面。浏览器里会立刻回到对应语言的首页——从地址的第一段
 * 判断语言，所以需要知道有哪些语言；没开脚本的访客看到的是一个回首页的链接。
 */
export function notFoundPage(locales: string[]): PrerenderIntegration {
	const prefixes = locales.filter((locale) => locale !== "en");
	const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>404 | smail.pw</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<script>(function(){var m=/^\\/(${prefixes.join("|")})(?:\\/|$)/.exec(location.pathname);location.replace(m?"/"+m[1]:"/")})()</script>
<style>
:root{color-scheme:light dark}
body{display:grid;min-height:100dvh;margin:0;place-content:center;justify-items:center;gap:1rem;background:#faf9f6;color:#16150f;font-family:system-ui,-apple-system,sans-serif}
h1{margin:0;font-size:3rem;letter-spacing:-0.04em}
a{color:inherit}
@media (prefers-color-scheme:dark){body{background:#0e0e0d;color:#f2f1ec}}
</style>
</head>
<body>
<h1>404</h1>
<a href="/">smail.pw</a>
</body>
</html>
`;
	return {
		name: "not-found-page",
		teardown(context) {
			context.emitFile({ filename: "404.html", contents: html });
		},
	};
}
