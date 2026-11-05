import * as fs from 'fs';
import * as path from 'path';

const ROOT = '/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab';
const PRERENDER_DIR = path.join(ROOT, '.next/server/app');
const PUBLIC_REAL = path.join(ROOT, 'public/images/real');
const SRC_DIR = path.join(ROOT, 'src');

let passedCount = 0;
let failedCount = 0;

function check(name: string, condition: boolean, details?: string) {
  if (condition) {
    passedCount++;
    console.log(`[PASS] ${name}`);
  } else {
    failedCount++;
    console.error(`[FAIL] ${name} ${details ? '— ' + details : ''}`);
  }
}

console.log('======================================================================');
console.log('   INDEPENDENT VICTORY AUDITOR FORENSIC VERIFICATION SUITE           ');
console.log('======================================================================\n');

// 1. Binary Magic Bytes Audit
console.log('--- 1. BINARY MAGIC BYTES AUDIT ---');
const baseAssets = [
  'bg-agencia.jpg',
  'bg-home-2.jpg',
  'bg-fotografia-6-min.jpg',
  'bg-fotografia-9-min.jpg',
  'bg-portafolios-fotografia-a-min.jpg',
  'bg-portafolios-fotografia-b-min.jpg',
  'bg-portafolios-fotografia-c-min.jpg',
  'bg-portafolios-fotografia-d-min.jpg',
  'bg-portafolios-fotografia-f-min.jpg',
  'bg-portafolios-fotografia-g-min.jpg',
  'bg-portafolios-fotografia-h-min.jpg',
  'bg-portafolios-fotografia-i-min.jpg',
  'bg-portafolios-fotografia-min.jpg',
  'logo-puelche.png',
  'logo-top.png',
];

for (const asset of baseAssets) {
  const fullPath = path.join(PUBLIC_REAL, asset);
  const exists = fs.existsSync(fullPath);
  check(`Asset exists: ${asset}`, exists);
  if (exists) {
    const buffer = fs.readFileSync(fullPath);
    check(`Asset non-empty (>5KB): ${asset}`, buffer.length > 5000, `Size: ${buffer.length}`);
    if (asset.endsWith('.jpg')) {
      const isJpg = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
      check(`JPEG Magic Bytes valid: ${asset}`, isJpg);
    } else if (asset.endsWith('.png')) {
      const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
      check(`PNG Magic Bytes valid: ${asset}`, isPng);
    }
  }
}

// Check all 20 client logos
console.log('\n--- 2. CLIENT LOGOS (20 LOGOS) MAGIC BYTES AUDIT ---');
for (let i = 1; i <= 20; i++) {
  const logoFile = `cliente${i}-1.png`;
  const logoPath = path.join(PUBLIC_REAL, 'clients', logoFile);
  const exists = fs.existsSync(logoPath);
  check(`Client logo exists: ${logoFile}`, exists);
  if (exists) {
    const buffer = fs.readFileSync(logoPath);
    check(`Client logo non-empty (>1KB): ${logoFile}`, buffer.length > 1000, `Size: ${buffer.length}`);
    const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
    check(`PNG Magic Bytes valid: ${logoFile}`, isPng);
  }
}

// 3. Prerendered HTML Content Verification
console.log('\n--- 3. PRERENDERED HTML CONTENT AUDIT ---');
const homeHtmlPath = path.join(PRERENDER_DIR, 'index.html');
check('Prerendered index.html exists', fs.existsSync(homeHtmlPath));
if (fs.existsSync(homeHtmlPath)) {
  const homeHtml = fs.readFileSync(homeHtmlPath, 'utf-8');
  check('Home contains bg-agencia.jpg in Section 1', homeHtml.includes('bg-agencia.jpg'));
  check('Home contains logo-puelche.png in Section 1', homeHtml.includes('logo-puelche.png'));
  check('Home contains VIENTO CREATIVO headline', homeHtml.includes('VIENTO CREATIVO'));
  check('Home contains subtitle Un Estudio de Diseño Cross Media y Fotografía', homeHtml.includes('Un Estudio de Diseño Cross Media y Fotografía de Puerto Varas.'));
  check('Home contains bg-home-2.jpg in Section 2', homeHtml.includes('bg-home-2.jpg'));
  check('Home contains ¿Qué es Cross Media?', homeHtml.includes('¿Qué es Cross Media?'));
  check('Home contains Section 3 CONTACTANOS', homeHtml.includes('CONTACTANOS'));
  check('Home contains Section 3 CONTACTO link', homeHtml.includes('CONTACTO'));
  check('Home contains Paula Valdivieso email', homeHtml.includes('paula.valdivieso@puelchelab.cl'));
}

