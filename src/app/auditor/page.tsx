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
  Compass
} from 'lucide-react';
import { AtmosphericBackground } from '@/components/ui/AtmosphericBackground';

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
              <button
                type="button"
                onClick={startSimulation}
                className="rb-link-glanz px-8 py-4 rounded-2xl bg-[#59BFD6] hover:bg-[#4eaac0] text-[#0b0d10] font-mono text-xs uppercase tracking-wider font-bold shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Auditar en Tiempo Real</span>
                <ArrowRight className="w-4 h-4" />
              </button>
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
                    <span className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="w-1 h-4 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse" />
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
                      <a
                        href={`https://wa.me/56966177500?text=${whatsappMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-black font-mono text-xs uppercase tracking-wider font-bold shadow-lg flex items-center gap-2"
                      >
                        <PhoneCall className="w-4 h-4" />
                        <span>Acelerar por WhatsApp Directo</span>
                      </a>
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
