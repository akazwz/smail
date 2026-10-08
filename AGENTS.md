# Repository Guidelines

## 交流与输出语言
- 与用户沟通、任务说明、变更总结默认使用中文。
- 仅在用户明确要求时使用英文。
- 代码标识符、文件名、路由 slug 保持英文，不做无必要翻译。

## 项目结构与模块说明
仓库里是两个独立的项目：

- **前端（仓库根目录）**：Solid 2 + StyleX，构建产物是纯静态网站 `dist/client`。线上没有任何前端代码在服务器上运行。
- **Worker（`worker/` 目录）**：一个普通的 Cloudflare Worker，只做收件箱接口、新邮件推送和收信。部署时把前端的 `dist/client` 当静态文件带上。

域名、Worker 名、数据库和存储桶只写在一处：仓库根目录的 `site.config.ts`。前端（`#site`）、构建配置、Worker 的配置和地址生成都从它读；自己部署这个项目的人只改这一个文件（步骤在 README 的“自己部署”，英文版在 `docs/deploy.en.md`）。代码里不要再写死 `smail.pw` 或资源 ID：站名用 `app/seo.config.ts` 的 `SITE_NAME`，网站地址用 `BASE_URL`。正文内容（`app/md`、`app/blog`、各语言文案）里的 `smail.pw` 是内容的一部分，不在此列。

两边只通过 `/api/*` 这几个接口打交道。接口返回的数据结构和共用的 cookie 名字只写一份，在 `worker/src/contract.ts`（不依赖任何模块）；前端用 `#contract` 引入它，除此之外不引用 Worker 的代码。

前端：
- `app/app.tsx`、`app/document.tsx`：应用根组件与文档外壳。没有 `index.html` 和手写入口，`@solidjs/vite-plugin` 的 start 模式围绕这两个文件生成入口。
- `app/router.ts`：路由表（`@solidjs/router` 的 `createRouter`）。
- `app/routes/`：页面组件（首页、Markdown 页、博客、联系页、404、布局）。
- `app/components/`：业务组件（页面骨架、首页的邮箱窗口 `mailbox.tsx`、邮件列表、邮件正文、联系页的留言表单 `message-form.tsx`、Markdown 渲染、指南链接）。
- `app/ui/`：组件库。`tokens.stylex.ts` 是设计变量，其余是通用的基础组件。
- `app/data.ts`：`query` / `action`，页面读写数据的唯一入口。
- `app/api.ts`：调用 Worker 接口的几个函数（取收件箱、生成/删除地址、取邮件正文、提交留言），只在浏览器里调用。
- `app/utils/inbox.ts`：`useInbox()`，首页收件箱的全部状态和操作（要不要去取、取到了什么、推送状态、生成/更换/删除/刷新）。界面组件只负责显示：`app/components/mailbox.tsx` 接收它返回的对象。
- `app/feeds.ts`：robots / sitemap / RSS 的内容，以及全站页面清单 `listPagePaths`。只在构建时（和本地开发时）运行。
- `app/content.ts`：内容页和博客的正文。Markdown 在构建时由 `vite/markdown.ts` 解析成结构树，每个文件一个静态分块。
- `app/middleware.ts`：只在构建时（和本地开发时）运行。应答 robots / sitemap / RSS，并把页面清单告诉预渲染的爬虫。
- `app/md/<locale>/`：多语言 SEO Markdown 页面。
- `app/blog/<locale>/`：多语言博客 Markdown 内容；各语言的文章列表（标题、摘要、日期）在对应的 `app/i18n/locales/<语言>.tsx` 里。写新文章的规矩见下面“SEO / 多语言改动联动规则”。
- `app/i18n/`：语言配置与文案。`dictionary.ts` 定义一种语言全部文案的类型；`locales/<语言>.tsx` 每种语言一个文件、一个分块，访客只下载自己语言的那一份；`provider.tsx` 按 URL 里的语言加载并提供文案。组件里用 `useDictionary()` 取文案，不要在组件里写面向用户的文字。新增文案要在 `dictionary.ts` 里加字段，并在所有语言文件里都补上（漏了类型检查会报错）。带变量的文案写成模板（`{minutes}`），用 `fillTemplate` 填。
- `vite.config.ts`：前端的构建配置。预渲染用 Solid 官方的 `prerender-crawler` 插件（`mode: "static"`）：构建完成后在 Node 里把每个页面渲染成 HTML 写进 `dist/client`。
- `vite/not-found-page.ts`：生成 `404.html`（不带应用脚本的独立小页面）。
- `vite/markdown.ts`：构建时解析 Markdown 的 Vite 插件（`import tree from "x.md?tree"`）。`@markdoc/markdoc` 只是构建依赖。
- `public/_redirects`：旧地址的跳转规则（`/en/*`、`/zh-CN`、已下线的 24 小时页和“国内临时邮箱”页、`/blog/page/1`），由静态资源服务直接处理。
- `public/_headers`：静态文件的缓存和安全响应头。

