import * as stylex from "@stylexjs/stylex";
import { For } from "solid-js";

import { type Locale, toIntlLocale } from "#/i18n/config.ts";
import { Avatar } from "#/ui/Avatar.tsx";
import { Skeleton } from "#/ui/Skeleton.tsx";
import { color, space, text } from "#/ui/tokens.stylex.ts";
import type { Email } from "#contract";

const styles = stylex.create({
	list: { alignSelf: "start", margin: 0, padding: 0, listStyleType: "none" },
	item: {
		borderBlockStartWidth: { default: "1px", ":first-child": 0 },
		borderBlockStartStyle: "solid",
		borderBlockStartColor: color.border,
	},
	email: {
		display: "grid",
		gridTemplateColumns: "auto minmax(0, 1fr)",
		alignItems: "center",
		gap: space.md,
		width: "100%",
		paddingBlock: space.md,
		paddingInline: { default: space.xl, "@media (max-width: 640px)": space.lg },
		borderWidth: 0,
		backgroundColor: { default: "transparent", ":hover": color.surface },
		color: color.text,
		fontFamily: "inherit",
		fontSize: "inherit",
		// 写明行高：按钮默认不继承行高，占位行（不是按钮）要和它一样高。
		lineHeight: 1.35,
		textAlign: "start",
		cursor: "pointer",
		transitionDuration: "120ms",
		transitionProperty: "background-color",
		// 焦点环画在里面：行贴着卡片的边，画在外面会被裁掉。
		outlineColor: color.accent,
		outlineOffset: "-2px",
		outlineStyle: { default: "none", ":focus-visible": "solid" },
		outlineWidth: "2px",
	},
	body: { display: "grid", gap: space.xxs, minWidth: 0 },
	top: {
		display: "flex",
		alignItems: "baseline",
		justifyContent: "space-between",
		gap: space.md,
		minWidth: 0,
	},
	from: {
		minWidth: 0,
		overflow: "hidden",
		fontWeight: 600,
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
	},
	time: {
		flexShrink: 0,
		color: color.subtle,
		fontSize: text.sm,
		fontVariantNumeric: "tabular-nums",
		whiteSpace: "nowrap",
	},
	subject: {
		overflow: "hidden",
		color: color.muted,
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
	},
	// 占位行不能点。
	ghost: { backgroundColor: "transparent", cursor: "default" },
	ghostAvatar: { width: "2.5rem", height: "2.5rem" },
	fromShort: { width: "5rem" },
	fromMedium: { width: "6.5rem" },
	fromLong: { width: "8.5rem" },
	subjectShort: { width: "42%" },
	subjectMedium: { width: "56%" },
	subjectLong: { width: "70%" },
});

// 占位行的宽度错开一点，看起来像真实的邮件列表。五行正好不超出收件箱的高度，不会冒出滚动条。
const GHOST_ROWS = [
	{ from: styles.fromMedium, subject: styles.subjectLong },
	{ from: styles.fromShort, subject: styles.subjectShort },
	{ from: styles.fromLong, subject: styles.subjectMedium },
	{ from: styles.fromMedium, subject: styles.subjectShort },
	{ from: styles.fromShort, subject: styles.subjectLong },
];

function formatTime(
	timestamp: number,
	locale: Locale,
	referenceNow: number,
): string {
	const intlLocale = toIntlLocale(locale);
	const relative = new Intl.RelativeTimeFormat(intlLocale, { numeric: "auto" });
	const diffSeconds = Math.round((timestamp - referenceNow) / 1000);

	if (Math.abs(diffSeconds) < 60) {
		return relative.format(diffSeconds, "second");
	}

	const diffMinutes = Math.round(diffSeconds / 60);
	if (Math.abs(diffMinutes) < 60) {
		return relative.format(diffMinutes, "minute");
	}

	const diffHours = Math.round(diffMinutes / 60);
	if (Math.abs(diffHours) < 24) {
		return relative.format(diffHours, "hour");
	}

	const diffDays = Math.round(diffHours / 24);
	if (Math.abs(diffDays) < 7) {
		return relative.format(diffDays, "day");
	}

	return new Date(timestamp).toLocaleDateString(intlLocale);
}

// 收件箱里的邮件：头像、发件人、时间，下面一行主题。点一行打开邮件。
// `now` 是取数的那一刻，相对时间（“3 分钟前”）以它为准。
export function EmailList(props: {
	emails: Email[];
	locale: Locale;
	now: number;
	onOpen: (email: Email) => void;
}) {
	return (
		<ul {...stylex.attrs(styles.list)}>
			<For each={props.emails} keyed={(email) => email.id}>
				{(email) => (
					<li {...stylex.attrs(styles.item)}>
						<button
							type="button"
							onClick={() => props.onOpen(email())}
							{...stylex.attrs(styles.email)}
						>
							<Avatar
								name={email().from_name || email().from_address}
								seed={email().from_address}
							/>
							<span {...stylex.attrs(styles.body)}>
								<span {...stylex.attrs(styles.top)}>
									<span {...stylex.attrs(styles.from)}>
										{email().from_name || email().from_address}
									</span>
									<span {...stylex.attrs(styles.time)}>
										{formatTime(email().time, props.locale, props.now)}
									</span>
								</span>
								<span {...stylex.attrs(styles.subject)}>{email().subject}</span>
							</span>
						</button>
					</li>
				)}
			</For>
		</ul>
	);
}

// 收件箱还没取回来时的占位：和真实的行是同一套结构和高度，邮件到了不会跳。
export function EmailListSkeleton() {
	return (
		<ul aria-hidden="true" {...stylex.attrs(styles.list)}>
			{GHOST_ROWS.map((row) => (
				<li {...stylex.attrs(styles.item)}>
					<div {...stylex.attrs(styles.email, styles.ghost)}>
						<Skeleton shape="round" xstyle={styles.ghostAvatar} />
						<span {...stylex.attrs(styles.body)}>
							<span {...stylex.attrs(styles.top)}>
								<span {...stylex.attrs(styles.from)}>
									<Skeleton xstyle={row.from} />
								</span>
							</span>
							<span {...stylex.attrs(styles.subject)}>
								<Skeleton xstyle={row.subject} />
							</span>
						</span>
					</div>
				</li>
			))}
		</ul>
	);
}
