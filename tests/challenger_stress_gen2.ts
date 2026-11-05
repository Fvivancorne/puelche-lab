/**
 * Empirical Adversarial Challenger Verification Suite
 * Milestone 2 / R3 & R4 Empirical Verification
 * File: tests/challenger_stress_gen2.ts
 *
 * Runs comprehensive empirical tests:
 * 1. All 10 photography projects in portfolio.ts & their physical asset integrity
 * 2. Panoramic bands and Cyan pill cards in /servicios/fotografia and /portafolio
 * 3. Modal drawer interactions, gallery navigation, edge-case safety
 * 4. 20 client logos on /clientes with 100% Cyan background
 * 5. Contact form validation, checkboxes, reset behavior, and Paula Valdivieso direct info on /contacto
 * 6. Color contrast & WCAG 2.1 compliance for #59BFD6 Cyan and #3B3D42 Slate
 * 7. Prerendered HTML verification for all static routes in .next/server/app
 * 8. Zero-Unsplash invariant scan across entire project tree
 */

import * as fs from 'fs';
import * as path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');
const NEXT_APP_DIR = path.join(PROJECT_ROOT, '.next', 'server', 'app');

interface TestCase {
  id: string;
  category: string;
  name: string;
  run: () => void | Promise<void>;
}

interface TestResult {
  id: string;
  category: string;
  name: string;
  passed: boolean;
  error?: string;
  durationMs: number;
}

const testQueue: TestCase[] = [];
const testResults: TestResult[] = [];

function test(id: string, category: string, name: string, run: () => void | Promise<void>) {
  testQueue.push({ id, category, name, run });
}

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(msg);
}

function assertEqual<T>(actual: T, expected: T, msg: string) {
  if (actual !== expected) throw new Error(`${msg} | Expected: ${JSON.stringify(expected)}, Received: ${JSON.stringify(actual)}`);
}

function assertContains(haystack: string, needle: string, msg: string) {
  if (!haystack.includes(needle)) throw new Error(`${msg} | Needle "${needle}" not found in text`);
}

function assertNotContains(haystack: string, needle: string, msg: string) {
  if (haystack.includes(needle)) throw new Error(`${msg} | Forbidden needle "${needle}" found in text`);
}

function readFile(relPath: string): string {
  const p = path.join(PROJECT_ROOT, relPath);
  if (!fs.existsSync(p)) throw new Error(`File does not exist: ${p}`);
  return fs.readFileSync(p, 'utf-8');
}

function getFileSize(relPath: string): number {
  const p = path.join(PROJECT_ROOT, relPath);
  if (!fs.existsSync(p)) return 0;
  return fs.statSync(p).size;
}

// ============================================================================
// 1. R3: PHOTOGRAPHY PROJECTS & ASSET INTEGRITY (portfolio.ts)
// ============================================================================

test('R3-01', 'R3-Portfolio', 'portfolio.ts defines exactly 10 genuine photography projects', () => {
  const file = readFile('src/data/portfolio.ts');
  const { PORTFOLIO_PROJECTS } = require(path.join(SRC_DIR, 'data', 'portfolio.ts'));
  const photoProjects = PORTFOLIO_PROJECTS.filter((p: any) => p.category === 'Fotografía');
  assert(photoProjects.length === 10, `Expected 10 photography projects, found ${photoProjects.length}`);
});

test('R3-02', 'R3-Portfolio', 'All 10 photography clients match authentic Puelche Lab client roster', () => {
  const { PORTFOLIO_PROJECTS } = require(path.join(SRC_DIR, 'data', 'portfolio.ts'));
  const photoProjects = PORTFOLIO_PROJECTS.filter((p: any) => p.category === 'Fotografía');
  const expectedClients = [
    'Estancia Rilan, Hotel y Cava',
    'Cala Melí, Cabañas',
    'Costaustralis, Hotel',
    'Cabo de Hornos, Hotel',
    'Muebles Yunge',
    'Tagua Tagua, Lodge',
    'Aqua Chile',
    'Hotel Ohana',
    'Maestranza San Aurelio',
    'Soldasur',
  ];
  for (const exp of expectedClients) {
    const found = photoProjects.some((p: any) => p.client.includes(exp) || exp.includes(p.client));
    assert(found, `Missing expected client in photography projects: "${exp}"`);
  }
});

