# Project: Puelche Lab Website Replication & Redesign

## Architecture
- **Framework**: Next.js 16.4.3 (App Router) + Turbopack
- **UI Engine**: React 19 + TypeScript 5.7
- **Styling**: Tailwind CSS 3.4 (with custom typography & kinetic wipe tokens)
- **Virtual Smooth Scrolling**: Lenis 1.1.20 integrated with GSAP 3.12 ticker
- **Asset System**: 100% Genuine brand assets in `public/images/real/` (15 base assets + 20 client logos)
- **Zero-Tolerance Anti-Stock**: 0 occurrences of Unsplash across the entire codebase (`grep -r "unsplash" src/` must return empty)

## Code Layout
```
/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/
├── public/
│   └── images/
│       └── real/
│           ├── logo-top.png                    # Navbar horizontal cyan/white logo
│           ├── logo-puelche.png                # Stacked brand mark
│           ├── bg-home-2.jpg                   # Hero backdrop (Patagonian grass & mountains)
│           ├── bg-agencia.jpg                  # Studio manifesto backdrop (Valdivian rainforest)
│           ├── bg-portafolios-fotografia-*.jpg # Genuine portfolio project photographs
│           └── clients/                        # 20 real client logos (cliente1..20)
├── src/
│   ├── app/
│   │   ├── layout.tsx                          # Root layout, fonts, JSON-LD schema, Lenis
│   │   ├── page.tsx                            # Home: Hero, Manifiesto, Pilares, Featured, Clients, CTA
│   │   ├── portafolio/page.tsx                 # Filterable portfolio & modal drawer
│   │   ├── clientes/page.tsx                   # 20 Client logos grid, testimonials, territorial nodes
│   │   ├── contacto/page.tsx                   # 4-step interactive brief & direct WhatsApp
│   │   ├── servicios/
│   │   │   ├── page.tsx                        # Overview of 4 disciplines
│   │   │   ├── fotografia/page.tsx             # 4 optical disciplines & equipment
│   │   │   ├── branding/page.tsx               # Cross-media identity & case study
│   │   │   ├── desarrollo-web/page.tsx         # Next.js vs WordPress & Sur Terra case study
│   │   │   └── editorial/page.tsx              # Swiss layout & Viajes Falabella guide
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                      # Navbar with official logo-top.png
│   │   │   └── Footer.tsx                      # Footer with logo-puelche.png & real contact info
│   │   ├── providers/
│   │   │   └── SmoothScrollProvider.tsx        # Lenis smooth scroll
│   │   └── ui/
│   │       └── WhatsAppButton.tsx              # Floating WhatsApp to +56 9 6617 7500
│   └── data/
│       └── portfolio.ts                        # PORTFOLIO_PROJECTS, CLIENT_LOGOS, STUDIO_SERVICES
├── docs/
│   └── ledger.md                               # Formal verification ledger
└── tests/
    └── e2e/                                    # Requirement-driven opaque-box test suite
```

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Official Logo in Navbar | Render `/images/real/logo-top.png` replacing Lucide Wind icon | M1 | Survey R1 |
| 2 | Official Logo & Contact in Footer | Render `/images/real/logo-puelche.png` + Paula Valdivieso contact | M1 | Survey R1/R2 |
| 3 | Remove Unsplash from Services | Replace 3 Unsplash URLs in branding, editorial, and desarrollo-web | M1 | Survey R1 |
| 4 | Clean Remote Patterns in Config | Purge `images.unsplash.com` from `next.config.ts` | M1 | Survey R1 |
| 5 | Portfolio Data Zero-Unsplash | Map all 8 projects in `portfolio.ts` to `/images/real/bg-*.jpg` | M2 | Survey R1 |
| 6 | Interactive Portfolio Showcase | 5 filter tabs, project modal drawer, dynamic counts, responsive cards | M2 | Survey R2 |
| 7 | Hero Section with Genuine Asset | Render `bg-home-2.jpg`, kinetic text wipe, and Puerto Varas badge | M3 | Survey R2 |
| 8 | Agency Manifesto & Cross-Media | Render `bg-agencia.jpg`, Viento Puelche story, and 4 pillars | M3 | Survey R2 |
| 9 | Client Logo Asset Download | Download 20 client logos into `public/images/real/clients/` | M4 | Survey R2 |
| 10 | Real Clients Grid & Proof | Render 20 logos, testimonials, and 4 territorial nodes in `/clientes` | M4 | Survey R2 |
| 11 | Authentic Contact Brief | 4-step project brief, verified email/phone, direct WhatsApp generator | M4 | Survey R2 |
| 12 | E2E Test Suite Infrastructure | Autonomous test runner and assertion engine | E2E Track | Arch |
| 13 | Tier 1-4 Requirement Tests | 100% coverage across all 11 features with zero Unsplash validation | E2E Track | Arch |
| 14 | Final E2E Pass & Ledger Certification | Pass 100% of E2E test suite and record in `docs/ledger.md` | M5 | Acceptance |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Brand Identity & Core Layout | Navbar with official logo, Footer with real mark & contact, purge Unsplash from service pages, clean next.config.ts | none | DONE |
| M2 | Portfolio Showcase & Zero-Stock Data | Clean `portfolio.ts` (0 Unsplash), update `/portafolio` page and project modal | M1 | DONE |
| M3 | Home Page & Cinematic Atmosphere | Home Hero with `bg-home-2.jpg`, Manifiesto with `bg-agencia.jpg`, featured projects, pillars | M2 | DONE |
| M4 | Real Clients Grid & Contact Brief | Download 20 client logos, `/clientes` page with logo grid, `/contacto` page with 4-step brief | M1 | IN_PROGRESS |
| M5 | Final E2E Pass & Ledger Certification | Pass 100% of E2E test suite (Tiers 1-4), adversarial hardening (Tier 5), compile clean build, write `docs/ledger.md` | M1, M2, M3, M4, TEST_READY.md | PLANNED |
| E2E | E2E Testing Track | Independent opaque-box test runner covering Tiers 1-4; produces `TEST_READY.md` | none | DONE |

## Interface Contracts
### Navbar ↔ Application
- Logo image path: `/images/real/logo-top.png`
- Height: 32px to 40px (responsive `h-8 md:h-10 w-auto object-contain`)
- Links: `/` (Inicio), `/portafolio` (Portafolio), `/servicios` (Servicios), `/clientes` (Clientes), `/contacto` (Contacto)
- Theme: Glassmorphic with dynamic scroll detection (`scrolled` state)

### Portfolio Data Contract (`src/data/portfolio.ts`)
```typescript
export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'fotografia' | 'branding' | 'desarrollo-web' | 'editorial';
  location: string;
  year: string;
  image: string; // Strictly local /images/real/*, NEVER http/unsplash
  summary: string;
  deliverables: string[];
  metrics?: { label: string; value: string };
  href: string;
}
```

### Client Logos Contract (`public/images/real/clients/`)
- Format: PNG `cliente{1..20}-1.png`
- Display: Monochrome / grayscale with hover color or high-contrast filter on dark background
- Mapping: 20 verified regional and national corporate clients

### Contact Data Contract
- Lead Creative / Director: Paula Valdivieso
- Email: `paula.valdivieso@puelchelab.cl`
- Phone / WhatsApp: `+56 9 6617 7500` (`wa.me/56966177500`)
- Operating Hours: `Lunes a Viernes de 09:00 a 19:00 hrs.`
- Location: Puerto Varas, Región de Los Lagos, Chile
