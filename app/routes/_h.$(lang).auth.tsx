import type {
	ActionFunctionArgs,
	LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import {
	Form,
	redirect,
	useActionData,
	useLoaderData,
	useNavigation,
} from "@remix-run/react";
import { LockKeyholeIcon } from "lucide-react";
import { sessionWrapper } from "~/.server/session";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { getLocaleData } from "~/locales/locale";

export async function loader({ params }: LoaderFunctionArgs) {
	const lang = params.lang || "en";
	const locale = await getLocaleData(lang);
	return {
		locale,
	};
}

export async function action({ request, context }: ActionFunctionArgs) {
	const password = (await request.formData()).get("password") as string;
	if (password === context.cloudflare.env.PASSWORD) {
		const { getSession, commitSession } = sessionWrapper(
			context.cloudflare.env,
		);
		const session = await getSession(request.headers.get("Cookie"));
		session.set("password", password);
		return redirect("/", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	}
	return {
		error: true,
	};
}

export default function Auth() {
	const { locale } = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();

	const navigation = useNavigation();

	return (
		<div className="p-2">
			<Form
				method="POST"
				className="flex flex-col w-full max-w-md mx-auto gap-4"
			>
				<LockKeyholeIcon strokeWidth="1.5px" className="size-8" />
				<div className="flex flex-col gap-2">
					<Label htmlFor="password">{locale.auth.title}</Label>
					<Input id="password" name="password" type="password" required />
					{actionData?.error && (
						<div className="text-destructive text-xs">{locale.auth.msg}</div>
					)}
				</div>
				<Button disabled={navigation.state === "submitting"}>
					{locale.auth.submit}
				</Button>
			</Form>
		</div>
	);
}
