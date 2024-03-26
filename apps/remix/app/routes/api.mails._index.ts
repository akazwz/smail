import { LoaderFunction } from "@remix-run/node";
import { getEmailsByMessageTo } from "database/dao";
import { getWebTursoDB } from "database/db";
import { userMailboxCookie } from "../cookies.server";
import { UserMailbox } from "./_h._index";

export const loader: LoaderFunction = async ({ request }) => {
  const [userMailbox] =
    ((await userMailboxCookie.parse(
      request.headers.get("Cookie")
    )) as UserMailbox[][]) || [];
  if (!userMailbox) {
    return [];
  }
  const mailsList = userMailbox.map((mail) => mail.email);
  const db = getWebTursoDB(
    process.env.TURSO_DB_URL as string,
    process.env.TURSO_DB_RO_AUTH_TOKEN as string
  );
  const mails = await getEmailsByMessageTo(db, mailsList);
  return mails;
};
