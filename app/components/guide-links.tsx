import { toLocalePath } from "#/i18n/config.ts";
import { useDictionary } from "#/i18n/dictionary.ts";
import { LinkList } from "#/ui/LinkList.tsx";
import { useLocale } from "#/utils/locale.ts";

import { Section } from "./page.tsx";

// “热门指南”链接列表，内容页的侧栏用。
export function GuideLinks(props: { compact?: boolean }) {
	const locale = useLocale();
	const { guides } = useDictionary();

	return (
		<Section title={guides.title} compact={props.compact}>
			<LinkList
				items={guides.items.map((item) => ({
					href: toLocalePath(item.path, locale()),
					label: item.label,
				}))}
			/>
		</Section>
	);
}
