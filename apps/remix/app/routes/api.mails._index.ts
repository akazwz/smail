import { LoaderFunction } from "@remix-run/node";
import { getEmailsByMessageTo } from "database/dao";
import { userMailboxCookie } from "../cookies.server";
import { UserMailbox } from "./_h._index";

export const loader: LoaderFunction = async ({ request }) => {
  const userMailbox =
    ((await userMailboxCookie.parse(
      request.headers.get("Cookie")
    )) as UserMailbox[]) || [];
  if (userMailbox.length <= 0) {
    return [];
  }
  const mailsList = userMailbox.map((mail) => mail.email);

  const mails = await getEmailsByMessageTo(mailsList);
  return mails;
};
