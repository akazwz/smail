import { accountListCookie, currentAccountCookie } from "~/cookies.server";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { nanoid } from "nanoid";
import { turnstileCheck, Account } from "./_h";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { Turnstile } from "@marsidev/react-turnstile";

import { Button } from "~/components/ui/button";

import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { getEmailsByMessageTo } from "database/dao";
import { SiteHeader } from "~/components/SiteHeader";
import Footer from "~/components/Footer";

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const cfTurnstileResponse = formData.get("cf-turnstile-response");

    const headers = request.headers.get("Cookie");
    const userName = formData.get("userName");
    const domain = formData.get("domain");
    const TURNSTILE_ENABLED = process.env.TURNSTILE_ENABLED === "true";

    if (TURNSTILE_ENABLED) {
      const passed = await turnstileCheck(cfTurnstileResponse as string);

      if (!passed) {
        return {
          error: "Failed to pass the turnstile",
        };
      }
    }

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

export const loader: LoaderFunction = async ({ request }) => {
  const TURNSTILE_KEY = process.env.TURNSTILE_KEY;
  const TURNSTILE_ENABLED = process.env.TURNSTILE_ENABLED === "true";
  const domains = process.env.DOMAINS?.split?.(",");
  const headers = request.headers.get("Cookie");
  const currentAccount: string | null =
    await currentAccountCookie.parse(headers);
  const accounts: Account[] = (await accountListCookie.parse(headers)) || [];

  if (accounts.length === 0) {
    return {
      accounts,
      mails: [],
      TURNSTILE_ENABLED,
      domains,
      currentAccount,
      TURNSTILE_KEY,
    };
  }

  const mails = currentAccount
    ? await getEmailsByMessageTo(currentAccount)
    : [];

  return {
    accounts,
    mails,
    domains,
    currentAccount,
    TURNSTILE_ENABLED,
    TURNSTILE_KEY,
  };
};

export default function CreateAccountForm() {
  const navigation = useNavigation();
  const loaderData = useLoaderData<typeof loader>();
  const { domains, TURNSTILE_KEY, TURNSTILE_ENABLED } = loaderData;

  return (
    <>
      <SiteHeader></SiteHeader>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 min-h-[calc(100vh-8rem)]">
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <Form
              method="POST"
              className="flex flex-col gap-2 text-center w-full"
            >
              {TURNSTILE_ENABLED && (
                <Turnstile
                  className="w-full flex justify-center"
                  siteKey={TURNSTILE_KEY}
                  options={{
                    theme: "auto",
                  }}
                  style={{ width: "100%" }}
                />
              )}

              <div className="flex">
                <Input
                  placeholder="Enter username"
                  name="userName"
                  className="border-r-0 rounded-r-none"
                />
                <Select defaultValue={domains?.[0]} name="domain">
                  <SelectTrigger className="w-[180px] border-l-0 rounded-l-none">
                    <SelectValue placeholder="Select a domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {domains?.map((domain: string) => (
                        <SelectItem value={domain} key={domain}>
                          {domain}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={navigation.state === "submitting"}
              >
                Create an email account
              </Button>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
