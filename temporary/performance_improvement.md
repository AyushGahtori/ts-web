# Performance Improvement Audit

Date: 2026-05-12
Project: `ts-web`
Framework checked: local `next@16.2.4` docs under `node_modules/next/dist/docs`

## Scope And Constraints

This pass focused on the non-excluded application/runtime surface:

- Root routing, layout, fonts, and global CSS delivery.
- `/voice-agent` client console.
- `/api/voice-agent/*` route handlers.
- `/api/callhippo/webhook` route handler.
- `src/lib/voice-agent/*` runtime store/dispatch helpers.
- Build/bundle configuration.

Per the request, I did not optimize, refactor, or redesign landing/home visual systems. The landing sections were read only for dependency awareness. The large visual/animation systems in `src/modules/landing/**`, `src/app/globals.css`, and related public assets remain intentionally unchanged except for moving where the landing stylesheet is imported.

## Local Next.js Documentation Consulted

The repository's `AGENTS.md` requires reading local Next docs before code changes because this is a newer Next version. The relevant docs read were:

- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- `node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`
- `node_modules/next/dist/docs/01-app/02-guides/production-checklist.md`
- `node_modules/next/dist/docs/01-app/02-guides/package-bundling.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/turbopackFileSystemCache.md`

Key guidance applied:

- Push client boundaries down and avoid shipping large client bundles where not needed.
- Use route/layout-level CSS placement so truly global CSS stays small.
- Use `next/font` to avoid external font loading, but keep font variables scoped to routes that use them.
- Lazy/code-split client work where appropriate.
- Use Turbopack analyzer output and route manifests for bundle inspection.

## Baseline Findings

### 1. Root layout shipped landing CSS and landing fonts to every route

Files involved before change:

- `src/app/layout.tsx`
- `src/app/globals.css`

Problem:

- The root layout imported `globals.css`, which contains thousands of lines of Tailwind output plus landing-specific animation and cinematic CSS.
- Because root layout CSS applies to every route, `/voice-agent` was forced to load and parse landing visual CSS even though it does not use the landing UI.
- The root layout also loaded `Monda` and `Monoton` font variables globally. `/voice-agent` only uses the general Inter interface font, so this created unnecessary font CSS and potential font work on a console route.

Why it mattered:

- Large global CSS delays style calculation and increases main-thread CSS parse work.
- Landing-only animation selectors, `:has(...)` rules, gradients, shadows, filters, and utility output were globally eligible on unrelated routes.
- Fonts should be route-scoped when only a route family uses them.

Optimization implemented:

- Created a tiny true-global stylesheet at `src/app/base.css`.
- Changed `src/app/layout.tsx:2-3` to import only Inter and `base.css`.
- Moved landing routes into a route group under `src/app/(landing)/`.
- Added `src/app/(landing)/layout.tsx:2-20` to import `globals.css` and apply `Monda`/`Monoton` variables only to landing routes.

Changed files:

- `src/app/layout.tsx:2-3`, `src/app/layout.tsx:20`
- `src/app/base.css:1-37`
- `src/app/(landing)/layout.tsx:2-20`
- Moved without content changes:
  - `src/app/page.tsx` -> `src/app/(landing)/page.tsx`
  - `src/app/about-us/page.tsx` -> `src/app/(landing)/about-us/page.tsx`
  - `src/app/aboutus/page.tsx` -> `src/app/(landing)/aboutus/page.tsx`
  - `src/app/contact-us/page.tsx` -> `src/app/(landing)/contact-us/page.tsx`
  - `src/app/innovations/page.tsx` -> `src/app/(landing)/innovations/page.tsx`
  - `src/app/intelligence-hub/page.tsx` -> `src/app/(landing)/intelligence-hub/page.tsx`
  - `src/app/intelligencehub/page.tsx` -> `src/app/(landing)/intelligencehub/page.tsx`
  - `src/app/join-us/page.tsx` -> `src/app/(landing)/join-us/page.tsx`
  - `src/app/learnmore/[slug]/page.tsx` -> `src/app/(landing)/learnmore/[slug]/page.tsx`
  - `src/app/learnmore/[slug]/loading.tsx` -> `src/app/(landing)/learnmore/[slug]/loading.tsx`
  - `src/app/services/page.tsx` -> `src/app/(landing)/services/page.tsx`
  - `src/app/why-us/page.tsx` -> `src/app/(landing)/why-us/page.tsx`
  - `src/app/whyus/page.tsx` -> `src/app/(landing)/whyus/page.tsx`

