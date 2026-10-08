# smail.pw（smail-v3）

基于 Solid 2 + StyleX + Cloudflare Workers 的临时邮箱服务。

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/akazwz/smail)

- 线上域名：`https://smail.pw`
- Worker 名称：`smail-app`
- 默认语言：`en`（同时支持 19 种语言）

## 一键部署（Deploy to Cloudflare）

- 上方按钮可让其他开发者将本项目一键部署到他们自己的 Cloudflare 账号。
- 这个按钮原先依赖仓库中的 `wrangler.jsonc`。仓库现在用 `cloudflare.config.ts`，按钮是否仍然可用尚未验证；不可用时请按下面的“部署说明”手动部署。
- 项目仓库需要保持公开（public）才能让他人正常使用该按钮。

## 项目简介

这是一个面向低风险场景的临时邮箱网站，核心目标是：

- 一键生成临时邮箱地址
- 即时查看收件箱
- 用于注册验证、OTP、一次性下载等短期流程
- 避免暴露长期个人邮箱

项目同时包含多语言 SEO 页面（Markdown）和多语言博客。

## 技术栈

- 前端：Solid 2（RC）+ `@solidjs/router`，用 Solid 官方的 `prerender-crawler` 在构建时预渲染成纯静态网站
- Cloudflare Workers（HTTP + Email Worker）
- Cloudflare D1（存储邮件元数据和联系页的留言）
- Cloudflare R2（存储邮件原始内容）
- Signed Cookie Session（`worker/src/session.ts`，不占任何存储）
- StyleX（编译期生成原子化 CSS），组件库在 `app/ui`
- 前端和 Worker 是两个独立的项目：所有页面（含首页、404）都是静态文件，由 Cloudflare 静态资源直接返回；Worker（`worker/`）只负责 `/api/*`、推送和收信
- Durable Objects（WebSocket Hibernation）：新邮件到达时推送给正在看收件箱的页面
- Markdoc（构建时把 Markdown 页面与博客解析成结构树）

## 核心功能

- 首页临时邮箱收件箱
- 邮件预览弹窗（解析 HTML/Text）
- 多语言路由（`/:lang?`）
- SEO 路由：`/robots.txt`、`/sitemap.xml`、`/rss.xml`
- 多语言 Markdown 页面（about/faq/privacy/terms + 长尾 SEO 落地页）
- 多语言博客列表、分页、文章页
- 联系页的留言表单（唯一的联系方式；存进 D1，不发通知，站长自己定期查看）

## 数据流（真实实现）

1. 邮件进入 Worker 的 `email` 事件（`worker/src/index.ts`）
2. 解析原始邮件后：
   - 元数据写入 D1 `emails` 表（`id/to_address/from/subject/time`）
   - 原始邮件内容写入 R2（对象 key 为 `id`）
3. 首页在浏览器里调用 `GET /api/inbox`，Worker 按当前会话中的地址读取 D1 列表
4. 打开邮件详情时，调用 `GET /api/email/:id`（`worker/src/inbox.ts`）：
   - 校验该邮件地址属于当前会话
   - 从 R2 读取原始邮件并解析后返回

说明：地址只有用户主动更换或删除时才会变；地址和邮件默认长期保留，但不做保证。单封邮件原文超过 5 MB 时只保存正文。

## 目录结构

仓库里是两个独立的项目：根目录是前端（产出纯静态网站），`worker/` 是 Cloudflare Worker。

```text
app/                     # 前端：Solid 2 + StyleX
  app.tsx                # 应用根组件（路由 + 布局）
  document.tsx           # 文档外壳（<html>、<head>）
  router.ts              # 路由表
  data.ts                # query / action：页面读写数据的入口
  api.ts                 # 调用 Worker 接口的函数（只在浏览器里用）
  utils/inbox.ts         # useInbox()：首页收件箱的状态和操作
  middleware.ts          # 只在构建时运行：robots / sitemap / RSS，并把页面清单告诉预渲染
  routes/                # 页面组件（home、md、blog、contact、not-found、layout）
  components/            # 业务组件（邮箱窗口、邮件列表、Markdown 渲染等）
  ui/                    # 组件库与设计变量（tokens.stylex.ts）
  feeds.ts               # robots / sitemap / RSS 的内容和全站页面清单（只在构建时运行）
  md/                    # 多语言 SEO Markdown 页面
  blog/                  # 多语言博客内容
  i18n/                  # 语言配置；locales/ 下每种语言一个文案文件，按语言单独加载
public/                  # 原样发布的静态文件（图标、分享图、_headers、_redirects）
vite/                    # 构建用的小插件（Markdown 解析、404 页）
vite.config.ts           # 前端构建：Solid 插件 + 官方预渲染插件
dist/client/             # 前端的构建产物：整个静态网站

worker/                  # Cloudflare Worker：一个独立的项目
  src/index.ts           # 入口：/api/* 接口、收信，并导出 Durable Object
  src/contract.ts        # 前端和 Worker 之间的约定（接口的数据结构），两边共用这一份
  src/session.ts         # 签名 cookie 会话
  src/inbox.ts           # 收件箱和邮件正文的查询
  src/mail.ts            # 收信：原文进 R2，元数据进 D1
  src/inbox-hub.ts       # 新邮件推送（Durable Object + WebSocket）
  src/address.ts         # 生成地址
  src/messages.ts        # 保存联系页的留言
  migrations/*.sql       # D1 迁移
  cloudflare.config.ts   # Worker 配置：绑定、静态资源、Durable Object
  vite.config.ts         # Worker 的构建；publicDir 指向 ../dist/client
```

