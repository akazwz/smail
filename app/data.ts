import { action, query, revalidate } from "@solidjs/router";
import { reload } from "@solidjs/web";

import {
	deleteAddress,
	fetchEmailBody,
	fetchInbox,
	generateAddress,
} from "#/api.ts";
import { loadBlogPost, loadMarkdownPage } from "#/content.ts";
import type { Locale } from "#/i18n/config.ts";
import type { Inbox } from "#contract";

export const getInbox = query(() => fetchInbox(), "inbox");

export const getEmailBody = query(
	(id: string) => fetchEmailBody(id),
	"email-body",
);

/**
 * 生成和删除地址的接口已经把最新的收件箱带回来了：直接放进缓存，让正在显示它的地方
 * 重新读一遍，不再为此多发一次请求。返回的响应告诉路由“不用再刷新任何查询”。
 */
function adoptInbox(inbox: Inbox): Response {
	query.set(getInbox.keyFor(), inbox);
	revalidate(getInbox.key, false);
	return reload({ revalidate: [] });
}

// 不是服务端函数的 action 要起一个固定的名字。
// `replace`：用户确认过更换地址。不带它时，已经有地址的会话拿回来的还是原来那个。
export const generateAddressAction = action(
	async (replace: boolean) => adoptInbox(await generateAddress(replace)),
	"generate-address",
);

export const deleteAddressAction = action(
	async () => adoptInbox(await deleteAddress()),
	"delete-address",
);

export const getMarkdownPage = query(
	(locale: Locale, slug: string) => loadMarkdownPage(locale, slug),
	"markdown-page",
);

export const getBlogPost = query(
	(locale: Locale, slug: string) => loadBlogPost(locale, slug),
	"blog-post",
);
