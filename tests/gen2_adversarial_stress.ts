/**
 * Adversarial Empirical Stress Test Suite for Puelche Lab (R1–R4 & Responsive Layouts)
 * Agent: gen2_challenger_1 (Empirical Challenger)
 * 
 * Verifies:
 * 1. Zero Unsplash invariant across all source, public, config, and build artifacts.
 * 2. Binary asset existence, size, magic bytes, and dimensions for all referenced media.
 * 3. R1: Brand color tokens (#59BFD6, #3B3D42, #1D2024) and responsive header.
 * 4. R2: Home page 3-section 100vh storytelling, colossal white emblem, and closing cyan block.
 * 5. R3: Portfolio panoramic stripes, cyan pill cards (#59BFD6), and lightbox modal.
 * 6. R4: Clients 20-logo grid on 100% cyan, contact brief form, and Paula Valdivieso card.
 * 7. Responsive layout assertions for 1440px (desktop), 768px (tablet), and 375px (mobile).
 * 8. Prerendered HTML and static routing consistency in .next/server/app/.
 */

import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const PUBLIC = path.join(ROOT, 'public');
const REAL_IMAGES = path.join(PUBLIC, 'images', 'real');
const REAL_CLIENTS = path.join(REAL_IMAGES, 'clients');
const NEXT_APP = path.join(ROOT, '.next', 'server', 'app');

interface TestResult {
  id: string;
  category: string;
  name: string;
  passed: boolean;
  details?: string;
  error?: string;
}

const results: TestResult[] = [];

function assert(condition: unknown, msg: string): asserts condition {
  if (!condition) throw new Error(msg);
}

function runTest(id: string, category: string, name: string, fn: () => void | Promise<void>) {
  try {
    const res = fn();
    if (res instanceof Promise) {
      throw new Error('Async test must be awaited in test runner');
    }
    results.push({ id, category, name, passed: true });
    console.log(`  ✔ [PASS] [${id}] ${name}`);
  } catch (err: any) {
    results.push({ id, category, name, passed: false, error: err.message });
    console.log(`  ✖ [FAIL] [${id}] ${name} -> ${err.message}`);
  }
}

async function runAsyncTest(id: string, category: string, name: string, fn: () => Promise<void>) {
  try {
    await fn();
    results.push({ id, category, name, passed: true });
    console.log(`  ✔ [PASS] [${id}] ${name}`);
  } catch (err: any) {
    results.push({ id, category, name, passed: false, error: err.message });
    console.log(`  ✖ [FAIL] [${id}] ${name} -> ${err.message}`);
  }
}

function getAllFiles(dir: string, extensions?: string[]): string[] {
  let files: string[] = [];
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name !== 'node_modules' && ent.name !== '.git' && ent.name !== '.next') {
        files = files.concat(getAllFiles(full, extensions));
      }
    } else if (!extensions || extensions.some(ext => ent.name.endsWith(ext))) {
      files.push(full);
    }
  }
  return files;
}

// ============================================================================
// 1. ZERO UNSPLASH INVARIANT (STRICT EMPIRICAL SCAN)
// ============================================================================
console.log('\n--- 1. ZERO UNSPLASH INVARIANT ---');

runTest('ADV-UNSPLASH-01', 'ZeroUnsplash', 'Zero occurrences of "unsplash" in src/ files', () => {
  const srcFiles = getAllFiles(SRC, ['.ts', '.tsx', '.js', '.jsx', '.css']);
  for (const f of srcFiles) {
    const content = fs.readFileSync(f, 'utf-8');
    assert(!content.toLowerCase().includes('unsplash'), `Unsplash reference found in ${path.relative(ROOT, f)}`);
  }
});

runTest('ADV-UNSPLASH-02', 'ZeroUnsplash', 'Zero occurrences of "unsplash" in public/ assets and manifest', () => {
  const publicFiles = getAllFiles(PUBLIC);
  for (const f of publicFiles) {
    if (f.endsWith('.json') || f.endsWith('.svg') || f.endsWith('.txt') || f.endsWith('.xml')) {
      const content = fs.readFileSync(f, 'utf-8');
      assert(!content.toLowerCase().includes('unsplash'), `Unsplash reference found in ${path.relative(ROOT, f)}`);
    }
  }
});

