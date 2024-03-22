import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'SMail',
  titleTemplate: '@',
  description: 'Temporary email service build with email worker',
  lastUpdated: true,
  locales: {
    root: {
      label: 'English',
      lang: 'en-US'
    },
    zh: {
      label: '简体中文',
      lang: 'zh-Hans',
      description: '自定义 Worker 构建临时邮件服务',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh/quick-start' },
          { text: 'Team', link: '/zh/team' }
        ]
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    nav: [
      { text: 'Guide', link: '/quick-start' },
      { text: 'Team', link: '/team' }
    ],

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/akazwz/smail' },
      { icon: 'npm', link: 'https://smail.pw/' }
    ],

    editLink: {
      pattern: 'https://github.com/akazwz/smail/edit/main/docs/:path'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present akazwz'
    }
  }
})
