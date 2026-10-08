import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
	// 网站本身是前端项目的构建产物：这里把它当作静态文件原样带进部署包。
	// 先在上一级目录跑 `pnpm run build`，再构建这里。
	publicDir: "../dist/client",
	// 8787 是 wrangler 的默认端口，容易和别的项目撞，这里用一个固定的别的端口。
	server: { port: 8791, strictPort: true },
	plugins: [
		// Worker 的配置来自 cloudflare.config.ts；构建产物按 cf CLI 的格式输出到 .cloudflare/output。
		cloudflare({ experimental: { newConfig: { cfBuildOutput: true } } }),
	],
});