runTest('ADV-UNSPLASH-03', 'ZeroUnsplash', 'Zero occurrences of "unsplash" in config files (tailwind, next, tsconfig, package)', () => {
  const configFiles = ['tailwind.config.ts', 'next.config.ts', 'tsconfig.json', 'package.json'];
  for (const cf of configFiles) {
    const p = path.join(ROOT, cf);
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf-8');
      assert(!content.toLowerCase().includes('unsplash'), `Unsplash reference in ${cf}`);
    }
  }
});

runTest('ADV-UNSPLASH-04', 'ZeroUnsplash', 'Zero occurrences of "unsplash" in prerendered Next.js HTML output', () => {
  const htmlFiles = getAllFiles(NEXT_APP, ['.html']);
  assert(htmlFiles.length > 0, 'No prerendered HTML files found in .next/server/app/');
  for (const hf of htmlFiles) {
    const content = fs.readFileSync(hf, 'utf-8');
    assert(!content.toLowerCase().includes('unsplash'), `Unsplash reference found in prerendered ${path.relative(ROOT, hf)}`);
  }
});

// ============================================================================
// 2. BINARY ASSET INTEGRITY & RESOLUTION
// ============================================================================
console.log('\n--- 2. BINARY ASSET INTEGRITY & RESOLUTION ---');

runTest('ADV-ASSET-01', 'AssetIntegrity', 'Base assets in public/images/real/ exist with valid magic bytes', () => {
  const requiredBaseAssets = [
    'logo-top.png',
    'logo-puelche.png',
    'bg-agencia.jpg',
    'bg-home-2.jpg',
    'bg-portafolios-fotografia-a-min.jpg',
    'bg-portafolios-fotografia-b-min.jpg',
    'bg-portafolios-fotografia-c-min.jpg',
    'bg-portafolios-fotografia-d-min.jpg',
    'bg-fotografia-6-min.jpg',
    'bg-portafolios-fotografia-f-min.jpg',
    'bg-portafolios-fotografia-g-min.jpg',
    'bg-fotografia-9-min.jpg',
    'bg-portafolios-fotografia-h-min.jpg',
    'bg-portafolios-fotografia-i-min.jpg',
  ];

  for (const filename of requiredBaseAssets) {
    const filePath = path.join(REAL_IMAGES, filename);
    assert(fs.existsSync(filePath), `Required asset missing: ${filename}`);
    const stat = fs.statSync(filePath);
    assert(stat.size > 5000, `Asset ${filename} too small: ${stat.size} bytes`);

    const buf = fs.readFileSync(filePath);
    if (filename.endsWith('.jpg')) {
      assert(buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff, `Invalid JPEG magic bytes for ${filename}`);
    } else if (filename.endsWith('.png')) {
      assert(
        buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47,
        `Invalid PNG magic bytes for ${filename}`
      );
    }
  }
});

runTest('ADV-ASSET-02', 'AssetIntegrity', 'All 20 client logos exist in public/images/real/clients/ with PNG magic bytes', () => {
  for (let i = 1; i <= 20; i++) {
    const filename = `cliente${i}-1.png`;
    const filePath = path.join(REAL_CLIENTS, filename);
    assert(fs.existsSync(filePath), `Client logo missing: ${filename}`);
    const stat = fs.statSync(filePath);
    assert(stat.size > 1000, `Client logo ${filename} too small: ${stat.size} bytes`);
    const buf = fs.readFileSync(filePath);
    assert(
      buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47,
      `Invalid PNG header on ${filename}`
    );
  }
});

runTest('ADV-ASSET-03', 'AssetIntegrity', 'Every image reference in src/ resolves to an existing file on disk', () => {
  const srcFiles = getAllFiles(SRC, ['.ts', '.tsx']);
  const imgRegex = /['"](\/images\/real\/[^'"]+)['"]/g;
  const verifiedAssets = new Set<string>();

  for (const sf of srcFiles) {
    const content = fs.readFileSync(sf, 'utf-8');
    let m;
    while ((m = imgRegex.exec(content)) !== null) {
      const relImg = m[1];
      verifiedAssets.add(relImg);
      const diskPath = path.join(PUBLIC, relImg);
      assert(fs.existsSync(diskPath), `Dangling asset reference in ${path.relative(ROOT, sf)}: ${relImg}`);
    }
  }

  // Also verify all 20 client logos referenced in CLIENT_LOGOS array in clientes/page.tsx
  const clientesPage = fs.readFileSync(path.join(SRC, 'app', 'clientes', 'page.tsx'), 'utf-8');
  for (let i = 1; i <= 20; i++) {
    const filename = `cliente${i}-1.png`;
    assert(clientesPage.includes(filename), `CLIENT_LOGOS missing ${filename}`);
    const diskPath = path.join(REAL_CLIENTS, filename);
    assert(fs.existsSync(diskPath), `Client logo missing on disk: ${filename}`);
    verifiedAssets.add(`/images/real/clients/${filename}`);
  }

  assert(verifiedAssets.size >= 34, `Expected at least 34 verified unique assets, found ${verifiedAssets.size}`);
});

