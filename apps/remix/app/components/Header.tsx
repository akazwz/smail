import { Link } from "@remix-run/react";
import { cn } from "~/lib/utils";
import { buttonVariants } from "./ui/button";
import { Icons } from "~/components/icons";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <img src="/logo.png" alt="Smail" className="h-8 w-8" />
          </Link>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            <Link
              to="/docs"
              className={cn("transition-colors hover:text-foreground/80")}
            >
              Docs
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* <CommandMenu /> */}
          </div>
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
    </div>
  );
}
