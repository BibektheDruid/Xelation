# XELATION

Website for **XELATION**: wedding DJ & MC, private parties. [@its_xelation](https://instagram.com/its_xelation)

## What's here

| Path | What it is |
|---|---|
| [`index.html`](index.html) | The site: a self-contained page with the full layout and the inquiry form. Deployed at [xelation.vercel.app](https://xelation.vercel.app). |
| [`api/inquiry.js`](api/inquiry.js) | Vercel serverless function behind the form. Checks the fields and emails each lead through Resend. |
| [`.env.example`](.env.example) | The environment variables the form needs. |
| [`docs/xelation-site-build-prompt.md`](docs/xelation-site-build-prompt.md) | The build brief: stack, design direction, page structure, package copy (word for word), inquiry form + Resend spec, and open items. |

## View it

- **Live:** [xelation.vercel.app](https://xelation.vercel.app) shows the site as a visitor sees it.
- **Review mode:** [xelation.vercel.app/?preview](https://xelation.vercel.app/?preview) adds a toolbar at the bottom that switches between:

- **Site / Components**: the full page, or the design-system sheet
- **Desktop / Phone**: shows the site in a phone frame to check the mobile layout
- **Draft copy**: outlines copy that Xelation still needs to confirm

The form in review mode is simulated: it checks the fields and shows the confirmation, but sends nothing.

## Inquiry form

On the live site the form posts to `/api/inquiry`, which emails the lead to `INQUIRY_TO_EMAIL` with the visitor as Reply-To. Bots that fill the hidden `hp` field get a fake success and nothing is sent (logged as "spam trap"). The endpoint accepts JSON only.

**Before going public, add a rate limit:** Vercel > Project > Firewall > add a Rate Limit rule for path `/api/inquiry` (for example 5 requests per 60 seconds per IP). Without it, a script can flood the inbox and use up Resend's daily quota. Turn on `SEND_CONFIRMATION_EMAIL` only after that and after the domain is verified.

Set these in Vercel (Project Settings > Environment Variables), then redeploy:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key (server only) |
| `INQUIRY_TO_EMAIL` | Where leads go. Until the domain is verified in Resend, this must be the email that owns the Resend account. |
| `INQUIRY_FROM_EMAIL` | `XELATION <onboarding@resend.dev>` until the domain is verified |
| `SEND_CONFIRMATION_EMAIL` | `true` also emails the visitor a short confirmation. Keep `false` until the domain is verified. |

For local testing, copy `.env.example` to `.env.local` and run `vercel dev`; opening `index.html` directly has no `/api` to send to.

## Next

Build the production site from the brief: **Next.js + Tailwind + shadcn/ui**, with the inquiry form sending leads through **Resend**, hosted on **Vercel**.

Open items (Essential tier details, service area, inquiry email, domain, photos) are listed at the end of the brief.
