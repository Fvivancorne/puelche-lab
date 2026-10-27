/**
 * Adversarial Test Suite for Milestone 1 (Brand Identity & Core Layout)
 * Challenger: m1_challenger_1
 */

import fs from 'fs';
import path from 'path';

interface TestResult {
  id: string;
  name: string;
  passed: boolean;
  details: string;
  error?: string;
}

const results: TestResult[] = [];

function runTest(id: string, name: string, fn: () => { passed: boolean; details: string }) {
  try {
    const res = fn();
    results.push({ id, name, passed: res.passed, details: res.details });
  } catch (err: any) {
    results.push({ id, name, passed: false, details: 'Exception thrown', error: err.message });
  }
}

// ---------------------------------------------------------------------------
// Test 1: Rendered HTML in .next/server/app/index.html contains official assets
// ---------------------------------------------------------------------------
runTest('ADV-M1-01', 'Rendered index.html contains /images/real/logo-top.png', () => {
  const htmlPath = path.resolve('.next/server/app/index.html');
  if (!fs.existsSync(htmlPath)) {
    return { passed: false, details: 'index.html does not exist in .next/server/app/' };
  }
  const content = fs.readFileSync(htmlPath, 'utf8');
  // Next.js encodes image URLs in srcSet or src: /images/real/logo-top.png or %2Fimages%2Freal%2Flogo-top.png
  const hasRaw = content.includes('/images/real/logo-top.png');
  const hasEncoded = content.includes('%2Fimages%2Freal%2Flogo-top.png');
  const passed = hasRaw || hasEncoded;
  return {
    passed,
    details: `logo-top.png found (raw: ${hasRaw}, encoded: ${hasEncoded})`,
  };
});

runTest('ADV-M1-02', 'Rendered index.html contains logo-puelche.png', () => {
  const htmlPath = path.resolve('.next/server/app/index.html');
  const content = fs.readFileSync(htmlPath, 'utf8');
  const hasRaw = content.includes('logo-puelche.png');
  const hasEncoded = content.includes('logo-puelche.png');
  const passed = hasRaw || hasEncoded;
  return {
    passed,
    details: `logo-puelche.png found: ${passed}`,
  };
});

runTest('ADV-M1-03', 'Rendered index.html contains paula.valdivieso@puelchelab.cl', () => {
  const htmlPath = path.resolve('.next/server/app/index.html');
  const content = fs.readFileSync(htmlPath, 'utf8');
  const passed = content.includes('paula.valdivieso@puelchelab.cl');
  return {
    passed,
    details: `paula.valdivieso@puelchelab.cl found: ${passed}`,
  };
});

// ---------------------------------------------------------------------------
// Test 2: Rendered Service HTML files contain NO images.unsplash.com
// ---------------------------------------------------------------------------
const serviceHtmlDir = path.resolve('.next/server/app/servicios');
const serviceHtmlFiles = fs.existsSync(serviceHtmlDir)
  ? fs.readdirSync(serviceHtmlDir).filter(f => f.endsWith('.html'))
  : [];