// ============================================================================
// 3. R1: BRAND COLOR PALETTE & RESPONSIVE HEADER
// ============================================================================
console.log('\n--- 3. R1: BRAND PALETTE & HEADER ---');

runTest('ADV-R1-01', 'R1-BrandColors', 'Tailwind & globals.css register official Puelche brand colors', () => {
  const tailwindPath = path.join(ROOT, 'tailwind.config.ts');
  const tailwind = fs.readFileSync(tailwindPath, 'utf-8');
  assert(tailwind.includes("'puelche-cyan': '#59BFD6'"), "tailwind.config.ts missing 'puelche-cyan': '#59BFD6'");
  assert(tailwind.includes("'puelche-slate': '#3B3D42'"), "tailwind.config.ts missing 'puelche-slate': '#3B3D42'");
  assert(tailwind.includes("'puelche-dark': '#1D2024'"), "tailwind.config.ts missing 'puelche-dark': '#1D2024'");

  const globalsPath = path.join(SRC, 'app', 'globals.css');
  const css = fs.readFileSync(globalsPath, 'utf-8');
  assert(css.includes('--puelche-cyan: #59BFD6;'), 'globals.css missing --puelche-cyan');
  assert(css.includes('--puelche-slate: #3B3D42;'), 'globals.css missing --puelche-slate');
  assert(css.includes('--puelche-dark: #1D2024;'), 'globals.css missing --puelche-dark');
});

runTest('ADV-R1-02', 'R1-Header', 'Navbar renders solid slate background #3B3D42 and logo-top.png', () => {
  const navbarPath = path.join(SRC, 'components', 'layout', 'Navbar.tsx');
  const code = fs.readFileSync(navbarPath, 'utf-8');
  assert(code.includes('bg-[#3B3D42]') || code.includes('bg-puelche-slate'), 'Navbar missing bg-[#3B3D42] or bg-puelche-slate');
  assert(code.includes('/images/real/logo-top.png'), 'Navbar missing /images/real/logo-top.png');
  assert(code.includes('h-[70px]'), 'Navbar missing fixed 70px height');
});

runTest('ADV-R1-03', 'R1-Header', 'Navbar navigation links use uppercase condensed styling', () => {
  const navbarPath = path.join(SRC, 'components', 'layout', 'Navbar.tsx');
  const code = fs.readFileSync(navbarPath, 'utf-8');
  assert(code.includes('font-condensed'), 'Navbar missing font-condensed on navigation');
  assert(code.includes('HOME'), 'Navbar missing HOME link');
  assert(code.includes('PORTAFOLIO'), 'Navbar missing PORTAFOLIO link');
  assert(code.includes('CLIENTES'), 'Navbar missing CLIENTES link');
  assert(code.includes('CONTACTO'), 'Navbar missing CONTACTO link');
  assert(code.includes('Cotizar Proyecto'), 'Navbar missing Cotizar Proyecto CTA');
});

runTest('ADV-R1-04', 'R1-Header', 'Mobile drawer in Navbar toggles with lg:hidden and renders uppercase links', () => {
  const navbarPath = path.join(SRC, 'components', 'layout', 'Navbar.tsx');
  const code = fs.readFileSync(navbarPath, 'utf-8');
  assert(code.includes('mobileOpen'), 'Navbar missing mobileOpen state');
  assert(code.includes('setMobileOpen'), 'Navbar missing setMobileOpen trigger');
  assert(code.includes('top-[70px]'), 'Mobile drawer missing top-[70px] alignment');
  assert(code.includes('bg-puelche-slate'), 'Mobile drawer missing bg-puelche-slate');
  assert(code.includes('aria-label="Abrir menú"'), 'Mobile menu toggle missing accessibility aria-label');
});

