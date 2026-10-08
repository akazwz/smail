import type { JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { Show } from "solid-js";

import { Icon, type IconName } from "./Icon.tsx";
import { color, radius, space } from "./tokens.stylex.ts";

const styles = stylex.create({
	root: {
		display: "grid",
		gap: space.xs,
		justifyItems: "center",
		placeContent: "center",
		paddingBlock: space.xxl,
		paddingInline: space.xl,
		color: color.muted,
		textAlign: "center",
		// 一句话折行时两行尽量等长，不留孤字。
		textWrap: "balance",
	},
	icon: {
		display: "grid",
		placeContent: "center",
		width: "3.5rem",
		height: "3.5rem",
		marginBlockEnd: space.sm,
		borderRadius: radius.full,
		backgroundColor: color.surface,
		color: color.muted,
	},
	title: { color: color.text, fontWeight: 600 },
});

// 填满一块还没有内容的区域，并说明接下来会发生什么。
export function EmptyState(props: {
	icon?: IconName;
	title?: string;
	children?: JSX.Element;
}) {
	return (
		<div {...stylex.attrs(styles.root)}>
			<Show when={props.icon}>
				{(name) => (
					<span {...stylex.attrs(styles.icon)}>
						<Icon name={name()} size={24} />
					</span>
				)}
			</Show>
			<Show when={props.title}>
				<span {...stylex.attrs(styles.title)}>{props.title}</span>
			</Show>
			{props.children}
		</div>
	);
}
