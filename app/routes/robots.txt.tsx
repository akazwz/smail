import { BASE_URL } from "~/seo.config";

export async function loader() {
	const body = [
		"User-agent: *",
		"Allow: /",
		"Disallow: /api/",
		"",
		`Sitemap: ${BASE_URL}/sitemap.xml`,
		`Feed: ${BASE_URL}/rss.xml`,
		`Feed: ${BASE_URL}/zh/rss.xml`,
		"",
	].join("\n");

	return new Response(body, {
		status: 200,
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
}