Expected impact:

- Faster first-load CSS parsing for `/voice-agent`.
- Less global style invalidation risk on non-landing routes.
- Landing routes still keep their exact CSS and font variables.
- The `/voice-agent` client reference manifest now lists only root base CSS plus the voice-agent CSS module:
  - Root base CSS chunk: `static/chunks/0-v_hydzs5v7o.css`, 5,996 bytes in the build output.
  - Voice page CSS chunk: `static/chunks/0k6ih7.1k82eq.css`, 5,296 bytes in the build output.
  - Landing layout owns the large landing CSS chunk separately.

Tradeoff:

- Next.js docs note that global styles imported in nested layouts are not removed during client-side navigation after they have loaded. This optimization primarily improves direct/non-landing initial loads. A client navigation from a landing route to `/voice-agent` may retain previously loaded landing CSS until a full reload.

### 2. Turbopack dev filesystem cache was disabled

File:

- `next.config.ts:14`

Problem:

- `experimental.turbopackFileSystemCacheForDev` was set to `false`.
- Local Next 16.2 docs say filesystem caching is stable/default for development in this version.

Optimization implemented:

- Set `turbopackFileSystemCacheForDev: true`.

Expected impact:

- Faster repeated `next dev` startups and HMR sessions.
- Less repeated local compiler work.

Tradeoff:

- Slightly more `.next` cache usage on disk. This is appropriate for local development.

### 3. `/voice-agent` polling could overlap requests and rerender on unchanged data

File:

- `src/app/voice-agent/VoiceAgentConsole.tsx`

Problem:

- Calls were polled every 5 seconds with `setInterval`.
- Status was polled every 30 seconds with `setInterval`.
- Fixed intervals can start a new request before the previous request finishes.
- Every successful poll called `setCalls` or `setStatus` even when the payload was unchanged, causing unnecessary React work.

Optimization implemented:

- Added request controller refs at `VoiceAgentConsole.tsx:195-196`.
- `refreshCalls` now aborts a previous in-flight calls request before starting another one at `VoiceAgentConsole.tsx:206-237`.
- `refreshStatus` does the same for status at `VoiceAgentConsole.tsx:240-276`.
- Replaced fixed intervals with chained `setTimeout` scheduling at `VoiceAgentConsole.tsx:295-327`; the next poll is scheduled after the previous async poll completes.
- Kept immediate refresh on tab visibility return at `VoiceAgentConsole.tsx:289-293`.
- Added equality guards:
  - `callsEqual` at `VoiceAgentConsole.tsx:143-158`
  - `statusEqual` at `VoiceAgentConsole.tsx:161-181`
  - guarded `setCalls` at `VoiceAgentConsole.tsx:227`
  - guarded `setStatus` at `VoiceAgentConsole.tsx:266`
- Reduced static integration-status polling cadence from 30 seconds to 120 seconds at `VoiceAgentConsole.tsx:124`.

Expected impact:

- No polling pileups under slow network/server response.
- Far fewer idle rerenders when the call list has not changed.
- Reduced background CPU and JSON parse work.
- Less API pressure from status polling.

Tradeoff:

- Environment/config readiness shown by `/api/voice-agent/status` can take up to 120 seconds to refresh during an already-open tab, unless the tab regains visibility or the user schedules a call. Since this status comes from server env/config, it is effectively static in normal production operation.

### 4. `/voice-agent` downloaded full call records for a list UI

Files:

- `src/app/api/voice-agent/calls/route.ts`
- `src/app/voice-agent/VoiceAgentConsole.tsx`

Problem:

- The list UI only displays call id, phone number, contact name, objective, scheduled time, and status.
- The GET endpoint returned full call objects, including `systemInstruction`, `knowledgeBase`, provider data, and up to 50 events per call.
- This happened every 5 seconds.

