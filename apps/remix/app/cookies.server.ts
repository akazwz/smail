import { createCookie } from "@remix-run/node";

const secrets = (process.env.COOKIES_SECRET as string)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export const userMailboxCookie = createCookie("userMailbox", {
  maxAge: process.env.COOKIES_MAX_AGE ? Number(process.env.COOKIES_MAX_AGE) : 60 * 60 * 24 * 1,
  secrets: secrets,
  httpOnly: true,
});
