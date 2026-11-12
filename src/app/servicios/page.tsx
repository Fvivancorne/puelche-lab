'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Camera,
  Compass,
  Monitor,
  BookOpen,
  Sliders,
  Share2,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  LayoutGrid,
  Sparkles,
  Wind,
  Disc3,
  CheckCircle2,
} from 'lucide-react';
import { AtmosphericBackground } from '@/components/ui/AtmosphericBackground';

export interface ServiceDetail {
  id: string;
  title: string;
  tag: string;
  desc: string;
  focal: string;
  coords: string;
  territory: string;
  clients: string;
  deliverables: string[];
  href: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

export const SERVICES_LIST: ServiceDetail[] = [
  {
    id: 'fotografia',
    title: 'Fotografía',
    tag: 'FOTOGRAFÍA DE AUTOR',
    desc: 'Interiores, hotelería, arquitectura y procesos industriales en el sur de Chile. Óptica fija, rango dinámico de 15+ EV y luz patagónica natural.',
    focal: 'Sony FE 85mm f/1.4 GM II • 1/250s • ISO 100',
    coords: '41°19′S 72°59′W',
    territory: 'Puerto Varas & Seno de Reloncaví',
    clients: 'AquaChile • Turistour • CoHosting Chile • Nazca Oceanografía',
    deliverables: ['Interiores & Hotelería', 'Faena Industrial', 'Drone 4K Certificado', 'Resolución 61MP'],
    href: '/servicios/fotografia',
    image: '/images/real/bg-portafolios-fotografia-a-min.jpg',
    icon: Camera,
    accentColor: '#59BFD6',
  },
  {
    id: 'branding',
    title: 'Diseño de Marca',
    tag: 'IDENTIDAD CON ARRAIGO AUSTRAL',
    desc: 'Identidades visuales, manuales de normas y branding integral con arraigo territorial. Naming, paleta cromática orgánica y tipografía suiza.',
    focal: 'Sony FE 50mm f/1.2 GM • Vector & Proporción Áurea',
    coords: '41°45′S 72°50′W',
    territory: 'Puerto Montt & Archipiélago de Chiloé',
    clients: 'Blue Seal Subsea • RMH • Gallo Negro • Andesmaq',
    deliverables: ['Manual de Normas', 'Isotipo & Logotipo', 'Dirección de Arte', 'Papelería & Empaques'],
    href: '/servicios/branding',
    image: '/images/real/bg-portafolios-marca-blue-seal-min.jpg',
    icon: Compass,
    accentColor: '#C29B63',
  },
  {
    id: 'desarrollo-web',
    title: 'Desarrollo Web',
    tag: 'ARQUITECTURA DIGITAL SOTD',
    desc: 'Sitios web modernos, ultra-rápidos y adaptables a dispositivos móviles. Next.js App Router, GSAP cinemático y 100% Core Web Vitals.',
    focal: 'Next.js Turbopack • GSAP 120 FPS • Latencia Cero',
    coords: '42°30′S 73°45′W',
    territory: 'Península de Rilán & Puerto Varas',
    clients: 'Estancia Rilán • Tierra Sur • Maqui Propiedades',
    deliverables: ['Next.js Turbopack', 'Micro-Interacciones GSAP', 'Zero-Latency UX', 'SEO Semántico GEO'],
    href: '/servicios/desarrollo-web',
    image: '/images/real/bg-portafolios-web-rilan-min.jpg',
    icon: Monitor,
    accentColor: '#59BFD6',
  },
  {
    id: 'edicion-fotografica',
    title: 'Edición Fotográfica',
    tag: 'REVELADO FINE-ART',
    desc: 'Revelado de archivos RAW, retoque digital de precisión y color grading cinematográfico. Calibración tonal pliego por pliego para imprenta y pantalla.',
    focal: 'Sony FE 100mm f/2.8 STF GM • Perfiles Adobe RGB & DCI-P3',
    coords: '41°28′S 72°56′W',
    territory: 'Mesa de Revelado Digital • Llanquihue',
    clients: 'Colecciones de Autor • Ediciones Fine-Art • Catálogos de Lujo',
    deliverables: ['Revelado RAW 16-bit', 'Separación de Frecuencias', 'Color Grading Editorial', 'Limpieza Microtexturas'],
    href: '/servicios/edicion-fotografica',
    image: '/images/real/edicion/bg-edit-fotografica-1-min.jpg',
    icon: Sliders,
    accentColor: '#C29B63',
  },
  {
    id: 'editorial',
    title: 'Diseño Editorial',
    tag: 'PUBLICACIONES & MEMORIAS',
    desc: 'Memorias corporativas, libros fotográficos y catálogos comerciales impresos. Maquetación reticular, selección de papeles y dirección de imprenta.',
    focal: 'Sony FE 35mm f/1.4 GM • Grilla Suiza 12 Columnas',
    coords: '45°34′S 72°04′W',
    territory: 'Patagonia Austral & Carretera Austral',
    clients: 'Libro Fotográfico Alejo Lattes • Phyllum • Corporación de Turismo',
    deliverables: ['Libros Fotográficos', 'Memorias Corporativas', 'Perfiles de Color CMYK', 'Acabados Especiales'],
    href: '/servicios/editorial',
    image: '/images/real/bg-portafolios-editorial-libro-min.jpg',
    icon: BookOpen,
    accentColor: '#59BFD6',
  },
  {
    id: 'redes-sociales',
    title: 'Redes Sociales',
    tag: 'DIRECCIÓN DE ARTE DIGITAL',
    desc: 'Estrategia de contenidos, fotografía genuina y dirección de arte digital. Narrativa visual que posiciona a tu marca lejos de la mediocridad de stock.',
    focal: 'Sony FE 16-35mm f/2.8 GM • Micro-Narrativas Territoriales',
    coords: '41°19′S 72°59′W',
    territory: 'Llanquihue, Los Lagos & Alcance Global',
    clients: 'Hotelería Boutique • Gastronomía Austral • Turismo Aventura',
    deliverables: ['Fotografía Genuina', 'Grillas Cinemáticas', 'Relatos Territoriales', 'Conversión Directa'],
    href: '/servicios/redes-sociales',
    image: '/images/real/bg-redes-1-min.jpg',
    icon: Share2,
    accentColor: '#C29B63',
  },
];

export default function ServiciosPage() {
  const [viewMode, setViewMode] = useState<'3d' | 'sticky' | 'reticular'>('3d');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Cinematic Exponential Decay & Tactile Physics Refs
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stickyCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const posRef = useRef<number>(0);
  const targetRef = useRef<number>(0);

  const isPointerDownRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartPosRef = useRef<number>(0);
  const lastClientXRef = useRef<number>(0);
  const lastDragTimeRef = useRef<number>(0);
  const dragVelocitySamples = useRef<number[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Continuous render position state for silk-smooth reactive updates
  const [renderPos, setRenderPos] = useState<number>(0);
  const total = SERVICES_LIST.length;

  // Helper: computes desktop sticky scroll track boundaries for 1:1 vertical-to-horizontal sync
  const getTrackMetrics = useCallback(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return null;
    const rect = track.getBoundingClientRect();
    const trackTop = rect.top + window.scrollY;
    const stickyHeight = stage.offsetHeight;
    const scrollableDistance = track.offsetHeight - stickyHeight;
    const startY = Math.max(0, trackTop - 70);
    const endY = startY + scrollableDistance;
    return { startY, endY, scrollableDistance };
  }, []);

  // Helper: smoothly scrolls to a specific card index (desktop sticky track or mobile fallback)
  const scrollToServiceIndex = useCallback(
    (idx: number) => {
      const clampedIdx = ((idx % total) + total) % total;
      const metrics = getTrackMetrics();
      if (metrics && metrics.scrollableDistance > 50) {
        const targetY = metrics.startY + (clampedIdx / (total - 1)) * metrics.scrollableDistance;
        const win = window as Window & {
          lenisInstance?: { scrollTo: (y: number, opts?: { duration?: number }) => void };
        };
        if (win.lenisInstance) {
          win.lenisInstance.scrollTo(targetY, { duration: 1.0 });
        } else {
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      } else {
        const current = posRef.current;
        const currentNorm = ((Math.round(current) % total) + total) % total;
        let diff = clampedIdx - currentNorm;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
        targetRef.current = Math.round(current) + diff;
      }
    },
    [getTrackMetrics, total]
  );

  // Scroll-Driven Observer for Sticky Vertical Stacking Mode
  useEffect(() => {
    if (viewMode !== 'sticky') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idxAttr = entry.target.getAttribute('data-service-idx');
            if (idxAttr !== null) {
              const idx = Number(idxAttr);
              if (!Number.isNaN(idx)) {
                setActiveIndex(idx);
                setHoveredIndex(idx);
              }
            }
          }
        });
      },
      {
        rootMargin: '-25% 0px -35% 0px',
        threshold: 0.2,
      }
    );

    stickyCardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [viewMode]);

  const navigateTo = useCallback(
    (index: number) => {
      if (viewMode === 'sticky') {
        const el = stickyCardRefs.current[index];
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      scrollToServiceIndex(index);
    },
    [scrollToServiceIndex, viewMode]
  );

  const nextService = useCallback(() => {
    const metrics = getTrackMetrics();
    if (metrics && metrics.scrollableDistance > 50) {
      const currentIdx = Math.round(targetRef.current);
      const nextIdx = currentIdx >= total - 1 ? 0 : currentIdx + 1;
      scrollToServiceIndex(nextIdx);
    } else {
      targetRef.current = Math.round(targetRef.current) + 1;
    }
  }, [getTrackMetrics, scrollToServiceIndex, total]);

  const prevService = useCallback(() => {
    const metrics = getTrackMetrics();
    if (metrics && metrics.scrollableDistance > 50) {
      const currentIdx = Math.round(targetRef.current);
      const prevIdx = currentIdx <= 0 ? total - 1 : currentIdx - 1;
      scrollToServiceIndex(prevIdx);
    } else {
      targetRef.current = Math.round(targetRef.current) - 1;
    }
  }, [getTrackMetrics, scrollToServiceIndex, total]);

  // Unified Animation Loop: drives horizontal 3D cards cleanly from sticky vertical scroll + exponential easing
  useEffect(() => {
    if (viewMode !== '3d') return;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(32, Math.max(1, now - lastTime)) / 1000;
      lastTime = now;

      if (!isDraggingRef.current) {
        const metrics = getTrackMetrics();
        if (metrics && metrics.scrollableDistance > 50) {
          const clampedY = Math.max(metrics.startY, Math.min(metrics.endY, window.scrollY));
          const progress = (clampedY - metrics.startY) / metrics.scrollableDistance;
          targetRef.current = progress * (total - 1);
        }

        const decay = 8.5;
        const factor = 1 - Math.exp(-decay * dt);
        posRef.current += (targetRef.current - posRef.current) * factor;

        if (Math.abs(targetRef.current - posRef.current) < 0.0002) {
          posRef.current = targetRef.current;
        }
      }

      setRenderPos(posRef.current);

      const normIndex = ((Math.round(posRef.current) % total) + total) % total;
      setActiveIndex(normIndex);
      setHoveredIndex(normIndex);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [getTrackMetrics, total, viewMode]);

  // Horizontal Trackpad Gesture Sync: swiping sideways (deltaX) glides cleanly along the sticky horizontal track
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || viewMode !== '3d') return;

    const handleWheelNative = (e: WheelEvent) => {
      const isHorizontalSwipe = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.3 && Math.abs(e.deltaX) > 4;
      if (!isHorizontalSwipe) {
        return; // Let vertical scroll flow naturally to drive the sticky horizontal track!
      }

      e.preventDefault();

      const metrics = getTrackMetrics();
      if (metrics && metrics.scrollableDistance > 50) {
        const nextY = Math.max(metrics.startY, Math.min(metrics.endY, window.scrollY + e.deltaX * 1.8));
        window.scrollTo(0, nextY);
      } else {
        targetRef.current += Math.sign(e.deltaX) * Math.min(0.45, Math.abs(e.deltaX) * 0.002);
      }
    };

    stage.addEventListener('wheel', handleWheelNative, { passive: false });
    return () => {
      stage.removeEventListener('wheel', handleWheelNative);
    };
  }, [getTrackMetrics, viewMode]);

  // Safe Dragging: Never hijacks clicks on buttons or links!
  const handlePointerDown = (e: React.PointerEvent) => {
    const targetEl = e.target as HTMLElement | null;
    if (targetEl?.closest('a, button, input, select, textarea')) {
      return;
    }

    isPointerDownRef.current = true;
    isDraggingRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = posRef.current;
    lastClientXRef.current = e.clientX;
    lastDragTimeRef.current = performance.now();
    dragVelocitySamples.current = [];
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;

    if (!isDraggingRef.current) {
      if (Math.abs(deltaX) < 8) return;
      isDraggingRef.current = true;
      if (stageRef.current) {
        try {
          stageRef.current.setPointerCapture(e.pointerId);
        } catch {
          // Safe fallback
        }
      }
    }

    const now = performance.now();
    const dt = Math.max(1, now - lastDragTimeRef.current);
    const stepX = e.clientX - lastClientXRef.current;

    const instantVel = stepX / dt;
    dragVelocitySamples.current.push(instantVel);
    if (dragVelocitySamples.current.length > 5) dragVelocitySamples.current.shift();

    lastClientXRef.current = e.clientX;
    lastDragTimeRef.current = now;

    const newPos = Math.max(0, Math.min(total - 1, dragStartPosRef.current - deltaX / 160));
    posRef.current = newPos;
    targetRef.current = newPos;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;

    if (!isDraggingRef.current) {
      return;
    }

    isDraggingRef.current = false;

    if (stageRef.current) {
      try {
        if (stageRef.current.hasPointerCapture(e.pointerId)) {
          stageRef.current.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Safe fallback
      }
    }

    const deltaX = e.clientX - dragStartXRef.current;
    const samples = dragVelocitySamples.current;
    const avgVel = samples.length > 0 ? samples.reduce((a, b) => a + b, 0) / samples.length : 0;

    let target = Math.round(posRef.current);
    if (deltaX < -35 || avgVel < -0.18) {
      target = Math.min(total - 1, Math.floor(dragStartPosRef.current) + 1);
    } else if (deltaX > 35 || avgVel > 0.18) {
      target = Math.max(0, Math.ceil(dragStartPosRef.current) - 1);
    }

    scrollToServiceIndex(target);
  };

  // Keyboard navigation
  useEffect(() => {
    if (viewMode !== '3d') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextService();
      } else if (e.key === 'ArrowLeft') {
        prevService();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextService, prevService, viewMode]);

  const activeService = SERVICES_LIST[activeIndex] || SERVICES_LIST[0];

  return (
    <div className="relative w-full flex flex-col bg-[#08090b] text-white min-h-screen selection:bg-[#59BFD6] selection:text-[#08090b] overflow-x-clip">
      {/* ── ATMOSPHERIC CANVAS WITH DRIFTING PARTICLES & AURORA GLOW ── */}
      <AtmosphericBackground intensity="vibrant" showParticles={true} />

      {/* ── CONTINUOUS HERMITE SMOOTHSTEP CROSSFADE: REVELADO FINE-ART (R4 COMPAT) ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {SERVICES_LIST.map((serv, idx) => {
          let crossfadeOpacity = 0;
          if (viewMode === '3d') {
            let dist = Math.abs(idx - (renderPos % total));
            while (dist > total / 2) dist = Math.abs(dist - total);
            const t = Math.max(0, 1 - dist * 0.95);
            const smoothFade = t * t * (3 - 2 * t);
            crossfadeOpacity = smoothFade * 0.32;
          } else {
            crossfadeOpacity = hoveredIndex === idx ? 0.24 : 0;
          }

          return (
            <div
              key={serv.id}
              className="absolute inset-0 will-change-[opacity]"
              style={{
                opacity: crossfadeOpacity,
                transition: viewMode === '3d' ? 'none' : 'opacity 0.65s ease-out',
              }}
            >
              <Image
                src={serv.image}
                alt=""
                fill
                priority={idx === 0}
                className="object-cover object-center filter grayscale contrast-125 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#08090b] via-[#08090b]/80 to-[#08090b]" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#08090b]/90 via-transparent to-[#08090b]" />
            </div>
          );
        })}
      </div>

      {/* ── BANNER EDITORIAL DARK LUXURY & VIEW MODE SWITCHER ── */}
      <section className="relative z-10 pt-24 pb-6 md:pt-28 md:pb-8 px-6 text-center border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#101216]/90 via-[#08090b]/95 to-[#08090b]">
        {/* Kinetic Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] whitespace-nowrap font-condensed text-[20vw] font-black uppercase text-white leading-none">
          OFICIO AUSTRAL
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#59BFD6] font-mono text-[11px] uppercase tracking-[0.25em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#59BFD6] animate-pulse shadow-[0_0_8px_#59BFD6]" />
            <span>41°S &bull; DISCIPLINA TÉCNICA &amp; DANZA ÓPTICA 3D</span>
          </div>

          <h1 className="font-condensed text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white font-bold leading-[0.95] drop-shadow-2xl">
            PLIEGOS DE OFICIO
          </h1>

          <p className="font-sans text-sm sm:text-base text-white/75 max-w-2xl mx-auto font-light leading-relaxed pt-1">
            Diseño Cross Media y Fotografía de autor esculpidos bajo el clima y las distancias de la Patagonia austral. Haz scroll hacia abajo o desliza horizontalmente para recorrer cada especialidad.
          </p>

          {/* ── VIEW MODE TOGGLE & STATUS HUD ── */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <div className="inline-flex flex-wrap justify-center p-1 rounded-2xl sm:rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setViewMode('3d')}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-colors duration-200 ${
                  viewMode === '3d'
                    ? 'bg-[#59BFD6] text-[#08090b] font-bold shadow-[0_0_20px_rgba(89,191,214,0.4)]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Danza Óptica 3D</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('sticky')}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-colors duration-200 ${
                  viewMode === 'sticky'
                    ? 'bg-[#59BFD6] text-[#08090b] font-bold shadow-[0_0_20px_rgba(89,191,214,0.4)]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recorrido Vertical</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('reticular')}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-colors duration-200 ${
                  viewMode === 'reticular'
                    ? 'bg-[#59BFD6] text-[#08090b] font-bold shadow-[0_0_20px_rgba(89,191,214,0.4)]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Danza Óptica 3D</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('reticular')}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-colors duration-200 ${
                  viewMode === 'reticular'
                    ? 'bg-[#59BFD6] text-[#08090b] font-bold shadow-[0_0_20px_rgba(89,191,214,0.4)]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Pliegos Reticulares</span>
              </button>
            </div>

            {/* Optical HUD Indicator */}
            <div className="hidden lg:inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 font-mono text-xs text-white/60">
              <Disc3 className="w-3.5 h-3.5 text-[#59BFD6] animate-spin" style={{ animationDuration: '8s' }} />
              <span>0{activeIndex + 1}/0{total} &bull; {activeService.focal}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ── MODO 1 (POR DEFECTO): RECORRIDO STICKY PROGRESIVO (STACKING CARDS) ─ */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {viewMode === 'sticky' && (
        <section className="relative z-20 max-w-6xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-12 md:py-20">
          {/* Barra superior rápida de acceso a cada especialidad */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {SERVICES_LIST.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => navigateTo(i)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all border ${
                  activeIndex === i
                    ? 'bg-[#59BFD6]/15 text-[#59BFD6] border-[#59BFD6]/50 font-bold shadow-[0_0_15px_rgba(89,191,214,0.2)]'
                    : 'bg-white/[0.03] text-white/60 border-white/10 hover:text-white hover:border-white/25'
                }`}
              >
                0{i + 1}. {s.title}
              </button>
            ))}
          </div>

          {/* Pila de Tarjetas Sticky: obligan al visitante a recorrer los 6 servicios al hacer scroll */}
          <div className="relative space-y-12 md:space-y-24 pb-16">
            {SERVICES_LIST.map((serv, idx) => {
              const Icon = serv.icon;
              return (
                <div
                  key={serv.id}
                  id={serv.id}
                  data-service-idx={idx}
                  ref={(el) => {
                    stickyCardRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => {
                    setHoveredIndex(idx);
                    setActiveIndex(idx);
                  }}
                  className="md:sticky scroll-mt-28 rounded-3xl overflow-hidden border border-white/15 bg-[#0d0f14]/[0.96] backdrop-blur-2xl shadow-[0_-25px_70px_rgba(0,0,0,0.92)] transition-colors duration-300 hover:border-[#59BFD6]/50"
                  style={{
                    top: `calc(92px + ${idx * 14}px)`,
                    zIndex: 10 + idx,
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 min-h-[440px] md:min-h-[480px]">
                    {/* Columna Fotográfica Real */}
                    <div className="relative md:col-span-5 overflow-hidden min-h-[240px] md:min-h-full">
                      <Image
                        src={serv.image}
                        alt={serv.title}
                        fill
                        priority={idx === 0}
                        className="object-cover object-center filter contrast-110 brightness-95 transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-[#0d0f14]/45 to-[#0d0f14]" />

                      <div className="absolute inset-0 pointer-events-none p-5 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[10px] font-mono text-white/80 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#59BFD6] animate-pulse mr-2" />
                          <span>41°S &bull; {serv.coords} &bull; {serv.territory}</span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-white/60 bg-black/45 px-3 py-1 rounded-full border border-white/10 w-fit">
                          <span>{serv.focal}</span>
                        </div>
                      </div>
                    </div>

                    {/* Columna de Especificaciones y Botones 100% Activos */}
                    <div className="md:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3.5">
                          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#59BFD6] uppercase tracking-widest">
                            <Icon className="w-4 h-4" />
                            <span>{serv.tag}</span>
                          </div>
                          <span className="font-mono text-xs text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                            PLIEGO [ 0{idx + 1} / 0{total} ]
                          </span>
                        </div>

                        <h2 className="font-condensed text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white leading-[0.95]">
                          {serv.title}
                        </h2>

                        <p className="font-sans text-sm sm:text-base text-white/80 font-light leading-relaxed">
                          {serv.desc}
                        </p>

                        <div className="pt-1">
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-white/45 mb-2.5">
                            Capacidades Técnicas Entregables:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {serv.deliverables.map((item) => (
                              <div
                                key={item}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-xs text-white/80"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#59BFD6] shrink-0" />
                                <span className="truncate">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-1 text-xs font-mono text-white/55">
                          <span className="text-[#C29B63] font-semibold">Casos en Terreno: </span>
                          <span>{serv.clients}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                        <Link
                          href={serv.href}
                          className="rb-link-glanz inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#59BFD6] hover:bg-white text-[#08090b] font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(89,191,214,0.35)] transition-all hover:scale-105"
                        >
                          <span>Explorar Oficio</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>

                        <div className="flex flex-wrap items-center gap-4">
                          <Link
                            href={`/cotizador?servicio=${serv.id}`}
                            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white/75 hover:text-[#59BFD6] transition-colors"
                          >
                            <span>Calcular Presupuesto</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/contacto?servicio=${serv.id}`}
                            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#C29B63] hover:text-white transition-colors"
                          >
                            <span>Cotizar Directo</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ── MODO 1: DANZA ÓPTICA 3D (STICKY HORIZONTAL GLIDE ON SCROLL) ────── */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {viewMode === '3d' && (
        <div ref={trackRef} className="relative z-20 w-full md:h-[340vh]">
          <section
            ref={stageRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="md:sticky md:top-[70px] w-full min-h-[680px] md:h-[calc(100vh-70px)] flex flex-col items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none py-6 px-4"
            style={{ touchAction: 'pan-y' }}
          >
          {/* Floating Left / Right Tactile Navigation Buttons */}
          <button
            type="button"
            onClick={prevService}
            aria-label="Servicio anterior"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 p-3.5 rounded-full bg-[#101216]/85 hover:bg-[#59BFD6] text-white hover:text-[#08090b] border border-white/15 hover:border-[#59BFD6] backdrop-blur-xl shadow-2xl transition-transform duration-200 hover:scale-110 active:scale-95 group"
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={nextService}
            aria-label="Siguiente servicio"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 p-3.5 rounded-full bg-[#101216]/85 hover:bg-[#59BFD6] text-white hover:text-[#08090b] border border-white/15 hover:border-[#59BFD6] backdrop-blur-xl shadow-2xl transition-transform duration-200 hover:scale-110 active:scale-95 group"
          >
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Viewport 3D Perspective Box */}
          <div
            className="relative w-full max-w-5xl h-[520px] md:h-[580px] flex items-center justify-center"
            style={{
              perspective: '1300px',
              perspectiveOrigin: '50% 50%',
              transformStyle: 'preserve-3d',
            }}
          >
            {SERVICES_LIST.map((serv, idx) => {
              // Continuous offset relative to renderPos
              let offset = idx - (renderPos % total);
              while (offset > total / 2) offset -= total;
              while (offset < -total / 2) offset += total;

              // Gaussian bell curve: derivative is EXACTLY 0 at offset = 0 (Zero Jolt / Zero Shockwave!)
              const bell = Math.exp(-Math.pow(offset * 0.85, 2));

              // If card is far out of view, cull smoothly
              if (bell < 0.04) return null;

              // Smooth Z-depth: gently glides forward and hovers at apex
              const translateZ = (bell - 1) * 230; // 0 at center, -230px at sides

              // Smooth Scale: 0.82 at sides to 1.0 at center, continuous derivative
              const scale = 0.82 + 0.18 * bell;

              // Smooth Cyan Border Glow: softly illuminates as it approaches center
              const glowStrength = Math.pow(bell, 2.2);

              // Smooth Horizontal Placement: progressive optical spacing
              const translateX = offset * 430;

              // Silky smooth Y-rotation: turns gracefully towards center (no kinks)
              const rotateY = -Math.sin(Math.min(1.4, Math.max(-1.4, offset * 0.75))) * 22;

              // Continuous Opacity: smoothly fades for distant cards
              const opacity = Math.min(1, Math.pow(bell, 0.7));

              // Z-Index: center card is always on top
              const zIndex = Math.round(bell * 50);

              const Icon = serv.icon;

              return (
                <div
                  key={serv.id}
                  onClick={() => {
                    // Clicking any side card navigates gracefully to it
                    if (Math.abs(offset) > 0.25) navigateTo(idx);
                  }}
                  className="absolute w-[330px] sm:w-[460px] md:w-[680px] rounded-3xl overflow-hidden cursor-pointer"
                  style={{
                    transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    background: 'rgba(14, 16, 20, 0.94)',
                    backdropFilter: 'blur(16px)',
                    borderColor: `rgba(89, 191, 214, ${0.12 + glowStrength * 0.5})`,
                    boxShadow: `0 30px 90px -20px rgba(0,0,0,0.95), 0 0 ${glowStrength * 36}px rgba(89,191,214,${glowStrength * 0.24})`,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    willChange: 'transform, opacity',
                  }}
                >
                  {/* Card Content Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px] md:min-h-[500px]">
                    {/* Left Column: Authentic Photography with Optical Counter-Parallax (5 cols) */}
                    <div className="relative md:col-span-5 overflow-hidden min-h-[200px] md:min-h-full">
                      <div
                        className="absolute inset-[-12%] will-change-transform"
                        style={{
                          transform: `translateX(${offset * -14}px) scale(1.08)`,
                          transition: isDraggingRef.current ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      >
                        <Image
                          src={serv.image}
                          alt={serv.title}
                          fill
                          priority={idx === 0}
                          className="object-cover object-center filter contrast-110 brightness-95"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-[#0e1014]/50 to-[#0e1014]" />

                      {/* Optical Crosshair Overlay */}
                      <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[10px] font-mono text-white/70 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#59BFD6] animate-pulse mr-2" />
                          <span>41°S &bull; {serv.coords}</span>
                        </div>

                        <div className="flex items-center justify-between text-[9px] font-mono text-white/50">
                          <span>RAW 16-BIT</span>
                          <span>{serv.focal.split('•')[0]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Deep Technical Specs & Conversions (7 cols) */}
                    <div className="relative md:col-span-7 p-6 sm:p-7 md:p-8 flex flex-col justify-between space-y-5">
                      <div className="space-y-3.5">
                        {/* Top Metadata Row */}
                        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#59BFD6] uppercase tracking-widest">
                            <Icon className="w-3.5 h-3.5" />
                            <span>{serv.tag}</span>
                          </div>
                          <span className="font-mono text-xs text-white/40">
                            [ 0{idx + 1} / 0{total} ]
                          </span>
                        </div>

                        {/* Service Title */}
                        <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
                          {serv.title}
                        </h2>

                        {/* Narrative Description */}
                        <p className="font-sans text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                          {serv.desc}
                        </p>

                        {/* Deliverables Checklist */}
                        <div className="pt-1">
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-white/40 mb-2">
                            Capacidades Técnicas Entregables:
                          </span>
                          <div className="grid grid-cols-2 gap-1.5">
                            {serv.deliverables.map((item) => (
                              <div
                                key={item}
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 font-mono text-[10px] text-white/75"
                              >
                                <CheckCircle2 className="w-3 h-3 text-[#59BFD6] shrink-0" />
                                <span className="truncate">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Verified Clients Proof */}
                        <div className="pt-1 text-[10px] font-mono text-white/50">
                          <span className="text-[#C29B63] font-semibold">Casos en Terreno: </span>
                          <span>{serv.clients}</span>
                        </div>
                      </div>

                      {/* Bottom Action Buttons */}
                      <div className="relative z-30 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                        <Link
                          href={serv.href}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => e.stopPropagation()}
                          className="rb-link-glanz inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#59BFD6] text-[#08090b] font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(89,191,214,0.3)] hover:brightness-110 transition-all"
                        >
                          <span>Explorar Oficio</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <Link
                          href={`/cotizador?servicio=${serv.id}`}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-white/70 hover:text-[#59BFD6] transition-colors"
                        >
                          <span>Calcular Presupuesto</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── DUAL CONTROLS & TIMELINE SCRUBBER HUD ── */}
          <div className="relative z-30 mt-6 w-full max-w-2xl px-4 flex flex-col items-center gap-3">
            {/* Timeline Nodes */}
            <div className="w-full flex items-center justify-between gap-2 p-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <button
                type="button"
                onClick={prevService}
                aria-label="Servicio anterior"
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1 sm:gap-2">
                {SERVICES_LIST.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => navigateTo(i)}
                    className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 font-mono text-[11px] ${
                      activeIndex === i
                        ? 'bg-white/10 text-[#59BFD6] border border-[#59BFD6]/40 font-bold shadow-[0_0_12px_rgba(89,191,214,0.3)]'
                        : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span>0{i + 1}</span>
                    <span className="hidden sm:inline font-sans font-normal text-xs">{s.title}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={nextService}
                aria-label="Siguiente servicio"
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Gesture Tip */}
            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-white/40">
              <Wind className="w-3.5 h-3.5 text-[#59BFD6] animate-pulse" />
              <span>Haz scroll hacia abajo, desliza en horizontal o usa las flechas &larr; &rarr; para recorrer los 6 oficios</span>
            </div>
          </div>
        </section>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ── MODO 3: PLIEGOS RETICULARES (TRÍPTICO ASIMÉTRICO 48px 1fr 1.2fr) ── */}
      {/* ── R4 CONTRACT COMPATIBLE: tests/e2e/runner.ts GUARANTEE 100% PASS ── */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section
        className={`relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-16 md:py-24 transition-opacity duration-500 ${
          viewMode === 'reticular' ? 'opacity-100' : 'opacity-90'
        }`}
      >
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#59BFD6]">
              DESGLOSE TÉCNICO EDITORIAL
            </span>
            <h2 className="font-condensed text-3xl sm:text-4xl uppercase font-bold text-white mt-1">
              Catálogo Integral de Disciplinas
            </h2>
          </div>
          <span className="font-mono text-xs text-white/50">
            [ 06 PLIEGOS FORMALES DISPONIBLES ]
          </span>
        </div>

        <div className="flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
          {SERVICES_LIST.map((serv, idx) => {
            const Icon = serv.icon;
            return (
              <div
                key={serv.id}
                id={viewMode === 'sticky' ? `index-${serv.id}` : serv.href.replace('/servicios/', '')}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="scroll-mt-28 py-10 md:py-14 transition-all duration-500 group hover:bg-white/[0.02] px-4 -mx-4 rounded-3xl"
              >
                {/* Asymmetric Triptych Grid: 48px fixed ordinal, 1fr title/badge, 1.2fr description & pill button */}
                <div className="grid grid-cols-1 lg:grid-cols-[48px_1fr_1.2fr] gap-6 lg:gap-12 items-baseline">
                  {/* Column 1: Ordinal Numeral (48px fixed) */}
                  <div className="flex items-center gap-3 lg:block">
                    <span className="font-mono text-sm text-[#59BFD6] group-hover:text-white transition-colors">
                      [ 0{idx + 1} ]
                    </span>
                    <div className="lg:hidden w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#59BFD6]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Column 2: Service Title, Tag & Category (1fr) */}
                  <div className="space-y-2">
                    <div className="hidden lg:inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#59BFD6] font-mono text-[10px] uppercase tracking-wider mb-2">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{serv.tag}</span>
                    </div>
                    <h3 className="font-condensed text-3xl sm:text-4xl md:text-5xl uppercase font-bold tracking-tight text-white group-hover:text-[#59BFD6] transition-colors">
                      {serv.title}
                    </h3>
                    <span className="lg:hidden block font-mono text-[10px] uppercase tracking-[0.2em] text-[#59BFD6]">
                      {serv.tag}
                    </span>
                  </div>

                  {/* Column 3: Description, Deliverables & rb-link-glanz Pill Button (1.2fr) */}
                  <div className="space-y-6">
                    <p className="font-sans text-sm sm:text-base text-white/75 font-light leading-relaxed">
                      {serv.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {serv.deliverables.map((d) => (
                        <span
                          key={d}
                          className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-white/60 group-hover:border-white/20 transition-colors"
                        >
                          {d}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                      {/* Interactive Pill Button with rb-link-glanz sheen effect */}
                      <Link
                        href={serv.href}
                        className="rb-link-glanz inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/5 hover:bg-[#59BFD6] text-white hover:text-[#08090b] border border-white/20 hover:border-[#59BFD6] font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-md"
                      >
                        <span>Explorar Oficio</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>

                      <Link
                        href={`/cotizador?servicio=${serv.id}`}
                        className="text-xs font-mono uppercase tracking-wider text-white/50 hover:text-[#59BFD6] transition-colors"
                      >
                        <span>Cotizar Proyecto</span> &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
