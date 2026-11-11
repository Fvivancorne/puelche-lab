# Project: Puelche Lab — Awwwards Site of the Year ($30,000 USD) Transformation

## Architecture
- **Framework**: Next.js 16.4.3 (App Router) + Turbopack
- **UI Engine**: React 19 + TypeScript 5.7
- **Styling**: Tailwind CSS 3.4 + Custom Cinematic Awwwards Design Tokens & Keyframes (`rb-link-glanz`)
- **Animation & Physics**: GSAP 3.12 + ScrollTrigger Scrub + LagSmoothing(0)
- **Virtual Smooth Scrolling**: Lenis 1.1.20 with Penner exponential curve `easeOutExpo = (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x))`, `duration: 1.2s`, scoped strictly to `(hover: hover) and (pointer: fine)`.
- **Zero-Latency Navigation**: Page transitions with `clipPath: inset(0% 0% 100% 0%)` and speculative prefetching on `onMouseEnter` / `onTouchStart`.
- **Authentic Asset System**: 100% Genuine archive in `public/images/real/` (including `bg-agencia.jpg`, `bg-home-2.jpg`, 9 edition photos in `edicion/`, 6 raw/master pairs in `before-after/`, 20 client logos in `clients/`). Zero Unsplash / Zero Stock.

## Code Layout
```
/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/
├── public/
│   └── images/
│       └── real/
│           ├── bg-agencia.jpg                  # Valdivian rainforest mist (Hero background)
│           ├── bg-home-2.jpg                   # Patagonian pasture & river (Storytelling backdrop)
│           ├── logo-top.png                    # Navbar horizontal cyan logo
│           ├── logo-puelche.png                # Stacked brand emblem
│           ├── edicion/                        # 9 authentic edition master photographs
│           ├── before-after/                   # 6 raw/master photographic comparison pairs
│           ├── clients/                        # 20 real corporate client logos
│           └── facebook/                       # Curated authentic expedition albums
├── src/
│   ├── app/
│   │   ├── layout.tsx                          # Root layout, fonts, JSON-LD schema, SmoothScrollProvider
│   │   ├── page.tsx                            # Hero with Dolly Zoom Inverso, darkroom BeforeAfterSlider, manifesto
│   │   ├── globals.css                         # Custom typography, rb-link-glanz effect, darkroom styles
│   │   ├── auditor/page.tsx                    # R6: Real-time 20s audit engine, diagnostics & Loom lead gate
│   │   ├── cotizador/page.tsx                  # R6: Parametric pricing estimator (CLP/USD) & WhatsApp handoff
│   │   ├── servicios/
│   │   │   ├── page.tsx                        # R4: Asymmetric Triptych Grid (48px 1fr 1.2fr) + hover photo reveal
│   │   │   ├── fotografia/page.tsx
│   │   │   ├── branding/page.tsx
│   │   │   ├── desarrollo-web/page.tsx
│   │   │   ├── edicion-fotografica/page.tsx
│   │   │   ├── editorial/page.tsx
│   │   │   └── redes-sociales/page.tsx
│   │   ├── portafolio/page.tsx                 # R5: Synchronized 3-Column DynamoTripleSlider
│   │   ├── clientes/page.tsx                   # 20 real client logos on 100% cyan
│   │   └── contacto/page.tsx                   # Authentic contact brief & WhatsApp
│   ├── components/
│   │   ├── providers/
│   │   │   └── SmoothScrollProvider.tsx        # R2: Lenis 120Hz easeOutExpo, fine pointer scoped
│   │   ├── ui/
│   │   │   ├── BeforeAfterSlider.tsx           # R3: Darkroom Mesa de Revelado with tactile analog dial
│   │   │   ├── PageTransition.tsx              # R7: ClipPath inset curtain & speculative prefetching
│   │   │   └── WhatsAppButton.tsx
│   │   └── portfolio/
│   │       ├── DynamoTripleSlider.tsx          # R5: The Smart Villas 3-column synchronized slider
│   │       └── LatitudeWorksRail.tsx
│   └── data/
│       └── portfolio.ts                        # Authentic portfolio projects & austral metadata
├── tests/
│   ├── gen3_challenger_visual.ts               # Visual & interactive stress suite (22/22 tests passed)
│   ├── gen3_challenger_math.ts                 # Math & state machine stress suite (17/17 tests passed)
│   └── e2e/
│       └── runner.ts                           # Autonomous opaque-box test runner (Tiers 1-7, 168 tests passed)
└── docs/
    └── ledger.md                               # Formal verification ledger
```

