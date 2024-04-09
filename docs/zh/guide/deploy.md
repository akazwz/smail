---
outline: deep
---


# 部署


要在本地运行一个副本，请遵循以下简单步骤。

## 先决条件

以下是运行 `Smail` 所需的条件。

- Node.js (版本: >=18.x)
- Pnpm _(推荐)_
- 一个 [Turso](https://turso.tech/) 账户
- 一个 [Cloudflare](https://www.cloudflare.com) 账户

## 设置

1. 克隆仓库到一个公共的 GitHub 仓库（或者 fork https://github.com/akazwz/smail）。

   ```sh
   git clone https://github.com/akazwz/smail
   ```

2. 进入项目文件夹

   ```sh
    cd smail
    ```
3. 设置 Node
    如果你的 Node 版本不符合文档指示的项目要求，"nvm"（Node 版本管理器）允许使用项目所需的 Node 版本：

    ```sh
    nvm use
    ```

    你首先可能需要安装特定版本然后再使用它：

      ```sh
      nvm install && nvm use
      ```

    你可以从 [这里](https://github.com/nvm-sh/nvm) 安装 nvm。


4. 使用 pnpm 安装包

   ```sh
   pnpm install
   ```
## 准备数据库

1. 在 [turso](https://turso.tech/) 上创建一个账户
2. 在 turso 上创建一个名为 `smail` 的新数据库

## 部署 Worker

1. 设置你的 `apps/email-worker/wrangler.toml` 文件
   - 将 `apps/email-worker/wrangler.toml.example` 复制到 `apps/email-worker/wrangler.toml`
   - 从 turso 复制 `smail` 数据库 url，并将其添加到 `apps/email-worker/wrangler.toml` 文件中的 `TURSO_DB_URL` 下
   - 从 turso 生成一个 `Read & Write` 密钥，并将其添加到 `apps/email-worker/wrangler.toml` 文件中的 `TURSO_DB_AUTH_TOKEN` 下
   - 部署 worker

    ```sh
    cd apps/email-worker && pnpm run deploy
    ```


## 设置 Cloudflare Workers 转发

1. 登录到 [Cloudflare 控制台](https://dash.cloudflare.com/)
2. 选择一个域名，点击进入。
3. 点击 `电子邮件`->`电子邮件路由`->`路由规则`，设置 `catch-all` 动作为发送到 worker，目标为 `email-worker`。

## 部署 Web 应用

1. 将 `apps/remix/.env.example` 复制到 `apps/remix/.env`
2. 使用 `openssl rand -base64 32` 生成一个密钥，并将其添加到 `apps/remix/.env` 文件中的 `COOKIES_SECRET` 下。
3. 从 turso 复制 `smail` 数据库 url，并将其添加到 `apps/remix/.env` 文件中的 `TURSO_DB_URL` 下
4. 从 turso 生成一个 `Read Only` 密钥，并将其添加到 `apps/remix/.env` 文件中的 `TURSO_DB_RO_AUTH_TOKEN` 下
5. 在 `apps/remix/.env` 文件中的 `DOMAIN` 下添加你的域名，例如，`DOMAIN=smail.pw`。

  ::: tip
  如果你需要使用多个域名，请使用 , 分隔，如 DOMAIN=smail.pw,smail.com。
  :::

6. （可选）如果你想启用 [cloudflare turnstile](https://developers.cloudflare.com/turnstile/) `apps/remix/.env` 文件中添加 TURNSTILE_ENABLED=true。

7. 部署

- Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fakazwz%2Fsmail&env=COOKIES_SECRET,TURNSTILE_KEY,TURNSTILE_SECRET,TURSO_DB_URL,TURSO_DB_RO_AUTH_TOKEN,DOMAINS,CLOUDFLARE_TURNSTILE_VERIFY_Endpoint,TURNSTILE_ENABLED&project-name=smail&repository-name=smail)

- 使用 [fly.io](https://fly.io/) 部署

    ```sh
    cd apps/remix && fly launch
    ```

- Cloudflare Pages

  ::: tip
  即将推出
  :::

## 恭喜 🎉

访问部署的站点与当前示例相同 [https://smail.pw](https://smail.pw)。试试看！

你可以 _**随机**_ 输入一个用户名，然后点击 `创建` 按钮，然后你会看到一个临时邮箱地址，你可以使用这个地址接收邮件。