import { Link } from "@remix-run/react";
import { buttonVariants } from "./ui/button";
import { cn } from "~/lib/utils";
import { Icons } from "./icons";
import { ModeToggle } from "./ModeToggle";
import { MainNav } from "./MainNav";

export function SiteHeader() {
  return (
    <header className="hidden md:flex sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="hidden md:flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <Link
              to={"https://github.com/akazwz/smail"}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
