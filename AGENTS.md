# Repository Guidelines

## 交流与输出语言
- 与用户沟通、任务说明、变更总结默认使用中文。
- 仅在用户明确要求时使用英文。
- 代码标识符、文件名、路由 slug 保持英文，不做无必要翻译。

## 项目结构与模块说明
- `app/`：React Router Framework Mode 主应用。
- `app/routes/`：路由模块（首页、Markdown 页、博客、RSS、Sitemap、API 等）。
- `app/md/<locale>/`：多语言 SEO Markdown 页面。
- `app/blog/<locale>/`：多语言博客 Markdown 内容；元数据在 `app/blog/data.ts`。
- `app/i18n/`：语言配置与文案。
- `app/.server/session.ts`：基于 Cloudflare KV 的 Session 存储。
- `app/utils/`：通用工具（主题、meta、邮件保留策略等）。
- `workers/app.ts`：Cloudflare Worker 入口，处理 `fetch` / `email` / `scheduled`。
- `migrations/*.sql`：D1 SQL 迁移文件（当前项目不使用 ORM）。

## 真实数据架构（必须遵循）
- D1：仅存邮件元数据（`emails` 表）。
- R2：存邮件原始内容（对象 key = 邮件 `id`）。
- KV：存会话数据（临时邮箱地址、签发时间等）。
- 邮件详情接口：`/api/email/:id`，必须校验会话地址归属与过期状态。

## 开发与构建命令
- `pnpm install`：安装依赖。
- `pnpm run dev`：本地开发。
- `pnpm run build`：生产构建。
- `pnpm run preview`：本地预览构建产物。
- `pnpm run typecheck`：Cloudflare 类型生成 + Router 类型生成 + TS 检查。
- `pnpm run cf-typegen`：重新生成 Cloudflare 环境类型。
- `pnpm run migrate`：远端执行 D1 迁移（绑定名：`D1`）。
- `pnpm run deploy`：构建 + 迁移 + Wrangler 部署。

## 代码风格与命名规范
- 使用 TypeScript/TSX + ESM。
- 遵循现有代码风格：
  - 缩进使用 Tab。
  - 保持现有文件风格一致，避免无关格式化。
- 路由命名遵循当前约定（如 `blog.post.tsx`、`sitemap.xml.tsx`、`robots.txt.tsx`）。
- 变量/函数使用 `camelCase`，常量使用 `UPPER_SNAKE_CASE`。

## SEO / 多语言改动联动规则
涉及 SEO 或内容改动时，必须检查并同步以下位置：
- 路由注册：`app/routes.ts`
- SEO 基础路径：`app/seo.config.ts`
- Markdown 页 meta 与结构化数据：`app/routes/md.tsx`
- Sitemap 输出：`app/routes/sitemap.xml.tsx`
- 对应语言内容文件：`app/md/<locale>/...`

新增 Markdown 落地页时，至少保证：
- `en` 与 `zh` 内容完整；
- 其他已支持语言补齐同名文件，避免出现可访问但内容缺失。

## 测试与提交前检查
当前项目未配置独立单测框架，提交前至少执行：
1. `pnpm run typecheck`
2. `pnpm run build`

涉及 D1 结构变更时还需：
- 提交对应 `migrations/*.sql`
- 在目标环境执行 `pnpm run migrate` 验证。

## Commit / PR 规范
- 提交信息使用简短祈使句，单次提交聚焦一个主题。
- PR 描述需包含：
  - 变更目的
  - 关键文件路径
  - 已执行命令及结果
  - 若有 UI 变化，附截图
- 涉及 i18n / SEO / 部署配置时，需明确说明影响范围。

## 安全与配置
- 禁止提交任何密钥、Token、私密凭证。
- `wrangler.jsonc` 中的资源 ID/名称可公开，但不要提交可直接鉴权的敏感信息。
- 开源一键部署依赖仓库中的 `wrangler.jsonc`，不要只保留 example 文件。
