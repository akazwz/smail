import { LoaderFunction } from "@remix-run/node";
import { getEmailsByMessageTo } from "database/dao";
import { accountListCookie } from "../cookies.server";
import { Account } from "./_h";

export const loader: LoaderFunction = async ({ request }) => {
  const userMailbox =
    ((await accountListCookie.parse(
      request.headers.get("Cookie")
    )) as Account[]) || [];
  if (userMailbox.length <= 0) {
    return [];
  }
  const mailsList = userMailbox.map((mail) => mail.email);

  const mails = await getEmailsByMessageTo(mailsList);
  return mails;
};
