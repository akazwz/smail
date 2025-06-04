import { relations } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// 邮箱表 - 存储临时邮箱信息
export const mailboxes = sqliteTable(
	"mailboxes",
	{
		id: text("id").primaryKey(),
		email: text("email").notNull().unique(),
		createdAt: integer("created_at", { mode: "timestamp" })
			.notNull()
			.$defaultFn(() => new Date()),
		expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
		isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
	},
	(table) => [
		index("idx_mailboxes_email").on(table.email),
		index("idx_mailboxes_expires_at").on(table.expiresAt),
	],
);

// 邮件表 - 存储接收的邮件
export const emails = sqliteTable(
	"emails",
	{
		id: text("id").primaryKey(),
		mailboxId: text("mailbox_id").notNull(),
		messageId: text("message_id"),
		fromAddress: text("from_address").notNull(),
		toAddress: text("to_address").notNull(),
		subject: text("subject"),
		textContent: text("text_content"),
		htmlContent: text("html_content"),
		rawEmail: text("raw_email").notNull(),
		receivedAt: integer("received_at", { mode: "timestamp" })
			.notNull()
			.$defaultFn(() => new Date()),
		isRead: integer("is_read", { mode: "boolean" }).notNull().default(false),
		size: integer("size").notNull(),
	},
	(table) => [
		index("idx_emails_mailbox_id").on(table.mailboxId),
		index("idx_emails_received_at").on(table.receivedAt),
		index("idx_emails_is_read").on(table.isRead),
	],
);

// 附件表 - 存储邮件附件元数据，实际文件存储在 R2 中
export const attachments = sqliteTable(
	"attachments",
	{
		id: text("id").primaryKey(),
		emailId: text("email_id").notNull(),
		filename: text("filename"),
		contentType: text("content_type"),
		size: integer("size"),
		contentId: text("content_id"),
		isInline: integer("is_inline", { mode: "boolean" })
			.notNull()
			.default(false),
		// R2 存储相关字段
		r2Key: text("r2_key"), // R2 中的文件路径/键
		r2Bucket: text("r2_bucket"), // R2 存储桶名称
		uploadStatus: text("upload_status").notNull().default("pending"), // pending, uploaded, failed
		createdAt: integer("created_at", { mode: "timestamp" })
			.notNull()
			.$defaultFn(() => new Date()),
	},
	(table) => [
		index("idx_attachments_email_id").on(table.emailId),
		index("idx_attachments_r2_key").on(table.r2Key),
	],
);

// 定义关系 - 使用 relations 来表示表之间的关系，而不是数据库外键
export const mailboxesRelations = relations(mailboxes, ({ many }) => ({
	emails: many(emails),
}));

export const emailsRelations = relations(emails, ({ one, many }) => ({
	mailbox: one(mailboxes, {
		fields: [emails.mailboxId],
		references: [mailboxes.id],
	}),
	attachments: many(attachments),
}));

export const attachmentsRelations = relations(attachments, ({ one }) => ({
	email: one(emails, {
		fields: [attachments.emailId],
		references: [emails.id],
	}),
}));

// 导出类型
export type Mailbox = typeof mailboxes.$inferSelect;
export type NewMailbox = typeof mailboxes.$inferInsert;

export type Email = typeof emails.$inferSelect;
export type NewEmail = typeof emails.$inferInsert;

export type Attachment = typeof attachments.$inferSelect;
export type NewAttachment = typeof attachments.$inferInsert;
