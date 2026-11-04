// cf 的 D1 命令只认数据库 ID，不认名字。ID 写在 ../site.config.ts 里，
// 这里把它取出来再转交给 cf，免得同一个 ID 在好几条命令里各抄一遍。
//
//   node d1.mjs migrate [cf 的其他参数]       执行 migrations/ 里还没执行过的迁移
//   node d1.mjs messages                     列出最近 50 条留言
//   node d1.mjs recover <地址> [--days N] [--send-to 对方邮箱] [--dry-run]
//                                            签发一条地址恢复链接（默认 7 天内有效）；
//                                            带 --send-to 时直接从 support@<域名> 发给对方
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
// 收恢复链接的邮箱：只做粗校验，挡住空白、引号这类会出问题的字符。
const CONTACT_EMAIL = /^[^\s@"'`;\\<>()]+@[a-z0-9-]+(\.[a-z0-9-]+)+$/i;
// 恢复链接从这个地址发出。域名要在 Cloudflare 的 Email Sending 里开通过。
const SUPPORT_ADDRESS = `support@${site.domain}`;

function fail(message) {
	console.error(message);
	process.exit(1);
}

if (!id) {
	fail(
		"site.config.ts has no database.id yet. Create the database and fill it in.",
	);
}

/** 运行一条 cf 命令，输出直接打在终端上；返回是否成功。 */
function tryCf(args) {
	// 从 pnpm 的脚本里运行时，cf 在 PATH 上（node_modules/.bin）。
	const result = spawnSync("cf", args, {
		stdio: "inherit",
		shell: process.platform === "win32",
	});
	return result.status === 0;
}

/** 运行一条 cf 命令；失败就退出。 */
function cf(args) {
	if (!tryCf(args)) {
		process.exit(1);
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

/** 发给对方的信：英文在前、中文在后，内容固定。 */
function recoveryEmail(address, link, days) {
	return {
		subject: `Your ${site.domain} address / 你的 ${site.domain} 邮箱地址`,
		text: `Hello,

You asked for help getting back ${address}. Open this link in the browser you want to use it in, and click the button on the page:

${link}

- The link works once and expires in ${days} days. Do not share it: whoever opens it first gets the address.
- After that the address stays in that browser like before. If you clear its cookies, it is gone again.
- If you were waiting for a verification code, request a new one after recovering.

If you did not ask for this, ignore this email.

---

你好：

你请求找回 ${address}。请用你之后要一直使用的那个浏览器打开下面的链接，并点击页面上的按钮：

${link}

- 链接只能使用一次，${days} 天内有效。请不要转发给别人：谁先打开，地址就归谁。
- 找回后，地址会和之前一样一直保留在这个浏览器里；清除浏览器的 cookie 后会再次丢失。
- 如果你在等验证码，找回后请重新获取一次。

如果这不是你本人的请求，请忽略这封邮件。

${site.domain}
`,
	};
}

/** 从 support 地址把恢复链接发给对方；dryRun 时只让 cf 校验、不真的发。 */
function sendRecoveryEmail(to, { subject, text }, dryRun) {
	return tryCf([
		"email-sending",
		"send",
		"--from-address",
		SUPPORT_ADDRESS,
		"--from-name",
		site.domain,
		"--to-address",
		to,
		"--subject",
		subject,
		"--text",
		text,
		...(dryRun ? ["--dry-run"] : []),
	]);
}

/**
 * 签发恢复链接。地址统一转成小写，和 Worker 里的统一写法一致（src/address.ts 的
 * normalizeAddress）：收信入库、会话里的地址都是小写。
 * 库里只存 token 的 SHA-256。不带 --send-to 时链接只打印这一次；带了就直接发给对方，
 * 不在终端里出现，发送失败时刚签发的链接立即作废。--dry-run 只预览，不写库、不发信。
 */
async function recover(args) {
	const usage = `Usage: recover <address@${site.domain}> [--days N] [--send-to <email>] [--dry-run]`;
	let days = DEFAULT_RECOVERY_DAYS;
	let sendTo = null;
	let dryRun = false;
	const positional = [];
	for (let index = 0; index < args.length; index++) {
		if (args[index] === "--days") {
			days = Number(args[++index]);
		} else if (args[index] === "--send-to") {
			sendTo = (args[++index] ?? "").trim();
		} else if (args[index] === "--dry-run") {
			dryRun = true;
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
	if (sendTo !== null && !CONTACT_EMAIL.test(sendTo)) {
		fail(`--send-to needs an email address. ${usage}`);
	}
	if (dryRun && sendTo === null) {
		fail(`--dry-run only applies with --send-to. ${usage}`);
	}

	// 先给站长看一眼这个地址收过多少信、最近一封是什么时候，再决定签不签。
	console.log(`Emails received by ${address}:`);
	query(
		`SELECT COUNT(*) AS emails, datetime(MAX(time) / 1000, 'unixepoch') AS latest FROM emails WHERE to_address = '${address}'`,
	);
	if (sendTo !== null) {
		const preview = recoveryEmail(
			address,
			`https://${site.domain}/recover#<link>`,
			days,
		);
		console.log(
			`\nFrom: ${site.domain} <${SUPPORT_ADDRESS}>\nTo: ${sendTo}\nSubject: ${preview.subject}\n\n${preview.text}`,
		);
	}
	if (dryRun) {
		// 让 cf 校验一遍发信参数（发件域名、收件地址），不写库、不发信。
		const ok = sendRecoveryEmail(
			sendTo,
			recoveryEmail(address, `https://${site.domain}/recover#<link>`, days),
			true,
		);
		if (!ok) {
			fail("Dry run failed.");
		}
		console.log("Dry run: nothing issued, nothing sent.");
		return;
	}
	const question = sendTo
		? `Issue a recovery link for ${address}, valid for ${days} days, and email it to ${sendTo}?`
		: `Issue a recovery link for ${address}, valid for ${days} days?`;
	if (!(await confirm(question))) {
		fail("Cancelled.");
	}

	const token = randomBytes(32).toString("base64url");
	const tokenHash = createHash("sha256").update(token).digest("hex");
	const recoveryId = randomUUID();
	const now = Date.now();
	query(
		`INSERT INTO recoveries (id, address, token_hash, redeem_expires_at, created_at) VALUES ('${recoveryId}', '${address}', '${tokenHash}', ${now + days * DAY_MS}, ${now})`,
	);
	const link = `https://${site.domain}/recover#${token}`;

	if (sendTo !== null) {
		if (!sendRecoveryEmail(sendTo, recoveryEmail(address, link, days), false)) {
			// 没发出去的链接谁也拿不到，留着没有意义：立即作废。
			query(
				`UPDATE recoveries SET revoked_at = ${Date.now()} WHERE id = '${recoveryId}'`,
			);
			fail("Sending failed. The link was revoked; nothing was sent.");
		}
		console.log(`
Recovery link emailed to ${sendTo} (works once, expires in ${days} days).

To cancel it before it is used:  pnpm run revoke ${recoveryId}`);
		return;
	}

	console.log(`
Recovery link (shown only once, works once, expires in ${days} days):

  ${link}

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
