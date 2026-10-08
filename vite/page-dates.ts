import { execFileSync } from "node:child_process";

// 每个页面“最后修改时间”，给站点地图用。取的是这个页面的内容文件在 git 里最后一次提交的日期；
// 还没提交的改动算今天。这样只有内容真的改过的页面，日期才会变。

function git(args: string[]): string | undefined {
	try {
		return execFileSync("git", args, {
			encoding: "utf8",
			stdio: ["ignore", "pipe", "ignore"],
		});
	} catch {
		// 不在 git 仓库里（比如从压缩包构建）：不写日期。
		return undefined;
	}
}

/** 页面地址对应的内容文件。首页、联系页、博客列表的内容在这种语言的文案文件里。 */
function sourceOf(pagePath: string, locales: string[]): string {
	const segments = pagePath.split("/").filter(Boolean);
	const locale = locales.includes(segments[0] ?? "")
		? (segments.shift() as string)
		: "en";
	if (segments[0] === "blog" && segments[1] && segments[1] !== "page") {
		return `app/blog/${locale}/${segments[1]}.md`;
	}
	if (
		segments.length === 1 &&
		segments[0] !== "blog" &&
		segments[0] !== "contact"
	) {
		return `app/md/${locale}/${segments[0]}.md`;
	}
	return `app/i18n/locales/${locale}.tsx`;
}

export function createPageDates(locales: string[]) {
	const today = new Date().toISOString().slice(0, 10);
	const changed = new Set(
		(git(["status", "--porcelain", "--", "app"]) ?? "")
			.split("\n")
			.map((line) => line.slice(3).trim())
			.filter(Boolean),
	);
	const cache = new Map<string, string | undefined>();

	/** YYYY-MM-DD，或者拿不到时是 undefined。 */
	return function lastModified(pagePath: string): string | undefined {
		const file = sourceOf(pagePath, locales);
		if (!cache.has(file)) {
			const uncommitted = [...changed].some(
				(entry) => entry === file || file.startsWith(entry),
			);
			const committed = uncommitted
				? undefined
				: git(["log", "-1", "--format=%cs", "--", file])?.trim();
			cache.set(
				file,
				committed || (git(["rev-parse", "HEAD"]) ? today : undefined),
			);
		}
		return cache.get(file);
	};
}
