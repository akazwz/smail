export async function getLocaleData(lang: string) {
	switch (lang) {
		case "en":
			return import("./en.json").then((m) => m.default);
		case "zh-CN":
			return import("./zh-CN.json").then((m) => m.default);
		default:
			return import("./en.json").then((m) => m.default);
	}
}
