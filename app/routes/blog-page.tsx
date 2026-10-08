import { useParams } from "@solidjs/router";
import { Show } from "solid-js";

import { getBlogPageCount } from "#/blog/data.ts";
import { useDictionary } from "#/i18n/dictionary.ts";

import { BlogListView } from "./blog.tsx";
import NotFound from "./not-found.tsx";

export default function BlogPagedListPage() {
	const params = useParams();
	const { blog } = useDictionary();
	// 路由的 matchFilters 已保证 page 是纯数字；第 1 页在 Worker 入口处 301 到 /blog
	const page = () => Number.parseInt(params.page ?? "", 10);
	const isValidPage = () =>
		Number.isSafeInteger(page()) &&
		page() >= 2 &&
		page() <= getBlogPageCount(blog.posts);

	return (
		<Show when={isValidPage()} fallback={<NotFound />}>
			<BlogListView page={page()} />
		</Show>
	);
}
