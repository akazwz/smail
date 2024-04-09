export function NoEmail() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 min-h-[calc(100vh-8rem)]">
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <p className=" font-bold tracking-tight">
            Haven&apos;t received any email yet
          </p>
        </div>
      </div>
    </main>
  );
}
