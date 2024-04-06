import Footer from "~/components/Footer";
import { Outlet, useLoaderData, useMatches } from "@remix-run/react";
import { type MetaFunction } from "@remix-run/node";
import { Search } from "lucide-react";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";

import { LoaderFunction } from "@remix-run/node";
import { getEmailsByMessageTo } from "database/dao";

import { accountListCookie, currentAccountCookie } from "~/cookies.server";
import { Empty } from "~/components/mail/components/empty";
import { AccountSwitcher } from "~/components/mail/components/account-switcher";
import { Input } from "~/components/ui/input";
import { ResizablePanelGroup, ResizablePanel } from "~/components/ui/resizable";
import { MailList } from "~/components/mail/components/mail-list";

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

export const defaultLayout = [265, 440, 655];

export default function HomeLayout() {
  const loaderData = useLoaderData<typeof loader>();

  const { accounts, mails, currentAccount } = loaderData;

  const matches = useMatches();
  const isInDetail = matches.some((match) => match.id === "routes/_h.$id");

  if (accounts.length === 0 || !currentAccount) {
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
                    <Input
                      placeholder="Search email"
                      className="pl-8"
                      name="q"
                    />
                    <AccountSwitcher
                      accounts={accounts}
                      currentAccount={currentAccount}
                    />
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