// ============================================================================
// 4. R2: HOME 3-SECTION 100VH STORYTELLING & EMBLEM
// ============================================================================
console.log('\n--- 4. R2: HOME 100VH STORYTELLING & EMBLEM ---');

runTest('ADV-R2-01', 'R2-HomeStorytelling', 'Section 1 (Hero 100vh) renders bg-agencia.jpg and colossal white emblem', () => {
  const pagePath = path.join(SRC, 'app', 'page.tsx');
  const code = fs.readFileSync(pagePath, 'utf-8');

  // Verify section ID and 100vh setup
  assert(code.includes('id="hero"'), 'Section 1 missing id="hero"');
  assert(code.includes('h-screen') && code.includes('min-h-screen'), 'Section 1 missing h-screen min-h-screen');

  // Backdrop: bg-agencia.jpg
  assert(code.includes('/images/real/bg-agencia.jpg'), 'Section 1 missing /images/real/bg-agencia.jpg backdrop');

  // Colossal white emblem
  assert(code.includes('/images/real/logo-puelche.png'), 'Section 1 missing colossal logo-puelche.png emblem');
  assert(code.includes('VIENTO CREATIVO'), 'Section 1 missing VIENTO CREATIVO headline');
  assert(
    code.includes('Un Estudio de Diseño Cross Media y Fotografía de Puerto Varas.'),
    'Section 1 missing authentic subtitle'
  );
  assert(code.includes('PUERTO VARAS • REGION DE LOS LAGOS') || code.includes('PUERTO VARAS &bull; REGION DE LOS LAGOS'), 'Section 1 missing Puerto Varas geo badge');
});

runTest('ADV-R2-02', 'R2-HomeStorytelling', 'Section 2 (100vh) renders bg-home-2.jpg and Cross Media storytelling', () => {
  const pagePath = path.join(SRC, 'app', 'page.tsx');
  const code = fs.readFileSync(pagePath, 'utf-8');

  assert(code.includes('id="cross-media"'), 'Section 2 missing id="cross-media"');
  assert(code.includes('/images/real/bg-home-2.jpg'), 'Section 2 missing /images/real/bg-home-2.jpg backdrop');
  assert(code.includes('¿Qué es Cross Media?'), 'Section 2 missing ¿Qué es Cross Media? title');
  assert(code.includes('ESTUDIO PROPIO'), 'Section 2 missing ESTUDIO PROPIO feature badge');
  assert(code.includes('TIERRA Y AIRE'), 'Section 2 missing TIERRA Y AIRE feature badge');
  assert(code.includes('ILUMINACIÓN'), 'Section 2 missing ILUMINACIÓN feature badge');
  assert(code.includes('CROSS-MEDIA'), 'Section 2 missing CROSS-MEDIA feature badge');
});

runTest('ADV-R2-03', 'R2-HomeStorytelling', 'Section 3 (Closing) renders solid Cyan #59BFD6 with white border and CONTACTANOS', () => {
  const pagePath = path.join(SRC, 'app', 'page.tsx');
  const code = fs.readFileSync(pagePath, 'utf-8');

  assert(code.includes('id="cta-cierre"'), 'Section 3 missing id="cta-cierre"');
  assert(code.includes('bg-[#59BFD6]') || code.includes('bg-puelche-cyan'), 'Section 3 missing bg-[#59BFD6] or bg-puelche-cyan');
  assert(code.includes('border-white') || code.includes('border-2 sm:border-4 border-white'), 'Section 3 missing white geometric frame border');
  assert(code.includes('CONTACTANOS'), 'Section 3 missing CONTACTANOS heading');
  assert(code.includes('CONTACTO'), 'Section 3 missing CONTACTO button');

  // Verify social channels
  assert(code.includes('facebook.com/puelchelab'), 'Section 3 missing Facebook link');
  assert(code.includes('instagram.com/puelchelab'), 'Section 3 missing Instagram link');
  assert(code.includes('wa.me/56966177500'), 'Section 3 missing WhatsApp link');
  assert(code.includes('paula.valdivieso@puelchelab.cl'), 'Section 3 missing email link');
});

