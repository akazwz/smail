import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <div className="flex items-center justify-center text-sm font-zinc-700">
      Made with ❤️ by
      <Link
        to="https://github.com/akazwz"
        className="m-1 underline"
        target="_blank"
        rel="noreferrer"
      >
        akazwz
      </Link>
      Inspired by{" "}
      <Link
        to="https://email.ml"
        className="m-1 underline"
        target="_blank"
        rel="noreferrer"
      >
        Email.ML
      </Link>
    </div>
  );
}
