import { rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import solid from "@solidjs/vite-plugin";
import stylex from "@stylexjs/unplugin";
import { sitemap } from "prerender-crawler";
import { prerender } from "prerender-crawler/vite";
import { defineConfig } from "vite";

import { SUPPORTED_LOCALES } from "./app/i18n/config.ts";
import { markdownTree } from "./vite/markdown.ts";
import { notFoundPage } from "./vite/not-found-page.ts";
import { createPageDates } from "./vite/page-dates.ts";

// 语言清单只有一份，在 app/i18n/config.ts。
const locales = [...SUPPORTED_LOCALES];

const lastModified = createPageDates(locales);

// 这个项目只产出静态网站（dist/client）。收件箱的接口、推送和收信在 worker/ 里，
// 那是另一个独立的项目，部署时把这里的产物当静态文件带上。
export default defineConfig({
	server: {
		// 本地开发时接口由 worker/ 的开发服务器提供（在 worker/ 里跑 pnpm dev）。
		proxy: { "/api": { target: "http://localhost:8791", ws: true } },
	},
	plugins: [
		markdownTree(),
		// StyleX 必须在 Solid 转换 JSX 之前编译。
		stylex.vite({
			useCSSLayers: true,
			// StyleX 要自己解析 *.stylex.ts 的导入，它不读 package.json 的 imports，
			// 所以把 #/ 这个路径别名再告诉它一遍。
			aliases: {
				"#/*": [fileURLToPath(new URL("./app/*", import.meta.url))],
			},
		}),
		solid({
			ssr: true,
			diagnostics: true,
			start: {
				app: "app/app.tsx",
				document: "app/document.tsx",
				// 只在构建和本地开发时运行，见文件里的说明。
				middleware: "./app/middleware.ts",
				// 不要开 renderMode: "async"：这个模式下并发渲染会把一个页面的内容写进另一个页面
				// （Solid 2.0.0-rc.13 实测，官方仓库 solidjs/prerender-crawler#10 也有记录）。
			},
		}),
		// Solid 官方的构建时预渲染：构建完成后在 Node 里把每个页面渲染成 HTML 写进 dist/client。
		// 页面清单由 app/middleware.ts 告诉它。
		prerender({
			mode: "static",
			// /about 写成 about.html，和 /zh 写成 zh.html 一致。
			autoSubfolderIndex: false,
			integrations: [
				notFoundPage(locales),
				// 站点地图由预渲染器按实际渲染出来的页面生成；修改时间取自 git。
				sitemap({
					hostname: "https://smail.pw",
					entry: (page) => ({ lastmod: lastModified(page.path) }),
				}),
				{
					// 构建清单只在构建时有用，不该作为静态文件发布出去。
					name: "drop-build-manifest",
					teardown(context) {
						rmSync(path.join(context.outDir, ".vite"), {
							recursive: true,
							force: true,
						});
					},
				},
			],
		}),
	],
});
