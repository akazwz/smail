-- 联系页的留言。站长定期来看，没有任何提醒。
CREATE TABLE IF NOT EXISTS messages (
	id TEXT PRIMARY KEY,
	body TEXT NOT NULL,
	-- 留言的人自愿留下的联系方式，可以为空。
	contact TEXT NOT NULL DEFAULT '',
	-- 留言时页面的语言。
	locale TEXT NOT NULL DEFAULT '',
	-- 来源网络地址的单向指纹，只用来限制同一来源的提交频率，还原不出地址。
	sender TEXT NOT NULL,
	time INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_messages_time ON messages (time);
CREATE INDEX IF NOT EXISTS idx_messages_sender_time ON messages (sender, time);
