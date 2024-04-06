import { ActionFunction, redirect } from "@remix-run/node";
import { nanoid } from "nanoid";
import { NotSelected } from "~/components/mail/components/NotSelected";
import { ResizableHandle, ResizablePanel } from "~/components/ui/resizable";
import { accountListCookie, currentAccountCookie } from "~/cookies.server";
import { turnstileCheck, Account, defaultLayout } from "./_h";

export const action: ActionFunction = async ({ request }) => {
  try {
    const TURNSTILE_ENABLED = process.env.TURNSTILE_ENABLED === "true";
    if (TURNSTILE_ENABLED) {
      const passed = await turnstileCheck(request);
      if (!passed) {
        return {
          error: "Failed to pass the turnstile",
        };
      }
    }
    const formData = await request.formData();
    const headers = request.headers.get("Cookie");
    const userName = formData.get("userName");
    const domain = formData.get("domain");

    const oldAccountList: Account[] =
      (await accountListCookie.parse(headers)) || [];

    const isExisting = oldAccountList.find((m) => m.userName === userName);
    if (isExisting) {
      return redirect("/");
    } else {
      const emailAddress = `${userName}@${domain}`;
      oldAccountList.push({
        userName: userName as string,
        email: emailAddress,
        id: nanoid(),
      });

      const newAccountList = await accountListCookie.serialize(oldAccountList);
      const currentAccount = await currentAccountCookie.serialize(emailAddress);
      return redirect("/", {
        headers: [
          ["Set-Cookie", newAccountList],
          ["Set-Cookie", currentAccount],
        ],
      });
    }
  } catch (error) {
    console.error("error: ", error);
    return redirect("/");
  }
};

export default function Index() {
  return (
    <>
      <ResizableHandle />
      <ResizablePanel defaultSize={defaultLayout[2]}>
        <NotSelected />
      </ResizablePanel>
    </>
  );
}
