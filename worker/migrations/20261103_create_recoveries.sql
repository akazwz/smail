-- 地址恢复链接。访客丢了地址来求助，站长核实后用 `pnpm run recover` 签发一条，
-- 访客打开后在自己的浏览器里确认，地址就回到会话里。只存 token 的哈希，不存 token 本身。
CREATE TABLE IF NOT EXISTS recoveries (
	id TEXT PRIMARY KEY,
	-- 要交还的地址，和生成时一样是小写。
	address TEXT NOT NULL,
	-- 链接里那段 token 的 SHA-256（十六进制）。
	token_hash TEXT NOT NULL UNIQUE,
	-- 过了这个时间（毫秒）还没兑换，链接就作废。
	redeem_expires_at INTEGER NOT NULL,
	-- 兑换的时间；兑换过一次就不能再用。
	redeemed_at INTEGER,
	-- 站长手动作废的时间。
	revoked_at INTEGER,
	created_at INTEGER NOT NULL
);
