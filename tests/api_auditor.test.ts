/**
 * Unit & Contract Verification Suite for /api/auditor Engine
 * Location: tests/api_auditor.test.ts
 *
 * Execution:
 *   npx tsx tests/api_auditor.test.ts
 */

import { POST, GET } from '../src/app/api/auditor/route';
import type { AuditorResponse } from '../src/types/auditor';

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

interface TestResult {
  id: string;
  name: string;
  passed: boolean;
  durationMs: number;
  error?: string;
}

const results: TestResult[] = [];

function assert(condition: unknown, msg: string): asserts condition {
  if (!condition) throw new Error(msg);
}

function assertEqual<T>(actual: T, expected: T, msg: string) {
  if (actual !== expected) {
    throw new Error(`${msg} — Expected: ${expected}, Actual: ${actual}`);
  }
}

async function runTest(id: string, name: string, fn: () => Promise<void> | void) {
  const start = performance.now();
  try {
    await fn();
    const durationMs = Math.round((performance.now() - start) * 100) / 100;
    results.push({ id, name, passed: true, durationMs });
    console.log(`  ${GREEN}✔ PASS${RESET} [${id}] ${name} (${durationMs}ms)`);
  } catch (err: unknown) {
    const durationMs = Math.round((performance.now() - start) * 100) / 100;
    const errorMsg = err instanceof Error ? err.message : String(err);
    results.push({ id, name, passed: false, durationMs, error: errorMsg });
    console.log(`  ${RED}✖ FAIL${RESET} [${id}] ${name} (${durationMs}ms)`);
    console.log(`    ${RED}${errorMsg}${RESET}`);
  }
}

