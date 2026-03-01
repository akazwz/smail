import type { MetaDescriptor } from "react-router";

type MetaMatch =
	| {
			meta?: MetaDescriptor[] | undefined;
	  }
	| undefined;

function isString(value: unknown): value is string {
	return typeof value === "string";
}

function getMetaDescriptorKey(metaDescriptor: MetaDescriptor): string {
	if ("title" in metaDescriptor) {
		return "title";
	}
	if ("charSet" in metaDescriptor || "charset" in metaDescriptor) {
		return "charSet";
	}
	if ("name" in metaDescriptor && isString(metaDescriptor.name)) {
		return `name:${metaDescriptor.name}`;
	}
	if ("property" in metaDescriptor && isString(metaDescriptor.property)) {
		return `property:${metaDescriptor.property}`;
	}
	if ("httpEquiv" in metaDescriptor && isString(metaDescriptor.httpEquiv)) {
		return `http-equiv:${metaDescriptor.httpEquiv}`;
	}
	if ("script:ld+json" in metaDescriptor) {
		return "script:ld+json";
	}
	if ("tagName" in metaDescriptor && metaDescriptor.tagName === "link") {
		const rel = isString(metaDescriptor.rel) ? metaDescriptor.rel : "";
		if (rel === "canonical") {
			return "link:canonical";
		}

		const hrefLang = isString(metaDescriptor.hrefLang)
			? metaDescriptor.hrefLang
			: "";
		if (rel === "alternate" && hrefLang) {
			return `link:alternate:${hrefLang}`;
		}

		const type = isString(metaDescriptor.type) ? metaDescriptor.type : "";
		if (rel === "alternate" && type === "application/rss+xml") {
			return "link:alternate:rss";
		}

		const href = isString(metaDescriptor.href) ? metaDescriptor.href : "";
		return `link:${rel}:${href}`;
	}

	return `raw:${JSON.stringify(metaDescriptor)}`;
}

export function mergeRouteMeta(
	matches: MetaMatch[] | undefined,
	routeMeta: MetaDescriptor[],
): MetaDescriptor[] {
	const parentMeta = (matches ?? []).flatMap((match) => match?.meta ?? []);
	const mergedByKey = new Map<string, MetaDescriptor>();

	for (const metaDescriptor of [...parentMeta, ...routeMeta]) {
		mergedByKey.set(getMetaDescriptorKey(metaDescriptor), metaDescriptor);
	}

	return [...mergedByKey.values()];
}
