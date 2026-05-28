# QuantM

Marketing website for [quantm.work](https://quantm.work).

## Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://motion.dev/)
- [MDX](https://mdxjs.com/) for legal pages
- [Biome](https://biomejs.dev/) for linting and formatting
- [Lefthook](https://github.com/evilmartians/lefthook) for git hooks

## Development

```sh
bun install
bun dev
```

Open [localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description             |
| -------------- | ----------------------- |
| `bun dev`      | Start dev server        |
| `bun run build`| Production build        |
| `bun start`    | Serve production build  |
| `bun run lint` | Lint with Biome         |
| `bun run format`| Format with Biome      |
| `bun run typecheck` | TypeScript check   |
| `bun test`     | Publishing unit tests   |
| `bun run payload` | Payload CLI          |

## Publishing Engine

Payload CMS powers the blog at `/blog` and admin at `/admin`.

### Setup

```sh
vercel link
vercel blob create-store quantm-media --access public --yes
vercel env pull .env.local
```

Required env vars are listed in [`.env.example`](.env.example). For local Postgres:

```sh
docker run -d --name quantm-postgres \
  -e POSTGRES_PASSWORD=quantm \
  -e POSTGRES_USER=quantm \
  -e POSTGRES_DB=quantm \
  -p 5433:5432 postgres:16
```

Set `DATABASE_URI=postgresql://quantm:quantm@localhost:5433/quantm`.

### Auth

CMS login is Google-only via Better Auth at `/api/auth/*`. Payload admin reads the Better Auth session through a custom auth strategy.

1. In [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials), create a **Web application** OAuth client.
2. Add authorized redirect URIs:
   - `https://quantm.work/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google`
3. Add authorized JavaScript origins:
   - `https://quantm.work`
   - `http://localhost:3000`
4. Push secrets to Vercel:

```sh
vercel env add GOOGLE_CLIENT_ID production --value "..." --yes
vercel env add GOOGLE_CLIENT_SECRET production --value "..." --yes
# repeat for preview and development
```

Allowed emails default to `*@quantm.work` or set `ALLOWED_ADMIN_EMAILS`.

Database: Neon is provisioned via `vercel integration add neon`. Payload and Better Auth use `DATABASE_URL` automatically.

- `/blog`, `/blog/[slug]`
- `/rss.xml`, `/sitemap.xml`, `/robots.txt`
- `/api/knowledge`, `/api/indexnow`, `/api/revalidate`
- `/{INDEXNOW_KEY}.txt`

## Git Hooks

Managed by [Lefthook](https://github.com/evilmartians/lefthook). Installed automatically via `bunx lefthook install`.

| Hook         | Check                        |
| ------------ | ---------------------------- |
| `pre-commit` | Biome lint on staged files   |
| `pre-push`   | TypeScript typecheck         |
