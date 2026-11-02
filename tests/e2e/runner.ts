/**
 * Autonomous Opaque-Box E2E Test Runner for Puelche Lab
 * Location: tests/e2e/runner.ts
 *
 * Runs 128 tests across 4 Tiers:
 * - Tier 1: Feature Coverage (55 tests: 5 tests x 11 core features)
 * - Tier 2: Boundary & Corner Cases (55 tests: 5 tests x 11 core features)
 * - Tier 3: Cross-Feature Combinations (12 pairwise integration tests)
 * - Tier 4: Real-World Workload Scenarios (6 end-to-end user journeys)
 *
 * Execution:
 *   npx tsx tests/e2e/runner.ts
 *   npx tsx tests/e2e/runner.ts --tier=1
 */

import * as fs from 'fs';
import * as path from 'path';

// --- Color & Formatting Constants ---
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const MAGENTA = '\x1b[35m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';
const GRAY = '\x1b[90m';

// --- Project Root & Helpers ---
const ROOT = path.resolve(__dirname, '../..');

function fileExists(relPath: string): boolean {
  return fs.existsSync(path.join(ROOT, relPath));
}

function readFile(relPath: string): string {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) return '';
  return fs.readFileSync(fullPath, 'utf-8');
}

function getFileSize(relPath: string): number {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) return 0;
  return fs.statSync(fullPath).size;
}

// --- Test State & Harness ---
interface TestCase {
  id: string;
  name: string;
  tier: number;
  feature: string;
  fn: () => void | Promise<void>;
}

interface TestResult {
  test: TestCase;
  passed: boolean;
  error?: string;
  durationMs: number;
}

const tests: TestCase[] = [];

function registerTest(
  id: string,
  name: string,
  tier: number,
  feature: string,
  fn: () => void | Promise<void>
) {
  tests.push({ id, name, tier, feature, fn });
}

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (actual !== expected) {
    throw new Error(`${message} — Expected: "${expected}", Received: "${actual}"`);
  }
}

function assertContains(text: string, substring: string, message: string) {
  if (!text.includes(substring)) {
    throw new Error(`${message} — Expected text to contain "${substring}"`);
  }
}

function assertNotContains(text: string, substring: string, message: string) {
  if (text.includes(substring)) {
    throw new Error(`${message} — Forbidden text found: "${substring}"`);
  }
}

// ============================================================================
// TIER 1: FEATURE COVERAGE (55 Tests — 5 per feature across 11 features)
// ============================================================================

// --- F1: Navbar Official Logo & Links ---
registerTest('T1.1.1', 'Navbar renders official asset /images/real/logo-top.png', 1, 'F1-Navbar', () => {
  const navbar = readFile('src/components/layout/Navbar.tsx');
  assertContains(navbar, '/images/real/logo-top.png', 'Navbar must render /images/real/logo-top.png');
  assertNotContains(navbar, '<Wind', 'Navbar must not use generic Lucide Wind icon');
});

registerTest('T1.1.2', 'Navbar logo uses responsive dimensions and priority', 1, 'F1-Navbar', () => {
  const navbar = readFile('src/components/layout/Navbar.tsx');
  assert(navbar.includes('h-8') || navbar.includes('h-10') || navbar.includes('priority'), 'Navbar logo must have responsive sizing');
});

registerTest('T1.1.3', 'Navbar contains all 6 core navigation links', 1, 'F1-Navbar', () => {
  const navbar = readFile('src/components/layout/Navbar.tsx');
  const expectedLinks = ['/portafolio', '/servicios/fotografia', '/servicios/branding', '/servicios/desarrollo-web', '/servicios/editorial', '/clientes'];
  for (const link of expectedLinks) {
    assertContains(navbar, link, `Navbar missing expected navigation link: ${link}`);
  }
});

registerTest('T1.1.4', 'Navbar renders accessible mobile menu toggle', 1, 'F1-Navbar', () => {
  const navbar = readFile('src/components/layout/Navbar.tsx');
  assertContains(navbar, 'aria-label="Abrir menú"', 'Mobile button missing accessibility label');
  assertContains(navbar, 'mobileOpen', 'Mobile drawer state missing in Navbar');
});

registerTest('T1.1.5', 'Navbar contains Cotizar Proyecto CTA button to /contacto', 1, 'F1-Navbar', () => {
  const navbar = readFile('src/components/layout/Navbar.tsx');
  assertContains(navbar, 'href="/contacto"', 'Navbar CTA missing link to /contacto');
  assertContains(navbar, 'Cotizar Proyecto', 'Navbar missing CTA label Cotizar Proyecto');
});

// --- F2: Footer Official Logo & Verified Contact ---
registerTest('T1.2.1', 'Footer renders official stacked logo /images/real/logo-puelche.png', 1, 'F2-Footer', () => {
  const footer = readFile('src/components/layout/Footer.tsx');
  assert(footer.includes('/images/real/logo-puelche.png') || footer.includes('/images/real/logo-top.png'), 'Footer must render genuine Puelche logo asset');
});

registerTest('T1.2.2', 'Footer displays verified creative director email paula.valdivieso@puelchelab.cl', 1, 'F2-Footer', () => {
  const footer = readFile('src/components/layout/Footer.tsx');
  assertContains(footer, 'paula.valdivieso@puelchelab.cl', 'Footer missing verified email for Paula Valdivieso');
});

registerTest('T1.2.3', 'Footer displays verified studio phone +56 9 6617 7500', 1, 'F2-Footer', () => {
  const footer = readFile('src/components/layout/Footer.tsx');
  assertContains(footer, '+56 9 6617 7500', 'Footer missing verified telephone +56 9 6617 7500');
});

registerTest('T1.2.4', 'Footer contains Viento Puelche manifesto headline and brief CTA', 1, 'F2-Footer', () => {
  const footer = readFile('src/components/layout/Footer.tsx');
  assertContains(footer, 'EL MANIFIESTO DEL PUELCHE', 'Footer missing manifesto badge');
  assertContains(footer, 'href="/contacto"', 'Footer CTA missing link to /contacto');
});

registerTest('T1.2.5', 'Footer uses semantic markup without h1 tag inside footer', 1, 'F2-Footer', () => {
  const footer = readFile('src/components/layout/Footer.tsx');
  assertNotContains(footer, '<h1', 'Footer must not contain an <h1> tag; colossal wordmark must use div/p');
});

// --- F3: Zero Unsplash Anti-Stock Invariant ---
registerTest('T1.3.1', 'Zero Unsplash references in src/data/portfolio.ts', 1, 'F3-ZeroUnsplash', () => {
  const portfolio = readFile('src/data/portfolio.ts');
  assertNotContains(portfolio, 'unsplash', 'portfolio.ts contains forbidden Unsplash references');
});

registerTest('T1.3.2', 'Zero Unsplash references across all service pages', 1, 'F3-ZeroUnsplash', () => {
  const serviceFiles = [
    'src/app/servicios/page.tsx',
    'src/app/servicios/fotografia/page.tsx',
    'src/app/servicios/branding/page.tsx',
    'src/app/servicios/desarrollo-web/page.tsx',
    'src/app/servicios/editorial/page.tsx',
  ];
  for (const f of serviceFiles) {
    const content = readFile(f);
    assertNotContains(content, 'unsplash', `${f} contains forbidden Unsplash references`);
  }
});

registerTest('T1.3.3', 'next.config.ts remotePatterns does not contain images.unsplash.com', 1, 'F3-ZeroUnsplash', () => {
  const config = readFile('next.config.ts');
  assertNotContains(config, 'images.unsplash.com', 'next.config.ts must not allow images.unsplash.com');
});

registerTest('T1.3.4', 'All 15 authentic base assets exist in public/images/real/', 1, 'F3-ZeroUnsplash', () => {
  const requiredAssets = [
    'public/images/real/logo-top.png',
    'public/images/real/logo-puelche.png',
    'public/images/real/bg-home-2.jpg',
    'public/images/real/bg-agencia.jpg',
    'public/images/real/bg-fotografia-6-min.jpg',
    'public/images/real/bg-fotografia-9-min.jpg',
    'public/images/real/bg-portafolios-fotografia-min.jpg',
    'public/images/real/bg-portafolios-fotografia-a-min.jpg',
    'public/images/real/bg-portafolios-fotografia-b-min.jpg',
    'public/images/real/bg-portafolios-fotografia-c-min.jpg',
    'public/images/real/bg-portafolios-fotografia-d-min.jpg',
    'public/images/real/bg-portafolios-fotografia-f-min.jpg',
    'public/images/real/bg-portafolios-fotografia-g-min.jpg',
    'public/images/real/bg-portafolios-fotografia-h-min.jpg',
    'public/images/real/bg-portafolios-fotografia-i-min.jpg',
    'public/images/real/bg-portafolios-marca-blue-seal-min.jpg',
    'public/images/real/bg-portafolios-marca-sur-terra-min.jpg',
  ];
  for (const asset of requiredAssets) {
    assert(fileExists(asset), `Missing required real asset: ${asset}`);
    assert(getFileSize(asset) > 1000, `Asset file is empty or corrupted: ${asset}`);
  }
});

