import * as stylex from "@stylexjs/stylex";
import { createSignal, For, Show } from "solid-js";

import { EmailList, EmailListSkeleton } from "#/components/email-list.tsx";
import { EmailView } from "#/components/email-view.tsx";
import { JsonLd } from "#/components/json-ld.tsx";
import { Mailbox } from "#/components/mailbox.tsx";
import { Page, Row, Rows } from "#/components/page.tsx";
import { type Locale, toLocalePath } from "#/i18n/config.ts";
import { useDictionary } from "#/i18n/dictionary.ts";
import { BASE_URL, SITE_NAME } from "#/seo.config.ts";
import { Badge } from "#/ui/Badge.tsx";
import { Button } from "#/ui/Button.tsx";
import { Dialog } from "#/ui/Dialog.tsx";
import { EmptyState } from "#/ui/EmptyState.tsx";
import { Icon } from "#/ui/Icon.tsx";
import { LinkList } from "#/ui/LinkList.tsx";
import { color, space, text } from "#/ui/tokens.stylex.ts";
import { usePageHead } from "#/utils/head.ts";
import { useInbox } from "#/utils/inbox.ts";
import { useLocale } from "#/utils/locale.ts";
import type { Email } from "#contract";

const styles = stylex.create({
	hero: {
		display: "grid",
		gridTemplateColumns: "minmax(0, 1fr)",
		justifyItems: "center",
		gap: space.xl,
		textAlign: "center",
	},
	title: {
		margin: 0,
		maxWidth: "54rem",
		fontSize: text.hero,
		fontWeight: 750,
		letterSpacing: "-0.04em",
		lineHeight: 1.08,
		textWrap: "balance",
		// 中日韩文字只在标点和空格处换行，不把一个词拆到两行；实在放不下再强行断开。
		wordBreak: "keep-all",
		overflowWrap: "anywhere",
	},
	lead: {
		margin: 0,
		maxWidth: "38rem",
		color: color.muted,
		fontSize: text.lg,
		lineHeight: 1.6,
		textWrap: "balance",
		wordBreak: "keep-all",
		overflowWrap: "anywhere",
	},
	// 窗口和上面的文字之间多留一点，和下面的提示之间少一点。
	stage: {
		display: "grid",
		gridTemplateColumns: "minmax(0, 1fr)",
		justifyItems: "center",
		gap: space.lg,
		width: "100%",
		marginBlockStart: space.lg,
	},
	hint: {
		margin: 0,
		maxWidth: "36rem",
		color: color.subtle,
		fontSize: text.sm,
		lineHeight: 1.6,
		textWrap: "balance",
		wordBreak: "keep-all",
		overflowWrap: "anywhere",
	},
	// 让里面的空状态撑满收件箱并居中。
	fill: { display: "grid" },
	note: { margin: 0, color: color.muted, lineHeight: 1.65, textWrap: "pretty" },
	points: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 17rem), 1fr))",
		columnGap: space.xxl,
		rowGap: space.md,
		margin: 0,
		padding: 0,
		color: color.muted,
		lineHeight: 1.55,
		listStyleType: "none",
	},
	point: {
		display: "grid",
		gridTemplateColumns: "auto minmax(0, 1fr)",
		gap: space.md,
	},
	pointMark: { display: "grid", marginBlockStart: "0.2rem", color: color.live },
});

function getHomeJsonLd(locale: Locale, description: string) {
	const localizedHomeUrl = `${BASE_URL}${toLocalePath("/", locale)}`;

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				name: SITE_NAME,
				url: localizedHomeUrl,
				inLanguage: locale,
				description,
				potentialAction: {
					"@type": "UseAction",
					target: localizedHomeUrl,
				},
			},
			{
				"@type": "WebApplication",
				name: SITE_NAME,
				url: localizedHomeUrl,
				applicationCategory: "UtilitiesApplication",
				operatingSystem: "Web",
				inLanguage: locale,
				description,
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
			},
		],
	};
}

export default function Home() {
	const locale = useLocale();
	const { home: copy, guides, common } = useDictionary();
	const mailbox = useInbox();
	const { inbox, address } = mailbox;
	const [selectedEmail, setSelectedEmail] = createSignal<Email | null>(null);

	usePageHead(() => ({
		title: copy.title,
		description: copy.description,
		keywords: copy.keywords,
		robots: "index, follow",
	}));

	return (
		<Page>
			<JsonLd data={getHomeJsonLd(locale(), copy.jsonLdDescription)} />

			<section {...stylex.attrs(styles.hero)}>
				<Badge dot="new">{copy.badge}</Badge>
				<h1 {...stylex.attrs(styles.title)}>{copy.heroTitle}</h1>
				<p {...stylex.attrs(styles.lead)}>{copy.heroDescription}</p>

				<div {...stylex.attrs(styles.stage)}>
					<Mailbox inbox={mailbox}>
						<Show
							when={address()}
							fallback={
								<Show
									when={inbox().status === "failed"}
									fallback={
										<>
											<div data-guest="" {...stylex.attrs(styles.fill)}>
												<EmptyState icon="mail">
													{copy.noAddressDescription}
												</EmptyState>
											</div>
											{/* 已有地址的访客，收件箱取回之前看到的是这个 */}
											<div data-pending="">
												<EmailListSkeleton />
											</div>
										</>
									}
								>
									{/* 没取到不等于没有地址：只给重试。 */}
									<EmptyState icon="inbox">
										<Button
											variant="outline"
											size="sm"
											onClick={() => mailbox.refresh()}
										>
											<Icon name="refresh" size={14} />
											{copy.refreshInbox}
										</Button>
									</EmptyState>
								</Show>
							}
						>
							<Show
								when={inbox().emails.length > 0}
								fallback={
									<EmptyState icon="inbox" title={copy.emptyInboxTitle}>
										{copy.emptyInboxDescription}
									</EmptyState>
								}
							>
								<EmailList
									emails={inbox().emails}
									locale={locale()}
									now={inbox().renderedAt}
									onOpen={setSelectedEmail}
								/>
							</Show>
						</Show>
					</Mailbox>
					<p {...stylex.attrs(styles.hint)}>{copy.safetyHint}</p>
				</div>
			</section>

			<Rows>
				<Row title={copy.narrative.title}>
					<p {...stylex.attrs(styles.note)}>{copy.narrative.description}</p>
					<ul {...stylex.attrs(styles.points)}>
						<For each={copy.narrative.points}>
							{(point) => (
								<li {...stylex.attrs(styles.point)}>
									<span {...stylex.attrs(styles.pointMark)}>
										<Icon name="check" size={16} />
									</span>
									{point}
								</li>
							)}
						</For>
					</ul>
				</Row>
				<Row title={guides.title}>
					<LinkList
						items={guides.items.map((item) => ({
							href: toLocalePath(item.path, locale()),
							label: item.label,
						}))}
					/>
				</Row>
			</Rows>

			<Dialog
				open={selectedEmail() !== null}
				title={selectedEmail()?.subject || copy.modal.title}
				closeLabel={common.close}
				onClose={() => setSelectedEmail(null)}
			>
				<Show when={selectedEmail()}>
					{(email) => <EmailView email={email()} copy={copy.modal} />}
				</Show>
			</Dialog>
		</Page>
	);
}
