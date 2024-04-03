import { createClient as createWebClient } from "@libsql/client/web";
import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";

export function getWebTursoDBFromEnv(): LibSQLDatabase {
  const client = createWebClient({
    url: process.env.TURSO_DB_URL || "",
    authToken: process.env.TURSO_DB_AUTH_TOKEN || "",
  });
  return drizzle(client, {
    logger: process.env.NODE_ENV === "development" ? true : undefined,
  });
}
