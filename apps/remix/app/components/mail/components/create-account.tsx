import { Turnstile } from "@marsidev/react-turnstile";

import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
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
import { loader } from "~/routes/_h";

export function CreateAccountForm() {
  const navigation = useNavigation();
  const loaderData = useLoaderData<typeof loader>();
  const { domains, TURNSTILE_KEY, TURNSTILE_ENABLED } = loaderData;
  const data = useActionData();
  console.log("data: ", data);

  return (
    <Form
      method="POST"
      className="flex flex-col gap-2 text-center w-full"
      action="/?index"
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
        <Select defaultValue={domains[0]} name="domain">
          <SelectTrigger className="w-[180px] border-l-0 rounded-l-none">
            <SelectValue placeholder="Select a domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {domains.map((domain: string) => (
                <SelectItem value={domain} key={domain}>
                  {domain}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={navigation.state === "submitting"}>
        Create an email account
      </Button>
    </Form>
  );
}
