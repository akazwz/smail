CREATE TABLE `attachments` (
	`id` text PRIMARY KEY NOT NULL,
	`email_id` text NOT NULL,
	`filename` text,
	`content_type` text,
	`size` integer,
	`content_id` text,
	`is_inline` integer DEFAULT false NOT NULL,
	`r2_key` text,
	`r2_bucket` text,
	`upload_status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_attachments_email_id` ON `attachments` (`email_id`);--> statement-breakpoint
CREATE INDEX `idx_attachments_r2_key` ON `attachments` (`r2_key`);--> statement-breakpoint
CREATE TABLE `emails` (
	`id` text PRIMARY KEY NOT NULL,
	`mailbox_id` text NOT NULL,
	`message_id` text,
	`from_address` text NOT NULL,
	`to_address` text NOT NULL,
	`subject` text,
	`text_content` text,
	`html_content` text,
	`raw_email` text NOT NULL,
	`received_at` integer NOT NULL,
	`is_read` integer DEFAULT false NOT NULL,
	`size` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_emails_mailbox_id` ON `emails` (`mailbox_id`);--> statement-breakpoint
CREATE INDEX `idx_emails_received_at` ON `emails` (`received_at`);--> statement-breakpoint
CREATE INDEX `idx_emails_is_read` ON `emails` (`is_read`);--> statement-breakpoint
CREATE TABLE `mailboxes` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`created_at` integer NOT NULL,
	`expires_at` integer NOT NULL,
	`is_active` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `mailboxes_email_unique` ON `mailboxes` (`email`);--> statement-breakpoint
CREATE INDEX `idx_mailboxes_email` ON `mailboxes` (`email`);--> statement-breakpoint
CREATE INDEX `idx_mailboxes_expires_at` ON `mailboxes` (`expires_at`);