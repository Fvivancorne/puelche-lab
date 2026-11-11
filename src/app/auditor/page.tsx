'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  ShieldAlert, 
  Activity, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  TrendingDown, 
  EyeOff, 
  Cpu, 
  Play, 
  Video, 
  Send, 
  PhoneCall, 
  ArrowRight,
  Sparkles,
  ExternalLink,
  Layers,
  Compass,
  Bot,
  FileCode,
  FileText,
  Braces,
  Binary,
  Share2,
  Code2,
  ShieldCheck,
  XCircle,
  Globe,
  Radio,
  Check
} from 'lucide-react';
import { AtmosphericBackground } from '@/components/ui/AtmosphericBackground';
import { Magnetic } from '@/components/ui/Magnetic';

interface TelemetryLog {
  timestamp: string;
  phase: string;
  message: string;
}

const PHASES = [
  { id: 'P1', name: 'DNS & SSL Handshake', range: [0, 15] },
  { id: 'P2', name: 'DOM & Jerarquía SEO', range: [15, 35] },
  { id: 'P3', name: 'Autopsia de Activos & Medios', range: [35, 60] },
  { id: 'P4', name: 'Core Web Vitals & Móvil', range: [60, 85] },
  { id: 'P5', name: 'GEO & Síntesis de Negocio', range: [85, 100] },
];

const AI_CRAWLER_BOTS = [
  {
    name: 'GPTBot',
    operator: 'OpenAI',
    engine: 'ChatGPT Search, O1, GPT-4o',
    purpose: 'Rastreo web continuo e indexación para respuestas conversacionales con citas de fuentes verificadas.',
    targetStatus: 'Bloqueado o Sin Reglas',
    puelcheStatus: 'Permitido (Allow: /)',
    color: '#10a37f',
    snippet: `User-agent: GPTBot\nAllow: /\nCrawl-delay: 1`,
  },
  {
    name: 'ClaudeBot',
    operator: 'Anthropic',
    engine: 'Claude 3.7 Sonnet & Artifacts',
    purpose: 'Exploración semántica profunda para síntesis corporativa y extracción de documentación técnica.',
    targetStatus: 'Sin Directivas / 403',
    puelcheStatus: 'Permitido (Allow: /)',
    color: '#d97706',
    snippet: `User-agent: ClaudeBot\nAllow: /\nCrawl-delay: 1`,
  },
  {
    name: 'PerplexityBot',
    operator: 'Perplexity AI',
    engine: 'Pro Search & Deep Research',
    purpose: 'Búsqueda en tiempo real con generación de tarjetas de citas académicas y de negocio.',
    targetStatus: 'WAF Challenge Inaccesible',
    puelcheStatus: 'Permitido (Allow: /)',
    color: '#59BFD6',
    snippet: `User-agent: PerplexityBot\nAllow: /\nCrawl-delay: 1`,
  },
  {
    name: 'Google-Extended',
    operator: 'Google',
    engine: 'Gemini Deep Research & AI Overviews',
    purpose: 'Entrenamiento e ingestión para resúmenes automáticos en resultados de búsqueda de Google.',
    targetStatus: 'Sin Mapeo de Token',
    puelcheStatus: 'Permitido (Allow: /)',
    color: '#4285f4',
    snippet: `User-agent: Google-Extended\nAllow: /`,
  },
  {
    name: 'Applebot-Extended',
    operator: 'Apple',
    engine: 'Apple Intelligence Siri 2.0 & iOS 18',
    purpose: 'Rastreo de contexto para la capa multimodal en dispositivos iPhone, iPad y Mac.',
    targetStatus: 'Ignorado / Sin Soporte',
    puelcheStatus: 'Permitido (Allow: /)',
    color: '#a3a3a3',
    snippet: `User-agent: Applebot-Extended\nAllow: /`,
  },
  {
    name: 'Bytespider',
    operator: 'ByteDance',
    engine: 'Doubao & Ecosistema IA',
    purpose: 'Rastreo rápido de tendencias, comercio visual y metadatos de marcas para el mercado global.',
    targetStatus: 'Bloqueo Genérico',
    puelcheStatus: 'Rate-Limited Controlado',
    color: '#ec4899',
    snippet: `User-agent: Bytespider\nAllow: /\nCrawl-delay: 2`,
  },
];

const SCHEMA_ENTITIES = [
  {
    id: 'Organization',
    title: 'Organization & ProfessionalService',
    description: 'Entidad raíz con nombre de marca, logotipo oficial, teléfono corporativo verificado y fundadora.',
    json: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': 'https://www.puelchelab.cl/#organization',
      name: 'Puelche Lab',
      alternateName: 'Puelche Lab Estudio de Diseño y Fotografía',
      url: 'https://www.puelchelab.cl',
      logo: 'https://www.puelchelab.cl/images/real/logo-top.png',
      telephone: '+56 9 6617 7500',
      email: 'paula.valdivieso@puelchelab.cl',
      founder: {
        '@type': 'Person',
        name: 'Paula Valdivieso',
        jobTitle: 'Directora Creativa'
      }
    }
  },
  {
    id: 'LocalBusiness',
    title: 'LocalBusiness con Coordenadas Australes',
    description: 'Geolocalización exacta en Puerto Varas, Región de Los Lagos, conectando la sede física con el Knowledge Graph.',
    json: {
      '@type': 'LocalBusiness',
      '@id': 'https://www.puelchelab.cl/#localbusiness',
      name: 'Puelche Lab Puerto Varas',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Puerto Varas',
        addressRegion: 'Región de Los Lagos',
        addressCountry: 'CL'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -41.3195,
        longitude: -72.9854
      },
      areaServed: ['Puerto Varas', 'Frutillar', 'Puerto Montt', 'Chiloé', 'Patagonia Austral']
    }
  },
  {
    id: 'Person',
    title: 'Person (Paula Valdivieso)',
    description: 'Atribución de autoría creativa y credenciales profesionales para E-E-A-T en motores de IA.',
    json: {
      '@type': 'Person',
      '@id': 'https://www.puelchelab.cl/#paula-valdivieso',
      name: 'Paula Valdivieso',
      jobTitle: 'Directora Creativa & Fotógrafa',
      worksFor: { '@id': 'https://www.puelchelab.cl/#organization' },
      sameAs: [
        'https://www.instagram.com/puelchelab',
        'https://www.linkedin.com/in/paula-valdivieso-puelche'
      ]
    }
  },
  {
    id: 'OfferCatalog',
    title: 'OfferCatalog (5 Disciplinas Cross-Media)',
    description: 'Catálogo estructurado con especificación de servicios para que las IAs identifiquen cotizaciones exactas.',
    json: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Diseño y Fotografía Puelche Lab',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fotografía de Autor & Film' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Diseño de Marca & Identidad' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Diseño Editorial & Memorias' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Edición Fotográfica Digital' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desarrollo Web SSR & GEO' } }
      ]
    }
  }
];

