import * as stylex from "@stylexjs/stylex";
import { createSignal, Show } from "solid-js";

import { sendMessage } from "#/api.ts";
import { useDictionary } from "#/i18n/dictionary.ts";
import { base } from "#/ui/base.ts";
import { Button } from "#/ui/Button.tsx";
import { Card } from "#/ui/Card.tsx";
import { Icon } from "#/ui/Icon.tsx";
import { TextField } from "#/ui/TextField.tsx";
import { color, space, text } from "#/ui/tokens.stylex.ts";
import { useLocale } from "#/utils/locale.ts";
import { CONTACT_MAX_LENGTH, MESSAGE_MAX_LENGTH } from "#contract";

const styles = stylex.create({
	form: { display: "grid", gap: space.lg },
	title: { margin: 0, fontSize: text.lg, fontWeight: 600, lineHeight: 1.4 },
	footer: {
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
		gap: space.md,
	},
	status: { margin: 0, color: color.muted, fontSize: text.sm, lineHeight: 1.5 },
	sent: { color: color.live },
});

type Status = "idle" | "sending" | "sent" | "too_many" | "failed";

// 联系页的留言表单：一段留言，外加一个选填的联系方式。留言存在数据库里，站长定期查看。
export function MessageForm() {
	const locale = useLocale();
	const { contact: copy } = useDictionary();
	const [message, setMessage] = createSignal("");
	const [contact, setContact] = createSignal("");
	// 陷阱字段：页面上看不见，人不会填；自动填表的机器人填了，Worker 就把这条留言丢掉。
	const [extra, setExtra] = createSignal("");
	const [status, setStatus] = createSignal<Status>("idle");

	const feedback = () => {
		switch (status()) {
			case "sent":
				return copy.sent;
			case "too_many":
				return copy.tooMany;
			case "failed":
				return copy.failed;
			default:
				return "";
		}
	};

	const submit = async (event: SubmitEvent) => {
		event.preventDefault();
		if (status() === "sending" || message().trim() === "") {
			return;
		}
		setStatus("sending");
		try {
			const outcome = await sendMessage({
				message: message(),
				contact: contact(),
				locale: locale(),
				extra: extra(),
			});
			if (outcome === "sent") {
				setMessage("");
				setContact("");
			}
			setStatus(outcome);
		} catch {
			setStatus("failed");
		}
	};

	return (
		<Card>
			<form onSubmit={submit} {...stylex.attrs(styles.form)}>
				<h2 {...stylex.attrs(styles.title)}>{copy.formTitle}</h2>
				<TextField
					multiline
					required
					label={copy.messageLabel}
					placeholder={copy.messagePlaceholder}
					maxLength={MESSAGE_MAX_LENGTH}
					value={message()}
					onInput={setMessage}
				/>
				<TextField
					label={copy.contactLabel}
					hint={copy.contactHint}
					maxLength={CONTACT_MAX_LENGTH}
					autocomplete="email"
					inputmode="email"
					value={contact()}
					onInput={setContact}
				/>
				<div aria-hidden="true" {...stylex.attrs(base.visuallyHidden)}>
					<label>
						Extra
						<input
							type="text"
							name="extra"
							tabindex="-1"
							autocomplete="off"
							value={extra()}
							onInput={(event) => setExtra(event.currentTarget.value)}
						/>
					</label>
				</div>
				<div {...stylex.attrs(styles.footer)}>
					<Button
						type="submit"
						disabled={status() === "sending" || message().trim() === ""}
					>
						<Show
							when={status() === "sent"}
							fallback={<Icon name="mail" size={16} />}
						>
							<Icon name="check" size={16} />
						</Show>
						{status() === "sending" ? copy.sending : copy.send}
					</Button>
					<p
						role="status"
						{...stylex.attrs(styles.status, status() === "sent" && styles.sent)}
					>
						{feedback()}
					</p>
				</div>
			</form>
		</Card>
	);
}