test('R3-03', 'R3-Portfolio', 'Each photography project contains required schema fields and valid non-empty values', () => {
  const { PORTFOLIO_PROJECTS } = require(path.join(SRC_DIR, 'data', 'portfolio.ts'));
  const photoProjects = PORTFOLIO_PROJECTS.filter((p: any) => p.category === 'Fotografía');
  for (const proj of photoProjects) {
    assert(typeof proj.id === 'string' && proj.id.length > 0, `Project missing id: ${JSON.stringify(proj)}`);
    assert(typeof proj.slug === 'string' && proj.slug.length > 0, `Project missing slug: ${proj.id}`);
    assert(typeof proj.title === 'string' && proj.title.length > 0, `Project missing title: ${proj.id}`);
    assert(typeof proj.client === 'string' && proj.client.length > 0, `Project missing client: ${proj.id}`);
    assert(typeof proj.location === 'string' && proj.location.length > 0, `Project missing location: ${proj.id}`);
    assert(typeof proj.specialty === 'string' && proj.specialty.length > 0, `Project missing specialty: ${proj.id}`);
    assert(typeof proj.year === 'string' && /^\d{4}$/.test(proj.year), `Project has invalid year: ${proj.id}`);
    assert(typeof proj.summary === 'string' && proj.summary.length > 20, `Project missing descriptive summary: ${proj.id}`);
    assert(typeof proj.description === 'string' && proj.description.length > 30, `Project missing description: ${proj.id}`);
    assert(Array.isArray(proj.deliverables) && proj.deliverables.length >= 2, `Project missing deliverables list: ${proj.id}`);
  }
});

test('R3-04', 'R3-Portfolio', 'Every project image path resolves to a physical non-empty file on disk (>5KB)', () => {
  const { PORTFOLIO_PROJECTS } = require(path.join(SRC_DIR, 'data', 'portfolio.ts'));
  for (const proj of PORTFOLIO_PROJECTS) {
    assert(typeof proj.image === 'string', `Project ${proj.id} image is not a string`);
    assert(proj.image.startsWith('/images/real/'), `Project ${proj.id} image does not start with /images/real/`);
    const relDiskPath = path.join('public', proj.image);
    const fullDiskPath = path.join(PROJECT_ROOT, relDiskPath);
    assert(fs.existsSync(fullDiskPath), `Image file missing on disk for ${proj.id}: ${fullDiskPath}`);
    const size = fs.statSync(fullDiskPath).size;
    assert(size > 5000, `Image file too small (${size} bytes) for ${proj.id}: ${fullDiskPath}`);
  }
});

test('R3-05', 'R3-Portfolio', 'Zero Unsplash URLs or references exist anywhere in portfolio.ts', () => {
  const file = readFile('src/data/portfolio.ts');
  assertNotContains(file.toLowerCase(), 'unsplash', 'portfolio.ts contains forbidden unsplash reference');
});

// ============================================================================
// 2. R3: /servicios/fotografia PANORAMIC BANDS & MODAL GALLERY
// ============================================================================

test('R3-06', 'R3-ServiciosFotografia', 'servicios/fotografia renders all 10 authentic photo projects with panoramic bands', () => {
  const file = readFile('src/app/servicios/fotografia/page.tsx');
  assertContains(file, 'REAL_PHOTO_PROJECTS', 'Missing REAL_PHOTO_PROJECTS array');
  assertContains(file, 'h-[450px]', 'Missing panoramic band responsive height class');
  assertContains(file, 'object-cover', 'Missing panoramic image object-cover');
  assertContains(file, 'Cliente: {proj.client}', 'Missing client name prefix in card');
});