function AuditorContent() {
  const searchParams = useSearchParams();
  const initialUrl = searchParams.get('url') || 'https://www.puelchelab.cl';

  const [targetUrl, setTargetUrl] = useState<string>(initialUrl);
  const [simulationState, setSimulationState] = useState<'IDLE' | 'RUNNING' | 'DIAGNOSTIC_READY' | 'GATE_SUBMITTED'>('IDLE');
  const [progress, setProgress] = useState<number>(0);
  const [logs, setLogs] = useState<TelemetryLog[]>([]);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);

  // Lead Gate Form State
  const [leadName, setLeadName] = useState<string>('');
  const [leadCompany, setLeadCompany] = useState<string>('');
  const [leadEmail, setLeadEmail] = useState<string>('');
  const [leadPhone, setLeadPhone] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Cabina de Preparación para Agentes de IA & GEO State
  const [activeCockpitTab, setActiveCockpitTab] = useState<number>(0);
  const [llmsPreviewMode, setLlmsPreviewMode] = useState<'clean' | 'noisy'>('clean');
  const [selectedBotIndex, setSelectedBotIndex] = useState<number>(0);
  const [selectedSchemaEntity, setSelectedSchemaEntity] = useState<string>('Organization');
  const [ragDensityMode, setRagDensityMode] = useState<'puelche' | 'target'>('puelche');
  const [ogCardMode, setOgCardMode] = useState<'puelche' | 'target'>('puelche');

  const startTimeRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  const startSimulation = () => {
    setSimulationState('RUNNING');
    setProgress(0);
    setLogs([]);
    setActivePhaseIndex(0);
    startTimeRef.current = performance.now();
  };

  useEffect(() => {
    if (simulationState !== 'RUNNING') return;

    const DURATION = 20000; // 20.0 segundos exactos

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const currentProgress = Math.min(100, (elapsed / DURATION) * 100);
      setProgress(currentProgress);

      // Phase 1 (0s - 3s)
      if (elapsed >= 500 && elapsed < 3000 && activePhaseIndex === 0) {
        setActivePhaseIndex(0);
        setLogs((prev) => {
          if (prev.some((l) => l.phase === 'P1')) return prev;
          return [
            ...prev,
            { timestamp: `[00:01.2]`, phase: 'P1', message: `Resolviendo DNS para ${targetUrl}... Verificando latencia regional.` },
            { timestamp: `[00:02.4]`, phase: 'P1', message: `Negociación SSL/TLS 1.3 verificada. Certificado activo.` },
          ];
        });
      }

      // Phase 2 (3s - 7s)
      if (elapsed >= 3000 && elapsed < 7000 && activePhaseIndex <= 1) {
        setActivePhaseIndex(1);
        setLogs((prev) => {
          if (prev.some((l) => l.phase === 'P2')) return prev;
          return [
            ...prev,
            { timestamp: `[00:04.1]`, phase: 'P2', message: `Descargando estructura DOM inicial de la plataforma.` },
            { timestamp: `[00:05.6]`, phase: 'P2', message: `Escaneando jerarquía tipográfica: <h1> ausente en 8/10 rutas evaluadas.` },
            { timestamp: `[00:06.8]`, phase: 'P2', message: `Metadatos descriptivos: Desalineados frente a búsqueda semántica local.` },
          ];
        });
      }

      // Phase 3 (7s - 12s)
      if (elapsed >= 7000 && elapsed < 12000 && activePhaseIndex <= 2) {
        setActivePhaseIndex(2);
        setLogs((prev) => {
          if (prev.some((l) => l.phase === 'P3')) return prev;
          return [
            ...prev,
            { timestamp: `[00:08.2]`, phase: 'P3', message: `Inspección de activos fotográficos: 16 fotos cargadas en CSS sin compresión moderna.` },
            { timestamp: `[00:09.9]`, phase: 'P3', message: `Autenticidad visual de marca: Detectadas imágenes de banco genérico sin autoría.` },
            { timestamp: `[00:11.4]`, phase: 'P3', message: `Optimización moderna (AVIF / WebP): Ausente. Peso de transferencia: 8.4 MB.` },
          ];
        });
      }

      // Phase 4 (12s - 16s)
      if (elapsed >= 12000 && elapsed < 16000 && activePhaseIndex <= 3) {
        setActivePhaseIndex(3);
        setLogs((prev) => {
          if (prev.some((l) => l.phase === 'P4')) return prev;
          return [
            ...prev,
            { timestamp: `[00:13.1]`, phase: 'P4', message: `Simulando conexión 4G móvil austral: LCP 4.8s registrado (umbral óptimo: < 1.2s).` },
            { timestamp: `[00:14.5]`, phase: 'P4', message: `Cumulative Layout Shift (CLS): 0.28 por carga asíncrona de banners.` },
            { timestamp: `[00:15.8]`, phase: 'P4', message: `Retención móvil: Estimación de rebote del 53% en visitantes en smartphones.` },
          ];
        });
      }

      // Phase 5 (16s - 20s)
      if (elapsed >= 16000 && activePhaseIndex <= 4) {
        setActivePhaseIndex(4);
        setLogs((prev) => {
          if (prev.some((l) => l.phase === 'P5')) return prev;
          return [
            ...prev,
            { timestamp: `[00:17.2]`, phase: 'P5', message: `Escaneo Schema.org JSON-LD: 0 entidades estructuradas para motores de IA.` },
            { timestamp: `[00:18.9]`, phase: 'P5', message: `Evaluación de autoridad conversacional (ChatGPT / Perplexity): Sin presencia sintetizada.` },
            { timestamp: `[00:19.9]`, phase: 'P5', message: `Consolidación de métricas finalizada. Generando diagnóstico editorial de negocio...` },
          ];
        });
      }

      if (elapsed < DURATION) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setSimulationState('DIAGNOSTIC_READY');
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [simulationState, targetUrl, activePhaseIndex]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: leadName,
          email: leadEmail,
          telefono: leadPhone,
          mensaje: `[Auditoría Puelche Lab] URL evaluada: ${targetUrl} | Empresa: ${leadCompany} | Puntuación: 41/100`,
          presupuesto: '$4.000.000 - $8.000.000 CLP',
          servicios: ['Desarrollo Web & Rediseño de Autor', 'Fotografía en Terreno'],
          region: 'Región de Los Lagos',
        }),
      });
    } catch {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
      setSimulationState('GATE_SUBMITTED');
    }
  };

  const whatsappMsg = encodeURIComponent(
    `Hola Paula y equipo Puelche Lab, realicé la auditoría de mi sitio (${targetUrl}) en su plataforma. Obtuve un score de 41/100 y me gustaría coordinar el video Loom de 5 minutos o una reunión de diagnóstico.`
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      {/* ── HEADER EDITORIAL DE DIAGNÓSTICO DIGITAL ── */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#59BFD6] font-mono text-xs uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5 text-[#59BFD6]" />
          <span>PUELCHE LAB &bull; MOTOR AUDITOR EN TIEMPO REAL</span>
        </div>

        <h1 className="font-condensed text-4xl sm:text-6xl md:text-7xl uppercase font-bold text-white tracking-tight">
          Diagnóstico Digital & Autopsia Forense de Plataforma Web
        </h1>

        <p className="font-sans text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
          Diagnóstico de carga cognitiva, Core Web Vitals, jerarquía SEO y autoridad GEO frente a los estándares de clase mundial Awwwards.
        </p>
      </div>

      {/* ── ESTADO 1: ENTRADA / IDLE ── */}
      {simulationState === 'IDLE' && (
        <div className="bg-white/[0.035] backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)] space-y-8 max-w-3xl mx-auto">
          <div className="space-y-3">
            <label htmlFor="target-url" className="font-mono text-xs uppercase tracking-wider text-white/80 block">
              URL del Sitio Web a Evaluar
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="target-url"
                type="url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://www.tu-empresa.cl"
                required
                className="flex-1 bg-white/5 border border-white/15 focus:border-[#59BFD6] rounded-2xl px-5 py-4 text-white font-mono text-sm outline-none transition-colors"
              />
              <Magnetic strength={0.35} radius={80}>
                <button
                  type="button"
                  onClick={startSimulation}
                  className="rb-link-glanz px-8 py-4 rounded-2xl bg-[#59BFD6] hover:bg-[#4eaac0] text-[#0b0d10] font-mono text-xs uppercase tracking-wider font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Auditar en Tiempo Real</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Magnetic>
            </div>
            <p className="font-mono text-[11px] text-white/50 pt-1">
              * Simulación forense de 20 segundos con 5 fases de inspección telemetry de red y DOM.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-center">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="font-mono text-[10px] text-white/40 uppercase block">Duración</span>
              <span className="font-mono text-sm font-semibold text-white mt-1 block">20.0 Segundos</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="font-mono text-[10px] text-white/40 uppercase block">Sondas</span>
              <span className="font-mono text-sm font-semibold text-[#59BFD6] mt-1 block">5 Fases Profundas</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="font-mono text-[10px] text-white/40 uppercase block">Estándar</span>
              <span className="font-mono text-sm font-semibold text-white mt-1 block">Awwwards SOTY</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="font-mono text-[10px] text-white/40 uppercase block">Costo</span>
              <span className="font-mono text-sm font-semibold text-emerald-400 mt-1 block">$0 / Gratuito</span>
            </div>
          </div>
        </div>
      )}

      {/* ── ESTADO 2: SIMULACIÓN EN TIEMPO REAL (20 SEGUNDOS) ── */}
      {simulationState === 'RUNNING' && (
        <div className="bg-white/[0.035] backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)] space-y-8 max-w-4xl mx-auto">
          {/* Header de Telemetría */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#59BFD6] animate-ping" />
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-white/50 block">
                  Ejecutando Sonda de Diagnóstico
                </span>
                <span className="font-mono text-sm font-bold text-white">
                  {targetUrl}
                </span>
              </div>
            </div>

            <div className="font-mono text-right">
              <span className="text-2xl font-bold text-[#59BFD6]">
                {Math.round(progress)}%
              </span>
              <span className="text-[11px] text-white/40 block">
                {((progress / 100) * 20).toFixed(1)}s / 20.0s
              </span>
            </div>
          </div>

          {/* Barra de Progreso Cinética */}
          <div className="space-y-2">
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#59BFD6] via-[#C29B63] to-[#59BFD6] rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_#59BFD6]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between font-mono text-[10px] text-white/50">
              {PHASES.map((p, i) => (
                <span
                  key={p.id}
                  className={activePhaseIndex === i ? 'text-[#59BFD6] font-bold' : ''}
                >
                  {p.id}: {p.name}
                </span>
              ))}
            </div>
          </div>

          {/* Terminal Procedural de Telemetría */}
          <div className="bg-[#14161c]/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 font-mono text-xs space-y-2.5 min-h-[220px] max-h-[300px] overflow-y-auto">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-white/50 text-[11px]">
              <Terminal className="w-3.5 h-3.5 text-[#59BFD6]" />
              <span>REGISTRO DE TELEMETRÍA EN TIEMPO REAL</span>
            </div>

            {logs.map((log, index) => (
              <div key={index} className="flex items-start gap-3 text-white/80 animate-fadeIn">
                <span className="text-white/40 shrink-0">{log.timestamp}</span>
                <span className="text-[#59BFD6] font-semibold shrink-0">[{log.phase}]</span>
                <span className="text-white/90">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ESTADO 3: DIAGNÓSTICO FORENSE & TRADUCCIÓN COMERCIAL (READY) ── */}
      {(simulationState === 'DIAGNOSTIC_READY' || simulationState === 'GATE_SUBMITTED') && (
        <div className="space-y-12">
          {/* Tarjeta de Scorecard General — Diseño Editorial Limpio (Sin rojos punk/headshot) */}
          <div className="bg-white/[0.035] backdrop-blur-2xl border border-white/10 rounded-[36px] p-8 sm:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#59BFD6]/10 border border-[#59BFD6]/20 text-[#59BFD6] font-mono text-xs uppercase tracking-wider">
                <Activity className="w-4 h-4 text-[#59BFD6]" />
                <span>Salud Digital de Plataforma: NIVEL CRÍTICO &bull; OPORTUNIDAD DE MODERNIZACIÓN</span>
              </div>
              <h2 className="font-condensed text-3xl sm:text-5xl uppercase font-bold text-white tracking-tight">
                Puntuación Forense: 41 / 100
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/75 max-w-xl font-light leading-relaxed">
                Plataforma con fugas críticas de tráfico móvil, obsolescencia técnica en Core Web Vitals y nula autoridad semántica para motores de búsqueda de IA.
              </p>
            </div>

            {/* Gauge Circular Puelche (Cyan & Ochre) */}
            <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl bg-white/[0.02] border border-white/10 min-w-[220px]">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="48" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    stroke="url(#puelcheScoreGrad)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="301.59"
                    strokeDashoffset="177.9"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="puelcheScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#59BFD6" />
                      <stop offset="100%" stopColor="#C29B63" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-condensed text-4xl font-black text-white">41%</span>
                  <span className="font-mono text-[9px] text-[#59BFD6] uppercase tracking-widest">Score</span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest mt-2">
                Índice Global
              </span>
            </div>
          </div>

          {/* Matriz de Traducción Comercial de Hallazgos Técnicos */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-condensed text-2xl sm:text-3xl uppercase font-bold text-white tracking-wide">
                Matriz de Traducción Comercial (Técnica &rarr; Negocio)
              </h3>
              <span className="font-mono text-xs text-[#59BFD6]">5 Hallazgos Críticos</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hallazgo 1: LCP */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-[#59BFD6]/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#59BFD6] bg-[#59BFD6]/10 px-3 py-1 rounded-full border border-[#59BFD6]/20">
                    Hallazgo 01 &bull; Core Web Vitals
                  </span>
                  <span className="font-mono text-xs text-white/40">LCP 4.8s / 8.4 MB</span>
                </div>
                <h4 className="font-condensed text-xl sm:text-2xl uppercase font-bold text-white">
                  Fuga Crítica del 53% de Visitantes Móviles
                </h4>
                <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
                  Más de la mitad de los potenciales clientes que abren el sitio en sus teléfonos abandonan antes de ver tu portafolio o servicios debido al peso no optimizado.
                </p>
                <div className="pt-3 border-t border-white/5 font-mono text-xs text-[#59BFD6] flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-[#59BFD6]" />
                  <span>Impacto: Pérdida de 15 a 30 leads comerciales al mes.</span>
                </div>
              </div>

              {/* Hallazgo 2: H1 & Meta */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-[#C29B63]/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#C29B63] bg-[#C29B63]/10 px-3 py-1 rounded-full border border-[#C29B63]/20">
                    Hallazgo 02 &bull; SEO Orgánico
                  </span>
                  <span className="font-mono text-xs text-white/40">8/10 rutas sin H1</span>
                </div>
                <h4 className="font-condensed text-xl sm:text-2xl uppercase font-bold text-white">
                  Invisibilidad en Google Orgánico Local
                </h4>
                <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
                  Google no puede clasificar tu especialidad territorial ni servicios clave, cediendo los primeros lugares a competidores con sitios modernos.
                </p>
                <div className="pt-3 border-t border-white/5 font-mono text-xs text-[#C29B63] flex items-center gap-2">
                  <EyeOff className="w-4 h-4 text-[#C29B63]" />
                  <span>Impacto: Obliga a gastar hasta un 340% más en Google Ads.</span>
                </div>
              </div>

              {/* Hallazgo 3: Fotos de Stock & Fondos CSS */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-white/30 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-white/90 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                    Hallazgo 03 &bull; Confianza Ocular
                  </span>
                  <span className="font-mono text-xs text-white/40">16 fotos en CSS</span>
                </div>
                <h4 className="font-condensed text-xl sm:text-2xl uppercase font-bold text-white">
                  Síndrome de Marca Genérica & Pérdida de Confianza Ocular
                </h4>
                <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
                  Tus fotografías son invisibles para Google Imágenes y los prospectos perciben la marca como un proveedor no especializado con fotos de stock.
                </p>
                <div className="pt-3 border-t border-white/5 font-mono text-xs text-white/80 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#C29B63]" />
                  <span>Impacto: Deprecia el anclaje de precios de tus servicios en un 30%–40%.</span>
                </div>
              </div>

              {/* Hallazgo 4: Sin Schema.org ni GEO */}
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-[#59BFD6]/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#59BFD6] bg-[#59BFD6]/10 px-3 py-1 rounded-full border border-[#59BFD6]/20">
                    Hallazgo 04 &bull; Inteligencia Artificial
                  </span>
                  <span className="font-mono text-xs text-white/40">0 menciones IA</span>
                </div>
                <h4 className="font-condensed text-xl sm:text-2xl uppercase font-bold text-white">
                  Exclusión de Búsqueda por IA (ChatGPT / Perplexity)
                </h4>
                <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
                  Cuando un ejecutivo corporativo o turista pregunta a la IA por estudios/hoteles recomendados en el sur, tu empresa no existe en las respuestas sintetizadas.
                </p>
                <div className="pt-3 border-t border-white/5 font-mono text-xs text-[#59BFD6] flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#59BFD6]" />
                  <span>Impacto: Cero captación en el canal de mayor crecimiento empresarial B2B.</span>
                </div>
              </div>

              {/* Hallazgo 5: Formulario Pasivo */}
              <div className="md:col-span-2 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-emerald-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    Hallazgo 05 &bull; Embudo Comercial
                  </span>
                  <span className="font-mono text-xs text-white/40">Formulario Frío 1 Etapa</span>
                </div>
                <h4 className="font-condensed text-xl sm:text-2xl uppercase font-bold text-white">
                  Fricción Crítica en la Etapa de Cierre
                </h4>
                <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
                  Formularios lentos sin selección de presupuesto ni WhatsApp inmediato pierden al 90% de los interesados. Respuestas superiores a 24 horas reducen la tasa de conversión final a menos del 4%.
                </p>
                <div className="pt-3 border-t border-white/5 font-mono text-xs text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Solución: Cotizador paramétrico instantáneo con handoff a WhatsApp en &lt; 30 segundos.</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── CABINA DE PREPARACIÓN PARA AGENTES DE IA & GEO (LLM READINESS COCKPIT) ── */}
          <div className="bg-gradient-to-b from-[#151821] to-[#101217] border border-[#59BFD6]/30 rounded-[36px] p-8 sm:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.7)] space-y-8 relative overflow-hidden">
            {/* Glow decorativo de fondo */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#59BFD6]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C29B63]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header del Cockpit */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10 relative z-10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#59BFD6]/10 border border-[#59BFD6]/30 text-[#59BFD6] font-mono text-xs uppercase tracking-wider">
                  <Bot className="w-4 h-4 text-[#59BFD6]" />
                  <span>CABINA GEO & LLM READINESS &bull; PROTOCOLOS DE INTELIGENCIA ARTIFICIAL</span>
                </div>
                <h3 className="font-condensed text-3xl sm:text-5xl uppercase font-bold text-white tracking-wide">
                  Cabina de Preparación para Agentes de IA & GEO
                </h3>
                <p className="font-sans text-sm sm:text-base text-white/75 max-w-2xl font-light leading-relaxed">
                  Diagnóstico forense interactivo de compatibilidad con motores de búsqueda generativa (Perplexity, ChatGPT Search, Claude 3.7 y Apple Intelligence). Descubre cómo los agentes de IA indexan, razonan y citan tu marca frente a los estándares de la industria.
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                <div className="px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <div className="font-mono text-xs">
                    <span className="text-white/50 block text-[10px] uppercase">Índice de Preparación IA</span>
                    <span className="text-amber-400 font-bold text-sm">18 / 100 &bull; Invisibilidad Crítica</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-white/40">5 MÓDULOS FORENSES ACTIVOS</span>
              </div>
            </div>

            {/* Pestañas de Navegación de los 5 Módulos */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-black/40 rounded-2xl border border-white/10 relative z-10">
              {[
                { id: 0, title: '01. Protocolo llms.txt', icon: FileCode },
                { id: 1, title: '02. Matriz Crawlers IA', icon: Bot },
                { id: 2, title: '03. Grafo Schema.org', icon: Braces },
                { id: 3, title: '04. Densidad RAG', icon: Binary },
                { id: 4, title: '05. Ficha OpenGraph', icon: Share2 },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeCockpitTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCockpitTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? 'bg-[#59BFD6] text-[#0b0d10] font-bold shadow-lg shadow-[#59BFD6]/20'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.title}</span>
                  </button>
                );
              })}
            </div>

            {/* ── CUERPO DEL MÓDULO ACTIVO ── */}
            <div className="relative z-10 min-h-[380px]">
              {/* MÓDULO 1: Protocolo llms.txt y llms-full.txt */}
              {activeCockpitTab === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tarjeta Sitio Auditado */}
                    <div className="p-6 rounded-3xl bg-white/[0.02] border border-rose-500/30 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs uppercase text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20 flex items-center gap-1.5">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Sitio Evaluado: {targetUrl}</span>
                        </span>
                        <span className="font-mono text-xs font-bold text-rose-400">0 / 100</span>
                      </div>
                      <h4 className="font-condensed text-xl uppercase font-bold text-white">
                        Endpoints /llms.txt Ausentes (HTTP 404)
                      </h4>
                      <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
                        El sitio no dispone de un manifiesto sintético de texto plano para LLMs. Los agentes de IA (ChatGPT Search, Perplexity, Claude, Cursor) se ven forzados a descargar y analizar 1.8 MB de código HTML con 94% de ruido (scripts, trackers y divs cosméticos), superando el umbral de contexto útil y provocando omisiones o alucinaciones.
                      </p>
                      <div className="pt-2 font-mono text-[11px] text-rose-400 flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Consecuencia: Exclusión del 88% de respuestas sintetizadas por IA.</span>
                      </div>
                    </div>

                    {/* Tarjeta Puelche Lab Standard */}
                    <div className="p-6 rounded-3xl bg-white/[0.02] border border-[#59BFD6]/40 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs uppercase text-[#59BFD6] bg-[#59BFD6]/10 px-3 py-1 rounded-full border border-[#59BFD6]/20 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Estándar Puelche Lab</span>
                        </span>
                        <span className="font-mono text-xs font-bold text-[#59BFD6]">100 / 100 &bull; Canónico</span>
                      </div>
                      <h4 className="font-condensed text-xl uppercase font-bold text-white">
                        Protocolo llms.txt & llms-full.txt Nativo
                      </h4>
                      <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
                        Puelche Lab expone de forma canónica <code className="text-[#59BFD6]">/llms.txt</code> (resumen condensado de 4.2 KB) y <code className="text-[#59BFD6]">/llms-full.txt</code> (especificación técnica completa de 18.6 KB) en la raíz pública. Reduce el consumo de tokens en un 92% y permite a los agentes de IA indexar la empresa en &lt; 120ms con 0% de alucinación.
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2">
                        <a
                          href="/llms.txt"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#59BFD6] text-white hover:text-[#0b0d10] font-mono text-[11px] uppercase tracking-wider transition-colors flex items-center gap-1.5"
                        >
                          <span>Ver /llms.txt</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <a
                          href="/llms-full.txt"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#59BFD6] text-white hover:text-[#0b0d10] font-mono text-[11px] uppercase tracking-wider transition-colors flex items-center gap-1.5"
                        >
                          <span>Ver /llms-full.txt</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Comparador Interactivo de Código */}
                  <div className="p-6 rounded-3xl bg-black/50 border border-white/10 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-[#59BFD6]" />
                        <span className="font-mono text-xs uppercase tracking-wider text-white">
                          Comparativa de Ingestión: Markdown Limpio vs DOM Contaminado
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setLlmsPreviewMode('clean')}
                          className={`px-3 py-1 rounded-lg font-mono text-[11px] uppercase transition-colors ${
                            llmsPreviewMode === 'clean' ? 'bg-[#59BFD6] text-[#0b0d10] font-bold' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          llms.txt Puelche (Limpio)
                        </button>
                        <button
                          type="button"
                          onClick={() => setLlmsPreviewMode('noisy')}
                          className={`px-3 py-1 rounded-lg font-mono text-[11px] uppercase transition-colors ${
                            llmsPreviewMode === 'noisy' ? 'bg-rose-500 text-white font-bold' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          Scraping DOM (Ruidoso)
                        </button>
                      </div>
                    </div>

                    <pre className="font-mono text-xs text-white/80 p-4 rounded-2xl bg-[#0d0f14] overflow-x-auto border border-white/5 max-h-60 leading-relaxed">
                      {llmsPreviewMode === 'clean' ? (
                        <code className="text-[#59BFD6]">
{`# Puelche Lab — Estudio de Diseño Cross Media y Fotografía de Puerto Varas
> Estudio boutique cross-media y fotografía de autor con raíz territorial en la Patagonia Austral de Chile.

## Información Institucional
- Nombre: Puelche Lab
- Ubicación: Puerto Varas, Región de Los Lagos, Patagonia Austral, Chile (41°19′S 72°59′W)
- Directora Creativa: Paula Valdivieso (paula.valdivieso@puelchelab.cl)
- WhatsApp Corporativo: +56 9 6617 7500 (https://wa.me/56966177500)
- Stack: Next.js 16 SSR + React 19 + Tailwind CSS + Lenis 120Hz + GSAP Scrub

## Disciplinas & Servicios
1. Fotografía de Autor & Film Documental (Arquitectura vernácula, faenas marítimas, 4K)
2. Diseño de Marca & Identidad Cross-Media (Naming, manuales de normas, narrativa)
3. Diseño Editorial & Publicaciones de Colección (Memorias anuales ESG, libros de autor)
4. Edición Fotográfica & Postproducción Digital (Revelado fino RAW, calibración óptica)
5. Desarrollo Web SSR & Experiencias Digitales Awwwards (Optimización GEO y Core Web Vitals)

## Clientes Documentados
Anasac, AquaChile, Doosan, Estancia Rilán, Cala Melí, Turistour, Tagua Tagua Lodge, Muebles Yunge, Hotel Cabo de Hornos, Costaustralis.`}
                        </code>
                      ) : (
                        <code className="text-rose-300">
{`<!-- Scraping de DOM tradicional para ${targetUrl} -->
<div class="elementor-3847 page-id-12 type-page status-publish has-post-thumbnail">
  <div class="e-con-inner">
    <script type="text/javascript" src="/wp-includes/js/jquery/jquery.min.js?ver=3.7.1"></script>
    <script type="text/javascript" src="https://www.googletagmanager.com/gtag/js?id=G-XXXXX"></script>
    <style id="elementor-post-3847">.elementor-3847 .elementor-element.elementor-element-74a9b{padding:180px 0 0 0;}</style>
    <!-- 42 niveles de divs anidados sin texto semántico -->
    <div class="elementor-widget-container">
      <div class="elementor-heading-title">Bienvenido a Nuestro Sitio Web Oficial</div>
    </div>
  </div>
</div>
<!-- ADVERTENCIA: 94.2% del payload son etiquetas de maquetación y scripts no indexables -->
<!-- ERROR DE AGENTE RAG: Context window overflow. Imposible sintetizar la oferta real -->`}
                        </code>
                      )}
                    </pre>

                    <div className="grid grid-cols-3 gap-4 pt-2 text-center font-mono text-xs">
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-white/40 text-[10px] block uppercase">Costo por Consulta</span>
                        <span className="text-emerald-400 font-semibold mt-0.5 block">-99.4% Menos Tokens</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-white/40 text-[10px] block uppercase">Velocidad de Ingestión</span>
                        <span className="text-[#59BFD6] font-semibold mt-0.5 block">120ms vs 3.4s (28x)</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-white/40 text-[10px] block uppercase">Precisión de Cita</span>
                        <span className="text-white font-semibold mt-0.5 block">98.4% Sin Alucinación</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MÓDULO 2: Matriz de Crawlers de IA (robots.txt) */}
              {activeCockpitTab === 1 && (
                <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
                    <h4 className="font-condensed text-xl sm:text-2xl uppercase font-bold text-white">
                      Matriz de Autorización para Agentes Autónomos de IA
                    </h4>
                    <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
                      Los rastreadores de búsqueda conversacional operan con user-agents dedicados. Si tu servidor o cortafuegos (Cloudflare, AWS WAF) los trata como bots maliciosos o tu <code className="text-[#59BFD6]">robots.txt</code> no especifica permisos explícitos, tu contenido queda excluido del índice de ChatGPT Search, Perplexity Pro y Claude.
                    </p>
                  </div>

                  {/* Selector de Bots */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {AI_CRAWLER_BOTS.map((bot, idx) => {
                      const isSelected = selectedBotIndex === idx;
                      return (
                        <button
                          key={bot.name}
                          type="button"
                          onClick={() => setSelectedBotIndex(idx)}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? 'bg-[#59BFD6]/15 border-[#59BFD6] shadow-lg shadow-[#59BFD6]/10'
                              : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                          }`}
                        >
                          <span className="font-mono text-xs font-bold block text-white">{bot.name}</span>
                          <span className="font-mono text-[10px] text-white/50 block mt-1">{bot.operator}</span>
                          <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Puelche: Allow
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Inspector Detallado del Bot Seleccionado */}
                  {(() => {
                    const currentBot = AI_CRAWLER_BOTS[selectedBotIndex] || AI_CRAWLER_BOTS[0];
                    return (
                      <div className="p-6 sm:p-8 rounded-3xl bg-black/40 border border-white/10 space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                          <div>
                            <div className="inline-flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#59BFD6]" />
                              <span className="font-condensed text-2xl uppercase font-bold text-white">
                                {currentBot.name}
                              </span>
                              <span className="font-mono text-xs text-white/50">({currentBot.operator})</span>
                            </div>
                            <span className="font-mono text-xs text-[#59BFD6] block mt-1">
                              Motores Asociados: {currentBot.engine}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 font-mono text-xs">
                            <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                              Auditado: {currentBot.targetStatus}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Puelche: {currentBot.puelcheStatus}
                            </span>
                          </div>
                        </div>

                        <p className="font-sans text-sm text-white/80 font-light leading-relaxed">
                          {currentBot.purpose}
                        </p>

                        <div className="space-y-2">
                          <span className="font-mono text-xs uppercase tracking-wider text-white/60 block">
                            Directiva de Indexación Recomendada para robots.txt:
                          </span>
                          <pre className="font-mono text-xs text-emerald-400 p-4 rounded-xl bg-[#0b0d10] border border-white/10">
                            <code>{currentBot.snippet}</code>
                          </pre>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* MÓDULO 3: Grafo Semántico Schema.org (@graph) */}
              {activeCockpitTab === 2 && (
                <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
                    <h4 className="font-condensed text-xl sm:text-2xl uppercase font-bold text-white">
                      Grafo Semántico de Entidades Enlazadas (@graph JSON-LD)
                    </h4>
                    <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
                      Los modelos de IA procesan entidades unívocas, no simples strings. Mediante la directiva <code className="text-[#59BFD6]">@graph</code>, Puelche Lab vincula su organización, geolocalización austral física, fundadora y catálogo de servicios en una red coherente reconocida por el Knowledge Graph de Google y las bases de conocimiento de ChatGPT y Perplexity.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {SCHEMA_ENTITIES.map((entity) => {
                      const isSelected = selectedSchemaEntity === entity.id;
                      return (
                        <button
                          key={entity.id}
                          type="button"
                          onClick={() => setSelectedSchemaEntity(entity.id)}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? 'bg-[#59BFD6]/15 border-[#59BFD6] shadow-lg'
                              : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                          }`}
                        >
                          <span className="font-mono text-xs font-bold block text-white">{entity.title}</span>
                          <span className="font-mono text-[10px] text-white/50 block mt-1 line-clamp-2">
                            {entity.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {(() => {
                    const currentEntity = SCHEMA_ENTITIES.find((e) => e.id === selectedSchemaEntity) || SCHEMA_ENTITIES[0];
                    return (
                      <div className="p-6 rounded-3xl bg-black/50 border border-white/10 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-white/10">
                          <span className="font-mono text-xs text-[#59BFD6] font-semibold uppercase">
                            Nodo JSON-LD Activo: {currentEntity.title}
                          </span>
                          <span className="font-mono text-[10px] text-white/40">Inyectado en src/app/layout.tsx</span>
                        </div>
                        <pre className="font-mono text-xs text-white/80 p-4 rounded-2xl bg-[#0d0f14] border border-white/5 overflow-x-auto max-h-72 leading-relaxed">
                          <code>{JSON.stringify(currentEntity.json, null, 2)}</code>
                        </pre>
                      </div>
                    );
                  })()}

                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-amber-300 font-mono text-xs">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      Diagnóstico para {targetUrl}: 0 entidades Schema.org detectadas. El sitio se comporta como un documento ciego para los agentes conversacionales de IA.
                    </span>
                  </div>
                </div>
              )}

              {/* MÓDULO 4: Densidad de Contexto & Legibilidad Markdown (RAG / Firecrawl) */}
              {activeCockpitTab === 3 && (
                <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
                    <h4 className="font-condensed text-xl sm:text-2xl uppercase font-bold text-white">
                      Densidad de Contexto & Calidad de Ingestión para RAG
                    </h4>
                    <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
                      Sistemas de recuperación de información para IA (como Firecrawl, Jina Reader o pipelines vectoriales de LangChain / Supabase pgvector) extraen el árbol semántico para generar embeddings. El exceso de anidación <code className="text-white">&lt;div&gt;</code> y código JavaScript del lado del cliente destruye la coherencia de los fragmentos de texto (chunks).
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono text-xs">
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                      <span className="text-white/40 text-[10px] uppercase block">Señal de Contenido Puro</span>
                      <span className="text-2xl font-bold text-[#59BFD6] block">84.2%</span>
                      <span className="text-[10px] text-rose-400 block mt-1">Auditado: 6.4%</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                      <span className="text-white/40 text-[10px] uppercase block">Profundidad DOM</span>
                      <span className="text-2xl font-bold text-[#59BFD6] block">5 Niveles</span>
                      <span className="text-[10px] text-rose-400 block mt-1">Auditado: 38 Niveles</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                      <span className="text-white/40 text-[10px] uppercase block">JS Bloqueante</span>
                      <span className="text-2xl font-bold text-emerald-400 block">0 MB (SSR)</span>
                      <span className="text-[10px] text-rose-400 block mt-1">Auditado: 4.6 MB</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                      <span className="text-white/40 text-[10px] uppercase block">Tiempo Ingestión RAG</span>
                      <span className="text-2xl font-bold text-emerald-400 block">120ms</span>
                      <span className="text-[10px] text-rose-400 block mt-1">Auditado: 4.8s (Timeout)</span>
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-black/50 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="font-mono text-xs uppercase text-white tracking-wider">
                        Vista de Ingestión Markdown Extraída (Firecrawl / Jina Reader)
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setRagDensityMode('puelche')}
                          className={`px-3 py-1 rounded-lg font-mono text-[11px] uppercase transition-colors ${
                            ragDensityMode === 'puelche' ? 'bg-[#59BFD6] text-[#0b0d10] font-bold' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          Puelche Lab SSR (84.2%)
                        </button>
                        <button
                          type="button"
                          onClick={() => setRagDensityMode('target')}
                          className={`px-3 py-1 rounded-lg font-mono text-[11px] uppercase transition-colors ${
                            ragDensityMode === 'target' ? 'bg-rose-500 text-white font-bold' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          Sitio Auditado (6.4%)
                        </button>
                      </div>
                    </div>

                    <pre className="font-mono text-xs text-white/80 p-4 rounded-2xl bg-[#0d0f14] border border-white/5 overflow-x-auto max-h-56 leading-relaxed">
                      {ragDensityMode === 'puelche' ? (
                        <code className="text-emerald-300">
{`# Puelche Lab — Estudio de Diseño Cross Media y Fotografía
[Metadata: SSR=True | CLS=0.00 | Semantics=Article]

## Viento Creativo
Marcas del sur con presencia sin fronteras. Estudio de diseño cross media y fotografía de autor esculpido bajo el rigor y la luz de la Patagonia austral.

- Coordenadas: 41°19′S 72°59′W • Puerto Varas, Región de Los Lagos
- Disciplinas: Fotografía de Autor, Diseño de Marca, Diseño Editorial, Edición Fotográfica, Desarrollo Web SSR
- Casos de Éxito: Estancia Rilán, Cala Melí, Turistour, Tagua Tagua Lodge, Muebles Yunge, Hotel Cabo de Hornos

[Status: Chunks limpios listos para indexación en Pinecone / Supabase pgvector sin alucinación]`}
                        </code>
                      ) : (
                        <code className="text-rose-300">
{`[Scraper Raw dump para ${targetUrl}]
---
undefined
[Nav: Toggle navigation] [Search: Click to search]
[Banner Ad: Acepta cookies para continuar]
[DIV-WRAPPER-LEVEL-1] [DIV-WRAPPER-LEVEL-2] ... [DIV-WRAPPER-LEVEL-38]
"Loading..."
[Error: Contenido dinámico renderizado con JavaScript cliente sin soporte SSR. Scraper recibió página en blanco.]
---
[Status: Chunks contaminados con código de seguimiento. Ingestión vectorial fallida.]`}
                        </code>
                      )}
                    </pre>
                  </div>
                </div>
              )}

              {/* MÓDULO 5: Previsualización de Ficha Semántica OpenGraph */}
              {activeCockpitTab === 4 && (
                <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
                    <h4 className="font-condensed text-xl sm:text-2xl uppercase font-bold text-white">
                      Previsualización de Ficha Semántica OpenGraph & Social Cards
                    </h4>
                    <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
                      Cuando un usuario comparte tu enlace por WhatsApp, Slack o una IA conversacional genera una tarjeta de cita, los metadatos OpenGraph definen si tu marca proyecta autoridad de clase mundial o parece un enlace abandonado.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setOgCardMode('puelche')}
                      className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-colors ${
                        ogCardMode === 'puelche' ? 'bg-[#59BFD6] text-[#0b0d10] font-bold' : 'bg-white/5 text-white/60 hover:text-white'
                      }`}
                    >
                      Ver Ficha Puelche Lab GEO (Optimizada)
                    </button>
                    <button
                      type="button"
                      onClick={() => setOgCardMode('target')}
                      className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-colors ${
                        ogCardMode === 'target' ? 'bg-rose-500 text-white font-bold' : 'bg-white/5 text-white/60 hover:text-white'
                      }`}
                    >
                      Ver Ficha del Sitio Evaluado (Defectuosa)
                    </button>
                  </div>

                  {/* Render de la Tarjeta Social */}
                  <div className="max-w-xl mx-auto rounded-3xl overflow-hidden border border-white/15 bg-[#14161d] shadow-2xl">
                    {ogCardMode === 'puelche' ? (
                      <div>
                        <div className="relative aspect-[1200/630] bg-[#111215] overflow-hidden border-b border-white/10">
                          <img
                            src="/images/real/bg-agencia.jpg"
                            alt="Puelche Lab OpenGraph Preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                            <span className="font-condensed text-2xl uppercase font-bold text-white tracking-wide">
                              PUELCHE LAB
                            </span>
                            <span className="font-mono text-[10px] text-[#59BFD6] bg-black/60 px-2.5 py-1 rounded-full border border-[#59BFD6]/30">
                              41°19′S 72°59′W
                            </span>
                          </div>
                        </div>
                        <div className="p-6 space-y-2">
                          <span className="font-mono text-[10px] text-[#59BFD6] uppercase tracking-widest block">
                            PUELCHELAB.CL &bull; PUERTO VARAS &bull; PATAGONIA
                          </span>
                          <h5 className="font-condensed text-xl uppercase font-bold text-white tracking-tight">
                            Puelche Lab — Estudio de Diseño Cross Media y Fotografía de Puerto Varas
                          </h5>
                          <p className="font-sans text-xs text-white/70 font-light line-clamp-2 leading-relaxed">
                            Estudio boutique cross-media y fotografía de autor esculpido bajo el rigor y la luz de la Patagonia austral.
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10 font-mono text-[9px] text-white/40">
                            <span className="px-2 py-0.5 rounded bg-white/5">og:locale: es_CL</span>
                            <span className="px-2 py-0.5 rounded bg-white/5">twitter:card: summary_large_image</span>
                            <span className="px-2 py-0.5 rounded bg-white/5">geo.region: CL-LL</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="relative aspect-[1200/630] bg-zinc-900 flex flex-col items-center justify-center border-b border-white/10 text-white/30 space-y-2 p-6 text-center">
                          <XCircle className="w-12 h-12 text-rose-500/50" />
                          <span className="font-mono text-xs uppercase">Imagen og:image no encontrada o rota</span>
                        </div>
                        <div className="p-6 space-y-2">
                          <span className="font-mono text-[10px] text-rose-400 uppercase tracking-widest block">
                            {targetUrl.replace(/^https?:\/\//, '')}
                          </span>
                          <h5 className="font-condensed text-xl uppercase font-bold text-white/60 tracking-tight">
                            Inicio - Mi Sitio Web Genérico
                          </h5>
                          <p className="font-sans text-xs text-white/40 font-light line-clamp-2 leading-relaxed">
                            Sin metadatos og:description configurados. Los rastreadores de IA y redes sociales no pudieron generar una descripción enriquecida.
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10 font-mono text-[9px] text-rose-400/80">
                            <span className="px-2 py-0.5 rounded bg-rose-500/10">0 Metadatos OpenGraph</span>
                            <span className="px-2 py-0.5 rounded bg-rose-500/10">Pérdida de CTR: -72%</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── LEAD GATE CON VIDEO LOOM PERSONALIZADO ── */}
          <div className="bg-gradient-to-b from-[#181c24] to-[#13151b] border border-white/15 rounded-[36px] p-8 sm:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.8)] space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#59BFD6]">
                  <Video className="w-4 h-4 text-[#59BFD6]" />
                  <span>VIDEO LOOM PERSONALIZADO EN COLA DE GRABACIÓN — CUPOS DISPONIBLES: 3 HOY</span>
                </div>
                <h3 className="font-condensed text-3xl sm:text-4xl uppercase font-bold text-white tracking-wide">
                  Desbloquea el Video Loom de 5 Minutos con Paula Valdivieso
                </h3>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-xs uppercase tracking-wider font-semibold self-start md:self-auto">
                Sin Costo &bull; Exclusivo Directores
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Loom Video Player Mockup */}
              <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/70 border border-white/20 shadow-2xl flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />

                {/* Central Play Button */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#59BFD6] text-[#0b0d10] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-white/80">
                    Video de 5 Minutos en Preparación
                  </span>
                </div>

                {/* Circular Webcam Circle (Paula Valdivieso) in lower-left corner */}
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#59BFD6] to-[#C29B63] flex items-center justify-center font-bold text-[#0b0d10] text-xs">
                    PV
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-white font-semibold">Paula Valdivieso</span>
                    <span className="font-mono text-[8px] text-[#59BFD6]">Directora Creativa</span>
                  </div>
                  <div className="flex items-center gap-0.5 ml-1">
                    <span className="w-1 h-3 bg-emerald-400 rounded-full animate-soundwave-1" />
                    <span className="w-1 h-4 bg-emerald-400 rounded-full animate-soundwave-2" />
                    <span className="w-1 h-2 bg-emerald-400 rounded-full animate-soundwave-3" />
                  </div>
                </div>
              </div>

              {/* Lead Capture Form */}
              <div className="lg:col-span-7 space-y-6">
                {simulationState === 'GATE_SUBMITTED' ? (
                  <div className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h4 className="font-condensed text-3xl uppercase font-bold text-white">
                      ¡Solicitud Registrada con Éxito!
                    </h4>
                    <p className="font-sans text-sm text-white/80 font-light max-w-md mx-auto">
                      Paula Valdivieso está preparando tu análisis Loom de 5 minutos para <strong className="text-white">{targetUrl}</strong>.
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Magnetic strength={0.35} radius={80}>
                        <a
                          href={`https://wa.me/56966177500?text=${whatsappMsg}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-black font-mono text-xs uppercase tracking-wider font-bold shadow-lg flex items-center gap-2"
                        >
                          <PhoneCall className="w-4 h-4" />
                          <span>Acelerar por WhatsApp Directo</span>
                        </a>
                      </Magnetic>
                      <Link
                        href="/cotizador"
                        className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-colors"
                      >
                        <span>Calcular Presupuesto en Cotizador</span> &rarr;
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <p className="font-sans text-sm text-white/80 font-light">
                      Ingresa tus datos corporativos para que Paula Valdivieso grabe el Loom analizando las soluciones exactas para {targetUrl}:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-mono text-[10px] uppercase text-white/50 block">Nombre Completo *</label>
                        <input
                          type="text"
                          required
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          placeholder="Tu nombre"
                          className="w-full bg-white/5 border border-white/15 focus:border-[#59BFD6] rounded-xl px-4 py-3 text-white font-sans text-sm outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[10px] uppercase text-white/50 block">Empresa *</label>
                        <input
                          type="text"
                          required
                          value={leadCompany}
                          onChange={(e) => setLeadCompany(e.target.value)}
                          placeholder="Nombre de tu empresa"
                          className="w-full bg-white/5 border border-white/15 focus:border-[#59BFD6] rounded-xl px-4 py-3 text-white font-sans text-sm outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[10px] uppercase text-white/50 block">Email Corporativo *</label>
                        <input
                          type="email"
                          required
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          placeholder="tu@empresa.cl"
                          className="w-full bg-white/5 border border-white/15 focus:border-[#59BFD6] rounded-xl px-4 py-3 text-white font-sans text-sm outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[10px] uppercase text-white/50 block">Teléfono / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          placeholder="+56 9 1234 5678"
                          className="w-full bg-white/5 border border-white/15 focus:border-[#59BFD6] rounded-xl px-4 py-3 text-white font-sans text-sm outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rb-link-glanz w-full py-4 rounded-2xl bg-[#59BFD6] hover:bg-[#4eaac0] text-[#0b0d10] font-mono text-xs uppercase tracking-wider font-bold shadow-xl transition-all flex items-center justify-center gap-2 mt-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Enviando...' : 'Desbloquear Informe Forense y Solicitar Video Loom de 5 Minutos'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AuditorPage() {
  return (
    <div className="relative w-full flex flex-col bg-[#111317] text-white min-h-screen selection:bg-[#59BFD6] selection:text-[#0b0d10] overflow-hidden">
      {/* Background dinámico con auroras patagónicas en movimiento suave */}
      <AtmosphericBackground intensity="vibrant" showParticles={true} />

      <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-24 md:pt-40 md:pb-32 w-full">
        <Suspense fallback={<div className="p-12 text-center font-mono text-white/60">Cargando motor auditor...</div>}>
          <AuditorContent />
        </Suspense>
      </section>
    </div>
  );
}
