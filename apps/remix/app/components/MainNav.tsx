import { Link } from "@remix-run/react";
import { cn } from "~/lib/utils";

export function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
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
  );
}
