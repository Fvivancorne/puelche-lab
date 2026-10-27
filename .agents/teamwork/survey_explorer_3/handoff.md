# Handoff Report — Site Architecture, Brand Narrative & Feature Inventory: Puelche Lab

**Agent:** `survey_explorer_3` (Explorer Archetype)  
**Date:** 2026-10-27  
**Working Directory:** `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/survey_explorer_3`  
**Project Root:** `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab`  
**Target Platform:** `https://www.puelchelab.cl`  

---

## 1. Observation

### 1.1 Codebase & Asset Observations
1. **Logo & Real Assets (`public/images/real/`):**
   - Direct verification via Python PIL reveals 15 genuine assets extracted from `https://www.puelchelab.cl/wp-content/`:
     * `logo-top.png` (250x63, PNG, color/dark wordmark with Puelche wind symbol).
     * `logo-puelche.png` (412x282, PNG, full branding mark).
     * `bg-home-2.jpg` (1920x1010, JPEG, authentic hero photo).
     * `bg-agencia.jpg` (1920x1010, JPEG, studio & equipment photo).
     * `bg-portafolios-fotografia-min.jpg` (1920x1010, JPEG, Estancia Rilán Chiloé).
     * `bg-portafolios-fotografia-a-min.jpg` to `bg-portafolios-fotografia-i-min.jpg` (1920x1010, JPEGs: Cala Melí, Hotel Costaustralis, Hotel Cabo de Hornos, Tagua Tagua Lodge, Muebles Yunge, AquaChile, Hotel Ohana).
     * `bg-fotografia-6-min.jpg` and `bg-fotografia-9-min.jpg` (1920x1010, JPEGs).
2. **20 Live Client Logos on Server:**
   - Server inspection via `python3` HTTP requests confirmed 20 client logos hosted live at `https://www.puelchelab.cl/wp-content/uploads/2024/05/cliente{1..20}-1.png`, each returning HTTP 200 (sizes: 7.6 KB – 15.8 KB).
3. **Unsplash References Violation (`grep -r "unsplash" src/`):**
   - `src/data/portfolio.ts`: Lines 27, 41, 55, 69, 83, 97, 111, 125 (`image: 'https://images.unsplash.com/...'`).
   - `src/app/servicios/desarrollo-web/page.tsx`: Line 146 (`src="https://images.unsplash.com/photo-1500382017468-9049fed747ef..."`).
   - `src/app/servicios/editorial/page.tsx`: Line 119 (`src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800..."`).
   - `src/app/servicios/branding/page.tsx`: Line 122 (`src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e..."`).
   - Total: 11 occurrences in `src/`.
4. **Logo Rendering Non-Compliance:**
   - `src/components/layout/Navbar.tsx`: Lines 43–54 render an inline SVG Lucide icon `<Wind className="w-4 h-4 text-[#C29B63]" />` and raw text `"PUELCHE LAB"` instead of `<Image src="/images/real/logo-top.png" ... />`.
   - `src/components/layout/Footer.tsx`: Line 127 renders `<h1 className="font-sans font-black text-6xl ...">PUELCHE LAB</h1>`, missing the genuine logo and violating semantic hierarchy with an `<h1>` tag inside the footer.
5. **Authentic Contact & Team Data (Live WordPress Verification):**
   - URL: `https://www.puelchelab.cl/contacto/`
   - Exact email: `paula.valdivieso@puelchelab.cl` (Current code uses mock `hola@puelchelab.cl` or `contacto@puelchelab.cl`).
   - Exact phone: `+56 9 6617 7500` (Current code uses mock `+56 9 9742 4190` or `+56994356789`).
   - Exact schedule: `Lunes a Viernes de 09:00 a 19:00 hrs.`
   - Exact location: `Puerto Varas, Región de Los Lagos, Chile`.
   - Social links:
     * Instagram: `https://www.instagram.com/puelche_lab/` (Handle: `@puelche_lab`).
     * Facebook: `https://www.facebook.com/PuelcheLabPublicidad/`.
   - Native Form Fields in WordPress:
     * `Nombre y Apellido` (required text)
     * `Teléfono de Contacto` (required text)
     * `Correo Electrónico` (required email)
     * `Solicitud` (checkbox group: `Fotografía`, `Sitio Web`, `Redes Sociales`, `Diseño Gráfico`)
     * `Si tienes más detalles de tu solicitud, escríbelas aquí:` (textarea)
     * Submit button: `Enviar`

