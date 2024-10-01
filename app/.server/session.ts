import {
	createCookie,
	createWorkersKVSessionStorage,
} from "@remix-run/cloudflare";

type SessionData = {
	email: string;
	password: string;
};

const DEFAULT_COOKIE_SECRET = "defalt_secret";

export function sessionWrapper(env: Env) {
	const sessionCookie = cookieWrapper(env);
	return createWorkersKVSessionStorage<SessionData>({
		kv: env.KV,
		cookie: sessionCookie,
	});
}

export function cookieWrapper(env: Env) {
	return createCookie("__session", {
		secrets: [env.COOKIE_SECRET || DEFAULT_COOKIE_SECRET],
		sameSite: true,
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 30,
	});
}
