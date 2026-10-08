# Website relaunch

Current branch: `main`. Phase 1 introduced the scientific positioning, copy and custom SVG graphics.
Phase 2 added WebGL cell scenes (Three.js + React Three Fiber), with the SVGs kept as posters and fallbacks.
The sales-funnel V1 (8 Oct 2026) shortened the homepage and moved the longer scientific explanation to `/science`.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Fonts are self-hosted in `app/fonts/` (SIL OFL), so builds no longer need Google Fonts.

## Current sales funnel (V1)

- `app/page.tsx` — concise homepage: concrete offer and outcome → inputs/outputs → deliverables → three-step feasibility pilot → applications → compact evidence → feasibility request.
- `app/science/page.tsx` — the detailed method story, workflow and supported published demonstrations. Unsupported speed and endpoint-cytotoxicity comparisons are intentionally excluded.
- `components/site/forms.tsx` — the primary conversion is a feasibility request; submissions are validated server-side and stored in the existing Cloudflare R2 binding.
- `components/site/SiteHeader.tsx` — navigation now follows the buying journey and keeps the feasibility CTA visible on desktop and mobile.
- `app/layout.tsx` and `app/opengraph-image.tsx` — metadata and share image use the new offer-led positioning.
- `app/sitemap.ts` — includes `/science`.

## Earlier relaunch foundation

- `components/site/` — `SiteHeader` (keyboard-accessible mobile menu), `HeroVisual`, `StoryScroll` + `StoryVisual` (one scene, four states), `Diagrams` (science, speed, mechanism, integration), `cells.tsx` (schematic cell primitives).
- `lib/blob.ts` — deterministic organic outlines (no runtime randomness, SSR-safe).
- `app/globals.css` — palette tokens (ink `#080D15`, paper `#F4F7F4`, teal `#68E4D4`, violet `#A49BE8`), focus styles, motion rules.
- Removed: `components/background/NetworkBackground.tsx`, `components/navigation/*` (no longer used).
- Unchanged in V1: `/case-studies`, `/privacy`, `/thanks`, `/api/download/*`, robots and the submission backend.

## Design summary

- Two cell identities that never rely on colour alone: effector = teal, compact, dotted membrane; target = violet, larger, dashed envelope. Contact zone = hatched lens (not a fluorescence signal).
- Story: desktop uses one sticky scene driven by the active chapter (IntersectionObserver, no per-frame React updates, works scrolling back). The engaged pair shrinks into the double-positive quadrant of a two-marker plot; those same events then re-order into comparison columns.
- Mobile, tablet and `prefers-reduced-motion`: each chapter shows its own static visual; no pinning, no scroll-bound motion. All text is server-rendered and readable without JavaScript.
- Labels: "Schematic visualization" on every schematic; "Illustrative data — not experimental results" directly on both synthetic charts.

## Test report (lab, local production build, Chromium 141 headless)

| Check | Result |
|---|---|
| `next build` | ✅ passes |
| `tsc --noEmit` | ✅ clean |
| `eslint` | ⚠️ 1 pre-existing error in `app/thanks/ThanksClient.tsx` (setState in effect) — file untouched |
| Horizontal overflow at 360 / 390 / 768 / 1024 / 1366×650 / 1440 | ✅ none |
| Exactly one H1, heading hierarchy | ✅ |
| Duplicate IDs / broken in-page anchors | ✅ none |
| Routes `/case-studies`, `/privacy`, `/thanks`, `/api/download/ibd`, `/opengraph-image`, sitemap, robots | ✅ 200 |
| Keyboard: skip link → logo → nav → CTAs; visible focus | ✅ |
| Mobile menu: opens, Escape closes, focus returns to button | ✅ |
| JavaScript disabled: H1, three claims, all four chapters present | ✅ |
| Reduced motion: 4 static chapter visuals, sticky scene hidden | ✅ |
| Story forward and backward scrolling | ✅ state follows chapter both ways |
| Console / page errors | ✅ none |
| LCP (lab) desktop / mobile with 4× CPU throttle | 184 ms / 232 ms |
| CLS (lab) | 0 |
| Page weight | HTML 97 KB gzip, JS 152 KB transfer |

Not tested: Firefox and WebKit (not available in the test environment), real devices, field data (INP needs real users).

## Remaining business confirmations

See `CLAIMS.md`. In short:
1. Confirm who performs new sample acquisition and the commercial turnaround; V1 deliberately describes scoping an acquisition or re-analysis plan without assigning lab ownership.
2. Confirm the company's relationship to the Nature Methods work. The site says the method is published there but does not claim authorship or affiliation.
3. Keep legal-entity details and the Impressum current.
4. Team / founder content is intentionally omitted until approved source material exists.
5. Confirm brand spelling (InterAcTec vs Interactec) before the next brand pass.

