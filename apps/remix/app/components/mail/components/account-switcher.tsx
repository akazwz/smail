import * as React from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { cn } from "~/lib/utils";

import { useNavigation, Form, Link } from "@remix-run/react";
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

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { CreateAccountForm } from "./create-account";

interface AccountSwitcherProps {
  accounts: Account[];
}

export function AccountSwitcher({ accounts }: AccountSwitcherProps) {
  console.log("accounts: ", accounts);
  const [selectedAccount] = React.useState<string>(accounts[0]?.email || "");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2  top-1/2 -translate-y-1/2"
        >
          <Avatar className=" h-6 w-6">
            <AvatarImage alt={"mail.name"} />
            <AvatarFallback>
              {selectedAccount
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
        <div className="space-y-4">
          <div className="grid gap-6">
            {accounts.map((account) => (
              <div
                className="flex items-center justify-between space-x-4"
                key={account.id}
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage alt="Image" />
                    <AvatarFallback>{account.userName}</AvatarFallback>
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
              </div>
            ))}

            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage alt="Image" />
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <CreateAccount></CreateAccount>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface CreateAccountProps {
  className?: string;
}

export function CreateAccount(props: CreateAccountProps) {
  const [open, setOpen] = useState(false);
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
        <CreateAccountForm></CreateAccountForm>
      </DialogContent>
    </Dialog>
  );
}
