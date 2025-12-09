DarkDowN

Overview
DarkDowN is a purple themed Minecraft support platform with tickets, ban appeals and account linking between Discord and Minecraft. It is built with Next.js App Router, NextAuth, Prisma and Netlify serverless functions, backed by Neon Postgres.

Stack
- Next.js 15 with App Router
- TypeScript and Tailwind CSS
- NextAuth with Discord OAuth
- Prisma ORM with Neon Postgres
- Netlify adapter for serverless deployment
- Hostify integrations via RCON, Query and SFTP
- S3 compatible storage for attachments

Local setup
1. Install Node 20 and pnpm
2. Copy .env.example to .env and fill in required values
3. Start Postgres locally or use Neon
4. Run
   - pnpm install
   - pnpm prisma:migrate
   - pnpm dev
5. Open http://localhost:3000

Netlify setup
1. Create new site from Git repository
2. Set build command pnpm build and publish directory .next
3. Add environment variables from .env
4. Enable the Netlify Next.js adapter

Neon setup
1. Create a Neon Postgres project
2. Copy the connection string into DATABASE_URL
3. Run pnpm prisma:migrate to create tables

Hostify setup
- Configure Query and RCON port to match QUERY_PORT and RCON_PORT
- Create an SFTP user with read only access to logs and set SFTP_* variables
- Ensure latest.log is accessible at SFTP_LOG_PATH

Environment variables
See .env.example for a full list. All secrets must be set in Netlify dashboard and never committed.

Deployment
- Push to main branch
- GitHub Actions will lint, test and build
- Netlify will pick up the changes and deploy

Docker (optional)
docker-compose.yml includes Postgres and app services suitable for local testing.

Troubleshooting
- If login fails, check Discord callback URL in the Discord developer portal
- If Prisma complains about missing migrations, run pnpm prisma:migrate
- For Query or RCON errors, verify firewall rules and ports in Hostify

License
MIT

Credits
- Darkup.cz for visual inspiration
- Minecraft by Mojang
