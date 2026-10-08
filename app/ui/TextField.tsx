import * as stylex from "@stylexjs/stylex";
import { createUniqueId, Show } from "solid-js";

import { color, radius, space, text } from "./tokens.stylex.ts";

const styles = stylex.create({
	field: { display: "grid", gap: space.xs },
	label: { color: color.text, fontSize: text.sm, fontWeight: 600 },
	control: {
		width: "100%",
		paddingBlock: space.sm,
		paddingInline: space.md,
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: {
			default: color.borderStrong,
			":focus-visible": color.accent,
		},
		borderRadius: radius.sm,
		backgroundColor: color.raised,
		color: color.text,
		fontFamily: "inherit",
		// 不小于 16px：再小的话 iPhone 聚焦输入框时会自动放大整个页面。
		fontSize: "1rem",
		lineHeight: 1.5,
		outlineColor: color.accent,
		outlineOffset: "1px",
		outlineStyle: { default: "none", ":focus-visible": "solid" },
		outlineWidth: "2px",
		"::placeholder": { color: color.subtle },
	},
	multiline: { minHeight: "9rem", resize: "vertical" },
	hint: { margin: 0, color: color.subtle, fontSize: text.sm, lineHeight: 1.5 },
});

// 带标签的输入框。`multiline` 是多行文本框。标签始终显示：占位文字一输入就没了，不能代替标签。
// 需要一直看得见、可能比较长的说明用 `hint`（显示在输入框下面，会换行）；占位文字放不下时会被截断。
export function TextField(props: {
	label: string;
	value: string;
	onInput: (value: string) => void;
	multiline?: boolean;
	placeholder?: string;
	hint?: string;
	maxLength?: number;
	required?: boolean;
	// 传给浏览器的自动填充提示，例如 "email"、"off"。
	autocomplete?: string;
	// 手机上弹哪种键盘，例如 "email"。
	inputmode?: "text" | "email";
}) {
	const id = createUniqueId();
	const hintId = () => (props.hint ? `${id}-hint` : undefined);
	return (
		<div {...stylex.attrs(styles.field)}>
			<label for={id} {...stylex.attrs(styles.label)}>
				{props.label}
			</label>
			<Show
				when={props.multiline}
				fallback={
					<input
						id={id}
						type="text"
						value={props.value}
						placeholder={props.placeholder}
						maxlength={props.maxLength}
						required={props.required}
						autocomplete={props.autocomplete}
						inputmode={props.inputmode}
						aria-describedby={hintId()}
						onInput={(event) => props.onInput(event.currentTarget.value)}
						{...stylex.attrs(styles.control)}
					/>
				}
			>
				<textarea
					id={id}
					value={props.value}
					placeholder={props.placeholder}
					maxlength={props.maxLength}
					required={props.required}
					aria-describedby={hintId()}
					onInput={(event) => props.onInput(event.currentTarget.value)}
					{...stylex.attrs(styles.control, styles.multiline)}
				/>
			</Show>
			<Show when={props.hint}>
				<p id={hintId()} {...stylex.attrs(styles.hint)}>
					{props.hint}
				</p>
			</Show>
		</div>
	);
}
