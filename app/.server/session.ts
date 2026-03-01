import { createWorkersKVSessionStorage } from "@react-router/cloudflare";
import { createCookie } from "react-router";

type SessionData = {
	addresses: string[];
	addressIssuedAt?: number;
};

export const getCookie = () => {
	return createCookie("__session", {
		httpOnly: true,
		sameSite: "lax",
		secure: true,
	});
};

let sessionStorage: ReturnType<
	typeof createWorkersKVSessionStorage<SessionData>
> | null = null;

async function getSessionStorage() {
	if (!sessionStorage) {
		// 延迟到运行时才 import cloudflare:workers，避免 build 时报错
		const { env } = await import("cloudflare:workers");
		sessionStorage = createWorkersKVSessionStorage<SessionData>({
			cookie: getCookie(),
			kv: env.KV,
		});
	}
	return sessionStorage;
}

export async function getSession(
	...args: Parameters<
		ReturnType<typeof createWorkersKVSessionStorage<SessionData>>["getSession"]
	>
) {
	const storage = await getSessionStorage();
	return storage.getSession(...args);
}

export async function commitSession(
	...args: Parameters<
		ReturnType<
			typeof createWorkersKVSessionStorage<SessionData>
		>["commitSession"]
	>
) {
	const storage = await getSessionStorage();
	return storage.commitSession(...args);
}

export async function destroySession(
	...args: Parameters<
		ReturnType<
			typeof createWorkersKVSessionStorage<SessionData>
		>["destroySession"]
	>
) {
	const storage = await getSessionStorage();
	return storage.destroySession(...args);
}
