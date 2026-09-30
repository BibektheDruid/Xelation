# XELATION

Website for **XELATION**: wedding DJ & MC, private parties. [@its_xelation](https://instagram.com/its_xelation)

## What's here

| Path | What it is |
|---|---|
| [`index.html`](index.html) | The site design: a self-contained page with the full layout and a working (simulated) inquiry form. Deployed at [xelation.vercel.app](https://xelation.vercel.app). |
| [`docs/xelation-site-build-prompt.md`](docs/xelation-site-build-prompt.md) | The build brief: stack, design direction, page structure, package copy (word for word), inquiry form + Resend spec, and open items. |

## View it

- **Live:** [xelation.vercel.app](https://xelation.vercel.app) shows the site as a visitor sees it.
- **Review mode:** [xelation.vercel.app/?preview](https://xelation.vercel.app/?preview) adds a toolbar at the bottom that switches between:

- **Site / Components**: the full page, or the design-system sheet
- **Desktop / Phone**: shows the site in a phone frame to check the mobile layout
- **Draft copy**: outlines copy that Xelation still needs to confirm

The form in the preview is simulated: it checks the fields and shows the confirmation, but sends nothing.

## Next

Build the production site from the brief: **Next.js + Tailwind + shadcn/ui**, with the inquiry form sending leads through **Resend**, hosted on **Vercel**.

Open items (Essential tier details, service area, inquiry email, domain, photos) are listed at the end of the brief.
