import { bindings, defineConfig, exports } from "cf/config";

// 域名、Worker 名、数据库和存储桶都写在仓库根目录的 site.config.ts 里。
import { site } from "../site.config.ts";
// 用带 cf-worker 属性的导入而不是路径字符串：这样 ctx.exports 能按入口实际导出的类推出类型。
import * as entrypoint from "./src/index.ts" with { type: "cf-worker" };

export default defineConfig({
	// --mode staging 部署成另一个名字的 Worker（名字后面加 -staging）：只有 workers.dev 的地址，
	// 不绑域名、不接收邮件，数据库和存储与正式环境共用。用来在上线前实际走一遍。
	worker: ({ mode }) => ({
		name: mode === "staging" ? `${site.worker}-staging` : site.worker,
		entrypoint,
		compatibilityDate: "2025-11-26",
		// 静态文件是前端的构建产物（../dist/client），由 vite.config.ts 的 publicDir 带进来。
		// 页面、404 页都由静态资源直接返回，只有 /api/* 才进 Worker。
		assets: {
			notFoundHandling: "404-page",
			runWorkerFirst: ["/api/*"],
		},
		observability: {
			logs: { enabled: false },
			traces: { enabled: false },
			issues: { enabled: true },
		},
		env: {
			// 邮件元数据。迁移文件在 migrations/，用 `pnpm run migrate` 执行。
			D1: bindings.d1({ id: site.database.id, name: site.database.name }),
			// 邮件原文，对象 key 是邮件 id。
			R2: bindings.r2({ name: site.bucket }),
			// 会话 cookie 的签名密钥，逗号分隔可轮换。
			SESSION_SECRETS: bindings.secret(),
		},
		exports: {
			// 新邮件推送用的 Durable Object，见 src/inbox-hub.ts
			InboxHub: exports.durableObject({ storage: "sqlite" }),
		},
	}),
});
