# Dispatch Briefing — gen2_worker_1

## Mission & Objective
You are `gen2_worker_1`, the Implementation Worker (`teamwork_preview_worker`).
Your working directory: `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/gen2_worker_1`
Project Root: `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab`

## Authoritative Requirements & Explorer Sources
Read the authoritative user request at `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/ORIGINAL_REQUEST.md` (specifically the Follow-up section).
You are armed with the comprehensive, pre-validated solutions from the 3 Explorers:
1. `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/gen2_explorer_1/handoff.md` (R1 Header/Palette & R2 Home Storytelling)
2. `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/gen2_explorer_2/handoff.md` (R3 Portfolio Panoramic Bands & Cyan Pills)
3. `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/gen2_explorer_3/handoff.md` (R4 Clients Grid, Contact Form, JSON-LD, Test Runner Refactoring)

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Detailed Implementation Tasks
1. **R1: Color Palette & Header**:
   - `tailwind.config.ts`: Register `'puelche-cyan': '#59BFD6'`, `'puelche-slate': '#3B3D42'`, `'puelche-dark': '#1D2024'`, and `condensed: ['var(--font-condensed)', 'sans-serif']`.
   - `src/app/globals.css`: Define `--puelche-cyan: #59BFD6;`, `--puelche-slate: #3B3D42;`, `--puelche-dark: #1D2024;`.
   - `src/components/layout/Navbar.tsx`: Solid background `#3B3D42` (`bg-[#3B3D42]`), `/images/real/logo-top.png` on the left, uppercase condensed nav on the right: `HOME`, `PORTAFOLIO` (with dropdown to `/servicios/*`), `CLIENTES`, `CONTACTO`, plus `Cotizar Proyecto` CTA.
2. **R2: Home Page 3-Section 100vh Storytelling**:
   - `src/app/page.tsx`:
     - Section 1 (100vh): Foggy Patagonian forest (`bg-agencia.jpg`), colossal central white emblem (`logo-puelche.png` + "VIENTO CREATIVO" and subtitle "Un Estudio de Diseño Cross Media y Fotografía de Puerto Varas.").
     - Section 2 (100vh): Pasture with wooden fence (`bg-home-2.jpg`), central storytelling card on *¿Qué es Cross Media?*, studio equipment, air/land equipment.
     - Section 3 (Closing): Full block in Cyan `#59BFD6` with white geometric frame, titular `CONTACTANOS`, button `CONTACTO`, and social icons.
3. **R3: Portfolio Segmentation with Cyan Pills**:
   - `src/data/portfolio.ts`: Expand `PORTFOLIO_PROJECTS` with all 10 real photography clients (Estancia Rilán, Cala Melí, Costaustralis, Cabo de Hornos, Muebles Yunge, Tagua Tagua Lodge, AquaChile, Hotel Ohana, Maestranza San Aurelio, Soldasur) and their exact local image paths, preserving the 3 cross-media projects.
   - `src/app/servicios/fotografia/page.tsx`: Full-width 100vh panoramic photography bands for real clients with bottom-left Cyan `#59BFD6` pill cards (client, location, specialty, `VER FOTOGRAFÍAS` button) and interactive modal drawer.
   - `src/app/portafolio/page.tsx`: Panoramic visual presentation with bottom-left Cyan `#59BFD6` pill cards, preserving category filter tabs (`Todos`, `Fotografía`, `Branding`, `Desarrollo Web`, `Editorial`) and modal drawer.
4. **R4: Real Clients Grid & Contact Form**:
   - `src/app/clientes/page.tsx`: 100% Cyan background (`bg-puelche-cyan` / `#59BFD6`), 20 pure white client logos grid (`cliente1-1.png` to `cliente20-1.png`), canonical metadata export.
   - `src/app/contacto/page.tsx`: Form fields: Nombre y Apellido, Teléfono de Contacto, Correo Electrónico, Checkboxes de Solicitud (Fotografía, Sitio Web, Redes Sociales, Diseño Gráfico), Mensaje / Detalles, and cyan button `ENVIAR`. Direct contact info for Paula Valdivieso with Puerto Varas location badge.
   - `src/app/layout.tsx`: Re-inject `ProfessionalService` JSON-LD schema.
5. **Test Runner Alignment & Verification**:
   - `tests/e2e/runner.ts`: Update test assertions per `gen2_explorer_3/handoff.md §4.4` to test the authentic R1-R4 implementation.
   - Run verification commands:
     - `grep -rn "unsplash" src/` (must return 0)
     - `npm run build` (must compile cleanly with 0 errors)
     - `npx tsx tests/e2e/runner.ts` (target 100% pass)

## Handoff Requirements
Document all modified files, compilation output, test runner scores, and verification evidence in `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/gen2_worker_1/handoff.md`.
Send completion notification via `send_message`.
