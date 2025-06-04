import { env } from "cloudflare:workers";
import { createWorkersKVSessionStorage } from "@react-router/cloudflare";
import { createCookie } from "react-router";

const sessionCookie = createCookie("__session", {
	secrets: [env.SESSION_SECRET],
	sameSite: true,
});

type SessionData = {
	email: string;
};

const { getSession, commitSession, destroySession } =
	createWorkersKVSessionStorage<SessionData>({
		kv: env.KV,
		cookie: sessionCookie,
	});

export { getSession, commitSession, destroySession };
