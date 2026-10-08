# Deploying your own copy

The only file you need to edit is `site.config.ts` in the repository root. Steps 1–5 below were run end to end on a fresh copy of the repository (2026-10-08). Step 6 is done in the Cloudflare dashboard; menu names may differ slightly from what is written here.

The previous version (React Router + `wrangler.jsonc`) is archived under the [`v3`](https://github.com/akazwz/smail/releases/tag/v3) tag.

## Before you start

- A Cloudflare account and a domain that is already on Cloudflare. The website and the email addresses both use it.
- Node.js 22.18 or newer, and pnpm.
- Cloudflare products used: Workers (with static assets and Durable Objects), D1, R2, and Email Routing. R2 has to be enabled in the dashboard the first time you use it.

## 1. Get the code, install, log in

```bash
git clone https://github.com/akazwz/smail.git
cd smail
pnpm install
cd worker
pnpm exec cf auth login
```

The project uses Cloudflare's new `cf` CLI (currently in beta). It is installed as a dependency. Run the `cf` commands below from the `worker/` directory.

## 2. Create the database and the bucket

```bash
pnpm exec cf d1 create --name my-smail
pnpm exec cf r2 buckets create --name my-smail
```

Pick any names. Note the `uuid` returned by the first command.

## 3. Fill in `site.config.ts`

```ts
export const site = {
	domain: "example.com", // your domain
	worker: "my-smail", // the Worker's name
	database: { name: "my-smail", id: "the uuid from step 2" },
	bucket: "my-smail",
};
```

The site name shown on the pages, the URLs in the sitemap, and the generated addresses (`xxx@example.com`) all come from this file.

## 4. Prepare the secret

```bash
cp .env.example .env.production
```

Replace `SESSION_SECRETS` in `.env.production` with a long random string (for example the output of `openssl rand -base64 32`). It signs the session cookie. A visitor's address lives in that cookie, so if the secret is lost or replaced, every visitor loses their address. The file is ignored by git.

To rotate the secret later, list several values separated by commas. The leftmost one signs new cookies; the others are only used to verify old ones.

## 5. First deploy

From the repository root:

```bash
cd ..
pnpm run deploy:first
```

This builds the frontend (every page is prerendered), builds the Worker, creates the tables, and uploads the Worker together with the secret. It prints a `https://<worker>.<your-subdomain>.workers.dev` address. At this point the site already opens and can generate addresses.

## 6. Attach the domain and receive mail

In the Cloudflare dashboard:

1. **Attach the domain**: Workers & Pages → your Worker → Settings → Domains & Routes → Add → Custom domain, and enter the domain from `site.config.ts`.
2. **Turn on Email Routing**: open the domain → Email → Email Routing, and enable it. Cloudflare adds the DNS records needed to receive mail.
3. **Send all mail to the Worker**: Routing rules → Catch-all address → action "Send to a Worker", pick your Worker, and enable the rule.

## 7. Check that it works

- Open your domain and press "Generate address".
- Send an email to that address from any mailbox. It should appear on the page within a few seconds, without a refresh.
- If nothing arrives, first check that the catch-all rule from step 6 is enabled and points to your Worker, then look at the Worker's logs in the dashboard.

## Updating later

```bash
git pull
pnpm install
pnpm run deploy
```

`pnpm run deploy` is the same as the first deploy without the secret upload. New database migrations are applied automatically.

## Making it your own

- The site name in the header, footer and share cards comes from the domain in `site.config.ts`.
- The written content (`app/md`, `app/blog`, `app/i18n/locales`) says `smail.pw`, including the privacy policy and the terms. This command, run from the repository root, replaces it everywhere. Read the privacy policy and terms afterwards: they describe how smail.pw is run.

  ```bash
  git grep -lz "smail\.pw" -- app/md app/blog app/i18n/locales | xargs -0 perl -pi -e 's/smail\.pw/example.com/g'
  ```

- Icons and the share image are in `public/` (`favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `og.png`).
- `public/_redirects` holds redirects for smail.pw's own old URLs. Remove the ones you do not need.

## Why there is no "Deploy to Cloudflare" button

According to Cloudflare's documentation, the Deploy button reads a Wrangler configuration file and needs the deployed directory to build on its own. This repository uses `cloudflare.config.ts`, and the Worker's deployment bundle includes the frontend build from the repository root, so the button was removed. Use the steps above.

## Useful commands

From the `worker/` directory:

- `pnpm run migrate`: apply pending migrations to the remote database.
- `pnpm run messages`: list the 50 most recent messages from the contact form.

For local development, copy `worker/.env.example` to `worker/.env` and run `pnpm run dev` from the repository root.
