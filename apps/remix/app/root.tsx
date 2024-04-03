import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./app.css";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { LoaderFunctionArgs } from "@remix-run/node";
import { themeSessionResolver } from "./theme.server";
import clsx from "clsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Return the theme from the session storage using the loader
export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}
const queryClient = new QueryClient();

export function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-background font-sans antialiased"
      >
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
