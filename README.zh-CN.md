# smail.pw

[![CI](https://github.com/akazwz/smail/actions/workflows/ci.yml/badge.svg)](https://github.com/akazwz/smail/actions/workflows/ci.yml)

运行在 Cloudflare Workers 上的临时邮箱服务。这里是 [smail.pw](https://smail.pw) 的源代码。

[English](README.md)

## 功能

- 不用注册就能拿到一个地址。地址不会自己变，除非你更换或删除它。
- 新邮件几秒内出现在页面上。它是通过 WebSocket 推过来的，不靠轮询。
- 所有页面都是静态文件。Worker 只在取收件箱、保持推送连接和收信时运行。
- 邮件显示在沙箱 iframe 里。里面的脚本不会运行，链接在新标签页打开。
- 19 种语言，包括从右往左书写的语言。
- 只能收信：不能发信，也不显示附件。
- 想部署一份自己的，只需要改 `site.config.ts` 一个文件，见[自己部署](#自己部署)。

技术栈：Solid 2、StyleX、Cloudflare Workers、D1、R2、Durable Objects、Email Routing。

## 自己部署

上一代（React Router + `wrangler.jsonc`）归档在 [`v3`](https://github.com/akazwz/smail/releases/tag/v3) 标签。下面讲的是现在这套代码。

需要改的只有仓库根目录的 `site.config.ts` 一个文件。下面第 1–5 步是在一个全新克隆的仓库上实际走通过的；第 6 步在 Cloudflare 控制台里点，菜单名称以控制台为准。

没有“一键部署”按钮：Cloudflare 的按钮需要 Wrangler 的配置文件，这个项目用的不是它。

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

### 换成自己的名字

- 页面上的站名、页脚、分享卡片的站名取自 `site.config.ts` 的域名，不用另外改。
- 正文内容（`app/md`、`app/blog`、`app/i18n/locales`）里写的是 `smail.pw`，包括隐私政策和使用条款。在仓库根目录执行下面这条命令可以整体替换，替换后请自己读一遍隐私政策和条款，它们描述的是 smail.pw 的做法：

  ```bash
  git grep -lz "smail\.pw" -- app/md app/blog app/i18n/locales | xargs -0 perl -pi -e 's/smail\.pw/example.com/g'
  ```

- 图标和分享图在 `public/`（`favicon.svg`、`favicon.ico`、`apple-touch-icon.png`、`og.png`）。
- `public/_redirects` 里是 smail.pw 自己的旧地址跳转，可以删掉不需要的。

## 它是怎么工作的

仓库里是两个项目：

- **前端**（仓库根目录）：Solid 2 + StyleX，构建时预渲染成纯静态网站（`dist/client`）。线上没有前端代码在服务器上运行。
- **Worker**（`worker/`）：处理 `/api/*`、新邮件推送的 WebSocket 和收信，并把前端的构建产物当静态文件带上。

存储：

- **D1**：每封邮件一行元数据（`emails` 表），以及联系页的留言（`messages` 表）。
- **R2**：邮件原文，对象 key 是邮件的 id。
- **会话**：一个签名的 cookie，里面记着访客的地址。没有账号，不为访客单独存任何东西。

一封邮件的经过：

1. Email Routing 把发到这个域名的所有邮件交给 Worker 的 `email` 处理函数。
2. 原文先写进 R2，再往 D1 写一行元数据。超过 5 MB 的邮件只存正文。
3. Worker 通知 `InboxHub` 这个 Durable Object，它给正开着这个地址的页面发一个信号。
4. 页面重新请求 `GET /api/inbox`。打开邮件时请求 `GET /api/email/:id`：先确认这封邮件属于会话里的地址，再从 R2 取出原文解析，返回 HTML。页面把它放在沙箱 iframe 里显示。

## 本地开发

需要 Node.js 22.18 或更新，以及 pnpm。

```bash
pnpm install
cp worker/.env.example worker/.env
pnpm --filter smail-worker run migrate:local
pnpm run dev
```

`migrate:local` 在本地数据库里建表。beta 版的 `cf` 打印完结果后进程可能不退出，看到输出后按 Ctrl+C 即可。

`pnpm run dev` 同时启动两个项目：前端在 `http://localhost:5173`，Worker 在 `http://localhost:8791`。前端把 `/api`（包括 WebSocket）代理给 Worker，所以只需要打开 5173。

## 常用命令

在仓库根目录：

| 命令 | 作用 |
| --- | --- |
| `pnpm run dev` | 本地开发，前端和 Worker 一起启动 |
| `pnpm run build` | 构建前端，把所有页面预渲染到 `dist/client` |
| `pnpm run preview` | 构建两个项目，在 `http://localhost:8788` 预览完整的站点 |
| `pnpm run check` | 类型检查、代码检查（Oxlint）、格式检查（Oxfmt） |
| `pnpm run format` | 格式化代码 |
| `pnpm run deploy` | 构建两个项目、执行还没执行的迁移、部署 |
| `pnpm run deploy:first` | 同上，另外上传密钥；第一次部署用 |
| `pnpm run deploy:dry-run` | 只构建和检查，不上传 |

在 `worker/` 目录：

| 命令 | 作用 |
| --- | --- |
| `pnpm run migrate` | 对线上的数据库执行还没执行的迁移 |
| `pnpm run migrate:local` | 对本地开发用的数据库执行 |
| `pnpm run messages` | 列出线上数据库里最近 50 条留言 |

Worker 的配置在 `worker/cloudflare.config.ts`，用 Cloudflare 的 `cf` 命令行（beta）部署。`wrangler` 的命令读不了这份配置。

## 目录结构

```text
site.config.ts           自己部署时只需要改的那个文件
app/                     前端：Solid 2 + StyleX
  routes/                页面（首页、内容页、博客、联系页、404）
  components/            邮箱窗口、邮件列表、邮件正文、留言表单
  ui/                    组件库和设计变量
  utils/inbox.ts         首页收件箱的全部状态
  api.ts                 调用 Worker 接口的函数
  md/、blog/             内容页和博客文章，每种语言一个目录
  i18n/                  语言清单，每种语言一个文案文件
public/                  原样发布的文件（图标、分享图、_headers、_redirects）
vite/                    构建用的小插件（Markdown 解析、404 页、页面日期）
worker/                  Cloudflare Worker，一个独立的项目
  src/index.ts           入口：/api/*、收信、导出 Durable Object
  src/contract.ts        和前端共用的接口类型
  src/mail.ts            保存收到的邮件
  src/inbox-hub.ts       新邮件推送（Durable Object + WebSocket）
  migrations/            D1 迁移
  cloudflare.config.ts   Worker 的配置
```

架构上的约定和开发中踩过的坑记在 `AGENTS.md` 里。

## 适合用来做什么

临时地址适合低风险的注册、验证码和一次性下载。地址和邮件默认长期保留，但不做保证；地址只记在创建它的那个浏览器的 cookie 里。不要用在银行、工作、政务、法律事务上，也不要用在以后需要找回的账号上。
