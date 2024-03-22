---
outline: deep
---

# Quick Start

This application uses the `Cloudflare Email Worker` to implement a temporary email service.

The body of which contains two parts

1. `Email Worker` - Receive mail
2. `Remix Web Application` - Showcase Mailer

## Preliminary

There are a few things we need to do to get the application deployed and ready for use.

### DataBases

The database used for this library is `SQLit` by `Turso`. (It is possible to use the individual free plans directly. Portal - [Turso](https://turso.tech))

![Turso Plan](/turso-plan.png)

### Cloudflare

This project utilizes cloudflare email services. So make sure you have a Cloudflare account to deploy and use the application. Portal - [Cloudflare Dashboard](https://dash.cloudflare.com/)

### Environment Variables

The following environment variables help the application to quickly use the relevant information.

```bash
# Cookie encryption secret, random string will do.
COOKIES_SECRET: xxxx
# Fetched from cloudflare, used for CAPTCHA
TURNSTILE_KEY: xxxx
# Get from turso, connect to database with
TURNSTILE_SECRET: xxx
# Get, connection credentials in turso
TURSO_DB_RO_AUTH_TOKEN: xxx
# Getting, connecting to database address in turso
TURSO_DB_URL: xxx
```

### Relevant Table

Viewable source file [0000_sturdy_arclight.sql](packages/database/drizzle/0000_sturdy_arclight.sql)

```sql
CREATE TABLE `emails` (
	`id` text PRIMARY KEY NOT NULL,
	`message_from` text NOT NULL,
	`message_to` text NOT NULL,
	`headers` text NOT NULL,
	`from` text NOT NULL,
	`sender` text,
	`reply_to` text,
	`delivered_to` text,
	`return_path` text,
	`to` text,
	`cc` text,
	`bcc` text,
	`subject` text,
	`message_id` text NOT NULL,
	`in_reply_to` text,
	`references` text,
	`date` text,
	`html` text,
	`text` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
```

### Deploying Email Worker

1. Execute the publish command in the current project

```bash
$ cd yourprojectpath/email-worker && pnpm run deploy
```

2. Find Email Worker in the workers-and-pages section of cloudflare and add the following environment variable to the settings:

```bash
# Get, connection credentials in turso
TURSO_DB_RO_AUTH_TOKEN: xxx
# Getting, connecting to database address in turso
TURSO_DB_URL: xxx
```

![Woker Env](/worker.png)

3. Enter the domain's email/email routing/routing rules Set catch-all action to send to worker, destination email-worker

### Deploying Web Application

1. Execute the deploy command on the current project

```bash
# This is a fly.io deployment. You can also use other methods, this is the standard remix project
$ cd yourprojectpath/apps/remix && fly launch
```

2. Add the above environment variables.

3. Deployment is complete. Visiting the deployed site is the same as the current example [https://smail.pw](https://smail.pw). Try it out.

![SMail](/smail.png)
