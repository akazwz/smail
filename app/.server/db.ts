import { drizzle } from "drizzle-orm/d1";
import * as s from "~/drizzle/schema";

export const schema = s;

export function d1Wrapper(d1: D1Database) {
	return drizzle(d1, {
		schema,
	});
}