Worker（`worker/`）：
- `src/index.ts`：入口。`fetch` 只处理 `/api/*`，`email` 收信，并导出 Durable Object 类。没有定时任务。配置里不写 `triggers.scheduled(...)` 并不会删掉线上已有的定时触发器（部署时只在有配置时才更新），`cf` 也没有管理它的命令。2026-10-08 上线后试过用命令行清掉旧版每 30 分钟的那个触发器，没有成功：用一份只含 `triggers: { crons: [] }` 的临时 `wrangler.jsonc` 跑 `wrangler triggers deploy`，接口返回的定时列表确实变成空的了，但之后的整点和半点它仍然照常触发（先加一条再清空也一样）。接口的状态和实际调度对不上，这种情况要到 Cloudflare 控制台里看和删。
- `src/session.ts` 会话、`src/inbox.ts` 收件箱查询、`src/mail.ts` 收信、`src/inbox-hub.ts` 新邮件推送、`src/address.ts` 生成地址、`src/messages.ts` 保存联系页的留言。
- `cloudflare.config.ts`：Worker 的配置（绑定、静态资源的处理方式、Durable Object）。名字和资源来自 `../site.config.ts`。
- `d1.mjs`：`cf` 的 D1 命令只认数据库 ID 不认名字，这个小脚本从 `site.config.ts` 取出 ID 再转交给 `cf`（`pnpm run migrate` / `messages` 用它）。
- `vite.config.ts`：用 Cloudflare 的 Vite 插件构建 Worker，`publicDir` 指向 `../dist/client`，把前端产物当静态文件带进部署包。
- `migrations/*.sql`：D1 SQL 迁移文件（不使用 ORM）。

