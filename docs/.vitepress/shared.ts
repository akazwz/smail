import { defineConfig } from "vitepress";

export const shared = defineConfig({
  title: "Smail",

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  markdown: {
    math: true,
    codeTransformers: [
      // We use `[!!code` in demo to prevent transformation, here we revert it back.
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, "[!code");
        },
      },
    ],
  },

  sitemap: {
    hostname: "https://docs.smail.pw",
    transformItems(items) {
      return items.filter((item) => !item.url.includes("migration"));
    },
  },

  /* prettier-ignore */
  head: [
    // ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vitepress-logo-mini.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'Smail | Fast access to Email Worker website' }],
    ['meta', { property: 'og:site_name', content: 'Smail' }],
    ['meta', { property: 'og:image', content: 'https://docs.smail.pw/logo.png' }],
    ['meta', { property: 'og:url', content: 'https://smail.pw/' }],
  ],

  themeConfig: {
    logo: { src: "/logo.png", width: 24, height: 24 },
    search: {
      provider: "local",
    },
    socialLinks: [{ icon: "github", link: "https://github.com/akazwz/smail" }],
  },
});
