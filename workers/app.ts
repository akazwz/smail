import { nanoid } from "nanoid";
import Parser from "postal-mime";
import { createRequestHandler } from "react-router";

declare module "react-router" {
	export interface AppLoadContext {
		cloudflare: {
			env: Env;
			ctx: ExecutionContext;
		};
	}
}

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

export default {
	async fetch(request, env, ctx) {
		return requestHandler(request, {
			cloudflare: { env, ctx },
		});
	},
	async email(msg, env) {
		const parser = new Parser();
		const ab = await new Response(msg.raw).arrayBuffer();
		const parsed = await parser.parse(ab);
		const id = nanoid();

		await env.D1.prepare(
			"INSERT INTO emails (id, to_address, from_name, from_address, subject, time) VALUES (?, ?, ?, ?, ?, ?)",
		)
			.bind(id, msg.to, parsed.from?.name, parsed.from?.address, parsed.subject, Date.now())
			.run();

		await env.R2.put(id, ab);
	},
	async scheduled() {
	},
} satisfies ExportedHandler<Env>;