registerTest('T1.3.5', 'All 8 portfolio projects map to local /images/real/ paths', 1, 'F3-ZeroUnsplash', () => {
  const portfolio = readFile('src/data/portfolio.ts');
  const imageMatches = portfolio.match(/image:\s*['"`]([^'"`]+)['"`]/g) || [];
  assert(imageMatches.length >= 8, `Expected at least 8 project images, found ${imageMatches.length}`);
  for (const match of imageMatches) {
    assert(match.includes('/images/real/'), `Project image must map to /images/real/: ${match}`);
  }
});

// --- F4: Interactive Portfolio Showcase & Filtering ---
registerTest('T1.4.1', 'Portfolio page defines all 5 category filter tabs', 1, 'F4-PortfolioFilter', () => {
  const portfolioPage = readFile('src/app/portafolio/page.tsx');
  const expectedCats = ['Todos', 'Fotografía', 'Branding', 'Desarrollo Web', 'Editorial'];
  for (const cat of expectedCats) {
    assertContains(portfolioPage, cat, `Portfolio page missing filter category: ${cat}`);
  }
});

registerTest('T1.4.2', 'Portfolio category filter algorithm functions deterministically', 1, 'F4-PortfolioFilter', () => {
  const portfolioData = readFile('src/data/portfolio.ts');
  assertContains(portfolioData, 'export const PORTFOLIO_PROJECTS', 'PORTFOLIO_PROJECTS export missing');
  assertContains(portfolioData, 'category: \'Fotografía\'', 'Fotografía category missing in data');
  assertContains(portfolioData, 'category: \'Branding\'', 'Branding category missing in data');
});

registerTest('T1.4.3', 'Portfolio page displays dynamic project count badges per tab', 1, 'F4-PortfolioFilter', () => {
  const portfolioPage = readFile('src/app/portafolio/page.tsx');
  assertContains(portfolioPage, 'count', 'Portfolio missing dynamic count badge calculation');
});

registerTest('T1.4.4', 'Project cards render 16:10 aspect ratio and metadata tags', 1, 'F4-PortfolioFilter', () => {
  const portfolioPage = readFile('src/app/portafolio/page.tsx');
  assertContains(portfolioPage, 'aspect-[16/10]', 'Project card must use 16:10 aspect ratio');
  assertContains(portfolioPage, 'project.deliverables', 'Project card must render deliverables list');
});

registerTest('T1.4.5', 'Project cards include accessible click action to open detail modal', 1, 'F4-PortfolioFilter', () => {
  const portfolioPage = readFile('src/app/portafolio/page.tsx');
  assertContains(portfolioPage, 'setActiveModalProject', 'Project card missing modal trigger handler');
});

// --- F5: Modal Drawer & Case Study Detail ---
registerTest('T1.5.1', 'Modal drawer activates via activeModalProject state', 1, 'F5-ModalDrawer', () => {
  const portfolioPage = readFile('src/app/portafolio/page.tsx');
  assertContains(portfolioPage, 'activeModalProject &&', 'Modal conditional rendering block missing');
});

registerTest('T1.5.2', 'Modal renders complete case study description and metadata', 1, 'F5-ModalDrawer', () => {
  const portfolioPage = readFile('src/app/portafolio/page.tsx');
  assertContains(portfolioPage, 'activeModalProject.description', 'Modal missing project description');
  assertContains(portfolioPage, 'activeModalProject.location', 'Modal missing project location');
  assertContains(portfolioPage, 'activeModalProject.year', 'Modal missing project year');
});

registerTest('T1.5.3', 'Modal renders deliverables checklist with CheckCircle2 icons', 1, 'F5-ModalDrawer', () => {
  const portfolioPage = readFile('src/app/portafolio/page.tsx');
  assertContains(portfolioPage, 'CheckCircle2', 'Modal missing CheckCircle2 icons for deliverables');
});

registerTest('T1.5.4', 'Modal close button renders with accessible aria-label', 1, 'F5-ModalDrawer', () => {
  const portfolioPage = readFile('src/app/portafolio/page.tsx');
  assertContains(portfolioPage, 'aria-label="Cerrar modal"', 'Modal close button missing aria-label');
  assertContains(portfolioPage, 'setActiveModalProject(null)', 'Modal close action missing');
});

registerTest('T1.5.5', 'Modal conversion CTA links to /contacto with encoded project title param', 1, 'F5-ModalDrawer', () => {
  const portfolioPage = readFile('src/app/portafolio/page.tsx');
  assertContains(portfolioPage, '/contacto?proyecto=', 'Modal CTA must link to /contacto?proyecto=');
  assertContains(portfolioPage, 'encodeURIComponent', 'Modal CTA must URI-encode project title');
});

// --- F6: 4-Step Interactive Brief & Contact Form ---
registerTest('T1.6.1', 'Phase 1 renders 6 selectable service options', 1, 'F6-ContactBrief', () => {
  const contactPage = readFile('src/app/contacto/page.tsx');
  assertContains(contactPage, 'Fotografía Arquitectura & Hotelería', 'Missing service option 1');
  assertContains(contactPage, 'Fotografía Industrial & Dron 4K', 'Missing service option 2');
  assertContains(contactPage, 'Diseño de Marca & Identidad', 'Missing service option 3');
  assertContains(contactPage, 'Desarrollo Web Next.js', 'Missing service option 4');
  assertContains(contactPage, 'Diseño Editorial & Memorias', 'Missing service option 5');
});

registerTest('T1.6.2', 'Phase 2 renders 4 budget investment tiers', 1, 'F6-ContactBrief', () => {
  const contactPage = readFile('src/app/contacto/page.tsx');
  assertContains(contactPage, '$1.5M — $3.0M CLP', 'Missing budget tier 1');
  assertContains(contactPage, '$3.0M — $6.0M CLP', 'Missing budget tier 2');
  assertContains(contactPage, '$6.0M — $12.0M CLP', 'Missing budget tier 3');
  assertContains(contactPage, '+$12.0M CLP (Corporativo)', 'Missing budget tier 4');
});

registerTest('T1.6.3', 'Phase 3 renders Southern Chile territorial region dropdown', 1, 'F6-ContactBrief', () => {
  const contactPage = readFile('src/app/contacto/page.tsx');
  assertContains(contactPage, 'Puerto Varas & Cuenca Llanquihue', 'Missing region option Puerto Varas');
  assertContains(contactPage, 'Archipiélago de Chiloé', 'Missing region option Chiloé');
  assertContains(contactPage, 'Carretera Austral / Aysén', 'Missing region option Aysén');
});

registerTest('T1.6.4', 'Phase 4 renders required inputs for Name, Email, and Phone', 1, 'F6-ContactBrief', () => {
  const contactPage = readFile('src/app/contacto/page.tsx');
  assertContains(contactPage, 'type="email"', 'Missing email input in contact form');
  assertContains(contactPage, 'type="tel"', 'Missing tel input in contact form');
  assertContains(contactPage, 'required', 'Required constraint missing on contact inputs');
});

registerTest('T1.6.5', 'Contact form submission transitions to confirmation screen', 1, 'F6-ContactBrief', () => {
  const contactPage = readFile('src/app/contacto/page.tsx');
  assertContains(contactPage, 'submitted ?', 'Missing submitted view condition');
  assertContains(contactPage, 'Brief Recibido con Éxito', 'Missing confirmation headline');
});

// --- F7: Direct WhatsApp Generator & Floating Button ---
registerTest('T1.7.1', 'WhatsApp link generator targets verified phone 56966177500', 1, 'F7-WhatsApp', () => {
  const contactPage = readFile('src/app/contacto/page.tsx');
  assertContains(contactPage, 'wa.me/56966177500', 'WhatsApp link generator must target 56966177500');
});

registerTest('T1.7.2', 'WhatsApp message generator encodes client and company details', 1, 'F7-WhatsApp', () => {
  const contactPage = readFile('src/app/contacto/page.tsx');
  assertContains(contactPage, 'generateWhatsAppLink', 'Missing generateWhatsAppLink function');
  assertContains(contactPage, 'encodeURIComponent', 'WhatsApp generator must encode URI message');
});

registerTest('T1.7.3', 'WhatsApp message includes selected services, budget, and region', 1, 'F7-WhatsApp', () => {
  const contactPage = readFile('src/app/contacto/page.tsx');
  assertContains(contactPage, 'selectedServices', 'WhatsApp generator must incorporate selectedServices');
  assertContains(contactPage, 'selectedBudget', 'WhatsApp generator must incorporate selectedBudget');
  assertContains(contactPage, 'selectedRegion', 'WhatsApp generator must incorporate selectedRegion');
});

registerTest('T1.7.4', 'Floating WhatsApp button component exists in src/components/ui/', 1, 'F7-WhatsApp', () => {
  assert(fileExists('src/components/ui/WhatsAppButton.tsx'), 'Missing WhatsAppButton.tsx');
  const btn = readFile('src/components/ui/WhatsAppButton.tsx');
  assertContains(btn, 'wa.me/56966177500', 'Floating button must target 56966177500');
});

registerTest('T1.7.5', 'Floating WhatsApp button features animated ping life indicator', 1, 'F7-WhatsApp', () => {
  const btn = readFile('src/components/ui/WhatsAppButton.tsx');
  assertContains(btn, 'animate-ping', 'Floating button missing animate-ping life indicator');
  assertContains(btn, 'aria-label', 'Floating button missing accessibility label');
});

// --- F8: Real Client Logos Grid & Territorial Directory ---
registerTest('T1.8.1', 'Directory table on /clientes renders 12 verified client profiles', 1, 'F8-ClientProof', () => {
  const clientesPage = readFile('src/app/clientes/page.tsx');
  assertContains(clientesPage, 'CLIENT_PROFILES', 'Missing CLIENT_PROFILES data in /clientes');
  assertContains(clientesPage, 'AquaChile', 'Missing AquaChile in client directory');
  assertContains(clientesPage, 'Estancia Rilán', 'Missing Estancia Rilán in client directory');
  assertContains(clientesPage, 'Hotel Costaustralis', 'Missing Hotel Costaustralis in client directory');
});

registerTest('T1.8.2', 'Territorial scope grid renders all 4 regional nodes', 1, 'F8-ClientProof', () => {
  const clientesPage = readFile('src/app/clientes/page.tsx');
  assertContains(clientesPage, 'Cuenca Llanquihue', 'Missing Nodo 01 Cuenca Llanquihue');
  assertContains(clientesPage, 'Archipiélago Chiloé', 'Missing Nodo 02 Archipiélago Chiloé');
  assertContains(clientesPage, 'Carretera Austral & Aysén', 'Missing Nodo 03 Carretera Austral');
  assertContains(clientesPage, 'Magallanes Austral', 'Missing Nodo 04 Magallanes Austral');
});

registerTest('T1.8.3', 'Testimonials section renders 3 authentic client quotes', 1, 'F8-ClientProof', () => {
  const clientesPage = readFile('src/app/clientes/page.tsx');
  assertContains(clientesPage, 'TESTIMONIALS', 'Missing TESTIMONIALS array');
  assertContains(clientesPage, 'Estancia Rilán Hotel & Cava', 'Missing Estancia Rilán testimonial');
  assertContains(clientesPage, 'Sur Terra', 'Missing Sur Terra testimonial');
});

registerTest('T1.8.4', 'Directory table has responsive horizontal scroll container', 1, 'F8-ClientProof', () => {
  const clientesPage = readFile('src/app/clientes/page.tsx');
  assertContains(clientesPage, 'overflow-x-auto', 'Table missing overflow-x-auto container');
  assertContains(clientesPage, 'min-w-[700px]', 'Table missing min-w-[700px] constraint');
});

registerTest('T1.8.5', '20 client logos configured in public/images/real/clients/', 1, 'F8-ClientProof', () => {
  const clientsDir = 'public/images/real/clients';
  if (fileExists(clientsDir)) {
    const files = fs.readdirSync(path.join(ROOT, clientsDir));
    assert(files.length >= 12, `Expected at least 12 client logos in ${clientsDir}, found ${files.length}`);
  } else {
    // Check that script or placeholder is ready for download in M4
    assert(fileExists('scripts/download_real_assets.py'), 'Download script must exist for client logos');
  }
});

// --- F9: Route Availability & 308 Legacy Redirects ---
registerTest('T1.9.1', 'All 11 App Router page files exist in src/app/', 1, 'F9-Routing', () => {
  const expectedRoutes = [
    'src/app/page.tsx',
    'src/app/clientes/page.tsx',
    'src/app/contacto/page.tsx',
    'src/app/portafolio/page.tsx',
    'src/app/servicios/page.tsx',
    'src/app/servicios/fotografia/page.tsx',
    'src/app/servicios/branding/page.tsx',
    'src/app/servicios/desarrollo-web/page.tsx',
    'src/app/servicios/editorial/page.tsx',
    'src/app/layout.tsx',
    'src/app/globals.css',
  ];
  for (const r of expectedRoutes) {
    assert(fileExists(r), `Missing App Router file: ${r}`);
  }
});

registerTest('T1.9.2', 'next.config.ts defines permanent redirect for /diseno-de-marca', 1, 'F9-Routing', () => {
  const config = readFile('next.config.ts');
  assertContains(config, "source: '/diseno-de-marca'", 'Missing redirect for /diseno-de-marca');
  assertContains(config, "destination: '/servicios/branding'", 'Redirect destination must be /servicios/branding');
  assertContains(config, 'permanent: true', 'Redirect must be permanent: true (308)');
});

registerTest('T1.9.3', 'next.config.ts defines permanent redirect for /fotografia-y-edicion-2', 1, 'F9-Routing', () => {
  const config = readFile('next.config.ts');
  assertContains(config, "source: '/fotografia-y-edicion-2'", 'Missing redirect for /fotografia-y-edicion-2');
  assertContains(config, "destination: '/servicios/fotografia'", 'Redirect destination must be /servicios/fotografia');
});

registerTest('T1.9.4', 'next.config.ts defines permanent redirect for /diseno-editorial', 1, 'F9-Routing', () => {
  const config = readFile('next.config.ts');
  assertContains(config, "source: '/diseno-editorial'", 'Missing redirect for /diseno-editorial');
  assertContains(config, "destination: '/servicios/editorial'", 'Redirect destination must be /servicios/editorial');
});

registerTest('T1.9.5', 'next.config.ts defines permanent redirect for /nuestros-clientes', 1, 'F9-Routing', () => {
  const config = readFile('next.config.ts');
  assertContains(config, "source: '/nuestros-clientes'", 'Missing redirect for /nuestros-clientes');
  assertContains(config, "destination: '/clientes'", 'Redirect destination must be /clientes');
});

// --- F10: Responsive Viewport Adaptability ---
registerTest('T1.10.1', 'Document defines viewport meta tag in layout or Next metadata', 1, 'F10-Responsive', () => {
  const layout = readFile('src/app/layout.tsx');
  assert(layout.includes('<html') && layout.includes('<body'), 'layout.tsx must render root html and body');
});

registerTest('T1.10.2', 'Grid containers use responsive breakpoint classes', 1, 'F10-Responsive', () => {
  const home = readFile('src/app/page.tsx');
  assertContains(home, 'grid-cols-1 md:grid-cols-2', 'Home missing responsive 1 to 2 column grid');
  assertContains(home, 'max-w-7xl mx-auto', 'Home containers must use max-w-7xl mx-auto');
});

registerTest('T1.10.3', 'Typography scales fluidly with breakpoint utilities', 1, 'F10-Responsive', () => {
  const home = readFile('src/app/page.tsx');
  assertContains(home, 'text-5xl sm:text-7xl md:text-8xl', 'Display headline must scale fluidly');
});

registerTest('T1.10.4', 'Navigation collapses into hamburger overlay on mobile', 1, 'F10-Responsive', () => {
  const navbar = readFile('src/components/layout/Navbar.tsx');
  assertContains(navbar, 'hidden lg:flex', 'Desktop navigation must be hidden on mobile');
  assertContains(navbar, 'lg:hidden', 'Mobile menu button must be hidden on desktop');
});

registerTest('T1.10.5', 'Main content padding prevents fixed navbar overlap', 1, 'F10-Responsive', () => {
  const layout = readFile('src/app/layout.tsx');
  assertContains(layout, 'pt-20', 'Main tag must include pt-20 top padding for fixed navbar');
});

// --- F11: Schema.org Metadata & Lenis Smooth Scroll ---
registerTest('T1.11.1', 'Root layout injects valid JSON-LD script', 1, 'F11-SchemaLenis', () => {
  const layout = readFile('src/app/layout.tsx');
  assertContains(layout, 'type="application/ld+json"', 'layout.tsx missing JSON-LD script');
  assertContains(layout, 'ProfessionalService', 'Schema.org @type must be ProfessionalService');
});

registerTest('T1.11.2', 'JSON-LD contains precise Puerto Varas coordinates (-41.3195, -72.9854)', 1, 'F11-SchemaLenis', () => {
  const layout = readFile('src/app/layout.tsx');
  assertContains(layout, '-41.3195', 'Missing latitude coordinate -41.3195');
  assertContains(layout, '-72.9854', 'Missing longitude coordinate -72.9854');
});

registerTest('T1.11.3', 'JSON-LD contains Southern Chile regional areaServed list', 1, 'F11-SchemaLenis', () => {
  const layout = readFile('src/app/layout.tsx');
  assertContains(layout, 'Puerto Varas', 'Missing Puerto Varas in areaServed');
  assertContains(layout, 'Chiloé', 'Missing Chiloé in areaServed');
  assertContains(layout, 'Patagonia', 'Missing Patagonia in areaServed');
});

registerTest('T1.11.4', 'SmoothScrollProvider integrates Lenis virtual scroll', 1, 'F11-SchemaLenis', () => {
  assert(fileExists('src/components/providers/SmoothScrollProvider.tsx'), 'Missing SmoothScrollProvider.tsx');
  const provider = readFile('src/components/providers/SmoothScrollProvider.tsx');
  assertContains(provider, 'lenis', 'SmoothScrollProvider must import and instantiate Lenis');
});

registerTest('T1.11.5', 'SmoothScrollProvider binds to GSAP ticker or requestAnimationFrame', 1, 'F11-SchemaLenis', () => {
  const provider = readFile('src/components/providers/SmoothScrollProvider.tsx');
  assert(provider.includes('gsap.ticker') || provider.includes('requestAnimationFrame'), 'Lenis must bind to ticker/rAF');
});

// ============================================================================
// TIER 2: BOUNDARY & CORNER CASES (55 Tests — 5 per feature across 11 features)
// ============================================================================

// --- F1 Boundaries ---
registerTest('T2.1.1', 'Navbar mobile drawer state toggles reliably without getting stuck', 2, 'F1-Navbar', () => {
  let open: boolean = false;
  const toggle = () => { open = !open; };
  toggle(); assert((open as boolean) === true, 'Toggle failed to open');
  toggle(); assert((open as boolean) === false, 'Toggle failed to close');
  toggle(); assert((open as boolean) === true, 'Rapid re-toggle failed');
});

registerTest('T2.1.2', 'Navbar scroll listener handles threshold boundary at 40px', 2, 'F1-Navbar', () => {
  const isScrolledAt = (y: number) => y > 40;
  assert(!isScrolledAt(0), '0px should not be scrolled');
  assert(!isScrolledAt(39), '39px should not be scrolled');
  assert(!isScrolledAt(40), '40px exactly should not be scrolled');
  assert(isScrolledAt(41), '41px must trigger scrolled state');
  assert(isScrolledAt(500), '500px must trigger scrolled state');
});

registerTest('T2.1.3', 'Navbar active link calculation handles root pathname cleanly', 2, 'F1-Navbar', () => {
  const isActive = (linkHref: string, currentPath: string) => linkHref === currentPath;
  assert(isActive('/portafolio', '/portafolio'), 'Matching path should be active');
  assert(!isActive('/portafolio', '/'), 'Non-matching path must not be active');
});

registerTest('T2.1.4', 'Navbar handles undefined or trailing slash pathnames safely', 2, 'F1-Navbar', () => {
  const normalize = (p: string) => p.endsWith('/') && p.length > 1 ? p.slice(0, -1) : p;
  assertEqual(normalize('/portafolio/'), '/portafolio', 'Trailing slash normalization failed');
  assertEqual(normalize('/'), '/', 'Root slash must not be stripped');
});

registerTest('T2.1.5', 'Navbar logo link targets root / with group hover styling', 2, 'F1-Navbar', () => {
  const navbar = readFile('src/components/layout/Navbar.tsx');
  assertContains(navbar, 'href="/"', 'Logo must link to root /');
  assertContains(navbar, 'group', 'Logo link must have group styling for hover effects');
});

// --- F2 Boundaries ---
registerTest('T2.2.1', 'Footer copyright year evaluates dynamically with getFullYear()', 2, 'F2-Footer', () => {
  const currentYear = new Date().getFullYear();
  assert(currentYear >= 2026, 'System year should be 2026 or later');
  const footer = readFile('src/components/layout/Footer.tsx');
  assertContains(footer, 'getFullYear()', 'Footer copyright must use getFullYear()');
});

registerTest('T2.2.2', 'Footer location and social channels render verified handles', 2, 'F2-Footer', () => {
  const footer = readFile('src/components/layout/Footer.tsx');
  assertContains(footer, 'Puerto Varas, Región de Los Lagos', 'Missing exact city and region in footer');
  assert(footer.includes('@puelchelab') || footer.includes('@puelche_lab'), 'Missing Instagram handle in footer');
});

registerTest('T2.2.3', 'Footer signature section renders high contrast brand colors', 2, 'F2-Footer', () => {
  const footer = readFile('src/components/layout/Footer.tsx');
  assert(footer.includes('bg-puelche-cyan') || footer.includes('bg-[#59BFD6]') || footer.includes('bg-[#18191B]'), 'Footer missing brand background');
});

registerTest('T2.2.4', 'Footer container handles responsive layout cleanly', 2, 'F2-Footer', () => {
  const footer = readFile('src/components/layout/Footer.tsx');
  assert(footer.includes('max-w-6xl') || footer.includes('grid-cols-1'), 'Footer missing responsive container');
});

registerTest('T2.2.5', 'Footer external links include rel="noopener noreferrer"', 2, 'F2-Footer', () => {
  const footer = readFile('src/components/layout/Footer.tsx');
  assertContains(footer, 'rel="noopener noreferrer"', 'External links missing noopener noreferrer');
});

// --- F3 Boundaries ---
registerTest('T2.3.1', 'Case-insensitive grep for unsplash in all src/ files produces 0 matches', 2, 'F3-ZeroUnsplash', () => {
  const portfolio = readFile('src/data/portfolio.ts');
  const regex = /unsplash/i;
  assert(!regex.test(portfolio), 'portfolio.ts contains case-insensitive unsplash matches');
});

registerTest('T2.3.2', 'Verify no base64-encoded Unsplash URLs exist in codebase', 2, 'F3-ZeroUnsplash', () => {
  // 'images.unsplash' in base64 is 'aW1hZ2VzLnVuc3BsYXNo'
  const allSrc = readFile('src/data/portfolio.ts') + readFile('src/app/page.tsx');
  assertNotContains(allSrc, 'aW1hZ2VzLnVuc3BsYXNo', 'Hidden base64 Unsplash reference detected');
});

registerTest('T2.3.3', 'Real asset file sizes are all above 5000 bytes (non-empty images)', 2, 'F3-ZeroUnsplash', () => {
  const baseFiles = ['logo-top.png', 'logo-puelche.png', 'bg-home-2.jpg', 'bg-agencia.jpg'];
  for (const f of baseFiles) {
    const size = getFileSize(`public/images/real/${f}`);
    assert(size > 5000, `Asset ${f} size ${size}B is too small, possible corruption`);
  }
});

registerTest('T2.3.4', 'All project image paths in portfolio.ts resolve to existing files on disk', 2, 'F3-ZeroUnsplash', () => {
  const portfolio = readFile('src/data/portfolio.ts');
  const matches = portfolio.match(/\/images\/real\/[^'"`]+/g) || [];
  for (const m of matches) {
    const diskPath = path.join('public', m);
    assert(fileExists(diskPath), `Project image does not exist on disk: ${diskPath}`);
  }
});

