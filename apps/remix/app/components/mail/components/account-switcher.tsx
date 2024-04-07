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
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { CreateAccountForm } from "./create-account";
import {
  Form,
  useActionData,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";

interface AccountSwitcherProps {
  accounts: Account[];
  currentAccount: string;
}

export function AccountSwitcher({
  accounts,
  currentAccount,
}: AccountSwitcherProps) {
  const loaderData = useLoaderData();
  const submit = useSubmit();
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
        <Form
          action="current-account"
          method="POST"
          onChange={(event) => {
            console.log("event: ", event.currentTarget);
            submit(event.currentTarget);
          }}
        >
          <div className="space-y-4">
            <div className="grid gap-6">
              <RadioGroup
                defaultValue={loaderData.currentAccount!}
                name="email"
              >
                {accounts.map((account) => (
                  <div className="" key={account.id}>
                    <RadioGroupItem
                      value={account.email}
                      id={account.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={account.id}
                      className="flex items-center justify-between space-x-4 p-4 rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
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
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <div className="flex items-center justify-between space-x-4">
                <CreateAccount />
              </div>
            </div>
          </div>
        </Form>
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
