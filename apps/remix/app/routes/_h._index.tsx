import {
  LoaderFunction,
  redirect,
  type ActionFunction,
  type MetaFunction,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";

import { getEmailsByMessageTo } from "database/dao";
import { getWebTursoDBFromEnv } from "database/db";
import { userMailboxCookie } from "~/cookies.server";
import { Mail } from "~/components/mail/components/mail";

import { nanoid } from "nanoid";

import { useQuery } from "@tanstack/react-query";
import { fetchMails } from "~/components/MailList";
import { Turnstile } from "@marsidev/react-turnstile";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Smail" },
    { name: "description", content: "Welcome to Smail!" },
  ];
};

export interface UserMailbox {
  userName: string;
  email: string;
  id: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  const turnstileEnabled = process.env.TURNSTILE_ENABLED === "true";
  const siteKey = process.env.TURNSTILE_KEY;
  const accounts =
    ((await userMailboxCookie.parse(
      request.headers.get("Cookie")
    )) as UserMailbox[]) || [];

  if (accounts.length === 0) {
    return {
      accounts,
      mails: [],
      turnstileEnabled,
      siteKey,
    };
  }
  const db = getWebTursoDBFromEnv();
  const mailsList = accounts.map((mail) => mail.email);

  const mails = await getEmailsByMessageTo(db, mailsList);

  return {
    accounts: accounts,
    mails,
    siteKey,
  };
};

export const action: ActionFunction = async ({ request }) => {
  try {
    if (process.env.TURNSTILE_ENABLED === "true") {
      const passed = await turnstileCheck(request);
      if (!passed) {
        return {
          error: "Failed to pass the turnstile",
        };
      }
    }
    const formData = await request.formData();
    const userName = formData.get("userName");

    const oldMailbox =
      ((await userMailboxCookie.parse(
        request.headers.get("Cookie")
      )) as UserMailbox[]) || [];

    const isExisting = oldMailbox.find((m) => m.userName === userName);
    if (isExisting) {
      return redirect("/");
    } else {
      const domain = process.env.DOMAIN;
      const emailAddress = `${userName}@${domain}`;
      oldMailbox.push({
        userName: userName as string,
        email: emailAddress,
        id: nanoid(),
      });

      const userMailbox = await userMailboxCookie.serialize(oldMailbox);
      return redirect("/", {
        headers: {
          "Set-Cookie": userMailbox,
        },
      });
    }
  } catch (error) {
    console.error("error: ", error);
    return redirect("/");
  }
};

export async function turnstileCheck(request: Request): Promise<boolean> {
  const response = (await request.formData()).get("cf-turnstile-response");
  if (!response) {
    return false;
  }
  const verifyEndpoint = process.env
    .CLOUDFLARE_TURNSTILE_VERIFY_Endpoint as string;

  const secret = process.env.TURNSTILE_SECRET;
  const resp = await fetch(verifyEndpoint, {
    method: "POST",
    body: JSON.stringify({
      secret,
      response,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await resp.json();
  if (!data.success) {
    return false;
  }
  return true;
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { accounts, mails, siteKey } = loaderData;
  const { data, isFetching } = useQuery({
    queryKey: ["mails"],
    queryFn: fetchMails,
    // refetchInterval: 10 * 1000,
  });
  console.log("data: ", data);
  const navigation = useNavigation();

  if (accounts.length === 0) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no accounts
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start receiving emails as soon as you add an account.
            </p>
            <Form
              method="POST"
              className="flex flex-col gap-2 text-center w-full"
            >
              <Turnstile
                className="w-full flex justify-center"
                siteKey={siteKey}
                options={{
                  theme: "auto",
                }}
                style={{ width: "100%" }}
              />
              <Input placeholder="Enter username" name="userName" />
              <Button type="submit" disabled={navigation.state != "idle"}>
                Create an email account
              </Button>
            </Form>
          </div>
        </div>
      </main>
    );
  }
  return (
    <>
      <div className="flex-col md:flex">
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={undefined}
          defaultCollapsed={undefined}
          navCollapsedSize={4}
          siteKey={siteKey}
        />
      </div>
      {actionData?.error && (
        <div className="text-red-500">{actionData.error}</div>
      )}
    </>
  );
}
