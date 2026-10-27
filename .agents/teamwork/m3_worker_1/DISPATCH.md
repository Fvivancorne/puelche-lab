# DISPATCH — Milestone 3 Implementation Worker (m3_worker_1)

**Role:** Implementation Worker (`teamwork_preview_worker`)
**Working Directory:** `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/m3_worker_1`
**Project Root:** `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab`
**Reporting Parent:** Orchestrator (`bb2cb211-cb75-4927-a407-5bacbc7b19d0`)

## Mandatory References
You MUST read these before starting:
1. `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/ORIGINAL_REQUEST.md` (authoritative user request)
2. `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/PROJECT.md`

## Exclusive Write Ownership
You exclusively own and may edit ONLY this file:
- `src/app/page.tsx`

## Required Actions
1. **Hero Atmospheric Backdrop**:
   - In `src/app/page.tsx` under `<section id="hero">`, add Next.js `<Image>` referencing `/images/real/bg-home-2.jpg` (alt: "Patagonia Austral — Paisaje Puelche Lab", fill, priority, object-cover, with subtle opacity e.g. `opacity-15` or `opacity-20` and `pointer-events-none`) so the kinetic headline and action buttons remain perfectly readable, interactive, and crisp.
2. **Manifiesto Atmospheric Backdrop**:
   - In `<section id="manifiesto">`, add Next.js `<Image>` referencing `/images/real/bg-agencia.jpg` (alt: "Viento Puelche — Selva y Cordillera", fill, object-cover, with subtle opacity e.g. `opacity-20` or `opacity-25` and `pointer-events-none`) so the editorial text and metrics maintain high contrast.
3. **Preserve All Existing Contracts**:
   - Do NOT break any test assertion: keep `id="hero"`, `id="manifiesto"`, `id="servicios"`, `id="obras"`, `id="clientes-strip"`, `id="cta-cierre"`, `data-wipe-title`, and all existing links.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Verification Requirements
You MUST run and document the exact outputs of:
- `npm run build` (must exit code 0, 11/11 static pages generated)
- `npx tsx tests/e2e/runner.ts` (expecting 128 / 128 tests passing)
- `npx tsx tests/adversarial_m1.ts` (expecting 14 / 14 tests passing)
- `npx tsx tests/challenger_stress_m1.ts` (expecting 8 / 8 tests passing)
- `grep -rnI "unsplash" src/` (must return 0 matches)

Write your final report to `.agents/teamwork/m3_worker_1/handoff.md` and send a completion message back.

## 2026-10-27T15:23:45Z
You are m3_worker_1, Implementation Worker for Milestone 3 (Home Page & Cinematic Atmosphere) of Puelche Lab.
Your working directory is: /Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/m3_worker_1
Project root: /Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab
Parent orchestrator: bb2cb211-cb75-4927-a407-5bacbc7b19d0

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

MANDATORY: You MUST read /Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/ORIGINAL_REQUEST.md before starting work.
Also read your full dispatch at:
/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/m3_worker_1/DISPATCH.md
And reference:
/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/PROJECT.md

Exclusive write file:
- src/app/page.tsx

Tasks:
1. In `src/app/page.tsx` under `<section id="hero">`, add `<Image src="/images/real/bg-home-2.jpg" alt="Patagonia Austral — Paisaje Puelche Lab" fill priority className="object-cover opacity-15 pointer-events-none" />` with proper relative wrapper and z-index.
2. In `src/app/page.tsx` under `<section id="manifiesto">`, add `<Image src="/images/real/bg-agencia.jpg" alt="Viento Puelche Cordillera" fill className="object-cover opacity-20 pointer-events-none" />` with proper relative wrapper and z-index.
3. Preserve all IDs (`#hero`, `#manifiesto`, `#servicios`, `#obras`, `#clientes-strip`, `#cta-cierre`), `data-wipe-title`, and all existing elements.
4. Verify:
   - `npm run build` (code 0)
   - `npx tsx tests/e2e/runner.ts` (128/128 PASS)
   - `npx tsx tests/adversarial_m1.ts` (14/14 PASS)
   - `npx tsx tests/challenger_stress_m1.ts` (8/8 PASS)
   - `grep -rnI "unsplash" src/` (0 matches)
5. Write your report to /Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/m3_worker_1/handoff.md and send a completion message back.