---

# Phase 2 — WebGL scenes

## Stack

- `three@0.186.1`, `@react-three/fiber@9.8.1` (peer range React ≥19 <19.4 — project runs 19.2.3). No drei, no GSAP: scroll progress and damping are ~40 lines of our own code, so there is only one animation system.
- All 3D code lives in `components/three/` and is loaded through one dynamic entry (`scenes.ts`) → a single lazy chunk (~247 KB gzip) fetched on browser idle, after the text and CTAs are already interactive.

## How it works

| File | Role |
|---|---|
| `WebGLSlot.tsx` | Renders the SVG poster first; loads the scene only if WebGL exists, motion is allowed and the viewport qualifies; fades the canvas in after its first frame; on error or `webglcontextlost` the poster stays. Pauses continuous rendering off-screen (IntersectionObserver). |
| `HeroScene.tsx` | Effector + target cell in contact, hatched contact zone, sparse depth cells, minimal pointer parallax (fine pointers only), projected HTML labels. |
| `StoryScene.tsx` | One scene for all four chapters, driven by a single continuous scroll progress (0–3). Field cells and cell doublets become singlet and interaction events in a two-marker plot, then the interaction events re-order into comparison columns. Works forwards and backwards. |
| `shaders.ts` | Organic membrane (vertex noise displacement, finite-difference normals), rim light, identity textures (effector: surface dots; target: fine ridges), contact-zone hatch. Instanced dot shader that blends from shaded cell to flat data point. |
| `runtime.tsx` | Motion clock that freezes on pause, first-frame/ready signal, context-loss handling, adaptive pixel ratio (drops 0.5 steps while average frame time > 33 ms), HTML label projection. |
| `lib/motion-store.ts` | Pause state (persisted per browser), reduced-motion and WebGL detection, shared scroll progress. |
| `components/site/MotionToggle.tsx` | "Pause motion" button under the hero and the story scene (`aria-pressed`). |

Labels are HTML positioned over the canvas, never drawn inside WebGL. Canvas edges are softened with a CSS mask.

## Behaviour matrix

| Situation | Hero | Story |
|---|---|---|
| Desktop, WebGL, motion allowed | 3D | 3D sticky scene, scroll-driven |
| Mobile / tablet (< 1024 px) | 3D (pixel ratio ≤ 1.5) | Static SVG per chapter, no pinning |
| `prefers-reduced-motion` | SVG poster, no pause button | Static SVG per chapter |
| No WebGL / context lost / load error | SVG poster | SVG for the active chapter |
| JavaScript off | SVG poster | All chapters as text; SVG shows the first state |
| User pressed "Pause motion" | Idle motion frozen | Idle motion frozen; scroll still advances the explanation |

## Phase 2 test report (lab, local production build, headless Chromium 141 with SwiftShader software WebGL)

| Check | Result |
|---|---|
| `next build`, `tsc --noEmit` | ✅ |
| `eslint` | ⚠️ same single pre-existing error in `app/thanks/ThanksClient.tsx` |
| Hero renders in WebGL; four story states render and reverse | ✅ (screenshots) |
| No WebGL (`--disable-webgl`) | ✅ 0 canvases, posters visible, no errors |
| Reduced motion | ✅ 0 canvases, no pause button, static chapters |
| Forced context loss | ✅ canvas removed, poster back, no errors |
| Pause toggle | ✅ `aria-pressed` flips |
| Mobile 390 px, DPR 3 | ✅ hero canvas only (537 px backing store = DPR 1.5 cap), no overflow |
| Horizontal overflow 360–1440 px | ✅ none |
| LCP (lab) desktop / mobile 4× CPU | 136 ms / 184 ms — the H1 is the LCP element, not the canvas |
| CLS (lab) | ≤ 0.002 |
| JS transfer incl. lazy 3D chunk | ~398 KB (phase 1: 152 KB) |
| Console | Only environment messages (SwiftShader notices) and a `THREE.Clock` deprecation notice emitted inside React Three Fiber 9.8 |

**Not measured:** real GPU frame rates. The test machine renders WebGL in software, so fps numbers from it would be meaningless. Please check on a real laptop and a mid-range phone (Chrome DevTools → Rendering → Frame rendering stats); the adaptive pixel ratio will step down automatically if frames exceed 33 ms. Firefox and Safari are still untested.