## 真实数据架构（必须遵循）
- D1：邮件元数据（`emails` 表）和联系页的留言（`messages` 表），没有别的。
- R2：存邮件原始内容（对象 key = 邮件 `id`）。
- 会话：签名 cookie（`__session`），数据就在 cookie 里，不使用 KV，也不占 D1。格式与早期 React Router 版本兼容，不要改。
- 地址长期有效：只有用户主动更换或删除时才会变，服务端不做过期轮换；cookie 有效期 400 天，每 7 天续一次。
- 地址和邮件默认长期保留，但不做保证（维护、故障或清理时可能被删）。界面和文案里不出现“24 小时”这类固定期限的说法，也不要写成“永久”。
- 收信（`worker/src/mail.ts`）：先写 R2 再写 D1；单封原文超过 5 MB 时只存正文、不存附件。
- 新邮件推送：一个 Durable Object（`InboxHub`，`worker/src/inbox-hub.ts`）给所有在线访客共用，用 WebSocket Hibernation，按地址给连接打 tag。浏览器连 `/api/inbox/live`（Worker 入口校验同源和会话后转给它）；`email` 入口存好邮件后调用它的 `notify`。它只推“有新邮件”的信号，不存数据、不推内容，浏览器收到后仍然走 `GET /api/inbox`。
- 连接状态：收件箱标题旁有一个小圆点（绿色＝连着，灰色＝断了正在重连，悬停有文字），状态来自 `app/utils/live-inbox.ts` 的 `useLiveInbox`。这条连接只在地址变了时才重建——收件箱刷新不能让它重连，否则重连空档里到的信收不到通知。连不上时会重新取一次收件箱对账（一轮断线只对一次）：地址要是已经不在会话里了，页面跟着变成没有地址，也就不再空连。重连的间隔带随机量。
- 接口都在 `/api/` 下：`GET /api/inbox`、`POST /api/address`（生成）、`DELETE /api/address`（这两个直接返回最新的收件箱，页面不用再取一次）、`GET /api/email/:id`、`GET /api/inbox/live`（WebSocket）、`POST /api/messages`（留言）。所有非 GET 的请求只接受同源（校验 `Origin`）。
- `POST /api/address` 生成新地址、原来的作废。带 `?keep=1` 时，会话里已经有地址就什么都不改，原样返回现有的收件箱；页面在“没有地址、点生成”时带这个参数，用户确认更换时不带。这样页面不知道会话里有地址时（收件箱还没取回、取失败了、别的标签页生成的）点“生成”不会把原地址悄悄顶掉。不要把这层保护挪回前端。
- 改接口时要想到开着旧页面的访客：他们用的还是旧脚本，刷新之前不会变。新增的行为用新参数表达，不带参数的老请求保持原来的意思（2026-10-08 曾把“更换”改成必须带新参数，旧页面上的“更换地址”因此失效了几分钟）。
- 和会话有关的请求在页面上是排队发的（`app/api.ts`），不并发：每个响应都可能重写会话 cookie，后到的会盖掉先到的。
- 一次刷新失败不等于没有地址：之前取到过的收件箱接着显示（`app/utils/inbox.ts`），只有一次都没取到时才是“取失败”的界面。操作或手动刷新没成功时，在收件箱顶上浮一句提示，几秒后消失；它是浮层，不占位置。
- 邮件正文（`GET /api/email/:id`）必须校验邮件地址属于当前会话。纯文本邮件要转义后再显示。响应带 `Content-Security-Policy: sandbox …`：就算有人直接在地址栏打开，邮件里的脚本也不会以本站身份运行。
- 联系方式只有留言表单这一种：站内不公开任何邮箱地址（页面、文案、结构化数据里都不要出现 `support@…`）。`support@smail.pw` 的转发规则仍留在 Cloudflare 上，只是不再对外写出来。
- 留言（联系页的表单，`worker/src/messages.ts`）：只存进 D1 的 `messages` 表，**不发任何通知**，由站长自己定期去看——在 `worker/` 里跑 `pnpm run messages`（列出最近 50 条，读的是线上的库）。留言必填，联系方式选填，长度上限写在 `worker/src/contract.ts`，前后端共用。防刷只靠三样，都不花钱：一个真人看不见的诱饵输入框（填了就假装成功、不入库；字段名故意起得不像常见表单项，免得被浏览器自动填充）、同一来源每小时 5 条、全站每天 500 条。来源只存网络地址加密钥算出的单向指纹，不存地址本身。不要给它加邮件或推送通知：留言一多就成了轰炸。
- 邮件正文显示在沙箱 iframe 里：不能运行脚本、不能提交表单。邮件里的链接由 Worker 统一改成在新标签页打开（`target="_blank" rel="noopener noreferrer"`），iframe 只额外放开“开新标签页”这一项。不要再放开别的权限。邮件自带的 `<base href>` 要保留（相对链接和图片靠它指向发件方），只去掉它的 `target`。
- 所有页面（包括首页）都是构建时生成的静态文件，不经过 Worker；站内跳转取的也是静态分块。不存在的地址由静态资源服务返回 `404.html`，旧地址跳转走 `_redirects`，也都不经过 Worker。Worker 只处理 `/api/*` 和收信。
- 首页的 HTML 永远是“没有地址”的样子，浏览器接管后再决定要不要取收件箱。依据是一个脚本读得到的标记 cookie `smail_inbox`（1 有地址，0 没有，缺失表示未知，问一次后由 Worker 的接口写上）。确定没有地址的访客打开首页不会触发 Worker。会话 cookie 本身仍是 HttpOnly，标记只是提示。
- 已有地址的访客在收件箱取回之前看到的是占位块，不是“生成地址”按钮：`document.tsx` 里的首帧脚本给 `<html>` 打 `data-inbox="1"`，`global.css` 据此在 `data-guest`（没有地址的内容）和 `data-pending`（占位块）之间二选一。
- 首页的邮箱窗口在所有状态下尺寸相同（没有地址、占位、空收件箱、很多邮件）：地址栏和按钮区有最小高度，收件箱高度固定、内部滚动。改 `app/components/mailbox.tsx` 或邮件行的样式后，要在浏览器里确认各状态高度仍然一致——要量一串宽度（320 到 1440）和几种文字较长的语言（如波兰语、德语），只看 1440 和 390 两个宽度会漏掉中间宽度下的折行。
- 不可撤销的操作（更换地址、删除地址）必须先过 `ConfirmDialog` 确认；可以重来的操作（复制、刷新、打开邮件）直接做，不要加确认。更换地址用 `shuffle` 图标，刷新收件箱用 `refresh` 图标，不要混用。
- 收件箱里的时间按访客自己的时区显示（列表、“刷新于”、邮件详情一致）；博客的发布日期是纯日期，按 UTC 格式化，免得差一天。
- 新版本上线后，开着的旧页面再去要脚本分块会失败，`app/app.tsx` 里监听 `vite:preloadError` 整页重新加载一次。
- 首页地址栏里的地址要排成一行：字号按可用宽度缩放，新地址的长度有上限（`worker/src/address.ts`）。720px 以下地址独占一行。排法只由屏幕宽度决定，不看内容。
- 两栏的页面要左右对称：两栏等宽，上边对齐、下边也对齐。往某一栏加减内容之后，截图并量一下两栏的上下边再收工（联系页用网格区域把次要内容压到左栏底部，和右边表单的底边对齐，见 `app/routes/contact.tsx`）。
- 取舍标准：尽量减少费用、提升性能。能不经过 Worker 的就不经过，能在构建时做的不留到运行时，发给浏览器的东西尽量少。

