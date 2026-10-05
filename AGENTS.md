<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Base44 dev environment

Single-service app: TanStack Start (Vite 8 SSR) storefront, package manager **bun**
(`bun.lock` + `bunfig.toml`; note `minimumReleaseAge = 86400`). All product data is
static in `src/data/catalog.ts` — there is no backend, database, or external API, and
no credentials are required.

Run it: `docker compose -f docker-compose.base44.yml up -d` → http://localhost:3000
(`oven/bun:1`, source bind-mounted, `bun install --frozen-lockfile && bun run dev --port 3000 --host 0.0.0.0`).
Edits hot-reload; no rebuild needed. `node_modules` lives in the `app_node_modules` volume.

Host allowlist: the compose service passes `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`
(platform-provided, `.e2b.app` wildcard) so the preview's rotating external hostname is
accepted — don't replace it with a fixed host list.

Verify: `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/` → 200, and routes
`/`, `/shop`, `/cart`, `/about`, `/checkout`, `/product/<slug>` all return SSR HTML.

