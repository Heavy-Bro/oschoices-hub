# OSChoices Hub

The hub site for [oschoices.com](https://oschoices.com) — a portfolio of free indie web tools.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · MDX · Resend · Supabase · Vercel

---

## Local Development

```bash
npm install
cp .env.example .env.local   # fill in your credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Adding a New App to lib/apps.ts

Open `lib/apps.ts` and add an entry to the `apps` array:

```typescript
{
  slug: "yourapp",
  name: "Your App Name",
  tagline: "One-sentence description.",
  url: "https://yourapp.oschoices.com",
  category: "utility",   // productivity | finance | creator | utility | entertainment
  status: "live",        // live | coming_soon | archived
  emoji: "🔧",
}
```

The app will automatically appear in the homepage featured grid (first 3 live apps), `/apps` page, and footer.

---

## Adding a New Blog Post

1. Create `content/blog/your-post-slug.mdx`
2. Add frontmatter:

```mdx
---
title: "Your Post Title"
date: "2026-05-10"
description: "One-sentence summary for SEO and card previews."
tags: ["tag1", "tag2"]
---

Post content here...
```

The post auto-appears on `/blog` and in the sitemap. Slug = filename without `.mdx`.

---

## Deploying a Change

```bash
git add .
git commit -m "your message"
git push origin main
```

Vercel auto-deploys from `main`. Production URL: `https://oschoices.com`.

---

## Adding a New Spoke App Subdomain in Vercel

1. Build the spoke app as a **separate Vercel project** (not inside this repo).
2. In Vercel dashboard for the spoke project → **Settings → Domains → Add**: `yourapp.oschoices.com`
3. In Namecheap **Advanced DNS**, add a CNAME:
   - Host: `yourapp` · Value: `cname.vercel-dns.com`
4. Add an entry to `lib/apps.ts` in this hub repo.

---

## Environment Variables

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project → Settings → API |
| `RESEND_API_KEY` | resend.com dashboard |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` locally; `hello@oschoices.com` in prod |
| `NEXT_PUBLIC_GA_ID` | GA4 → Admin → Data Streams → Measurement ID |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` locally; `https://oschoices.com` in prod |

---

## Supabase Schema

Run the migration in `supabase/migrations/20260505000000_create_subscribers.sql` via the Supabase SQL editor or `supabase db push`.

---

## Project Structure

```
app/                    Next.js App Router pages & API routes
components/             Header, Footer, AppCard, BlogCard, NewsletterForm
components/ui/          shadcn/ui primitives
content/blog/           MDX blog posts
lib/apps.ts             Single source of truth for all spoke apps
lib/blog.ts             Blog file-system utilities
lib/supabase.ts         Supabase client (lazy-initialized)
supabase/migrations/    SQL migrations
```
