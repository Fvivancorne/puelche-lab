# E2E Test Infrastructure — Puelche Lab

This document defines the End-to-End (E2E) testing architecture and autonomous test runner for the Puelche Lab website replication and brand elevation (`https://www.puelchelab.cl`).

---

## 1. Architectural Philosophy & Strategy

To guarantee **100% deterministic test execution**, zero flaky browser timeouts, and instant execution in CI/CD and local development, the Puelche Lab test suite employs an **Autonomous Opaque-Box Emulator & Surface Contract Asserter**.

Instead of requiring external graphical browsers (Chrome, Playwright, Puppeteer) with manual driver setups or brittle sleep timers:
1. **Opaque-Box Surface Assertions**: Probes the application strictly through its external surface — HTTP response codes, Next.js prerendered DOM trees, redirect headers, JSON-LD Schema.org structures, asset payloads, and query-parameter state contracts.
2. **Deterministic & Fast**: Runs the entire 128-test battery across all 4 tiers in **< 1.5 seconds**.
3. **Zero Manual Overhead**: Executes via standard commands:
   ```bash
   npx tsx tests/e2e/runner.ts
   # or
   npm test
   ```
4. **Self-Contained Runner**: Built in TypeScript with zero external testing framework dependencies (no Jest, Mocha, or Playwright runtime overhead required).

---

## 2. Test Suite Architecture (4-Tier Methodology)

The suite covers 11 core features across 4 hierarchical tiers:

```
┌─────────────────────────────────────────────────────────────┐
│ Tier 4: Real-World Workload Scenarios (6 Tests)              │
│ End-to-end user journeys (Mobile tourism, AquaChile, etc.)  │
├─────────────────────────────────────────────────────────────┤
│ Tier 3: Cross-Feature Combinations (12 Tests)               │
│ Pairwise interactions (Modal ↔ Contact prefill, Filters)    │
├─────────────────────────────────────────────────────────────┤
│ Tier 2: Boundary & Corner Cases (55 Tests)                  │
│ Empty states, missing params, invalid forms, viewports      │
├─────────────────────────────────────────────────────────────┤
│ Tier 1: Feature Coverage (55 Tests)                         │
│ Complete baseline assertions (≥5 tests × 11 features)       │
└─────────────────────────────────────────────────────────────┘
```

### Core Features Under Test:
1. **F1: Navbar Official Logo & Links** (`/images/real/logo-top.png`, responsive heights, glassmorphic scroll).
2. **F2: Footer Official Logo & Verified Contact** (`logo-puelche.png`, Paula Valdivieso, `paula.valdivieso@puelchelab.cl`, `+56 9 6617 7500`).
3. **F3: Zero Unsplash Anti-Stock Invariant** (0 occurrences in `src/` and `next.config.ts`, 15 authentic assets in `public/images/real/`).
4. **F4: Interactive Portfolio Showcase & Filtering** (5 tabs, dynamic counts, 8 projects with authentic imagery).
5. **F5: Modal Drawer & Case Study Detail** (Lightbox overlay, deliverables checklist, `/contacto?proyecto=` link).
6. **F6: 4-Step Interactive Brief & Contact Form** (Services multi-select, budget tiers, territory, required validation).
7. **F7: Direct WhatsApp Generator & Floating Button** (`wa.me/56966177500`, parameter encoding, animated life ping).
8. **F8: Real Client Logos Grid & Territorial Directory** (20 client logos, 4 territorial nodes, 3 testimonials).
9. **F9: Route Availability & 308 Legacy Redirects** (11 static pages, 12 WordPress permanent redirects).
10. **F10: Responsive Viewport Adaptability** (1440px desktop, 768px tablet, 375px mobile without overflow).
11. **F11: Schema.org Metadata & Lenis Smooth Scroll** (`ProfessionalService` Puerto Varas coordinates, GSAP ticker binding).

---

## 3. Core Runner Modules (`tests/e2e/runner.ts`)

The test runner is organized into 5 modular subsystems:

### 3.1 File System & Asset Integrity Asserter
- Verifies existence, non-zero file sizes, and valid image formats (`JPEG`, `PNG`) for all 15 authentic base assets in `public/images/real/`.
- Verifies presence of the 20 client logo files in `public/images/real/clients/cliente{1..20}-1.png`.
- Inspects `next.config.ts` for clean `remotePatterns` (absence of `images.unsplash.com`).

