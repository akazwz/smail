import { desc, eq, and, inArray } from "drizzle-orm";
import { LibSQLDatabase } from "drizzle-orm/libsql";
import { emails, InsertEmail } from "./schema";
import { getWebTursoDBFromEnv } from "./db";

export async function insertEmail(db: LibSQLDatabase, email: InsertEmail) {
  try {
    await db.insert(emails).values(email).execute();
  } catch (e) {
    console.error(e);
  }
}

export async function getEmails(db: LibSQLDatabase) {
  try {
    return await db.select().from(emails).execute();
  } catch (e) {
    return [];
  }
}

export async function getEmail(db: LibSQLDatabase, id: string) {
  try {
    const result = await db
      .select()
      .from(emails)
      .where(and(eq(emails.id, id)))
      .all();
    if (result.length <= 0) {
      return null;
    }
    return result[0];
  } catch (e) {
    return null;
  }
}

export async function getEmailsByMessageTo(messageTo: string[]) {
  try {
    const db = getWebTursoDBFromEnv();
    return await db
      .select()
      .from(emails)
      .where(inArray(emails.messageTo, messageTo))
      .orderBy(desc(emails.createdAt))
      .all();
  } catch (e) {
    return [];
  }
}

export async function getEmailDetail(id: string) {
  try {
    const db = getWebTursoDBFromEnv();
    const res = await db.select().from(emails).where(eq(emails.id, id)).all();
    return res[0];
  } catch (e) {
    return null;
  }
}
