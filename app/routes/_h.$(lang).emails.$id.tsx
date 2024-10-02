import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import { ArrowLeftIcon, MailOpenIcon } from "lucide-react";
import { d1Wrapper } from "~/.server/db";
import { sessionWrapper } from "~/.server/session";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { getLocaleData } from "~/locales/locale";

export async function loader({ request, context, params }: LoaderFunctionArgs) {
	const id = params.id as string;
	const { getSession } = sessionWrapper(context.cloudflare.env);
	const session = await getSession(request.headers.get("Cookie"));
	const messageTo = session.data.email;
	if (!messageTo) {
		throw new Error("Unauthorized");
	}
	const db = d1Wrapper(context.cloudflare.env.DB);
	const email = await db.query.emails.findFirst({
		where: (emails, { and, eq }) =>
			and(eq(emails.id, id), eq(emails.messageTo, messageTo)),
	});
	if (!email) {
		throw new Error("Email not found");
	}
	const newEmail = {
		...email,
		createdAt: format(email.createdAt, "yyyy/MM/dd HH:mm:ss"),
	};
	const locale = await getLocaleData(params.lang || "en");
	return { locale, email: newEmail };
}

export default function EmailDetail() {
	const { locale, email } = useLoaderData<typeof loader>();
	return (
		<div className="max-w-2xl mx-auto flex flex-col flex-1 w-full min-h-0 px-2">
			<div className="mx-auto bg-primary text-primary-foreground w-full max-w-2xl flex gap-2 items-center rounded-t p-2 px-4 border-muted">
				<MailOpenIcon strokeWidth="1.5px" />
				<span className="font-bold">{locale.email_detail}</span>
				<div className="flex-1" />
				<Link
					prefetch="viewport"
					unstable_viewTransition
					className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
					to="/"
				>
					<ArrowLeftIcon strokeWidth="1.5px" />
				</Link>
			</div>
			<div className="flex-1 flex flex-col min-h-0 border-x px-2 gap-4">
				<div className="line-clamp-2 font-bold">{email.subject}</div>
				<div className="text-sm text-muted-foreground">{email.createdAt}</div>
				<iframe
					title={email.subject || ""}
					srcDoc={email.html || email.text || ""}
					className="w-full h-full"
					sandbox="allow-scripts"
				/>
			</div>
		</div>
	);
}
