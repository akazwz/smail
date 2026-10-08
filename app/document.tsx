import { getRequestEvent, HydrationScript, isServer } from "@solidjs/web";
import type { ParentProps } from "solid-js";
import { Show } from "solid-js";

import { getLocaleDirection, getLocaleFromPathname } from "#/i18n/config.ts";
import { INBOX_MARKER_COOKIE } from "#contract";

// 首帧之前运行：页面是给所有人的同一份静态文件，已有地址的访客靠它提前换成“加载中”的样子。
const BEFORE_PAINT = `(function(){if(/(?:^|; )${INBOX_MARKER_COOKIE}=1(?:;|$)/.test(document.cookie))document.documentElement.dataset.inbox="1"})()`;

export default function Document(props: ParentProps) {
	// 首屏语言由 URL 决定；之后的站内跳转由 layout 更新 <html> 上的属性。
	const locale = getLocaleFromPathname(
		isServer
			? new URL(getRequestEvent()!.request.url).pathname
			: location.pathname,
	);

	return (
		<html lang={locale} dir={getLocaleDirection(locale)}>
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" sizes="48x48" />
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				{/* 没有 index.html，StyleX 插件注入不了开发样式表，这里自己接。 */}
				<Show when={import.meta.env.DEV}>
					<link rel="stylesheet" href="/virtual:stylex.css" />
					<script type="module" src="/@id/virtual:stylex:runtime" />
				</Show>
				<script innerHTML={BEFORE_PAINT} />
				<HydrationScript />
			</head>
			<body>{props.children}</body>
		</html>
	);
}
