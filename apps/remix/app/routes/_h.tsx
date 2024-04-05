import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { Outlet, redirect, useLoaderData } from "@remix-run/react";
import { type MetaFunction } from "@remix-run/node";
import { Search } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import * as React from "react";

import { LoaderFunction, ActionFunction } from "@remix-run/node";
import { getEmailsByMessageTo } from "database/dao";
import { nanoid } from "nanoid";
import { userMailboxCookie } from "~/cookies.server";
import { Empty } from "~/components/mail/components/empty";
import { AccountSwitcher } from "~/components/mail/components/account-switcher";
import { Input } from "~/components/ui/input";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "~/components/ui/resizable";
import { MailList } from "~/components/mail/components/mail-list";
import { TURNSTILE_ENABLED } from "~/config/env";
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
  const turnstileEnabled = TURNSTILE_ENABLED === "true";
  const domains = process.env.DOMAINS?.split?.(",");

  const accounts =
    ((await userMailboxCookie.parse(
      request.headers.get("Cookie")
    )) as UserMailbox[]) || [];

  if (accounts.length === 0) {
    return {
      accounts,
      mails: [],
      turnstileEnabled,
      domains,
    };
  }

  const accountList = accounts.map((mail) => mail.email);

  const mails = await getEmailsByMessageTo(accountList);

  return {
    accounts,
    mails,
    domains,
  };
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
    const headers = request.headers.get("Cookie");
    const userName = formData.get("userName");
    const domain = formData.get("domain");

    const oldMailbox: UserMailbox[] =
      (await userMailboxCookie.parse(headers)) || [];

    const isExisting = oldMailbox.find((m) => m.userName === userName);
    if (isExisting) {
      return redirect("/");
    } else {
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
export default function HomeLayout() {
  const [isCollapsed] = React.useState(false);
  const loaderData = useLoaderData<typeof loader>();

  const { accounts, mails, domains } = loaderData;

  if (accounts.length === 0) {
    return <Empty domains={domains} />;
  }
  return (
    <>
      <Header />
      <div className="relative flex min-h-screen flex-col bg-background">
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes
            )}`;
          }}
          className="h-full max-h-[860px] items-stretch"
        >
          <ResizablePanel minSize={30}>
            <Tabs defaultValue="all">
              <div className="flex items-center px-4 py-2">
                <AccountSwitcher
                  isCollapsed={isCollapsed}
                  accounts={accounts}
                />
              </div>
              <Separator />
              <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <form>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search" className="pl-8" />
                  </div>
                </form>
              </div>
              <TabsContent value="all" className="m-0">
                <MailList items={mails} />
              </TabsContent>
            </Tabs>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <Outlet />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <Footer />
    </>
  );
}