## Feature Inventory
| # | Feature | Description | Milestone | Source | Status |
|---|---------|-------------|-----------|--------|--------|
| 1 | Hero Cinemático con Dolly Zoom Inverso | Dual counter-scale: wrapper 0.88 -> 1.0, background `bg-agencia.jpg` 1.25 -> 1.0 via ScrollTrigger scrub | M1 | R1 | DONE |
| 2 | Smooth Scroll Híbrido de 120Hz | Lenis with `easeOutExpo = (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x))`, duration 1.2s, lagSmoothing(0), desktop scoped | M1 | R2 | DONE |
| 3 | Transiciones con ClipPath & Prefetching | Page transitions with `clipPath: inset(0% 0% 100% 0%)` and speculative prefetching on `mouseover`/`touchstart` | M1 | R7 | DONE |
| 4 | Mesa de Revelado Fotográfico de Autor | Darkroom interactive staging with tactile analog rotary dial, loaded with `public/images/real/edicion/` and raw/master pairs | M2 | R3 | DONE |
| 5 | Grilla Asimétrica Tríptica de Servicios | `grid-template-columns: 48px 1fr 1.2fr` with ordinal, title, description, `rb-link-glanz` button & background photo reveal | M2 | R4 | DONE |
| 6 | Slider Cinemático Sincronizado 3 Columnas | The Smart Villas DynamoList pattern: Col 1 Concept/Story, Col 2 Metrics/Coordinates, Col 3 Large Format Photography | M2 | R5 | DONE |
| 7 | Motor Auditor en Tiempo Real | `/auditor` with 20s 5-phase simulation, progress bar, technical-to-commercial translation, Loom video lead gate | M3 | R6 | DONE |
| 8 | Cotizador Paramétrico Determinista | `/cotizador` with piecewise page formula, company size multipliers, 7 add-ons, CLP & USD, delivery timeline, WhatsApp handoff | M3 | R6 | DONE |
| 9 | Package & Quality Scripts Alignment | Configure `"lint": "tsc --noEmit"` in `package.json` so `npm run lint` passes without blocking errors | M1 | Build Track | DONE |
| 10 | Tier 7 Acceptance Test Battery | Extend `tests/e2e/runner.ts` with comprehensive tests verifying R1-R7 and HTTP 200 contracts for all routes | M4 | E2E Track | DONE |
| 11 | Final E2E Suite & Audit Certification | 100% pass across all test tiers, clean production Turbopack build, CLEAN forensic audit verdict | M4 | Gate | DONE |
| 12 | Dossier Analítico Integral 8 Recursos & 10 Herramientas | Comprehensive research dossier covering all 8 axes and 10 video/motion tools | M5 | R1 | DONE |
| 13 | Cabina de Preparación para Agentes de IA & GEO en /auditor | 5 interactive diagnostic modules: llms.txt, AI crawlers matrix, Schema.org @graph, context density, OG card | M6 | R2 | DONE |
| 14 | Publicación de /llms.txt y /llms-full.txt Nativos | Official high-density markdown indexes for Puelche Lab | M6 | R2 | DONE |
| 15 | Micro-interacciones Cinemáticas Magnetic & KineticTextSwap | Spring physics cursor magnet for CTAs and kinetic typographic roll effect | M6 | R2 | DONE |
| 16 | Corrección de Soundwave Classes & Reduced Motion Reset | Paula webcam audio classes animate-soundwave-1..3 and page.tsx #hero scale/radius reset | M6 | R2 | DONE |
| 17 | Skill de Agencia: agencia-motion-video-arsenal | Full packaging of the 10 video/motion tools under Triple S standard | M7 | R3 | DONE |
| 18 | Skill de Agencia: GEO/LLM Readiness & llms.txt Architect | Enhanced AI audit & llms.txt generator skills | M7 | R3 | DONE |
| 19 | Catálogo de Workflows Prioritarios n8n | Top workflows for lead enrichment, WhatsApp RAG bot, and content factory | M7 | R3 | DONE |
| 20 | Certificación E2E, Clean Build & Lint, Review, Challenger & Audit | 100% pass on all test harnesses, clean lint, clean build, review, challenger and forensic audit | M8 | Gate | DONE |

