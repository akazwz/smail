<p align="center">
  <span>
    <a href="https://github.com/akazwz/smail">English</a> | 
    简体中文
  </span>
<p>
<br />
<p align="center">
  <a href="https://smail.pw" target="_blank" rel="noopener">
    <img width="180" src="https://cdn.bytepacker.com/c34b4517-83aa-428a-978b-fa30b9aaec3b/smail_light.webp" alt="SMail logo">
  </a>
</p>
<br/>
<div align="center">
  <p>使用 cloudflare worker 快速搭建临时邮箱服务<p>
</div>

# Smail 📨
- 📁 使用 cloudflare email worker 接收邮件
- 🖼 提供 web 应用
- 💡 简化应用, 自己部署从未如此简单, 只需要一个 worker

## 快速开始
- 点击 [Smail](https://smail.pw) 快速开始
- 根据以下文档自行搭建服务

## 自建前置条件
- cloudflare 账号
- 在cloudflare 的域名并开启电子邮件路由功能(在域名的电子邮件设置中开启)
- 在Workers 和 Pages 中创建 KV 和 D1 数据库

## 自建同款
- star 本仓库(非必须,哈哈哈哈, 但是谢谢star)
- clone 仓库, 修改 wrangler.toml 中的 KV id 和 D1 的 database id 为你自己的
- 迁移数据库, 运行 pnpm wrangler d1 migrations apply smail --remote
- 部署worker, 运行 pnpm run deploy
- 新增环境变量, 进入 worker 设置->变量和机密: 设置 COOKIE_SECRET: 用于加密 cookie 的密钥, DOMAIN: 你的域名
- 进入域名管理->电子邮件->路由规则->Catch-all 地址. 这里选择发送到 worker, 然后选择创建的worker

完结: 访问你的worker就可以了,可以按需给worker自定义域名. 

### 其他功能
- 密码保护: 在cf后台worker环境变量中设置 PASSWORD, 访问时需要输入密码

## 鸣谢
- [Email.ML](https://email.ml)

## Star History
[![Star History Chart](https://api.star-history.com/svg?repos=akazwz/smail&type=Date)](https://star-history.com/#akazwz/smail&Date)