import { createCookieSessionStorage } from "react-router";
import { MAIL_RETENTION_HOURS } from "~/utils/mail-retention";

type SessionData = {
	addresses: string[];
	addressIssuedAt?: number;
};

let sessionStorage: ReturnType<
	typeof createCookieSessionStorage<SessionData>
> | null = null;

function getSessionSecrets(env: Pick<Env, "SESSION_SECRETS">): string[] {
	const rotatedSecrets = (env.SESSION_SECRETS ?? "")
		.split(",")
		.map((secret) => secret.trim())
		.filter(Boolean);
	if (rotatedSecrets && rotatedSecrets.length > 0) {
		return rotatedSecrets;
	}

	if (import.meta.env.DEV) {
		return ["local-dev-session-secret-change-me"];
	}

	throw new Error(
		"Missing session cookie secret. Set SESSION_SECRETS or SESSION_SECRET before starting the app.",
	);
}

async function getSessionStorage() {
	if (!sessionStorage) {
		// 延迟到运行时才 import cloudflare:workers，避免 build 时报错
		const { env } = await import("cloudflare:workers");
		sessionStorage = createCookieSessionStorage<SessionData>({
			cookie: {
				name: "__session",
				httpOnly: true,
				maxAge: MAIL_RETENTION_HOURS * 60 * 60,
				path: "/",
				sameSite: "lax",
				secrets: getSessionSecrets(env),
				secure: !import.meta.env.DEV,
			},
		});
	}
	return sessionStorage;
}

export async function getSession(
	...args: Parameters<
		ReturnType<typeof createCookieSessionStorage<SessionData>>["getSession"]
	>
) {
	const storage = await getSessionStorage();
	return storage.getSession(...args);
}

export async function commitSession(
	...args: Parameters<
		ReturnType<typeof createCookieSessionStorage<SessionData>>["commitSession"]
	>
) {
	const storage = await getSessionStorage();
	return storage.commitSession(...args);
}

export async function destroySession(
	...args: Parameters<
		ReturnType<typeof createCookieSessionStorage<SessionData>>["destroySession"]
	>
) {
	const storage = await getSessionStorage();
	return storage.destroySession(...args);
}
