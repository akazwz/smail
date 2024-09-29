import { Link, Outlet, redirect } from "@remix-run/react";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { buttonVariants } from "~/components/ui/button";
import logoLight from "~/assets/smail_light.webp";
import { GitHubIcon } from "~/icons/github";
import { cn } from "~/lib/utils";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export async function loader({ request, params }: LoaderFunctionArgs) {
	const lang = params.lang;
	if (!lang) {
		const headers = {
			"accept-language": request.headers.get("accept-language") || "",
		};
		const languages = new Negotiator({ headers: headers }).languages();
		const locales = ["en", "zh-CN"];
		const defaultLocale = "en";
		const lang = match(languages, locales, defaultLocale);
		if (lang === "zh-CN") {
			const { pathname } = new URL(request.url);
			return redirect(`/zh-CN${pathname}`);
		}
	}
	return null;
}

export default function HomeLayout() {
	return (
		<div className="h-dvh flex flex-col gap-4">
			<header className="border-b border-muted p-2">
				<div className="flex items-center max-w-4xl mx-auto w-full">
					<Link
						to="/"
						className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
					>
						<img src={logoLight} alt="Logo" className="w-20" />
					</Link>
					<div className="flex-1" />
					<Link
						to="https://github.com/akazwz/smail"
						target="_blank"
						className={cn(
							buttonVariants({
								size: "icon",
								variant: "ghost",
							}),
						)}
					>
						<GitHubIcon className="size-6" />
					</Link>
				</div>
			</header>
			<Outlet />
		</div>
	);
}