Optimization implemented:

- Added `summarizeCall` at `src/app/api/voice-agent/calls/route.ts:15-24`.
- Added `GET /api/voice-agent/calls?view=summary` behavior at `src/app/api/voice-agent/calls/route.ts:64-72`.
- Preserved the existing full payload as the default behavior when `view=summary` is not present.
- Updated the console to fetch the summary endpoint at `VoiceAgentConsole.tsx:213`.
- Added a narrower `CallListItem` type and response validator at `VoiceAgentConsole.tsx:30`, `VoiceAgentConsole.tsx:49-72`.

Expected impact:

- Lower poll response payload size.
- Less server serialization work.
- Less browser JSON parse and memory churn.
- Existing API behavior is preserved for full consumers.

Tradeoff:

- Adds a second response shape. The console has its own validator for that shape to keep the client safe.

### 5. Date formatting allocated an `Intl.DateTimeFormat` per row render

File:

- `src/app/voice-agent/VoiceAgentConsole.tsx`

Problem:

- `formatDate` created a new `Intl.DateTimeFormat` for every call row render.

Optimization implemented:

- Hoisted a module-level formatter at `VoiceAgentConsole.tsx:125-128`.
- `formatDate` now reuses it at `VoiceAgentConsole.tsx:135-137`.

Expected impact:

- Less allocation and locale formatter setup during frequent poll/render cycles.

Tradeoff:

- The formatter uses the runtime's default locale at module evaluation time. Since call rows are rendered client-side after fetch, this remains aligned with the browser locale in normal use.

### 6. Dynamic polling endpoints did not explicitly disable caches

Files:

- `src/app/api/voice-agent/calls/route.ts`
- `src/app/api/voice-agent/status/route.ts`
- `src/app/api/callhippo/webhook/route.ts`

Problem:

- These endpoints are dynamic and power polling/webhook flows.
- They did not explicitly emit `Cache-Control: no-store, max-age=0`.

Optimization implemented:

- Added `noStoreHeaders` in:
  - `src/app/api/voice-agent/calls/route.ts:7-9`
  - `src/app/api/voice-agent/status/route.ts:5-7`
  - `src/app/api/callhippo/webhook/route.ts:6-8`
- Applied headers to JSON responses:
  - `calls` GET/POST at `src/app/api/voice-agent/calls/route.ts:67-86`
  - `status` GET at `src/app/api/voice-agent/status/route.ts:10-15`
  - webhook GET/POST responses at `src/app/api/callhippo/webhook/route.ts:25`, `36`, `47-50`, `66`

Expected impact:

- Avoids stale polling responses through browser/proxy caches.
- Makes dynamic intent explicit to maintainers and infrastructure.

Tradeoff:

- Prevents opportunistic caching of status data. This is intentional because the status route reflects runtime configuration and the client already polls it less often.

### 7. In-memory voice-agent store could grow indefinitely for mock records

File:

- `src/lib/voice-agent/store.ts`

Problem:

- The store pruned terminal calls after 24 hours, but `mocked` was not treated as terminal.
- The Map could grow beyond the 100 calls displayed because `MAX_LISTED_CALLS` only limited output, not retained memory.

Optimization implemented:

- Added `MAX_STORED_CALLS = 250` at `src/lib/voice-agent/store.ts:10`.
- Treated `mocked` as terminal at `src/lib/voice-agent/store.ts:12`.
- Extended `pruneStore` to remove oldest terminal calls when the store exceeds the cap at `src/lib/voice-agent/store.ts:65-83`.

Expected impact:

- Prevents unbounded memory growth in long-running local/server processes.
- Keeps scheduled/in-progress calls while clearing old terminal entries.

Tradeoff:

- Old terminal prototype records can be removed after the cap is exceeded. This matches the existing "local memory only" prototype behavior and does not affect active scheduled calls.

### 8. `/voice-agent` panels and call list had no rendering containment

File:

- `src/app/voice-agent/voice-agent.module.css`

Problem:

- The console uses panels, shadows, and a frequently updated call list.
- Without containment, updates in the call list can have a larger layout/paint invalidation area than necessary.

Optimization implemented:

