# Abdul Rehman — Portfolio

Single-page portfolio. Fully static: no server, no database, no CMS. `next build`
emits a folder of HTML/CSS/JS that any host will serve for free.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router) with `output: "export"` |
| 3D | React Three Fiber + Three.js + postprocessing (bloom, vignette) |
| Motion | Motion (`motion/react`) + Lenis smooth scroll |
| Styling | Tailwind v4 with a custom token layer in `app/globals.css` |
| Type | Instrument Serif (display) · Geist (sans) · Geist Mono (labels) |
| Contact | Web3Forms — a POST to their API, no backend of ours |

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site lands in ./out
```

## Where things live

```
lib/content.ts          every word on the page — edit here, not in components
app/layout.tsx          fonts, metadata, share card, smooth scroll
app/page.tsx            section order + JSON-LD structured data
components/scene/       the hero's 3D voice field
  VoiceField.tsx        the instanced bar field and its wave maths
  Scene.tsx             canvas, camera, bloom, device tuning
components/ui/Reveal.tsx  scroll-reveal wrappers
public/abdul-rehman-cv.pdf  the CV the Résumé link downloads
public/og.png           1200×630 share card
```

To change the copy — job bullets, metrics, skills, links — you only ever touch
`lib/content.ts`.

## Before deploying

1. **Contact form.** Get a free access key at <https://web3forms.com> (it only
   asks for your email) and put it in `.env.local`:

   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=your-key-here
   ```

   Without it the form still works — it falls back to opening the visitor's mail
   client with the message pre-filled.

2. **Site URL.** After the first deploy set `NEXT_PUBLIC_SITE_URL` to the live
   domain so the LinkedIn/Twitter preview image resolves, then redeploy.

3. **CV.** `public/abdul-rehman-cv.pdf` is the current one-page CV. Drop a new
   PDF at that path to update the download.

## Deploy

**Vercel** — push to GitHub, import the repo, accept the defaults. Add
`NEXT_PUBLIC_WEB3FORMS_KEY` and `NEXT_PUBLIC_SITE_URL` under Environment
Variables. Free tier, custom domain included.

**Anywhere else** — `npm run build`, then upload `out/` to Cloudflare Pages,
Netlify, GitHub Pages, or any static host. It is plain files.

## Notes

- The 3D field drops to fewer bars on phones and on machines reporting ≤4 cores.
- `prefers-reduced-motion` freezes the scene to a single rendered frame and turns
  off smooth scroll, the reveals, and the counters.
- With JavaScript disabled the whole page still renders and reads; only the
  canvas is replaced by a static gradient.
