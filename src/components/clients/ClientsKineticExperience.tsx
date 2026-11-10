'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Globe,
  ArrowUpRight,
  ArrowRight,
  X,
  Sparkles,
  Wind,
  Maximize2,
} from 'lucide-react';
import type { ClientLogo } from '@/app/clientes/page';

interface ClientsKineticExperienceProps {
  clientLogos: ClientLogo[];
}

// Photography mapping for authentic modal preview
const CLIENT_IMAGE_MAP: Record<string, string> = {
  AquaChile: '/images/real/bg-fotografia-9-min.jpg',
  'Estancia Rilán': '/images/real/bg-portafolios-web-rilan-min.jpg',
  'Hotel Costaustralis': '/images/real/bg-portafolios-fotografia-a-min.jpg',
  'Hotel Cabo de Hornos': '/images/real/bg-portafolios-fotografia-c-min.jpg',
  'Blue Seal Subsea': '/images/real/bg-portafolios-marca-blue-seal-min.jpg',
  'Gallo Negro': '/images/real/bg-portafolios-marca-gallo-negro-min.jpg',
  'Sur Terra': '/images/real/bg-portafolios-marca-sur-terra-min.jpg',
  'Sur Terra Inmobiliaria': '/images/real/bg-portafolios-marca-sur-terra-min.jpg',
  'Tagua Tagua Lodge': '/images/real/bg-fotografia-6-min.jpg',
  Cirumed: '/images/real/bg-portafolios-marca-cirumed-min.jpg',
  'Centro Maqui': '/images/real/bg-portafolios-marca-maqui-min.jpg',
  'Cala Melí': '/images/real/bg-portafolios-fotografia-b-min.jpg',
  Soldasur: '/images/real/facebook/fb-nazca-2.jpg',
  'Doosan Bobcat Chile': '/images/real/bg-fotografia-9-min.jpg',
  'Viajes Falabella': '/images/real/bg-portafolios-editorial-libro-min.jpg',
  'Muebles Yunge': '/images/real/bg-portafolios-fotografia-d-min.jpg',
  'Hotel Quilquico': '/images/real/bg-fotografia-6-min.jpg',
  'Hotel Ohana': '/images/real/bg-home-2.jpg',
  'El Triwe': '/images/real/bg-portafolios-fotografia-g-min.jpg',
  ARMH: '/images/real/bg-portafolios-marca-rmh-min.jpg',
  'San Ambrosio': '/images/real/bg-portafolios-marca-san-ambrosio-min.jpg',
  'Saltos del Maullín': '/images/real/bg-portafolios-fotografia-h-min.jpg',
  'Seremi del Medio Ambiente': '/images/real/bg-portafolios-editorial-phyllum-min.jpg',
  Anasac: '/images/real/bg-portafolios-editorial-amino-max-min.jpg',
};

