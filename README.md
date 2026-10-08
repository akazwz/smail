# smail.pw

[![CI](https://github.com/akazwz/smail/actions/workflows/ci.yml/badge.svg)](https://github.com/akazwz/smail/actions/workflows/ci.yml)

A temporary email service that runs on Cloudflare Workers. This is the source code of [smail.pw](https://smail.pw).

[简体中文](README.zh-CN.md)

## Features

- Get an address without signing up. It stays the same until you replace or delete it.
- New mail shows up in the page within a few seconds. It is pushed over a WebSocket, so there is no polling.
- All pages are static files. The Worker only runs for the inbox API, the push connection and incoming mail.
- Emails are displayed in a sandboxed iframe. Scripts in them do not run, and links open in a new tab.
- 19 languages, including right-to-left ones.
- Receive only: no sending, and attachments are not shown.
- To host your own copy you edit one file, `site.config.ts`. See [Deploy your own](#deploy-your-own).

Stack: Solid 2, StyleX, Cloudflare Workers, D1, R2, Durable Objects, Email Routing.

## Deploy your own

The previous generation (React Router + `wrangler.jsonc`) is archived under the [`v3`](https://github.com/akazwz/smail/releases/tag/v3) tag. What follows is for the current code.

The only file you need to edit is `site.config.ts` in the repository root. Steps 1–5 below were run end to end on a fresh clone. Step 6 is done in the Cloudflare dashboard; menu names may differ slightly from what is written here.

There is no one-click Deploy button: Cloudflare's button needs a Wrangler configuration file, which this project does not use.

### Before you start

- A Cloudflare account and a domain that is already on Cloudflare. The website and the email addresses both use it.
- Node.js 22.18 or newer, and pnpm.
- Cloudflare products used: Workers (with static assets and Durable Objects), D1, R2, and Email Routing. R2 has to be enabled in the dashboard the first time you use it.

### 1. Get the code, install, log in

```bash
git clone https://github.com/akazwz/smail.git
cd smail
pnpm install
cd worker
pnpm exec cf auth login
```

The project uses Cloudflare's new `cf` CLI (currently in beta). It is installed as a dependency. Run the `cf` commands below from the `worker/` directory.

### 2. Create the database and the bucket

```bash
pnpm exec cf d1 create --name my-smail
pnpm exec cf r2 buckets create --name my-smail
```

Pick any names. Note the `uuid` returned by the first command.

### 3. Fill in `site.config.ts`

```ts
export const site = {
	domain: "example.com", // your domain
	worker: "my-smail", // the Worker's name
	database: { name: "my-smail", id: "the uuid from step 2" },
	bucket: "my-smail",
};
```

The site name shown on the pages, the URLs in the sitemap, and the generated addresses (`xxx@example.com`) all come from this file.

### 4. Prepare the secret

```bash
cp .env.example .env.production
```

Replace `SESSION_SECRETS` in `.env.production` with a long random string (for example the output of `openssl rand -base64 32`). It signs the session cookie. A visitor's address lives in that cookie, so if the secret is lost or replaced, every visitor loses their address. The file is ignored by git.

To rotate the secret later, list several values separated by commas. The leftmost one signs new cookies; the others are only used to verify old ones.

### 5. First deploy

From the repository root:

```bash
cd ..
pnpm run deploy:first
```

This builds the frontend (every page is prerendered), builds the Worker, creates the tables, and uploads the Worker together with the secret. It prints a `https://<worker>.<your-subdomain>.workers.dev` address. At this point the site already opens and can generate addresses.

### 6. Attach the domain and receive mail

In the Cloudflare dashboard:

1. **Attach the domain**: Workers & Pages → your Worker → Settings → Domains & Routes → Add → Custom domain, and enter the domain from `site.config.ts`.
2. **Turn on Email Routing**: open the domain → Email → Email Routing, and enable it. Cloudflare adds the DNS records needed to receive mail.
3. **Send all mail to the Worker**: Routing rules → Catch-all address → action "Send to a Worker", pick your Worker, and enable the rule.

### 7. Check that it works

- Open your domain and press "Generate address".
- Send an email to that address from any mailbox. It should appear on the page within a few seconds, without a refresh.
- If nothing arrives, first check that the catch-all rule from step 6 is enabled and points to your Worker, then look at the Worker's logs in the dashboard.

### Updating later

```bash
git pull
pnpm install
pnpm run deploy
```

`pnpm run deploy` is the same as the first deploy without the secret upload. New database migrations are applied automatically.

### Rebranding

- The site name in the header, footer and share cards comes from the domain in `site.config.ts`.
- The written content (`app/md`, `app/blog`, `app/i18n/locales`) says `smail.pw`, including the privacy policy and the terms. This command, run from the repository root, replaces it everywhere. Read the privacy policy and terms afterwards: they describe how smail.pw is run.

  ```bash
  git grep -lz "smail\.pw" -- app/md app/blog app/i18n/locales | xargs -0 perl -pi -e 's/smail\.pw/example.com/g'
  ```

- Icons and the share image are in `public/` (`favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `og.png`).
- `public/_redirects` holds redirects for smail.pw's own old URLs. Remove the ones you do not need.

## How it works

The repository holds two projects:

- **Frontend** (repository root): Solid 2 + StyleX, prerendered at build time into a static site (`dist/client`). No frontend code runs on a server.
- **Worker** (`worker/`): serves `/api/*`, the live inbox WebSocket and incoming mail, and ships the frontend build as static assets.

Storage:

- **D1**: one row of metadata per email (`emails`), and the messages from the contact form (`messages`).
- **R2**: the raw email, keyed by the email's id.
- **Session**: a signed cookie that holds the visitor's address. There are no accounts and nothing is stored per visitor.

What happens to an email:

1. Email Routing hands every message for the domain to the Worker's `email` handler.
2. The raw message goes to R2, then a metadata row goes to D1. A message over 5 MB is stored as body only.
3. The Worker tells the `InboxHub` Durable Object, which signals the pages that have that address open.
4. Those pages call `GET /api/inbox` again. Opening an email calls `GET /api/email/:id`, which checks that the email belongs to the address in the session, parses the raw message from R2 and returns its HTML. The page shows it in a sandboxed iframe.

## Local development

You need Node.js 22.18 or newer and pnpm.

```bash
pnpm install
cp worker/.env.example worker/.env
pnpm --filter smail-worker run migrate:local
pnpm run dev
```

`migrate:local` creates the tables in the local database. The beta `cf` CLI may keep running after it prints its result; press Ctrl+C once you see the output.

`pnpm run dev` starts both projects: the frontend on `http://localhost:5173` and the Worker on `http://localhost:8791`. The frontend proxies `/api` (including the WebSocket) to the Worker, so you only open 5173.

## Commands

From the repository root:

| Command | What it does |
| --- | --- |
| `pnpm run dev` | Local development, frontend and Worker together |
| `pnpm run build` | Build the frontend and prerender every page into `dist/client` |
| `pnpm run preview` | Build both projects and serve the full site on `http://localhost:8788` |
| `pnpm run check` | Type check, lint (Oxlint) and format check (Oxfmt) |
| `pnpm run format` | Format the code |
| `pnpm run deploy` | Build both projects, apply pending migrations, deploy |
| `pnpm run deploy:first` | The same, plus upload the secret; for the first deploy |
| `pnpm run deploy:dry-run` | Build and check without uploading |

From `worker/`:

| Command | What it does |
| --- | --- |
| `pnpm run migrate` | Apply pending migrations to the remote database |
| `pnpm run migrate:local` | Apply them to the local development database |
| `pnpm run messages` | List the 50 most recent contact-form messages from the remote database |

The Worker is configured in `worker/cloudflare.config.ts` and deployed with Cloudflare's `cf` CLI (beta). `wrangler` commands cannot read this configuration.

## Project layout

```text
site.config.ts           The one file to edit when deploying a copy
app/                     Frontend: Solid 2 + StyleX
  routes/                Pages (home, content pages, blog, contact, 404)
  components/            The mailbox window, email list, email view, message form
  ui/                    Component library and design tokens
  utils/inbox.ts         All inbox state for the home page
  api.ts                 Calls to the Worker's API
  md/, blog/             Content pages and blog posts, one folder per language
  i18n/                  Language list and one dictionary file per language
public/                  Files published as they are (icons, share image, _headers, _redirects)
vite/                    Small build plugins (Markdown parsing, 404 page, page dates)
worker/                  The Cloudflare Worker, a separate project
  src/index.ts           Entry: /api/*, incoming mail, Durable Object export
  src/contract.ts        API types shared with the frontend
  src/mail.ts            Stores incoming mail
  src/inbox-hub.ts       Live inbox push (Durable Object + WebSocket)
  migrations/            D1 migrations
  cloudflare.config.ts   Worker configuration
```

`AGENTS.md` (in Chinese) records the architecture rules and the lessons learned while building this.

## What it is for

Temporary addresses suit low-risk sign-ups, verification codes and one-off downloads. Addresses and emails are kept long-term by default, but with no guarantee, and an address lives only in the cookie of the browser that created it. Do not use it for banking, work, government, legal matters, or any account you need to recover later.
