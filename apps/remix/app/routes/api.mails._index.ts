import { LoaderFunction } from "@remix-run/node";
import { getEmailsByMessageTo } from "database/dao";
import { getWebTursoDBFromEnv } from "database/db";
import { userMailboxCookie } from "../cookies.server";
import { UserMailbox } from "./_h._index";

export const loader: LoaderFunction = async ({ request }) => {
  const userMailbox =
    ((await userMailboxCookie.parse(
      request.headers.get("Cookie")
    )) as UserMailbox[]) || [];
  if (!userMailbox) {
    return [];
  }
  const mailsList = userMailbox.map((mail) => mail.email);
  const db = getWebTursoDBFromEnv();
  const mails = await getEmailsByMessageTo(db, mailsList);
  return mails;
};