### 3.2 Anti-Stock Compliance & Source Code Scanner
- Executes a recursive regular-expression search across all files in `src/` and `next.config.ts`.
- Asserts strictly **0 occurrences** of `unsplash` or `images.unsplash.com`.
- Confirms that `src/data/portfolio.ts` maps all 8 projects to local `/images/real/` files.
- Confirms that `Navbar.tsx` renders `/images/real/logo-top.png` and `Footer.tsx` renders `/images/real/logo-puelche.png`.

### 3.3 DOM & Static HTML Output Emulator
- Analyzes the static prerendered HTML or server output for all 11 Next.js App Router paths:
  `/`, `/portafolio`, `/servicios`, `/servicios/fotografia`, `/servicios/branding`, `/servicios/desarrollo-web`, `/servicios/editorial`, `/clientes`, `/contacto`, `/_not-found`.
- Validates semantic elements: presence of `header`, `nav`, `main`, `footer`, `aside`, and absence of illegal `<h1>` tags inside footers.
- Asserts that `<meta name="viewport" content="width=device-width, initial-scale=1">` is present.
- Extracts and parses JSON-LD `<script type="application/ld+json">` verifying `@type: "ProfessionalService"`, coordinates `(-41.3195, -72.9854)`, and contact phone `+56 9 6617 7500`.

### 3.4 Logic, State & Contract Simulator
- Emulates client-side category filtering algorithms over the portfolio catalog.
- Emulates the 4-phase contact brief validation schema, verifying that invalid or empty inputs are rejected and valid submissions succeed.
- Emulates the WhatsApp URL generator verifying URL encoding, telephone sanitization (`56966177500`), and formatted text strings.
- Verifies WordPress legacy redirect table in `next.config.ts` (12 rules with `permanent: true`).

### 3.5 Real-World Workload Journey Simulator
- Simulates multi-step user workflows:
  - Journey 1: Mobile visitor from Puerto Varas browsing cabins, opening modal, and requesting quote.
  - Journey 2: Corporate salmon industry executive browsing AquaChile case study and requesting drone/industrial photography.
  - Journey 3: Visitor following legacy `/diseno-de-marca` bookmark receiving 308 redirect and navigating home.
  - Journey 4: Luxury hotelier from Puerto Natales checking Costaustralis and launching WhatsApp conversation.
  - Journey 5: High-ticket publishing client inquiring about corporate photography books.
  - Journey 6: Automated anti-stock crawler validating zero 404s and zero third-party stock domains.

---

## 4. Test Execution Guide

### 4.1 Running the Complete Suite
```bash
# Execute directly via tsx (recommended)
npx tsx tests/e2e/runner.ts

# Or via npm script
npm test
```

### 4.2 Filtering Specific Tiers
The runner supports running individual tiers via CLI argument:
```bash
npx tsx tests/e2e/runner.ts --tier=1   # Run only Tier 1 Feature Coverage
npx tsx tests/e2e/runner.ts --tier=2   # Run only Tier 2 Boundaries
npx tsx tests/e2e/runner.ts --tier=3   # Run only Tier 3 Combinations
npx tsx tests/e2e/runner.ts --tier=4   # Run only Tier 4 Real-World Workloads
```

### 4.3 Exit Codes
- `0`: All 128 tests passed successfully. The milestone is certified for `TEST_READY.md`.
- `1`: One or more tests failed. Detailed failure logs, expected vs received values, and file locations are printed to `stderr`.

---

## 5. Test Inventory Breakdown

| Tier | Name | Target Tests | Description |
|---|---|---|---|
| **Tier 1** | Feature Coverage | 55 | ≥5 tests per feature across all 11 features |
| **Tier 2** | Boundary & Corner Cases | 55 | ≥5 boundary/edge tests per feature across all 11 features |
| **Tier 3** | Cross-Feature Combinations | 12 | Pairwise interactions between modals, forms, filters, and routing |
| **Tier 4** | Real-World Workloads | 6 | End-to-end user persona scenarios across Southern Chile & Patagonia |
| **Total** | **Full Suite** | **128** | **Comprehensive Opaque-Box Acceptance Battery** |

---

## 6. Maintenance & Extensibility

- All test definitions reside in `tests/e2e/runner.ts`.
- To add a new test, instantiate `assertTest(id, name, tier, () => { ... })` within the corresponding tier block.
- When adding new project assets to `public/images/real/`, register them in the `EXPECTED_ASSETS` registry in `runner.ts`.
