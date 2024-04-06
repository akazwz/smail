import Footer from "~/components/Footer";
import { Outlet, redirect, useLoaderData, useMatches } from "@remix-run/react";
import { type MetaFunction } from "@remix-run/node";
import { Search } from "lucide-react";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";

import { LoaderFunction, ActionFunction } from "@remix-run/node";
import { getEmailsByMessageTo } from "database/dao";
import { nanoid } from "nanoid";
import { accountListCookie } from "~/cookies.server";
import { Empty } from "~/components/mail/components/empty";
import { AccountSwitcher } from "~/components/mail/components/account-switcher";
import { Input } from "~/components/ui/input";
import { ResizablePanelGroup, ResizablePanel } from "~/components/ui/resizable";
import { MailList } from "~/components/mail/components/mail-list";
import { TURNSTILE_ENABLED } from "~/config/env";
import { SiteHeader } from "~/components/SiteHeader";
import { cn } from "~/lib/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "Smail" },
    { name: "description", content: "Welcome to Smail!" },
  ];
};

export interface Account {
  userName: string;
  email: string;
  id: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  const turnstileEnabled = TURNSTILE_ENABLED === "true";
  const domains = process.env.DOMAINS?.split?.(",");

  const accounts =
    ((await accountListCookie.parse(
      request.headers.get("Cookie")
    )) as Account[]) || [];

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
      return redirect("/", {
        headers: {
          "Set-Cookie": newAccountList,
        },
      });
    }
  } catch (error) {
    console.error("error: ", error);
    return redirect("/");
  }
};
const defaultLayout = [265, 440, 655];

export default function HomeLayout() {
  const loaderData = useLoaderData<typeof loader>();

  const { accounts, mails } = loaderData;
  const matches = useMatches();
  const isInDetail = matches.some((match) => match.id === "routes/_h.$id");

  if (accounts.length === 0) {
    return (
      <>
        <SiteHeader />
        <Empty />
        <Footer />
      </>
    );
  }
  return (
    <>
      <SiteHeader />
      <div className="relative flex flex-col bg-background md:min-h-[calc(100vh-8rem)] min-h-[calc(100vh-4rem)]">
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes
            )}`;
          }}
          className="h-full max-h-[860px] items-stretch"
        >
          <ResizablePanel
            defaultSize={defaultLayout[1]}
            minSize={30}
            className={cn({
              "hidden md:flex": isInDetail,
            })}
          >
            <Tabs defaultValue="all">
              <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <form>
                  <div className="relative gap-4">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search email" className="pl-8" />
                    <AccountSwitcher accounts={accounts} />
                  </div>
                </form>
              </div>
              <TabsContent value="all" className="m-0">
                <MailList items={mails} />
              </TabsContent>
            </Tabs>
          </ResizablePanel>
          <Outlet />
        </ResizablePanelGroup>
      </div>
      <Footer />
    </>
  );
}
