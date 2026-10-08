import type { JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { omit } from "solid-js";

import { base } from "./base.ts";
import { color, radius, space, text } from "./tokens.stylex.ts";

const styles = stylex.create({
	base: {
		display: "inline-flex",
		flexShrink: 0,
		alignItems: "center",
		justifyContent: "center",
		gap: space.sm,
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: "transparent",
		borderRadius: radius.full,
		fontFamily: "inherit",
		fontWeight: 600,
		lineHeight: 1.25,
		textDecoration: "none",
		// 按钮文字不换行：挤的时候让旁边的文字让位。
		whiteSpace: "nowrap",
		cursor: { default: "pointer", ":disabled": "default" },
		opacity: { default: 1, ":disabled": 0.45 },
		transitionDuration: "120ms",
		transitionProperty: "background-color, border-color, color, opacity",
	},
	md: {
		minHeight: "2.75rem",
		paddingBlock: 0,
		paddingInline: space.xl,
		fontSize: text.md,
	},
	sm: {
		minHeight: "2rem",
		paddingBlock: 0,
		paddingInline: space.md,
		fontSize: text.sm,
	},
	// 只放一个图标的圆形按钮。必须给 aria-label。
	iconMd: { width: "2.75rem", height: "2.75rem", paddingInline: 0 },
	iconSm: { width: "2rem", height: "2rem", paddingInline: 0 },
	// 墨色实心：一屏只放一个。
	// 悬停只是略微变淡：换成灰色会像被禁用。后写的 opacity 会整体替换 base 里的，
	// 所以禁用态要在这里重复一遍。
	solid: {
		backgroundColor: color.text,
		color: color.bg,
		opacity: { default: 1, ":hover": 0.86, ":disabled": 0.45 },
	},
	// 没法撤销的操作，只用在确认框里。
	danger: {
		backgroundColor: color.danger,
		color: color.onDanger,
		opacity: { default: 1, ":hover": 0.88, ":disabled": 0.45 },
	},
	outline: {
		borderColor: { default: color.borderStrong, ":hover": color.text },
		backgroundColor: "transparent",
		color: color.text,
	},
	quiet: {
		backgroundColor: { default: "transparent", ":hover": color.surface },
		color: { default: color.muted, ":hover": color.text },
	},
});

type Variant = "solid" | "danger" | "outline" | "quiet";
type Size = "md" | "sm";

type Own = {
	// 强调程度：solid 是主操作，outline 是次要操作，quiet 是最不重要的；danger 是没法撤销的操作。
	variant?: Variant;
	size?: Size;
	// 只有图标：圆形、没有文字内边距。
	icon?: boolean;
	// 调用处传入的布局样式（位置、尺寸、外边距），优先级高于变体。
	xstyle?: stylex.StyleXStyles;
};

function shape(props: Own) {
	const size = props.size ?? "md";
	if (!props.icon) return styles[size];
	return size === "md" ? styles.iconMd : styles.iconSm;
}

type ButtonProps = Omit<
	JSX.ButtonHTMLAttributes<HTMLButtonElement>,
	"class" | "style"
> &
	Own;

// 按钮。文字前后可以放一个 <Icon>；只有图标时加 `icon` 并给 aria-label。
export function Button(props: ButtonProps) {
	const rest = omit(props, "variant", "size", "icon", "xstyle");
	return (
		<button
			type="button"
			{...rest}
			{...stylex.attrs(
				styles.base,
				base.focusRing,
				shape(props),
				styles[props.variant ?? "solid"],
				props.xstyle,
			)}
		/>
	);
}

type ButtonLinkProps = Omit<
	JSX.AnchorHTMLAttributes<HTMLAnchorElement>,
	"class" | "style"
> &
	Own;

// 外观是按钮、行为是链接：去往另一个页面的主要入口。
export function ButtonLink(props: ButtonLinkProps) {
	const rest = omit(props, "variant", "size", "icon", "xstyle");
	return (
		<a
			{...rest}
			{...stylex.attrs(
				styles.base,
				base.focusRing,
				shape(props),
				styles[props.variant ?? "outline"],
				props.xstyle,
			)}
		/>
	);
}
