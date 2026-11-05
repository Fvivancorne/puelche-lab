'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PORTFOLIO_PROJECTS } from '@/data/portfolio';
import { ArrowUpRight, MapPin, Calendar, Compass, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

// 6 proyectos emblemáticos con fotografía genuina y diversidad territorial
const CURATED_PROJECT_IDS = [
  'estancia-rilan',
  'hotel-costaustralis',
  'aquachile',
  'cala-meli',
  'muebles-yunge',
  'turistour-expediciones',
];

const CURATED_PROJECTS = CURATED_PROJECT_IDS.map((id) =>
  PORTFOLIO_PROJECTS.find((p) => p.id === id)
).filter(Boolean) as typeof PORTFOLIO_PROJECTS;

export function BrutalistProjectList() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Mouse drag state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);

    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(Math.min(100, Math.max(0, progress)));

    // Calculate which card is currently centered
    const cardWidth = el.querySelector('article')?.clientWidth || clientWidth * 0.48;
    const currentIdx = Math.round(scrollLeft / (cardWidth + 24));
    setActiveIndex(Math.min(CURATED_PROJECTS.length - 1, Math.max(0, currentIdx)));
  }, []);

  // Auto-avance continuo horizontal con loop infinito ("que se vayan mostrando solas")
  useEffect(() => {
    if (isPaused) return;

    autoPlayTimerRef.current = setInterval(() => {
      const el = trackRef.current;
      if (!el || isDraggingRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = el;
      const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 25;

      if (isAtEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const card = el.querySelector('article');
        const scrollAmount = card ? card.clientWidth + 32 : clientWidth * 0.52;
        el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 4500);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPaused]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByDirection = (direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;

    const card = el.querySelector('article');
    const scrollAmount = card ? card.clientWidth + 32 : el.clientWidth * 0.55;

    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Pointer/Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;

    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    setIsPaused(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const el = trackRef.current;
    if (!el) return;

    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // Drag speed multiplier

    if (Math.abs(walk) > 5) {
      hasMovedRef.current = true;
    }

    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    setIsPaused(false);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent accidental clicks if the user was dragging
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section
      id="proyectos-destacados"
      aria-label="Proyectos Seleccionados de Autor"
      className="relative w-full bg-[#0d0e12] py-24 sm:py-32 md:py-36 border-t border-white/[0.08] overflow-hidden"
    >
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#59BFD6]/[0.03] blur-[160px] pointer-events-none" />

      {/* Cabecera Editorial Limpia */}
      <div className="max-w-7xl mx-auto w-full mb-10 md:mb-14 px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <h2 className="font-condensed text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight font-bold text-white leading-tight">
              Obras que Hablan por Sí Mismas
            </h2>

            <p className="font-sans text-base sm:text-lg text-white/70 font-light leading-relaxed">
              Arquitectura vernácula, interiorismo contemporáneo, ebanistería y registros industriales documentados en la Patagonia austral.
            </p>
          </div>

          {/* Controles Laterales & Enlace al Portafolio Completo */}
          <div className="shrink-0 flex items-center gap-4">
            {/* Flechas de Navegación Lateral */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByDirection('left')}
                disabled={!canScrollLeft}
                aria-label="Obra anterior"
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? 'border-white/20 bg-white/5 hover:bg-[#59BFD6] text-white hover:text-puelche-dark hover:border-[#59BFD6] shadow-md hover:scale-105'
                    : 'border-white/5 bg-white/[0.02] text-white/20 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => scrollByDirection('right')}
                disabled={!canScrollRight}
                aria-label="Siguiente obra"
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                  canScrollRight
                    ? 'border-white/20 bg-white/5 hover:bg-[#59BFD6] text-white hover:text-puelche-dark hover:border-[#59BFD6] shadow-md hover:scale-105'
                    : 'border-white/5 bg-white/[0.02] text-white/20 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Link
              href="/portafolio"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-[#59BFD6] text-white hover:text-puelche-dark font-condensed uppercase tracking-wider text-xs font-bold transition-all shadow-md hover:scale-105 border border-white/15"
            >
              <span>Ver todas ({PORTFOLIO_PROJECTS.length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Pasarela Horizontal (Carrusel Panorámico con Arrastre Táctil & Inercia) */}
      <div className="relative w-full">
        <div
          ref={trackRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-6 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4 px-6 md:px-12 lg:px-16 cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CURATED_PROJECTS.map((project, idx) => (
            <article
              key={project.id}
              className="w-[85vw] sm:w-[65vw] lg:w-[48vw] shrink-0 snap-start"
            >
              <Link
                href={`/portafolio?proyecto=${project.slug}`}
                onClick={handleCardClick}
                className="group block h-full bg-[#141518]/90 hover:bg-[#18191E] border border-white/10 hover:border-[#59BFD6]/60 rounded-[28px] sm:rounded-[36px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(0,0,0,0.7)] flex flex-col justify-between"
              >
                <div>
                  {/* Escenario Fotográfico en Gran Formato */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      draggable={false}
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out select-none pointer-events-none"
                      sizes="(max-width: 768px) 85vw, (max-width: 1024px) 65vw, 48vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141518]/90 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity pointer-events-none" />

                    {/* Badge de Categoría */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#59BFD6] text-puelche-dark font-condensed font-bold text-xs uppercase tracking-wider shadow-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Botón Circular Flotante */}
                    <div className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#59BFD6] group-hover:text-puelche-dark transition-colors duration-300 backdrop-blur-md shadow-lg">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    {/* Micro-datos al pie de la foto */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs font-mono text-white/90">
                      <span className="flex items-center gap-1.5 drop-shadow-md">
                        <MapPin className="w-3.5 h-3.5 text-[#59BFD6]" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1.5 drop-shadow-md">
                        <Calendar className="w-3.5 h-3.5 text-[#59BFD6]" />
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Contenido Editorial de la Tarjeta */}
                  <div className="p-7 sm:p-8 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-[#59BFD6] uppercase tracking-wider">
                      <span>Cliente: {project.client}</span>
                      <span className="text-white/40">[ 0{idx + 1} / 0{CURATED_PROJECTS.length} ]</span>
                    </div>

                    <h3 className="font-condensed text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white group-hover:text-[#59BFD6] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-sm text-white/70 font-sans font-light leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer de Tarjeta con Entregables */}
                <div className="px-7 sm:px-8 pb-7 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.deliverables.slice(0, 3).map((d) => (
                      <span
                        key={d}
                        className="text-[11px] font-mono text-white/60 bg-white/5 px-2.5 py-1 rounded-full border border-white/5"
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  <span className="font-mono text-xs uppercase tracking-wider text-[#59BFD6] font-medium group-hover:underline flex items-center gap-1">
                    <span>Ver caso</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Scrubber Interactivo & Contador Inferior */}
      <div className="max-w-7xl mx-auto w-full mt-8 px-6 md:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Barra de Progreso Fina */}
        <div className="w-full sm:w-1/2 flex items-center gap-3">
          <div className="font-mono text-xs text-white/50 shrink-0">
            [ 0{activeIndex + 1} / 0{CURATED_PROJECTS.length} ]
          </div>
          <div className="relative flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#59BFD6] to-[#C29B63] transition-all duration-150 ease-out"
              style={{ width: `${Math.max(16, scrollProgress)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Banner Inferior de Llamado al Archivo Completo */}
      <div className="max-w-7xl mx-auto w-full mt-14 md:mt-20 pt-10 border-t border-white/10 px-6 md:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-1">
          <span className="font-mono text-xs text-[#59BFD6] uppercase tracking-widest block">
            EXPLORA MÁS DE 30 EXPEDICIONES
          </span>
          <p className="font-sans text-sm sm:text-base text-white/80 font-light">
            Descubre nuestro catálogo completo de arquitectura, marcas y faenas industriales.
          </p>
        </div>

        <Link
          href="/portafolio"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#59BFD6] text-puelche-dark font-condensed uppercase tracking-wider text-sm font-bold hover:bg-white transition-all shadow-[0_0_25px_rgba(89,191,214,0.35)] hover:scale-105 shrink-0"
        >
          <span>Ir al Portafolio Completo</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
