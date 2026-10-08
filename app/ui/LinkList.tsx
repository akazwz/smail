import * as stylex from "@stylexjs/stylex";
import { For } from "solid-js";

import { base } from "./base.ts";
import { Icon } from "./Icon.tsx";
import { color, space, text } from "./tokens.stylex.ts";

const styles = stylex.create({
	list: { margin: 0, padding: 0, listStyleType: "none" },
	// 细线只画在条目之间；列表的上下由它所在的区块负责。
	item: {
		borderBlockStartWidth: { default: "1px", ":first-child": 0 },
		borderBlockStartStyle: "solid",
		borderBlockStartColor: color.border,
	},
	link: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		gap: space.lg,
		paddingBlock: space.md,
		color: { default: color.text, ":hover": color.accentText },
		textDecoration: "none",
		transitionDuration: "120ms",
		transitionProperty: "color",
	},
	body: { display: "grid", gap: space.xxs, minWidth: 0 },
	label: {
		fontWeight: 600,
		lineHeight: 1.4,
		wordBreak: "keep-all",
		overflowWrap: "anywhere",
	},
	meta: {
		color: color.subtle,
		fontSize: text.sm,
		fontVariantNumeric: "tabular-nums",
	},
	arrow: { display: "grid", flexShrink: 0, color: color.subtle },
});

type LinkListItem = { href: string; label: string; meta?: string };

// 用细线分隔的一列链接：指南、相关文章这类“去别处看”的入口。
export function LinkList(props: { items: LinkListItem[] }) {
	return (
		<ul {...stylex.attrs(styles.list)}>
			<For each={props.items} keyed={(item) => item.href}>
				{(item) => (
					<li {...stylex.attrs(styles.item)}>
						<a
							href={item().href}
							{...stylex.attrs(styles.link, base.focusRing)}
						>
							<span {...stylex.attrs(styles.body)}>
								{item().meta && (
									<span {...stylex.attrs(styles.meta)}>{item().meta}</span>
								)}
								<span {...stylex.attrs(styles.label)}>{item().label}</span>
							</span>
							<span {...stylex.attrs(styles.arrow)}>
								<Icon name="forward" size={16} />
							</span>
						</a>
					</li>
				)}
			</For>
		</ul>
	);
}