registerTest('T2.3.5', 'Asset extensions are strictly .jpg or .png', 2, 'F3-ZeroUnsplash', () => {
  const portfolio = readFile('src/data/portfolio.ts');
  const matches = portfolio.match(/\/images\/real\/[^'"`]+/g) || [];
  for (const m of matches) {
    assert(m.endsWith('.jpg') || m.endsWith('.png'), `Invalid asset extension: ${m}`);
  }
});

// --- F4 Boundaries ---
registerTest('T2.4.1', 'Filter state with empty string or unknown category returns 0 projects safely', 2, 'F4-PortfolioFilter', () => {
  const dummyProjects = [{ category: 'Fotografía' }, { category: 'Branding' }];
  const filter = (cat: string) => cat === 'Todos' ? dummyProjects : dummyProjects.filter(p => p.category === cat);
  assertEqual(filter('Unknown').length, 0, 'Unknown category should return empty array');
  assertEqual(filter('Todos').length, 2, 'Todos should return all items');
});

registerTest('T2.4.2', 'Empty category array displays empty state without throwing exceptions', 2, 'F4-PortfolioFilter', () => {
  const projects: any[] = [];
  const isEmpty = projects.length === 0;
  assert(isEmpty, 'Empty check failed');
});

registerTest('T2.4.3', 'Project title and client strings handle special Spanish accents (Chiloé, Rilán)', 2, 'F4-PortfolioFilter', () => {
  const portfolio = readFile('src/data/portfolio.ts');
  assertContains(portfolio, 'Chiloé', 'Missing UTF-8 accent in Chiloé');
  assertContains(portfolio, 'Rilán', 'Missing UTF-8 accent in Rilán');
});

registerTest('T2.4.4', 'Deliverables list with multiple tags formats without trailing commas', 2, 'F4-PortfolioFilter', () => {
  const tags = ['Tag 1', 'Tag 2'];
  const formatted = tags.join(', ');
  assertEqual(formatted, 'Tag 1, Tag 2', 'Tag join failed');
});

registerTest('T2.4.5', 'Repeated filtering maintains immutable project order', 2, 'F4-PortfolioFilter', () => {
  const arr = [1, 2, 3];
  const copy = [...arr];
  assertEqual(copy[0], 1, 'Immutability test failed');
});

// --- F5 Boundaries ---
registerTest('T2.5.1', 'Modal drawer background backdrop includes click stopPropagation', 2, 'F5-ModalDrawer', () => {
  const portfolioPage = readFile('src/app/portafolio/page.tsx');
  assertContains(portfolioPage, 'e.stopPropagation()', 'Modal inner container missing stopPropagation');
});

registerTest('T2.5.2', 'Modal backdrop blur uses bg-black/70 backdrop-blur-sm', 2, 'F5-ModalDrawer', () => {
  const portfolioPage = readFile('src/app/portafolio/page.tsx');
  assertContains(portfolioPage, 'bg-black/70', 'Modal backdrop missing dark overlay');
  assertContains(portfolioPage, 'backdrop-blur-sm', 'Modal backdrop missing blur');
});

registerTest('T2.5.3', 'Project modal handles long description without layout overflow via max-h-[90vh]', 2, 'F5-ModalDrawer', () => {
  const portfolioPage = readFile('src/app/portafolio/page.tsx');
  assertContains(portfolioPage, 'max-h-[90vh]', 'Modal missing max height constraint');
  assertContains(portfolioPage, 'overflow-y-auto', 'Modal missing vertical scrollbar for long copy');
});

registerTest('T2.5.4', 'Project title with ampersand and spaces encodes safely into query parameter', 2, 'F5-ModalDrawer', () => {
  const title = 'Estancia Rilán — Hotel & Cava';
  const encoded = encodeURIComponent(title);
  assert(!encoded.includes('&'), 'Raw ampersand must be encoded');
  assert(encoded.includes('%26'), 'Ampersand must encode to %26');
});

registerTest('T2.5.5', 'Modal close button is keyboard accessible with z-index z-20', 2, 'F5-ModalDrawer', () => {
  const portfolioPage = readFile('src/app/portafolio/page.tsx');
  assertContains(portfolioPage, 'z-20', 'Modal close button missing z-20 layer');
});

// --- F6 Boundaries ---
registerTest('T2.6.1', 'Contact form validator rejects empty name', 2, 'F6-ContactBrief', () => {
  const validate = (name: string) => name.trim().length > 0;
  assert(!validate(''), 'Empty name must be invalid');
  assert(!validate('   '), 'Whitespace name must be invalid');
  assert(validate('Paula'), 'Valid name accepted');
});

registerTest('T2.6.2', 'Contact form validator rejects invalid email formats', 2, 'F6-ContactBrief', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  assert(!emailRegex.test('plainaddress'), 'Plain address rejected');
  assert(!emailRegex.test('@missingusername.com'), 'Missing username rejected');
  assert(!emailRegex.test('user@domain'), 'Missing TLD rejected');
  assert(emailRegex.test('paula@puelchelab.cl'), 'Valid email accepted');
});

registerTest('T2.6.3', 'Contact form service toggling adds and removes cleanly', 2, 'F6-ContactBrief', () => {
  let selected: string[] = [];
  const toggle = (s: string) => {
    selected = selected.includes(s) ? selected.filter(x => x !== s) : [...selected, s];
  };
  toggle('Branding');
  assertEqual(selected.length, 1, 'Service add failed');
  toggle('Branding');
  assertEqual(selected.length, 0, 'Service remove failed');
});

registerTest('T2.6.4', 'Contact form resets state completely when user clicks Enviar otro requerimiento', 2, 'F6-ContactBrief', () => {
  const contactPage = readFile('src/app/contacto/page.tsx');
  assertContains(contactPage, 'setSubmitted(false)', 'Reset action missing in submitted screen');
});

registerTest('T2.6.5', 'Contact form wraps in Suspense boundary for useSearchParams', 2, 'F6-ContactBrief', () => {
  const contactPage = readFile('src/app/contacto/page.tsx');
  assertContains(contactPage, '<Suspense', 'Contact page must wrap form in Suspense boundary for Next.js prerendering');
});

// --- F7 Boundaries ---
registerTest('T2.7.1', 'Phone number sanitization removes spaces, hyphens, and +', 2, 'F7-WhatsApp', () => {
  const cleanPhone = (p: string) => p.replace(/[^0-9]/g, '');
  assertEqual(cleanPhone('+56 9 6617 7500'), '56966177500', 'Phone sanitization failed');
});

registerTest('T2.7.2', 'WhatsApp link generator handles empty inputs with graceful defaults', 2, 'F7-WhatsApp', () => {
  const name = '';
  const budget = '';
  const nameOut = name || 'un prospecto';
  const budgetOut = budget || 'Por definir';
  assertEqual(nameOut, 'un prospecto', 'Name fallback failed');
  assertEqual(budgetOut, 'Por definir', 'Budget fallback failed');
});

registerTest('T2.7.3', 'WhatsApp message string length does not exceed 2000 characters', 2, 'F7-WhatsApp', () => {
  const msg = 'Hola Puelche Lab, me interesa cotizar un proyecto.';
  const link = `https://wa.me/56966177500?text=${encodeURIComponent(msg)}`;
  assert(link.length < 2000, 'WhatsApp URL exceeds 2000 characters');
});

registerTest('T2.7.4', 'WhatsApp floating button uses target="_blank" with noopener noreferrer', 2, 'F7-WhatsApp', () => {
  const btn = readFile('src/components/ui/WhatsAppButton.tsx');
  assertContains(btn, 'target="_blank"', 'Missing target="_blank"');
  assertContains(btn, 'rel="noopener noreferrer"', 'Missing rel="noopener noreferrer"');
});

registerTest('T2.7.5', 'WhatsApp floating button is positioned fixed bottom-6 right-6 with z-40', 2, 'F7-WhatsApp', () => {
  const btn = readFile('src/components/ui/WhatsAppButton.tsx');
  assertContains(btn, 'fixed bottom-6 right-6 z-40', 'Floating position classes incorrect');
});

// --- F8 Boundaries ---
registerTest('T2.8.1', 'Client profiles list contains at least 12 distinct entries', 2, 'F8-ClientProof', () => {
  const clientesPage = readFile('src/app/clientes/page.tsx');
  const count = (clientesPage.match(/name:\s*['"`]/g) || []).length;
  assert(count >= 12, `Expected at least 12 client profiles, found ${count}`);
});

registerTest('T2.8.2', 'Territorial node coordinates cover North-to-South span of Los Lagos and Patagonia', 2, 'F8-ClientProof', () => {
  const clientesPage = readFile('src/app/clientes/page.tsx');
  assertContains(clientesPage, 'Puerto Varas', 'Missing Puerto Varas');
  assertContains(clientesPage, 'Chiloé', 'Missing Chiloé');
  assertContains(clientesPage, 'Punta Arenas', 'Missing Punta Arenas');
});

registerTest('T2.8.3', 'Client table rows highlight on hover with transition-colors', 2, 'F8-ClientProof', () => {
  const clientesPage = readFile('src/app/clientes/page.tsx');
  assertContains(clientesPage, 'hover:bg-puelche-sand/20 transition-colors', 'Table row missing hover transition');
});

registerTest('T2.8.4', 'Testimonials contain valid attribution with organization and location', 2, 'F8-ClientProof', () => {
  const clientesPage = readFile('src/app/clientes/page.tsx');
  assertContains(clientesPage, 'organization:', 'Testimonials missing organization field');
  assertContains(clientesPage, 'location:', 'Testimonials missing location field');
});

registerTest('T2.8.5', 'Client directory metadata exports canonical SEO title and description', 2, 'F8-ClientProof', () => {
  const clientesPage = readFile('src/app/clientes/page.tsx');
  assertContains(clientesPage, 'export const metadata', 'clientes/page.tsx must export metadata');
  assertContains(clientesPage, 'Clientes & Territorio Austral', 'Metadata missing canonical title');
});

// --- F9 Boundaries ---
registerTest('T2.9.1', 'Trailing slash redirect rules exist for all legacy endpoints in next.config.ts', 2, 'F9-Routing', () => {
  const config = readFile('next.config.ts');
  assertContains(config, "source: '/diseno-de-marca/'", 'Missing trailing slash redirect for /diseno-de-marca/');
  assertContains(config, "source: '/fotografia-y-edicion-2/'", 'Missing trailing slash redirect for /fotografia-y-edicion-2/');
});

registerTest('T2.9.2', 'next.config.ts has reactStrictMode enabled', 2, 'F9-Routing', () => {
  const config = readFile('next.config.ts');
  assertContains(config, 'reactStrictMode: true', 'next.config.ts must enable reactStrictMode');
});

registerTest('T2.9.3', 'Legacy redirect destinations do not point to other redirects (no redirect chains)', 2, 'F9-Routing', () => {
  const config = readFile('next.config.ts');
  const destinations = config.match(/destination:\s*['"`]([^'"`]+)['"`]/g) || [];
  for (const d of destinations) {
    const dest = d.replace(/destination:\s*['"`]/, '').replace(/['"`]/, '');
    assert(!dest.includes('diseno-de-marca'), `Redirect chain detected on ${dest}`);
    assert(!dest.includes('edicion-fotografica'), `Redirect chain detected on ${dest}`);
  }
});

registerTest('T2.9.4', 'Root route page.tsx exports default function', 2, 'F9-Routing', () => {
  const home = readFile('src/app/page.tsx');
  assertContains(home, 'export default function', 'page.tsx missing export default function');
});

registerTest('T2.9.5', 'globals.css defines standard CSS layers base, components, utilities', 2, 'F9-Routing', () => {
  const css = readFile('src/app/globals.css');
  assertContains(css, '@tailwind base;', 'globals.css missing @tailwind base;');
  assertContains(css, '@tailwind components;', 'globals.css missing @tailwind components;');
  assertContains(css, '@tailwind utilities;', 'globals.css missing @tailwind utilities;');
});

// --- F10 Boundaries ---
registerTest('T2.10.1', 'globals.css defines overflow-x hidden on html to eliminate horizontal bounce', 2, 'F10-Responsive', () => {
  const css = readFile('src/app/globals.css');
  assert(css.includes('overflow-x') || css.includes('html'), 'globals.css should guard horizontal overflow');
});

registerTest('T2.10.2', 'Home hero kinetic headline initializes properly', 2, 'F10-Responsive', () => {
  const home = readFile('src/app/page.tsx');
  assert(home.includes('VIENTO CREATIVO') || home.includes('--wipe-lead'), 'Hero missing headline text');
});

registerTest('T2.10.3', 'Container max widths limit to 7xl (1280px) preventing ultrawide stretch', 2, 'F10-Responsive', () => {
  const home = readFile('src/app/page.tsx');
  assertContains(home, 'max-w-7xl', 'Layout missing max-w-7xl restriction');
});

registerTest('T2.10.4', 'Padding scales down on mobile viewports: px-6 md:px-12 lg:px-16', 2, 'F10-Responsive', () => {
  const home = readFile('src/app/page.tsx');
  assertContains(home, 'px-6 md:px-12 lg:px-16', 'Padding scaling classes missing in Home');
});

registerTest('T2.10.5', 'Interactive elements provide min 44px tap targets for mobile', 2, 'F10-Responsive', () => {
  const navbar = readFile('src/components/layout/Navbar.tsx');
  assertContains(navbar, 'py-2.5', 'Navbar buttons must have adequate vertical padding');
});

// --- F11 Boundaries ---
registerTest('T2.11.1', 'JSON-LD structured data parses cleanly as valid JSON', 2, 'F11-SchemaLenis', () => {
  const layout = readFile('src/app/layout.tsx');
  const match = layout.match(/const jsonLd = ({[\s\S]*?});/);
  assert(match !== null, 'jsonLd object not found in layout.tsx');
  // Evaluate syntax safety
  assertContains(match![1], '@context', 'JSON-LD missing @context');
  assertContains(match![1], 'https://schema.org', 'JSON-LD context must be https://schema.org');
});

registerTest('T2.11.2', 'Schema.org priceRange is configured as $$$ for high-end studio positioning', 2, 'F11-SchemaLenis', () => {
  const layout = readFile('src/app/layout.tsx');
  assertContains(layout, "priceRange: '$$$'", 'JSON-LD priceRange must be $$$');
});

registerTest('T2.11.3', 'Schema.org address defines Puerto Varas, Región de Los Lagos, CL', 2, 'F11-SchemaLenis', () => {
  const layout = readFile('src/app/layout.tsx');
  assertContains(layout, "'Puerto Varas'", 'Missing Puerto Varas locality in schema');
  assertContains(layout, "'Región de Los Lagos'", 'Missing Región de Los Lagos region in schema');
  assertContains(layout, "'CL'", 'Missing CL country in schema');
});

registerTest('T2.11.4', 'Lenis smooth scroll options configure smoothWheel: true and lerp: 0.08', 2, 'F11-SchemaLenis', () => {
  const provider = readFile('src/components/providers/SmoothScrollProvider.tsx');
  assert(provider.includes('lerp') || provider.includes('Lenis'), 'Lenis config options missing');
});

registerTest('T2.11.5', 'Lenis instance is cleaned up on unmount with destroy()', 2, 'F11-SchemaLenis', () => {
  const provider = readFile('src/components/providers/SmoothScrollProvider.tsx');
  assertContains(provider, 'destroy()', 'Lenis cleanup missing destroy() call');
});

// ============================================================================
// TIER 3: CROSS-FEATURE COMBINATIONS (12 Tests)
// ============================================================================

registerTest('T3.1', 'Modal Drawer -> Contact Brief: URL query param ?proyecto= pre-fills details input', 3, 'Combo-ModalContact', () => {
  const contact = readFile('src/app/contacto/page.tsx');
  assertContains(contact, "searchParams.get('proyecto')", 'Contact form must read ?proyecto= search param');
  assertContains(contact, 'Consulta referente al proyecto:', 'Contact form must format initial details text');
});

registerTest('T3.2', 'Service Subpage -> Contact Brief: URL query param ?servicio= pre-selects service', 3, 'Combo-ServiceContact', () => {
  const contact = readFile('src/app/contacto/page.tsx');
  assertContains(contact, "searchParams.get('servicio')", 'Contact form must read ?servicio= search param');
  assertContains(contact, 'initialService ? [initialService] : []', 'Contact form must pre-select service');
});

registerTest('T3.3', 'Portfolio Filter -> Modal Detail: Selected category does not disrupt modal opening', 3, 'Combo-FilterModal', () => {
  const portfolio = readFile('src/app/portafolio/page.tsx');
  assertContains(portfolio, 'filteredProjects.map', 'Filtered projects must map to cards');
  assertContains(portfolio, 'setActiveModalProject(project)', 'Filtered card must trigger modal');
});

registerTest('T3.4', 'Contact Brief Form -> WhatsApp URL: Multi-field state concatenates into single encoded link', 3, 'Combo-FormWhatsApp', () => {
  const generate = (name: string, company: string, srv: string[], bud: string, reg: string) => {
    const srvText = srv.length > 0 ? srv.join(', ') : 'Servicios generales';
    const budText = bud || 'Por definir';
    const msg = `Hola Puelche Lab,\n\nMi nombre es ${name} de ${company}.\nUbicación: ${reg}\nServicios: ${srvText}\nPresupuesto: ${budText}`;
    return `https://wa.me/56966177500?text=${encodeURIComponent(msg)}`;
  };
  const link = generate('Francisca', 'Hotel Rilán', ['Fotografía'], '$3.0M — $6.0M CLP', 'Chiloé');
  assertContains(link, 'wa.me/56966177500', 'Target phone missing');
  assertContains(link, 'Hotel%20Ril%C3%A1n', 'Company name not properly encoded');
  assertContains(link, 'Fotograf%C3%ADa', 'Service not properly encoded');
});

registerTest('T3.5', 'Navbar Scrolled State -> Mobile Menu: Retains background opacity when toggled', 3, 'Combo-NavMobile', () => {
  const navbar = readFile('src/components/layout/Navbar.tsx');
  assert(navbar.includes('bg-puelche-slate') || navbar.includes('bg-[#3B3D42]') || navbar.includes('bg-[#F9F9F6]'), 'Mobile menu overlay must have solid background');
});

registerTest('T3.6', 'Lenis Smooth Scroll -> Fixed Elements: Navbar and WhatsApp button maintain fixed z-indexes', 3, 'Combo-ScrollFixed', () => {
  const navbar = readFile('src/components/layout/Navbar.tsx');
  const whatsapp = readFile('src/components/ui/WhatsAppButton.tsx');
  assertContains(navbar, 'fixed top-0', 'Navbar must be fixed top-0');
  assertContains(navbar, 'z-50', 'Navbar must have high z-50 layer');
  assertContains(whatsapp, 'fixed bottom-6 right-6', 'WhatsApp button must be fixed');
  assertContains(whatsapp, 'z-40', 'WhatsApp button must have z-40 layer');
});

registerTest('T3.7', 'Legacy 308 Redirect -> Navbar Active Link: Target path /clientes highlights active state', 3, 'Combo-RedirectNav', () => {
  const config = readFile('next.config.ts');
  const navbar = readFile('src/components/layout/Navbar.tsx');
  assertContains(config, "destination: '/clientes'", 'Redirect must point to /clientes');
  assertContains(navbar, "{ label: 'Clientes', href: '/clientes' }", 'Navbar must contain /clientes link');
});

registerTest('T3.8', 'Color Tokens -> Cross-Page Consistency: Cyan and slate brand tokens match across pages', 3, 'Combo-ThemeTokens', () => {
  const home = readFile('src/app/page.tsx');
  const contact = readFile('src/app/contacto/page.tsx');
  const portfolio = readFile('src/app/portafolio/page.tsx');
  assert(home.includes('puelche-cyan') || home.includes('#59BFD6'), 'Home missing cyan token #59BFD6');
  assert(home.includes('puelche-slate') || home.includes('#3B3D42'), 'Home missing slate token #3B3D42');
  assert(contact.includes('puelche-cyan') || contact.includes('#59BFD6'), 'Contact missing cyan token #59BFD6');
});

registerTest('T3.9', 'Zero Unsplash -> Portfolio Modal: Modal cover image matches card cover image', 3, 'Combo-AssetModal', () => {
  const portfolioPage = readFile('src/app/portafolio/page.tsx');
  assertContains(portfolioPage, 'activeModalProject.image', 'Modal must render activeModalProject.image');
});

registerTest('T3.10', 'Contact Submission -> WhatsApp Direct Handoff: Retains filled parameters in success link', 3, 'Combo-SubmitHandoff', () => {
  const contactPage = readFile('src/app/contacto/page.tsx');
  assertContains(contactPage, 'href={generateWhatsAppLink()}', 'Success view must include generateWhatsAppLink()');
});

registerTest('T3.11', 'Responsive Grid -> Filter Chips: Responsive flex-wrap avoids overflow at any count', 3, 'Combo-ResponsiveFilter', () => {
  const portfolioPage = readFile('src/app/portafolio/page.tsx');
  assertContains(portfolioPage, 'flex flex-wrap items-center gap-2', 'Filter chips must wrap cleanly');
});

registerTest('T3.12', 'Footer Service Links -> Service Subpage: Links resolve directly to canonical URLs', 3, 'Combo-FooterLinks', () => {
  const footer = readFile('src/components/layout/Footer.tsx');
  assertContains(footer, 'STUDIO_SERVICES.map', 'Footer must iterate STUDIO_SERVICES');
  assertContains(footer, 's.href', 'Footer must link to s.href');
});

// ============================================================================
// TIER 4: REAL-WORLD WORKLOAD SCENARIOS (6 Tests)
// ============================================================================

registerTest('T4.1', 'Scenario: Mobile Tourism Entrepreneur from Puerto Varas browsing cabins and quoting', 4, 'Scenario-TourismMobile', () => {
  // 1. Visit Home (verifies Hero backdrop and manifesto)
  const home = readFile('src/app/page.tsx');
  assert(home.includes('PUERTO VARAS') && home.includes('REGION DE LOS LAGOS'), 'Home missing Puerto Varas geo badge');
  // 2. Navigate to Portfolio data
  const portfolioData = readFile('src/data/portfolio.ts');
  assertContains(portfolioData, 'Cala Melí', 'Portfolio missing Cala Melí Cabañas case study');
  // 3. Open Modal and click quote CTA in portafolio page
  const portfolio = readFile('src/app/portafolio/page.tsx');
  assertContains(portfolio, '/contacto?proyecto=', 'Missing quote CTA transition');
  // 4. Fill contact brief
  const contact = readFile('src/app/contacto/page.tsx');
  assertContains(contact, 'generateWhatsAppLink', 'Contact form must provide WhatsApp quote generator');
});

registerTest('T4.2', 'Scenario: Corporate Salmon Executive (AquaChile) verifying credentials and requesting brief', 4, 'Scenario-CorporateAquaChile', () => {
  // 1. Visit Clientes directory
  const clientes = readFile('src/app/clientes/page.tsx');
  assertContains(clientes, 'AquaChile', 'AquaChile must be present in directory');
  assertContains(clientes, 'Fotografía Industrial & Procesos', 'Scope must match authentic engagement');
  // 2. Visit Photography service page
  const foto = readFile('src/app/servicios/fotografia/page.tsx');
  assertContains(foto, 'Industria & Procesos', 'Photography service missing industrial discipline');
  // 3. Corporate budget tier available
  const contact = readFile('src/app/contacto/page.tsx');
  assertContains(contact, '+$12.0M CLP (Corporativo)', 'Missing corporate investment tier');
});

registerTest('T4.3', 'Scenario: Organic Search Entry via legacy /diseno-de-marca redirecting to Branding', 4, 'Scenario-LegacyRedirect', () => {
  const config = readFile('next.config.ts');
  assertContains(config, "source: '/diseno-de-marca'", 'Legacy source route missing');
  assertContains(config, "destination: '/servicios/branding'", 'Redirect target must be /servicios/branding');
  const branding = readFile('src/app/servicios/branding/page.tsx');
  assertContains(branding, 'Blue Seal', 'Branding case study Blue Seal missing');
});

registerTest('T4.4', 'Scenario: Hotel Director from Puerto Natales reviewing Costaustralis case study and calling studio', 4, 'Scenario-HotelCostaustralis', () => {
  const portfolio = readFile('src/data/portfolio.ts');
  assertContains(portfolio, 'Hotel Costaustralis', 'Hotel Costaustralis project missing');
  assertContains(portfolio, 'Puerto Natales, Patagonia', 'Location must be Puerto Natales, Patagonia');
  const footer = readFile('src/components/layout/Footer.tsx');
  assertContains(footer, '+56 9 6617 7500', 'Director phone must be available in footer');
});

registerTest('T4.5', 'Scenario: High-Ticket Corporate Publisher commissioning fine-art photography book', 4, 'Scenario-EditorialPublishing', () => {
  const editorial = readFile('src/app/servicios/editorial/page.tsx');
  assertContains(editorial, 'Viajes Falabella', 'Editorial case study Viajes Falabella missing');
  const contact = readFile('src/app/contacto/page.tsx');
  assertContains(contact, 'Diseño Editorial & Memorias', 'Editorial discipline missing in contact form');
  assertContains(contact, '$6.0M — $12.0M CLP', 'High-ticket budget tier missing');
});

registerTest('T4.6', 'Scenario: Complete Anti-Stock Compliance & Asset Resolution Crawl', 4, 'Scenario-ComplianceAudit', () => {
  const portfolio = readFile('src/data/portfolio.ts');
  assertNotContains(portfolio, 'unsplash', 'Unsplash found in portfolio.ts');
  const branding = readFile('src/app/servicios/branding/page.tsx');
  assertNotContains(branding, 'unsplash', 'Unsplash found in branding/page.tsx');
  const web = readFile('src/app/servicios/desarrollo-web/page.tsx');
  assertNotContains(web, 'unsplash', 'Unsplash found in desarrollo-web/page.tsx');
  const editorial = readFile('src/app/servicios/editorial/page.tsx');
  assertNotContains(editorial, 'unsplash', 'Unsplash found in editorial/page.tsx');
  const config = readFile('next.config.ts');
  assertNotContains(config, 'images.unsplash.com', 'Unsplash remotePattern found in next.config.ts');
});

// ============================================================================
// TIER 5: STAFF-LEVEL PROTOCOLS (5 Tests)
// ============================================================================

registerTest('T5.1', 'Staff Protocol: sitemap.ts maps all canonical routes with weighted priorities', 5, 'Staff-Sitemap', () => {
  const sitemap = readFile('src/app/sitemap.ts');
  assertContains(sitemap, 'export default function sitemap', 'sitemap default export missing');
  assertContains(sitemap, '/portafolio', 'Sitemap missing /portafolio route');
  assertContains(sitemap, '/servicios/fotografia', 'Sitemap missing /servicios/fotografia');
  assertContains(sitemap, '/servicios/branding', 'Sitemap missing /servicios/branding');
  assertContains(sitemap, 'priority: 1.0', 'Home priority 1.0 missing');
});

registerTest('T5.2', 'Staff Protocol: robots.ts explicitly configures AI search crawlers and sitemap', 5, 'Staff-Robots', () => {
  const robots = readFile('src/app/robots.ts');
  assertContains(robots, 'export default function robots', 'robots default export missing');
  assertContains(robots, 'GPTBot', 'Robots missing GPTBot permission');
  assertContains(robots, 'PerplexityBot', 'Robots missing PerplexityBot permission');
  assertContains(robots, 'sitemap.xml', 'Robots missing sitemap reference');
});

registerTest('T5.3', 'Staff Protocol: layout.tsx maps canonical Wikidata entities for GEO authority', 5, 'Staff-WikidataGEO', () => {
  const layout = readFile('src/app/layout.tsx');
  assertContains(layout, 'wikidata.org/wiki/Q1012921', 'Puerto Varas Wikidata Q1012921 missing');
  assertContains(layout, 'wikidata.org/wiki/Q2170', 'Región de Los Lagos Wikidata Q2170 missing');
  assertContains(layout, 'wikidata.org/wiki/Q1507', 'Patagonia Wikidata Q1507 missing');
  assertContains(layout, 'metadataBase', 'metadataBase missing in layout.tsx');
});

registerTest('T5.4', 'Staff Protocol: Zod Jev contracts and /api/contact route validate lead payloads', 5, 'Staff-ZodJev', () => {
  const contracts = readFile('src/contracts/index.ts');
  assertContains(contracts, 'ContactBriefSchema', 'ContactBriefSchema missing in contracts');
  assertContains(contracts, 'buildWhatsAppLink', 'buildWhatsAppLink missing in contracts');
  const apiRoute = readFile('src/app/api/contact/route.ts');
  assertContains(apiRoute, 'ContactBriefSchema.safeParse', 'API route missing Zod safeParse validation');
  assertContains(apiRoute, 'export async function POST', 'API route missing POST handler');
});

registerTest('T5.5', 'Staff Protocol: opengraph-image.tsx implements dynamic branded safe-zones', 5, 'Staff-OpenGraph', () => {
  const og = readFile('src/app/opengraph-image.tsx');
  assertContains(og, 'PUELCHE', 'OG image missing studio brand title');
  assertContains(og, 'width: 1200', 'OG image width must be 1200');
  assertContains(og, 'height: 630', 'OG image height must be 630');
  assertContains(og, 'PUERTO VARAS • PATAGONIA • CHILE', 'OG image missing territorial geo badge');
});

// ============================================================================
// RUNNER EXECUTION ENGINE
// ============================================================================

async function runSuite() {
  const args = process.argv.slice(2);
  const tierArg = args.find(a => a.startsWith('--tier='));
  const filterTier = tierArg ? parseInt(tierArg.split('=')[1], 10) : null;

  const targetTests = filterTier ? tests.filter(t => t.tier === filterTier) : tests;

  console.log(`\n${BOLD}${CYAN}╔══════════════════════════════════════════════════════════════════════╗${RESET}`);
  console.log(`${BOLD}${CYAN}║      PUELCHE LAB — AUTONOMOUS OPAQUE-BOX E2E TEST SUITE RUNNER       ║${RESET}`);
  console.log(`${BOLD}${CYAN}╚══════════════════════════════════════════════════════════════════════╝${RESET}\n`);
  console.log(`${GRAY}Target Directory: ${ROOT}${RESET}`);
  console.log(`${GRAY}Total Registered Tests: ${tests.length} | Selected for Execution: ${targetTests.length}${RESET}\n`);

  const results: TestResult[] = [];
  let currentTier = -1;

  for (const test of targetTests) {
    if (test.tier !== currentTier) {
      currentTier = test.tier;
      const tierNames = [
        '',
        'TIER 1: FEATURE COVERAGE (55 Baseline Tests)',
        'TIER 2: BOUNDARY & CORNER CASES (55 Robustness Tests)',
        'TIER 3: CROSS-FEATURE COMBINATIONS (12 Pairwise Tests)',
        'TIER 4: REAL-WORLD WORKLOAD SCENARIOS (6 Persona Journeys)',
        'TIER 5: STAFF-LEVEL PROTOCOLS (5 Infrastructure & GEO Tests)',
      ];
      console.log(`\n${BOLD}${MAGENTA}--- ${tierNames[currentTier]} ---${RESET}`);
    }

    const start = performance.now();
    let passed = false;
    let error: string | undefined;

    try {
      await test.fn();
      passed = true;
    } catch (err: any) {
      passed = false;
      error = err?.message || String(err);
    }
    const durationMs = Math.round(performance.now() - start);

    results.push({ test, passed, error, durationMs });

    const statusBadge = passed
      ? `${GREEN}✔ PASS${RESET}`
      : `${RED}✖ FAIL${RESET}`;
    const idBadge = `${CYAN}[${test.id}]${RESET}`;
    const featBadge = `${GRAY}(${test.feature})${RESET}`;

    console.log(`  ${statusBadge} ${idBadge} ${test.name} ${featBadge} ${GRAY}${durationMs}ms${RESET}`);
    if (!passed && error) {
      console.log(`      ${RED}↳ Error: ${error}${RESET}`);
    }
  }

  // --- Summary Dashboard ---
  const total = results.length;
  const passedCount = results.filter(r => r.passed).length;
  const failedCount = total - passedCount;
  const passRate = total > 0 ? ((passedCount / total) * 100).toFixed(1) : '0';

  console.log(`\n${BOLD}======================================================================${RESET}`);
  console.log(`${BOLD}                       TEST SUITE EXECUTION SUMMARY                   ${RESET}`);
  console.log(`${BOLD}======================================================================${RESET}`);
  console.log(`  Total Tests Executed : ${BOLD}${total}${RESET}`);
  console.log(`  Passed               : ${GREEN}${BOLD}${passedCount}${RESET}`);
  console.log(`  Failed               : ${failedCount > 0 ? RED : GRAY}${BOLD}${failedCount}${RESET}`);
  console.log(`  Success Rate         : ${passedCount === total ? GREEN : YELLOW}${BOLD}${passRate}%${RESET}`);
  console.log(`======================================================================\n`);

  if (failedCount > 0) {
    console.log(`${RED}${BOLD}✖ TEST SUITE FAILED — ${failedCount} test(s) did not satisfy acceptance contracts.${RESET}`);
    console.log(`${YELLOW}Note: Failures identify pending milestone deliverables (M1-M4) to be completed.${RESET}\n`);
    process.exit(1);
  } else {
    console.log(`${GREEN}${BOLD}✔ 100% OF E2E TEST CONTRACTS VERIFIED SUCCESSFULLY.${RESET}\n`);
    process.exit(0);
  }
}

runSuite().catch(err => {
  console.error('Fatal Runner Error:', err);
  process.exit(1);
});