## 本地开发

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发

先创建本地 secret：

```bash
cp worker/.env.example worker/.env
```

```bash
pnpm run dev
```

这条命令同时起两个开发服务器：前端在 `http://localhost:5173`，Worker 在 `http://localhost:8791`。
前端把 `/api` 的请求（包括 WebSocket）代理给 Worker，所以只需要打开 5173。

### 3. 类型检查

```bash
pnpm run typecheck
```

### 4. 生产构建与预览

```bash
pnpm run build     # 只构建前端，产物在 dist/client
pnpm run preview   # 构建前端和 Worker，在 http://localhost:8788 预览完整的站点
```

## 常用命令

在仓库根目录：

- `pnpm run dev`：本地开发（前端 + Worker）
- `pnpm run build`：构建前端并预渲染，产物在 `dist/client`
- `pnpm run preview`：本地预览完整的站点（静态文件 + Worker）
- `pnpm run typecheck`：两个项目的类型检查
- `pnpm run lint` / `pnpm run format`：Oxlint 代码检查 / Oxfmt 格式化
- `pnpm run check`：类型检查 + 代码检查 + 格式检查
- `pnpm run deploy`：构建前端和 Worker、执行远端迁移，然后 `cf deploy --prebuilt`
- `pnpm run deploy:dry-run`：同上，但不上传

在 `worker/` 目录：

- `pnpm run migrate`：对远端 D1（`smail-v3`）执行迁移
- `pnpm run migrate:local`：对本地开发用的 D1 执行迁移
- `pnpm run messages`：列出最近 50 条留言（读的是线上的库）

配置和命令行用的是 Cloudflare 新的 `cloudflare.config.ts` 与 `cf` CLI（目前是 beta）。`wrangler` 的命令读不到这份配置。

## Cloudflare 资源绑定

`worker/cloudflare.config.ts` 当前声明了以下绑定：

- `D1`：邮件元数据和留言（数据库名 `smail-v3`）
- `R2`：邮件内容对象存储（桶名 `smailv3`）
- `InboxHub`：新邮件推送用的 Durable Object（在 `exports` 里声明）

此外还需要配置一个 Worker Secret：

- `SESSION_SECRETS`：Cookie Session 的签名密钥。支持逗号分隔多个值用于轮换，最左侧为当前生效密钥。

本地开发可使用 `worker/.env`，生产环境使用：

注意：`.env` 和 `.dev.vars` 二选一即可；如果存在 `.dev.vars`，本地开发时不会再加载 `.env`。

密钥按 Worker 名字设置（这条命令不依赖配置文件）；也可以在部署时用 `cf deploy --prebuilt --secrets-file <文件>` 一并上传。

```bash
cd worker && pnpm exec wrangler secret put SESSION_SECRETS --name smail-app
```

## 数据库迁移

当前迁移文件：

- `worker/migrations/20260211_create_emails.sql`
- `worker/migrations/20260212_email_indexes.sql`
- `worker/migrations/20261008_create_messages.sql`（联系页的留言）

首次部署或表结构变更后，在 `worker/` 目录执行：

```bash
pnpm run migrate
```

## 多语言与 SEO

- 支持语言：`en/zh/es/fr/de/ja/ko/ru/pt/ar/id/vi/hi/bn/ur/tr/th/it/pl`
- 默认语言为 `en`，默认语言不带前缀
- Markdown 页面与博客均支持多语言
- 自动生成 sitemap（包含首页、Markdown 页、博客列表/分页/文章）

## 部署说明

```bash
pnpm run deploy
```

发布前建议至少执行：

```bash
pnpm run check
pnpm run build
```

## 重要边界

- 本项目面向临时收信与低风险验证场景。
- 不建议用于银行、工作、政务、法律与关键账号找回等高敏感场景。