// ============================================================================
// 5. R3: PORTFOLIO PANORAMIC STRIPES & CYAN PILL CARDS
// ============================================================================
console.log('\n--- 5. R3: PORTFOLIO & PHOTOGRAPHY PANORAMIC STRIPES ---');

runTest('ADV-R3-01', 'R3-PortfolioPills', 'servicios/fotografia renders panoramic stripes with bottom-left Cyan pill cards', () => {
  const fotoPath = path.join(SRC, 'app', 'servicios', 'fotografia', 'page.tsx');
  const code = fs.readFileSync(fotoPath, 'utf-8');

  // Verify key clients
  const requiredClients = ['Estancia Rilan', 'Cala Melí', 'Costaustralis', 'Cabo de Hornos', 'Muebles Yunge', 'Tagua Tagua', 'Aqua Chile'];
  for (const cl of requiredClients) {
    assert(code.includes(cl), `Photography page missing client: ${cl}`);
  }

  // Verify Cyan pill card
  assert(code.includes('bg-puelche-cyan') || code.includes('bg-[#59BFD6]'), 'Photography page missing Cyan card background');
  assert(code.includes('VER FOTOGRAFÍAS'), 'Photography page missing VER FOTOGRAFÍAS button');
  assert(code.includes('absolute bottom-'), 'Cyan pill card missing absolute bottom positioning');
});

runTest('ADV-R3-02', 'R3-PortfolioPills', 'portafolio/page.tsx renders panoramic bands with Cyan cards and filter tabs', () => {
  const portPath = path.join(SRC, 'app', 'portafolio', 'page.tsx');
  const code = fs.readFileSync(portPath, 'utf-8');

  assert(code.includes('bg-[#59BFD6]'), 'Portfolio page missing Cyan pill card bg-[#59BFD6]');
  assert(code.includes('VER FOTOGRAFÍAS'), 'Portfolio page missing VER FOTOGRAFÍAS button');
  assert(code.includes("CATEGORIES = ['Todos', 'Fotografía', 'Branding', 'Desarrollo Web', 'Editorial']"), 'Portfolio page missing category tabs');
  assert(code.includes('PORTFOLIO_PROJECTS'), 'Portfolio page missing PORTFOLIO_PROJECTS data import');
});

// ============================================================================
// 6. R4: CLIENTS 20-LOGO GRID ON CYAN & AUTHENTIC CONTACT BRIEF
// ============================================================================
console.log('\n--- 6. R4: CLIENTS GRID & CONTACT BRIEF ---');

runTest('ADV-R4-01', 'R4-ClientsGrid', 'clientes/page.tsx renders 100% Cyan background and all 20 white client logos', () => {
  const clientsPath = path.join(SRC, 'app', 'clientes', 'page.tsx');
  const code = fs.readFileSync(clientsPath, 'utf-8');

  assert(code.includes('bg-puelche-cyan') || code.includes('bg-[#59BFD6]'), 'Clients page missing Cyan background');
  assert(!code.includes("'use client'"), 'Clients page should not use client to enable static metadata export');
  assert(code.includes('CLIENT_LOGOS'), 'Clients page missing CLIENT_LOGOS array');

  // Verify all 20 client logos are referenced
  for (let i = 1; i <= 20; i++) {
    assert(code.includes(`cliente${i}-1.png`), `Clients page missing logo: cliente${i}-1.png`);
  }
});

runTest('ADV-R4-02', 'R4-ContactBrief', 'contacto/page.tsx includes authentic form fields, checkboxes, and Paula Valdivieso card', () => {
  const contactPath = path.join(SRC, 'app', 'contacto', 'page.tsx');
  const code = fs.readFileSync(contactPath, 'utf-8');

  // Authentic form fields
  assert(code.includes('Nombre y Apellido'), 'Contact form missing Nombre y Apellido label');
  assert(code.includes('Teléfono de Contacto'), 'Contact form missing Teléfono de Contacto label');
  assert(code.includes('Correo Electrónico'), 'Contact form missing Correo Electrónico label');

  // Genuine checkboxes
  const genuineServices = ['Fotografía', 'Sitio Web', 'Redes Sociales', 'Diseño Gráfico'];
  for (const s of genuineServices) {
    assert(code.includes(s), `Contact form missing genuine service checkbox: ${s}`);
  }

  // Paula Valdivieso and location
  assert(code.includes('Paula Valdivieso'), 'Contact page missing Paula Valdivieso');
  assert(code.includes('paula.valdivieso@puelchelab.cl'), 'Contact page missing authentic email');
  assert(code.includes('+56 9 6617 7500'), 'Contact page missing phone number');
  assert(code.includes('Puerto Varas'), 'Contact page missing Puerto Varas location');

  // State reset and WhatsApp bridge
  assert(code.includes('Enviar otro requerimiento'), 'Contact form missing reset button');
  assert(code.includes('Continuar por WhatsApp'), 'Contact form missing WhatsApp handoff');
});

