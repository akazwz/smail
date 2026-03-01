export const MAIL_RETENTION_HOURS = 24;
export const MAIL_RETENTION_MS = MAIL_RETENTION_HOURS * 60 * 60 * 1000;

export function getRetentionCutoff(now = Date.now()): number {
	return now - MAIL_RETENTION_MS;
}
