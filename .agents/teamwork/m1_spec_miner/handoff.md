# Handoff Report: Milestone 1 Specification Mining & Verification Criteria

## 1. Observation
Authoritative sources examined:
- `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/ORIGINAL_REQUEST.md` (lines 10–38)
- `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/PROJECT.md` (lines 11–115)
- `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/docs/recon/raw_audit.json` (lines 1–60)
- Current codebase files:
  - `src/components/layout/Navbar.tsx` (lines 42–56)
  - `src/components/layout/Footer.tsx` (lines 87–135)
  - `next.config.ts` (lines 5–20)
  - `src/app/servicios/branding/page.tsx` (line 122)
  - `src/app/servicios/editorial/page.tsx` (line 119)
  - `src/app/servicios/desarrollo-web/page.tsx` (line 146)
  - `src/components/ui/WhatsAppButton.tsx` (line 7)
  - `src/app/layout.tsx` (line 62)
  - `src/app/contacto/page.tsx` (lines 73, 116, 127)

Direct observations and tool outputs:
1. **Navbar Logo**:
   - In `Navbar.tsx:43-46`, the brand logo is currently rendered using a generic Lucide icon `<Wind className="w-4 h-4 text-[#C29B63]" />` inside an arbitrary div and text `PUELCHE LAB`.
   - In `public/images/real/logo-top.png`, the authentic brand logo exists (250 x 63 PNG, 5,153 bytes).
   - In `raw_audit.json:11,34,58`, the live site uses `wp-content/uploads/2018/06/logo-top.png` across all header navigation elements.
2. **Footer Logo & Contact**:
   - In `Footer.tsx:126-129`, the bottom brand element is an oversized plain text heading `<h1 ...>PUELCHE LAB</h1>` with no image logo.
   - In `public/images/real/logo-puelche.png`, the authentic brand mark exists (412 x 282 PNG, 12,713 bytes).
   - In `Footer.tsx:96-100`, the contact info reads:
     - Email: `contacto@puelchelab.cl` (stale generic)
     - Phone: `+56 9 9435 6789` (unverified placeholder)
   - In `PROJECT.md:110-114` and `ORIGINAL_REQUEST.md`, authoritative contact info is:
     - Lead Creative / Director: Paula Valdivieso
     - Email: `paula.valdivieso@puelchelab.cl`
     - Phone / WhatsApp: `+56 9 6617 7500` (`wa.me/56966177500`)
3. **Unsplash in Service Pages**:
   - `grep -rn "unsplash" src/app/servicios/` produced 3 matches:
     - `src/app/servicios/branding/page.tsx:122`: `src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"`
     - `src/app/servicios/editorial/page.tsx:119`: `src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop"`
     - `src/app/servicios/desarrollo-web/page.tsx:146`: `src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop"`
4. **Remote Patterns in `next.config.ts`**:
   - `next.config.ts:16-19` contains:
     ```ts
     {
       protocol: 'https',
       hostname: 'images.unsplash.com',
     },
     ```
5. **Next.js 16 Build Status**:
   - Executing `npm run build` completed with exit code 0 in Next.js 16.4.3 (Turbopack), generating 11 static prerendered HTML routes in `.next/server/app/`.

---

## 2. Logic Chain
1. From `ORIGINAL_REQUEST.md` R1 and `PROJECT.md` Feature 1, the design requirement mandates that the Navbar render the official horizontal logo `/images/real/logo-top.png` (`h-8 md:h-10 w-auto object-contain`) instead of the placeholder Lucide `Wind` icon.
2. From `ORIGINAL_REQUEST.md` R2 and `PROJECT.md` Feature 2, the Footer must render `/images/real/logo-puelche.png` and present the verified contact details (`paula.valdivieso@puelchelab.cl`, `+56 9 6617 7500`).
3. From `PROJECT.md` Feature 3, service pages must have zero Unsplash references. Replacing the 3 external URLs in `branding/page.tsx`, `editorial/page.tsx`, and `desarrollo-web/page.tsx` with genuine local assets from `public/images/real/` (`bg-portafolios-fotografia-b-min.jpg`, `bg-portafolios-fotografia-c-min.jpg`, `bg-portafolios-fotografia-a-min.jpg`) fulfills this requirement.
4. From `PROJECT.md` Feature 4, purging `images.unsplash.com` from `next.config.ts` closes the door on remote stock imagery and causes Next.js to block any unauthorized external stock image.
5. From `PROJECT.md` Section 80 (Contact Data Contract), phone numbers and emails across related layout components (`WhatsAppButton.tsx` and `app/layout.tsx` schema) must match `+56 9 6617 7500` / `56966177500` and `paula.valdivieso@puelchelab.cl` to maintain ecosystem consistency.
6. Therefore, the implementation plan for Milestone 1 is completely defined, self-contained, and verifiable through deterministic shell and build assertions.

---

