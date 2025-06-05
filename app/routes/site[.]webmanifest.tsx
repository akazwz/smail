import type { LoaderFunctionArgs } from "react-router";

export function loader(_: LoaderFunctionArgs) {
	const manifest = {
		name: "Smail - 临时邮箱服务",
		short_name: "Smail",
		description: "免费、安全、无广告的临时邮箱服务",
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#2563eb",
		orientation: "portrait-primary",
		scope: "/",
		lang: "zh-CN",
		categories: ["productivity", "utilities"],
		icons: [
			{
				src: "/icon-192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/icon-512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/icon-192-maskable.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/icon-512-maskable.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
		shortcuts: [
			{
				name: "获取新邮箱",
				short_name: "新邮箱",
				description: "快速获取一个新的临时邮箱地址",
				url: "/?action=new",
				icons: [
					{
						src: "/icon-192.png",
						sizes: "192x192",
						type: "image/png",
					},
				],
			},
		],
	};

	return new Response(JSON.stringify(manifest), {
		status: 200,
		headers: {
			"Content-Type": "application/manifest+json",
			"Cache-Control": "public, max-age=86400", // 缓存24小时
		},
	});
}
