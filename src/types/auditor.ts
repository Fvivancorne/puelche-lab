/**
 * Types Contract for Puelche Lab Live Auditor Engine
 * Defines strongly-typed schemas for:
 * - AuditorRequest & AuditorResponse
 * - PageSpeed / Core Web Vitals & Empirical Telemetry Fallback
 * - GEO (Generative Engine Optimization): llms.txt, robots.txt AI crawlers, Schema.org entities, RAG density
 * - Technical SEO & Headings Hierarchy
 * - YouTube detection & Schema.org VideoObject
 * - Open Graph & Social Cards
 * - Commercial Business Impact Findings & Telemetry Logs
 */

export type AuditStrategy = 'mobile' | 'desktop' | 'both';

export interface AuditorRequest {
  url: string;
  strategy?: AuditStrategy;
}

export interface PageSpeedMetricItem {
  displayValue: string;
  numericValue: number;
  score: number; // 0 to 1
}

export interface PerformanceDiagnostics {
  title: string;
  impact: 'high' | 'medium' | 'low';
  detail: string;
}

export interface PerformanceAuditResult {
  score: number; // 0 - 100
  source: 'pagespeed_api' | 'empirical_telemetry';
  metrics: {
    lcp: string;
    fid_inp: string;
    cls: string;
    fcp: string;
    ttfb: string;
  };
  diagnostics: PerformanceDiagnostics[];
  categories?: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  strategy?: AuditStrategy;
  rawAudits?: Record<string, unknown>;
}

export interface GeoCrawlerStatus {
  name: string;
  operator: string;
  engine: string;
  status: 'allowed' | 'blocked' | 'unspecified';
  statusText: string;
  ruleSnippet?: string;
  allowed: boolean;
}

export interface GeoLlmsTxtResult {
  present: boolean;
  url: string;
  charCount: number;
  validSyntax: boolean;
  statusCode?: number;
  hasTitle?: boolean;
  hasSummary?: boolean;
  hasSections?: boolean;
  preview?: string;
}

export interface GeoRobotsTxtResult {
  present: boolean;
  url?: string;
  aiBotsAllowed: {
    gptBot: boolean;
    claudeBot: boolean;
    perplexityBot: boolean;
    googleExtended?: boolean;
    applebotExtended?: boolean;
    bytespider?: boolean;
    ccBot?: boolean;
  };
  crawlers?: GeoCrawlerStatus[];
}

export interface GeoSchemaOrgResult {
  present: boolean;
  count: number;
  types: string[];
  rawSchemas: unknown[];
  entitiesDetected?: string[];
  hasOrganization?: boolean;
  hasLocalBusiness?: boolean;
  hasPerson?: boolean;
  hasProduct?: boolean;
  hasVideoObject?: boolean;
}

export interface GeoRagDensityResult {
  score: number;
  ratio: string;
  headingDepth: number;
  textToHtmlRatio: number;
  cleanTextBytes?: number;
  totalHtmlBytes?: number;
  markdownSample?: string;
}

export interface GeoAuditResult {
  score: number; // 0 - 100
  llmsTxt: GeoLlmsTxtResult;
  llmsFullTxt?: {
    present: boolean;
    url: string;
    charCount: number;
    statusCode?: number;
  };
  robotsTxt: GeoRobotsTxtResult;
  schemaOrg: GeoSchemaOrgResult;
  ragDensity: GeoRagDensityResult;
}

export interface SeoAuditResult {
  score: number; // 0 - 100
  title: string;
  description: string;
  canonical: string;
  headingsCount: {
    h1: number;
    h2: number;
    h3: number;
    h4?: number;
  };
  headingsHierarchy?: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
  };
  lang: string;
  viewportPresent: boolean;
  imagesAlt?: {
    total: number;
    withAlt: number;
    percentage: number;
  };
  diagnostics?: Array<{ title: string; passed: boolean; message: string }>;
}

export interface YouTubeAuditResult {
  detected: boolean;
  videoUrls: string[];
  hasVideoObjectSchema: boolean;
  schemas: unknown[];
  score?: number;
  usesHeavyIframe?: boolean;
  recommendations?: string[];
}

export interface OpenGraphAuditResult {
  score: number;
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  twitterCard?: string;
  socialPreview?: {
    title: string;
    description: string;
    image: string;
    domain: string;
  };
  missingTags?: string[];
}

export interface CommercialFinding {
  category: string;
  title: string;
  businessImpact: string;
  recommendation: string;
  id?: string;
  metric?: string;
  financialLoss?: string;
  actionableSolution?: string;
  severity?: 'critical' | 'warning' | 'optimal';
}

export interface TelemetryPhaseLog {
  phase: 'P1' | 'P2' | 'P3' | 'P4' | 'P5';
  name: string;
  timestamp: string;
  message: string;
}

/**
 * Complete Auditor Response Contract (PROJECT.md line 54-109 + extensions)
 */
export interface AuditorResponse {
  success: boolean;
  url: string;
  normalizedUrl: string;
  timestamp: string;
  overallScore: number;
  performance: PerformanceAuditResult;
  // Also provide pageSpeed alias for analysis.md compatibility
  pageSpeed?: PerformanceAuditResult;
  geo: GeoAuditResult;
  seo: SeoAuditResult;
  youtube: YouTubeAuditResult;
  openGraph: OpenGraphAuditResult;
  commercialFindings: CommercialFinding[];
  telemetryLogs?: TelemetryPhaseLog[];
  durationMs?: number;
  error?: string;
}