## 开发与构建命令
在仓库根目录：
- `pnpm install`：安装两个项目的依赖（pnpm workspace）。
- `pnpm run dev`：本地开发，同时起前端（5173）和 Worker（8791）；前端把 `/api` 代理给 Worker。也可以分别跑 `pnpm run dev:web`、`pnpm run dev:worker`。
- `pnpm run build`：构建前端，产出纯静态的 `dist/client`（含预渲染的全部页面、feed、`404.html`）。
- `pnpm run preview`：构建前端，再构建 Worker 并在本地 8788 端口预览完整的站点（需要 `worker/.env` 里的 `SESSION_SECRETS`）。
- `pnpm run typecheck`：两个项目的类型检查。
- `pnpm run lint`：Oxlint 代码检查（配置在 `.oxlintrc.json`）。
- `pnpm run format`：Oxfmt 格式化（配置在 `.oxfmtrc.json`）；`pnpm run format:check` 只检查不改。Markdown 不参与格式化。
- `pnpm run check`：类型检查 + 代码检查 + 格式检查，提交前跑这一条。

TypeScript 配置：根目录的 `tsconfig.json` 只是入口，引用 `tsconfig.app.json`（前端代码）和 `tsconfig.node.json`（构建配置），用 `tsc -b` 检查；`worker/` 有自己独立的一份。三份都开了 `noUncheckedIndexedAccess`、`noUnusedLocals`、`erasableSyntaxOnly` 等严格检查，不要为了省事关掉。
- `pnpm run deploy`：构建前端 → 构建 Worker → 远端迁移 → `cf deploy --prebuilt`。
- `pnpm run deploy:dry-run`：同上，但不上传，只检查构建产物和绑定。
- `pnpm run deploy:first`：全新部署的第一次用，多带一个 `--secrets-file worker/.env.production`（Worker 还不存在时没法先设密钥）。README 里的部署教程是在一个全新的拷贝上照着走通过的（临时建库建桶、部署到 workers.dev、验证、删除）；改了部署流程后要重新走一遍，不要只改文字。

