import { defineConfig, type DefaultTheme } from "vitepress";

export const en = defineConfig({
  lang: "en-US",
  description: "Temporary email service build with email worker.",

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/guide/": { base: "/guide/", items: sidebarGuide() },
      "/reference/": { base: "/reference/", items: sidebarReference() },
      "/team/": { base: "/team/", items: [{ text: "Team", link: "/" }] },
    },

    editLink: {
      pattern: "https://github.com/akazwz/smail/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present akazwz",
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "Guide",
      link: "/guide/what-is-smail",
      activeMatch: "/guide/",
    },
    {
      text: "Team",
      link: "/team",
      activeMatch: "/team/",
    },
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Introduction",
      collapsed: false,
      items: [
        { text: "What is Smail?", link: "what-is-smail" },
        { text: "Deploy", link: "deploy" },
      ],
    },
  ];
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Reference",
      items: [
        { text: "Site Config", link: "site-config" },
        { text: "Frontmatter Config", link: "frontmatter-config" },
        { text: "Runtime API", link: "runtime-api" },
        { text: "CLI", link: "cli" },
        {
          text: "Default Theme",
          base: "/reference/default-theme-",
          items: [
            { text: "Overview", link: "config" },
            { text: "Nav", link: "nav" },
            { text: "Sidebar", link: "sidebar" },
            { text: "Home Page", link: "home-page" },
            { text: "Footer", link: "footer" },
            { text: "Layout", link: "layout" },
            { text: "Badge", link: "badge" },
            { text: "Team Page", link: "team-page" },
            { text: "Prev / Next Links", link: "prev-next-links" },
            { text: "Edit Link", link: "edit-link" },
            { text: "Last Updated Timestamp", link: "last-updated" },
            { text: "Search", link: "search" },
          ],
        },
      ],
    },
  ];
}
