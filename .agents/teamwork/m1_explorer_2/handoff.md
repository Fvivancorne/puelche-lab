# Milestone 1 — Explorer 2 Handoff Report: Remote Patterns Clean & Service Subpages Zero-Unsplash

## 1. Observation

A full forensic static analysis was conducted on the Puelche Lab repository (`/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab`) regarding `next.config.ts`, `src/app/servicios/`, `src/components/`, and local assets in `public/images/real/`.

### 1.1 `next.config.ts` Remote Patterns
In `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/next.config.ts`, lines 5–20 define `images.remotePatterns`:
```typescript
5:   images: {
6:     remotePatterns: [
7:       {
8:         protocol: 'https',
9:         hostname: 'www.puelchelab.cl',
10:       },
11:       {
12:         protocol: 'https',
13:         hostname: 'mlj4vapaxyc9.i.optimole.com',
14:       },
15:       {
16:         protocol: 'https',
17:         hostname: 'images.unsplash.com',
18:       },
19:     ],
20:   },
```
- Lines 15–18 explicitly allow `images.unsplash.com`.

### 1.2 Unsplash References in `src/app/servicios/`
Ripgrep search `grep_search(Query="unsplash", SearchPath="src/app/servicios")` returned exactly three matches:
1. `src/app/servicios/branding/page.tsx:122`:
```tsx
121:               <Image
122:                 src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
123:                 alt="Blue Seal Branding"
124:                 fill
125:                 className="object-cover"
126:               />
```
2. `src/app/servicios/editorial/page.tsx:119`:
```tsx
118:               <Image
119:                 src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop"
120:                 alt="Guía Territorial Patagonia Austral"
121:                 fill
122:                 className="object-cover"
123:               />
```
3. `src/app/servicios/desarrollo-web/page.tsx:146`:
```tsx
145:               <Image
146:                 src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop"
147:                 alt="Sur Terra Inmobiliaria"
148:                 fill
149:                 className="object-cover"
150:               />
```

### 1.3 Audit of Other Subpages in `src/app/servicios/` and `src/components/`
- `src/app/servicios/fotografia/page.tsx`: Line 140 renders dynamic images via `item.image` sourced from `PORTFOLIO_PROJECTS` in `src/data/portfolio.ts`. No hardcoded Unsplash URLs exist in this file.
- `src/app/servicios/page.tsx`: Does not contain any `<Image>` tags or external media; uses Lucide icons.
- `src/components/`: `grep_search(Query="unsplash", SearchPath="src/components")` returned 0 matches.
- External URLs in `src/components/`: Only legitimate WhatsApp (`https://wa.me/...`) and Instagram (`https://www.instagram.com/puelchelab`) links exist.

### 1.4 Local Real Image Verification
Direct inspection of `public/images/real/` verified the existence and integrity of all three requested target replacement assets:
- `public/images/real/bg-portafolios-fotografia-h-min.jpg`: 126,321 bytes (Exists)
- `public/images/real/bg-portafolios-fotografia-d-min.jpg`: 123,857 bytes (Exists)
- `public/images/real/bg-home-2.jpg`: 149,535 bytes (Exists)

---

## 2. Logic Chain

1. **Anti-Stock Mandate Compliance**: Requirement R1 and the Agency Global Rules strictly prohibit external stock photography (Unsplash) and require replacement with authentic assets extracted from Puelche Lab's portfolio.
2. **Configuration Hardening**: Removing `images.unsplash.com` from `next.config.ts` ensures Next.js will reject any unauthorized remote image requests to Unsplash, preventing accidental regression.
3. **Local Asset Availability**: All three replacement images (`bg-portafolios-fotografia-h-min.jpg`, `bg-portafolios-fotografia-d-min.jpg`, `bg-home-2.jpg`) are present locally under `public/images/real/` and ready for Next.js static asset serving.
4. **Zero-Side-Effect Migration**: Local Next.js paths (`/images/real/...`) do not require `remotePatterns` configuration, use Next.js built-in image optimization, preserve existing responsive layouts (`fill`, `object-cover`), and maintain all semantic `alt` attributes (`Blue Seal Branding`, `Guía Territorial Patagonia Austral`, `Sur Terra Inmobiliaria`).
5. **Clean Build Guarantee**: Removing the Unsplash entry in `next.config.ts` and updating the three service subpage templates leaves the entire `src/app/servicios/` tree with zero Unsplash references, while preserving valid TypeScript syntax.

---

## 3. Caveats

1. **Portfolio Data in `src/data/portfolio.ts` (Milestone 2 Scope)**:
   - There are 8 remaining Unsplash URLs inside `src/data/portfolio.ts` (lines 27, 41, 55, 69, 83, 97, 111, 125).
   - These are deliberately scoped for **Milestone 2** (`PROJECT.md` Feature 5: "Map all 8 projects in portfolio.ts to `/images/real/bg-*.jpg`").
   - During Milestone 1, `npm run build` succeeds cleanly because static prerendering renders the static HTML without making outbound network image requests. However, full eradication across the entire repo will conclude upon Milestone 2.
2. **WhatsApp Phone Number Consistency**:
   - `src/app/servicios/fotografia/page.tsx:221` currently contains `https://wa.me/56997424190`. As established in `PROJECT.md` and investigated by `m1_explorer_1`, the verified official Puelche Lab contact is Paula Valdivieso at `+56 9 6617 7500` (`wa.me/56966177500`). While `fotografia/page.tsx` line 221 is not within Explorer 2's direct replacement targets, this discrepancy is documented for consistency.
