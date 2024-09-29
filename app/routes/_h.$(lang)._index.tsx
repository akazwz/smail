import { Turnstile } from "@marsidev/react-turnstile";
import type {
	ActionFunctionArgs,
	LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import {
	Form,
	type MetaFunction,
	NavLink,
	redirect,
	useLoaderData,
	useNavigation,
	useRevalidator,
} from "@remix-run/react";
import { formatDistanceToNow } from "date-fns";
import { zhCN, enUS } from "date-fns/locale";
import randomName from "@scaleway/random-name";
import {
	CircleDollarSignIcon,
	CodeIcon,
	InboxIcon,
	LoaderIcon,
	MailIcon,
	RefreshCcw,
	ShieldIcon,
	SwatchBookIcon,
	Trash2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { d1Wrapper } from "~/.server/db";
import { sessionWrapper } from "~/.server/session";
import { CopyButton } from "~/components/copy-button";
import { Button, buttonVariants } from "~/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/lib/utils";
import { getLocaleData } from "~/locales/locale";
import { customAlphabet } from "nanoid";

export const meta: MetaFunction<typeof loader> = ({ data }) => [
	{ rel: "preconnect", href: "https://challenges.cloudflare.com" },
	{ title: data?.locale.title },
	{
		name: "description",
		content: data?.locale.description,
	},
];

export async function loader({ request, params, context }: LoaderFunctionArgs) {
	const { getSession } = sessionWrapper(context.cloudflare.env);
	const session = await getSession(request.headers.get("Cookie"));
	const db = d1Wrapper(context.cloudflare.env.DB);
	const lang = params.lang || "en";
	const locale = await getLocaleData(lang);
	const email = session.data.email;
	if (!email) {
		return {
			lang,
			locale,
			email: null,
			emails: [],
		};
	}
	const emails = await db.query.emails.findMany({
		columns: {
			id: true,
			subject: true,
			createdAt: true,
		},
		where: (emails, { eq }) => eq(emails.messageTo, email),
	});
	const newEails = emails.map((email) => ({
		...email,
		// do this in server, to avoid server and client difference(ssr hydration)
		createdAt: formatDistanceToNow(email.createdAt, {
			addSuffix: true,
			locale: lang === "en" ? enUS : zhCN,
		}),
	}));
	return {
		lang,
		locale: locale,
		email,
		emails: newEails,
	};
}

export async function action({ request, context }: ActionFunctionArgs) {
	const { getSession, commitSession } = sessionWrapper(context.cloudflare.env);
	const session = await getSession(request.headers.get("Cookie"));
	const { pathname } = new URL(request.url);
	const name = `${randomName("", ".")}.${customAlphabet("0123456789", 4)()}`;
	const email = `${name}@${context.cloudflare.env.DOMAIN || "smail.pw"}`;
	switch (request.method) {
		case "POST": {
			if (session.data.email) {
				return null;
			}
			session.set("email", email);
			return redirect(pathname, {
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			});
		}
		case "DELETE": {
			if (!session.data.email) {
				return null;
			}
			session.unset("email");
			return redirect(pathname, {
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			});
		}
	}
	return null;
}

const featureIcons = [
	<CodeIcon className="text-blue-500" />,
	<CircleDollarSignIcon className="text-blue-500" />,
	<SwatchBookIcon className="text-blue-500" />,
	<ShieldIcon className="text-blue-500" />,
];

export default function Index() {
	const { lang, locale, email, emails } = useLoaderData<typeof loader>();
	const navigation = useNavigation();

	const [token, setToken] = useState("");

	const revalidator = useRevalidator();

	useEffect(() => {
		const interval = setInterval(() => {
			revalidator.revalidate();
		}, 10_000);
		return () => clearInterval(interval);
	}, [revalidator]);

	return (
		<div className="max-w-2xl mx-auto flex flex-col items-center flex-1 w-full min-h-0 px-2 gap-4">
			<div className="max-w-xl w-full mx-auto px-2">
				{email ? (
					<Card>
						<CardHeader className="py-4">
							<CardTitle>{email}</CardTitle>
							<CardDescription>{locale.card_description}</CardDescription>
						</CardHeader>
						<CardFooter className="gap-4 px-4 pb-4">
							<CopyButton content={email} />
							<Form method="DELETE">
								<Button
									variant="secondary"
									type="submit"
									disabled={navigation.formMethod === "DELETE"}
								>
									<Trash2Icon
										strokeWidth="1.5px"
										className="text-destructive"
									/>
								</Button>
							</Form>
						</CardFooter>
					</Card>
				) : (
					<Form method="POST" className="flex flex-col gap-4">
						<Turnstile
							siteKey="1x00000000000000000000AA"
							options={{
								theme: "light",
								refreshExpired: "auto",
								language: lang,
							}}
							onSuccess={setToken}
							className="h-[65px] w-[300px] items-center bg-secondary"
						/>
						<Button
							disabled={navigation.state === "submitting" || token === ""}
						>
							{navigation.state === "submitting" ? (
								<LoaderIcon className="animate-spin" />
							) : (
								locale?.button
							)}
						</Button>
					</Form>
				)}
			</div>
			{email ? (
				<div className="flex flex-col flex-1 w-full min-h-0 px-2">
					<div className="mx-auto bg-primary text-primary-foreground w-full max-w-2xl flex gap-2 items-center rounded-t p-2 px-4 border-muted">
						<MailIcon strokeWidth="1.5px" />
						<span className="font-bold">{locale.email_list}</span>
						<div className="flex-1" />
						<Button
							size="sm"
							variant="secondary"
							onClick={revalidator.revalidate}
						>
							<RefreshCcw
								strokeWidth="1.5px"
								className={cn({
									"animate-spin": revalidator.state === "loading",
								})}
							/>
						</Button>
					</div>
					<div className="flex-1 flex flex-col min-h-0">
						<ScrollArea className="flex-1 border-x">
							{emails.length === 0 && (
								<div className="flex flex-col w-full items-center py-12">
									<InboxIcon
										strokeWidth="1px"
										className="size-20 text-muted-foreground"
									/>
									<div className="text-center text-muted-foreground text-sm">
										{locale.email_empty}
									</div>
								</div>
							)}
							{emails.map((email) => (
								<NavLink
									prefetch="viewport"
									unstable_viewTransition
									to={`/emails/${email.id}`}
									key={email.id}
									className={cn(
										buttonVariants({
											variant: "ghost",
										}),
										"w-full rounded-none border-b",
									)}
								>
									<span className="truncate max-w-xs md:max-w-md text-sm">
										{email.subject}
									</span>
									<div className="flex-1" />
									<span className="text-xs text-muted-foreground shrink-0">
										{email.createdAt}
									</span>
								</NavLink>
							))}
						</ScrollArea>
					</div>
				</div>
			) : (
				<div className="flex flex-col flex-1 max-w-md w-full min-h-0 p-2 pt-8 gap-2">
					{locale?.features.map((feature, idx) => (
						<div key={`feature-${idx}`} className="flex gap-4 p-2">
							{featureIcons[idx]}
							<div className="flex flex-1 flex-col gap-4">
								<span className="font-bold">{feature.title}</span>
								<span className="text-sm text-muted-foreground">
									{feature.description}
								</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