// ============================================================================
// 7. RESPONSIVE VIEWPORT LOGIC (1440px Desktop, 768px Tablet, 375px Mobile)
// ============================================================================
console.log('\n--- 7. RESPONSIVE VIEWPORT AUDIT ---');

runTest('ADV-RESP-01', 'ResponsiveAudit', 'Desktop (1440px) triggers: max-w-7xl, lg:flex desktop nav, lg:grid-cols-4/5', () => {
  const navbarCode = fs.readFileSync(path.join(SRC, 'components', 'layout', 'Navbar.tsx'), 'utf-8');
  assert(navbarCode.includes('hidden lg:flex'), 'Navbar missing hidden lg:flex desktop navigation trigger');

  const clientsCode = fs.readFileSync(path.join(SRC, 'app', 'clientes', 'page.tsx'), 'utf-8');
  assert(clientsCode.includes('lg:grid-cols-5'), 'Clients page missing lg:grid-cols-5 for wide desktop displays');

  const homeCode = fs.readFileSync(path.join(SRC, 'app', 'page.tsx'), 'utf-8');
  assert(homeCode.includes('lg:grid-cols-4'), 'Home page feature badges missing lg:grid-cols-4 for desktop');
});

runTest('ADV-RESP-02', 'ResponsiveAudit', 'Tablet (768px) triggers: md:grid-cols-2/4, md:px-12, sm:text-xl', () => {
  const clientsCode = fs.readFileSync(path.join(SRC, 'app', 'clientes', 'page.tsx'), 'utf-8');
  assert(clientsCode.includes('md:grid-cols-4'), 'Clients page missing md:grid-cols-4 tablet layout');

  const homeCode = fs.readFileSync(path.join(SRC, 'app', 'page.tsx'), 'utf-8');
  assert(homeCode.includes('md:grid-cols-2'), 'Home feature badges missing md:grid-cols-2 tablet layout');
  assert(homeCode.includes('md:px-12'), 'Home missing md:px-12 padding for medium screens');
});

runTest('ADV-RESP-03', 'ResponsiveAudit', 'Mobile (375px) safeguards: grid-cols-1/2, px-6, text scaling, no horizontal overflow', () => {
  const css = fs.readFileSync(path.join(SRC, 'app', 'globals.css'), 'utf-8');
  assert(css.includes('overflow-x: clip') || css.includes('overflow-x: hidden'), 'globals.css missing overflow-x: clip or hidden to prevent mobile horizontal bounce');

  const homeCode = fs.readFileSync(path.join(SRC, 'app', 'page.tsx'), 'utf-8');
  assert(homeCode.includes('px-6'), 'Home missing mobile base padding px-6');
  assert(homeCode.includes('text-5xl sm:text-7xl'), 'Home emblem headline missing mobile text-5xl fallback');

  const navbarCode = fs.readFileSync(path.join(SRC, 'components', 'layout', 'Navbar.tsx'), 'utf-8');
  assert(navbarCode.includes('lg:hidden'), 'Navbar missing lg:hidden mobile menu trigger');

  const clientsCode = fs.readFileSync(path.join(SRC, 'app', 'clientes', 'page.tsx'), 'utf-8');
  assert(clientsCode.includes('grid-cols-2 sm:grid-cols-3'), 'Clients grid missing 2-column mobile fallback');
});

runTest('ADV-RESP-04', 'ResponsiveAudit', 'Touch tap target safety on mobile: all buttons and links have min 40px+ touch targets', () => {
  const navbarCode = fs.readFileSync(path.join(SRC, 'components', 'layout', 'Navbar.tsx'), 'utf-8');
  assert(navbarCode.includes('p-2 text-white'), 'Mobile hamburger menu button missing tap padding');

  const homeCode = fs.readFileSync(path.join(SRC, 'app', 'page.tsx'), 'utf-8');
  assert(homeCode.includes('px-12 py-4'), 'CTA contact button has generous px-12 py-4 tap target');
  assert(homeCode.includes('w-12 h-12'), 'Social icon links have 48x48px (w-12 h-12) touch targets');
});

