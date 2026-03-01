import { layout, type RouteConfig, route } from "@react-router/dev/routes";

const mdPages = [
	"about",
	"faq",
	"privacy",
	"terms",
	"temporary-email-24-hours",
	"temporary-email-no-registration",
	"disposable-email-for-verification",
	"temporary-email-for-registration",
	"online-temporary-email",
	"domestic-temporary-email",
	"can-temporary-email-send",
	"smail-vs-smailpro",
];

export default [
	route("/zh-CN", "routes/locale-zh-cn-redirect.tsx", {
		id: "locale-zh-CN-root",
	}),
	route("/zh-CN/*", "routes/locale-zh-cn-redirect.tsx", {
		id: "locale-zh-CN-splat",
	}),
	route("/zh-cn", "routes/locale-zh-cn-redirect.tsx", {
		id: "locale-zh-cn-root",
	}),
	route("/zh-cn/*", "routes/locale-zh-cn-redirect.tsx", {
		id: "locale-zh-cn-splat",
	}),
	route("/robots.txt", "routes/robots.txt.tsx"),
	route("/sitemap.xml", "routes/sitemap.xml.tsx"),
	route("/rss.xml", "routes/rss.xml.tsx", { id: "rss-default" }),
	route(":lang/rss.xml", "routes/rss.xml.tsx", { id: "rss-locale" }),
	layout("routes/layout.tsx", [
		route(":lang?", "routes/home.tsx", { id: "home" }),
		route(":lang?/contact", "routes/contact.tsx", { id: "contact" }),
		route(":lang?/blog", "routes/blog.tsx", { id: "blog-list" }),
		route(":lang?/blog/page/:page", "routes/blog.page.tsx", {
			id: "blog-page",
		}),
		route(":lang?/blog/:slug", "routes/blog.post.tsx", { id: "blog-post" }),
		...mdPages.map((page) =>
			route(`:lang?/${page}`, "routes/md.tsx", { id: `md-${page}` }),
		),
	]),
	route("/api/email/:id", "routes/api.email.ts"),
] satisfies RouteConfig;