在 `worker/` 目录：
- `pnpm run cf-typegen`：按 `cloudflare.config.ts` 重新生成 `.cloudflare/types/index.d.ts`（`Env`、`ctx.exports` 的类型都来自它，不进 git）。
- `pnpm run messages`：列出最近 50 条留言（线上的库；`cf d1 query` 没有本地版）。
- `pnpm run migrate` / `pnpm run migrate:local`：对远端 / 本地的 D1 执行迁移。beta 版的 `cf` 跑完本地命令后进程可能不退出，看到输出后按 Ctrl+C 即可。

Worker 的配置在 `worker/cloudflare.config.ts`（Cloudflare 新的带类型配置，配套 `cf` 命令行，目前是 beta）。仓库里没有 `wrangler.jsonc`，`wrangler` 的命令读不到这份配置，统一用 `cf`。新配置里没有“静态目录”这个字段：静态文件就是 Worker 这个 Vite 项目的 `publicDir`。

本地开发的 Worker 端口用 8791，不要用 wrangler 默认的 8787，容易和别的项目撞。

## Solid 2 与 StyleX（动手前必读）
Solid 2 还是候选版本，它不是 React，也不是 Solid 1.x。写前端代码之前先读随包发布的文档，它们和安装的版本严格对应：
- `node_modules/solid-js/CHEATSHEET.md`（末尾有“和 1.x 的区别”）
- `node_modules/@solidjs/router/README.md`
- `node_modules/@solidjs/vite-plugin/README.md`

Solid 系列包固定在精确版本上，升级前先看 `npm view <包名> dist-tags`：`@solidjs/vite-plugin` 的最新版在 `latest` 标签下，`next` 是旧的。

- **不要开 `start.renderMode: "async"`。** 在 2.0.0-rc.13 上实测，这个模式下并发渲染会互相串内容；官方仓库 solidjs/prerender-crawler#10 记录了同一个问题（预渲染时一个页面的内容写进另一个页面的文件）。默认的流式模式没有这个问题。
- 样式用 `{...stylex.attrs(styles.name)}`，不是 `stylex.props`；Solid 2 没有 `className`。
- 设计变量在 `app/ui/tokens.stylex.ts`，组件里不写死颜色、间距、圆角。
- 字体全站统一：只有 `font.body` 这一套系统字体，不给个别元素（邮箱地址、代码、数字）另配等宽或其他字体。字体栈里不点名中日韩字体，靠页面的 `lang` 让浏览器挑对应语言的字体。
- `app/ui` 是组件库，按“库”的标准写：通用、不含业务、靠 props 和变体驱动。现有组件：`Button` / `ButtonLink`、`Icon`、`Badge`、`Card`、`CardLink`、`LinkList`、`TextLink`、`Dialog`、`ConfirmDialog`、`Select`、`TextField`、`Spinner`、`Skeleton`、`EmptyState`、`Dot`、`Avatar`、`Brand`，共用样式在 `base.ts`。
  - 库里不放 `Stack`、`Row`、`Text` 这种把 CSS 包成 props 的通用包装。布局写在业务组件里（`app/components`、`app/routes`），直接引用设计变量。
  - 页面骨架用 `app/components/page.tsx` 里的 `Page`、`PageIntro`、`Columns`、`Aside`、`Section`、`Rows` / `Row`；内容宽度和左右留白来自 `frame` 变量，页眉、页脚也用它。
  - 包原生元素的组件透传原生属性，不接受 `class` / `style`；调用处调布局只通过 `xstyle`。
  - 无障碍写在组件里：图标是装饰（`aria-hidden`），只有图标的按钮必须给 `aria-label`。
  - 新图标加进 `Icon.tsx` 的路径表（24 网格、2px 圆头线条），不引图标库。
  - 同样的外观第二次出现就抽成库组件；只用一次的不要提前放进库。
  - 每个组件上方用注释写清它是干什么的、什么时候用。
