import { cookies } from "next/headers";
import { unsign } from "@/crypto";
import { NextResponse } from "next/server";
import { getWebTursoDB } from "database/db";
import { getEmailsByMessageTo } from "database/dao";

export async function getMailbox() {
  const cookie = cookies().get("mailbox");
  if (!cookie) {
    return undefined;
  }
  const secret = process.env.COOKIES_SECRET as string;
  const mailbox = await unsign(cookie.value, secret);
  if (!mailbox) {
    return undefined;
  }
  return mailbox;
}

export async function fetchEmails(mailbox: string | undefined) {
  try {
    if (!mailbox) {
      return [];
    }
    const url = process.env.TURSO_DB_URL as string;
    const roAuthToken = process.env.TURSO_DB_RO_AUTH_TOKEN as string;
    const db = getWebTursoDB(url, roAuthToken);
    return await getEmailsByMessageTo(db, mailbox);
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function GET() {
  const mailbox = await getMailbox();
  const mails = await fetchEmails(mailbox);
  return NextResponse.json(mails);
}