export function ClientsKineticExperience({ clientLogos }: ClientsKineticExperienceProps) {
  // Modal state
  const [selectedClient, setSelectedClient] = useState<ClientLogo | null>(null);

  // 3 Rails of logos
  const rail1 = useMemo(() => clientLogos.slice(0, 7), [clientLogos]);
  const rail2 = useMemo(() => clientLogos.slice(7, 14), [clientLogos]);
  const rail3 = useMemo(() => clientLogos.slice(14, 20), [clientLogos]);

  // Infinite Marquee Positions with Scroll Velocity Coupling
  const pos1Ref = useRef(0);
  const pos2Ref = useRef(0);
  const pos3Ref = useRef(0);
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const isDraggingRail = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);

  const [, setTick] = useState(0);

  // Buoy Floating Time
  const timeRef = useRef(0);

  // Keyboard escape for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedClient(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll Velocity Monitor
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const delta = currentY - lastScrollYRef.current;
          scrollVelocityRef.current = delta;
          lastScrollYRef.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 60fps Physics Animation Loop for Rails & Floating Buoy motion
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(50, now - lastTime) / 1000;
      lastTime = now;
      timeRef.current += dt;

      // Friction on scroll velocity
      scrollVelocityRef.current *= 0.92;

      // Additional speed from user scroll
      const velocityBoost = Math.max(-12, Math.min(12, scrollVelocityRef.current * 0.18));

      // Rail 1: moves left
      if (isDraggingRail.current !== 1) {
        pos1Ref.current -= (38 + Math.abs(velocityBoost) * 45) * dt;
      }
      // Rail 2: moves right
      if (isDraggingRail.current !== 2) {
        pos2Ref.current += (34 + Math.abs(velocityBoost) * 45) * dt;
      }
      // Rail 3: moves left
      if (isDraggingRail.current !== 3) {
        pos3Ref.current -= (42 + Math.abs(velocityBoost) * 45) * dt;
      }

      setTick((t) => t + 1);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Drag handlers for rails
  const startDragRail = (railNum: number, clientX: number) => {
    isDraggingRail.current = railNum;
    dragStartXRef.current = clientX;
    if (railNum === 1) dragStartPosRef.current = pos1Ref.current;
    if (railNum === 2) dragStartPosRef.current = pos2Ref.current;
    if (railNum === 3) dragStartPosRef.current = pos3Ref.current;
  };

  const moveDragRail = (clientX: number) => {
    if (isDraggingRail.current === null) return;
    const delta = clientX - dragStartXRef.current;
    if (isDraggingRail.current === 1) pos1Ref.current = dragStartPosRef.current + delta;
    if (isDraggingRail.current === 2) pos2Ref.current = dragStartPosRef.current + delta;
    if (isDraggingRail.current === 3) pos3Ref.current = dragStartPosRef.current + delta;
  };

  const endDragRail = () => {
    isDraggingRail.current = null;
  };

  // Card Tilt State
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [tiltMap, setTiltMap] = useState<Record<number, { x: number; y: number }>>({});

  const handleCardMouseMove = (id: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltMap((prev) => ({ ...prev, [id]: { x, y } }));
  };

  const handleCardMouseLeave = (id: number) => {
    setHoveredCardId(null);
    setTiltMap((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
  };

  // Render a Single Floating Buoy Card
  const renderBuoyCard = (client: ClientLogo, railIndex: number, cardIdx: number) => {
    const tilt = tiltMap[client.id] || { x: 0, y: 0 };
    const isHovered = hoveredCardId === client.id;

    // Harmonic sinusoidal buoy oscillation
    const buoyPhase = cardIdx * 1.05 + railIndex * 1.5;
    const buoyY = Math.sin(timeRef.current * 1.8 + buoyPhase) * 6;
    const buoyRot = Math.sin(timeRef.current * 1.2 + buoyPhase) * 1.2;

    const transformStyle = isHovered
      ? `perspective(600px) rotateX(${tilt.y * -14}deg) rotateY(${tilt.x * 14}deg) scale(1.06) translateY(${buoyY}px)`
      : `translateY(${buoyY}px) rotate(${buoyRot}deg)`;

    return (
      <div
        key={`${client.id}-${cardIdx}`}
        onClick={() => setSelectedClient(client)}
        onMouseEnter={() => setHoveredCardId(client.id)}
        onMouseMove={(e) => handleCardMouseMove(client.id, e)}
        onMouseLeave={() => handleCardMouseLeave(client.id)}
        className="shrink-0 w-64 sm:w-72 h-44 rounded-2xl bg-[#121418]/90 hover:bg-[#181b22] border border-white/10 hover:border-[#59BFD6]/60 backdrop-blur-xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(89,191,214,0.22)] select-none group relative overflow-hidden"
        style={{
          transform: transformStyle,
          willChange: 'transform',
        }}
      >
        {/* Subtle radial sheen following cursor */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${(tilt.x + 0.5) * 100}% ${(tilt.y + 0.5) * 100}%, rgba(89,191,214,0.25) 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Top Bar: Ordinal & Region */}
        <div className="flex items-center justify-between text-[10px] font-mono text-white/50 border-b border-white/5 pb-2">
          <div className="flex items-center gap-1.5 text-[#59BFD6]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#59BFD6] animate-pulse" />
            <span>0{client.id < 10 ? `0${client.id}` : client.id}</span>
          </div>
          <span className="truncate max-w-[130px]">{client.region.split(',')[0]}</span>
        </div>

        {/* Logo Centered with Optical Breathing */}
        <div className="relative w-full h-16 flex items-center justify-center p-2">
          <Image
            src={`/images/real/clients/${client.file}`}
            alt={`Logo ${client.name}`}
            width={240}
            height={100}
            unoptimized
            className="max-h-[52px] w-auto max-w-[85%] object-contain filter brightness-100 group-hover:brightness-125 transition-all duration-300 drop-shadow-md"
          />
        </div>

        {/* Bottom Metadata & Expand Cue */}
        <div className="flex items-center justify-between text-xs font-condensed uppercase tracking-wider text-white/80 pt-2 border-t border-white/5">
          <span className="font-bold truncate max-w-[150px] group-hover:text-[#59BFD6] transition-colors">
            {client.name}
          </span>
          <div className="flex items-center gap-1 text-[10px] font-mono text-white/40 group-hover:text-white transition-colors">
            <span>Ficha</span>
            <Maximize2 className="w-3 h-3 text-[#59BFD6]" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* ── 1. RÍO INFINITO CINÉTICO: VELOCITY RAILS 3D + BOYAS FLOTANTES ── */}
      <div className="relative z-10 py-16 md:py-24 overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#0a0c0f] via-[#0e1014] to-[#0a0c0f]">
        {/* Subtle Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] text-[18vw] font-condensed font-black uppercase text-white whitespace-nowrap">
          VIENTO AUSTRAL
        </div>

        <div className="max-w-7xl mx-auto px-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#59BFD6] uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              <span>RÍO CINÉTICO DE 20 MARCAS • SCROLLING INFINITO</span>
            </div>
            <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              Marcas en Flotación Continua
            </h2>
            <p className="font-sans text-sm sm:text-base text-white/70 max-w-xl font-light">
              Navega el caudal de marcas australes. Arrastra horizontalmente, haz scroll para acelerar la corriente o pulsa cualquier boya para abrir su ficha en terreno.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-white/50">
            <Wind className="w-4 h-4 text-[#59BFD6] animate-pulse" />
            <span>Física de Boya & Aceleración de Scroll</span>
          </div>
        </div>

        {/* ── RAIL 1 (Moves Left) ── */}
        <div
          onMouseDown={(e) => startDragRail(1, e.clientX)}
          onMouseMove={(e) => moveDragRail(e.clientX)}
          onMouseUp={endDragRail}
          onTouchStart={(e) => startDragRail(1, e.touches[0].clientX)}
          onTouchMove={(e) => moveDragRail(e.touches[0].clientX)}
          onTouchEnd={endDragRail}
          className="relative w-full py-3 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        >
          <div
            className="flex gap-6 w-max"
            style={{
              transform: `translate3d(${pos1Ref.current % 1800}px, 0, 0)`,
              willChange: 'transform',
            }}
          >
            {[...rail1, ...rail1, ...rail1, ...rail1].map((client, idx) =>
              renderBuoyCard(client, 1, idx)
            )}
          </div>
        </div>

        {/* ── RAIL 2 (Moves Right) ── */}
        <div
          onMouseDown={(e) => startDragRail(2, e.clientX)}
          onMouseMove={(e) => moveDragRail(e.clientX)}
          onMouseUp={endDragRail}
          onTouchStart={(e) => startDragRail(2, e.touches[0].clientX)}
          onTouchMove={(e) => moveDragRail(e.touches[0].clientX)}
          onTouchEnd={endDragRail}
          className="relative w-full py-3 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        >
          <div
            className="flex gap-6 w-max"
            style={{
              transform: `translate3d(${pos2Ref.current % 1800}px, 0, 0)`,
              willChange: 'transform',
            }}
          >
            {[...rail2, ...rail2, ...rail2, ...rail2].map((client, idx) =>
              renderBuoyCard(client, 2, idx)
            )}
          </div>
        </div>

        {/* ── RAIL 3 (Moves Left) ── */}
        <div
          onMouseDown={(e) => startDragRail(3, e.clientX)}
          onMouseMove={(e) => moveDragRail(e.clientX)}
          onMouseUp={endDragRail}
          onTouchStart={(e) => startDragRail(3, e.touches[0].clientX)}
          onTouchMove={(e) => moveDragRail(e.touches[0].clientX)}
          onTouchEnd={endDragRail}
          className="relative w-full py-3 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        >
          <div
            className="flex gap-6 w-max"
            style={{
              transform: `translate3d(${pos3Ref.current % 1800}px, 0, 0)`,
              willChange: 'transform',
            }}
          >
            {[...rail3, ...rail3, ...rail3, ...rail3].map((client, idx) =>
              renderBuoyCard(client, 3, idx)
            )}
          </div>
        </div>
      </div>

      {/* ── DRAWER / MODAL DE EXPEDICIÓN CINEMATOGRÁFICO ── */}
      {selectedClient && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-2xl animate-fade-in"
          onClick={() => setSelectedClient(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl bg-[#101217] border border-[#59BFD6]/40 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(89,191,214,0.15)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedClient(null)}
              aria-label="Cerrar ficha"
              className="absolute top-5 right-5 z-20 p-2 rounded-full bg-black/60 hover:bg-white/20 text-white/70 hover:text-white border border-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
              {/* Left Photo Header (5 cols) */}
              <div className="relative md:col-span-5 min-h-[220px] md:min-h-full overflow-hidden bg-black">
                <Image
                  src={CLIENT_IMAGE_MAP[selectedClient.name] || '/images/real/bg-fotografia-9-min.jpg'}
                  alt={`Faena en terreno ${selectedClient.name}`}
                  fill
                  className="object-cover object-center filter contrast-110 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                {/* Territorial Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-[#59BFD6] uppercase tracking-wider">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedClient.region}</span>
                  </div>
                  <div className="font-condensed text-xs text-white/80 font-bold uppercase">
                    Expedición Documentada en Terreno
                  </div>
                </div>
              </div>

              {/* Right Content & Actions (7 cols) */}
              <div className="p-6 sm:p-8 md:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Top Bar with Logo */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="relative w-36 h-12 flex items-center justify-start">
                      <Image
                        src={`/images/real/clients/${selectedClient.file}`}
                        alt={selectedClient.name}
                        width={180}
                        height={60}
                        unoptimized
                        className="max-h-10 w-auto object-contain filter brightness-110"
                      />
                    </div>
                    <span className="font-mono text-xs text-white/40">
                      ID #0{selectedClient.id < 10 ? `0${selectedClient.id}` : selectedClient.id}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-condensed text-3xl font-bold uppercase tracking-tight text-white">
                      {selectedClient.name}
                    </h3>
                    <span className="font-mono text-xs text-[#59BFD6] uppercase tracking-wider">
                      {selectedClient.region}
                    </span>
                  </div>

                  {/* Scope description */}
                  <div className="space-y-2">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-white/40">
                      Alcance del Trabajo Realizado:
                    </span>
                    <p className="font-sans text-sm text-white/80 font-light leading-relaxed">
                      {selectedClient.scope}
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-white/70">
                      Patagonia Austral
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-white/70">
                      Producción Propia
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-[#59BFD6]">
                      Verificado 1:1
                    </span>
                  </div>
                </div>

                {/* Conversion Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-white/10">
                  {selectedClient.projectSlug && (
                    <Link
                      href={`/portafolio?proyecto=${selectedClient.projectSlug}`}
                      className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl bg-[#59BFD6] text-[#0a0c0f] font-condensed font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(89,191,214,0.3)]"
                    >
                      <span>Ver Caso de Estudio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}

                  <Link
                    href={`/cotizador?cliente=${encodeURIComponent(selectedClient.name)}`}
                    className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-condensed font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <span>Cotizar en Cotizador</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#59BFD6]" />
                  </Link>

                  {selectedClient.websiteUrl && (
                    <a
                      href={selectedClient.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors"
                      title="Visitar sitio oficial"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