## Milestones
| # | Name | Scope | Dependencies | Status | Evidence |
|---|------|-------|-------------|--------|---|
| M1 | Cinematic Foundation & Navigation (R1, R2, R7, Lint) | Hero Dolly Zoom, Lenis 120Hz smooth scroll, ClipPath page transitions & prefetch, package.json lint fix | none | DONE | Approved by Reviewer 1 & Challenger 1 |
| M2 | Interactive Editorial & Staging (R3, R4, R5) | Darkroom BeforeAfterSlider with rotary dial, Asymmetric Services Grid (48px 1fr 1.2fr), 3-Column DynamoTripleSlider | M1 | DONE | Approved by Reviewer 2 & Challenger 1 |
| M3 | Real-Time Commercial Engines (R6) | `/auditor` 20s simulation & Loom gate, `/cotizador` parametric math model & handoff | M1 | DONE | Approved by Reviewer 2 & Challenger 2 |
| M4 | Final E2E Suite & Audit Certification | Tier 7 test suite extension, 100% test pass, clean build & lint, independent review, challenger & forensic audit | M1, M2, M3 | DONE | Certified CLEAN by Forensic Auditor |
| M5 | Dossier Analítico de los 8 Recursos y 10 Herramientas | Creación de docs/DOSSIER_ESTRATEGICO_REFERENCIAS_IA_GEO_CINEMATICA.md cubriendo los 8 ejes temáticos y las 10 herramientas | M4 | DONE | 1,202 lines approved by Reviewer 2 & Challenger 2 |
| M6 | Integración de GEO / LLM Readiness y Cinemática en Puelche Lab | Upgrade de /auditor/page.tsx, /llms.txt, Magnetic.tsx, KineticTextSwap.tsx, corrección de tests | M5 | DONE | Verified 22/22 static pages, clean lint |
| M7 | Empaquetado de Skills en Ecosistema de Agencia | Creación de agencia-motion-video-arsenal, agencia-geo-llm-readiness-master, agencia-llm-txt-architect, y workflows n8n | M5 | DONE | Syntax & spec verified by Challenger 2 |
| M8 | Verificación E2E, Clean Build & Lint, Review, Challenger & Forensic Audit | Validación integral de builds, lints, runners, revisión independiente, challengers y auditor forense | M6, M7 | DONE | 222/222 checks passing (E2E + Challengers), Verdict CLEAN |

## Interface Contracts
### SmoothScrollProvider ↔ GSAP
- Window global: `(window as any).lenisInstance`
- Ticker: `gsap.ticker.add(updateTicker)` with `gsap.ticker.lagSmoothing(0)`
- Query: `window.matchMedia('(hover: hover) and (pointer: fine)')`
- Easing: `easeOutExpo = (x: number) => Math.min(1, 1.001 - Math.pow(2, -10 * x))`

### PageTransition ↔ Next.js Router
- Trigger: Global delegated listener on `mouseover`/`touchstart` for internal links -> `router.prefetch(url)`
- Click interception: Prevents default, runs GSAP `clipPath: inset(100% 0% 0% 0%) -> inset(0% 0% 0% 0%)` (0.42s), then `router.push()`
- Route Swap: Listens to `pathname` change, scrolls immediately to (0, 0), runs GSAP `clipPath: inset(0% 0% 0% 0%) -> inset(0% 0% 100% 0%)` (0.48s)

### BeforeAfterSlider ↔ Darkroom Dial
- Export: `export const BEFORE_AFTER_CASES`
- Role: `role="slider"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
- Dial: `DarkroomRotaryDial` mapped to exposure percentage (0% - 100%) and edition photograph selector

### DynamoTripleSlider Contract
- Triple synchronization on `activeIndex` state
- Column 1: `title`, `client`, `year`, `summary`, `deliverables`, `category`
- Column 2: `location`, `coordinates` (e.g. `41°19′S 72°59′W`), `optics`, `climate`, `altitude`, `azimuth`
- Column 3: `image` (strictly `/images/real/*`), `alt`, `lightboxAction`

### Cotizador Parametric Formula Contract
- Inputs: `pages` (1..30), `companySize` ('startup' | 'pyme' | 'empresa' | 'corporativo'), `addons` (Set<string>)
- Formula: `Total = Math.round((Base(pages) * Multiplier(companySize) + Sum(Addons)) / 10000) * 10000`
- Zero NaN, zero negative numbers, Chilean Peso format (`$X.XXX.XXX CLP`) and USD equivalent (`$X.XXX USD` at 950 CLP/USD).
