import { Turnstile } from "@marsidev/react-turnstile";
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
import randomName from "@scaleway/random-name";
import { getEmailsByMessageTo } from "database/dao";
import { getWebTursoDB } from "database/db";

import CopyButton from "../components/CopyButton";
import MailListWithQuery from "../components/MailList";
import { userMailboxCookie } from "../cookies.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Smail" },
    { name: "description", content: "Welcome to Smail!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const siteKey = process.env.TURNSTILE_KEY || "1x00000000000000000000AA";
  const userMailbox =
    ((await userMailboxCookie.parse(
      request.headers.get("Cookie"),
    )) as string) || undefined;
  if (!userMailbox) {
    return {
      userMailbox: undefined,
      mails: [],
      siteKey,
    };
  }
  const db = getWebTursoDB(
    process.env.TURSO_DB_URL as string,
    process.env.TURSO_DB_RO_AUTH_TOKEN as string,
  );
  const mails = await getEmailsByMessageTo(db, userMailbox);
  return {
    userMailbox,
    mails,
    siteKey,
  };
};

export const action: ActionFunction = async ({ request }) => {
  const response = (await request.formData()).get("cf-turnstile-response");
  if (!response) {
    return {
      error: "No captcha response",
    };
  }
  const verifyEndpoint =
    "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const secret =
    process.env.TURNSTILE_SECRET || "1x0000000000000000000000000000000AA";
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
    return {
      error: "Failed to verify captcha",
    };
  }

  const domain = "smail.pw";
  const mailbox = `${randomName("", ".")}@${domain}`;
  const userMailbox = await userMailboxCookie.serialize(mailbox);
  return redirect("/", {
    headers: {
      "Set-Cookie": userMailbox,
    },
  });
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const navigation = useNavigation();

  return (
    <>
      <div className="flex flex-col md:p-4 font-semibold items-center max-w-md w-full mx-auto gap-2 p-2 rounded-md border-2 border-dashed">
        <h1 className="font-semibold">
          Your<span className="text-blue-500 mx-1">Temporary</span>
          Email Address
        </h1>
        {loaderData?.userMailbox ? (
          <div className="flex items-center text-zinc-800 bg-zinc-100 px-4 p-2 rounded-md w-full">
            <span>{loaderData.userMailbox}</span>
            <CopyButton
              content={loaderData.userMailbox}
              className="p-1 rounded-md border ml-auto"
            />
          </div>
        ) : (
          <Form method="POST" className="flex flex-col gap-2">
            <Turnstile
              siteKey={loaderData.siteKey}
              options={{
                theme: "light",
              }}
            />
            <button
              type="submit"
              disabled={navigation.state != "idle"}
              className="p-4 rounded-md w-full bg-blue-500 hover:opacity-90 disabled:cursor-not-allowed disabled:bg-zinc-500"
            >
              Submit
            </button>
          </Form>
        )}
      </div>
      <h2 className="text-zinc-600 text-xs md:p-2 md:text-sm">
        Forget about spam, advertising mailings, hacking and attacking robots.
        Keep your real mailbox clean and secure. Temp Mail provides temporary,
        secure, anonymous, free, disposable email address.
      </h2>
      <MailListWithQuery mails={loaderData.mails} />
      <div>
        {actionData?.error && (
          <div className="text-red-500">{actionData.error}</div>
        )}
      </div>
    </>
  );
}
