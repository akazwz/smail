---
outline: deep
---

# Deploy

To get a local copy up and running, please follow these simple steps.

## Prerequisites

Here is what you need to be able to run `Smail`.

- Node.js (Version: >=18.x)
- Pnpm _(recommended)_
- A [Turso](https://turso.tech/) account
- A [Cloudflare](https://www.cloudflare.com) account

## Setup

1. Clone the repo into a public GitHub repository (or fork https://github.com/akazwz/smail).

   ```sh
   git clone https://github.com/akazwz/smail
   ```

2. Go to the project folder

   ```sh
   cd smail
   ```

3. Setup Node
   If your Node version does not meet the project's requirements as instructed by the docs, "nvm" (Node Version Manager) allows using Node at the version required by the project:

   ```sh
   nvm use
   ```

   You first might need to install the specific version and then use it:

   ```sh
   nvm install && nvm use
   ```

   You can install nvm from [here](https://github.com/nvm-sh/nvm).

4. Install packages with yarn

   ```sh
   pnpm install
   ```
## Set up databases

1. Create a account on [turso](https://turso.tech/)

2. Create a new database name `smail` on turso

## Deploy worker

1. Set up your `apps/email-worker/wrangler.toml` file
   - Duplicate `apps/email-worker/wrangler.toml.example` to `apps/email-worker/wrangler.toml`
   - Copy `smail` database url from turso and add it under `TURSO_DB_URL` in the `apps/email-worker/wrangler.toml` file
   - Generate a `Read & Write` key from turso and add it under `TURSO_DB_AUTH_TOKEN` in the `apps/email-worker/wrangler.toml` file
   - Deploy worker

    ```sh
    cd apps/email-worker && pnpm run deploy
    ```

## Set Cloudflare Workers to forward

1. Log on to the [Cloudflare console] (https://dash.cloudflare.com/)
2. Select a domain name and click.
3. Click 'email' -> 'Email Routing' -> 'Routing Rules' and set' catch-all 'action to send to worker and target' email-worker '.

## Web application configuration

1. Duplicate `apps/remix/.env.example` to `apps/remix/.env`
2. Use `openssl rand -base64 32` to generate a key and add it under `COOKIES_SECRET` in the `.env` file.
3. Copy `smail` database url from turso and add it under `TURSO_DB_URL` in the `apps/remix/.env` file
4. Generate a `Read Only` key from turso and add it under `TURSO_DB_RO_AUTH_TOKEN` in the `apps/remix/.env` file
5. Add your domain name under `DOMAIN` in the `apps/remix/.env` file, for example, `DOMAIN=smail.pw`.

    ::: tip
    If you need to use multiple domain names, please use `,` interval like `DOMAIN=smail.pw,smail.com`.
    :::

6. (Option) if you want to enable cloudfare turnsite, you can add `TURNSTILE_ENABLED=true` in the `apps/remix/.env` file.

7. Deployment
- Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fakazwz%2Fsmail&env=COOKIES_SECRET,TURNSTILE_KEY,TURNSTILE_SECRET,TURSO_DB_URL,TURSO_DB_RO_AUTH_TOKEN,DOMAINS,CLOUDFLARE_TURNSTILE_VERIFY_Endpoint,TURNSTILE_ENABLED&project-name=smail&repository-name=smail)

- [fly.io](https://fly.io/)

  ```sh
  cd apps/remix && fly launch
  ```

- Cloudflare Pages

  ::: tip
  Coming soon
  :::

## Congratulations

You have successfully deployed the project. Visit the deployed site as in the example [https://smail.pw](https://smail.pw). Try it out.

You can _**random**_ enter a username and click the `Create` button, then you will see a temporary email address that you can use to receive emails.