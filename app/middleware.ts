import { announcePages } from "prerender-crawler/announce";

import { handleFeedRoute, listFeedPaths, listPagePaths } from "#/feeds.ts";

type Next = (request?: Request) => Promise<Response>;

/**
 * 只在构建时（和本地开发时）运行：网站上线后是纯静态文件，没有这一层。
 *
 * 做两件事：
 * 1. robots / sitemap / RSS 不是页面，由这里直接应答，预渲染时和页面一起写成静态文件。
 * 2. 把全站的页面清单告诉预渲染的爬虫。爬虫从首页出发、顺着链接找页面，而我们的
 *    语言切换是下拉框不是链接，它自己找不到其他语言。清单只在爬虫请求首页时附上，
 *    访客的响应不受影响。
 */
export default async function buildMiddleware(request: Request, next: Next) {
	const response = handleFeedRoute(request) ?? (await next());
	if (new URL(request.url).pathname === "/") {
		announcePages(request, response.headers, [
			...listPagePaths(),
			...listFeedPaths(),
		]);
	}
	return response;
}