---

## 2. Logic Chain

### 2.1 Brand Narrative & Copywriting Architecture
- **Step 1 (Root Identity):** The live site header and manifestos define the company explicitly:
  * *"Un Estudio de Diseño Cross Media y Fotografía de Puerto Varas."*
  * *"Somos un Estudio de Diseño Cross Media y Fotografía en Puerto Varas. Pero, ¿Qué es Cross Media?, Nos referimos a que hacemos piezas gráficas para todos los medios, ya sean digitales, impresos, y/o audiovisuales. Contamos con un estudio de fotografía y grabación muy bien equipado, tenemos iluminación profesional y equipos de alta gama, tanto para hacer trabajos en tierra o desde el aire, que junto con las habilidades técnicas de nuestro equipo hacemos resaltar tu producto o servicio, haciendo que pase al frente en la vitrina del mercado."*
- **Step 2 (Metaphor of Viento Puelche):** In the portfolio and home sections:
  * *"Deslízate hacia abajo y mira lo que este viento ha dejado en cada uno de los servicios que tenemos."*
  * The Puelche wind is a warm, dry föhn wind from the Andes that clears rain clouds over Lake Llanquihue and sharpens visibility. The studio uses this as its creative metaphor: clearing visual noise and elevating brands to stand out cleanly in the market.
- **Step 3 (Philosophy of Corporate Identity):**
  * *"La Identidad Corporativa es mucho más que el logotipo: es el reflejo de la filosofía de la empresa, su manera de trabajar. Nuestro trabajo consiste en plasmar visualmente todos esos conceptos, hacer que sean perceptibles por las personas."*
- **Step 4 (Tone & Voice Synthesis):**
  * The voice is grounded, austere, and territorial. It emphasizes craftsmanship ("oficio"), industrial technical competence (full-frame cameras, 4K drones, darkroom retouching "sala de magia"), and regional autonomy (servicing Los Lagos, Chiloé, and Patagonia).

### 2.2 Services & Categories Mapping

| Legacy WordPress Section | URL Legacy | Modern Next.js Route | Strategic Scope & High-Ticket Transformation |
|---|---|---|---|
| **Fotografía y Edición** | `/fotografia-y-edicion-2/` | `/servicios/fotografia` | Photography of Architecture, Interiors, Hotels, Industrial Processes, Food, and 4K Aerial Drones. |
| **Edición Fotográfica** | `/edicion-fotografica/` | `/servicios/fotografia` | Advanced digital retouching ("sala de magia"), composite imagery, rescue and heavy machinery campaigns (Doosan, Fire Safe, Bomberos). |
| **Diseño de Marca** | `/diseno-de-marca/` | `/servicios/branding` | Visual Identity, brand strategy, subsea engineering robotics (Blue Seal, TRI Chile), medical aesthetics (Cirumed), marine rescue (San Ambrosio). |
| **Redes Sociales** | `/redes-sociales/` | `/servicios/branding` | Absorbed into branding as cross-media asset delivery (social guidelines, campaign creative) to prevent low-margin commodity positioning. |
| **Diseño Editorial** | `/diseno-editorial/` | `/servicios/editorial` | Print and digital publications, catalogs (Viajes Falabella, Anasac), environmental guides (Seremi Medio Ambiente), and the Patagonia Fine Art book. |
| **Desarrollo Web** | `/desarrollo-web/` | `/servicios/desarrollo-web` | Modern Next.js 16 high-performance headless architecture replacing slow legacy WordPress/Elementor. |
| **Nuestros Clientes** | `/nuestros-clientes/` | `/clientes` | Directory of 25+ real brands, 4 territorial nodes, and 20 verified client logos. |
| **Contacto** | `/contacto/` | `/contacto` | Multi-step interactive brief + direct WhatsApp + verified phone and email for Paula Valdivieso. |

