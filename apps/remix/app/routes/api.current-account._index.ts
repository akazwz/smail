import { currentAccountCookie } from "~/cookies.server";
import { ActionFunction, redirect } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formatData = await request.formData();

  const account = formatData.get("email");

  if (!account) {
    throw new Response("Missing email param", { status: 400 });
  }
  const currentAccount = await currentAccountCookie.serialize(account);
  return redirect("/", {
    headers: [["Set-Cookie", currentAccount]],
  });
};