- StyleX 的坑（类型检查查不出来，只有构建或打开页面才暴露）：
  - `stylex.attrs(a, 条件 && b)` 里的条件必须是单个表达式，组合条件写成辅助函数。
  - 不能用函数的返回值去取 `styles` 的下标（`styles[pick()]` 编译失败）；需要按计算结果选样式时，先在模块顶层把每种 `stylex.attrs(...)` 算好（见 `Avatar.tsx`）。
  - 后面的样式会整体替换前面的同名属性，带媒体查询的属性要把默认值重复写一遍。
  - 简写盖不住展开写法（`padding` 清不掉 `paddingInline`）。
  - StyleX 自己解析 `*.stylex.ts` 的导入，不读 `package.json` 的 `imports`，所以 `#/` 这个别名要在 `vite.config.ts` 的 `stylex.vite({ aliases })` 里再配一遍。
- 改完样式至少跑一次 `pnpm run build`，或打开页面看一眼。

## 代码风格与命名规范
- 使用 TypeScript/TSX + ESM。
- 遵循现有代码风格：
  - 缩进使用 Tab。
  - 保持现有文件风格一致，避免无关格式化。
- 变量/函数使用 `camelCase`，常量使用 `UPPER_SNAKE_CASE`。
- 导入路径：前端里跨目录的导入用 `#/`（`package.json` 的 `imports` 字段，指向 `app/`），不用 tsconfig 的 `paths`。所有站内导入都写完整的文件扩展名（`#/ui/Button.tsx`、`./tokens.stylex.ts`）——`imports` 字段不会替你猜扩展名。

## SEO / 多语言改动联动规则
涉及 SEO 或内容改动时，必须检查并同步以下位置：
- 路由表：`app/router.ts`
- SEO 基础路径：`app/seo.config.ts`
- 页面的 title / description / canonical / hreflang：`app/utils/head.ts` 与各页面里的 `usePageHead`
- 分享卡片：标题和描述用每页自己的；图片是 `public/og.png`（1200×630，只有标志和 smail.pw；不带任何语言的文字，也不要放邮箱地址，所有页面共用）
- Markdown 页的 meta 文案与结构化数据：`app/routes/md.tsx`
- 预渲染的页面清单：`app/feeds.ts` 的 `listPagePaths`（预渲染的爬虫只认 `<a href>`，语言切换是下拉框，所以页面清单要由它显式给出）
- 对应语言内容文件：`app/md/<locale>/...`
- `sitemap.xml` 由预渲染插件按实际渲染出来的页面生成（`vite.config.ts`），每页的修改时间取自内容文件在 git 里最后一次提交的日期（`vite/page-dates.ts`）。
- 删除一个页面时，在 `public/_redirects` 里给它的旧地址加跳转。

内容以英语（`en`）为准：改内容先改英语，再让其他语言逐篇对齐——同样的小节、同样的事实、同样的链接。不要让某种语言只有缩略版，也不要回退到英语：缺了哪种语言的文件，构建会失败，并打印出缺的是哪个文件（`app/content.ts`）。