serviceHtmlFiles.forEach((file) => {
  runTest(`ADV-M1-04-${file}`, `No images.unsplash.com in rendered .next/server/app/servicios/${file}`, () => {
    const filePath = path.join(serviceHtmlDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const hasUnsplashDomain = content.includes('images.unsplash.com');
    const hasUnsplashKeyword = content.toLowerCase().includes('unsplash');
    const passed = !hasUnsplashDomain && !hasUnsplashKeyword;
    return {
      passed,
      details: `${file} -> images.unsplash.com: ${hasUnsplashDomain}, unsplash keyword: ${hasUnsplashKeyword}`,
    };
  });
});

// Also check .next/server/app/servicios.html
runTest('ADV-M1-04-servicios-overview', 'No images.unsplash.com in rendered .next/server/app/servicios.html', () => {
  const filePath = path.resolve('.next/server/app/servicios.html');
  if (!fs.existsSync(filePath)) {
    return { passed: false, details: 'servicios.html does not exist' };
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const hasUnsplash = content.includes('images.unsplash.com') || content.toLowerCase().includes('unsplash');
  return {
    passed: !hasUnsplash,
    details: `servicios.html hasUnsplash: ${hasUnsplash}`,
  };
});

// ---------------------------------------------------------------------------
// Test 3: Footer heading semantics & No <h1 in Footer.tsx or rendered footer
// ---------------------------------------------------------------------------
runTest('ADV-M1-05', 'NO <h1 exists in src/components/layout/Footer.tsx', () => {
  const footerPath = path.resolve('src/components/layout/Footer.tsx');
  const content = fs.readFileSync(footerPath, 'utf8');
  const hasH1 = /<h1[\s>]/i.test(content);
  return {
    passed: !hasH1,
    details: `<h1 in Footer.tsx: ${hasH1}`,
  };
});

runTest('ADV-M1-06', 'NO <h1 exists inside <footer> tag in any rendered HTML page', () => {
  const allHtmlFiles = [
    '.next/server/app/index.html',
    '.next/server/app/servicios.html',
    '.next/server/app/portafolio.html',
    '.next/server/app/clientes.html',
    '.next/server/app/contacto.html',
    ...serviceHtmlFiles.map(f => `.next/server/app/servicios/${f}`),
  ];

  const violations: string[] = [];
  for (const htmlRel of allHtmlFiles) {
    const fullPath = path.resolve(htmlRel);
    if (!fs.existsSync(fullPath)) continue;
    const content = fs.readFileSync(fullPath, 'utf8');
    const footerMatch = content.match(/<footer[\s\S]*?<\/footer>/i);
    if (footerMatch && /<h1[\s>]/i.test(footerMatch[0])) {
      violations.push(htmlRel);
    }
  }

  return {
    passed: violations.length === 0,
    details: violations.length === 0
      ? '0 <h1 tags found inside <footer> in all rendered pages'
      : `Found <h1 inside footer in: ${violations.join(', ')}`,
  };
});

// ---------------------------------------------------------------------------
// Test 4: Navbar logo aspect ratio & responsiveness (375px vs 1440px)
// ---------------------------------------------------------------------------
runTest('ADV-M1-07', 'Navbar logo aspect ratio and responsive geometry', () => {
  const logoPath = path.resolve('public/images/real/logo-top.png');
  if (!fs.existsSync(logoPath)) {
    return { passed: false, details: 'public/images/real/logo-top.png missing' };
  }

  const navbarContent = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');

  // Check width and height attributes in Navbar.tsx
  const widthMatch = navbarContent.match(/width=\{(\d+)\}/);
  const heightMatch = navbarContent.match(/height=\{(\d+)\}/);
  const classMatch = navbarContent.match(/className="([^"]*h-8[^"]*)"/);

  if (!widthMatch || !heightMatch) {
    return { passed: false, details: 'Navbar image width/height attributes not found' };
  }

  const declaredW = parseInt(widthMatch[1], 10);
  const declaredH = parseInt(heightMatch[1], 10);
  const declaredRatio = declaredW / declaredH;

  const classStr = classMatch ? classMatch[1] : '';
  const hasWAuto = classStr.includes('w-auto');
  const hasObjectContain = classStr.includes('object-contain');
  const hasH8 = classStr.includes('h-8'); // 32px
  const hasMdH10 = classStr.includes('md:h-10'); // 40px

  // At mobile 375px viewport: h-8 = 32px height -> with w-auto, width is 32 * 3.968 = 126.98px (< 375px, fits comfortably)
  // At desktop 1440px viewport: md:h-10 = 40px height -> with w-auto, width is 40 * 3.968 = 158.73px (< 1440px, fits comfortably)
  const mobileWidth = 32 * declaredRatio;
  const desktopWidth = 40 * declaredRatio;

  const squishFree = hasWAuto && hasObjectContain && declaredW === 250 && declaredH === 63;

  return {
    passed: squishFree,
    details: `Natural ratio: ${declaredRatio.toFixed(3)}, classes: [${classStr}], mobile 375px: h=32px w=${mobileWidth.toFixed(1)}px, desktop 1440px: h=40px w=${desktopWidth.toFixed(1)}px. Squish-free: ${squishFree}`,
  };
});

// ---------------------------------------------------------------------------
// Test 5: WhatsApp Button clean digits only and valid URL structure
// ---------------------------------------------------------------------------
runTest('ADV-M1-08', 'WhatsAppButton.tsx phoneNumber has clean digits only (56966177500)', () => {
  const waPath = path.resolve('src/components/ui/WhatsAppButton.tsx');
  const content = fs.readFileSync(waPath, 'utf8');

  const phoneMatch = content.match(/phoneNumber\s*=\s*['"]([^'"]+)['"]/);
  if (!phoneMatch) {
    return { passed: false, details: 'phoneNumber variable not found in WhatsAppButton.tsx' };
  }

  const phoneVal = phoneMatch[1];
  const isCleanDigitsOnly = /^\d+$/.test(phoneVal);
  const isExactTarget = phoneVal === '56966177500';

  // Check URL construction
  const urlCheck = content.includes('`https://wa.me/${phoneNumber}?text=');

  return {
    passed: isCleanDigitsOnly && isExactTarget && urlCheck,
    details: `phoneVal="${phoneVal}", cleanDigits=${isCleanDigitsOnly}, exactMatch=${isExactTarget}, urlCheck=${urlCheck}`,
  };
});

runTest('ADV-M1-09', 'Rendered index.html contains clean wa.me/56966177500 link', () => {
  const htmlPath = path.resolve('.next/server/app/index.html');
  const content = fs.readFileSync(htmlPath, 'utf8');

  const hasWaLink = content.includes('https://wa.me/56966177500');
  // Ensure no spaces or unescaped characters in wa link
  const malformedWa = /https:\/\/wa\.me\/[^\s"'>]*[\s+]/i.test(content);

  return {
    passed: hasWaLink && !malformedWa,
    details: `hasWaLink: ${hasWaLink}, malformedWa: ${malformedWa}`,
  };
});

// ---------------------------------------------------------------------------
// Test 6: Adversarial Check - Inconsistent phone numbers across codebase
// ---------------------------------------------------------------------------
runTest('ADV-M1-10', 'Adversarial Check: Audit all wa.me links across entire codebase', () => {
  // Let us scan all files in src/ for wa.me links
  const violations: string[] = [];
  function scanDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        scanDir(full);
      } else if (ent.name.endsWith('.tsx') || ent.name.endsWith('.ts')) {
        const text = fs.readFileSync(full, 'utf8');
        const matches = text.match(/wa\.me\/(\d+)/g);
        if (matches) {
          matches.forEach(m => {
            const num = m.replace('wa.me/', '');
            if (num !== '56966177500') {
              violations.push(`${full}: ${m}`);
            }
          });
        }
      }
    }
  }
  scanDir(path.resolve('src'));

  return {
    passed: violations.length === 0,
    details: violations.length === 0
      ? 'All wa.me links in src/ point strictly to 56966177500'
      : `Found outdated wa.me numbers in: ${violations.join('; ')}`,
  };
});

// ---------------------------------------------------------------------------
// Output summary
// ---------------------------------------------------------------------------
console.log('\n======================================================');
console.log('       ADVERSARIAL TEST RESULTS - MILESTONE 1         ');
console.log('======================================================\n');

let totalPassed = 0;
let totalFailed = 0;

results.forEach((r) => {
  const status = r.passed ? 'PASS' : 'FAIL';
  console.log(`[${status}] ${r.id}: ${r.name}`);
  console.log(`       Details: ${r.details}`);
  if (r.error) {
    console.log(`       Error: ${r.error}`);
  }
  if (r.passed) totalPassed++;
  else totalFailed++;
});

console.log('\n------------------------------------------------------');
console.log(`TOTAL TESTS: ${results.length} | PASSED: ${totalPassed} | FAILED: ${totalFailed}`);
console.log('------------------------------------------------------\n');

process.exit(totalFailed > 0 ? 1 : 0);
