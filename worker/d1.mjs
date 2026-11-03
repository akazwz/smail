// cf 的 D1 命令只认数据库 ID，不认名字。ID 写在 ../site.config.ts 里，
// 这里把它取出来再转交给 cf，免得同一个 ID 在好几条命令里各抄一遍。
//
//   node d1.mjs migrate [cf 的其他参数]       执行 migrations/ 里还没执行过的迁移
//   node d1.mjs messages                     列出最近 50 条留言
//   node d1.mjs recover <地址> [--days N]     签发一条地址恢复链接（默认 7 天内有效）
//   node d1.mjs revoke <链接 ID 或地址>        作废还没兑换的恢复链接
//
// 除了 migrate，这些命令都直接操作线上的库：`cf d1 query` 没有本地版。
import { spawnSync } from "node:child_process";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import { createInterface } from "node:readline/promises";

import { site } from "../site.config.ts";

const [command, ...rest] = process.argv.slice(2);
const { id } = site.database;

const DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_RECOVERY_DAYS = 7;
const MAX_RECOVERY_DAYS = 30;
// 写进 SQL 的值都先过这几条校验，所以可以直接拼进语句里：
// 地址只含小写字母、数字和 . _ - +，ID 是 UUID。
const ADDRESS_LOCAL_PART = /^[a-z0-9._+-]+$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

function fail(message) {
	console.error(message);
	process.exit(1);
}

if (!id) {
	fail(
		"site.config.ts has no database.id yet. Create the database and fill it in.",
	);
}

/** 运行一条 cf 命令，输出直接打在终端上；失败就退出。 */
function cf(args) {
	// 从 pnpm 的脚本里运行时，cf 在 PATH 上（node_modules/.bin）。
	const result = spawnSync("cf", args, {
		stdio: "inherit",
		shell: process.platform === "win32",
	});
	if (result.status !== 0) {
		process.exit(result.status ?? 1);
	}
}

function query(sql) {
	cf(["d1", "query", id, "--sql", sql]);
}

/** 校验并规范成小写的地址；不是本站的地址返回 null。 */
function parseAddress(value) {
	const address = (value ?? "").trim().toLowerCase();
	const [localPart, domain, ...extra] = address.split("@");
	return localPart &&
		ADDRESS_LOCAL_PART.test(localPart) &&
		domain === site.domain &&
		extra.length === 0
		? address
		: null;
}

async function confirm(question) {
	const prompt = createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	const answer = await prompt.question(`${question} [y/N] `);
	prompt.close();
	return answer.trim().toLowerCase() === "y";
}

/**
 * 签发恢复链接。地址统一转成小写：生成的地址本来就是小写，会话里存的也是这个样子；
 * 发件方把地址写成大写的那些信，原来的会话也看不到，恢复后保持一致。
 * token 只在这里出现一次（打印出来的链接里），库里只存它的 SHA-256。
 */
async function recover(args) {
	const usage = `Usage: recover <address@${site.domain}> [--days N]`;
	let days = DEFAULT_RECOVERY_DAYS;
	const positional = [];
	for (let index = 0; index < args.length; index++) {
		if (args[index] === "--days") {
			days = Number(args[++index]);
		} else {
			positional.push(args[index]);
		}
	}
	const address = parseAddress(positional[0]);
	if (!address || positional.length !== 1) {
		fail(usage);
	}
	if (!Number.isInteger(days) || days < 1 || days > MAX_RECOVERY_DAYS) {
		fail(`--days must be a whole number from 1 to ${MAX_RECOVERY_DAYS}.`);
	}

	// 先给站长看一眼这个地址收过多少信、最近一封是什么时候，再决定签不签。
	console.log(`Emails received by ${address}:`);
	query(
		`SELECT COUNT(*) AS emails, datetime(MAX(time) / 1000, 'unixepoch') AS latest FROM emails WHERE to_address = '${address}'`,
	);
	if (
		!(await confirm(
			`Issue a recovery link for ${address}, valid for ${days} days?`,
		))
	) {
		fail("Cancelled.");
	}

	const token = randomBytes(32).toString("base64url");
	const tokenHash = createHash("sha256").update(token).digest("hex");
	const recoveryId = randomUUID();
	const now = Date.now();
	query(
		`INSERT INTO recoveries (id, address, token_hash, redeem_expires_at, created_at) VALUES ('${recoveryId}', '${address}', '${tokenHash}', ${now + days * DAY_MS}, ${now})`,
	);

	console.log(`
Recovery link (shown only once, works once, expires in ${days} days):

  https://${site.domain}/recover#${token}

To cancel it before it is used:  pnpm run revoke ${recoveryId}`);
}

/** 作废还没兑换的恢复链接：按链接 ID，或者按地址作废这个地址所有还没用的链接。 */
function revoke(args) {
	const target = (args[0] ?? "").trim().toLowerCase();
	const address = parseAddress(target);
	if (!UUID.test(target) && !address) {
		fail(`Usage: revoke <recovery id or address@${site.domain}>`);
	}
	const match = address ? `address = '${address}'` : `id = '${target}'`;
	query(
		`UPDATE recoveries SET revoked_at = ${Date.now()} WHERE ${match} AND redeemed_at IS NULL AND revoked_at IS NULL RETURNING id, address`,
	);
}

switch (command) {
	case "migrate":
		cf(["d1", "migrations", "apply", id, ...rest]);
		break;
	case "messages":
		query(
			"SELECT datetime(time / 1000, 'unixepoch') AS received, locale, contact, body FROM messages ORDER BY time DESC LIMIT 50",
		);
		break;
	case "recover":
		await recover(rest);
		break;
	case "revoke":
		revoke(rest);
		break;
	default:
		fail(
			`Unknown command: ${command ?? "(none)"}. Use "migrate", "messages", "recover" or "revoke".`,
		);
}
