import type { JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { omit } from "solid-js";

import { base } from "./base.ts";
import { color, radius } from "./tokens.stylex.ts";

const styles = stylex.create({
	link: {
		borderRadius: radius.xs,
		textDecoration: "none",
		whiteSpace: "nowrap",
	},
	muted: { color: { default: color.muted, ":hover": color.text } },
	subtle: { color: { default: color.subtle, ":hover": color.text } },
	active: { color: { default: color.text, ":hover": color.text } },
});

type Props = Omit<
	JSX.AnchorHTMLAttributes<HTMLAnchorElement>,
	"class" | "style"
> & {
	tone?: "muted" | "subtle";
	// 当前所在的页面：导航里用。
	active?: boolean;
	xstyle?: stylex.StyleXStyles;
};

/** 导航、页脚、返回这类不带下划线的链接。正文里的链接由 Markdown 组件自己处理。 */
export function TextLink(props: Props) {
	const rest = omit(props, "tone", "active", "xstyle");
	return (
		<a
			{...rest}
			aria-current={props.active ? "page" : undefined}
			{...stylex.attrs(
				styles.link,
				styles[props.tone ?? "muted"],
				props.active && styles.active,
				base.focusRing,
				props.xstyle,
			)}
		/>
	);
}