## 3. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Brand Layout | Navbar Official Logo | Render `/images/real/logo-top.png` in Navbar header, wrapped in home link | Next.js `<Image>` component with `src="/images/real/logo-top.png"`, `alt="Puelche Lab"` | Rendered `<img>` tag with horizontal cyan/white logo in Navbar | Missing asset or prop throws build/runtime error | `PROJECT.md` § Feature 1, `raw_audit.json` |
| 2 | Brand Layout | Footer Official Logo | Render `/images/real/logo-puelche.png` in Footer component | Next.js `<Image>` component with `src="/images/real/logo-puelche.png"`, `alt="Puelche Lab"` | Rendered `<img>` tag with 412x282 brand mark in Footer | Missing asset throws build error | `PROJECT.md` § Feature 2, `ORIGINAL_REQUEST.md` R2 |
| 3 | Brand Identity | Footer Verified Contact Data | Render verified contact info: Paula Valdivieso, `paula.valdivieso@puelchelab.cl`, and `+56 9 6617 7500` | Formatted contact JSX strings and `mailto:` / `tel:` / `wa.me` links | Clickable contact anchors in Footer | Stale placeholder text causes communications failure | `PROJECT.md` § Contact Contract |
| 4 | Asset Integrity | Zero Unsplash in Services | Replace 3 external Unsplash URLs with genuine `/images/real/` assets in `branding`, `editorial`, `desarrollo-web` | Local asset paths: `/images/real/bg-portafolios-fotografia-*.jpg` | Fast local image loading with 0 remote CDN latency | Any residual `images.unsplash.com` fails automated verification | `PROJECT.md` § Feature 3, `ORIGINAL_REQUEST.md` R1 |
| 5 | Security / Config | Purge Unsplash from Config | Remove `images.unsplash.com` from `next.config.ts` `remotePatterns` | Updated NextConfig without `images.unsplash.com` | Next.js runtime blocks unauthorized external stock photos | Build or config grep matches unsplash if not purged | `PROJECT.md` § Feature 4 |
| 6 | Brand Coherence | Contact Phone & WhatsApp Alignment | Align `WhatsAppButton.tsx` and `app/layout.tsx` telephone metadata to `56966177500` | Direct WhatsApp link `https://wa.me/56966177500` and schema `telephone: '+56966177500'` | Coherent floating CTA and search engine structured data | Mismatched numbers route inquiries to wrong/stale lines | Layout & component audit |
| 7 | Build Quality | Clean Turbopack Static Build | Next.js 16.4.3 production build runs with 0 TypeScript/Turbopack errors | `npm run build` | 11/11 routes prerendered statically (`○ (Static)`) | Non-zero exit code or TypeScript diagnostics | `ORIGINAL_REQUEST.md` Technical Criteria |

---

## 4. Edge Cases

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | Navbar Logo Aspect Ratio | Responsive viewports (Desktop 1440px vs Mobile 375px) | Fixed width on 250x63 image causes horizontal overflow or squeezes mobile nav toggle. Requires responsive utility classes `h-8 md:h-10 w-auto object-contain`. |
| 2 | Image Component Dimension Requirements | Next.js 16 `<Image>` with local static string `/images/real/logo-top.png` | Local string paths in Next.js require explicit `width` and `height` (e.g. `width={250} height={63}`) or `fill`. Missing width/height causes compile error. |
| 3 | Defensive Remote Pattern Rejection | Component attempting to load `https://images.unsplash.com/...` after config purge | Next.js immediately throws runtime error `Invalid src prop ... hostname "images.unsplash.com" is not configured under images in your next.config.js`, providing an automated boundary guard. |
| 4 | Prerendered HTML Image Encoding | Querying static HTML in `.next/server/app/` for `logo-top.png` | Next.js image optimizer query encodes parameters as `/_next/image?url=%2Fimages%2Freal%2Flogo-top.png&amp;...`. Tests must search for `logo-top` or handle URL encoding. |
| 5 | WhatsApp Phone Number URL vs Display Format | Floating button link vs footer telephone text | `href="https://wa.me/56966177500"` requires numeric-only string without plus sign or spaces; visual text requires human-readable `+56 9 6617 7500`. |
| 6 | Case Study Service Page Visual Continuity | Replacing Unsplash images with local photography | Must use high-resolution local assets from `public/images/real/` (`1920x1010` progressive JPEGs) to avoid pixelation in the 16:10 container. |

---

## 5. Caveats
- `src/data/portfolio.ts` also contains Unsplash URLs for the 8 portfolio items. According to `PROJECT.md`, cleaning `portfolio.ts` is explicitly assigned to Milestone 2 (M2). For Milestone 1, the requirement is strictly focused on service pages (`src/app/servicios/`) and `next.config.ts`.
- `public/images/real/clients/` (20 client logos) is scoped for Milestone 4 (M4) and does not block Milestone 1 completion.
- Contact form in `/contacto` has form state which is scoped under Milestone 4, but contact details across layout components (Navbar, Footer, WhatsAppButton, RootLayout) are part of Core Layout in Milestone 1.

---

