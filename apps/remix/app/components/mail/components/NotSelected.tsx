export function NotSelected() {
  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 min-h-[calc(100vh-8rem)]">
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-xl font-bold tracking-tight text-muted-foreground">
              No mail selected
            </h3>
          </div>
        </div>
      </main>
    </>
  );
}
