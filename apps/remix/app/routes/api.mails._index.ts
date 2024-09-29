import { LoaderFunction } from "@remix-run/node";
import { getEmailsByMessageTo } from "database/dao";
import { currentAccountCookie } from "../cookies.server";

export const loader: LoaderFunction = async ({ request }) => {
  const currentAccount = await currentAccountCookie.parse(
    request.headers.get("Cookie")
  );
  const mails = await getEmailsByMessageTo(currentAccount);
  return mails;
};
