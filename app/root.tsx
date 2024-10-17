import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from "@remix-run/react";
import "~/tailwind.css";

export async function loader({params}:LoaderFunctionArgs) {
	return {
		lang: params.lang || "en"
	}
}

export function Layout({ children }: { children: React.ReactNode }) {
	const { lang } = useLoaderData<typeof loader>();

	return (
		<html lang={lang} className="light">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
				<script
					defer
					src="https://u.pexni.com/script.js"
					data-website-id="09979220-99e5-4973-b1b2-5e46163fe2d2"
				/>
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
