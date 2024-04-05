import * as React from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { cn } from "~/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useNavigation, Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Account } from "../data";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";

interface AccountSwitcherProps {
  isCollapsed: boolean;
  accounts: Account[];
}

export function AccountSwitcher({
  isCollapsed,
  accounts,
}: AccountSwitcherProps) {
  const [selectedAccount, setSelectedAccount] = React.useState<string>(
    accounts[0]?.email || ""
  );

  return (
    <Select value={selectedAccount} onValueChange={setSelectedAccount}>
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
          isCollapsed &&
            "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
        )}
        aria-label="Select account"
      >
        <SelectValue placeholder="Select an email account">
          <span className={cn("ml-2", isCollapsed && "hidden")}>
            {
              accounts.find((account) => account.email === selectedAccount)
                ?.email
            }
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {accounts.map((account) => (
          <SelectItem key={account.id} value={account.email}>
            <div
              className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground"
              key={account.id}
            >
              {account.email}
            </div>
          </SelectItem>
        ))}
        <Separator className="my-2" />
        <CreateAccount />
      </SelectContent>
    </Select>
  );
}

interface CreateAccountProps {
  className?: string;
}

export function CreateAccount(props: CreateAccountProps) {
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn("w-full", props.className)}
          onClick={() => {
            setOpen(true);
          }}
        >
          Create an email account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new email</DialogTitle>
          <DialogDescription>
            Enter username to create an email
          </DialogDescription>
        </DialogHeader>
        <Form method="POST" className="flex flex-col gap-2 text-center">
          <Turnstile
            className="w-full flex justify-center"
            siteKey={"1x00000000000000000000AA"}
            options={{
              theme: "auto",
            }}
            style={{ width: "100%" }}
          />
          <Input placeholder="Enter email's username" name="userName" />
          <Button
            type="submit"
            disabled={navigation.state != "idle"}
            onClick={() => {
              setOpen(false);
            }}
          >
            Create an email account
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
