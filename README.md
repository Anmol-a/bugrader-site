# BugRadar marketing site

Next.js 14 (App Router) + TypeScript + Tailwind CSS.

## Structure

```
app/
  layout.tsx        shared nav + footer + fonts
  page.tsx           Home — hero, problem, how it works, live demo
  services/page.tsx  Services — what we monitor, alerts, dashboard preview,
                      comparison, secondary capabilities, technology
  about/page.tsx      About — team, industry fit, business impact
  contact/page.tsx    Contact — form + direct email
  api/contact/route.ts  form submission endpoint (see TODO below)
components/          shared UI: Nav, Footer, RadarScope, HowItWorksTimeline,
                      DemoConsole, VitalsRings, CompareTable, ContactForm,
                      SectionHeading
lib/content.ts       all page copy and data in one place — edit here first
```

## Run it

```
npm install
npm run dev
```

Then open http://localhost:3000.

## Before this goes live — known placeholders

- **Contact form doesn't send anywhere yet.** `app/api/contact/route.ts` only
  logs submissions to the server console. Wire it to a real provider (Resend,
  SendGrid, a CRM webhook) before relying on it, and add basic spam protection
  if the form is public.
- **Contact email is a placeholder** (`hello@bugradar.in` in `lib/content.ts`)
  — swap it once the domain and inbox exist.
- **Dashboard Preview numbers are illustrative**, not real telemetry. Labeled
  as a "sample view" in the copy — replace with real data once there's a
  dashboard to pull from.
- **Team section doesn't name a current employer** on purpose, since this is
  a side project. Add it explicitly if you want it named.
- **No pricing page** — the brief marks pricing as not finalized, so it's
  left out rather than invented.

## Design tokens

Colors, fonts and animation keyframes live in `tailwind.config.ts`. The
palette keeps the marketing pages light and reserves the dark "instrument
panel" look (`panel`, `panel-2`, `panel-line` colors) for the radar scope and
live-demo console specifically — it's meant to read as a product screenshot,
not the whole site's theme.
