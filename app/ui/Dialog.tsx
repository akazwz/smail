import type { JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { createEffect, createUniqueId } from "solid-js";

import { Button } from "./Button.tsx";
import { Icon } from "./Icon.tsx";
import { color, radius, shadow, space, text } from "./tokens.stylex.ts";

const styles = stylex.create({
	// 布局写在里面的元素上：给 dialog 本身设 display 会让它关着也显示。
	dialog: {
		width: "min(46rem, calc(100vw - 2rem))",
		maxHeight: "calc(100dvh - 2rem)",
		padding: 0,
		borderWidth: 0,
		borderRadius: radius.md,
		backgroundColor: color.raised,
		color: color.text,
		boxShadow: shadow.raised,
		"::backdrop": { backgroundColor: color.scrim },
	},
	body: {
		display: "grid",
		gridTemplateRows: "auto minmax(0, 1fr)",
		maxHeight: "calc(100dvh - 2rem)",
	},
	header: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		gap: space.md,
		paddingBlock: space.lg,
		paddingInline: space.xl,
		borderBlockEndWidth: "1px",
		borderBlockEndStyle: "solid",
		borderBlockEndColor: color.border,
	},
	title: {
		margin: 0,
		minWidth: 0,
		fontSize: text.lg,
		fontWeight: 600,
		lineHeight: 1.4,
		overflowWrap: "anywhere",
	},
	content: {
		display: "grid",
		gap: space.lg,
		padding: space.xl,
		overflowY: "auto",
	},
});

// 基于原生 <dialog> 的模态框：焦点锁定、背景不可操作、关闭后恢复焦点都由浏览器负责。
// 点背景、按 Esc、点右上角都会关闭；用来看一份内容，不用来做必须回答的确认。
export function Dialog(props: {
	open: boolean;
	title: string;
	closeLabel: string;
	onClose: () => void;
	children: JSX.Element;
}) {
	let element: HTMLDialogElement | undefined;
	// 这次按下是否始于背景。从对话框里开始拖选文字、在背景上松开，也会触发 dialog 的 click。
	let pressedBackdrop = false;
	const titleId = createUniqueId();

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
			aria-labelledby={titleId}
			onPointerDown={(event) => {
				pressedBackdrop = event.target === element;
			}}
			onClick={(event) => {
				// 对话框的盒子被 body 填满，落在 dialog 元素本身上的点击就是点在背景上。
				if (event.target === element && pressedBackdrop) props.onClose();
				pressedBackdrop = false;
			}}
			onClose={() => {
				// Esc 关闭：浏览器已经关了，只需告诉调用方。
				if (props.open) props.onClose();
			}}
			{...stylex.attrs(styles.dialog)}
		>
			<div {...stylex.attrs(styles.body)}>
				<div {...stylex.attrs(styles.header)}>
					<h2 id={titleId} {...stylex.attrs(styles.title)}>
						{props.title}
					</h2>
					<Button
						variant="quiet"
						size="sm"
						icon
						aria-label={props.closeLabel}
						onClick={() => props.onClose()}
					>
						<Icon name="close" size={16} />
					</Button>
				</div>
				<div {...stylex.attrs(styles.content)}>{props.children}</div>
			</div>
		</dialog>
	);
}
