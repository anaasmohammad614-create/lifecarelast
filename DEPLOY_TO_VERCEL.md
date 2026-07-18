# Deploying to Vercel

This project was scaffolded by Lovable using **TanStack Start**, and its build
tooling (`@lovable.dev/vite-tanstack-config`) **defaults to a Cloudflare
build target**, not Vercel. If you upload the original export as-is, Vercel
will build it, but the output format (a Cloudflare Worker) is not something
Vercel can run — the site will fail to serve correctly.

## What was fixed

In `vite.config.ts`, an explicit Nitro preset was added:

```ts
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "vercel",
  },
});
```

This tells the underlying Nitro server builder to output Vercel's
[Build Output API](https://vercel.com/docs/build-output-api/v3) format
(`.vercel/output/...`) instead of a Cloudflare Worker. This was verified
locally — `npm run build` now produces `.vercel/output/functions` and
`.vercel/output/static` correctly, so Vercel can deploy it with **zero
extra configuration**.

## Steps to deploy

1. **Push this folder to a GitHub/GitLab/Bitbucket repo.**
   (`.env` and `.vercel/` are already git-ignored — see below.)

2. **Import the repo in Vercel** → vercel.com/new → select the repo.
   - Framework Preset: leave as **Other** (auto-detected via Build Output API)
   - Build Command: `npm run build` (default, no change needed)
   - Output Directory: leave blank/default — Nitro's `vercel` preset writes
     directly to `.vercel/output`, which Vercel auto-detects.

3. **Add environment variables** in Vercel → Project → Settings →
   Environment Variables. Copy these from your local `.env`
   (values are in `.env.example` as a template, not filled in):
   - `SUPABASE_PROJECT_ID`
   - `SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_URL`
   - `VITE_SUPABASE_PROJECT_ID`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_URL`

   These are Supabase's public **anon** keys, not secret service-role keys,
   so there's no security issue in them being present in the client bundle —
   but they still need to be set in Vercel for the build/runtime to work.

4. **Deploy.** Vercel will run `npm install && npm run build` and pick up
   `.vercel/output` automatically.

## Local testing before you push (optional but recommended)

```bash
npm install
npm run build
npx vite preview        # sanity-check the static/client build
# or, closer to production:
npx nitro deploy --prebuilt   # uses Vercel CLI under the hood if configured
```

## Notes

- `.gitignore` was updated to exclude `.env` and `.vercel/` (neither was
  excluded in the original export — this matters if you're pushing to a
  public repo).
- `.env.example` was added as a template for teammates / redeploys.
- No other source files were changed — routes, components, Supabase
  integration, and styling are untouched.
