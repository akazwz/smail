import { useNavigate } from "@solidjs/router";
import { httpStatus } from "@solidjs/web";
import { onSettled } from "solid-js";

import { Page, PageIntro } from "#/components/page.tsx";
import { toLocalePath } from "#/i18n/config.ts";
import { SITE_NAME } from "#/seo.config.ts";
import { ButtonLink } from "#/ui/Button.tsx";
import { Icon } from "#/ui/Icon.tsx";
import { usePageHead } from "#/utils/head.ts";
import { useLocale } from "#/utils/locale.ts";

export default function NotFound() {
	const locale = useLocale();
	const navigate = useNavigate();

	httpStatus(404);
	usePageHead(() => ({
		title: `404 | ${SITE_NAME}`,
		robots: "noindex, follow",
	}));
	// 找不到的页面在浏览器里直接回首页；服务端仍然返回 404 状态码。
	onSettled(() => {
		navigate(toLocalePath("/", locale()), { replace: true });
	});

	return (
		<Page>
			<PageIntro title="404">
				<div>
					<ButtonLink href={toLocalePath("/", locale())}>
						<Icon name="back" size={16} />
						{SITE_NAME}
					</ButtonLink>
				</div>
			</PageIntro>
		</Page>
	);
}
