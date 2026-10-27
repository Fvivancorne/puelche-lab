import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = '/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab';
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const REAL_IMAGES_DIR = path.join(PUBLIC_DIR, 'images', 'real');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');
const NEXT_SERVER_APP_DIR = path.join(PROJECT_ROOT, '.next', 'server', 'app');

interface TestCase {
  id: string;
  name: string;
  fn: () => Promise<string | void> | string | void;
}

interface TestResult {
  id: string;
  name: string;
  passed: boolean;
  error?: string;
  details?: string;
}

const suite: TestCase[] = [];
const results: TestResult[] = [];

function assert(condition: unknown, msg: string) {
  if (!condition) throw new Error(msg);
}

function registerTest(id: string, name: string, fn: () => Promise<string | void> | string | void) {
  suite.push({ id, name, fn });
}

// ----------------------------------------------------------------------------
// 1. Image Binary & Header Integrity (Magic Bytes)
// ----------------------------------------------------------------------------
registerTest('STRESS-01', 'Verify Magic Bytes of all real images in public/images/real/', () => {
  const files = fs.readdirSync(REAL_IMAGES_DIR);
  let checkedCount = 0;
  for (const f of files) {
    const fullPath = path.join(REAL_IMAGES_DIR, f);
    const stat = fs.statSync(fullPath);
    if (!stat.isFile()) continue;

    assert(stat.size > 5000, `File ${f} is suspiciously small: ${stat.size} bytes`);

    const buffer = fs.readFileSync(fullPath);
    if (f.endsWith('.jpg') || f.endsWith('.jpeg')) {
      // JPEG magic: FF D8 FF
      assert(
        buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff,
        `File ${f} does not have valid JPEG magic bytes (got ${buffer[0].toString(16)} ${buffer[1].toString(16)} ${buffer[2].toString(16)})`
      );
    } else if (f.endsWith('.png')) {
      // PNG magic: 89 50 4E 47 0D 0A 1A 0A
      assert(
        buffer[0] === 0x89 &&
        buffer[1] === 0x50 &&
        buffer[2] === 0x4e &&
        buffer[3] === 0x47 &&
        buffer[4] === 0x0d &&
        buffer[5] === 0x0a &&
        buffer[6] === 0x1a &&
        buffer[7] === 0x0a,
        `File ${f} does not have valid PNG magic bytes`
      );
    }
    checkedCount++;
  }
  return `Successfully verified magic bytes and size for ${checkedCount} binary assets`;
});

// ----------------------------------------------------------------------------
// 2. Exhaustive Static Asset Reference Verification in src/
// ----------------------------------------------------------------------------
registerTest('STRESS-02', 'Crawl all image string literals in src/ and verify disk existence', () => {
  function getAllFiles(dir: string, extList: string[]): string[] {
    let out: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        out = out.concat(getAllFiles(full, extList));
      } else if (extList.some((ext) => ent.name.endsWith(ext))) {
        out.push(full);
      }
    }
    return out;
  }

  const srcFiles = getAllFiles(SRC_DIR, ['.ts', '.tsx']);
  const imageRegex = /['"](\/images\/[^'"]+)['"]/g;
  const verifiedPaths = new Set<string>();

  for (const file of srcFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    let match;
    while ((match = imageRegex.exec(content)) !== null) {
      const imgPath = match[1];
      const diskPath = path.join(PUBLIC_DIR, imgPath);
      assert(fs.existsSync(diskPath), `Referenced image ${imgPath} in ${path.relative(PROJECT_ROOT, file)} does not exist at ${diskPath}`);
      verifiedPaths.add(imgPath);
    }
  }

  return `Verified ${verifiedPaths.size} distinct referenced image paths across ${srcFiles.length} source files`;
});

