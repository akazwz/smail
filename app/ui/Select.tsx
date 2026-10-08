import * as stylex from "@stylexjs/stylex";
import { For } from "solid-js";

import { base } from "./base.ts";
import { Icon, type IconName } from "./Icon.tsx";
import { color, radius, space } from "./tokens.stylex.ts";

const styles = stylex.create({
	root: {
		position: "relative",
		display: "inline-flex",
		alignItems: "center",
		color: { default: color.muted, ":hover": color.text },
	},
	// 图标叠在选择框里面的左侧，自己不接收点击：点图标就是点选择框，焦点环也把它一起圈住。
	icon: {
		position: "absolute",
		insetInlineStart: space.xs,
		display: "grid",
		pointerEvents: "none",
	},
	select: {
		paddingBlock: space.xs,
		paddingInline: space.xxs,
		borderWidth: 0,
		borderRadius: radius.xs,
		backgroundColor: "transparent",
		color: "inherit",
		fontFamily: "inherit",
		fontSize: "inherit",
		// 宽度跟着当前选项走，不按最长的选项撑开。
		fieldSizing: "content",
		cursor: "pointer",
	},
	// 给图标让出位置：图标 1rem，加上它两边的空隙。
	withIcon: { paddingInlineStart: "1.625rem" },
});

// 原生下拉选择框，前面可带一个图标。键盘、读屏、手机上的选择面板都由浏览器负责。
// `label` 是它的可访问名称，不显示。
export function Select<T extends string>(props: {
	label: string;
	value: T;
	options: readonly { value: T; label: string }[];
	onChange: (value: T) => void;
	icon?: IconName;
}) {
	return (
		<span {...stylex.attrs(styles.root)}>
			{props.icon && (
				<span {...stylex.attrs(styles.icon)}>
					<Icon name={props.icon} size={16} />
				</span>
			)}
			<select
				aria-label={props.label}
				onChange={(event) => props.onChange(event.currentTarget.value as T)}
				{...stylex.attrs(
					styles.select,
					props.icon !== undefined && styles.withIcon,
					base.focusRing,
				)}
			>
				<For each={props.options} keyed={(option) => option.value}>
					{(option) => (
						<option
							value={option().value}
							selected={option().value === props.value}
						>
							{option().label}
						</option>
					)}
				</For>
			</select>
		</span>
	);
}
