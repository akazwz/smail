import { Link } from "@remix-run/react";
import { GithubIcon } from "icons";

export default function Header() {
  return (
    <div className="p-1 flex items-center">
      <Link to="/" className="font-semibold text-lg">
        Smail
      </Link>
      <a
        href="https://github.com/akazwz/smail"
        rel="noreferrer"
        target="_blank"
        className="ml-auto"
      >
        <GithubIcon className="size-8" />
      </a>
    </div>
  );
}
