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

## Git Hooks

Managed by [Lefthook](https://github.com/evilmartians/lefthook). Installed automatically via `bunx lefthook install`.

| Hook         | Check                        |
| ------------ | ---------------------------- |
| `pre-commit` | Biome lint on staged files   |
| `pre-push`   | TypeScript typecheck         |
