// cf 的 D1 命令只认数据库 ID，不认名字。ID 写在 ../site.config.ts 里，
// 这里把它取出来再转交给 cf，免得同一个 ID 在好几条命令里各抄一遍。
//
//   node d1.mjs migrate [cf 的其他参数]   执行 migrations/ 里还没执行过的迁移
//   node d1.mjs messages                 列出最近 50 条留言
import { spawnSync } from "node:child_process";

import { site } from "../site.config.ts";

const [command, ...rest] = process.argv.slice(2);
const { id } = site.database;

const commands = {
	migrate: ["d1", "migrations", "apply", id, ...rest],
	messages: [
		"d1",
		"query",
		id,
		"--sql",
		"SELECT datetime(time / 1000, 'unixepoch') AS received, locale, contact, body FROM messages ORDER BY time DESC LIMIT 50",
	],
};

const args = commands[command];
if (!args) {
	console.error(
		`Unknown command: ${command ?? "(none)"}. Use "migrate" or "messages".`,
	);
	process.exit(1);
}
if (!id) {
	console.error(
		"site.config.ts has no database.id yet. Create the database and fill it in.",
	);
	process.exit(1);
}

// 从 pnpm 的脚本里运行时，cf 在 PATH 上（node_modules/.bin）。
const result = spawnSync("cf", args, {
	stdio: "inherit",
	shell: process.platform === "win32",
});
process.exit(result.status ?? 1);
