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
  const progressFillRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Mouse drag state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);
  const pointerStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastScrollTimeRef = useRef<number>(0);
  const isScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Escuchar eventos de scroll/wheel para anular clics accidentales mientras se navega con el trackpad
  useEffect(() => {
    const onScrollOrWheel = () => {
      lastScrollTimeRef.current = performance.now();
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 400);
    };
    const el = trackRef.current;
    if (el) {
      el.addEventListener('scroll', onScrollOrWheel, { passive: true });
      el.addEventListener('wheel', onScrollOrWheel, { passive: true });
    }
    window.addEventListener('wheel', onScrollOrWheel, { passive: true });
    window.addEventListener('scroll', onScrollOrWheel, { passive: true });
    return () => {
      if (el) {
        el.removeEventListener('scroll', onScrollOrWheel);
        el.removeEventListener('wheel', onScrollOrWheel);
      }
      window.removeEventListener('wheel', onScrollOrWheel);
      window.removeEventListener('scroll', onScrollOrWheel);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const canGoLeft = scrollLeft > 20;
    const canGoRight = scrollLeft < scrollWidth - clientWidth - 20;
    setCanScrollLeft((current) => (current === canGoLeft ? current : canGoLeft));
    setCanScrollRight((current) => (current === canGoRight ? current : canGoRight));

    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    if (progressFillRef.current) {
      const scale = Math.max(0.16, Math.min(100, Math.max(0, progress)) / 100);
      progressFillRef.current.style.transform = `scaleX(${scale})`;
    }

    // Calculate which card is currently centered
    const cardWidth = el.querySelector('article')?.clientWidth || clientWidth * 0.48;
    const currentIdx = Math.round(scrollLeft / (cardWidth + 24));
    const nextIndex = Math.min(CURATED_PROJECTS.length - 1, Math.max(0, currentIdx));
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  }, []);

  // Evitar autoplay fuera de pantalla, en pestañas ocultas o con movimiento reducido.
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => setPrefersReducedMotion(motionQuery.matches);
    const syncDocumentVisibility = () => setIsDocumentVisible(!document.hidden);

    syncMotionPreference();
    syncDocumentVisibility();
    motionQuery.addEventListener('change', syncMotionPreference);
    document.addEventListener('visibilitychange', syncDocumentVisibility);

    const track = trackRef.current;
    let observer: IntersectionObserver | null = null;
    if (track && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(([entry]) => {
        setIsInViewport(entry.isIntersecting);
      }, { threshold: 0.1 });
      observer.observe(track);
    } else {
      setIsInViewport(true);
    }

    return () => {
      motionQuery.removeEventListener('change', syncMotionPreference);
      document.removeEventListener('visibilitychange', syncDocumentVisibility);
      observer?.disconnect();
    };
  }, []);

  // Auto-avance horizontal con loop infinito, sólo mientras la galería está activa.
  useEffect(() => {
    if (isPaused || prefersReducedMotion || !isInViewport || !isDocumentVisible) return;

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
  }, [isPaused, prefersReducedMotion, isInViewport, isDocumentVisible]);

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
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
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

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const now = performance.now();
    const dist = Math.hypot(
      e.clientX - pointerStartRef.current.x,
      e.clientY - pointerStartRef.current.y
    );
    // Anular apertura si el usuario estaba scrolleando (últimos 400ms o en curso) o si hubo arrastre > 4px
    if (hasMovedRef.current || isScrollingRef.current || now - lastScrollTimeRef.current < 400 || dist > 4) {
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
              className="w-[88vw] sm:w-[72vw] lg:w-[54vw] xl:w-[48vw] shrink-0 snap-start"
            >
              <Link
                href={`/portafolio?proyecto=${project.slug}`}
                onPointerDown={handlePointerDown}
                onClick={handleCardClick}
                className="group block h-full bg-[#111215]/95 hover:bg-[#16171B] border border-white/10 hover:border-[#59BFD6] rounded-[28px] sm:rounded-[36px] overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.85)] flex flex-col justify-between"
              >
                <div>
                  {/* Escenario Fotográfico en Gran Formato Panorámico */}
                  <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden bg-black/80">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      draggable={false}
                      className="object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out select-none pointer-events-none"
                      sizes="(max-width: 768px) 88vw, (max-width: 1024px) 72vw, 48vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111215] via-transparent to-black/30 opacity-75 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

                    {/* Badge de Categoría & Sello de Fotograma */}
                    <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-10 flex items-center gap-2">
                      <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[#59BFD6] font-mono font-semibold text-xs uppercase tracking-wider shadow-md">
                        {project.category}
                      </span>
                      <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/80 font-mono text-[10px] uppercase tracking-widest border border-white/10">
                        FILM 0{idx + 1}A
                      </span>
                    </div>

                    {/* Botón Circular Flotante */}
                    <div className="absolute top-4 sm:top-5 right-4 sm:right-5 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#59BFD6] group-hover:text-puelche-dark transition-all duration-500 backdrop-blur-md shadow-xl group-hover:scale-110">
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    {/* Micro-datos al pie de la foto */}
                    <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 z-10 flex items-center justify-between text-xs font-mono text-white/90">
                      <span className="flex items-center gap-1.5 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                        <MapPin className="w-3.5 h-3.5 text-[#59BFD6]" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1.5 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                        <Calendar className="w-3.5 h-3.5 text-[#59BFD6]" />
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Contenido Editorial de la Tarjeta */}
                  <div className="p-6 sm:p-8 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-mono text-[#59BFD6] uppercase tracking-wider font-medium">
                      <span>Cliente: {project.client}</span>
                      <span className="text-white/40">[ 0{idx + 1} / 0{CURATED_PROJECTS.length} ]</span>
                    </div>

                    <h3 className="font-condensed text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white group-hover:text-[#59BFD6] transition-colors leading-[1.05]">
                      {project.title}
                    </h3>

                    <p className="text-sm text-white/70 font-sans font-light leading-relaxed line-clamp-2 max-w-xl">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer de Tarjeta con Entregables */}
                <div className="px-6 sm:px-8 pb-6 sm:pb-7 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.deliverables.slice(0, 3).map((d) => (
                      <span
                        key={d}
                        className="text-[11px] font-mono text-white/60 bg-white/5 px-2.5 py-1 rounded-full border border-white/10"
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  <span className="font-condensed uppercase tracking-wider text-xs text-[#59BFD6] font-bold group-hover:underline flex items-center gap-1">
                    <span>EXPLORAR OBRA</span>
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
              ref={progressFillRef}
              style={{ width: '100%', transform: 'scaleX(0.16)', transformOrigin: 'left center' }}
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
