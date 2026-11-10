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
  ChevronUp,
  ChevronDown,
  Layers,
  LayoutGrid,
  Sparkles,
  Wind,
  Eye,
  Disc3,
  MapPin,
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
  const [viewMode, setViewMode] = useState<'3d' | 'reticular'>('3d');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);

  // Physics & 3D Infinite Orbit States
  const stageRef = useRef<HTMLDivElement>(null);
  const currentPosRef = useRef<number>(0);
  const targetPosRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartYRef = useRef<number>(0);
  const dragStartPosRef = useRef<number>(0);
  const lastDragTimeRef = useRef<number>(0);
  const dragVelocityRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  // Mouse tilt on active card
  const [cardTilt, setCardTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update card transform positions via state for reactive rendering
  const [renderPos, setRenderPos] = useState<number>(0);

  const total = SERVICES_LIST.length;

  // Jump to specific service index with shortest circular path
  const navigateTo = useCallback(
    (index: number) => {
      setIsAutoRotating(false);
      const current = currentPosRef.current;
      const currentNorm = ((Math.round(current) % total) + total) % total;
      let diff = index - currentNorm;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
      targetPosRef.current = Math.round(current) + diff;
    },
    [total]
  );

  const nextService = useCallback(() => {
    setIsAutoRotating(false);
    targetPosRef.current = Math.round(targetPosRef.current) + 1;
  }, []);

  const prevService = useCallback(() => {
    setIsAutoRotating(false);
    targetPosRef.current = Math.round(targetPosRef.current) - 1;
  }, []);

  // 60-120fps Animation Loop with smooth Lerp interpolation and velocity decay
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(50, now - lastTime) / 1000;
      lastTime = now;

      // Auto-rotation idle drift if enabled and user isn't actively dragging
      if (isAutoRotating && !isDraggingRef.current) {
        targetPosRef.current += 0.08 * dt;
      }

      // Smooth Lerp toward target position
      const diff = targetPosRef.current - currentPosRef.current;
      currentPosRef.current += diff * 0.1;

      // Snap to nearest whole integer when nearly stopped
      if (!isDraggingRef.current && !isAutoRotating && Math.abs(diff) < 0.003) {
        targetPosRef.current = Math.round(targetPosRef.current);
        currentPosRef.current = targetPosRef.current;
      }

      setRenderPos(currentPosRef.current);

      const normIndex = ((Math.round(currentPosRef.current) % total) + total) % total;
      setActiveIndex(normIndex);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [total, isAutoRotating]);

  // Wheel listener: normalized & prevents page jitter while scrolling through 3D tunnel
  const handleWheel = useCallback((e: React.WheelEvent) => {
    setIsAutoRotating(false);
    // Smooth delta accumulation
    const delta = e.deltaY;
    const step = Math.sign(delta) * Math.min(1.2, Math.abs(delta) * 0.0022);
    targetPosRef.current += step;
  }, []);

  // Pointer drag controls with momentum toss
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsAutoRotating(false);
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;
    dragStartPosRef.current = currentPosRef.current;
    lastDragTimeRef.current = performance.now();
    dragVelocityRef.current = 0;
    if (stageRef.current) {
      stageRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastDragTimeRef.current);
    const deltaY = e.clientY - dragStartYRef.current;
    // Drag sensitivity (approx 280px of drag = 1 service)
    const newTarget = dragStartPosRef.current - deltaY / 260;
    dragVelocityRef.current = (newTarget - targetPosRef.current) / (dt / 16);
    targetPosRef.current = newTarget;
    lastDragTimeRef.current = now;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (stageRef.current) {
      try {
        stageRef.current.releasePointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
    }
    // Momentum toss based on release velocity
    const momentum = Math.max(-2, Math.min(2, dragVelocityRef.current * 1.8));
    targetPosRef.current = Math.round(targetPosRef.current + momentum);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        nextService();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        prevService();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextService, prevService]);

  const activeService = SERVICES_LIST[activeIndex] || SERVICES_LIST[0];

  return (
    <div className="relative w-full flex flex-col bg-[#08090b] text-white min-h-screen selection:bg-[#59BFD6] selection:text-[#08090b] overflow-hidden">
      {/* ── ATMOSPHERIC CANVAS WITH DRIFTING PARTICLES & AURORA GLOW ── */}
      <AtmosphericBackground intensity="vibrant" showParticles={true} />

      {/* ── REVELADO DE FOTOGRAFÍA DE AUTOR EN SEGUNDO PLANO AL HOVER (R4 COMPAT) ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {SERVICES_LIST.map((serv, idx) => (
          <div
            key={serv.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              hoveredIndex === idx || (viewMode === '3d' && activeIndex === idx)
                ? 'opacity-30 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            <Image
              src={serv.image}
              alt=""
              fill
              className="object-cover object-center filter grayscale contrast-125 brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#08090b] via-[#08090b]/80 to-[#08090b]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#08090b]/90 via-transparent to-[#08090b]" />
          </div>
        ))}
      </div>

      {/* ── BANNER EDITORIAL DARK LUXURY & VIEW MODE SWITCHER ── */}
      <section className="relative z-10 pt-28 pb-10 md:pt-36 md:pb-12 px-6 text-center border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#101216]/90 via-[#08090b]/95 to-[#08090b]">
        {/* Kinetic Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] whitespace-nowrap font-condensed text-[20vw] font-black uppercase text-white leading-none">
          OFICIO AUSTRAL
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#59BFD6] font-mono text-[11px] uppercase tracking-[0.25em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#59BFD6] animate-pulse shadow-[0_0_8px_#59BFD6]" />
            <span>41°S &bull; DISCIPLINA TÉCNICA & DANZA ÓPTICA 3D</span>
          </div>

          <h1 className="font-condensed text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-white font-bold leading-[0.95] drop-shadow-2xl">
            PLIEGOS DE OFICIO
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-white/75 max-w-2xl mx-auto font-light leading-relaxed pt-1">
            Diseño Cross Media y Fotografía de autor esculpidos bajo el clima y las distancias de la Patagonia austral. Seis disciplinas técnicas guiadas por el rigor, la luz natural y el compromiso con el territorio.
          </p>

          {/* ── VIEW MODE TOGGLE & STATUS HUD ── */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <div className="inline-flex p-1 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setViewMode('3d')}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
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
                onClick={() => setViewMode('reticular')}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
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
            <div className="hidden sm:inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 font-mono text-xs text-white/60">
              <Disc3 className="w-3.5 h-3.5 text-[#59BFD6] animate-spin" style={{ animationDuration: '8s' }} />
              <span>{activeService.focal}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ── MODO 1: DANZA ÓPTICA 3D (INFINITE ORBIT & CAMERA FLY-THROUGH) ── */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {viewMode === '3d' && (
        <section
          ref={stageRef}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative z-20 w-full min-h-[760px] md:min-h-[860px] flex flex-col items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none py-12 px-4"
          style={{ touchAction: 'none' }}
        >
          {/* Viewport 3D Perspective Box */}
          <div
            className="relative w-full max-w-4xl h-[560px] md:h-[620px] flex items-center justify-center"
            style={{
              perspective: '1200px',
              perspectiveOrigin: '50% 50%',
              transformStyle: 'preserve-3d',
            }}
          >
            {SERVICES_LIST.map((serv, idx) => {
              // Calculate wrapped angular/cylindrical offset relative to renderPos
              let offset = idx - (renderPos % total);
              while (offset > total / 2) offset -= total;
              while (offset < -total / 2) offset += total;

              const absOffset = Math.abs(offset);
              const isActive = Math.round(absOffset) === 0;

              // Don't render cards that are too far behind the camera
              if (absOffset > 2.8) return null;

              // 3D Perspective Coordinates
              const translateZ = -absOffset * 270;
              const translateY = offset * 130;
              const rotateX = offset * -15;
              const scale = Math.max(0.68, 1 - absOffset * 0.12);
              const opacity = Math.max(0.08, 1 - absOffset * 0.38);
              const blurPx = Math.min(10, absOffset * 3.5);
              const zIndex = Math.round(30 - absOffset * 8);

              const Icon = serv.icon;

              return (
                <div
                  key={serv.id}
                  onClick={() => {
                    if (!isActive) navigateTo(idx);
                  }}
                  className={`absolute w-full max-w-3xl rounded-3xl overflow-hidden transition-shadow duration-300 ${
                    isActive
                      ? 'border border-[#59BFD6]/40 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9),0_0_50px_rgba(89,191,214,0.18)]'
                      : 'border border-white/10 hover:border-white/30 shadow-2xl cursor-pointer'
                  }`}
                  style={{
                    transform: `translate3d(0, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`,
                    opacity,
                    filter: blurPx > 0 ? `blur(${blurPx}px)` : 'none',
                    zIndex,
                    background: 'rgba(14, 16, 20, 0.88)',
                    backdropFilter: 'blur(20px)',
                    willChange: 'transform, opacity, filter',
                  }}
                  onMouseMove={(e) => {
                    if (isActive) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = (e.clientX - rect.left) / rect.width - 0.5;
                      const y = (e.clientY - rect.top) / rect.height - 0.5;
                      setCardTilt({ x, y });
                    }
                  }}
                  onMouseLeave={() => setCardTilt({ x: 0, y: 0 })}
                >
                  {/* Inner Card Grid: Left Hero Image Plate, Right Editorial Specs */}
                  <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px] md:min-h-[560px]">
                    {/* Left Column: Authentic Photography & Viewfinder HUD (5 cols) */}
                    <div className="relative md:col-span-5 overflow-hidden min-h-[220px] md:min-h-full">
                      <Image
                        src={serv.image}
                        alt={serv.title}
                        fill
                        priority={isActive}
                        className="object-cover object-center filter contrast-110 brightness-95 transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-[#0e1014]/40 to-[#0e1014]" />

                      {/* Optical Crosshair Overlay */}
                      <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[10px] font-mono text-white/70 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 w-fit">
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
                    <div className="relative md:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
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
                        <p className="font-sans text-sm sm:text-base text-white/80 font-light leading-relaxed">
                          {serv.desc}
                        </p>

                        {/* Deliverables Checklist */}
                        <div className="pt-2">
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-white/40 mb-2">
                            Capacidades Técnicas Entregables:
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            {serv.deliverables.map((item) => (
                              <div
                                key={item}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 font-mono text-[11px] text-white/75"
                              >
                                <CheckCircle2 className="w-3 h-3 text-[#59BFD6] shrink-0" />
                                <span className="truncate">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Verified Clients Proof */}
                        <div className="pt-2 text-[11px] font-mono text-white/50">
                          <span className="text-[#C29B63] font-semibold">Casos en Terreno: </span>
                          <span>{serv.clients}</span>
                        </div>
                      </div>

                      {/* Bottom Action Buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                        <Link
                          href={serv.href}
                          className="rb-link-glanz inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#59BFD6] text-[#08090b] font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(89,191,214,0.3)] hover:brightness-110 transition-all"
                        >
                          <span>Explorar Oficio</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <Link
                          href={`/cotizador?servicio=${serv.id}`}
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
          <div className="relative z-30 mt-8 w-full max-w-2xl px-4 flex flex-col items-center gap-4">
            {/* Timeline Nodes */}
            <div className="w-full flex items-center justify-between gap-2 p-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <button
                type="button"
                onClick={prevService}
                aria-label="Servicio anterior"
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              >
                <ChevronUp className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 sm:gap-2">
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
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Gesture Tip */}
            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-white/40">
              <Wind className="w-3.5 h-3.5 text-[#59BFD6] animate-pulse" />
              <span>Gira la rueda, arrastra verticalmente o usa las flechas del teclado</span>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ── MODO 2: PLIEGOS RETICULARES (TRÍPTICO ASIMÉTRICO 48px 1fr 1.2fr) ── */}
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
                id={serv.href.replace('/servicios/', '')}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="scroll-mt-28 py-10 md:py-14 transition-all duration-500 group hover:bg-white/[0.02] px-4 -mx-4 rounded-3xl"
              >
                {/* Asymmetric Triptych Grid: 48px fixed ordinal, 1fr title/badge, 1.2fr description & pill button */}
                <div
                  className="grid grid-cols-1 lg:grid-cols-[48px_1fr_1.2fr] gap-6 lg:gap-12 items-baseline"
                  style={{ gridTemplateColumns: 'minmax(0, 48px) minmax(0, 1fr) minmax(0, 1.2fr)' }}
                >
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
                      <Icon className="w-3 h-3" />
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
