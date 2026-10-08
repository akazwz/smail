/** 把文案里的 {名字} 换成对应的值；没给值的占位符原样保留。 */
export function fillTemplate(
	template: string,
	values: Record<string, string | number>,
): string {
	return template.replace(/\{(\w+)\}/g, (match, name: string) =>
		name in values ? String(values[name]) : match,
	);
}
