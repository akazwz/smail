# Smail 教程

这是一个开源的使用 cloudflare email worker 实现的临时邮件服务

项目主要有两部分组成

1. 收到邮件(email worker)
2. 展示邮件(remix 网站)

````
收到邮件 -> 储存到数据库 -> 查询邮件
````

## 准备工作

1. 数据库, 数据库是用的 turso 的 sqlite,  有免费计划可够个人使用. https://turso.tech

2. cloudflare 账户, 确保你有一个在 cloudflare 的域名, 该项目主要是利用的 cloudflare 电子邮件路由实现的. https://dash.cloudflare.com/

3. 你需要准备以下环境变量

   ````
   COOKIES_SECRET (cookie的加密 secret, 随机字符串即可)
   TURNSTILE_KEY  (cloudflare 中获取, 用于网站验证码)
   TURNSTILE_SECRET 
   TURSO_DB_RO_AUTH_TOKEN (turso 中获取, 连接数据库凭证)
   TURSO_DB_URL
   ````
4. 数据库表, 文件在 packages/database/drizzle/0000_sturdy_arclight.sql
   ````sql
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
   ````


## 一. 部署email worker

1. ````shell
   cd smail/apps/email-worker && pnpm run deploy
   ````

2. 在 workers 和 pages 中找到email worker 并在设置中添加 TURSO_DB_AUTH_TOKEN 和 TURSO_DB_URL 

3. 进入域名的 电子邮件/电子邮件路由/路由规则 设置 catch-all 操作为 发送到 worker, 目标位置 email-worker

## 二. 部署网站

1. ````shell
   cd smail/apps/remix && fly launch # 我这里使用的是 fly.io 部署. 你也可以使用其他的方式, 这是标准的 remix 项目
   ````

2. 添加准备工作中的所有环境变量即可

   

至此, 你就拥有了和 https://smail.pw 一样的网站, 可以使用临时邮箱服务了.
