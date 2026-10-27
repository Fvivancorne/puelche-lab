## 2026-10-27T14:11:49Z
You are m1_worker_1, the implementation Worker for Milestone 1 (Brand Identity & Core Layout) in the Puelche Lab project.
Your working directory is:
/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/m1_worker_1
The project root is:
/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

MANDATORY READ:
Read the following Explorer handoffs before executing any changes:
1. /Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/ORIGINAL_REQUEST.md
2. /Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/PROJECT.md
3. /Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/m1_explorer_1/handoff.md
4. /Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/m1_explorer_2/handoff.md
5. /Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/m1_spec_miner/handoff.md

Write Ownership:
You have exclusive write ownership of the following files:
- `next.config.ts`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/ui/WhatsAppButton.tsx`
- `src/app/servicios/branding/page.tsx`
- `src/app/servicios/editorial/page.tsx`
- `src/app/servicios/desarrollo-web/page.tsx`
- `src/app/layout.tsx` (synchronize telephone metadata to `+56966177500`)

Your Tasks:
1. Implement Navbar changes per m1_explorer_1:
   - Render official `/images/real/logo-top.png` via next/image (`h-8 md:h-10 w-auto object-contain`).
   - Remove `<Wind` Lucide placeholder icon from Navbar.
2. Implement Footer changes per m1_explorer_1:
   - Render `/images/real/logo-puelche.png` in the manifesto column.
   - Replace `<h1 ...>` with `<div ...>` on the colossal wordmark for semantic HTML5 compliance.
   - Inject verified contact data: Paula Valdivieso, paula.valdivieso@puelchelab.cl, +56 9 6617 7500, Instagram @puelche_lab, Puerto Varas.
3. Update WhatsApp Button (`src/components/ui/WhatsAppButton.tsx`):
   - Set `phoneNumber = '56966177500'`.
4. Update `next.config.ts` per m1_explorer_2:
   - Remove `images.unsplash.com` from `remotePatterns`.
5. Update Service subpages per m1_explorer_2:
   - `src/app/servicios/branding/page.tsx`: replace Unsplash with `/images/real/bg-portafolios-fotografia-h-min.jpg`.
   - `src/app/servicios/editorial/page.tsx`: replace Unsplash with `/images/real/bg-portafolios-fotografia-d-min.jpg`.
   - `src/app/servicios/desarrollo-web/page.tsx`: replace Unsplash with `/images/real/bg-home-2.jpg`.
6. Synchronize `src/app/layout.tsx` line 62 schema telephone to `+56966177500`.
7. Build & Verification:
   - Run `npm run build` and ensure exit code 0 and all 11 static routes compile without errors or warnings.
   - Verify `grep -rn "unsplash" src/app/servicios/` returns 0.
   - Verify `grep -rn "unsplash" next.config.ts` returns 0.
   - Verify `grep -rn "logo-top.png" src/components/layout/Navbar.tsx` matches.
   - Verify `grep -rn "logo-puelche.png" src/components/layout/Footer.tsx` matches.

Document your work, verification commands, and build results in:
/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/m1_worker_1/handoff.md
Follow the Handoff Protocol. When finished, send a message with your handoff path.