- 正文里的站内链接一律写不带语言前缀的路径（`](/faq)`），渲染时会按当前语言补前缀。
- 新增 Markdown 落地页时，所有已支持语言都要有同名文件。
- 语言清单只有一份：`app/i18n/config.ts` 的 `SUPPORTED_LOCALES`，构建配置也读它。
- 新增一种语言：在 `app/i18n/config.ts` 的 `SUPPORTED_LOCALES`、`LOCALE_LABELS` 和 `app/i18n/provider.tsx` 里登记，再补 `app/i18n/locales/<语言>.tsx`、`app/md/<语言>/`（10 篇）、`app/blog/<语言>/`（6 篇）。
- 新增一篇博客：所有语言都要有同名的 `app/blog/<语言>/<slug>.md`，并在每个语言文件的 `blog.posts` 里登记，新文章排最前。正文第一行的 `## 标题` 要和登记的 `title` 一字不差。`publishedAt` 写真实的发布日期，旧文章不要为了显得新而改日期（确实改了内容才填 `updatedAt`）。`readingMinutes` 各语言相同，按英语稿的词数除以 200 向上取整。列表每页 6 篇（`BLOG_PAGE_SIZE`），超过后会多出 `/blog/page/2`。
- Markdown 只支持二三级标题、段落、有序和无序列表、加粗、斜体、链接；表格、代码、HTML 不会渲染。

内容里必须和产品实际一致的事实：
- 只能收信，不能发信或回复；只显示正文，附件不显示也不能下载。
- 地址记在创建它的那个浏览器的 cookie 里，没有账号和密码；换浏览器或设备是空的，清了 cookie 地址和邮件就找不回来。
- 没有广告，只有两个必需的 cookie。统计用的是 Cloudflare Web Analytics：脚本（`static.cloudflareinsights.com/beacon.min.js`）由 Cloudflare 自动注入到每个页面，仓库里没有它的代码，它不设 cookie。只对真实浏览器注入，用 curl 看不到。站内文案现在写的是“不加载第三方统计或跟踪脚本”，站长 2026-10-08 决定保持现状不改。
- 收件箱只能在创建地址的那个浏览器里打开，没有“输入地址看邮件”的入口；地址随机生成，不能自选，都以 @smail.pw 结尾（只有这一个域名）。
- 邮件里的图片会正常加载（发件方因此能知道邮件被打开过）；脚本不运行，表单不能提交。
- “删除地址”只是让这个浏览器不再记得它，服务器上的邮件不会因此立刻删除——文案里不要写成“删除地址会清除邮件”。

## 测试与提交前检查
项目没有自动化测试（有意不加）。提交前至少执行：
1. `pnpm run check`
2. `pnpm run build`

GitHub Actions（`.github/workflows/ci.yml`）在推送到 main 和提 PR 时跑同样的检查，再加上 Worker 的构建。

涉及 D1 结构变更时还需：
- 提交对应 `worker/migrations/*.sql`
- 在目标环境执行 `pnpm run migrate` 验证。

新增绑定或 Durable Object 时改 `worker/cloudflare.config.ts`，然后在 `worker/` 里跑 `pnpm run cf-typegen`。Durable Object 在 `exports` 里声明，不需要再写迁移段。

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
- `worker/cloudflare.config.ts` 中的资源 ID/名称可公开，但不要提交可直接鉴权的敏感信息。
- 仓库已经从 `wrangler.jsonc` 换成 `cloudflare.config.ts`。README 里原来的“一键部署”按钮已经撤下：按 Cloudflare 的文档，它读的是 Wrangler 的配置文件，并要求被部署的目录能独立构建，这个仓库两条都不满足。
- 线上的自定义域和 Email Routing 规则（Catch-all → Worker，`support@` → 转发）是在控制台里手动配的，没有写进配置。`cf` 支持把它们写进配置（`domains`、`triggers.email`），但对线上现有的 Catch-all 规则预演的结果是“冲突”，接管需要一次人工确认，所以暂时没有采用。
