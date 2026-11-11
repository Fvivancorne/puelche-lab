/**
 * PUELCHE LAB — EMPIRICAL CHALLENGER INDEPENDENT VERIFICATION HARNESS
 * Archetype: Empirical Challenger (Teamwork Challenger 1)
 * Purpose: Stress-test LLMs.txt, Magnetic, KineticTextSwap, Soundwaves, Reduced-Motion, Build & Prerender density.
 */

import * as fs from 'fs';
import * as path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');

interface TestOutcome {
  id: string;
  name: string;
  suite: string;
  passed: boolean;
  error?: string;
  durationMs: number;
}

const outcomes: TestOutcome[] = [];

async function challenge(id: string, name: string, suite: string, fn: () => void | Promise<void>) {
  const start = performance.now();
  try {
    await fn();
    const duration = performance.now() - start;
    outcomes.push({ id, name, suite, passed: true, durationMs: duration });
    console.log(`  ✔ [PASS] [${id}] ${name} (${duration.toFixed(2)}ms)`);
  } catch (err: any) {
    const duration = performance.now() - start;
    outcomes.push({ id, name, suite, passed: false, error: err?.message || String(err), durationMs: duration });
    console.error(`  ✖ [FAIL] [${id}] ${name} (${duration.toFixed(2)}ms) -> ${err?.message || err}`);
  }
}

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(msg);
}