### 2.3 Client Roster & Proof Ledger
From WordPress content extracts, CSS declarations, and public records:

1. **AquaChile** — National seafood and aquaculture leader; industrial process photography and export food photography.
2. **Estancia Rilán, Hotel y Cava** — Peninsula of Rilán, Chiloé; vernacular architecture, wine cellar, interior design, and brand identity.
3. **Doosan Bobcat Chile** — Heavy machinery for mining, forestry, and construction; field documentation and catalog graphics.
4. **Hotel Costaustralis** — Puerto Natales, Patagonia; hotel architecture and fjord-facing interior documentation.
5. **Hotel Cabo de Hornos** — Punta Arenas; heritage hotel art direction and hospitality photography.
6. **Tagua Tagua Lodge** — Tagua Tagua Lake / Puelo River; luxury ecotourism, fly fishing, and 4K aerial photography.
7. **Viajes Falabella & Falabella 2X** — Editorial design of corporate travel catalogs and Patagonia guide.
8. **Blue Seal Subsea Technologies** — Puerto Montt; subsea robotics and technical diving brand identity.
9. **Sur Terra Inmobiliaria** — Lake Llanquihue conservation land developments; web platform and drone inspection.
10. **Cala Melí Cabañas** — Puerto Varas; bioclimatic cabins and timber architecture.
11. **Muebles Yunge** — Puerto Varas; handcrafted native wood furniture studio photography.
12. **Cirumed** — Aesthetic medical supplies and clinical technology.
13. **Fire Safe** — Fire prevention and suppression systems for condominiums and buildings.
14. **Vigésima Compañía de Bomberos de Santiago** — High-risk rescue documentation.
15. **Carnaval del Sur** — Puerto Varas theater and masked performance festival.
16. **TRI Chile (TTI)** — Subsea robotics and marine engineering.
17. **RMH** — Emergency logistics and equipment.
18. **Centro Maqui** — Child development and therapy center.
19. **San Ambrosio** — Maritime towing, tugboats, and naval salvage.
20. **Seremi de Medio Ambiente (Región de Los Lagos)** — Scientific and ecological brochures.
21. **Anasac** — Agricultural brochures and field photo composites.
22. **Hotel Ohana** — Hospitality and leisure photography.
23. **Andesmaq** — Heavy industrial machinery.
24. **Gallo Negro** — Branding and gastronomy.
25. **Libro Autoral de Fotografías de la Patagonia** — Large-format fine art photography book.

### 2.4 Interactive & UI Feature Specifications

1. **Virtual Smooth Scrolling (Lenis):**
   - Active in `src/components/providers/SmoothScrollProvider.tsx`.
   - Bound to GSAP ticker: `lenis.raf(time * 1000)` and `ScrollTrigger.update`.
   - Settings: `lerp: 0.08`, `wheelMultiplier: 1.0`, `touchMultiplier: 1.5`.
2. **Responsive Navbar with Official Logo:**
   - Must import `<Image src="/images/real/logo-top.png" alt="Puelche Lab" width={160} height={40} priority className="h-8 md:h-10 w-auto object-contain" />`.
   - Eliminate Lucide `<Wind />` placeholder icon.
   - Dynamic background transition: transparent at top, `bg-[#F9F9F6]/90 backdrop-blur-md border-b border-[#E8E8E0]` after 40px scroll.
   - Mobile menu overlay with accessible navigation links and contact CTA.
3. **Hero Banner with Genuine Photography:**
   - Background image using `/images/real/bg-home-2.jpg` (or `bg-agencia.jpg`) with dark overlay (`bg-black/30` or subtle vignette) so text remains readable.
   - Kinetic reveal headline with GSAP wipe variables (`--wipe-lead`, `--wipe-trail`).
   - Geo-badge: *"Puerto Varas • Región de Los Lagos / Diseño Cross-Media & Fotografía de Autor"*.
