import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("/about", "routes/about.tsx"),
	route("/privacy", "routes/privacy.tsx"),
	route("/terms", "routes/terms.tsx"),
	route("/faq", "routes/faq.tsx"),
	route("/contact", "routes/contact.tsx"),
	route("/mail/:id", "routes/mail.$id.tsx"),
	route("/attachment/:id", "routes/attachment.$id.tsx"),
	route("/dev/email-handler", "routes/dev.email-handler.tsx"),
	route("/sitemap.xml", "routes/sitemap[.]xml.tsx"),
	route("/site.webmanifest", "routes/site[.]webmanifest.tsx"),
] satisfies RouteConfig;
