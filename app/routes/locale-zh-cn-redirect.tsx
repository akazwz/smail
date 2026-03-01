import { redirect } from "react-router";
import type { Route } from "./+types/locale-zh-cn-redirect";

function toZhPath(splat: string | undefined): string {
	if (!splat || splat === "/") {
		return "/zh";
	}
	const normalized = splat.startsWith("/") ? splat : `/${splat}`;
	return `/zh${normalized}`;
}

export async function loader({ request, params }: Route.LoaderArgs) {
	const url = new URL(request.url);
	const pathname = toZhPath(params["*"]);
	throw redirect(`${pathname}${url.search}`, 301);
}

export default function LocaleZhCnRedirect() {
	return null;
}