- Added `overflow-x: clip` to the page at `voice-agent.module.css:8`.
- Added `contain: layout paint` to status card and panels at `voice-agent.module.css:54`, `voice-agent.module.css:106`, `voice-agent.module.css:242`.
- Added `content-visibility: auto` and intrinsic sizing to `.callList` at `voice-agent.module.css:231-232`.
- Added reduced-motion handling for the submit button at `voice-agent.module.css:316-324`.

Expected impact:

- More stable paint boundaries in the polling-updated list.
- Reduced off-screen rendering work for call list content.
- Better reduced-motion behavior without changing visual design for default users.

Tradeoff:

- `content-visibility` relies on browser support. Unsupported browsers ignore it safely.

## Bundle And Build Notes

Baseline build before changes:

- `npm run build` succeeded.
- Routes: 25 static pages generated; 3 dynamic API routes.
- Analyzer was run with `npx next experimental-analyze --output`.

After changes:

- `npm run build` succeeded.
- `npx next experimental-analyze --output` succeeded.
- `/voice-agent` remains static.
- The route manifest for `/voice-agent` now shows:
  - CSS: root `base.css` chunk plus `voice-agent.module.css` chunk.
  - JS: shared Next chunks plus the `VoiceAgentConsole` chunk.
  - No landing layout client modules or landing global stylesheet are attached to `/voice-agent`.

## Verification

Commands run:

- `npm run lint`
- `npm run build`
- `npx next experimental-analyze --output`
- HTTP smoke checks against the existing dev server on `http://localhost:3000`:
  - `GET /voice-agent` returned `200`, contained `Voice Agent Console`, and did not include common Next error overlay markers.
  - `GET /api/voice-agent/calls?view=summary` returned `200` and `{"calls":[]}`.
  - `GET /api/voice-agent/status` returned `200`.
  - `GET /api/voice-agent/calls?view=summary` included `Cache-Control: no-store, max-age=0`.

Lint status:

- No lint errors.
- Existing warnings remain in excluded landing files:
  - `.trunk/configs/svgo.config.mjs`
  - `src/modules/landing/sections/contact-us/ContactUsSection.tsx`
  - `src/modules/landing/sections/hero/Hero.tsx`

Those warnings were not fixed because they are inside excluded landing/home visual systems.

## Areas Intentionally Skipped

Skipped by request:

- `src/modules/landing/sections/hero/**`
- `src/modules/landing/sections/contact-us/**`
- `src/modules/landing/sections/frameworks/**`
- `src/modules/landing/sections/portfolio/**`
- `src/modules/landing/sections/about-visual/**`
- `src/modules/landing/sections/brand-footer/**`
- Other home/landing animation-heavy sections under `src/modules/landing/**`
- Creative motion CSS in `src/app/globals.css`
- Large homepage and landing assets under `public/home/**`
- Existing temporary visual check images in the repository root.

Notable skipped findings:

- Several landing/contact/hero files still use raw `<img>` elements where `next/image` may reduce LCP and bandwidth.
- Several public SVG/PNG assets are multi-megabyte files and should be revisited during the future landing redesign.
- `src/app/globals.css` still contains very large visual CSS and generated utility output. It is now route-scoped to landing, but the landing bundle itself remains heavy.
- Landing animation systems include scroll listeners, large paint areas, shadows, filters, backdrop filters, and canvas work. They were not modified because preserving the temporary landing motion identity was explicitly required.

## Future Recommendations

Highest value next steps after the landing redesign begins:

- Replace oversized generated image assets with optimized raster formats and responsive `next/image` usage.
- Split `src/app/globals.css` into true global base, route CSS, and CSS modules.
- Convert landing-only raw `<img>` usage to `next/image` where it does not alter animation behavior.
- Revisit landing animation scroll listeners with shared requestAnimationFrame scheduling and IntersectionObserver gating.
- Add `useReportWebVitals` once analytics are chosen, so route-level improvements can be confirmed with field data.
- Consider a small API integration test for `GET /api/voice-agent/calls?view=summary` to prevent payload regressions.
- If the voice-agent console becomes a production tool, move prototype memory storage to durable storage and paginate/virtualize the call history before increasing list size.