## 6. Conclusion
Milestone 1 has four clear, unambiguous deliverables:
1. **Navbar**: Replace Lucide `Wind` placeholder with Next.js `<Image src="/images/real/logo-top.png" alt="Puelche Lab" width={250} height={63} className="h-8 md:h-10 w-auto object-contain" />`.
2. **Footer**: Insert `<Image src="/images/real/logo-puelche.png" alt="Puelche Lab" width={412} height={282} className="h-16 md:h-20 w-auto object-contain" />` and update contact details to Paula Valdivieso, `paula.valdivieso@puelchelab.cl`, and `+56 9 6617 7500`.
3. **Service Pages & Config**: Replace the 3 Unsplash URLs in `branding/page.tsx`, `editorial/page.tsx`, and `desarrollo-web/page.tsx` with authentic `/images/real/` assets, and purge `images.unsplash.com` from `next.config.ts`.
4. **Layout Synchronization**: Update WhatsApp phone to `56966177500` in `WhatsAppButton.tsx` and schema telephone in `app/layout.tsx`.
5. **Build Verification**: Run `npm run build` and ensure exit code 0.

---

## 7. Verification Method

Reviewers and Challengers can run the following automated suite of verification commands from the project root `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab`.

### Verification Suite Commands

```bash
#!/usr/bin/env bash
set -e

echo "=== M1 Verification Suite ==="

echo "1. Checking Navbar Logo in source..."
grep -q 'logo-top.png' src/components/layout/Navbar.tsx || { echo "FAIL: Navbar.tsx does not reference logo-top.png"; exit 1; }
echo "PASS: Navbar logo verified."

echo "2. Checking Footer Logo in source..."
grep -q 'logo-puelche.png' src/components/layout/Footer.tsx || { echo "FAIL: Footer.tsx does not reference logo-puelche.png"; exit 1; }
echo "PASS: Footer logo verified."

echo "3. Checking Footer Contact Info in source..."
grep -q 'paula.valdivieso@puelchelab.cl' src/components/layout/Footer.tsx || { echo "FAIL: Footer missing paula.valdivieso email"; exit 1; }
grep -q '6617 7500' src/components/layout/Footer.tsx || { echo "FAIL: Footer missing +56 9 6617 7500"; exit 1; }
echo "PASS: Footer contact verified."

echo "4. Checking Zero Unsplash in Service Pages..."
if grep -rn "unsplash" src/app/servicios/; then
  echo "FAIL: Unsplash found in service pages"
  exit 1
fi
echo "PASS: Zero Unsplash in service pages verified."

echo "5. Checking next.config.ts clean of Unsplash..."
if grep -rn "unsplash" next.config.ts; then
  echo "FAIL: Unsplash hostname found in next.config.ts"
  exit 1
fi
echo "PASS: next.config.ts is clean."

echo "6. Checking WhatsApp CTA consistency..."
grep -q '56966177500' src/components/ui/WhatsAppButton.tsx || { echo "FAIL: WhatsAppButton phone not updated"; exit 1; }
echo "PASS: WhatsAppButton phone verified."

echo "7. Running Next.js Production Build..."
npm run build
echo "PASS: Next.js build completed with code 0."

echo "8. Checking Prerendered HTML Output..."
grep -q 'logo-top' .next/server/app/index.html || { echo "FAIL: Prerendered index.html missing logo-top"; exit 1; }
grep -q 'logo-puelche' .next/server/app/index.html || { echo "FAIL: Prerendered index.html missing logo-puelche"; exit 1; }
grep -q 'paula.valdivieso@puelchelab.cl' .next/server/app/index.html || { echo "FAIL: Prerendered index.html missing email"; exit 1; }

for page in branding desarrollo-web editorial fotografia; do
  if grep -q "images.unsplash.com" .next/server/app/servicios/${page}.html; then
    echo "FAIL: Unsplash found in prerendered servicios/${page}.html"
    exit 1
  fi
done
echo "PASS: All prerendered service pages verified clean of Unsplash."

echo "=== All Milestone 1 Acceptance Criteria PASSED ==="
```

### Curl / Runtime Verification (Optional with Running Server)
When running `npm run start` or `npm run dev` at `http://localhost:3000`:
```bash
# Check Navbar logo
curl -s http://localhost:3000/ | grep -E "logo-top"

# Check Footer logo & contact
curl -s http://localhost:3000/ | grep -E "logo-puelche"
curl -s http://localhost:3000/ | grep "paula.valdivieso@puelchelab.cl"
curl -s http://localhost:3000/ | grep "6617 7500"

# Verify 0 Unsplash in services
curl -s http://localhost:3000/servicios/branding | grep -i "unsplash" | wc -l # must return 0
curl -s http://localhost:3000/servicios/editorial | grep -i "unsplash" | wc -l # must return 0
curl -s http://localhost:3000/servicios/desarrollo-web | grep -i "unsplash" | wc -l # must return 0
```

### Invalidation Conditions
- Any occurrence of `unsplash` inside `src/app/servicios/` or `next.config.ts`.
- `Navbar.tsx` lacking `logo-top.png` or using generic Lucide glyph instead of official logo.
- `Footer.tsx` lacking `logo-puelche.png` or containing stale phone/email (`contacto@puelchelab.cl`, `9435 6789`).
- `npm run build` exiting with a non-zero exit code or TypeScript errors.
