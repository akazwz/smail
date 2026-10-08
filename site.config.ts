// 站点配置。自己部署这个项目时，只需要改这一个文件。
// 前端的构建、Worker 的配置、数据库命令都从这里读（部署步骤见 README）。
export const site = {
	// 域名：网站的地址，也是生成的邮箱地址里 @ 后面的那部分。要先接入 Cloudflare。
	domain: "smail.pw",
	// Worker 的名字。
	worker: "smail-app",
	// D1 数据库：存邮件的元数据和联系页的留言。
	// 用 `pnpm exec cf d1 create <名字>` 创建，把返回的 ID 填在这里。
	database: {
		name: "smail-v3",
		id: "8a38551f-5eab-4095-b69b-2f4a87e9d8d1",
	},
	// R2 存储桶的名字：存邮件原文。用 `pnpm exec cf r2 buckets create` 创建。
	bucket: "smailv3",
};
