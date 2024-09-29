<p align="center">
  <span>
   English | 
   <a href="https://github.com/akazwz/smail/blob/main/README.zh_CN.md">简体中文</a>
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
  <p>Use cloudflare worker to quickly build a temporary email service<p>
</div>

# Smail 📨
- 📁Use cloudflare email worker to receive emails
- 🖼Provide web application
- 💡Simplify the application, deploy it from the beginning, only need one worker

## Quick Start
- Click [Smail](https://smail.pw) to start
- Follow the instructions below to build your service

## Prerequisites
- cloudflare account
- Domain name in cloudflare and enable email routing function (enable in domain email settings)
- Create KV and D1 databases in Workers and Pages

## Self-built
- star this repository (not necessary, lmao, but thank you for the star)
- clone the repository, modify the KV id and D1 database id in wrangler.toml to your own
- Migrate the database, run pnpm wrangler d1 migrations apply smail --remote
- Deploy the worker, run pnpm run deploy
- Add environment variables, enter worker settings->variables and secrets: set COOKIE_SECRET: key for encrypting cookies, DOMAIN: your domain name
- Enter domain management->email->routing rules->Catch-all address. Here choose to send to the worker, and then select the created worker

finished: visit your worker, you can customize the domain name for the worker as needed. If the project is updated later, you can synchronize it in your forked repository, and it will be automatically deployed

## Credits
- [Email.ML](https://email.ml)

## Star History
[![Star History Chart](https://api.star-history.com/svg?repos=akazwz/smail&type=Date)](https://star-history.com/#akazwz/smail&Date)