const clientesHtmlPath = path.join(PRERENDER_DIR, 'clientes.html');
check('Prerendered clientes.html exists', fs.existsSync(clientesHtmlPath));
if (fs.existsSync(clientesHtmlPath)) {
  const clientesHtml = fs.readFileSync(clientesHtmlPath, 'utf-8');
  check('Clientes page has cyan background class', clientesHtml.includes('bg-puelche-cyan') || clientesHtml.includes('#59BFD6'));
  let all20LogosFound = true;
  for (let i = 1; i <= 20; i++) {
    if (!clientesHtml.includes(`cliente${i}-1.png`)) {
      all20LogosFound = false;
      console.error(`Missing logo in HTML: cliente${i}-1.png`);
    }
  }
  check('All 20 client logos found in clientes.html', all20LogosFound);
}

const contactoHtmlPath = path.join(PRERENDER_DIR, 'contacto.html');
check('Prerendered contacto.html exists', fs.existsSync(contactoHtmlPath));
if (fs.existsSync(contactoHtmlPath)) {
  const contactoHtml = fs.readFileSync(contactoHtmlPath, 'utf-8');
  check('Contacto HTML/Footer contains Paula Valdivieso name', contactoHtml.includes('Paula Valdivieso'));
  check('Contacto HTML/Footer contains paula.valdivieso@puelchelab.cl', contactoHtml.includes('paula.valdivieso@puelchelab.cl'));
  check('Contacto HTML/Footer contains phone +56 9 6617 7500', contactoHtml.includes('+56 9 6617 7500'));
  check('Contacto HTML/Footer contains Puerto Varas location', contactoHtml.includes('Puerto Varas, Región de Los Lagos, Chile'));

  // In Next.js SSG, ContactFormInner is inside a Suspense boundary due to useSearchParams()
  // Check the compiled client chunk and source file for the interactive form checkboxes
  const contactSource = fs.readFileSync(path.join(SRC_DIR, 'app/contacto/page.tsx'), 'utf-8');
  const staticChunks = fs.readdirSync(path.join(ROOT, '.next/static/chunks'));
  let foundInChunk = false;
  for (const chunk of staticChunks) {
    if (chunk.endsWith('.js')) {
      const c = fs.readFileSync(path.join(ROOT, '.next/static/chunks', chunk), 'utf-8');
      if (c.includes('Nombre y Apellido') && c.includes('Fotografía') && c.includes('Sitio Web') && c.includes('Redes Sociales') && c.includes('Diseño Gráfico')) {
        foundInChunk = true;
        break;
      }
    }
  }
  check('Contacto source & client chunk contain Solicitud checkboxes & genuine fields', 
    contactSource.includes('Fotografía') && contactSource.includes('Sitio Web') && 
    contactSource.includes('Redes Sociales') && contactSource.includes('Diseño Gráfico') && foundInChunk);
}