async function runAllAuditorTests() {
  console.log(`\n${BOLD}${CYAN}╔══════════════════════════════════════════════════════════════════════╗${RESET}`);
  console.log(`${BOLD}${CYAN}║     PUELCHE LAB — /api/auditor BACKEND CONTRACT & ENGINE SUITE        ║${RESET}`);
  console.log(`${BOLD}${CYAN}╚══════════════════════════════════════════════════════════════════════╝${RESET}\n`);

  const LIVE_TEST_URL = 'https://puelche-lab.vercel.app';

  // --- 1. Request Validation ---
  await runTest('API-AUDIT-1.1', 'Rejects missing, empty, or invalid URLs with HTTP 400', async () => {
    // Missing body
    const req1 = new Request('http://localhost:3000/api/auditor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const res1 = await POST(req1);
    assertEqual(res1.status, 400, 'Empty body must return 400');
    const json1 = await res1.json();
    assertEqual(json1.success, false, 'success must be false');

    // Invalid syntax
    const req2 = new Request('http://localhost:3000/api/auditor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'http://' }),
    });
    const res2 = await POST(req2);
    assertEqual(res2.status, 400, 'Malformed URL must return 400');

    // Non-JSON request
    const req3 = new Request('http://localhost:3000/api/auditor', {
      method: 'POST',
      body: 'invalid-json',
    });
    const res3 = await POST(req3);
    assertEqual(res3.status, 400, 'Non-JSON body must return 400');
  });

  // --- 2. Live Audit & Contract Verification against PROJECT.md ---
  await runTest('API-AUDIT-1.2', 'Performs live audit and returns strictly compliant AuditorResponse contract', async () => {
    const req = new Request('http://localhost:3000/api/auditor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: LIVE_TEST_URL, strategy: 'mobile' }),
    });

    const res = await POST(req);
    assertEqual(res.status, 200, 'Valid audit request must return HTTP 200');

    const data: AuditorResponse = await res.json();

    // Verify root contract fields (PROJECT.md line 54-109)
    assert(data.success === true, 'Response must have success: true');
    assertEqual(data.url, LIVE_TEST_URL, 'url must match input');
    assert(data.normalizedUrl.startsWith('https://'), 'normalizedUrl must start with https://');
    assert(typeof data.timestamp === 'string' && data.timestamp.length > 10, 'timestamp must be ISO string');
    assert(data.overallScore >= 0 && data.overallScore <= 100, 'overallScore must be between 0 and 100');

    // Performance Engine contract
    assert(typeof data.performance.score === 'number', 'performance.score must be number');
    assert(
      data.performance.source === 'pagespeed_api' || data.performance.source === 'empirical_telemetry',
      'performance.source must be pagespeed_api or empirical_telemetry'
    );
    assert(typeof data.performance.metrics.lcp === 'string', 'metrics.lcp must be string');
    assert(typeof data.performance.metrics.fid_inp === 'string', 'metrics.fid_inp must be string');
    assert(typeof data.performance.metrics.cls === 'string', 'metrics.cls must be string');
    assert(typeof data.performance.metrics.fcp === 'string', 'metrics.fcp must be string');
    assert(typeof data.performance.metrics.ttfb === 'string', 'metrics.ttfb must be string');
    assert(Array.isArray(data.performance.diagnostics), 'performance.diagnostics must be an array');
    if (data.performance.diagnostics.length > 0) {
      assert(typeof data.performance.diagnostics[0].title === 'string', 'diagnostic must have title');
      assert(
        ['high', 'medium', 'low'].includes(data.performance.diagnostics[0].impact),
        'diagnostic impact must be high, medium, or low'
      );
      assert(typeof data.performance.diagnostics[0].detail === 'string', 'diagnostic must have detail');
    }

    // GEO Engine contract
    assert(typeof data.geo.score === 'number', 'geo.score must be number');
    assert(typeof data.geo.llmsTxt.present === 'boolean', 'geo.llmsTxt.present must be boolean');
    assert(typeof data.geo.llmsTxt.url === 'string', 'geo.llmsTxt.url must be string');
    assert(typeof data.geo.llmsTxt.charCount === 'number', 'geo.llmsTxt.charCount must be number');
    assert(typeof data.geo.llmsTxt.validSyntax === 'boolean', 'geo.llmsTxt.validSyntax must be boolean');

    assert(typeof data.geo.robotsTxt.present === 'boolean', 'geo.robotsTxt.present must be boolean');
    assert(typeof data.geo.robotsTxt.aiBotsAllowed.gptBot === 'boolean', 'robotsTxt must check gptBot');
    assert(typeof data.geo.robotsTxt.aiBotsAllowed.claudeBot === 'boolean', 'robotsTxt must check claudeBot');
    assert(typeof data.geo.robotsTxt.aiBotsAllowed.perplexityBot === 'boolean', 'robotsTxt must check perplexityBot');

    assert(typeof data.geo.schemaOrg.present === 'boolean', 'geo.schemaOrg.present must be boolean');
    assert(typeof data.geo.schemaOrg.count === 'number', 'geo.schemaOrg.count must be number');
    assert(Array.isArray(data.geo.schemaOrg.types), 'geo.schemaOrg.types must be string array');
    assert(Array.isArray(data.geo.schemaOrg.rawSchemas), 'geo.schemaOrg.rawSchemas must be array');

    assert(typeof data.geo.ragDensity.score === 'number', 'geo.ragDensity.score must be number');
    assert(typeof data.geo.ragDensity.ratio === 'string', 'geo.ragDensity.ratio must be string');
    assert(typeof data.geo.ragDensity.headingDepth === 'number', 'geo.ragDensity.headingDepth must be number');
    assert(typeof data.geo.ragDensity.textToHtmlRatio === 'number', 'geo.ragDensity.textToHtmlRatio must be number');

    // Technical SEO Engine contract
    assert(typeof data.seo.score === 'number', 'seo.score must be number');
    assert(typeof data.seo.title === 'string', 'seo.title must be string');
    assert(typeof data.seo.description === 'string', 'seo.description must be string');
    assert(typeof data.seo.canonical === 'string', 'seo.canonical must be string');
    assert(typeof data.seo.headingsCount.h1 === 'number', 'seo.headingsCount.h1 must be number');
    assert(typeof data.seo.headingsCount.h2 === 'number', 'seo.headingsCount.h2 must be number');
    assert(typeof data.seo.headingsCount.h3 === 'number', 'seo.headingsCount.h3 must be number');
    assert(typeof data.seo.lang === 'string', 'seo.lang must be string');
    assert(typeof data.seo.viewportPresent === 'boolean', 'seo.viewportPresent must be boolean');

    // YouTube Engine contract
    assert(typeof data.youtube.detected === 'boolean', 'youtube.detected must be boolean');
    assert(Array.isArray(data.youtube.videoUrls), 'youtube.videoUrls must be array');
    assert(typeof data.youtube.hasVideoObjectSchema === 'boolean', 'youtube.hasVideoObjectSchema must be boolean');
    assert(Array.isArray(data.youtube.schemas), 'youtube.schemas must be array');

    // Open Graph Engine contract
    assert(typeof data.openGraph.score === 'number', 'openGraph.score must be number');
    assert(data.openGraph.url !== undefined, 'openGraph.url must be defined');

    // Commercial Findings contract
    assert(Array.isArray(data.commercialFindings), 'commercialFindings must be array');
    assert(data.commercialFindings.length >= 4, 'must generate at least 4 commercial findings');
    for (const finding of data.commercialFindings) {
      assert(typeof finding.category === 'string', 'finding must have category');
      assert(typeof finding.title === 'string', 'finding must have title');
      assert(typeof finding.businessImpact === 'string', 'finding must have businessImpact');
      assert(typeof finding.recommendation === 'string', 'finding must have recommendation');
    }
  });

  // --- 3. URL Normalization ---
  await runTest('API-AUDIT-1.3', 'Normalizes naked domain to https://', async () => {
    const req = new Request('http://localhost:3000/api/auditor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'puelche-lab.vercel.app' }),
    });

    const res = await POST(req);
    assertEqual(res.status, 200, 'Naked domain should succeed');
    const data: AuditorResponse = await res.json();
    assert(data.normalizedUrl.startsWith('https://puelche-lab.vercel.app'), 'Must normalize to https://');
  });

  // --- 4. GET Endpoint Support ---
  await runTest('API-AUDIT-1.4', 'GET /api/auditor?url=... returns valid audit', async () => {
    const req = new Request(`http://localhost:3000/api/auditor?url=${encodeURIComponent(LIVE_TEST_URL)}&strategy=desktop`);
    const res = await GET(req);
    assertEqual(res.status, 200, 'GET with url param should return 200');
    const data: AuditorResponse = await res.json();
    assert(data.success === true, 'GET response must have success: true');
    assert(data.performance.strategy === 'desktop', 'strategy must reflect desktop');
  });

  // --- 5. GET Missing URL Parameter ---
  await runTest('API-AUDIT-1.5', 'GET /api/auditor without ?url= returns HTTP 400', async () => {
    const req = new Request('http://localhost:3000/api/auditor');
    const res = await GET(req);
    assertEqual(res.status, 400, 'GET without ?url= must return 400');
    const json = await res.json();
    assertEqual(json.success, false, 'success must be false');
  });

  // --- 6. Telemetry Logs Integrity ---
  await runTest('API-AUDIT-1.6', 'Generates P1 through P5 progressive telemetry logs', async () => {
    const req = new Request('http://localhost:3000/api/auditor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: LIVE_TEST_URL }),
    });
    const res = await POST(req);
    const data: AuditorResponse = await res.json();
    assert(Array.isArray(data.telemetryLogs), 'telemetryLogs must be an array');
    assert(data.telemetryLogs.length >= 5, 'telemetryLogs must contain at least 5 phases');
    const phases = data.telemetryLogs.map((l) => l.phase);
    assert(phases.includes('P1'), 'P1 phase must be present');
    assert(phases.includes('P2'), 'P2 phase must be present');
    assert(phases.includes('P3'), 'P3 phase must be present');
    assert(phases.includes('P4'), 'P4 phase must be present');
    assert(phases.includes('P5'), 'P5 phase must be present');
  });

  // --- 7. Strategy Variation Test (Desktop vs Mobile) ---
  await runTest('API-AUDIT-1.7', 'Accepts desktop strategy and reflects strategy in performance result', async () => {
    const req = new Request('http://localhost:3000/api/auditor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: LIVE_TEST_URL, strategy: 'desktop' }),
    });
    const res = await POST(req);
    assertEqual(res.status, 200, 'Desktop strategy should succeed');
    const data: AuditorResponse = await res.json();
    assertEqual(data.performance.strategy, 'desktop', 'Strategy must match desktop');
  });

  // --- 8. Unreachable Host Handling ---
  await runTest('API-AUDIT-1.8', 'Handles completely unreachable host with HTTP 500/504 error response', async () => {
    const req = new Request('http://localhost:3000/api/auditor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://this-domain-does-not-exist-at-all-9999.cl' }),
    });
    const res = await POST(req);
    assert(res.status >= 500, 'Unreachable host must return 5xx');
    const json = await res.json();
    assertEqual(json.success, false, 'success must be false for unreachable host');
    assert(typeof json.error === 'string', 'error message must be provided');
  });

  // --- Summary ---
  console.log(`\n══════════════════════════════════════════════════════════════════════`);
  console.log(`                       AUDITOR SUITE SUMMARY                          `);
  console.log(`══════════════════════════════════════════════════════════════════════`);
  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = total - passed;
  console.log(`  Total Tests Executed : ${total}`);
  console.log(`  Passed               : ${passed}`);
  console.log(`  Failed               : ${failed}`);
  console.log(`  Success Rate         : ${((passed / total) * 100).toFixed(1)}%`);
  console.log(`══════════════════════════════════════════════════════════════════════\n`);

  if (failed > 0) {
    console.error(`${RED}❌ ONE OR MORE TESTS FAILED IN /api/auditor SUITE.${RESET}\n`);
    process.exit(1);
  } else {
    console.log(`${GREEN}✔ ALL /api/auditor CONTRACT TESTS PASSED WITH 100% SUCCESS.${RESET}\n`);
  }
}

runAllAuditorTests().catch((err) => {
  console.error('Fatal test execution error:', err);
  process.exit(1);
});
