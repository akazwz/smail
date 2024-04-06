import { cn } from "~/lib/utils";

import { Button } from "~/components/ui/button";
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

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { CreateAccountForm } from "./create-account";
import { useActionData, useFetcher } from "@remix-run/react";
import { PlusCircle } from "lucide-react";

interface AccountSwitcherProps {
  accounts: Account[];
  currentAccount: string;
}

export function AccountSwitcher({
  accounts,
  currentAccount,
}: AccountSwitcherProps) {
  const fetch = useFetcher();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2  top-1/2 -translate-y-1/2 "
        >
          <Avatar className=" h-6 w-6">
            <AvatarImage alt={"mail.name"} />
            <AvatarFallback>
              {currentAccount
                .split(" ")
                .map((chunk) => chunk[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[355px]">
        <DialogHeader>
          <DialogTitle className="text-center">Smail</DialogTitle>
        </DialogHeader>
        <fetch.Form action="/?index" method="patch">
          <div className="space-y-4">
            <div className="grid gap-6">
              {accounts.map((account) => (
                <button
                  className="flex items-center justify-between space-x-4 "
                  key={account.id}
                >
                  <input type="text" hidden name="currentAccount" />
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage alt="Image" />
                      <AvatarFallback>
                        {account.userName
                          .split(" ")
                          .map((chunk) => chunk[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {account.userName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {account.email}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">123</p>
                </button>
              ))}

              <div className="flex items-center justify-between space-x-4">
                <CreateAccount />
              </div>
            </div>
          </div>
        </fetch.Form>
      </DialogContent>
    </Dialog>
  );
}

interface CreateAccountProps {
  className?: string;
}

export function CreateAccount(props: CreateAccountProps) {
  const [open, setOpen] = useState(false);
  useActionData();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "w-full text-sm font-medium leading-none",
            props.className
          )}
          onClick={() => {
            setOpen(true);
          }}
        >
          Create another account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new email</DialogTitle>
          <DialogDescription>
            Enter username to create an email
          </DialogDescription>
        </DialogHeader>
        <CreateAccountForm />
      </DialogContent>
    </Dialog>
  );
}
