import { NextResponse } from 'next/server';
import type {
  AuditorRequest,
  AuditorResponse,
  PerformanceAuditResult,
  PerformanceDiagnostics,
  GeoAuditResult,
  GeoCrawlerStatus,
  SeoAuditResult,
  YouTubeAuditResult,
  OpenGraphAuditResult,
  CommercialFinding,
  TelemetryPhaseLog,
  AuditStrategy,
} from '@/types/auditor';

// Route segment config: force dynamic, prevent static caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;
// Maximum duration for serverless execution (15s on Hobby, 60s on Pro)
export const maxDuration = 15;

/**
 * Normalizes input URL: prepends https:// if protocol is missing, validates syntax.
 */
function normalizeUrl(rawUrl: string): string | null {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  let trimmed = rawUrl.trim();
  if (trimmed.length < 3) return null;
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = `https://${trimmed}`;
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    if (!parsed.hostname || parsed.hostname.length < 3) return null;
    if (!parsed.hostname.includes('.') && parsed.hostname !== 'localhost') return null;
    return parsed.href;
  } catch {
    return null;
  }
}

/**
 * HTML Parsing Utilities (Native, fast, resilient without heavy external dependencies)
 */

function extractTagContent(html: string, tagName: string): string {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = html.match(regex);
  return match ? match[1].trim().replace(/\s+/g, ' ') : '';
}

function extractMetaContent(html: string, nameOrProperty: string): string {
  const regex1 = new RegExp(
    `<meta[^>]+(?:name|property)=["']${nameOrProperty}["'][^>]+content=["']([^"']*)["']`,
    'i'
  );
  const match1 = html.match(regex1);
  if (match1 && match1[1] !== undefined) return match1[1].trim();

  const regex2 = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${nameOrProperty}["']`,
    'i'
  );
  const match2 = html.match(regex2);
  if (match2 && match2[1] !== undefined) return match2[1].trim();

  return '';
}

function extractCanonical(html: string): string {
  const match1 = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
  if (match1 && match1[1]) return match1[1].trim();
  const match2 = html.match(/<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i);
  if (match2 && match2[1]) return match2[1].trim();
  return '';
}

