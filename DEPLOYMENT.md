# Deployment Guide

QianTron is a **TanStack Start** app built with Vite. The Lovable Vite plugin uses **Nitro** under the hood, so the same source builds for any Nitro preset (Cloudflare, Vercel, Netlify, Node/Docker, etc.). Switch platforms by setting the `NITRO_PRESET` environment variable at build time.

| Target | Preset | Config file |
| --- | --- | --- |
| Lovable (default) | `cloudflare-module` | — (auto) |
| Vercel | `vercel` | `vercel.json` |
| Netlify | `netlify` | `netlify.toml` |
| Render / Railway / Fly | `node-server` | `Dockerfile` |
| Cloudflare (self-hosted) | `cloudflare-module` | `wrangler.toml` |
| Static export (SPA fallback) | `static` | — |

> The Lovable preview always builds with the default preset. External platforms below build independently from your GitHub repo.

---

## GitHub

Connect once (Plus menu → GitHub → Connect project). All platforms below then deploy from that repo. Optional CI at `.github/workflows/ci.yml` runs typecheck + build on every push.

## Vercel

`vercel.json` is committed. Steps:

1. Import the GitHub repo on Vercel.
2. Framework preset: **Other** (Vercel reads `vercel.json`).
3. No env vars required for the site itself. If you use Lovable Cloud, copy your Supabase publishable key as `VITE_SUPABASE_PUBLISHABLE_KEY`, etc.
4. Deploy — Vercel runs `NITRO_PRESET=vercel bun run build` and serves `.vercel/output`.

## Netlify

Create `netlify.toml`:

```toml
[build]
  command = "NITRO_PRESET=netlify bun run build"
  publish = "dist"
```

Then import the repo on Netlify.

## Render / Railway / Fly.io (Docker)

Use the Node preset with the included `Dockerfile`:

```bash
# builds .output/server/index.mjs
NITRO_PRESET=node-server bun run build
node .output/server/index.mjs
```

- **Render**: `render.yaml` is committed (web service on port 3000).
- **Railway**: `railway.json` is committed; Railway auto-detects `Dockerfile`.
- **Fly.io**: `fly launch --dockerfile Dockerfile`.

## Cloudflare Workers (self-hosted)

`wrangler.toml` is committed. Steps:

```bash
NITRO_PRESET=cloudflare-module bun run build
bunx wrangler deploy
```

You'll need a Cloudflare account and a Workers subdomain. Custom domains attach in the Workers dashboard.

---

## Media & CDN

Currently media is served from **Lovable's global CDN** at `/__l5e/assets-v1/...`. That CDN is Cloudflare-backed and globally cached, so latency is already low worldwide.

**When you deploy to Vercel/Netlify/Render/etc., these asset URLs still resolve** — the pointer files (`src/assets/*.asset.json`) contain absolute paths under `/__l5e/`, and Lovable's asset infrastructure serves them regardless of where the app itself is hosted, as long as the project remains linked to Lovable.

If you want to **fully leave** Lovable's CDN (mirror to your own Cloudflare R2, S3+CloudFront, Bunny, etc.):

1. Download every file from `src/assets/*.asset.json` → `url`.
2. Re-upload to your CDN.
3. Replace the `.asset.json` `url` field, or swap for a `.env`-driven `CDN_BASE_URL` prefix.

Ask the agent to run the migration once you have destination credentials.