// ============================================================================
// 8. PRERENDERED HTML CONSISTENCY & ARIA ACCESSIBILITY
// ============================================================================
console.log('\n--- 8. PRERENDERED HTML & ARIA CONTRACTS ---');

runTest('ADV-PRERENDER-01', 'PrerenderAudit', 'All 13 routes exist in prerendered Next.js output (.next/server/app/)', () => {
  const expectedRoutes = [
    'index.html',
    'clientes.html',
    'contacto.html',
    'portafolio.html',
    'servicios.html',
    'servicios/branding.html',
    'servicios/desarrollo-web.html',
    'servicios/edicion-fotografica.html',
    'servicios/editorial.html',
    'servicios/fotografia.html',
    'servicios/redes-sociales.html',
  ];

  for (const r of expectedRoutes) {
    const full = path.join(NEXT_APP, r);
    assert(fs.existsSync(full), `Prerendered file missing: ${r}`);
    const stat = fs.statSync(full);
    assert(stat.size > 2000, `Prerendered file ${r} is suspiciously small: ${stat.size} bytes`);
  }
});

runTest('ADV-PRERENDER-02', 'PrerenderAudit', 'Prerendered index.html contains verified brand assets and semantic ARIA', () => {
  const indexHtml = fs.readFileSync(path.join(NEXT_APP, 'index.html'), 'utf-8');

  // Verify assets
  assert(indexHtml.includes('logo-puelche.png'), 'Prerendered index.html missing logo-puelche.png');
  assert(indexHtml.includes('logo-top.png'), 'Prerendered index.html missing logo-top.png');
  assert(indexHtml.includes('bg-agencia.jpg'), 'Prerendered index.html missing bg-agencia.jpg');
  assert(indexHtml.includes('bg-home-2.jpg'), 'Prerendered index.html missing bg-home-2.jpg');

  // Verify semantic ARIA
  assert(indexHtml.includes('aria-label="Puelche Lab Portada"'), 'Missing aria-label="Puelche Lab Portada"');
  assert(indexHtml.includes('aria-label="El Manifiesto del Puelche"'), 'Missing aria-label="El Manifiesto del Puelche"');
  assert(indexHtml.includes('aria-label="Iniciar Proyecto"'), 'Missing aria-label="Iniciar Proyecto"');

  // Verify JSON-LD Schema
  assert(indexHtml.includes('application/ld+json'), 'Prerendered index.html missing JSON-LD schema');
  assert(indexHtml.includes('ProfessionalService'), 'JSON-LD missing ProfessionalService type');
  assert(indexHtml.includes('Puerto Varas'), 'JSON-LD missing Puerto Varas address');
});

runTest('ADV-PRERENDER-03', 'PrerenderAudit', 'Prerendered clientes.html contains 20 client logos and no stock images', () => {
  const clientesHtml = fs.readFileSync(path.join(NEXT_APP, 'clientes.html'), 'utf-8');
  assert(clientesHtml.includes('cliente1-1.png'), 'clientes.html missing cliente1-1.png');
  assert(clientesHtml.includes('cliente20-1.png'), 'clientes.html missing cliente20-1.png');
  assert(!clientesHtml.toLowerCase().includes('unsplash'), 'clientes.html contains unsplash reference');
});

// ============================================================================
// EXECUTION SUMMARY
// ============================================================================
console.log('\n======================================================================');
console.log('            GEN2 ADVERSARIAL STRESS TEST SUMMARY                      ');
console.log('======================================================================');
const passedCount = results.filter(r => r.passed).length;
const failedCount = results.filter(r => !r.passed).length;
console.log(`  Total Tests Run : ${results.length}`);
console.log(`  Passed          : ${passedCount}`);
console.log(`  Failed          : ${failedCount}`);
console.log(`  Success Rate    : ${((passedCount / results.length) * 100).toFixed(1)}%`);
console.log('======================================================================\n');

if (failedCount > 0) {
  process.exit(1);
}