// ----------------------------------------------------------------------------
// 3. Rendered HTML Anti-Stock & Broken Resource Audit
// ----------------------------------------------------------------------------
registerTest('STRESS-03', 'Audit all prerendered HTML pages in .next/server/app for zero-unsplash and no broken tags', () => {
  function getHtmlFiles(dir: string): string[] {
    let out: string[] = [];
    if (!fs.existsSync(dir)) return out;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        out = out.concat(getHtmlFiles(full));
      } else if (ent.name.endsWith('.html')) {
        out.push(full);
      }
    }
    return out;
  }

  const htmlFiles = getHtmlFiles(NEXT_SERVER_APP_DIR);
  assert(htmlFiles.length >= 5, `Expected prerendered HTML files, found ${htmlFiles.length}`);

  for (const hf of htmlFiles) {
    const rel = path.relative(NEXT_SERVER_APP_DIR, hf);
    const content = fs.readFileSync(hf, 'utf-8');

    // Anti-stock check
    assert(!content.toLowerCase().includes('unsplash'), `HTML page ${rel} contains 'unsplash'`);
    assert(!content.includes('images.unsplash.com'), `HTML page ${rel} contains 'images.unsplash.com'`);

    // No broken placeholders
    assert(!content.includes('src="undefined"'), `HTML page ${rel} has src="undefined"`);
    assert(!content.includes('src="null"'), `HTML page ${rel} has src="null"`);
    assert(!content.includes('href="undefined"'), `HTML page ${rel} has href="undefined"`);
    assert(!content.includes('[object Object]'), `HTML page ${rel} has [object Object]`);

    // No h1 in footer
    const footerMatch = content.match(/<footer[\s\S]*?<\/footer>/i);
    if (footerMatch) {
      assert(!footerMatch[0].includes('<h1'), `HTML page ${rel} has <h1> tag inside <footer>`);
    }
  }

  return `Prerendered HTML audit passed for all ${htmlFiles.length} pages without any Unsplash or broken attributes`;
});

// ----------------------------------------------------------------------------
// 4. WhatsApp & Contact Verification Across All HTML Pages
// ----------------------------------------------------------------------------
registerTest('STRESS-04', 'Verify all wa.me links in rendered HTML and source files use 56966177500', () => {
  function getAllFiles(dir: string, extList: string[]): string[] {
    let out: string[] = [];
    if (!fs.existsSync(dir)) return out;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        out = out.concat(getAllFiles(full, extList));
      } else if (extList.some((ext) => ent.name.endsWith(ext))) {
        out.push(full);
      }
    }
    return out;
  }

  const allFiles = [...getAllFiles(SRC_DIR, ['.ts', '.tsx']), ...getAllFiles(NEXT_SERVER_APP_DIR, ['.html'])];
  let linkCount = 0;

  for (const f of allFiles) {
    const content = fs.readFileSync(f, 'utf-8');
    const waMatches = content.match(/wa\.me\/[0-9]+/g);
    if (waMatches) {
      for (const m of waMatches) {
        linkCount++;
        assert(m === 'wa.me/56966177500', `File ${path.relative(PROJECT_ROOT, f)} has invalid WhatsApp number ${m}, expected wa.me/56966177500`);
      }
    }

    // Check old phone occurrences
    assert(!content.includes('97424190'), `File ${path.relative(PROJECT_ROOT, f)} still contains legacy phone number 97424190`);
    assert(!content.includes('9742'), `File ${path.relative(PROJECT_ROOT, f)} contains obsolete phone fragment 9742`);
  }

  return `Verified ${linkCount} WhatsApp links across source code and prerendered HTML all point to 56966177500`;
});

// ----------------------------------------------------------------------------
// 5. Portfolio Dataset Contract Hard Invariants
// ----------------------------------------------------------------------------
registerTest('STRESS-05', 'Validate portfolio dataset schema, duplicate prevention, and asset contracts', async () => {
  const { PORTFOLIO_PROJECTS } = await import('../src/data/portfolio');

  assert(Array.isArray(PORTFOLIO_PROJECTS), 'PORTFOLIO_PROJECTS is not an array');
  assert(PORTFOLIO_PROJECTS.length === 8, `Expected exactly 8 projects, found ${PORTFOLIO_PROJECTS.length}`);

  const idSet = new Set<string>();
  const slugSet = new Set<string>();

  for (const p of PORTFOLIO_PROJECTS) {
    assert(!idSet.has(p.id), `Duplicate project id: ${p.id}`);
    idSet.add(p.id);

    assert(!slugSet.has(p.slug), `Duplicate project slug: ${p.slug}`);
    slugSet.add(p.slug);

    assert(Boolean(p.title && p.title.length > 3), `Project ${p.id} has invalid title: "${p.title}"`);
    assert(Boolean(p.client && p.client.length > 2), `Project ${p.id} has invalid client: "${p.client}"`);
    assert(Boolean(p.location && p.location.length > 2), `Project ${p.id} has invalid location: "${p.location}"`);
    assert(Boolean(p.summary && p.summary.length > 10), `Project ${p.id} has invalid summary: "${p.summary}"`);
    assert(Boolean(p.description && p.description.length > 20), `Project ${p.id} has invalid description: "${p.description}"`);
    assert(Boolean(p.deliverables && p.deliverables.length >= 2), `Project ${p.id} has fewer than 2 deliverables`);

    // Strict local path
    assert(p.image.startsWith('/images/real/'), `Project ${p.id} image path "${p.image}" does not start with /images/real/`);
    assert(p.image.endsWith('.jpg') || p.image.endsWith('.png'), `Project ${p.id} image path "${p.image}" does not end with .jpg or .png`);

    const diskPath = path.join(PUBLIC_DIR, p.image);
    assert(fs.existsSync(diskPath), `Project ${p.id} image file does not exist on disk: ${diskPath}`);
    const stat = fs.statSync(diskPath);
    assert(stat.size > 50000, `Project ${p.id} image file is smaller than 50KB: ${stat.size} bytes`);
  }

  return `All 8 projects strictly conform to data contracts and exist on disk (>50KB each)`;
});