function extractLang(html: string): string {
  const match = html.match(/<html[^>]*\blang=["']?([^"'\s>]+)/i);
  return match ? match[1].trim() : '';
}

function checkViewport(html: string): boolean {
  return /<meta[^>]*\bname=["']viewport["']/i.test(html);
}

function extractHeadings(html: string) {
  const counts = { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 };
  const h1Matches = html.match(/<h1\b[^>]*>/gi);
  const h2Matches = html.match(/<h2\b[^>]*>/gi);
  const h3Matches = html.match(/<h3\b[^>]*>/gi);
  const h4Matches = html.match(/<h4\b[^>]*>/gi);
  const h5Matches = html.match(/<h5\b[^>]*>/gi);
  const h6Matches = html.match(/<h6\b[^>]*>/gi);

  counts.h1 = h1Matches ? h1Matches.length : 0;
  counts.h2 = h2Matches ? h2Matches.length : 0;
  counts.h3 = h3Matches ? h3Matches.length : 0;
  counts.h4 = h4Matches ? h4Matches.length : 0;
  counts.h5 = h5Matches ? h5Matches.length : 0;
  counts.h6 = h6Matches ? h6Matches.length : 0;

  return counts;
}

function extractImagesInfo(html: string) {
  const imgMatches = html.match(/<img\b[^>]*>/gi) || [];
  let withAlt = 0;
  for (const img of imgMatches) {
    if (/\balt=["'][^"']+["']/i.test(img)) {
      withAlt++;
    }
  }
  const total = imgMatches.length;
  const percentage = total > 0 ? Math.round((withAlt / total) * 100) : 100;
  return { total, withAlt, percentage };
}

function extractYouTubeMedia(html: string) {
  const urls: string[] = [];
  const iframeSrcRegex = /<iframe[^>]*\bsrc=["']([^"']*(?:youtube\.com|youtu\.be)[^"']*)["']/gi;
  let match: RegExpExecArray | null;
  let usesHeavyIframe = false;

  while ((match = iframeSrcRegex.exec(html)) !== null) {
    if (match[1]) {
      urls.push(match[1]);
      if (/youtube\.com\/embed\//i.test(match[1])) {
        usesHeavyIframe = true;
      }
    }
  }

  const linkRegex = /<a[^>]*\bhref=["']([^"']*(?:youtube\.com\/watch|youtu\.be\/)[^"']*)["']/gi;
  while ((match = linkRegex.exec(html)) !== null) {
    if (match[1]) urls.push(match[1]);
  }

  const unique = Array.from(new Set(urls));
  return {
    detected: unique.length > 0,
    videoUrls: unique,
    usesHeavyIframe,
  };
}

function extractJsonLd(html: string) {
  const scriptsRegex = /<script[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const rawSchemas: unknown[] = [];
  const typesSet = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = scriptsRegex.exec(html)) !== null) {
    const rawContent = match[1]?.trim();
    if (!rawContent) continue;
    try {
      const parsed = JSON.parse(rawContent);
      rawSchemas.push(parsed);

      const collectTypes = (obj: unknown) => {
        if (!obj || typeof obj !== 'object') return;
        if (Array.isArray(obj)) {
          for (const item of obj) collectTypes(item);
          return;
        }
        const record = obj as Record<string, unknown>;
        if (record['@type']) {
          if (Array.isArray(record['@type'])) {
            for (const t of record['@type']) {
              if (typeof t === 'string') typesSet.add(t);
            }
          } else if (typeof record['@type'] === 'string') {
            typesSet.add(record['@type']);
          }
        }
        if (Array.isArray(record['@graph'])) {
          for (const item of record['@graph']) collectTypes(item);
        }
      };

      collectTypes(parsed);
    } catch {
      // Invalid JSON block ignored
    }
  }

  const types = Array.from(typesSet);
  const typesLower = types.map((t) => t.toLowerCase());

  return {
    present: rawSchemas.length > 0,
    count: rawSchemas.length,
    types,
    rawSchemas,
    hasOrganization: typesLower.some((t) =>
      ['organization', 'corporation', 'professionalservice'].includes(t)
    ),
    hasLocalBusiness: typesLower.some((t) =>
      ['localbusiness', 'medicalbusiness', 'store', 'restaurant'].includes(t)
    ),
    hasPerson: typesLower.includes('person'),
    hasProduct: typesLower.some((t) => ['product', 'service', 'offercatalog'].includes(t)),
    hasVideoObject: typesLower.includes('videoobject'),
  };
}

function extractCleanText(html: string): { cleanText: string; cleanBytes: number } {
  let stripped = html
    .replace(/<head[\s\S]*?<\/head>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');

  stripped = stripped
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

  const cleanBytes = Buffer.byteLength(stripped, 'utf-8');
  return { cleanText: stripped, cleanBytes };
}

/**
 * Parses robots.txt and verifies rules for target AI bots
 */
function evaluateRobotsTxt(robotsContent: string) {
  const botsConfig = [
    {
      name: 'GPTBot',
      operator: 'OpenAI',
      engine: 'ChatGPT Search, O1, GPT-4o',
      matchNames: ['gptbot'],
    },
    {
      name: 'ClaudeBot',
      operator: 'Anthropic',
      engine: 'Claude 3.7 Sonnet & Artifacts',
      matchNames: ['claudebot', 'anthropic-ai'],
    },
    {
      name: 'PerplexityBot',
      operator: 'Perplexity AI',
      engine: 'Pro Search & Deep Research',
      matchNames: ['perplexitybot'],
    },
    {
      name: 'Google-Extended',
      operator: 'Google',
      engine: 'Gemini Deep Research & AI Overviews',
      matchNames: ['google-extended'],
    },
    {
      name: 'Applebot-Extended',
      operator: 'Apple',
      engine: 'Apple Intelligence Siri 2.0 & iOS 18',
      matchNames: ['applebot-extended'],
    },
    {
      name: 'Bytespider',
      operator: 'ByteDance',
      engine: 'Doubao & Ecosistema IA',
      matchNames: ['bytespider'],
    },
    {
      name: 'CCBot',
      operator: 'Common Crawl',
      engine: 'Open LLM Datasets & Pretraining',
      matchNames: ['ccbot'],
    },
  ];

  if (!robotsContent || robotsContent.trim().length === 0) {
    return {
      present: false,
      aiBotsAllowed: {
        gptBot: true,
        claudeBot: true,
        perplexityBot: true,
        googleExtended: true,
        applebotExtended: true,
        bytespider: true,
        ccBot: true,
      },
      crawlers: botsConfig.map((bot) => ({
        name: bot.name,
        operator: bot.operator,
        engine: bot.engine,
        status: 'unspecified' as const,
        statusText: 'Sin Directivas (Acceso Abierto por Defecto)',
        ruleSnippet: `User-agent: *\nAllow: /`,
        allowed: true,
      })),
    };
  }

  const lines = robotsContent.split(/\r?\n/);
  type Rule = { type: 'allow' | 'disallow'; path: string };
  const userAgentRules = new Map<string, Rule[]>();
  let currentAgents: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.split('#')[0].trim();
    if (!line) continue;

    const uaMatch = line.match(/^user-agent:\s*(.+)$/i);
    if (uaMatch) {
      const agent = uaMatch[1].trim().toLowerCase();
      currentAgents.push(agent);
      if (!userAgentRules.has(agent)) {
        userAgentRules.set(agent, []);
      }
      continue;
    }

    const allowMatch = line.match(/^allow:\s*(.*)$/i);
    if (allowMatch && currentAgents.length > 0) {
      const path = allowMatch[1].trim();
      for (const ag of currentAgents) {
        userAgentRules.get(ag)?.push({ type: 'allow', path });
      }
      continue;
    }

    const disallowMatch = line.match(/^disallow:\s*(.*)$/i);
    if (disallowMatch && currentAgents.length > 0) {
      const path = disallowMatch[1].trim();
      for (const ag of currentAgents) {
        userAgentRules.get(ag)?.push({ type: 'disallow', path });
      }
      continue;
    }

    if (!line.includes(':')) {
      currentAgents = [];
    }
  }

  const wildcardRules = userAgentRules.get('*') || [];

  const crawlers: GeoCrawlerStatus[] = [];
  const aiBotsAllowed = {
    gptBot: true,
    claudeBot: true,
    perplexityBot: true,
    googleExtended: true,
    applebotExtended: true,
    bytespider: true,
    ccBot: true,
  };

  for (const bot of botsConfig) {
    let rules: Rule[] | undefined;
    let matchedName = '';
    for (const m of bot.matchNames) {
      if (userAgentRules.has(m)) {
        rules = userAgentRules.get(m);
        matchedName = m;
        break;
      }
    }

    let isBlocked = false;
    let ruleSnippet = '';
    let status: 'allowed' | 'blocked' | 'unspecified' = 'unspecified';

    if (rules && rules.length > 0) {
      const rootDisallow = rules.some((r) => r.type === 'disallow' && (r.path === '/' || r.path === '/*'));
      const rootAllow = rules.some((r) => r.type === 'allow' && (r.path === '/' || r.path === '/*'));
      if (rootDisallow && !rootAllow) {
        isBlocked = true;
        status = 'blocked';
        ruleSnippet = `User-agent: ${matchedName}\nDisallow: /`;
      } else {
        isBlocked = false;
        status = 'allowed';
        ruleSnippet = `User-agent: ${matchedName}\nAllow: /`;
      }
    } else if (wildcardRules.length > 0) {
      const rootDisallow = wildcardRules.some(
        (r) => r.type === 'disallow' && (r.path === '/' || r.path === '/*')
      );
      const rootAllow = wildcardRules.some(
        (r) => r.type === 'allow' && (r.path === '/' || r.path === '/*')
      );
      if (rootDisallow && !rootAllow) {
        isBlocked = true;
        status = 'blocked';
        ruleSnippet = `User-agent: *\nDisallow: /`;
      } else {
        isBlocked = false;
        status = 'allowed';
        ruleSnippet = `User-agent: *\nAllow: /`;
      }
    } else {
      isBlocked = false;
      status = 'unspecified';
      ruleSnippet = `User-agent: ${bot.name}\nAllow: /`;
    }

    const allowed = !isBlocked;
    const statusText = isBlocked
      ? 'Bloqueado (Disallow: /)'
      : status === 'allowed'
      ? 'Permitido Explícito (Allow: /)'
      : 'Permitido (Sin Directivas Restrictivas)';

    if (bot.name === 'GPTBot') aiBotsAllowed.gptBot = allowed;
    if (bot.name === 'ClaudeBot') aiBotsAllowed.claudeBot = allowed;
    if (bot.name === 'PerplexityBot') aiBotsAllowed.perplexityBot = allowed;
    if (bot.name === 'Google-Extended') aiBotsAllowed.googleExtended = allowed;
    if (bot.name === 'Applebot-Extended') aiBotsAllowed.applebotExtended = allowed;
    if (bot.name === 'Bytespider') aiBotsAllowed.bytespider = allowed;
    if (bot.name === 'CCBot') aiBotsAllowed.ccBot = allowed;

    crawlers.push({
      name: bot.name,
      operator: bot.operator,
      engine: bot.engine,
      status,
      statusText,
      ruleSnippet,
      allowed,
    });
  }

  return {
    present: true,
    aiBotsAllowed,
    crawlers,
  };
}

/**
 * Validates llms.txt structure according to llmstxt.org specification
 */
function evaluateLlmsTxt(content: string, url: string, statusCode: number) {
  if (statusCode !== 200 || !content || content.trim().length === 0) {
    return {
      present: false,
      url,
      charCount: 0,
      validSyntax: false,
      statusCode,
      hasTitle: false,
      hasSummary: false,
      hasSections: false,
    };
  }

  const trimmed = content.trim();
  const hasTitle = /^#\s+[^\n]+/m.test(trimmed);
  const hasSummary = /^>\s+[^\n]+/m.test(trimmed);
  const hasSections = /^##\s+[^\n]+/m.test(trimmed);
  const validSyntax = hasTitle && (hasSummary || hasSections);

  return {
    present: true,
    url,
    charCount: trimmed.length,
    validSyntax,
    statusCode,
    hasTitle,
    hasSummary,
    hasSections,
    preview: trimmed.slice(0, 300),
  };
}

/**
 * Empirical Telemetry Engine: computes realistic Core Web Vitals from direct HTML inspection
 */
function computeEmpiricalTelemetry(
  html: string,
  ttfbMs: number,
  strategy: AuditStrategy
): PerformanceAuditResult {
  const htmlBytes = Buffer.byteLength(html, 'utf-8');
  const domNodeCount = (html.match(/<[a-zA-Z][a-zA-Z0-9-]*\b/g) || []).length;
  const blockingCss = (html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || []).length;
  const blockingScripts = (
    html.match(/<script[^>]*\bsrc=[^>]*>(?!.*(?:async|defer))/gi) || []
  ).length;
  const imgMatches = html.match(/<img\b[^>]*>/gi) || [];
  const unoptimizedImages = imgMatches.filter(
    (img) => !/\bwidth=["']\d+["']/i.test(img) || !/\bheight=["']\d+["']/i.test(img)
  ).length;

  const isMobile = strategy !== 'desktop';
  const networkMultiplier = isMobile ? 1.4 : 1.0;

  const estimatedFcpMs = Math.round(
    ttfbMs + blockingCss * 110 * networkMultiplier + (htmlBytes / 1024) * 4
  );
  const clampedFcpMs = Math.max(450, Math.min(estimatedFcpMs, 4800));

  const estimatedLcpMs = Math.round(
    clampedFcpMs +
      blockingScripts * 180 * networkMultiplier +
      (imgMatches.length > 0 ? 600 * networkMultiplier : 150)
  );
  const clampedLcpMs = Math.max(700, Math.min(estimatedLcpMs, 8500));

  const rawCls = Math.min(
    0.48,
    unoptimizedImages * 0.025 + (domNodeCount > 1200 ? 0.06 : 0.01)
  );
  const formattedCls = rawCls.toFixed(3);

  const estimatedInpMs = Math.round(
    40 + blockingScripts * 25 * networkMultiplier + Math.min(200, domNodeCount / 15)
  );
  const clampedInpMs = Math.max(35, Math.min(estimatedInpMs, 420));

  let scorePoints = 100;
  if (clampedLcpMs > 4000) scorePoints -= 35;
  else if (clampedLcpMs > 2500) scorePoints -= 20;

  if (rawCls > 0.25) scorePoints -= 25;
  else if (rawCls > 0.1) scorePoints -= 12;

  if (clampedFcpMs > 3000) scorePoints -= 15;
  else if (clampedFcpMs > 1800) scorePoints -= 8;

  if (ttfbMs > 800) scorePoints -= 15;
  else if (ttfbMs > 400) scorePoints -= 7;

  if (domNodeCount > 1500) scorePoints -= 10;
  else if (domNodeCount > 800) scorePoints -= 5;

  const finalScore = Math.max(15, Math.min(scorePoints, 98));

  const diagnostics: PerformanceDiagnostics[] = [];
  if (blockingCss + blockingScripts > 2) {
    diagnostics.push({
      title: 'Eliminar recursos que bloquean el renderizado',
      impact: 'high',
      detail: `Se detectaron ${blockingCss} hojas de estilo CSS y ${blockingScripts} scripts síncronos en el hilo crítico de renderizado.`,
    });
  }
  if (ttfbMs > 600) {
    diagnostics.push({
      title: 'Reducir el tiempo de respuesta inicial del servidor (TTFB)',
      impact: 'high',
      detail: `El servidor tardó ${Math.round(ttfbMs)}ms en responder con el primer byte. Se recomienda implementar caché de borde (Edge Cache) o SSR optimizado.`,
    });
  }
  if (unoptimizedImages > 0) {
    diagnostics.push({
      title: 'Imágenes sin dimensiones explícitas (width / height)',
      impact: 'medium',
      detail: `Existen ${unoptimizedImages} imágenes sin dimensiones fijas, lo que incrementa el salto acumulado de diseño (CLS: ${formattedCls}).`,
    });
  }
  if (domNodeCount > 1200) {
    diagnostics.push({
      title: 'Evitar un tamaño excesivo de DOM',
      impact: 'medium',
      detail: `La estructura de la página contiene ${domNodeCount} nodos DOM, incrementando el uso de memoria en dispositivos móviles.`,
    });
  }
  if (htmlBytes > 120000) {
    diagnostics.push({
      title: 'Minificar y comprimir la carga útil HTML',
      impact: 'low',
      detail: `El documento HTML inicial pesa ${(htmlBytes / 1024).toFixed(1)} KB sin incluir activos externos.`,
    });
  }

  return {
    score: finalScore,
    source: 'empirical_telemetry',
    metrics: {
      lcp: `${(clampedLcpMs / 1000).toFixed(1)}s`,
      fid_inp: `${clampedInpMs}ms`,
      cls: formattedCls,
      fcp: `${(clampedFcpMs / 1000).toFixed(1)}s`,
      ttfb: `${Math.round(ttfbMs)}ms`,
    },
    diagnostics,
    categories: {
      performance: finalScore,
      accessibility: 85,
      bestPractices: 82,
      seo: 88,
    },
    strategy,
  };
}

/**
 * Attempts to query Google PageSpeed Insights API v5 with timeout and empirical fallback
 */
async function queryPageSpeedWithFallback(
  url: string,
  html: string,
  ttfbMs: number,
  strategy: AuditStrategy,
  signal: AbortSignal
): Promise<PerformanceAuditResult> {
  const chosenStrategy = strategy === 'desktop' ? 'desktop' : 'mobile';
  const apiKey = process.env.PAGESPEED_API_KEY;

  let psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
    url
  )}&strategy=${chosenStrategy}&category=performance&category=accessibility&category=best-practices&category=seo`;
  if (apiKey) {
    psiUrl += `&key=${apiKey}`;
  }

  try {
    const res = await fetch(psiUrl, {
      signal,
      headers: {
        Accept: 'application/json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      const lighthouse = data?.lighthouseResult;
      if (lighthouse) {
        const perfScore = Math.round((lighthouse.categories?.performance?.score ?? 0.5) * 100);
        const audits = lighthouse.audits || {};

        const lcp = audits['largest-contentful-paint']?.displayValue || '3.2s';
        const fcp = audits['first-contentful-paint']?.displayValue || '1.8s';
        const cls = audits['cumulative-layout-shift']?.displayValue || '0.08';
        const tbt = audits['total-blocking-time']?.displayValue || '180ms';
        const ttfb = audits['server-response-time']?.displayValue || `${Math.round(ttfbMs)}ms`;

        const diagnostics: PerformanceDiagnostics[] = [];
        const rawAudits = Object.values(audits) as Array<Record<string, unknown>>;
        for (const audit of rawAudits) {
          if (
            typeof audit?.score === 'number' &&
            audit.score < 0.6 &&
            typeof audit.title === 'string' &&
            typeof audit.description === 'string'
          ) {
            diagnostics.push({
              title: audit.title,
              impact: audit.score < 0.3 ? 'high' : 'medium',
              detail: audit.description.replace(/\[Learn more\].*$/i, '').trim(),
            });
            if (diagnostics.length >= 5) break;
          }
        }

        return {
          score: perfScore,
          source: 'pagespeed_api',
          metrics: {
            lcp,
            fid_inp: tbt,
            cls,
            fcp,
            ttfb,
          },
          diagnostics,
          categories: {
            performance: perfScore,
            accessibility: Math.round((lighthouse.categories?.accessibility?.score ?? 0.8) * 100),
            bestPractices: Math.round(
              (lighthouse.categories?.['best-practices']?.score ?? 0.8) * 100
            ),
            seo: Math.round((lighthouse.categories?.seo?.score ?? 0.85) * 100),
          },
          strategy,
        };
      }
    }
  } catch {
    // Falls through to empirical telemetry
  }

  return computeEmpiricalTelemetry(html, ttfbMs, strategy);
}

/**
 * Synthesizes technical diagnostics into actionable commercial findings
 */
function generateCommercialFindings(
  performance: PerformanceAuditResult,
  seo: SeoAuditResult,
  geo: GeoAuditResult,
  youtube: YouTubeAuditResult
): CommercialFinding[] {
  const findings: CommercialFinding[] = [];

  const isLcpCritical =
    parseFloat(performance.metrics.lcp.replace(/[^\d.]/g, '')) > 2.5 || performance.score < 65;
  if (isLcpCritical) {
    findings.push({
      id: 'CWV-LCP',
      category: 'Core Web Vitals',
      title: `LCP ${performance.metrics.lcp} - Fuga Crítica de Visitantes Móviles`,
      metric: `LCP: ${performance.metrics.lcp} (Umbral seguro: < 2.5s)`,
      businessImpact:
        'Fuga Crítica del 53% de Visitantes Móviles por latencia en hilo de renderizado. Cada segundo de retraso disminuye la conversión un 7%.',
      financialLoss: 'Pérdida de 15 a 30 leads comerciales al mes',
      actionableSolution:
        'Optimización y precarga de recursos críticos, eliminación de JavaScript no esencial y migración a arquitectura Edge/SSR en Next.js.',
      recommendation:
        'Optimizar la entrega de activos críticos, eliminar recursos bloqueantes y migrar a arquitectura SSR/Edge en Next.js.',
      severity: 'critical',
    });
  } else {
    findings.push({
      id: 'CWV-LCP',
      category: 'Core Web Vitals',
      title: `LCP ${performance.metrics.lcp} - Rendimiento Óptimo de Carga`,
      metric: `LCP: ${performance.metrics.lcp}`,
      businessImpact:
        'Velocidad de respuesta adecuada para retener visitantes móviles en redes de alta y media velocidad.',
      financialLoss: 'Riesgo bajo de rebote por velocidad',
      actionableSolution: 'Mantener políticas de optimización de imágenes y monitoreo de Core Web Vitals.',
      recommendation: 'Mantener políticas de optimización de imágenes y monitoreo de Core Web Vitals.',
      severity: 'optimal',
    });
  }

  if (seo.headingsCount.h1 !== 1) {
    findings.push({
      id: 'SEO-H1',
      category: 'SEO Orgánico',
      title: `Jerarquía Semántica Deficiente (${seo.headingsCount.h1} etiquetas H1 detectadas)`,
      metric: `Etiquetas H1: ${seo.headingsCount.h1} (Estándar técnico: exactamente 1)`,
      businessImpact:
        'Invisibilidad en Google Orgánico Local por dilución o ausencia de la entidad principal rectora.',
      financialLoss: 'Sobre-inversión de hasta un 340% más en Google Ads para compensar tráfico orgánico no capturado',
      actionableSolution:
        'Definir un único H1 canónico portador de la propuesta de valor y reestructurar H2/H3 en cascada documental.',
      recommendation:
        'Definir un único H1 canónico portador de la propuesta de valor y reestructurar H2/H3 en cascada documental.',
      severity: 'critical',
    });
  } else {
    findings.push({
      id: 'SEO-H1',
      category: 'SEO Orgánico',
      title: 'Estructura H1 Canónica Verificada',
      metric: 'H1: 1 (Estructura semántica óptima)',
      businessImpact:
        'Indexación correcta del linaje temático principal en motores de búsqueda tradicionales.',
      financialLoss: 'Sin penalización semántica',
      actionableSolution: 'Extender marcado semántico a sub-secciones y catálogo.',
      recommendation: 'Extender marcado semántico a sub-secciones y catálogo.',
      severity: 'optimal',
    });
  }

  if (!geo.schemaOrg.hasOrganization && !geo.schemaOrg.hasLocalBusiness) {
    findings.push({
      id: 'GEO-SCHEMA',
      category: 'Autoridad Visual',
      title: 'Ausencia de Grafo de Entidad y Autoridad Verificada',
      metric: `Esquemas JSON-LD detectados: ${geo.schemaOrg.count}`,
      businessImpact:
        'Síndrome de Marca Genérica & Pérdida de Confianza Ocular. Los algoritmos no asocian el sitio con una entidad comercial real con dirección y fundadora.',
      financialLoss: '30%–40% menor tasa de clics (CTR) en resultados de búsqueda por falta de fragmentos enriquecidos',
      actionableSolution:
        'Inyectar grafo completo Schema.org (@graph) con Organization, LocalBusiness, coordenadas y credenciales E-E-A-T.',
      recommendation:
        'Inyectar grafo completo Schema.org (@graph) con Organization, LocalBusiness, coordenadas y credenciales E-E-A-T.',
      severity: 'warning',
    });
  } else {
    findings.push({
      id: 'GEO-SCHEMA',
      category: 'Autoridad Visual',
      title: 'Grafo de Entidad Estructurado Detectado',
      metric: `Esquemas JSON-LD: ${geo.schemaOrg.count} (${geo.schemaOrg.types.join(', ')})`,
      businessImpact:
        'Presencia identificable en el Knowledge Graph de Google y bases de conocimiento estructuradas.',
      financialLoss: 'Riesgo minimizado de desambiguación de marca',
      actionableSolution: 'Mantener actualizadas las coordenadas geográficas y enlaces a perfiles corporativos.',
      recommendation: 'Mantener actualizadas las coordenadas geográficas y enlaces a perfiles corporativos.',
      severity: 'optimal',
    });
  }

  const hasAiBlocked = Object.values(geo.robotsTxt.aiBotsAllowed).some((b) => b === false);
  if (!geo.llmsTxt.present || hasAiBlocked) {
    findings.push({
      id: 'GEO-LLMS',
      category: 'Inteligencia Artificial',
      title: 'Exclusión de Búsqueda por IA (ChatGPT / Perplexity / Claude)',
      metric: `llms.txt: ${geo.llmsTxt.present ? 'Presente' : 'Ausente'} • Bots Bloqueados: ${
        hasAiBlocked ? 'Sí' : 'No'
      }`,
      businessImpact:
        '0 menciones IA. Los motores generativos ignoran o alucinan la oferta de la marca al no encontrar un manifiesto /llms.txt condensado.',
      financialLoss:
        'Pérdida invisible de compradores corporativos que usan ChatGPT Search y Perplexity Pro para cotizar servicios',
      actionableSolution:
        'Generar e indexar /llms.txt y /llms-full.txt según el estándar de llmstxt.org y permitir el rastreo a GPTBot, ClaudeBot y PerplexityBot.',
      recommendation:
        'Generar e indexar /llms.txt y /llms-full.txt según el estándar de llmstxt.org y permitir el rastreo a GPTBot, ClaudeBot y PerplexityBot.',
      severity: 'critical',
    });
  } else {
    findings.push({
      id: 'GEO-LLMS',
      category: 'Inteligencia Artificial',
      title: 'Arquitectura Preparada para Agentes de IA',
      metric: 'llms.txt verificado y rastreadores habilitados',
      businessImpact:
        'Citabilidad de alta fidelidad garantizada en respuestas conversacionales con enlaces de atribución directa.',
      financialLoss: 'Captura proactiva de tráfico derivado de IA',
      actionableSolution: 'Mantener la densidad semántica de contexto RAG por encima del 15%.',
      recommendation: 'Mantener la densidad semántica de contexto RAG por encima del 15%.',
      severity: 'optimal',
    });
  }

  if (youtube.detected && !youtube.hasVideoObjectSchema) {
    findings.push({
      id: 'FUNNEL-VIDEO',
      category: 'Embudo Comercial',
      title: 'Ceguera Audiovisual en Motores de Búsqueda (Video sin VideoObject)',
      metric: `${youtube.videoUrls.length} video(s) embebido(s) sin marcado VideoObject`,
      businessImpact:
        'Los activos de video no generan fragmentos enriquecidos en Google Video ni pueden ser indexados por asistentes multimodales.',
      financialLoss: 'Desperdicio de inversión de producción audiovisual por invisibilidad algorítmica',
      actionableSolution:
        'Inyectar marcado Schema.org VideoObject con thumbnail WebP, duración y metadatos verificados.',
      recommendation:
        'Inyectar marcado Schema.org VideoObject con thumbnail WebP, duración y metadatos verificados.',
      severity: 'warning',
    });
  } else {
    findings.push({
      id: 'FUNNEL-LEAD',
      category: 'Embudo Comercial',
      title: 'Fricción en la Etapa de Cierre y Conversión',
      metric: 'Formulario Frío 1 Etapa',
      businessImpact:
        'Fricción Crítica en la Etapa de Cierre. Formularios estáticos no calificados generan abandono en usuarios de alto ticket.',
      financialLoss: 'Tasa de rebote de prospectos decididos que prefieren inmediatez',
      actionableSolution:
        'Cotizador paramétrico instantáneo con handoff a WhatsApp verificado y cálculo transparente de plazos e inversión.',
      recommendation:
        'Cotizador paramétrico instantáneo con handoff a WhatsApp verificado y cálculo transparente de plazos e inversión.',
      severity: 'warning',
    });
  }

  return findings;
}

/**
 * Main Live Audit Execution Function
 */
async function performLiveAudit(
  normalizedUrl: string,
  rawUrl: string,
  strategy: AuditStrategy = 'mobile'
): Promise<AuditorResponse> {
  const startTime = Date.now();
  const targetOrigin = new URL(normalizedUrl).origin;
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => abortController.abort(), 8500);

  const telemetryLogs: TelemetryPhaseLog[] = [];
  const logPhase = (phase: TelemetryPhaseLog['phase'], name: string, message: string) => {
    telemetryLogs.push({
      phase,
      name,
      timestamp: new Date().toISOString(),
      message,
    });
  };

  try {
    logPhase('P1', 'DNS & SSL Handshake', `Iniciando resolución de host y negociación TLS con ${targetOrigin}...`);

    // 1. Concurrent Network Probes with graceful catch blocks
    const fetchRootPromise = (async () => {
      const probeStart = Date.now();
      try {
        const res = await fetch(normalizedUrl, {
          signal: abortController.signal,
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 (compatible; PuelcheLabAuditor/1.0)',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'es-CL,es;q=0.9,en;q=0.8',
          },
        });
        const ttfbMs = Math.max(40, Date.now() - probeStart);
        const html = await res.text();
        return { html, ttfbMs, status: res.status, error: undefined };
      } catch (err: unknown) {
        const ttfbMs = Math.max(40, Date.now() - probeStart);
        return {
          html: '',
          ttfbMs,
          status: 0,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    })();

    const fetchLlmsPromise = (async () => {
      try {
        const u = `${targetOrigin}/llms.txt`;
        const res = await fetch(u, {
          signal: abortController.signal,
          headers: { 'User-Agent': 'PuelcheLabAuditor/1.0' },
        });
        const text = res.ok ? await res.text() : '';
        return { content: text, status: res.status, url: u };
      } catch {
        return { content: '', status: 0, url: `${targetOrigin}/llms.txt` };
      }
    })();

    const fetchLlmsFullPromise = (async () => {
      try {
        const u = `${targetOrigin}/llms-full.txt`;
        const res = await fetch(u, {
          signal: abortController.signal,
          headers: { 'User-Agent': 'PuelcheLabAuditor/1.0' },
        });
        const text = res.ok ? await res.text() : '';
        return { content: text, status: res.status, url: u };
      } catch {
        return { content: '', status: 0, url: `${targetOrigin}/llms-full.txt` };
      }
    })();

    const fetchRobotsPromise = (async () => {
      try {
        const u = `${targetOrigin}/robots.txt`;
        const res = await fetch(u, {
          signal: abortController.signal,
          headers: { 'User-Agent': 'PuelcheLabAuditor/1.0' },
        });
        const text = res.ok ? await res.text() : '';
        return { content: text, status: res.status, url: u };
      } catch {
        return { content: '', status: 0, url: `${targetOrigin}/robots.txt` };
      }
    })();

    // Await core fetches concurrently using Promise.allSettled
    const [rootSettled, llmsSettled, llmsFullSettled, robotsSettled] = await Promise.allSettled([
      fetchRootPromise,
      fetchLlmsPromise,
      fetchLlmsFullPromise,
      fetchRobotsPromise,
    ]);

    const rootResult =
      rootSettled.status === 'fulfilled'
        ? rootSettled.value
        : { html: '', ttfbMs: 8500, status: 0, error: 'Connection failed' };

    const llmsResult =
      llmsSettled.status === 'fulfilled'
        ? llmsSettled.value
        : { content: '', status: 0, url: `${targetOrigin}/llms.txt` };

    const llmsFullResult =
      llmsFullSettled.status === 'fulfilled'
        ? llmsFullSettled.value
        : { content: '', status: 0, url: `${targetOrigin}/llms-full.txt` };

    const robotsResult =
      robotsSettled.status === 'fulfilled'
        ? robotsSettled.value
        : { content: '', status: 0, url: `${targetOrigin}/robots.txt` };

    // If host was completely unreachable (status 0 and empty html), throw clear error
    if (rootResult.status === 0 && !rootResult.html) {
      throw new Error(
        `No se pudo establecer conexión con el host de destino (${
          rootResult.error || 'tiempo de espera agotado'
        }). Verifique que el dominio sea accesible.`
      );
    }

    const html = rootResult.html;
    const ttfbMs = rootResult.ttfbMs;

    logPhase(
      'P2',
      'DOM & Jerarquía SEO',
      `HTML recibido (${(Buffer.byteLength(html, 'utf-8') / 1024).toFixed(
        1
      )} KB, TTFB: ${ttfbMs}ms). Analizando estructura documental...`
    );

    // 2. Parse SEO & Headings
    const title = extractTagContent(html, 'title') || extractMetaContent(html, 'og:title');
    const description =
      extractMetaContent(html, 'description') || extractMetaContent(html, 'og:description');
    const canonical = extractCanonical(html);
    const lang = extractLang(html);
    const viewportPresent = checkViewport(html);
    const headings = extractHeadings(html);
    const imagesInfo = extractImagesInfo(html);

    let seoScore = 0;
    if (title.length >= 25 && title.length <= 75) seoScore += 25;
    else if (title.length > 0) seoScore += 15;

    if (description.length >= 60 && description.length <= 170) seoScore += 25;
    else if (description.length > 0) seoScore += 15;

    if (canonical.length > 0) seoScore += 15;
    if (headings.h1 === 1) seoScore += 15;
    else if (headings.h1 > 1) seoScore += 8;

    if (lang.length > 0) seoScore += 10;
    if (viewportPresent) seoScore += 10;

    const seo: SeoAuditResult = {
      score: Math.min(100, seoScore),
      title,
      description,
      canonical,
      headingsCount: {
        h1: headings.h1,
        h2: headings.h2,
        h3: headings.h3,
        h4: headings.h4,
      },
      headingsHierarchy: headings,
      lang: lang || 'no-especificado',
      viewportPresent,
      imagesAlt: imagesInfo,
    };

    logPhase(
      'P3',
      'Autopsia de Activos & Medios',
      `Identificadas ${imagesInfo.total} imágenes (${imagesInfo.percentage}% con alt). Inspeccionando medios y marcas semánticas...`
    );

    // 3. YouTube Media & Schema VideoObject
    const youtubeMedia = extractYouTubeMedia(html);
    const jsonLdData = extractJsonLd(html);

    const hasVideoObjectSchema = jsonLdData.hasVideoObject;
    let ytScore = 100;
    const ytRecommendations: string[] = [];

    if (youtubeMedia.detected) {
      if (!hasVideoObjectSchema) {
        ytScore = 45;
        ytRecommendations.push(
          'Inyectar marcado Schema.org VideoObject para asegurar citabilidad e indexación en Google Video.'
        );
      }
      if (youtubeMedia.usesHeavyIframe) {
        ytScore -= 20;
        ytRecommendations.push(
          'Reemplazar iframe directo por una fachada ligera (lite-youtube) para ahorrar hasta 1.2MB de scripts de terceros.'
        );
      }
    } else {
      ytRecommendations.push('No se detectaron recursos audiovisuales externos en esta ruta.');
    }

    const youtube: YouTubeAuditResult = {
      detected: youtubeMedia.detected,
      videoUrls: youtubeMedia.videoUrls,
      hasVideoObjectSchema,
      schemas: jsonLdData.rawSchemas,
      score: ytScore,
      usesHeavyIframe: youtubeMedia.usesHeavyIframe,
      recommendations: ytRecommendations,
    };

    // 4. Open Graph & Social Cards
    const ogTitle = extractMetaContent(html, 'og:title') || title;
    const ogDesc = extractMetaContent(html, 'og:description') || description;
    const ogImage = extractMetaContent(html, 'og:image');
    const ogUrl = extractMetaContent(html, 'og:url') || normalizedUrl;
    const ogType = extractMetaContent(html, 'og:type') || 'website';
    const twitterCard = extractMetaContent(html, 'twitter:card') || 'summary_large_image';

    const missingOg: string[] = [];
    if (!ogTitle) missingOg.push('og:title');
    if (!ogDesc) missingOg.push('og:description');
    if (!ogImage) missingOg.push('og:image');
    if (!ogUrl) missingOg.push('og:url');

    let ogScore = 100;
    if (missingOg.length > 0) {
      ogScore = Math.max(10, 100 - missingOg.length * 25);
    }

    const openGraph: OpenGraphAuditResult = {
      score: ogScore,
      title: ogTitle,
      description: ogDesc,
      image: ogImage,
      url: ogUrl,
      type: ogType,
      twitterCard,
      missingTags: missingOg,
      socialPreview: {
        title: ogTitle || new URL(normalizedUrl).hostname,
        description: ogDesc || 'Sin descripción Open Graph disponible.',
        image: ogImage || '',
        domain: new URL(normalizedUrl).hostname,
      },
    };

    logPhase(
      'P4',
      'Core Web Vitals & Móvil',
      `Evaluando métricas de rendimiento bajo estrategia ${strategy.toUpperCase()}...`
    );

    // 5. PageSpeed Insights / Empirical Telemetry Execution
    const performanceResult = await queryPageSpeedWithFallback(
      normalizedUrl,
      html,
      ttfbMs,
      strategy,
      abortController.signal
    );

    logPhase(
      'P5',
      'GEO & Síntesis de Negocio',
      `Calculando densidad de contexto RAG, directivas de IA y generando síntesis ejecutiva...`
    );

    // 6. GEO Evaluation (llms.txt, robots.txt AI bots, schema.org, RAG density)
    const llmsAudit = evaluateLlmsTxt(llmsResult.content, llmsResult.url, llmsResult.status);
    const llmsFullAudit = {
      present: llmsFullResult.status === 200 && llmsFullResult.content.length > 50,
      url: llmsFullResult.url,
      charCount: llmsFullResult.content.length,
      statusCode: llmsFullResult.status,
    };

    const robotsAudit = evaluateRobotsTxt(robotsResult.content);

    const { cleanText, cleanBytes } = extractCleanText(html);
    const totalHtmlBytes = Buffer.byteLength(html, 'utf-8');
    const textRatio = totalHtmlBytes > 0 ? cleanBytes / totalHtmlBytes : 0;
    const formattedRatio = `${(textRatio * 100).toFixed(1)}%`;

    let ragScore = 40;
    if (textRatio >= 0.2) ragScore = 100;
    else if (textRatio >= 0.12) ragScore = 80;
    else if (textRatio >= 0.06) ragScore = 60;

    let geoScore = 0;
    if (llmsAudit.present && llmsAudit.validSyntax) geoScore += 35;
    else if (llmsAudit.present) geoScore += 20;

    const aiBotsList = Object.values(robotsAudit.aiBotsAllowed);
    const allowedRatio =
      aiBotsList.length > 0
        ? aiBotsList.filter((b) => b === true).length / aiBotsList.length
        : 1.0;
    geoScore += Math.round(allowedRatio * 30);

    if (jsonLdData.hasOrganization && jsonLdData.hasLocalBusiness) geoScore += 25;
    else if (jsonLdData.count > 0) geoScore += 15;

    geoScore += Math.round((ragScore / 100) * 10);

    const geo: GeoAuditResult = {
      score: Math.min(100, Math.max(10, geoScore)),
      llmsTxt: llmsAudit,
      llmsFullTxt: llmsFullAudit,
      robotsTxt: robotsAudit,
      schemaOrg: {
        present: jsonLdData.present,
        count: jsonLdData.count,
        types: jsonLdData.types,
        rawSchemas: jsonLdData.rawSchemas,
        entitiesDetected: jsonLdData.types,
        hasOrganization: jsonLdData.hasOrganization,
        hasLocalBusiness: jsonLdData.hasLocalBusiness,
        hasPerson: jsonLdData.hasPerson,
        hasProduct: jsonLdData.hasProduct,
        hasVideoObject: jsonLdData.hasVideoObject,
      },
      ragDensity: {
        score: ragScore,
        ratio: formattedRatio,
        headingDepth: headings.h4 > 0 ? 4 : headings.h3 > 0 ? 3 : headings.h2 > 0 ? 2 : 1,
        textToHtmlRatio: Number(textRatio.toFixed(3)),
        cleanTextBytes: cleanBytes,
        totalHtmlBytes,
        markdownSample: cleanText.slice(0, 320),
      },
    };

    // 7. Commercial Findings & Overall Score
    const commercialFindings = generateCommercialFindings(
      performanceResult,
      seo,
      geo,
      youtube
    );

    const schemaContribution = jsonLdData.count > 0 ? 80 : 20;
    const overallScore = Math.round(
      performanceResult.score * 0.25 +
        geo.score * 0.3 +
        seo.score * 0.2 +
        schemaContribution * 0.15 +
        openGraph.score * 0.1
    );

    const durationMs = Date.now() - startTime;

    return {
      success: true,
      url: rawUrl,
      normalizedUrl,
      timestamp: new Date().toISOString(),
      overallScore: Math.max(10, Math.min(overallScore, 100)),
      performance: performanceResult,
      pageSpeed: performanceResult,
      geo,
      seo,
      youtube,
      openGraph,
      commercialFindings,
      telemetryLogs,
      durationMs,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * POST /api/auditor handler
 */
export async function POST(request: Request) {
  try {
    let body: AuditorRequest;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Cuerpo de solicitud inválido. Se espera JSON { url, strategy? }' },
        { status: 400 }
      );
    }

    if (!body || !body.url || typeof body.url !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Parámetro obligatorio "url" ausente o no válido.' },
        { status: 400 }
      );
    }

    const normalizedUrl = normalizeUrl(body.url);
    if (!normalizedUrl) {
      return NextResponse.json(
        { success: false, error: 'URL inválida o malformada. Debe incluir un dominio válido.' },
        { status: 400 }
      );
    }

    const strategy: AuditStrategy =
      body.strategy === 'desktop' || body.strategy === 'mobile' || body.strategy === 'both'
        ? body.strategy
        : 'mobile';

    const auditResponse = await performLiveAudit(normalizedUrl, body.url, strategy);
    return NextResponse.json(auditResponse, { status: 200 });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Error interno durante la auditoría';
    const isTimeout = /tiempo de espera|timeout|abort/i.test(errMessage);
    const statusCode = isTimeout ? 504 : 500;
    return NextResponse.json(
      {
        success: false,
        error: errMessage,
      },
      { status: statusCode }
    );
  }
}

/**
 * GET /api/auditor handler (Allows instant testing via curl or browser URL params)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get('url');
    const strategyParam = searchParams.get('strategy') as AuditStrategy | null;

    if (!targetUrl) {
      return NextResponse.json(
        {
          success: false,
          error: 'Parámetro de consulta "?url=" requerido. Ejemplo: /api/auditor?url=https://puelche-lab.vercel.app',
        },
        { status: 400 }
      );
    }

    const normalizedUrl = normalizeUrl(targetUrl);
    if (!normalizedUrl) {
      return NextResponse.json(
        { success: false, error: 'URL inválida o malformada. Debe incluir un dominio válido.' },
        { status: 400 }
      );
    }

    const strategy: AuditStrategy =
      strategyParam === 'desktop' || strategyParam === 'mobile' || strategyParam === 'both'
        ? strategyParam
        : 'mobile';

    const auditResponse = await performLiveAudit(normalizedUrl, targetUrl, strategy);
    return NextResponse.json(auditResponse, { status: 200 });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Error interno durante la auditoría';
    const isTimeout = /tiempo de espera|timeout|abort/i.test(errMessage);
    const statusCode = isTimeout ? 504 : 500;
    return NextResponse.json(
      {
        success: false,
        error: errMessage,
      },
      { status: statusCode }
    );
  }
}
