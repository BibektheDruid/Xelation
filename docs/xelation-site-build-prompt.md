# XELATION — Website Build Prompt

> Give this whole document to the build agent. Everything under **§7 Source content** comes from the DJ and must be used word for word. Anything marked `[NEEDS DJ INPUT]` is unknown. Do not invent it.

---

## 1. Role and goal

You are building the first website for **XELATION**, a wedding and private-event DJ & MC (Instagram: [@its_xelation](https://instagram.com/its_xelation)). Xelation is the DJ's own name, so the brand *is* him. His package copy uses "we/our"; keep that voice throughout.

The site has one job: **turn a couple who found him on Instagram into a submitted inquiry that includes their date.** Every section either builds trust in the experience or moves the visitor toward the inquiry form.

Ship an MVP that looks like a premium, custom-designed brand, not a template. It is a single long-scroll page, designed for mobile first, with a working inquiry form that emails every lead to him through Resend.

- Use the **frontend-design** skill for the visual direction and component styling.
- Use **shadcn/ui** as the component base, and restyle it to fit the brand. No default shadcn look.

## 2. Who's visiting

- **Most visitors:** engaged couples on their phones, coming from an Instagram bio link or DM. Design for a 390px-wide screen first.
- They are comparing 3–5 DJs and want four answers fast: *Does this feel like our wedding? What does it cost? What's included? Is our date open?*
- **Also:** people planning private parties who want a custom quote. `[NEEDS DJ INPUT: which kinds of events he takes]`

## 3. Stack (fixed)

- Next.js (App Router, latest stable) + TypeScript, pnpm
- Tailwind CSS (latest) + shadcn/ui. Set it up with the shadcn CLI and add only the components you use.
- react-hook-form + zod, with **one schema shared by the client and the server**
- Resend Node SDK, called **only on the server**
- `next/font` for fonts, `next/image` for images
- Hosted on Vercel
- No CMS, database or login. Analytics are optional: Vercel's built-in only.

## 4. Design direction

**Concept: "When the lights drop."** This is the moment a reception turns from dinner into a dance floor. The top of the page reads black-tie: composed, editorial, expensive. As you scroll, the energy rises through light, motion and rhythm.

- **Color:** dark first. Use a near-black stage color (not pure `#000`), warm off-white text, and one warm metallic accent (champagne or brass) to signal luxury. Allow at most one extra "stage light" color, and use it sparingly for glows and motion. No neon purple-to-pink gradients.
- **Type:** headlines use a high-contrast display typeface with character. Body text and UI use a clean, very readable sans-serif. Set the XELATION wordmark in widely spaced capitals. Don't use Inter for everything, and don't use Playfair Display.
- **Signature motif:** in the hero, two stage-light beams cross to form the **X** of XELATION and sweep slowly through soft haze. Reuse the beam or light-sweep idea sparingly as transitions between sections. Add a subtle film grain over dark surfaces.
- **Motion:** slow and purposeful, like moving-head stage lights rather than a strobe. Use scroll-triggered reveals and a light-catching hover effect on the package cards. When the visitor's system asks for reduced motion (`prefers-reduced-motion`), show a still layout that looks just as good.
- **Avoid DJ clichés:** equalizer bars everywhere, stock photos of turntables, heavy frosted-glass effects, 🔥 hype copy.
- **The name:** XELATION reads as "elation" with an X. Lean into that feeling, the lift when the dance floor fills. Don't explain the name on the site unless the DJ confirms what it means.

**Before building any sections**, write a short summary of the design tokens: fonts, color tokens, spacing scale, corner radius and motion timings. Put them in the Tailwind theme and CSS variables so every shadcn component picks them up.

## 5. Voice

Match the DJ's own copy: polished, warm, confident, concrete, with short sentences. For example: *"A professional DJ experience focused on great music and exceptional sound."* No hype words ("epic", "insane", heavy use of "unforgettable") and no emoji.

Hero headline options (choose one or refine it, staying close to his wording):

- "From the ceremony to the last dance."
- "Great music. Exceptional sound. A night that flows."
- "Your wedding, on cue."

## 6. Page structure

One page with anchored sections, in this order:

1. **Header.** Sticky. Transparent over the hero, solid once the visitor scrolls. Wordmark on the left. Links: Packages · Private Parties · FAQ. Main button: **"Check your date"**, which jumps to `#inquire`. On mobile: a compact menu (shadcn Sheet), plus a "Check your date" bar fixed to the bottom of the screen once the visitor has scrolled past the hero.
2. **Hero.** Headline, then a one-line subhead: DJ & MC for weddings and private parties in `[NEEDS DJ INPUT: city/region]`. Main button "Check your date", second button "See packages". Uses the crossed-beam X visual.
3. **What you get.** Three pillars drawn only from what the packages include. No new claims.
   - **Music:** personalized music planning, must-play and do-not-play lists, requests.
   - **MC:** grand entrance, first dance, speeches and toasts, cake cutting and announcements.
   - **Sound & light:** professional sound systems and dance-floor lighting.
4. **Packages.** Three cards built from §7.
   - Signature is the featured card: more visual weight and a "Recommended" label. `[NEEDS DJ INPUT: is that label OK? Use "Most popular" only if it's true]`
   - Each card shows the name, price, one-line pitch, who it's for, its 5–6 most important inclusions, and a **"Book [Tier]"** button. The button scrolls to the form with that package already selected (`?package=signature#inquire`).
   - Luxury shows its price as "Starting at $2,800".
   - Below the cards, add a **"Compare everything"** view: an Accordion on mobile, a table on desktop. It lists every inclusion across the three tiers. A row can show a checkmark or a value, such as hours: "Up to 8" or "Up to 10".
5. **Optional enhancements.** The four add-ons in a slim band. `[NEEDS DJ INPUT: are these add-ons for Luxury only, or for every tier? The source lists them under Luxury.]`
6. **How it works.** Four steps: Inquire with your date → Consultation call → Plan your music and timeline → Enjoy the night. `[NEEDS DJ INPUT: does this match how he actually works?]`
7. **Private parties.** A short block: "Not a wedding? Private parties get a custom quote." Button **"Request a quote"** goes to the form with Event type set to *Private party* and Package set to *Custom quote*.
8. **Gallery.** A grid of 6 photo slots filled from the content file, ending with a "See more on Instagram" link. Until real photos arrive, show designed placeholders (light-beam gradients). Never show stock or AI-generated photos as if they were his events.
9. **Testimonials.** Show this section only if the content file has real testimonials. If it's empty, leave the section out entirely.
10. **FAQ.** A shadcn Accordion. Include only questions the source content can answer:
    - *What's the difference between the packages?* Essential covers music and sound. Signature is the full DJ & MC day, up to 8 hours. Luxury is up to 10 hours with premium sound and lighting.
    - *Can we add more hours?* Yes: extended DJ coverage is an optional enhancement.
    - *Do you do events other than weddings?* Yes: private parties, with a custom quote.
    - *Can we choose the music?* Yes: personalized music planning, must-play and do-not-play lists, and requests.
    - Keep policy questions (deposit, how far ahead to book, travel fees, backup equipment) in the content file as `TODO:` entries, hidden until the DJ answers them.
11. **Inquiry form** (`#inquire`). See §8.
12. **Footer.** Wordmark, Instagram link, inquiry email `[NEEDS DJ INPUT]`, service area, © year.

## 7. Source content (use word for word)

**Price summary:** Essential $1,800 · Signature $2,300 · Luxury starting at $2,800 · Private parties: custom quote.

### ESSENTIAL — $1,800

A professional DJ experience focused on great music and exceptional sound.

Perfect for couples who already have their wedding timeline and … `[NEEDS DJ INPUT: rest of this sentence]`

Includes: `[NEEDS DJ INPUT: full list, cut off in the source screenshots]`

### SIGNATURE — $2,300

Our complete wedding DJ & MC experience, from ceremony to the dance floor.

Designed for couples who want their music, announcements, and reception flow professionally handled throughout the day.

Includes:

- Up to 8 hours of DJ & MC service
- Upgraded professional sound system
- Dance-floor lighting
- Wireless microphone
- Ceremony music
- Cocktail hour music
- Dinner & reception music
- Personalized music planning
- Must-play & do-not-play list
- Music requests
- Grand entrance coordination
- First dance coordination
- Speech & toast coordination
- Cake cutting & special announcements
- `[NEEDS DJ INPUT: does the list go on? For example, professional setup & teardown]`

### LUXURY — Starting at $2,800

The ultimate wedding entertainment experience with upgraded production and an elevated atmosphere.

For couples who want more than great music. Luxury is designed to turn your reception into a full entertainment experience with premium sound, expanded lighting, and optional atmospheric effects.

Includes:

- Up to 10 hours of DJ & MC service
- Premium sound system
- Expanded dance-floor lighting
- Additional lighting effects
- Ceremony music
- Cocktail hour music
- Dinner & reception music
- Personalized music planning
- Must-play & do-not-play list
- Music requests
- Customized introductions & announcements
- Grand entrance coordination
- First dance coordination
- Speech & toast coordination
- Cake cutting & special announcements
- Full reception timeline planning
- Special-request music sourcing
- Professional setup & teardown

`[NEEDS DJ INPUT: Signature includes a wireless microphone but Luxury doesn't list one. Is that a typo?]`

Optional enhancements:

- Fog / atmospheric effects
- Additional lighting
- Additional sound coverage
- Extended DJ coverage

### PRIVATE PARTIES — Custom quote

## 8. Inquiry form (email capture)

### Fields

All fields use restyled shadcn components.

| Field | Input | Required |
|---|---|---|
| Name | text | yes |
| Email | email | yes |
| Phone | tel | no |
| Event type | select: Wedding / Private party / Other (default Wedding) | yes |
| Event date | the browser's built-in date picker (most reliable on iPhone) + a checkbox "We haven't set a date yet" | yes, unless the box is checked |
| Venue or city | text | no |
| Estimated guests | number | no |
| Package | select: Essential / Signature / Luxury / Not sure yet / Custom quote. Pre-filled from `?package=` | no |
| Anything else? | textarea, 2,000 characters max | no |
| Hidden spam trap (a "honeypot" field, e.g. `company`) | hidden from view, `tabIndex={-1}`, `autocomplete="off"` | — |

### Behavior

- Check each field when the visitor leaves it and again on submit. Error messages should be plain and friendly.
- The submit button shows a sending state and is disabled while sending.
- **Success:** replace the form with a confirmation panel ("Got it. You'll hear from XELATION within `[NEEDS DJ INPUT: response time]`") and a line on what happens next.
- **Failure:** keep everything the visitor typed. Show an error with two other ways to reach him: a DM to @its_xelation on Instagram, or the inquiry email.

### Server: `app/api/inquiry/route.ts`

- Accepts POST only. Read the JSON body and check it against the shared zod schema. If it fails, return 400 with the errors for each field.
- If the hidden spam-trap field is filled in, return 200 `{ ok: true }` and send nothing.
- Send a notification email to `INQUIRY_TO_EMAIL` from `INQUIRY_FROM_EMAIL`.
  - The Reply-To header is the visitor's email address.
  - Subject: `New inquiry: {eventType} · {date or "date TBD"} · {name}`
  - Include a clean HTML body and a plain-text body listing every field.
- Only if `SEND_CONFIRMATION_EMAIL === "true"`, also send the visitor a short branded confirmation. Leave this off by default: until his domain is verified, Resend only delivers to the Resend account owner's own email address.
- Return `{ ok: true }` or `{ ok: false }`. Log Resend errors on the server. Never send the API key or raw Resend errors to the browser.

### Environment variables

List these in `.env.example` and explain them in the README:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key (server only) |
| `INQUIRY_TO_EMAIL` | Where leads are sent. Before his domain is verified, this must be the email that owns the Resend account. |
| `INQUIRY_FROM_EMAIL` | `XELATION <onboarding@resend.dev>` until his domain is verified, then something like `XELATION <inquiries@hisdomain.com>` |
| `SEND_CONFIRMATION_EMAIL` | `false` until his domain is verified |

## 9. Where the content lives

- All copy, prices, packages, inclusions, add-ons, FAQ, testimonials, gallery image paths, contact details and social links go in **one typed file: `src/content/site.ts`**. Components never contain copy directly.
- Each package keeps its own word-for-word `includes` list; the cards use this.
- A separate `comparison` array holds rows shaped as `{ label, essential, signature, luxury }`, where each value is `true | false | string`; the compare view uses this.
- Each price is written once and reused wherever it appears.
- Mark every unknown with the exact text `TODO:` so that `grep -rn "TODO:" src/content` lists everything still missing. When a section's data is empty, the section doesn't show.
- Images go in `public/images/`. Swapping a photo means dropping in a file and changing one path.

## 10. Guardrails

- **Do not invent:** testimonials, reviews, star ratings, client or venue names, years in business, number of events, awards, "as seen in" logos, response times, or policies (deposit, travel, cancellation). Leave them as `TODO:`.
- **Do not rewrite the package copy.** Only clean up the typography: curly quotes, dashes, consistent capital letters.
- Never show stock or AI-generated images as his events.
- No fake urgency, like "Only 2 dates left!"
- **Keep dependencies few.** Do the motion with CSS and a little JavaScript where possible. If an animation library is truly needed, use Motion and nothing else.

## 11. Definition of done

- The page looks deliberate and premium at 360, 390, 768, 1280 and 1536px widths, with no sideways scrolling.
- Lighthouse on mobile scores at least 90 for Performance and at least 95 for Accessibility, Best Practices and SEO.
- Text contrast meets WCAG AA. Everything works with a keyboard, with a visible focus outline. Screen readers announce form labels and errors.
- With `prefers-reduced-motion` on, the page is still and still looks good.
- **Form:**
  - Checks work in the browser and on the server.
  - A real submission delivers a well-formatted email whose Reply-To works.
  - Submissions that fill in the spam trap send nothing.
  - `RESEND_API_KEY` never appears in the code sent to the browser.
- **Tests:** unit tests cover the zod schema and the API route, with Resend mocked.
- Changing a price in `src/content/site.ts` updates it everywhere it appears.
- **SEO basics:** page title, meta description, a link-preview (Open Graph) image of the wordmark on dark, and a favicon made from the X mark. Add `EntertainmentBusiness` structured data (JSON-LD) once the service area is known.
- **README** covers: running the site locally, the environment variables, editing content, and deploying.
- `pnpm build` passes with no type or lint errors.

## 12. Open items (fill in before launch; never invent)

1. Essential tier: the rest of its description and its full list of inclusions
2. Signature tier: whether the list continues past "Cake cutting & special announcements"
3. Luxury tier: whether leaving out "Wireless microphone" is intended
4. Optional enhancements: Luxury only, or every tier?
5. Service area (city or region) and whether he travels
6. Inquiry email address and domain name
7. Types of private parties he takes
8. Photos and video (his own), plus a logo if he has one; otherwise we use the wordmark
9. Real testimonials, if he has any
10. Policies for the FAQ: deposit, how far ahead to book, travel fees
11. Usual response time for inquiries
12. Whether Signature can carry a "Recommended" or "Most popular" label
