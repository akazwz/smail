---
outline: deep
---

# 快速开始

本应用主要使用 `Cloudflare Email Worker` 实现的临时邮件服务

其中主体包含两个部分

1. `Email Worker` - 接收邮件
2. `Remix Web Application` - 展示邮件

## 准备工作

我们需要准备一下几个部分, 即可完成应用部署和使用.

### 数据库

本库使用的数据库为 `Turso` 的 `SQLit`. (可直接使用个人的免费计划. 传送门 - [Turso](https://turso.tech))

![Turso Plan](/turso-plan.png)

### Cloudflare

该项目主要是利用的 cloudflare 电子邮件路由实现的. 所以务必保证你拥有一个 Cloudflare 的账户完成应用的部署和使用. 传送门 - [Cloudflare Dashboard](https://dash.cloudflare.com/)

### 环境变量

以下环境变量主要帮助应用快捷使用相关信息:

```bash
# cookie的加密 secret, 随机字符串即可
COOKIES_SECRET: xxxx
# cloudflare 中获取, 用于网站验证码
TURNSTILE_KEY: xxxx
# turso 中获取, 连接数据库使用
TURNSTILE_SECRET: xxx
# turso 中获取, 连接数据库凭证
TURSO_DB_RO_AUTH_TOKEN: xxx
# turso 中获取, 连接数据库地址
TURSO_DB_URL: xxx
```

### 相关表

可查看源文件 [0000_sturdy_arclight.sql](packages/database/drizzle/0000_sturdy_arclight.sql)

```sql
CREATE TABLE `emails` (
	`id` text PRIMARY KEY NOT NULL,
	`message_from` text NOT NULL,
	`message_to` text NOT NULL,
	`headers` text NOT NULL,
	`from` text NOT NULL,
	`sender` text,
	`reply_to` text,
	`delivered_to` text,
	`return_path` text,
	`to` text,
	`cc` text,
	`bcc` text,
	`subject` text,
	`message_id` text NOT NULL,
	`in_reply_to` text,
	`references` text,
	`date` text,
	`html` text,
	`text` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
```

### 部署 Email Worker

1. 在当前项目执行发布命令

```bash
$ cd yourprojectpath/email-worker && pnpm run deploy
```

2. 在 cloudflare 的 workers-and-pages 中 找到 Email Worker 并在设置中添加环境变量:

```bash
# turso 中获取, 连接数据库凭证
TURSO_DB_RO_AUTH_TOKEN: xxx
# turso 中获取, 连接数据库地址
TURSO_DB_URL: xxx
```

![Woker Env](/worker.png)

3. 进入域名的 电子邮件/电子邮件路由/路由规则 设置 catch-all 操作为 发送到 worker, 目标位置 email-worker

### 部署 Web Application

1. 在当前项目执行部署命令

```bash
# 这里使用的是 fly.io 部署. 你也可以使用其他的方式, 这是标准的 remix 项目
$ cd yourprojectpath/apps/remix && fly launch
```

2. 添加以上需要准备的环境变量.

3. 完成部署. 访问部署好的网站即和当前示例的 [https://smail.pw](https://smail.pw) 效果一致了. 快试试吧。

![SMail](/smail.png)
