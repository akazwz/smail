# smail.pw（smail-v3）

基于 Solid 2 + StyleX + Cloudflare Workers 的临时邮箱服务。

- 线上域名：`https://smail.pw`
- 默认语言：`en`（同时支持 19 种语言）
- 想部署一份自己的：见下面的[自己部署](#自己部署)（English: [docs/deploy.en.md](docs/deploy.en.md)）
- 旧版（React Router + `wrangler.jsonc`）归档在 [`v3`](https://github.com/akazwz/smail/releases/tag/v3) 标签

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

site.config.ts           # 站点配置：域名、Worker 名、数据库、存储桶。自己部署只改它

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
  d1.mjs                 # 把 site.config.ts 里的数据库 ID 交给 cf 的 D1 命令
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
- `pnpm run deploy:first`：第一次部署用，多上传一份密钥（见“自己部署”）
- `pnpm run deploy:dry-run`：同上，但不上传

在 `worker/` 目录：

- `pnpm run migrate`：对远端 D1 执行迁移
- `pnpm run migrate:local`：对本地开发用的 D1 执行迁移
- `pnpm run messages`：列出最近 50 条留言（读的是线上的库）

配置和命令行用的是 Cloudflare 新的 `cloudflare.config.ts` 与 `cf` CLI（目前是 beta）。`wrangler` 的命令读不到这份配置。

## 自己部署

需要改的只有仓库根目录的 `site.config.ts` 一个文件。下面第 1–5 步是在一个全新的拷贝上实际走通过的（2026-10-08）；第 6 步在 Cloudflare 控制台里点，菜单名称以控制台为准。

### 准备

- 一个 Cloudflare 账号，以及一个已经接入 Cloudflare 的域名（网站和邮箱地址都用它）。
- Node.js 22.18 或更新，pnpm。
- 用到的 Cloudflare 产品：Workers（含静态资源和 Durable Objects）、D1、R2、Email Routing。R2 第一次使用要在控制台里开通。

### 1. 取代码、装依赖、登录

```bash
git clone https://github.com/akazwz/smail.git
cd smail
pnpm install
cd worker
pnpm exec cf auth login
```

命令行用的是 Cloudflare 新的 `cf`（目前是 beta），已经作为依赖装好了。下面的 `cf` 命令都在 `worker/` 目录里执行。

### 2. 创建数据库和存储桶

```bash
pnpm exec cf d1 create --name my-smail
pnpm exec cf r2 buckets create --name my-smail
```

名字随意。记下第一条命令返回的 `uuid`。

### 3. 填 `site.config.ts`

```ts
export const site = {
	domain: "example.com", // 你的域名
	worker: "my-smail", // Worker 的名字
	database: { name: "my-smail", id: "第 2 步返回的 uuid" },
	bucket: "my-smail",
};
```

页面上的站名、sitemap 里的地址、生成的邮箱地址（`xxx@example.com`）都从这里来。

### 4. 准备密钥

```bash
cp .env.example .env.production
```

把 `.env.production` 里的 `SESSION_SECRETS` 换成一段足够长的随机字符串（例如 `openssl rand -base64 32` 的输出）。它用来给会话 cookie 签名：访客的地址就记在这个 cookie 里，密钥丢了或换了，所有访客的地址都会失效。这个文件不会进 git。

以后要轮换密钥，写成逗号分隔的多个值，最左边的是当前生效的，其余的只用来验证旧 cookie。

### 5. 第一次部署

回到仓库根目录：

```bash
cd ..
pnpm run deploy:first
```

它依次做四件事：构建前端（预渲染全部页面）、构建 Worker、在数据库里建表、上传 Worker 和密钥。完成后会打印一个 `https://<Worker 名>.<你的子域>.workers.dev` 的地址，这时已经可以打开页面、生成地址了。

### 6. 绑定域名、接上收信

在 Cloudflare 控制台里：

1. **绑定域名**：Workers 和 Pages → 你的 Worker → 设置 → 域和路由 → 添加 → 自定义域，填 `site.config.ts` 里的域名。
2. **打开 Email Routing**：进入这个域名 → 电子邮件 → 电子邮件路由，按提示启用（它会自动添加收信需要的 DNS 记录）。
3. **把所有来信交给 Worker**：路由规则 → Catch-all 地址 → 操作选“发送到 Worker”，目标选你的 Worker，启用。

### 7. 验证

- 打开你的域名，点“生成地址”。
- 用任意邮箱给这个地址发一封信，几秒内应该出现在页面上，不用刷新。
- 收不到时，先检查第 6 步的 Catch-all 规则有没有启用、目标是不是你的 Worker，再到控制台里这个 Worker 的日志看有没有报错。

### 以后更新

```bash
git pull
pnpm install
pnpm run deploy
```

`pnpm run deploy` 和第一次的区别只是不再上传密钥。有新的数据库迁移时它会自动执行。

### 换成你自己的品牌

- 页面上的站名、页脚、分享卡片的站名取自 `site.config.ts` 的域名，不用另外改。
- 正文内容（`app/md`、`app/blog`、`app/i18n/locales`）里写的是 `smail.pw`，包括隐私政策和使用条款。在仓库根目录执行下面这条命令可以整体替换，替换后请自己读一遍隐私政策和条款，它们描述的是 smail.pw 的做法：

  ```bash
  git grep -lz "smail\.pw" -- app/md app/blog app/i18n/locales | xargs -0 perl -pi -e 's/smail\.pw/example.com/g'
  ```

- 图标和分享图在 `public/`（`favicon.svg`、`favicon.ico`、`apple-touch-icon.png`、`og.png`）。
- `public/_redirects` 里是 smail.pw 自己的旧地址跳转，可以删掉不需要的。

### 没有“一键部署”按钮

Cloudflare 的 Deploy 按钮按官方文档读取的是 Wrangler 的配置文件，并且要求被部署的目录能独立构建。这个仓库用的是 `cloudflare.config.ts`，Worker 的部署包又依赖根目录前端的构建产物，所以没有再放按钮，请按上面的步骤部署。

## 数据和资源

`site.config.ts` 里的资源在 `worker/cloudflare.config.ts` 里绑定给 Worker：

- `D1`：邮件元数据（`emails` 表）和联系页的留言（`messages` 表）。迁移文件在 `worker/migrations/`，`pnpm run deploy` 会自动执行还没执行过的。
- `R2`：邮件原文，对象 key 是邮件 id。
- `InboxHub`：新邮件推送用的 Durable Object，在配置的 `exports` 里声明，部署时自动创建。
- `SESSION_SECRETS`：会话 cookie 的签名密钥，见上面第 4 步。

在 `worker/` 目录里：

- `pnpm run migrate`：对线上的数据库执行迁移；`pnpm run migrate:local` 对本地开发用的数据库执行。
- `pnpm run messages`：列出最近 50 条留言。

本地开发用 `worker/.env`（从 `worker/.env.example` 复制）。

## 多语言与 SEO

- 支持语言：`en/zh/es/fr/de/ja/ko/ru/pt/ar/id/vi/hi/bn/ur/tr/th/it/pl`
- 默认语言为 `en`，默认语言不带前缀
- Markdown 页面与博客均支持多语言
- 自动生成 sitemap（包含首页、Markdown 页、博客列表/分页/文章）

## 重要边界

- 本项目面向临时收信与低风险验证场景。
- 不建议用于银行、工作、政务、法律与关键账号找回等高敏感场景。
