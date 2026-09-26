# Website relaunch — phase 1

Branch: `relaunch`. Phase 1 = new positioning, structure, copy and custom SVG graphics.
Phase 2 (not started) = WebGL/React Three Fiber cell scene replacing the SVG story visual.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Fonts are self-hosted in `app/fonts/` (SIL OFL), so builds no longer need Google Fonts.

## What changed

- `app/page.tsx` — new homepage: Hero (mandated H1 + three claims, exact order) → The question → Platform story (4 chapters) → three differentiators → workflow → applications → **Beyond discovery** (clinical/translational, secondary) → evidence → contact.
- `components/site/` — `SiteHeader` (keyboard-accessible mobile menu), `HeroVisual`, `StoryScroll` + `StoryVisual` (one scene, four states), `Diagrams` (science, speed, mechanism, integration), `cells.tsx` (schematic cell primitives).
- `lib/blob.ts` — deterministic organic outlines (no runtime randomness, SSR-safe).
- `app/layout.tsx` — local fonts, new metadata. `app/opengraph-image.tsx` replaces the missing `/og.png`.
- `app/globals.css` — palette tokens (ink `#080D15`, paper `#F4F7F4`, teal `#68E4D4`, violet `#A49BE8`), focus styles, motion rules.
- Removed: `components/background/NetworkBackground.tsx`, `components/navigation/*` (no longer used).
- Unchanged: `/case-studies`, `/privacy`, `/thanks`, `/api/download/*`, sitemap, robots.

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

## Open blockers before production

See `CLAIMS.md`. In short:
1. Scientific sign-off on "Faster than imaging." and "More mechanistic than endpoint cytotoxicity." (no published comparison yet).
2. Confirm the company's relationship to the Nature Methods work and the actual service workflow.
3. Impressum / legal-entity details (none in repo).
4. Team / founder content (none in repo) — About/Team section intentionally omitted.
5. Brand spelling (InterAcTec vs Interactec).
