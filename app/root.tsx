import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";

import "./tailwind.css";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="light">
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
