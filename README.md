# XELATION

Website for **XELATION**: wedding DJ & MC, private parties. [@its_xelation](https://instagram.com/its_xelation)

## What's here

| Path | What it is |
|---|---|
| [`preview/index.html`](preview/index.html) | Clickable design preview of the full site: desktop and phone views, the design system, and a working (simulated) inquiry form. One self-contained HTML file. |
| [`docs/xelation-site-build-prompt.md`](docs/xelation-site-build-prompt.md) | The build brief: stack, design direction, page structure, package copy (word for word), inquiry form + Resend spec, and open items. |

## View the preview

Open `preview/index.html` in any browser. The toolbar at the bottom switches between:

- **Site / Components**: the full page, or the design-system sheet
- **Desktop / Phone**: shows the site in a phone frame to check the mobile layout
- **Draft copy**: outlines copy that Xelation still needs to confirm

The form in the preview is simulated: it checks the fields and shows the confirmation, but sends nothing.

## Next

Build the production site from the brief: **Next.js + Tailwind + shadcn/ui**, with the inquiry form sending leads through **Resend**, hosted on **Vercel**.

Open items (Essential tier details, service area, inquiry email, domain, photos) are listed at the end of the brief.