4. **Interactive Portfolio Showcase & Modal/Lightbox:**
   - Filter chips: `Todos`, `Fotografía`, `Branding`, `Desarrollo Web`, `Editorial` with dynamic counts.
   - Grid cards: 16:10 aspect ratio, category pill, client tag, location badge, summary.
   - Modal drawer (`activeModalProject`): full-screen detail with deliverables checklist (`CheckCircle2`), context explanation, and "Cotizar propuesta similar" link passing URL parameter.
   - Replace all 8 Unsplash URLs in `src/data/portfolio.ts` with local `/images/real/bg-portafolios-fotografia-*.jpg`.
5. **Clients Logo Carousel or Grid:**
   - In `src/app/page.tsx` and `src/app/clientes/page.tsx`, replace text names with logo images.
   - 20 genuine logos available at `https://www.puelchelab.cl/wp-content/uploads/2024/05/cliente{1..20}-1.png`.
   - Can be downloaded into `public/images/real/clients/cliente{1..20}.png` and rendered in an animated marquee or infinite carousel.
6. **Working Contact Section (Brief + Verified Direct Channels):**
   - Direct Studio Contact Details:
     * Contact: Paula Valdivieso
     * Email: `paula.valdivieso@puelchelab.cl`
     * Phone / WhatsApp: `+56 9 6617 7500`
     * Hours: `Lunes a Viernes de 09:00 a 19:00 hrs.`
     * Location: `Puerto Varas, Región de Los Lagos, Chile`
     * Socials: Instagram `@puelche_lab`, Facebook `PuelcheLabPublicidad`
   - Interactive 4-step Form:
     * Phase 1: Service selection (Fotografía, Branding, Desarrollo Web, Editorial, Integral).
     * Phase 2: Investment range ($1.5M–$3M, $3M–$6M, $6M–$12M, +$12M CLP).
     * Phase 3: Region/territory (Puerto Varas, Puerto Montt, Chiloé, Carretera Austral, Magallanes).
     * Phase 4: Name, Company, Email, Phone, Description.
   - Direct WhatsApp Generator: `https://wa.me/56966177500?text=...` with full pre-filled project brief.
7. **Footer with Logo, Navigation Links, and Copyright:**
   - Must render `/images/real/logo-top.png` (or `logo-puelche.png`).
   - Fix semantic violation: replace `<h1 className="font-sans font-black text-6xl ...">PUELCHE LAB</h1>` with `<div className="font-sans font-black text-6xl sm:text-8xl md:text-9xl text-[#2A2B2E] select-none">PUELCHE LAB</div>`.
   - Correct contact links: `paula.valdivieso@puelchelab.cl`, `+56 9 6617 7500`, and `https://www.instagram.com/puelche_lab/`.

---

## 3. Caveats
1. **Source Code Write Permission:** As an Explorer subagent, I strictly operate in read-only investigation mode. I do NOT modify application code directly; all actionable replacements are specified below for the implementer agent.
2. **Additional Client Logo Downloads:** While 15 primary assets are already in `public/images/real/`, the 20 client logos (`cliente1-1.png` to `cliente20-1.png`) are verified alive on `puelchelab.cl` and can be downloaded via a simple helper script into `public/images/real/clients/`.
3. **Local Development Git Status:** The directory `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab` is not yet initialized as a git repository (`fatal: not a git repository`). Build and typechecks pass natively via `npm run build`.

---

## 4. Conclusion & Concrete Implementation Specifications

The brand narrative and site architecture of Puelche Lab have been thoroughly reconstructed with 100% genuine evidence. The studio represents high-end Patagonian craftsmanship combining cross-media design, high-resolution photography, and digital engineering.

### 4.1 Exact Code Remediation Proposals for Implementers

