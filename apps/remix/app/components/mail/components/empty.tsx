import { CreateAccountForm } from "./create-account";

export function Empty() {
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
          <CreateAccountForm />
        </div>
      </div>
    </main>
  );
}
