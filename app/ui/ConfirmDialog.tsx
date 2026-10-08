import type { JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { createEffect, createUniqueId } from "solid-js";

import { Button } from "./Button.tsx";
import { color, radius, shadow, space, text } from "./tokens.stylex.ts";

const styles = stylex.create({
	// 布局写在里面的元素上：给 dialog 本身设 display 会让它关着也显示。
	dialog: {
		width: "min(26rem, calc(100vw - 2rem))",
		padding: 0,
		borderWidth: 0,
		borderRadius: radius.md,
		backgroundColor: color.raised,
		color: color.text,
		boxShadow: shadow.raised,
		"::backdrop": { backgroundColor: color.scrim },
	},
	body: { display: "grid", gap: space.md, padding: space.xl },
	title: { margin: 0, fontSize: text.lg, fontWeight: 600, lineHeight: 1.4 },
	description: {
		margin: 0,
		color: color.muted,
		lineHeight: 1.6,
		overflowWrap: "anywhere",
	},
	actions: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "flex-end",
		gap: space.sm,
		marginBlockStart: space.sm,
	},
});

// 做一件没法撤销的事之前问一句。标题是问题，`children` 说清后果，两个按钮：取消、确认。
// 取消排在前面，打开时焦点落在它上面——直接按回车不会误触发；按 Esc、点背景也是取消。
// `danger` 把确认按钮标成危险操作。可以撤销的操作不要用它，直接做就行。
export function ConfirmDialog(props: {
	open: boolean;
	title: string;
	confirmLabel: string;
	cancelLabel: string;
	danger?: boolean;
	onConfirm: () => void;
	onCancel: () => void;
	children: JSX.Element;
}) {
	let element: HTMLDialogElement | undefined;
	// 这次按下是否始于背景：从对话框里按下、拖到背景上松开，不算点背景。
	let pressedBackdrop = false;
	const titleId = createUniqueId();
	const descriptionId = createUniqueId();

	createEffect(
		() => props.open,
		(open) => {
			if (!element) return;
			if (open && !element.open) element.showModal();
			else if (!open && element.open) element.close();
		},
	);

	return (
		<dialog
			ref={(node) => {
				element = node;
			}}
			role="alertdialog"
			aria-labelledby={titleId}
			aria-describedby={descriptionId}
			onPointerDown={(event) => {
				pressedBackdrop = event.target === element;
			}}
			onClick={(event) => {
				if (event.target === element && pressedBackdrop) props.onCancel();
				pressedBackdrop = false;
			}}
			onClose={() => {
				// Esc 关闭：浏览器已经关了，只需告诉调用方。
				if (props.open) props.onCancel();
			}}
			{...stylex.attrs(styles.dialog)}
		>
			<div {...stylex.attrs(styles.body)}>
				<h2 id={titleId} {...stylex.attrs(styles.title)}>
					{props.title}
				</h2>
				<p id={descriptionId} {...stylex.attrs(styles.description)}>
					{props.children}
				</p>
				<div {...stylex.attrs(styles.actions)}>
					<Button variant="outline" size="sm" onClick={() => props.onCancel()}>
						{props.cancelLabel}
					</Button>
					<Button
						variant={props.danger ? "danger" : "solid"}
						size="sm"
						onClick={() => props.onConfirm()}
					>
						{props.confirmLabel}
					</Button>
				</div>
			</div>
		</dialog>
	);
}