const fotografiaHtmlPath = path.join(PRERENDER_DIR, 'servicios/fotografia.html');
check('Prerendered fotografia.html exists', fs.existsSync(fotografiaHtmlPath));
if (fs.existsSync(fotografiaHtmlPath)) {
  const fotoHtml = fs.readFileSync(fotografiaHtmlPath, 'utf-8');
  check('Fotografia contains Estancia Rilán', fotoHtml.includes('Estancia Rilan') || fotoHtml.includes('Estancia Rilán'));
  check('Fotografia contains Cala Melí', fotoHtml.includes('Cala Melí'));
  check('Fotografia contains Costaustralis', fotoHtml.includes('Costaustralis'));
  check('Fotografia contains Cabo de Hornos', fotoHtml.includes('Cabo de Hornos'));
  check('Fotografia contains Muebles Yunge', fotoHtml.includes('Muebles Yunge'));
  check('Fotografia contains Tagua Tagua', fotoHtml.includes('Tagua Tagua'));
  check('Fotografia contains AquaChile', fotoHtml.includes('Aqua Chile') || fotoHtml.includes('AquaChile'));
  check('Fotografia contains Cyan card / pill classes', fotoHtml.includes('bg-puelche-cyan') || fotoHtml.includes('#59BFD6'));
}

// 4. Zero Unsplash Verification across entire project
console.log('\n--- 4. ZERO UNSPLASH INVARIANT VERIFICATION ---');
function scanDir(dir: string, fileList: string[] = []): string[] {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === 'node_modules' || item === '.git' || item === '.agents') continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scanDir(full, fileList);
    } else if (/\.(tsx?|jsx?|html|css|json)$/.test(item)) {
      fileList.push(full);
    }
  }
  return fileList;
}

const filesToScan = scanDir(SRC_DIR).concat(scanDir(PRERENDER_DIR));
let unsplashFoundInApp = 0;
for (const file of filesToScan) {
  const content = fs.readFileSync(file, 'utf-8');
  if (content.toLowerCase().includes('unsplash')) {
    unsplashFoundInApp++;
    console.error(`Unsplash found in ${file}`);
  }
}
check('Zero Unsplash references in src/ and prerendered HTML', unsplashFoundInApp === 0, `Occurrences: ${unsplashFoundInApp}`);

// 5. Tailwind Color Tokens Verification
console.log('\n--- 5. TAILWIND COLOR TOKENS VERIFICATION ---');
const tailwindConfigPath = path.join(ROOT, 'tailwind.config.ts');
const tailwindContent = fs.readFileSync(tailwindConfigPath, 'utf-8');
check('Tailwind defines puelche-cyan (#59BFD6)', tailwindContent.includes("'puelche-cyan': '#59BFD6'") || tailwindContent.includes('"puelche-cyan": "#59BFD6"'));
check('Tailwind defines puelche-slate (#3B3D42)', tailwindContent.includes("'puelche-slate': '#3B3D42'") || tailwindContent.includes('"puelche-slate": "#3B3D42"'));
check('Tailwind defines puelche-dark (#1D2024)', tailwindContent.includes("'puelche-dark': '#1D2024'") || tailwindContent.includes('"puelche-dark": "#1D2024"'));

// 6. Header Verification in Navbar.tsx
console.log('\n--- 6. HEADER SPECIFICATION VERIFICATION ---');
const navbarPath = path.join(SRC_DIR, 'components/layout/Navbar.tsx');
const navbarContent = fs.readFileSync(navbarPath, 'utf-8');
check('Navbar uses slate background #3B3D42', navbarContent.includes('#3B3D42') || navbarContent.includes('bg-puelche-slate'));
check('Navbar uses logo-top.png', navbarContent.includes('/images/real/logo-top.png'));
check('Navbar has uppercase condensed nav font', navbarContent.includes('font-condensed') && navbarContent.includes('uppercase'));
check('Navbar includes HOME', navbarContent.includes('HOME'));
check('Navbar includes PORTAFOLIO', navbarContent.includes('PORTAFOLIO'));
check('Navbar includes CLIENTES', navbarContent.includes('CLIENTES'));
check('Navbar includes CONTACTO', navbarContent.includes('CONTACTO'));

console.log('\n======================================================================');
console.log(`TOTAL AUDITOR CHECKS: ${passedCount + failedCount}`);
console.log(`PASSED: ${passedCount}`);
console.log(`FAILED: ${failedCount}`);
console.log(`SUCCESS RATE: ${((passedCount / (passedCount + failedCount)) * 100).toFixed(1)}%`);
console.log('======================================================================');

if (failedCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