3. **Asset Filename Exact Matching**:
   - Linux production environments are case-sensitive. The worker MUST copy the exact lowercase, hyphenated filenames:
     - `/images/real/bg-portafolios-fotografia-h-min.jpg`
     - `/images/real/bg-portafolios-fotografia-d-min.jpg`
     - `/images/real/bg-home-2.jpg`

---

## 4. Conclusion & Implementation Instructions for Worker

The Worker can execute the four modifications cleanly and deterministically.

### Implementation Task 1: Clean `next.config.ts`
- **File**: `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/next.config.ts`
- **Action**: Delete lines 15–18 (the `images.unsplash.com` object).
- **Diff Specification**:
```diff
--- a/next.config.ts
+++ b/next.config.ts
@@ -12,10 +12,6 @@
         protocol: 'https',
         hostname: 'mlj4vapaxyc9.i.optimole.com',
       },
-      {
-        protocol: 'https',
-        hostname: 'images.unsplash.com',
-      },
     ],
   },
   async redirects() {
```

### Implementation Task 2: Update `src/app/servicios/branding/page.tsx`
- **File**: `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/src/app/servicios/branding/page.tsx`
- **Target Line**: Line 122
- **Change**:
  - Before: `src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"`
  - After: `src="/images/real/bg-portafolios-fotografia-h-min.jpg"`
- **Diff Specification**:
```diff
--- a/src/app/servicios/branding/page.tsx
+++ b/src/app/servicios/branding/page.tsx
@@ -119,7 +119,7 @@
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
             <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-puelche-ink">
               <Image
-                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
+                src="/images/real/bg-portafolios-fotografia-h-min.jpg"
                 alt="Blue Seal Branding"
                 fill
                 className="object-cover"
```

### Implementation Task 3: Update `src/app/servicios/editorial/page.tsx`
- **File**: `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/src/app/servicios/editorial/page.tsx`
- **Target Line**: Line 119
- **Change**:
  - Before: `src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop"`
  - After: `src="/images/real/bg-portafolios-fotografia-d-min.jpg"`
- **Diff Specification**:
```diff
--- a/src/app/servicios/editorial/page.tsx
+++ b/src/app/servicios/editorial/page.tsx
@@ -116,7 +116,7 @@
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
             <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-puelche-sand">
               <Image
-                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop"
+                src="/images/real/bg-portafolios-fotografia-d-min.jpg"
                 alt="Guía Territorial Patagonia Austral"
                 fill
                 className="object-cover"
```

### Implementation Task 4: Update `src/app/servicios/desarrollo-web/page.tsx`
- **File**: `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/src/app/servicios/desarrollo-web/page.tsx`
- **Target Line**: Line 146
- **Change**:
  - Before: `src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop"`
  - After: `src="/images/real/bg-home-2.jpg"`
- **Diff Specification**:
```diff
--- a/src/app/servicios/desarrollo-web/page.tsx
+++ b/src/app/servicios/desarrollo-web/page.tsx
@@ -143,7 +143,7 @@
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
             <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-puelche-sand">
               <Image
-                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop"
+                src="/images/real/bg-home-2.jpg"
                 alt="Sur Terra Inmobiliaria"
                 fill
                 className="object-cover"
```

---

## 5. Verification Method

To verify these changes independently after implementation:

### 5.1 Static Verification Commands

1. **Verify zero Unsplash references in `src/app/servicios/`**:
   ```bash
   grep -rn "unsplash" src/app/servicios/
   ```
   *Expected result*: Empty output (0 matches).

2. **Verify removal from `next.config.ts`**:
   ```bash
   grep -rn "images.unsplash.com" next.config.ts
   ```
   *Expected result*: Empty output (0 matches).

3. **Verify exact target local image paths in service subpages**:
   ```bash
   grep -rn "bg-portafolios-fotografia-h-min.jpg" src/app/servicios/branding/page.tsx
   grep -rn "bg-portafolios-fotografia-d-min.jpg" src/app/servicios/editorial/page.tsx
   grep -rn "bg-home-2.jpg" src/app/servicios/desarrollo-web/page.tsx
   ```
   *Expected result*: Exactly 1 match per command matching the specified lines.

4. **Verify local assets physically exist in `public/images/real/`**:
   ```bash
   ls -la public/images/real/bg-portafolios-fotografia-h-min.jpg
   ls -la public/images/real/bg-portafolios-fotografia-d-min.jpg
   ls -la public/images/real/bg-home-2.jpg
   ```
   *Expected result*: All 3 files present with sizes > 120 KB.

### 5.2 Build & Compilation Verification Command

Run the full Next.js production build:
```bash
npm run build
```
*Expected result*:
- Exit code: 0
- Turbopack compilation completes with 0 errors
- TypeScript check passes cleanly
- All 11 static routes prerender successfully, including `/servicios/branding`, `/servicios/editorial`, and `/servicios/desarrollo-web`.

### 5.3 Invalidation Conditions
- Any occurrence of `unsplash` remaining inside `src/app/servicios/`.
- Failure of `npm run build` due to image parsing, syntax, or configuration errors.
- Image 404s caused by path typos or casing errors.
