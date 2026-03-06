# DarkDowN

Moderní webová platforma pro Minecraft server DarkDowN: hráčský účet, ticket podpora, staff/admin workflow a připravené napojení na serverové služby.

## Aktuální stav (single source of truth)

- ✅ **Auth směr**: NextAuth Credentials (email / nick + heslo), Turnstile volitelně.
- ✅ **Účet**: `/me` jako chráněná account stránka.
- ✅ **Support**: ticket systém (`/tickets`) + helper/admin přístupové cesty.
- ✅ **Role**: `USER`, `STAFF`, `ADMIN` (+ UI VIP mapping přes env).
- ✅ **Admin tools**: `/admin`, `/admin/team` (správa helperů).
- ✅ **Mailer**: verify/reset + ticket notifikace přes Resend.
- ✅ **UI shell**: sjednocený layout s responzivní navigací a mobilním menu.

## Stack

- Next.js 15 (App Router)
- TypeScript + Tailwind CSS
- NextAuth (Credentials provider)
- Prisma ORM + PostgreSQL/Neon
- Resend (email)
- Hostify integrace (Query/RCON/SFTP)

## Lokální spuštění

1. Node 20+, pnpm
2. `cp .env.example .env` (nebo vlastní env)
3. Nastav DB (`DATABASE_URL`)
4. Spusť:
   - `pnpm install`
   - `pnpm prisma:migrate`
   - `pnpm dev`
5. Otevři `http://localhost:3000`

## Klíčové env proměnné

### Auth
- `NEXTAUTH_SECRET` (nebo fallback `AUTH_SECRET`)
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (volitelné)
- `TURNSTILE_SECRET_KEY` (volitelné)

### Role/access řízení
- `ADMIN_USER_IDS` – comma-separated user IDs s admin přístupem
- `HELPER_USER_IDS` – comma-separated user IDs helperů
- `MC_VIP_NICKS` – comma-separated nicky pro VIP badge v `/me`

### Mailer
- `RESEND_API_KEY`
- `MAIL_FROM`
- `TICKET_ADMIN_EMAILS`
- `TICKET_HELPER_EMAILS`

## Jak ze sebe udělat admina

Možnosti:

1. Nastavit userovi roli `ADMIN` v DB
2. Nebo přidat své user ID do `ADMIN_USER_IDS`

## Jak přidávat helpery

- Otevři `/admin/team`
- Vyplň email nebo MC nick
- Uživatel dostane roli `STAFF`
- Odebrání vrátí roli na `USER`

## Deployment

- Build: `pnpm build`
- Start: `pnpm start`
- Pro CI doporučeno: lint + test + build

## Poznámka k dokumentaci

Tento README odpovídá aktuálnímu směru projektu (credentials auth + ticket/admin/helper workflow).
Pokud se auth směr změní, první krok je aktualizace tohoto README.

## License

MIT