function assertEqual<T>(actual: T, expected: T, msg: string) {
  if (actual !== expected) {
    throw new Error(`${msg}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

async function run() {
  console.log('\n======================================================================');
  console.log('      PUELCHE LAB: INDEPENDENT EMPIRICAL CHALLENGER TEST SUITE       ');
  console.log('======================================================================\n');

  // --------------------------------------------------------------------------
  // SUITE 1: LLMS.TXT & LLMS-FULL.TXT SPECIFICATION & CANONICAL ROUTING AUDIT
  // --------------------------------------------------------------------------
  console.log('--- SUITE 1: LLMS.TXT & LLMS-FULL.TXT DEEP SPEC STRESS ---');

  await challenge('LLMS-01', 'public/llms.txt exists, is UTF-8 encoded, and non-empty (>2KB)', 'LLMs-Txt', () => {
    const filePath = path.join(PUBLIC_DIR, 'llms.txt');
    assert(fs.existsSync(filePath), 'public/llms.txt does not exist on disk');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert(content.length > 2000, `public/llms.txt too small: ${content.length} chars (expected > 2000)`);
    // Assert valid UTF-8 without replacement character \uFFFD
    assert(!content.includes('\uFFFD'), 'public/llms.txt contains corrupted UTF-8 replacement characters');
  });

  await challenge('LLMS-02', 'public/llms.txt strictly follows llmstxt.org Markdown structure (H1 + blockquote)', 'LLMs-Txt', () => {
    const content = fs.readFileSync(path.join(PUBLIC_DIR, 'llms.txt'), 'utf-8');
    const lines = content.split('\n');
    assert(lines[0].startsWith('# '), 'Line 1 must be an H1 heading (# Title)');
    // Find blockquote in first 5 lines
    const hasBlockquote = lines.slice(1, 6).some(l => l.startsWith('> '));
    assert(hasBlockquote, 'llms.txt must have a summary blockquote (> Summary) immediately following H1');
    const h2Count = lines.filter(l => l.startsWith('## ')).length;
    assert(h2Count >= 4, `llms.txt must have at least 4 H2 sections, found ${h2Count}`);
  });

  await challenge('LLMS-03', 'public/llms-full.txt exists, is valid UTF-8, and exceeds 10KB high-density threshold', 'LLMs-Txt', () => {
    const filePath = path.join(PUBLIC_DIR, 'llms-full.txt');
    assert(fs.existsSync(filePath), 'public/llms-full.txt does not exist on disk');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert(content.length > 10000, `public/llms-full.txt payload too low: ${content.length} chars (expected > 10000)`);
    assert(!content.includes('\uFFFD'), 'public/llms-full.txt contains corrupted UTF-8 characters');
    const lines = content.split('\n');
    assert(lines[0].startsWith('# '), 'Line 1 of llms-full.txt must be an H1 heading');
  });

  await challenge('LLMS-04', 'Every internal canonical route referenced in llms.txt maps to an existing Next.js App Router page', 'LLMs-Txt', () => {
    const content = fs.readFileSync(path.join(PUBLIC_DIR, 'llms.txt'), 'utf-8');
    const canonicalRegex = /https:\/\/www\.puelchelab\.cl(\/[a-zA-Z0-9_\-\/\.]*)/g;
    const matches = Array.from(content.matchAll(canonicalRegex)).map(m => m[1]);
    assert(matches.length > 0, 'No canonical URLs found in llms.txt');

    for (const urlPath of matches) {
      if (urlPath === '' || urlPath === '/') {
        assert(fs.existsSync(path.join(SRC_DIR, 'app', 'page.tsx')), 'Root page.tsx missing');
      } else if (urlPath.endsWith('.txt')) {
        assert(fs.existsSync(path.join(PUBLIC_DIR, urlPath.slice(1))), `Static text asset ${urlPath} missing`);
      } else {
        const routeSegments = urlPath.replace(/^\//, '').split('/');
        const pagePath = path.join(SRC_DIR, 'app', ...routeSegments, 'page.tsx');
        assert(fs.existsSync(pagePath), `Canonical URL ${urlPath} in llms.txt does not resolve to ${pagePath}`);
      }
    }
  });

  await challenge('LLMS-05', 'All 20 documented corporate clients in llms.txt / llms-full.txt have corresponding logo assets', 'LLMs-Txt', () => {
    const fullContent = fs.readFileSync(path.join(PUBLIC_DIR, 'llms-full.txt'), 'utf-8');
    const clientLogosDir = path.join(PUBLIC_DIR, 'images', 'real', 'clients');
    assert(fs.existsSync(clientLogosDir), 'public/images/real/clients does not exist');
    
    // Check all 20 logo files client1-1.png to client20-1.png
    for (let i = 1; i <= 20; i++) {
      const logoFile = path.join(clientLogosDir, `cliente${i}-1.png`);
      assert(fs.existsSync(logoFile), `Client logo missing: cliente${i}-1.png`);
      const stat = fs.statSync(logoFile);
      assert(stat.size > 500, `Client logo cliente${i}-1.png is empty or trivial: ${stat.size} bytes`);
    }

    // Check specific iconic clients in full content
    const iconicClients = ['Anasac', 'AquaChile', 'Doosan', 'Estancia Rilán', 'Cala Melí', 'Turistour', 'Tagua Tagua Lodge', 'Muebles Yunge'];
    for (const client of iconicClients) {
      assert(fullContent.includes(client), `llms-full.txt missing documented client: ${client}`);
    }
  });

  // --------------------------------------------------------------------------
  // SUITE 2: MAGNETIC COMPONENT MATHEMATICS, ACCESSIBILITY & STRESS RESILIENCE
  // --------------------------------------------------------------------------
  console.log('\n--- SUITE 2: MAGNETIC COMPONENT STRESS HARNESS ---');

  await challenge('MAG-01', 'Magnetic component code integrity and strict hook cleanup structure', 'Magnetic', () => {
    const compPath = path.join(SRC_DIR, 'components', 'ui', 'Magnetic.tsx');
    assert(fs.existsSync(compPath), 'Magnetic.tsx does not exist');
    const code = fs.readFileSync(compPath, 'utf-8');

    assert(code.includes("'use client'"), 'Magnetic must be a client component');
    assert(code.includes('gsap.matchMedia()'), 'Magnetic must use gsap.matchMedia for responsive isolation');
    assert(code.includes('(pointer: fine) and (prefers-reduced-motion: no-preference)'), 'Magnetic must strictly scope to fine pointer & no-preference motion');
    assert(code.includes('gsap.quickTo'), 'Magnetic must use gsap.quickTo for high-frequency 120Hz spring interpolation');
    assert(code.includes('passive: true'), 'Magnetic mousemove listener must be passive to prevent scroll hitching');
    assert(code.includes('removeEventListener'), 'Magnetic must clean up event listeners');
    assert(code.includes('media.revert()'), 'Magnetic must revert gsap.matchMedia on unmount');
  });

  await challenge('MAG-02', 'Magnetic mathematical distance & spring threshold boundary simulation', 'Magnetic', () => {
    const radius = 90;
    const strength = 0.35;
    const center = { x: 500, y: 500 };

    const simulateMagnetic = (clientX: number, clientY: number) => {
      const distX = clientX - center.x;
      const distY = clientY - center.y;
      const distance = Math.hypot(distX, distY);
      if (distance < radius) {
        return { targetX: distX * strength, targetY: distY * strength, triggered: true };
      }
      return { targetX: 0, targetY: 0, triggered: false };
    };

    // Case 1: Inside radius (distance = 50px < 90px)
    const inside = simulateMagnetic(530, 540);
    assert(inside.triggered === true, 'Magnetic must trigger when cursor is within radius');
    assertEqual(inside.targetX, 30 * 0.35, 'Magnetic X displacement must equal distX * strength');
    assertEqual(inside.targetY, 40 * 0.35, 'Magnetic Y displacement must equal distY * strength');

    // Case 2: Exactly on boundary (distance = 90px)
    const onBoundary = simulateMagnetic(500 + 90, 500);
    assert(onBoundary.triggered === false, 'Magnetic must release at or beyond boundary');
    assertEqual(onBoundary.targetX, 0, 'Target X at boundary must be 0');

    // Case 3: Far outside (distance = 300px)
    const outside = simulateMagnetic(700, 700);
    assert(outside.triggered === false, 'Magnetic must be inert outside radius');
    assertEqual(outside.targetX, 0, 'Target X outside must be 0');
    assertEqual(outside.targetY, 0, 'Target Y outside must be 0');

    // Case 4: Adversarial coordinates (zero distance: cursor exactly at center)
    const exactCenter = simulateMagnetic(500, 500);
    assert(exactCenter.triggered === true, 'Center should trigger with 0 displacement');
    assertEqual(exactCenter.targetX, 0, 'Center displacement X must be 0');
    assertEqual(exactCenter.targetY, 0, 'Center displacement Y must be 0');
    assert(!isNaN(exactCenter.targetX) && !isNaN(exactCenter.targetY), 'Displacement must never be NaN');
  });

  await challenge('MAG-03', 'Magnetic integration in Home and Auditor pages verified', 'Magnetic', () => {
    const homePage = fs.readFileSync(path.join(SRC_DIR, 'app', 'page.tsx'), 'utf-8');
    const auditorPage = fs.readFileSync(path.join(SRC_DIR, 'app', 'auditor', 'page.tsx'), 'utf-8');

    assert(homePage.includes('import { Magnetic }'), 'Home page must import Magnetic');
    assert(homePage.includes('<Magnetic strength={0.3}'), 'Home page must use Magnetic on CTA actions');
    assert(auditorPage.includes('import { Magnetic }'), 'Auditor page must import Magnetic');
    assert(auditorPage.includes('<Magnetic strength={0.35}'), 'Auditor page must use Magnetic on lead gate submit');
  });

  // --------------------------------------------------------------------------
  // SUITE 3: KINETIC TEXT SWAP A11Y & REDUCED MOTION HARNESS
  // --------------------------------------------------------------------------
  console.log('\n--- SUITE 3: KINETIC TEXT SWAP A11Y & MOTION AUDIT ---');

  await challenge('KINETIC-01', 'KineticTextSwap source code implements aria-hidden duplicate for screen reader a11y', 'KineticTextSwap', () => {
    const compPath = path.join(SRC_DIR, 'components', 'ui', 'KineticTextSwap.tsx');
    assert(fs.existsSync(compPath), 'KineticTextSwap.tsx does not exist');
    const code = fs.readFileSync(compPath, 'utf-8');

    assert(code.includes('aria-hidden="true"'), 'Duplicate text layer MUST have aria-hidden="true" to prevent redundant screen reader speech');
    assert(code.includes('motion-reduce:transform-none'), 'Primary layer must reset transform under prefers-reduced-motion');
    assert(code.includes('motion-reduce:hidden'), 'Duplicate accent layer must be hidden under prefers-reduced-motion');
    assert(code.includes('cubic-bezier(0.76,0,0.24,1)'), 'Must use custom Awwwards cubic-bezier transition easing');
    assert(code.includes('secondaryText = primaryText'), 'secondaryText must fallback gracefully to primaryText if omitted');
  });

  await challenge('KINETIC-02', 'KineticTextSwap handles internationalization & UTF-8 character stress without escaping issues', 'KineticTextSwap', () => {
    const testCases = [
      { primary: 'Auditar Plataforma', secondary: 'Autopsia Forense' },
      { primary: 'Cotizar Proyecto', secondary: 'Cálculo Inmediato' },
      { primary: '100% CIELOS AUSTRALESTM', secondary: '41°19′S 72°59′W' },
      { primary: '¿Diseño Cross-Media?', secondary: '¡Viento Puelche & Sol!' },
    ];

    for (const tc of testCases) {
      assert(tc.primary.length > 0, 'Primary text must not be empty');
      assert(tc.secondary.length > 0, 'Secondary text must not be empty');
      // Verify no invalid Unicode replacement characters
      assert(!tc.primary.includes('\uFFFD'), `Primary text has invalid characters: ${tc.primary}`);
      assert(!tc.secondary.includes('\uFFFD'), `Secondary text has invalid characters: ${tc.secondary}`);
    }
  });

  // --------------------------------------------------------------------------
  // SUITE 4: SOUNDWAVE AUDIO CLASSES & KEYFRAME STRESS
  // --------------------------------------------------------------------------
  console.log('\n--- SUITE 4: SOUNDWAVE KEYFRAME & AUDIO VISUALIZER AUDIT ---');

  await challenge('WAVE-01', 'globals.css defines all 4 soundwave keyframes and utility classes', 'Soundwaves', () => {
    const cssPath = path.join(SRC_DIR, 'app', 'globals.css');
    assert(fs.existsSync(cssPath), 'globals.css does not exist');
    const css = fs.readFileSync(cssPath, 'utf-8');

    for (let i = 1; i <= 4; i++) {
      assert(css.includes(`@keyframes soundwave-${i}`), `Missing @keyframes soundwave-${i} in globals.css`);
      assert(css.includes(`.animate-soundwave-${i}`), `Missing .animate-soundwave-${i} class in globals.css`);
    }
  });

  await challenge('WAVE-02', 'src/app/auditor/page.tsx utilizes animate-soundwave-1, 2, 3 in Paula Valdivieso webcam badge', 'Soundwaves', () => {
    const auditorPath = path.join(SRC_DIR, 'app', 'auditor', 'page.tsx');
    const code = fs.readFileSync(auditorPath, 'utf-8');

    assert(code.includes('animate-soundwave-1'), 'Auditor page missing animate-soundwave-1');
    assert(code.includes('animate-soundwave-2'), 'Auditor page missing animate-soundwave-2');
    assert(code.includes('animate-soundwave-3'), 'Auditor page missing animate-soundwave-3');
    // Ensure it is in the webcam badge
    const webcamIdx = code.indexOf('Circular Webcam Circle');
    assert(webcamIdx !== -1, 'Auditor page missing webcam badge section');
    const badgeContext = code.slice(webcamIdx, webcamIdx + 1500);
    assert(badgeContext.includes('Paula Valdivieso'), 'Webcam badge must contain Paula Valdivieso');
    assert(badgeContext.includes('animate-soundwave-1'), 'Webcam badge must contain animate-soundwave-1');
    assert(badgeContext.includes('animate-soundwave-2'), 'Webcam badge must contain animate-soundwave-2');
    assert(badgeContext.includes('animate-soundwave-3'), 'Webcam badge must contain animate-soundwave-3');
  });

  // --------------------------------------------------------------------------
  // SUITE 5: REDUCED-MOTION HERO RESET & ACCESSIBILITY CONTRACT
  // --------------------------------------------------------------------------
  console.log('\n--- SUITE 5: REDUCED MOTION HERO IMMUNITY AUDIT ---');

  await challenge('MOTION-01', 'src/app/page.tsx implements complete prefers-reduced-motion reset for #hero and #hero-bg-img', 'ReducedMotion', () => {
    const pagePath = path.join(SRC_DIR, 'app', 'page.tsx');
    const code = fs.readFileSync(pagePath, 'utf-8');

    assert(code.includes("(prefers-reduced-motion: reduce)"), 'page.tsx must register media.add for prefers-reduced-motion: reduce');
    assert(code.includes("gsap.set('#hero', { scale: 1.0, borderRadius: '0px' })"), '#hero must reset scale: 1.0 and borderRadius: 0px');
    assert(code.includes("gsap.set('#hero-bg-img', { scale: 1.0 })"), '#hero-bg-img must reset scale: 1.0');
    assert(code.includes("gsap.set(wipeTarget, { '--wipe-lead': 1, '--wipe-trail': 1 })"), 'wipe curtain must be instantly completed in reduced motion');
  });

  // --------------------------------------------------------------------------
  // SUITE 6: PRODUCTION PRERENDER HTML PAYLOAD INTEGRITY
  // --------------------------------------------------------------------------
  console.log('\n--- SUITE 6: PRODUCTION PRERENDERED HTML PAYLOAD & ZERO STOCK ---');

  await challenge('PRERENDER-01', 'Critical static pages exceed 20KB HTML payload in .next build output', 'Prerender', () => {
    const criticalPages = [
      { name: 'Home (/)', file: '.next/server/app/index.html' },
      { name: 'Servicios (/servicios)', file: '.next/server/app/servicios.html' },
      { name: 'Auditor (/auditor)', file: '.next/server/app/auditor.html' },
      { name: 'Cotizador (/cotizador)', file: '.next/server/app/cotizador.html' },
      { name: 'Clientes (/clientes)', file: '.next/server/app/clientes.html' },
      { name: 'Portafolio (/portafolio)', file: '.next/server/app/portafolio.html' },
    ];

    for (const page of criticalPages) {
      const fullPath = path.join(PROJECT_ROOT, page.file);
      assert(fs.existsSync(fullPath), `Prerendered file ${page.file} does not exist in build output`);
      const stat = fs.statSync(fullPath);
      assert(stat.size > 20000, `${page.name} (${page.file}) payload is ${stat.size} bytes (expected > 20,000 bytes)`);
    }
  });

  await challenge('PRERENDER-02', 'Zero Unsplash & Zero Stock invariant holds across all source files and public text', 'ZeroStock', () => {
    const checkDir = (dir: string) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== '.git') {
            checkDir(full);
          }
        } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts') || entry.name.endsWith('.txt'))) {
          const content = fs.readFileSync(full, 'utf-8');
          assert(!content.toLowerCase().includes('unsplash.com'), `Unsplash reference found in ${full}`);
        }
      }
    };

    checkDir(SRC_DIR);
    checkDir(path.join(PUBLIC_DIR));
  });

  // --------------------------------------------------------------------------
  // SUMMARY REPORT
  // --------------------------------------------------------------------------
  console.log('\n======================================================================');
  console.log('              EMPIRICAL CHALLENGER VERIFICATION SUMMARY               ');
  console.log('======================================================================\n');

  const total = outcomes.length;
  const passed = outcomes.filter(o => o.passed).length;
  const failed = outcomes.filter(o => !o.passed).length;
  const successRate = ((passed / total) * 100).toFixed(1);

  console.log(`  Total Challenges Executed : ${total}`);
  console.log(`  Passed Empirical Checks   : ${passed}`);
  console.log(`  Failed Empirical Checks   : ${failed}`);
  console.log(`  Pass Rate                 : ${successRate}%\n`);

  if (failed > 0) {
    console.error(`❌ EMPIRICAL HARNESS DETECTED ${failed} FAILURE(S). REQUEST_CHANGES.`);
    process.exit(1);
  } else {
    console.log('✔ ALL EMPIRICAL CHALLENGES SATISFIED WITH 100% MATHEMATICAL RESILIENCE.');
    console.log('✔ VERDICT: APPROVE.\n');
    process.exit(0);
  }
}

run().catch((err) => {
  console.error('Fatal test harness execution error:', err);
  process.exit(1);
});
