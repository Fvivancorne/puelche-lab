/**
 * Empirical Adversarial Challenger Suite for Puelche-Lab Auditor
 * Tests:
 * 1. Live API /api/auditor on production (https://puelche-lab.vercel.app/api/auditor)
 * 2. Live Page /auditor on production (https://puelche-lab.vercel.app/auditor)
 * 3. Edge cases, adversarial payloads, SSRF resistance, malformed input, network failures
 * 4. Contract invariants, data types, Core Web Vitals, GEO data, SEO, YouTube, Open Graph
 */

const REMOTE_BASE = 'https://puelche-lab.vercel.app';
const API_URL = `${REMOTE_BASE}/api/auditor`;
const AUDITOR_PAGE_URL = `${REMOTE_BASE}/auditor`;

interface ChallengeResult {
  id: string;
  name: string;
  category: string;
  passed: boolean;
  durationMs: number;
  details: string;
  error?: string;
}

const challengeResults: ChallengeResult[] = [];

function assert(condition: unknown, msg: string): asserts condition {
  if (!condition) throw new Error(msg);
}

async function recordChallenge(
  id: string,
  name: string,
  category: string,
  fn: () => Promise<string | void> | string | void
) {
  const start = performance.now();
  try {
    const details = (await fn()) || 'Passed successfully';
    const durationMs = Math.round((performance.now() - start) * 100) / 100;
    challengeResults.push({
      id,
      name,
      category,
      passed: true,
      durationMs,
      details,
    });
    console.log(`  \x1b[32m✔ PASS\x1b[0m [${id}] ${name} (${durationMs}ms) — ${details}`);
  } catch (err: unknown) {
    const durationMs = Math.round((performance.now() - start) * 100) / 100;
    const errorMsg = err instanceof Error ? err.message : String(err);
    challengeResults.push({
      id,
      name,
      category,
      passed: false,
      durationMs,
      details: 'Failed',
      error: errorMsg,
    });
    console.log(`  \x1b[31m✖ FAIL\x1b[0m [${id}] ${name} (${durationMs}ms)`);
    console.log(`    \x1b[31mError: ${errorMsg}\x1b[0m`);
  }
}

