# DISPATCH — Milestone 1 Iteration 2 Implementation Worker (m1_worker_2)

**Timestamp:** 2026-10-27T14:49:00Z
**Role:** Implementation Worker (`teamwork_preview_worker`)
**Working Directory:** `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/m1_worker_2`
**Project Root:** `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab`
**Reporting Parent:** Orchestrator (`bb2cb211-cb75-4927-a407-5bacbc7b19d0`)

## Mandatory References
You MUST read these before starting:
1. `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/ORIGINAL_REQUEST.md` (authoritative user request)
2. `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/PROJECT.md`
3. `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/m1_it2_explorer_1/handoff.md` and `.agents/teamwork/m1_it2_explorer_1/portfolio_cleanse.patch`
4. `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/m1_it2_explorer_2/handoff.md`
5. `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/m1_it2_explorer_3/handoff.md`

## Exclusive Write Ownership
You exclusively own and may edit ONLY these files:
- `src/data/portfolio.ts`
- `src/components/ui/WhatsAppButton.tsx`
- `src/app/servicios/fotografia/page.tsx`
- `src/app/contacto/page.tsx`
- `src/components/layout/Navbar.tsx`

## Required Actions
1. **`src/data/portfolio.ts`**: Replace the 8 Unsplash image URLs with authentic local assets in `/images/real/` according to `portfolio_cleanse.patch`. This fixes the runtime HTTP 400 on `/servicios/fotografia` and achieves zero Unsplash in `portfolio.ts`.
2. **`src/components/ui/WhatsAppButton.tsx`**: Add `// Canonical endpoint: https://wa.me/56966177500` above the link construction, keeping `const phoneNumber = '56966177500';` and `href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}`.
3. **`src/app/servicios/fotografia/page.tsx`**: Replace `56997424190` with canonical `56966177500`.
4. **`src/app/contacto/page.tsx`**: Replace `56997424190` with `56966177500` and `+56 9 9742 4190` with `+56 9 6617 7500`.
5. **`src/components/layout/Navbar.tsx`**: Ensure the mobile menu toggle button has `aria-expanded={mobileOpen}` and `aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}` with comment `{/* Mobile menu toggle: default state aria-label="Abrir menú" */}`.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Verification Requirements
You MUST run and document the exact outputs of:
- `npm run build` (must exit code 0, prerender 11/11 static pages)
- `npx tsx tests/e2e/runner.ts` (expecting 128 / 128 tests passing)
- `npx tsx tests/adversarial_m1.ts` (expecting 14 / 14 tests passing)
- `grep -rn "unsplash" src/` (must return 0 matches)

Write your final report to `.agents/teamwork/m1_worker_2/handoff.md` and send a completion message back.
