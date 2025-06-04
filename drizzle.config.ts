import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./app/db/migrations",
	schema: "./app/db/schema.ts",
	dialect: "sqlite",
	driver: "d1-http",
	dbCredentials: {
		// 这些在运行迁移时会从环境变量或命令行参数中读取
		accountId: "xxx",
		databaseId: "xxx",
		token: "xxx",
	},
});
