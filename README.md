# Vantage Wealth Management — Financial Health Check

A premium, interactive financial health assessment that generates qualified leads for Vantage Wealth Management. Built with React + Next.js + TypeScript + Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run prod     # serve production build
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `HUBSPOT_PORTAL_ID` | HubSpot portal ID for lead capture |
| `HUBSPOT_FORM_ID` | HubSpot form GUID for lead capture |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 Measurement ID |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity project ID |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta (Facebook) Pixel ID |
| `LEADS_DIR` | Directory for local lead storage (use a persistent volume on Render) |

All analytics and HubSpot integrations gracefully no-op when their IDs are unset.

## Architecture

```
app/
  layout.tsx              Root layout, fonts (Cormorant Garamond + DM Sans), SEO, analytics
  page.tsx                 Stage orchestrator (hero → assessment → results)
  globals.css             Design tokens, brand styles, accessibility
  api/submit-lead/route.ts  Lead capture endpoint (local store + HubSpot forward)
  robots.ts               SEO robots
components/
  Logo.tsx                Vantage brand mark (inline SVG)
  Hero.tsx                Hero section with trust indicators
  Assessment.tsx          Question interface with animated progress bar
  Gauge.tsx               Animated SVG semicircle gauge for overall score
  PillarCard.tsx          Per-pillar score card with animated donut ring
  ResultsDashboard.tsx    Full results dashboard with recommendations
  LeadCapture.tsx         Lead form (Name/Email/Phone/Meeting type)
  BookingCTA.tsx         Booking call-to-action linking to Dave's calendar
  confetti.ts             Premium confetti for high scores
  Analytics.tsx           GA4, Clarity, Meta Pixel script loader + event tracking
lib/
  questions.ts            16-question bank across 4 pillars
  scoring.ts              Scoring engine + recommendation engine + color logic
```

## Brand Design System (extracted from vantagewealth.ca)

| Token | Value |
|---|---|
| Navy (primary) | `#0D2F52` |
| Gold (accent) | `#CA902F` |
| Cream (surface) | `#F8F6F1` |
| Teal (secondary) | `#7EBEC5` |
| Heading font | Cormorant Garamond |
| Body font | DM Sans |
| Health green | `#2E9E5B` (Strong) |
| Health yellow | `#E0A104` (Needs Attention) |
| Health red | `#D4634A` (Priority) |

## Scoring Algorithm

Each question has 3 answers scoring 0 / 50 / 100. Pillar score = average of its 4 questions. Overall score = average of 4 pillars. Bands: ≥75 green, ≥50 yellow, <50 red.

## Deployment

### Render (render.yaml included)

1. Push this repo to GitHub.
2. In Render, create a new service from this repo (or use the included `render.yaml`).
3. Set the environment variables listed above.
4. Render auto-deploys on every push to the main branch.

### Lead data

Submissions are stored as JSON in `LEADS_DIR` and forwarded to HubSpot. On Render, mount a persistent disk and set `LEADS_DIR` to a path on that disk so advisors can review client results before meetings.

## Booking

The booking CTA links directly to Dave's Microsoft Bookings calendar:
`https://bookings.cloud.microsoft/bookwithme/user/a1aa02ef924444308479ede76996db34@vantagewealth.ca`
