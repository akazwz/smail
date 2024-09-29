import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import type { Address, Attachment, Header } from "postal-mime";

export const emails = sqliteTable("emails", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	domain: text("domain"),
	messageFrom: text("message_from"),
	messageTo: text("message_to"),
	// content from raw email
	headers: text("headers", { mode: "json" }).$type<Header[]>().notNull(),
	from: text("from", { mode: "json" }).$type<Address>().notNull(),
	sender: text("sender", { mode: "json" }).$type<Address>(),
	replyTo: text("reply_to", { mode: "json" }).$type<Address[]>(),
	deliveredTo: text("delivered_to"),
	returnPath: text("return_path"),
	to: text("to", { mode: "json" }).$type<Address[]>(),
	cc: text("cc", { mode: "json" }).$type<Address[]>(),
	bcc: text("bcc", { mode: "json" }).$type<Address[]>(),
	subject: text("subject"),
	messageId: text("message_id"),
	inReplyTo: text("in_reply_to"),
	references: text("references"),
	date: text("date"),
	html: text("html"),
	text: text("text"),
	attachments: text("attachments", { mode: "json" })
		.$type<Attachment[]>()
		.notNull(),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date())
		.$onUpdateFn(() => new Date()),
});

export type Email = typeof emails.$inferSelect;
export type EmailInsert = typeof emails.$inferInsert;