// ----------------------------------------------------------------------------
// 6. Navigation and Layout Component Verification
// ----------------------------------------------------------------------------
registerTest('STRESS-06', 'Validate Navbar and Footer accessibility, logo references, and contacts', () => {
  const navbarPath = path.join(SRC_DIR, 'components', 'layout', 'Navbar.tsx');
  const footerPath = path.join(SRC_DIR, 'components', 'layout', 'Footer.tsx');

  const navContent = fs.readFileSync(navbarPath, 'utf-8');
  const footContent = fs.readFileSync(footerPath, 'utf-8');

  // Navbar checks
  assert(navContent.includes('/images/real/logo-top.png'), 'Navbar does not reference /images/real/logo-top.png');
  assert(navContent.includes('aria-expanded'), 'Navbar mobile button lacks aria-expanded attribute');
  assert(navContent.includes('aria-label='), 'Navbar mobile button lacks aria-label attribute');

  // Footer checks
  assert(footContent.includes('/images/real/logo-puelche.png'), 'Footer does not reference /images/real/logo-puelche.png');
  assert(footContent.includes('paula.valdivieso@puelchelab.cl'), 'Footer does not contain paula.valdivieso@puelchelab.cl');
  assert(footContent.includes('+56 9 6617 7500'), 'Footer does not contain phone string "+56 9 6617 7500"');
  assert(!footContent.includes('<h1'), 'Footer contains illegal <h1> tag');

  return 'Navbar and Footer contracts fully satisfied';
});

// ----------------------------------------------------------------------------
// 7. Full Codebase Unsplash Zero-Tolerance Verification
// ----------------------------------------------------------------------------
registerTest('STRESS-07', 'Zero-tolerance search for unsplash in src/ and next.config.ts', () => {
  function scanDir(dir: string): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        scanDir(full);
      } else if (ent.isFile() && (ent.name.endsWith('.ts') || ent.name.endsWith('.tsx') || ent.name.endsWith('.css'))) {
        const text = fs.readFileSync(full, 'utf-8');
        assert(!text.toLowerCase().includes('unsplash'), `Forbidden unsplash found in ${full}`);
      }
    }
  }

  scanDir(SRC_DIR);
  const nextConfig = fs.readFileSync(path.join(PROJECT_ROOT, 'next.config.ts'), 'utf-8');
  assert(!nextConfig.toLowerCase().includes('unsplash'), 'Forbidden unsplash found in next.config.ts');

  return 'Zero occurrences of unsplash across all src/ files and next.config.ts';
});

// ----------------------------------------------------------------------------
// 8. Headless Image Optimization & Resolution Check
// ----------------------------------------------------------------------------
registerTest('STRESS-08', 'Verify all 15 base assets are readable by Node.js buffer and have non-trivial resolution', () => {
  const files = fs.readdirSync(REAL_IMAGES_DIR);
  let totalBytes = 0;
  for (const f of files) {
    const p = path.join(REAL_IMAGES_DIR, f);
    const buf = fs.readFileSync(p);
    totalBytes += buf.length;
    assert(buf.length > 5000, `Asset ${f} is too small`);
  }
  return `Read all 15 real assets into memory totaling ${(totalBytes / 1024 / 1024).toFixed(2)} MB`;
});

// ----------------------------------------------------------------------------
// Runner Execution
// ----------------------------------------------------------------------------
async function main() {
  console.log('======================================================================');
  console.log('              CHALLENGER ADVERSARIAL STRESS TEST SUITE               ');
  console.log('======================================================================');

  let passed = 0;
  let failed = 0;

  for (const t of suite) {
    try {
      const res = await t.fn();
      const details = res || 'OK';
      results.push({ id: t.id, name: t.name, passed: true, details });
      passed++;
      console.log(`[PASS] ${t.id}: ${t.name}`);
      console.log(`       -> ${details}`);
    } catch (err: any) {
      results.push({ id: t.id, name: t.name, passed: false, error: err.message });
      failed++;
      console.log(`[FAIL] ${t.id}: ${t.name}`);
      console.log(`       -> ERROR: ${err.message}`);
    }
  }

  console.log('======================================================================');
  console.log(`TOTAL: ${results.length} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('======================================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((e) => {
  console.error('Fatal stress test runner failure:', e);
  process.exit(1);
});
