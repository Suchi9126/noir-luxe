
# PROJECT CONSTRAINTS — READ BEFORE WRITING ANY CODE

## Project Overview
This is a multi-brand landing page SaaS built with:
- Next.js 14 (App Router)
- TypeScript
- Supabase (PostgreSQL + RLS)
- Deployed on Vercel
- Located at: ~/Desktop/noir-luxe

---

## Architecture Rules (NEVER break these)

### Reusability
- Every brand is driven by a config file in src/brands/[slug].ts
- NEVER hardcode brand-specific content (names, colors, images, phone numbers) inside components
- ALL components must accept brand config as props
- Adding a new brand = only create one new file in src/brands/ + seed Supabase
- NEVER create separate pages or components per brand
- NEVER commit .env.local to git.
- .env.local must stay local on the developer machine only.
- Use Vercel Environment Variables for production secrets.
- If a file named .env.local is already tracked by git, remove it from tracking but keep it locally.

### Supabase
- ONE Supabase project serves ALL brands
- Every table MUST have a brand_slug text column
- NEVER query without filtering by brand_slug
- Use NEXT_PUBLIC_SUPABASE_ANON_KEY (publishable key) in frontend — NEVER the service_role/secret key
- All queries go through src/lib/supabase.ts only
- Tables: menu_items, reservations, gallery_items, testimonials
- RLS is enabled — respect it, never suggest disabling it

### Next.js Rules
- NEVER put <style> tags inside React components — causes hydration errors
- All global styles go in src/app/globals.css or src/app/brand.css
- BrandPage component MUST use dynamic import with ssr:false
- Use "use client" directive on any component using useState/useEffect
- Environment variables with NEXT_PUBLIC_ prefix only for frontend
- Keep src/app/brand/[slug]/page.tsx as the single dynamic route

### File Structure (do not change this)
src/
├── app/
│   ├── brand/[slug]/page.tsx   ← single dynamic route
│   ├── globals.css
│   └── brand.css
├── brands/
│   ├── noir-luxe.ts            ← brand 1 config
│   └── cafe-bloom.ts           ← brand 2 config
├── components/
│   └── BrandPage.tsx           ← one component for ALL brands
└── lib/
    ├── supabase.ts             ← all DB functions here
    └── getBrand.ts             ← getBrand(slug) and getAllSlugs()

---

## Design Rules

### Colors & Fonts
- Each brand has its own accentColor and bgColor in its config
- NEVER hardcode hex colors in components — always use brand.accentColor
- Font: Cormorant Garamond (display) + Helvetica Neue (body)
- Dark background always — this is a premium/luxury aesthetic

### UI Rules
- NO colored side borders on cards
- NO gradient buttons — solid accent color only
- NO generic 3-column icon grids
- NO centered text everywhere — left align by default
- Inline styles are fine for brand-dynamic values (colors)
- CSS classes for static styles (layout, animations)

### Animations
- Scroll reveal on all sections (opacity + translateY)
- Marquee ticker between hero and stats
- Floating WhatsApp button always visible
- NO janky or instant show/hide — always transition

---

## Supabase Data Per Brand
When seeding data for a new brand always include:
- brand_slug matching the brand's slug exactly
- menu_items with correct categories
- gallery_items with real Unsplash URLs
- testimonials with is_visible = true

---

## Deployment
- Platform: Vercel (single deployment)
- Env vars set in Vercel dashboard:
  NEXT_PUBLIC_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEVER commit .env.local to git
- .env.local must be in .gitignore

---

## When Adding a New Brand
1. Create src/brands/[new-slug].ts with all config fields
2. Register it in src/lib/getBrand.ts
3. Seed Supabase with brand_slug = '[new-slug]'
4. No other files need to change
5. URL is automatically: /brand/[new-slug]

---

## What NOT to do
- NEVER suggest creating a separate Next.js project per brand
- NEVER suggest a separate Supabase project per brand
- NEVER put API keys in source code
- NEVER disable Row Level Security
- NEVER use localStorage (breaks in Vercel sandbox)
- NEVER create duplicate components for different brands
- NEVER hardcode menu items or gallery images in components
- NEVER use <style> tags inside JSX

---

## Current Brands
- noir-luxe → Fine dining restaurant, Bengaluru
- cafe-bloom → Specialty cafe, Bengaluru

## Brand Config Shape (TypeScript)
{
  slug: string
  name: string
  tagline: string
  type: string
  accentColor: string
  accentColorDark: string
  bgColor: string
  phone: string
  location: string
  instagram: string
  website: string
  offerBanner: string
  heroImage: string
  stats: { value: string; label: string }[]
  marqueeItems: string[]
  whatsappActions: { label: string; emoji: string }[]
}