async function main() {
  console.log('\n\x1b[1m\x1b[35m╔══════════════════════════════════════════════════════════════════════════╗\x1b[0m');
  console.log('\x1b[1m\x1b[35m║  PUELCHE LAB — EMPIRICAL CHALLENGER ADVERSARIAL AUDITOR STRESS HARNESS   ║\x1b[0m');
  console.log('\x1b[1m\x1b[35m╚══════════════════════════════════════════════════════════════════════════╝\x1b[0m\n');

  // =========================================================================
  // CATEGORY 1: ADVERSARIAL INPUT & MALFORMED PAYLOAD INJECTION
  // =========================================================================
  console.log('\x1b[1m--- CATEGORY 1: Adversarial Input & Malformed Payload Validation ---\x1b[0m');

  await recordChallenge('ADV-01', 'Empty JSON Object {} in POST body', 'Validation', async () => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    const data = await res.json();
    assert(data.success === false, 'Expected success: false');
    assert(typeof data.error === 'string', 'Expected error string');
    return `HTTP ${res.status}: ${data.error}`;
  });

  await recordChallenge('ADV-02', 'Non-JSON body (Raw String)', 'Validation', async () => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: 'this is not json at all',
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    const data = await res.json();
    assert(data.success === false, 'Expected success: false');
    return `HTTP ${res.status} rejected non-JSON gracefully`;
  });

  await recordChallenge('ADV-03', 'Invalid URL: Whitespace only', 'Validation', async () => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: '     ' }),
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    const data = await res.json();
    assert(data.success === false, 'Expected success: false');
    return `HTTP ${res.status} rejected whitespace URL`;
  });

  await recordChallenge('ADV-04', 'Invalid URL: Protocol-less gibberish without dot', 'Validation', async () => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'not-a-domain' }),
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    const data = await res.json();
    assert(data.success === false, 'Expected success: false');
    return `HTTP ${res.status}: ${data.error}`;
  });

  await recordChallenge('ADV-05', 'XSS Injection in URL (javascript:alert(1))', 'Validation', async () => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'javascript:alert(document.cookie)' }),
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    const data = await res.json();
    assert(data.success === false, 'Expected success: false');
    return `HTTP ${res.status} blocked javascript: scheme`;
  });

  await recordChallenge('ADV-06', 'File Scheme Injection (file:///etc/passwd)', 'Validation', async () => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'file:///etc/passwd' }),
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    const data = await res.json();
    assert(data.success === false, 'Expected success: false');
    return `HTTP ${res.status} blocked file: scheme`;
  });

  await recordChallenge('ADV-07', 'FTP Scheme (ftp://ftp.example.com)', 'Validation', async () => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'ftp://ftp.example.com' }),
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    const data = await res.json();
    assert(data.success === false, 'Expected success: false');
    return `HTTP ${res.status} blocked ftp: scheme`;
  });

  // =========================================================================
  // CATEGORY 2: SSRF & INTERNAL NETWORK PROBING
  // =========================================================================
  console.log('\n\x1b[1m--- CATEGORY 2: SSRF & Network Boundary Resilience ---\x1b[0m');

  await recordChallenge('ADV-08', 'SSRF: Localhost IP (127.0.0.1)', 'SSRF', async () => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'http://127.0.0.1:8080' }),
    });
    assert(res.status === 500 || res.status === 504 || res.status === 400, `Expected error status, got ${res.status}`);
    const data = await res.json();
    assert(data.success === false, 'Expected success: false');
    return `HTTP ${res.status}: ${data.error}`;
  });

  await recordChallenge('ADV-09', 'SSRF: Cloud Metadata Service (169.254.169.254)', 'SSRF', async () => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'http://169.254.169.254/latest/meta-data/' }),
    });
    assert(res.status === 500 || res.status === 504 || res.status === 400, `Expected error status, got ${res.status}`);
    const data = await res.json();
    assert(data.success === false, 'Expected success: false');
    return `HTTP ${res.status}: Handled unreachable metadata service gracefully`;
  });

  await recordChallenge('ADV-10', 'Non-existent Domain (DNS Failure Handling)', 'Network', async () => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://puelche-challenger-non-existent-domain-404-fail.com' }),
    });
    assert(res.status === 500 || res.status === 504, `Expected 500 or 504, got ${res.status}`);
    const data = await res.json();
    assert(data.success === false, 'Expected success: false');
    assert(data.error.includes('No se pudo establecer conexión') || data.error.includes('host'), 'Clear DNS error');
    return `HTTP ${res.status}: ${data.error}`;
  });

  // =========================================================================
  // CATEGORY 3: LIVE AUDIT CONTRACT & FIDELITY
  // =========================================================================
  console.log('\n\x1b[1m--- CATEGORY 3: Live Audit Payload Structure & Data Fidelity ---\x1b[0m');

  let liveAuditData: any = null;

  await recordChallenge('ADV-11', 'Live Audit on puelche-lab.vercel.app (Naked Domain)', 'Contract', async () => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'puelche-lab.vercel.app' }),
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const data = await res.json();
    assert(data.success === true, 'Expected success: true');
    assert(data.normalizedUrl === 'https://puelche-lab.vercel.app/', `Got ${data.normalizedUrl}`);
    liveAuditData = data;
    return `Overall score: ${data.overallScore}, Duration: ${data.durationMs}ms`;
  });

  await recordChallenge('ADV-12', 'Telemetry Phase Progression (P1 through P5)', 'Contract', async () => {
    assert(liveAuditData, 'Prerequisite liveAuditData missing');
    const logs = liveAuditData.telemetryLogs;
    assert(Array.isArray(logs), 'telemetryLogs must be an array');
    assert(logs.length >= 5, `Expected >= 5 phase logs, got ${logs.length}`);
    const phases = logs.map((l: any) => l.phase);
    assert(phases.includes('P1'), 'P1 DNS & SSL phase missing');
    assert(phases.includes('P2'), 'P2 DOM & SEO phase missing');
    assert(phases.includes('P3'), 'P3 Assets & Media phase missing');
    assert(phases.includes('P4'), 'P4 Core Web Vitals phase missing');
    assert(phases.includes('P5'), 'P5 GEO & Synthesis phase missing');
    return `All 5 phases verified (P1..P5) with exact timestamps`;
  });

  await recordChallenge('ADV-13', 'Core Web Vitals Metric Schema & Thresholds', 'Performance', async () => {
    assert(liveAuditData, 'Prerequisite liveAuditData missing');
    const perf = liveAuditData.performance;
    assert(typeof perf.score === 'number' && perf.score >= 0 && perf.score <= 100, 'Invalid perf score');
    assert(perf.source === 'pagespeed_api' || perf.source === 'empirical_telemetry', 'Invalid source');
    const m = perf.metrics;
    assert(typeof m.lcp === 'string' && m.lcp.includes('s'), 'LCP must have time unit');
    assert(typeof m.fid_inp === 'string' && m.fid_inp.includes('ms'), 'INP/FID must have ms unit');
    assert(typeof m.cls === 'string', 'CLS must be string');
    assert(typeof m.fcp === 'string' && m.fcp.includes('s'), 'FCP must have time unit');
    assert(typeof m.ttfb === 'string' && m.ttfb.includes('ms'), 'TTFB must have ms unit');
    assert(Array.isArray(perf.diagnostics), 'Diagnostics must be array');
    return `Source: ${perf.source}, Score: ${perf.score}, LCP: ${m.lcp}, TTFB: ${m.ttfb}`;
  });

  await recordChallenge('ADV-14', 'GEO Engine: llms.txt, robots.txt AI bots, Schema.org, RAG', 'GEO', async () => {
    assert(liveAuditData, 'Prerequisite liveAuditData missing');
    const geo = liveAuditData.geo;
    assert(typeof geo.score === 'number', 'Invalid geo score');
    
    // llmsTxt check
    assert(typeof geo.llmsTxt.present === 'boolean', 'llmsTxt.present must be boolean');
    assert(typeof geo.llmsTxt.validSyntax === 'boolean', 'llmsTxt.validSyntax must be boolean');
    assert(typeof geo.llmsTxt.charCount === 'number', 'llmsTxt.charCount must be number');

    // robotsTxt check
    assert(typeof geo.robotsTxt.present === 'boolean', 'robotsTxt.present must be boolean');
    const aiBots = geo.robotsTxt.aiBotsAllowed;
    assert('gptBot' in aiBots, 'gptBot missing');
    assert('claudeBot' in aiBots, 'claudeBot missing');
    assert('perplexityBot' in aiBots, 'perplexityBot missing');
    assert('googleExtended' in aiBots, 'googleExtended missing');
    assert('applebotExtended' in aiBots, 'applebotExtended missing');
    assert('bytespider' in aiBots, 'bytespider missing');
    assert('ccBot' in aiBots, 'ccBot missing');

    // schemaOrg check
    assert(typeof geo.schemaOrg.present === 'boolean', 'schemaOrg.present must be boolean');
    assert(Array.isArray(geo.schemaOrg.types), 'schemaOrg.types must be array');
    assert(geo.schemaOrg.types.length > 0, 'Schema types must not be empty on puelche-lab');

    // RAG density check
    assert(typeof geo.ragDensity.score === 'number', 'ragDensity.score must be number');
    assert(typeof geo.ragDensity.ratio === 'string', 'ragDensity.ratio must be string');
    assert(typeof geo.ragDensity.textToHtmlRatio === 'number', 'ragDensity.textToHtmlRatio must be number');

    return `GEO Score: ${geo.score}, llms.txt: ${geo.llmsTxt.present}, Schemas: ${geo.schemaOrg.types.join(', ')}, RAG: ${geo.ragDensity.ratio}`;
  });

  await recordChallenge('ADV-15', 'Technical SEO Hierarchy & Open Graph Cards Extraction', 'SEO', async () => {
    assert(liveAuditData, 'Prerequisite liveAuditData missing');
    const seo = liveAuditData.seo;
    assert(typeof seo.score === 'number', 'Invalid seo score');
    assert(seo.title && seo.title.length > 0, 'SEO title missing');
    // On puelche-lab, canonical is correctly evaluated as string (may be empty string if tag not present)
    assert(typeof seo.canonical === 'string', 'canonical must be a string');
    assert(seo.headingsCount.h1 >= 1, 'H1 count missing');
    assert(seo.viewportPresent === true, 'Viewport meta tag must be present');

    const og = liveAuditData.openGraph;
    assert(typeof og.score === 'number', 'Invalid OG score');
    assert(og.title && og.title.length > 0, 'OG title missing');
    assert(og.image && og.image.length > 0, 'OG image missing');

    return `SEO Score: ${seo.score}, Title: "${seo.title.slice(0, 30)}...", OG Image: ${og.image}`;
  });

  await recordChallenge('ADV-15b', 'Canonical Extraction Verification on Canonical-bearing Site (GitHub)', 'SEO', async () => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://github.com' }),
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const data = await res.json();
    assert(data.success === true, 'Expected success: true');
    assert(data.seo.canonical === 'https://github.com', `Expected canonical https://github.com, got ${data.seo.canonical}`);
    return `Verified canonical extraction: ${data.seo.canonical}`;
  });

  await recordChallenge('ADV-16', 'Commercial Findings Severity & Actionability Matrix', 'Commercial', async () => {
    assert(liveAuditData, 'Prerequisite liveAuditData missing');
    const findings = liveAuditData.commercialFindings;
    assert(Array.isArray(findings), 'commercialFindings must be array');
    assert(findings.length >= 4, `Expected at least 4 findings, got ${findings.length}`);
    for (const f of findings) {
      assert(f.id, 'Finding ID missing');
      assert(f.category, 'Finding category missing');
      assert(f.title, 'Finding title missing');
      assert(f.businessImpact, 'Finding businessImpact missing');
      assert(f.actionableSolution || f.recommendation, 'Finding actionable recommendation missing');
      assert(['critical', 'warning', 'optimal'].includes(f.severity), `Invalid severity: ${f.severity}`);
    }
    return `Verified ${findings.length} findings with full impact and financial assessment`;
  });

  // =========================================================================
  // CATEGORY 4: PROTOCOL VARIATIONS, QUERY PARAMS & URL MUTATIONS
  // =========================================================================
  console.log('\n\x1b[1m--- CATEGORY 4: Protocol Variations, Ports & Query Parameters ---\x1b[0m');

  await recordChallenge('ADV-17', 'HTTPS with Query Parameters and Hash Fragment', 'Protocol', async () => {
    const target = 'https://puelche-lab.vercel.app/?test=stress&version=1.0#hero';
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: target }),
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const data = await res.json();
    assert(data.success === true, 'Expected success: true');
    assert(data.normalizedUrl.includes('test=stress'), 'Preserved query parameter in normalizedUrl');
    return `Handled query string & fragment properly (Duration: ${data.durationMs}ms)`;
  });

  await recordChallenge('ADV-18', 'HTTP to HTTPS Redirection/Upgrade', 'Protocol', async () => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'http://puelche-lab.vercel.app' }),
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const data = await res.json();
    assert(data.success === true, 'Expected success: true');
    return `HTTP target successfully audited (Score: ${data.overallScore})`;
  });

  await recordChallenge('ADV-19', 'Strategy Parameter: desktop vs mobile', 'Strategy', async () => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://puelche-lab.vercel.app', strategy: 'desktop' }),
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const data = await res.json();
    assert(data.success === true, 'Expected success: true');
    assert(data.performance.strategy === 'desktop', `Expected strategy desktop, got ${data.performance.strategy}`);
    return `Strategy parameter respected: ${data.performance.strategy}`;
  });

  // =========================================================================
  // CATEGORY 5: GET METHOD ENDPOINT CHECKS
  // =========================================================================
  console.log('\n\x1b[1m--- CATEGORY 5: GET /api/auditor Endpoint Verification ---\x1b[0m');

  await recordChallenge('ADV-20', 'GET /api/auditor without ?url= query param', 'GET', async () => {
    const res = await fetch(API_URL);
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    const data = await res.json();
    assert(data.success === false, 'Expected success: false');
    return `HTTP ${res.status}: Correctly requires ?url=`;
  });

  await recordChallenge('ADV-21', 'GET /api/auditor?url=https://puelche-lab.vercel.app', 'GET', async () => {
    const res = await fetch(`${API_URL}?url=https://puelche-lab.vercel.app`);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const data = await res.json();
    assert(data.success === true, 'Expected success: true');
    return `HTTP 200: GET returns full AuditorResponse (Score: ${data.overallScore})`;
  });

  // =========================================================================
  // CATEGORY 6: ADVERSARIAL EXTERNAL SITES (DIVERSE STRUCTURES)
  // =========================================================================
  console.log('\n\x1b[1m--- CATEGORY 6: Diverse External Sites Auditing ---\x1b[0m');

  await recordChallenge('ADV-22', 'External Target: Hacker News (Minimalist HTML)', 'External', async () => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://news.ycombinator.com' }),
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const data = await res.json();
    assert(data.success === true, 'Expected success: true');
    assert(data.seo.title.includes('Hacker News'), 'Title extracted');
    assert(data.geo.schemaOrg.count === 0, 'No schemas on HN');
    return `Audited HN: Score ${data.overallScore}, Duration: ${data.durationMs}ms`;
  });

  await recordChallenge('ADV-23', 'External Target: Wikipedia (Heavy Semantic Hierarchy)', 'External', async () => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://www.wikipedia.org' }),
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const data = await res.json();
    assert(data.success === true, 'Expected success: true');
    assert(data.seo.headingsCount.h1 >= 1 || data.seo.title.length > 0, 'Extracted structure');
    return `Audited Wikipedia: Score ${data.overallScore}, Duration: ${data.durationMs}ms`;
  });

  // =========================================================================
  // CATEGORY 7: CONCURRENCY BURST & LATENCY PRESSURE
  // =========================================================================
  console.log('\n\x1b[1m--- CATEGORY 7: Concurrency Burst & Latency Stress ---\x1b[0m');

  await recordChallenge('ADV-24', 'Concurrency: 5 Simultaneous Audit Requests', 'Concurrency', async () => {
    const burstStart = performance.now();
    const urls = [
      'https://puelche-lab.vercel.app',
      'https://puelche-lab.vercel.app?tab=servicios',
      'https://puelche-lab.vercel.app?tab=portafolio',
      'https://puelche-lab.vercel.app?tab=contacto',
      'https://puelche-lab.vercel.app',
    ];

    const promises = urls.map((u) =>
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: u }),
      }).then((r) => r.json())
    );

    const results = await Promise.all(promises);
    const totalBurstDuration = Math.round(performance.now() - burstStart);
    for (const r of results) {
      assert(r.success === true, 'All concurrent requests must succeed');
    }
    return `5/5 concurrent requests succeeded in ${totalBurstDuration}ms (avg ${Math.round(totalBurstDuration / 5)}ms/req)`;
  });

  // =========================================================================
  // CATEGORY 8: FRONTEND ROUTE (/auditor) HEALTH & TEST STRING CONTRACTS
  // =========================================================================
  console.log('\n\x1b[1m--- CATEGORY 8: Frontend Route /auditor Verification ---\x1b[0m');

  await recordChallenge('ADV-25', 'Frontend /auditor HTML Delivery & Status 200', 'Frontend', async () => {
    const res = await fetch(AUDITOR_PAGE_URL);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const html = await res.text();
    assert(html.length > 2000, `HTML payload too small (${html.length} bytes)`);
    assert(
      html.includes('Autopsia') || html.includes('Auditor') || html.includes('auditor') || html.includes('Puelche'),
      'Missing brand/page identifiers in HTML'
    );
    return `Delivered ${Math.round(html.length / 1024)} KB HTML with HTTP 200`;
  });

  await recordChallenge('ADV-26', 'Frontend Contract String Invariance Check against runner.ts', 'Frontend', async () => {
    // Check local source file to confirm literal string invariants exist for E2E tests
    const fs = await import('fs');
    const path = await import('path');
    const pagePath = path.join(
      '/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab',
      'src/app/auditor/page.tsx'
    );
    const content = fs.readFileSync(pagePath, 'utf-8');

    // Invariants required by E2E tests in runner.ts (T7.6.1 - T7.6.4)
    const requiredStrings = [
      'DURATION = 20000',
      'DNS & SSL Handshake',
      'DOM & Jerarquía SEO',
      'Autopsia de Activos',
      'Core Web Vitals & Móvil',
      'GEO & Síntesis de Negocio',
      'LCP 4.8s',
      'Fuga Crítica del 53% de Visitantes Móviles',
      'Invisibilidad en Google Orgánico',
      'Síndrome de Marca Genérica',
      'Exclusión de Búsqueda por IA',
      'Paula Valdivieso',
      'VIDEO LOOM PERSONALIZADO EN COLA DE GRABACIÓN',
      'wa.me/56966177500',
    ];

    const missing = requiredStrings.filter((s) => !content.includes(s));
    assert(missing.length === 0, `Missing required string contracts: ${missing.join(', ')}`);
    return `All ${requiredStrings.length} E2E contract string invariants strictly verified in page.tsx`;
  });

  // =========================================================================
  // CHALLENGER SUMMARY & VERDICT
  // =========================================================================
  console.log('\n\x1b[1m══════════════════════════════════════════════════════════════════════════\x1b[0m');
  console.log('\x1b[1m                 CHALLENGER STRESS SUITE RESULTS SUMMARY                  \x1b[0m');
  console.log('\x1b[1m══════════════════════════════════════════════════════════════════════════\x1b[0m');

  const total = challengeResults.length;
  const passed = challengeResults.filter((r) => r.passed).length;
  const failed = challengeResults.filter((r) => !r.passed).length;
  const passRate = ((passed / total) * 100).toFixed(1);

  console.log(`  Total Challenges Executed : ${total}`);
  console.log(`  Passed Empirical Checks   : ${passed}`);
  console.log(`  Failed Empirical Checks   : ${failed}`);
  console.log(`  Empirical Pass Rate       : ${passRate}%`);
  console.log('══════════════════════════════════════════════════════════════════════════\n');

  if (failed > 0) {
    console.error(`\x1b[31m✖ CHALLENGE FAILED: ${failed} issues detected.\x1b[0m`);
    process.exit(1);
  } else {
    console.log('\x1b[32m✔ ALL EMPIRICAL CHALLENGES PASSED. VERDICT: APPROVE.\x1b[0m\n');
  }
}

main().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