#### Proposal A: Clean `src/data/portfolio.ts` (Zero Unsplash)
Replace lines 27, 41, 55, 69, 83, 97, 111, 125 with local assets:
```typescript
// Replace Unsplash URLs with genuine local assets from /images/real/
// estancia-rilan:
image: '/images/real/bg-portafolios-fotografia-min.jpg',

// aquachile:
image: '/images/real/bg-portafolios-fotografia-g-min.jpg',

// cala-meli:
image: '/images/real/bg-portafolios-fotografia-a-min.jpg',

// blue-seal:
image: '/images/real/bg-portafolios-fotografia-h-min.jpg',

// hotel-costaustralis:
image: '/images/real/bg-portafolios-fotografia-b-min.jpg',

// viajes-falabella-patagonia:
image: '/images/real/bg-portafolios-fotografia-d-min.jpg',

// sur-terra:
image: '/images/real/bg-fotografia-6-min.jpg',

// tagua-tagua-lodge:
image: '/images/real/bg-portafolios-fotografia-c-min.jpg',
```

#### Proposal B: Clean `src/app/servicios/*/page.tsx`
- In `src/app/servicios/desarrollo-web/page.tsx` line 146:
  `src="/images/real/bg-fotografia-6-min.jpg"`
- In `src/app/servicios/editorial/page.tsx` line 119:
  `src="/images/real/bg-portafolios-fotografia-d-min.jpg"`
- In `src/app/servicios/branding/page.tsx` line 122:
  `src="/images/real/bg-portafolios-fotografia-h-min.jpg"`

#### Proposal C: Render Official Logo in `Navbar.tsx` & `Footer.tsx`
- In `src/components/layout/Navbar.tsx`:
```tsx
import Image from 'next/image';

// In Link href="/":
<Link href="/" className="group flex items-center gap-3">
  <Image
    src="/images/real/logo-top.png"
    alt="Puelche Lab"
    width={160}
    height={40}
    priority
    className="h-8 md:h-9 w-auto object-contain brightness-0 hover:opacity-80 transition-opacity"
  />
</Link>
```
- In `src/components/layout/Footer.tsx`:
```tsx
<div className="flex flex-col sm:flex-row items-center gap-6">
  <Image
    src="/images/real/logo-top.png"
    alt="Puelche Lab"
    width={180}
    height={45}
    className="h-10 w-auto object-contain invert opacity-90"
  />
</div>
// And change <h1 ...>PUELCHE LAB</h1> to <div ...>PUELCHE LAB</div>
```

#### Proposal D: Update Authentic Contact Data in `src/app/contacto/page.tsx`, `Footer.tsx`, `layout.tsx`, `WhatsAppButton.tsx`
- Email: `paula.valdivieso@puelchelab.cl`
- Phone: `+56 9 6617 7500` (`wa.me/56966177500`)
- Hours: `Lunes a Viernes de 09:00 a 19:00 hrs.`
- Instagram: `https://www.instagram.com/puelche_lab/`

---

## 5. Verification Method

To independently verify the facts and findings documented in this report:

1. **Verify Asset Dimensions & Authenticity:**
   ```bash
   python3 -c "
   import os
   from PIL import Image
   for f in ['logo-top.png', 'logo-puelche.png', 'bg-home-2.jpg', 'bg-portafolios-fotografia-min.jpg']:
       im = Image.open(os.path.join('public/images/real', f))
       print(f, im.size)
   "
   ```
2. **Verify 20 Server Client Logos:**
   ```bash
   python3 -c "
   import urllib.request
   for i in [1, 2, 3, 20]:
       resp = urllib.request.urlopen(f'https://www.puelchelab.cl/wp-content/uploads/2024/05/cliente{i}-1.png')
       print(f'cliente{i}:', resp.status)
   "
   ```
3. **Verify Unsplash References:**
   ```bash
   grep -rn "unsplash" src/
   ```
4. **Verify TypeScript & Turbopack Compilation:**
   ```bash
   npm run build
   ```
   Must output: `✓ Compiled successfully in ~350ms`, `(11/11)` static pages prerendered with 0 errors.
