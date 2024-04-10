import { ForwardableEmailMessage } from '@cloudflare/workers-types';
import { insertEmail } from 'database/dao';
import { getWebTursoDB } from 'database/db';
import { InsertEmail, insertEmailSchema, AttachmentSchemaType } from 'database/schema';
import { nanoid } from 'nanoid/non-secure';
import PostalMime from 'postal-mime';

export interface Env {
	TURSO_DB_URL: string;
	TURSO_DB_AUTH_TOKEN: string;
}

export default {
	async email(message: ForwardableEmailMessage, env: Env, ctx: ExecutionContext): Promise<void> {
		try {
			const messageFrom = message.from;
			const messageTo = message.to;
			const domain = messageTo.split('@')[1];
			const rawText = await new Response(message.raw).text();
			const mail = await new PostalMime().parse(rawText);
			const now = new Date();
			const attachments: AttachmentSchemaType[] = [];
			for (let attachment of mail.attachments) {
				const content = btoa(String.fromCharCode(...new Uint8Array(attachment.content)));
				attachments.push({
					...attachment,
					content: content,
				});
			}
			const db = getWebTursoDB(env.TURSO_DB_URL, env.TURSO_DB_AUTH_TOKEN);
			const newEmail: InsertEmail = {
				id: nanoid(),
				domain,
				messageFrom,
				messageTo,
				...mail,
				attachments,
				createdAt: now,
				updatedAt: now,
			};
			const email = insertEmailSchema.parse(newEmail);
			await insertEmail(db, email);
		} catch (e) {
			console.log('insertEmail', e);
		}
	},
};