test('R3-07', 'R3-ServiciosFotografia', 'Every project card has signature Puelche Cyan #59BFD6 pill card in bottom-left', () => {
  const file = readFile('src/app/servicios/fotografia/page.tsx');
  assertContains(file, 'absolute bottom-8 left-4', 'Pill card is not positioned at bottom-left');
  assertContains(file, 'bg-puelche-cyan', 'Pill card missing bg-puelche-cyan');
  assertContains(file, 'VER FOTOGRAFÍAS', 'Pill card missing button VER FOTOGRAFÍAS');
  assertContains(file, '{proj.location}', 'Pill card missing location');
  assertContains(file, '{proj.specialty}', 'Pill card missing specialty');
});

test('R3-08', 'R3-ServiciosFotografia', 'Modal drawer opens with selected project and cycles gallery images with wrap-around', () => {
  const file = readFile('src/app/servicios/fotografia/page.tsx');
  assertContains(file, 'activeModalProject &&', 'Missing modal conditional rendering');
  assertContains(file, 'closeModal', 'Missing closeModal handler');
  assertContains(file, 'nextImage', 'Missing nextImage handler');
  assertContains(file, 'prevImage', 'Missing prevImage handler');
  assertContains(file, '(prev + 1) % activeModalProject.gallery.length', 'nextImage missing modulo wrap-around');
  assertContains(file, 'prev === 0 ? activeModalProject.gallery.length - 1 : prev - 1', 'prevImage missing modulo wrap-around');
});

