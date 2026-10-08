import * as stylex from "@stylexjs/stylex";

import { JsonLd } from "#/components/json-ld.tsx";
import { MessageForm } from "#/components/message-form.tsx";
import { Page, PageIntro } from "#/components/page.tsx";
import { toLocalePath } from "#/i18n/config.ts";
import { useDictionary } from "#/i18n/dictionary.ts";
import { BASE_URL, SITE_NAME } from "#/seo.config.ts";
import { ButtonLink } from "#/ui/Button.tsx";
import { color, space } from "#/ui/tokens.stylex.ts";
import { usePageHead } from "#/utils/head.ts";
import { useLocale } from "#/utils/locale.ts";

// 和页面骨架里的两栏在同一个宽度收成一栏（app/components/page.tsx）。
const STACKED = "@media (max-width: 900px)";

const styles = stylex.create({
	// 两栏等宽、上下对齐：左边上面是标题，下面是“先看常见问题”，右边是留言表单，和左栏一样高。
	// 窄屏收成一栏时，表单排在标题后面、提示前面。
	layout: {
		display: "grid",
		gridTemplateColumns: {
			default: "minmax(0, 1fr) minmax(0, 1fr)",
			[STACKED]: "minmax(0, 1fr)",
		},
		gridTemplateRows: { default: "auto 1fr", [STACKED]: "auto" },
		gridTemplateAreas: {
			default: '"intro form" "help form"',
			[STACKED]: '"intro" "form" "help"',
		},
		columnGap: space.xxl,
		rowGap: space.xxl,
	},
	intro: { gridArea: "intro" },
	form: { gridArea: "form" },
	// 贴着左栏的底边，和表单的底边对齐；上面一条细线把它和标题分开。
	help: {
		display: "grid",
		gridTemplateColumns: "minmax(0, 1fr)",
		gap: space.lg,
		gridArea: "help",
		alignSelf: { default: "end", [STACKED]: "start" },
		paddingBlockStart: space.xl,
		borderBlockStartWidth: "1px",
		borderBlockStartStyle: "solid",
		borderBlockStartColor: color.border,
	},
	note: { margin: 0, color: color.muted, lineHeight: 1.65 },
	actions: { display: "flex", flexWrap: "wrap", gap: space.sm },
});

export default function ContactPage() {
	const locale = useLocale();
	const { contact: copy } = useDictionary();

	usePageHead(() => ({
		title: copy.metaTitle,
		description: copy.metaDescription,
		robots: "index, follow",
	}));

	const contactJsonLd = () => ({
		"@context": "https://schema.org",
		"@type": "ContactPage",
		url: `${BASE_URL}${toLocalePath("/contact", locale())}`,
		name: copy.title,
		description: copy.description,
		mainEntity: {
			"@type": "Organization",
			name: SITE_NAME,
			url: BASE_URL,
		},
	});

	return (
		<Page>
			<JsonLd data={contactJsonLd()} />
			<div {...stylex.attrs(styles.layout)}>
				<div {...stylex.attrs(styles.intro)}>
					<PageIntro title={copy.title} lead={copy.description} />
				</div>
				<div {...stylex.attrs(styles.form)}>
					<MessageForm />
				</div>
				<div {...stylex.attrs(styles.help)}>
					<p {...stylex.attrs(styles.note)}>{copy.faqHint}</p>
					<div {...stylex.attrs(styles.actions)}>
						<ButtonLink href={toLocalePath("/faq", locale())}>
							{copy.faqCta}
						</ButtonLink>
						<ButtonLink variant="quiet" href={toLocalePath("/", locale())}>
							{copy.homeCta}
						</ButtonLink>
					</div>
				</div>
			</div>
		</Page>
	);
}
