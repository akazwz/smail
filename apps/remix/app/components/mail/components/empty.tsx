import { Turnstile } from "@marsidev/react-turnstile";
import { Form, useNavigation } from "@remix-run/react";
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

interface EmptyProps {
  domains: string[];
}
export function Empty(props: EmptyProps) {
  const navigation = useNavigation();
  const { domains } = props;
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 min-h-[calc(100vh-8rem)]">
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
              siteKey={"1x00000000000000000000AA"}
              options={{
                theme: "auto",
              }}
              style={{ width: "100%" }}
            />
            <div className="flex">
              <Input
                placeholder="Enter username"
                name="userName"
                className="border-r-0 rounded-r-none"
              />
              <Select defaultValue={domains[0]} name="domain">
                <SelectTrigger className="w-[180px] border-l-0 rounded-l-none">
                  <SelectValue placeholder="Select a domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {domains.map((domain) => (
                      <SelectItem value={domain} key={domain}>
                        {domain}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={navigation.state != "idle"}>
              Create an email account
            </Button>
          </Form>
        </div>
      </div>
    </main>
  );
}