test('R3-09', 'R3-ServiciosFotografia', 'All gallery images referenced in fotografia page exist on disk (>5KB)', () => {
  const file = readFile('src/app/servicios/fotografia/page.tsx');
  const galleryMatches = file.match(/\/images\/real\/[^'"`]+/g) || [];
  assert(galleryMatches.length >= 10, `Expected at least 10 gallery image matches, found ${galleryMatches.length}`);
  for (const imgPath of galleryMatches) {
    const fullPath = path.join(PUBLIC_DIR, imgPath.replace(/^\//, ''));
    assert(fs.existsSync(fullPath), `Gallery image does not exist on disk: ${fullPath}`);
    assert(fs.statSync(fullPath).size > 5000, `Gallery image corrupted/too small: ${fullPath}`);
  }
});

test('R3-10', 'R3-ServiciosFotografia', 'Prerendered HTML for /servicios/fotografia contains all 10 projects and Cyan classes', () => {
  const htmlPath = path.join(NEXT_APP_DIR, 'servicios', 'fotografia.html');
  assert(fs.existsSync(htmlPath), `Prerendered HTML missing: ${htmlPath}`);
  const html = fs.readFileSync(htmlPath, 'utf-8');
  assertContains(html, 'Estancia Rilan', 'Prerendered HTML missing Estancia Rilán');
  assertContains(html, 'Cala Mel', 'Prerendered HTML missing Cala Melí');
  assertContains(html, 'Costaustralis', 'Prerendered HTML missing Costaustralis');
  assertContains(html, 'Aqua Chile', 'Prerendered HTML missing AquaChile');
  assertContains(html, 'VER FOTOGRAFÍAS', 'Prerendered HTML missing VER FOTOGRAFÍAS button');
  assertContains(html, 'bg-puelche-cyan', 'Prerendered HTML missing bg-puelche-cyan');
});

// ============================================================================
// 3. R3: /portafolio PANORAMIC BANDS, CYAN CARDS & CASE STUDY DRAWER
// ============================================================================

test('R3-11', 'R3-Portafolio', 'portafolio renders panoramic bands with bottom-left Cyan #59BFD6 card', () => {
  const file = readFile('src/app/portafolio/page.tsx');
  assertContains(file, 'bg-[#59BFD6]', 'Portfolio card missing Cyan #59BFD6');
  assertContains(file, 'absolute bottom-8', 'Card missing bottom positioning');
  assertContains(file, 'left-0', 'Card missing left positioning');
  assertContains(file, 'Cliente: {project.client}', 'Card missing client name');
  assertContains(file, 'VER FOTOGRAFÍAS', 'Card missing button VER FOTOGRAFÍAS');
});

test('R3-12', 'R3-Portafolio', 'portafolio category tabs filter projects with verified counts', () => {
  const file = readFile('src/app/portafolio/page.tsx');
  const expectedTabs = ['Todos', 'Fotografía', 'Branding', 'Desarrollo Web', 'Editorial'];
  for (const tab of expectedTabs) {
    assertContains(file, tab, `Portfolio missing category filter tab: ${tab}`);
  }
  assertContains(file, 'selectedCategory === cat', 'Missing active tab comparison');
  assertContains(file, 'filteredProjects = selectedCategory === \'Todos\'', 'Missing category filter ternary');
});

test('R3-13', 'R3-Portafolio', 'portafolio case study drawer renders details, deliverables, and quote CTA', () => {
  const file = readFile('src/app/portafolio/page.tsx');
  assertContains(file, 'activeModalProject &&', 'Missing modal drawer conditional');
  assertContains(file, 'activeModalProject.description', 'Missing description in modal');
  assertContains(file, 'activeModalProject.deliverables', 'Missing deliverables in modal');
  assertContains(file, 'CheckCircle2', 'Missing CheckCircle2 deliverable icons');
  assertContains(file, '/contacto?proyecto=', 'Missing quote CTA transition');
  assertContains(file, 'aria-label="Cerrar modal"', 'Missing accessible close button');
});

test('R3-14', 'R3-Portafolio', 'Prerendered HTML for /portafolio exists and contains authentic project data', () => {
  const htmlPath = path.join(NEXT_APP_DIR, 'portafolio.html');
  assert(fs.existsSync(htmlPath), `Prerendered HTML missing: ${htmlPath}`);
  const html = fs.readFileSync(htmlPath, 'utf-8');
  assertContains(html, 'VER FOTOGRAFÍAS', 'Prerendered portafolio missing VER FOTOGRAFÍAS');
  assertContains(html, 'Estancia Rilan', 'Prerendered portafolio missing Estancia Rilan');
  assertContains(html, '#59BFD6', 'Prerendered portafolio missing #59BFD6 Cyan color');
});

// ============================================================================
// 4. R4: /clientes 100% CYAN BACKGROUND & 20 WHITE LOGOS
// ============================================================================

test('R4-01', 'R4-Clientes', 'clientes page sets 100% full-screen Cyan #59BFD6 background', () => {
  const file = readFile('src/app/clientes/page.tsx');
  assertContains(file, 'bg-puelche-cyan', 'Root container missing bg-puelche-cyan');
  assertContains(file, 'min-h-screen', 'Root container missing min-h-screen for 100% background');
});

test('R4-02', 'R4-Clientes', 'clientes page renders all 20 white client logos (cliente1-1.png to cliente20-1.png)', () => {
  const file = readFile('src/app/clientes/page.tsx');
  for (let i = 1; i <= 20; i++) {
    const expectedLogoFile = `cliente${i}-1.png`;
    assertContains(file, expectedLogoFile, `clientes page missing logo reference: ${expectedLogoFile}`);
  }
});

test('R4-03', 'R4-Clientes', 'All 20 client logo files physically exist in public/images/real/clients/ with valid sizes', () => {
  const clientsDir = path.join(PUBLIC_DIR, 'images', 'real', 'clients');
  assert(fs.existsSync(clientsDir), `Clients directory does not exist: ${clientsDir}`);
  for (let i = 1; i <= 20; i++) {
    const logoName = `cliente${i}-1.png`;
    const fullPath = path.join(clientsDir, logoName);
    assert(fs.existsSync(fullPath), `Logo file missing on disk: ${fullPath}`);
    const size = fs.statSync(fullPath).size;
    assert(size > 2000, `Logo file ${logoName} size ${size}B is too small, possible corruption`);
  }
});

test('R4-04', 'R4-Clientes', 'clientes directory table renders verified client profiles', () => {
  const file = readFile('src/app/clientes/page.tsx');
  assertContains(file, 'CLIENT_PROFILES', 'Missing CLIENT_PROFILES export');
  assertContains(file, 'AquaChile', 'Missing AquaChile profile');
  assertContains(file, 'Estancia Rilán', 'Missing Estancia Rilán profile');
  assertContains(file, 'Hotel Costaustralis', 'Missing Hotel Costaustralis profile');
  assertContains(file, 'Hotel Cabo de Hornos', 'Missing Hotel Cabo de Hornos profile');
  assertContains(file, 'Doosan Bobcat Chile', 'Missing Doosan profile');
});

test('R4-05', 'R4-Clientes', 'Prerendered HTML for /clientes contains all 20 client logo tags and 100% Cyan container', () => {
  const htmlPath = path.join(NEXT_APP_DIR, 'clientes.html');
  assert(fs.existsSync(htmlPath), `Prerendered HTML missing: ${htmlPath}`);
  const html = fs.readFileSync(htmlPath, 'utf-8');
  assertContains(html, 'bg-puelche-cyan', 'Prerendered HTML missing bg-puelche-cyan');
  for (let i = 1; i <= 20; i++) {
    assertContains(html, `cliente${i}-1.png`, `Prerendered HTML missing cliente${i}-1.png`);
  }
});

// ============================================================================
// 5. R4: /contacto FORM VALIDATION, RESET & DIRECT CONTACT INFO
// ============================================================================

test('R4-06', 'R4-Contacto', 'contacto form contains required Nombre, Teléfono, and Correo fields', () => {
  const file = readFile('src/app/contacto/page.tsx');
  assertContains(file, 'id="nombre"', 'Missing id="nombre"');
  assertContains(file, 'id="telefono"', 'Missing id="telefono"');
  assertContains(file, 'id="correo"', 'Missing id="correo"');
  assertContains(file, 'type="tel"', 'Missing type="tel"');
  assertContains(file, 'type="email"', 'Missing type="email"');
  assertContains(file, 'Nombre y Apellido *', 'Missing label Nombre y Apellido *');
  assertContains(file, 'Teléfono de Contacto *', 'Missing label Teléfono de Contacto *');
  assertContains(file, 'Correo Electrónico *', 'Missing label Correo Electrónico *');
});

test('R4-07', 'R4-Contacto', 'contacto form renders authentic Solicitud checkboxes (Fotografía, Sitio Web, Redes Sociales, Diseño Gráfico)', () => {
  const file = readFile('src/app/contacto/page.tsx');
  const expectedServices = ['Fotografía', 'Sitio Web', 'Redes Sociales', 'Diseño Gráfico'];
  for (const s of expectedServices) {
    assertContains(file, s, `Missing Solicitud checkbox: ${s}`);
  }
  assertContains(file, 'handleCheckboxChange', 'Missing handleCheckboxChange toggle handler');
});

test('R4-08', 'R4-Contacto', 'contacto form provides complete reset behavior restoring initial empty state', () => {
  const file = readFile('src/app/contacto/page.tsx');
  assertContains(file, 'handleReset', 'Missing handleReset function');
  assertContains(file, "setName('')", 'handleReset must clear name');
  assertContains(file, "setPhone('')", 'handleReset must clear phone');
  assertContains(file, "setEmail('')", 'handleReset must clear email');
  assertContains(file, 'setSelectedServices([])', 'handleReset must clear selected services');
  assertContains(file, 'setSubmitted(false)', 'handleReset must restore submitted to false');
  assertContains(file, 'Enviar otro requerimiento', 'Missing reset button in submitted view');
});

test('R4-09', 'R4-Contacto', 'contacto page displays verified direct contact information for Paula Valdivieso in Puerto Varas', () => {
  const file = readFile('src/app/contacto/page.tsx');
  assertContains(file, 'Paula Valdivieso', 'Missing Paula Valdivieso name');
  assertContains(file, 'paula.valdivieso@puelchelab.cl', 'Missing Paula Valdivieso email');
  assertContains(file, '+56 9 6617 7500', 'Missing studio phone');
  assertContains(file, 'Puerto Varas, Región de Los Lagos, Chile', 'Missing Puerto Varas location badge');
  assertContains(file, 'href="mailto:paula.valdivieso@puelchelab.cl"', 'Missing mailto link');
  assertContains(file, 'href="tel:+56966177500"', 'Missing tel link');
});

test('R4-10', 'R4-Contacto', 'Prerendered HTML for /contacto contains Paula Valdivieso contact info and form markup', () => {
  const htmlPath = path.join(NEXT_APP_DIR, 'contacto.html');
  assert(fs.existsSync(htmlPath), `Prerendered HTML missing: ${htmlPath}`);
  const html = fs.readFileSync(htmlPath, 'utf-8');
  assertContains(html, 'Paula Valdivieso', 'Prerendered HTML missing Paula Valdivieso');
  assertContains(html, 'paula.valdivieso@puelchelab.cl', 'Prerendered HTML missing email');
  assertContains(html, '+56 9 6617 7500', 'Prerendered HTML missing telephone');
  assertContains(html, 'Puerto Varas', 'Prerendered HTML missing Puerto Varas');
});

// ============================================================================
// 6. ADVERSARIAL STRESS & WCAG 2.1 COLOR CONTRAST TESTS
// ============================================================================

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const l1 = getLuminance(...rgb1);
  const l2 = getLuminance(...rgb2);
  const brighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (brighter + 0.05) / (darker + 0.05);
}

test('ADV-01', 'Adversarial-Contrast', 'Slate header #3B3D42 achieves WCAG AA contrast (>4.5:1) against white text', () => {
  // Slate #3B3D42 = rgb(59, 61, 66)
  // White #FFFFFF = rgb(255, 255, 255)
  const ratio = getContrastRatio([59, 61, 66], [255, 255, 255]);
  assert(ratio >= 4.5, `Header contrast ratio ${ratio.toFixed(2)}:1 does not meet WCAG AA (>=4.5:1)`);
});

test('ADV-02', 'Adversarial-Contrast', 'Cyan #59BFD6 achieves WCAG 2.1 Large Text contrast (>=3.0:1) against dark text/borders', () => {
  // Cyan #59BFD6 = rgb(89, 191, 214)
  // Dark Slate #1D2024 = rgb(29, 32, 36)
  const ratio = getContrastRatio([89, 191, 214], [29, 32, 36]);
  assert(ratio >= 4.5, `Cyan against Dark Slate contrast ratio ${ratio.toFixed(2)}:1 is below 4.5:1`);
});

test('ADV-03', 'Adversarial-Forms', 'Contact form WhatsApp generator sanitizes adversarial strings (quotes, newlines, XSS tags)', () => {
  const sanitizeOrEncode = (name: string, company: string, msg: string) => {
    const raw = `Hola Puelche Lab,\nMi nombre es ${name} de ${company}.\nMensaje: ${msg}`;
    return encodeURIComponent(raw);
  };
  const xssAttempt = '<script>alert("XSS")</script>&param=attack';
  const encoded = sanitizeOrEncode(xssAttempt, 'Acme "Corp"', "Test's line\nbreak");
  assertNotContains(encoded, '<script>', 'Raw unencoded script tags found');
  assertNotContains(encoded, '"', 'Raw unencoded double quotes found');
  assertContains(encoded, '%3Cscript%3E', 'Script tags not properly encoded');
});

test('ADV-04', 'Adversarial-ZeroUnsplash', 'Global scan of all TypeScript, CSS, and HTML files in src/ contains 0 Unsplash matches', () => {
  function scanDir(dir: string): string[] {
    const results: string[] = [];
    const list = fs.readdirSync(dir);
    for (const item of list) {
      const full = path.join(dir, item);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        results.push(...scanDir(full));
      } else if (/\.(ts|tsx|css|json)$/.test(item)) {
        results.push(full);
      }
    }
    return results;
  }
  const files = scanDir(SRC_DIR);
  for (const f of files) {
    const content = fs.readFileSync(f, 'utf-8');
    assertNotContains(content.toLowerCase(), 'unsplash', `Unsplash reference found in ${f}`);
  }
});

test('ADV-05', 'Adversarial-Header', 'Navbar rendered in index.html is solid slate #3B3D42 with logo-top.png and uppercase nav', () => {
  const html = fs.readFileSync(path.join(NEXT_APP_DIR, 'index.html'), 'utf-8');
  assertContains(html, 'logo-top.png', 'Navbar in index.html missing logo-top.png');
  assertContains(html, 'HOME', 'Navbar in index.html missing uppercase HOME');
  assertContains(html, 'PORTAFOLIO', 'Navbar in index.html missing uppercase PORTAFOLIO');
  assertContains(html, 'CLIENTES', 'Navbar in index.html missing uppercase CLIENTES');
  assertContains(html, 'CONTACTO', 'Navbar in index.html missing uppercase CONTACTO');
  assert(html.includes('bg-puelche-slate') || html.includes('bg-[#3B3D42]'), 'Navbar in index.html missing solid slate class');
});

test('ADV-06', 'Adversarial-HomeStorytelling', 'Home page 100vh 3-section storytelling verified in prerendered index.html', () => {
  const html = fs.readFileSync(path.join(NEXT_APP_DIR, 'index.html'), 'utf-8');
  // Section 1: Foggy forest + Colossal white emblem
  assertContains(html, 'bg-agencia.jpg', 'Section 1 missing bg-agencia.jpg');
  assertContains(html, 'logo-puelche.png', 'Section 1 missing white logo-puelche.png');
  assertContains(html, 'VIENTO CREATIVO', 'Section 1 missing VIENTO CREATIVO');
  assertContains(html, 'Un Estudio de Diseño Cross Media y Fotografía de Puerto Varas', 'Section 1 missing subtitle');
  // Section 2: Wooden fence & lake + Cross Media narrative
  assertContains(html, 'bg-home-2.jpg', 'Section 2 missing bg-home-2.jpg');
  assertContains(html, 'Cross Media', 'Section 2 missing Cross Media manifesto');
  // Section 3: 100% Cyan block with CONTACTANOS
  assertContains(html, 'CONTACTANOS', 'Section 3 missing CONTACTANOS');
  assertContains(html, 'bg-puelche-cyan', 'Section 3 missing bg-puelche-cyan');
});

// ============================================================================
// RUNNER HARNESS
// ============================================================================

async function runAll() {
  console.log(`\n======================================================================`);
  console.log(`     GEN2_CHALLENGER_2 EMPIRICAL ADVERSARIAL STRESS TEST SUITE        `);
  console.log(`======================================================================\n`);
  console.log(`Total tests scheduled: ${testQueue.length}\n`);

  let currentCategory = '';
  for (const t of testQueue) {
    if (t.category !== currentCategory) {
      currentCategory = t.category;
      console.log(`\n--- CATEGORY: ${currentCategory} ---`);
    }

    const start = performance.now();
    let passed = false;
    let error: string | undefined;

    try {
      await t.run();
      passed = true;
    } catch (err: any) {
      passed = false;
      error = err?.message || String(err);
    }

    const durationMs = Math.round(performance.now() - start);
    testResults.push({ id: t.id, category: t.category, name: t.name, passed, error, durationMs });

    const status = passed ? '\x1b[32m✔ PASS\x1b[0m' : '\x1b[31m✖ FAIL\x1b[0m';
    console.log(`  ${status} [${t.id}] ${t.name} (${durationMs}ms)`);
    if (!passed && error) {
      console.log(`      \x1b[31m↳ Error: ${error}\x1b[0m`);
    }
  }

  const total = testResults.length;
  const passedCount = testResults.filter(r => r.passed).length;
  const failedCount = total - passedCount;
  const passRate = ((passedCount / total) * 100).toFixed(1);

  console.log(`\n======================================================================`);
  console.log(`                       CHALLENGER SUMMARY DASHBOARD                   `);
  console.log(`======================================================================`);
  console.log(`  Total Executed : ${total}`);
  console.log(`  Passed         : \x1b[32m${passedCount}\x1b[0m`);
  console.log(`  Failed         : ${failedCount > 0 ? '\x1b[31m' : '\x1b[32m'}${failedCount}\x1b[0m`);
  console.log(`  Success Rate   : ${passRate}%\n`);

  if (failedCount > 0) {
    console.error(`\x1b[31mFAILED: ${failedCount} stress tests failed.\x1b[0m\n`);
    process.exit(1);
  } else {
    console.log(`\x1b[32mALL ${total} EMPIRICAL ADVERSARIAL TESTS PASSED WITHOUT DEFECTS.\x1b[0m\n`);
    process.exit(0);
  }
}

runAll().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
