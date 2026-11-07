'use client';

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PORTFOLIO_PROJECTS, ProjectItem } from '@/data/portfolio';
import { MapPin, Calendar, CheckCircle2, X, ArrowUpRight, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Compass, LayoutGrid, Waves, Film, Sparkles } from 'lucide-react';
import { LatitudeWorksRail } from '@/components/portfolio/LatitudeWorksRail';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CATEGORIES = ['Todos', 'Fotografía', 'Edición Fotográfica', 'Branding', 'Desarrollo Web', 'Editorial'] as const;

function PortfolioContent() {
  const searchParams = useSearchParams();
  const projectParam = searchParams.get('proyecto');
  const modoParam = searchParams.get('modo');

  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'river' | 'grid' | 'latitud'>('river');

  // GSAP ScrollTrigger Refs para el Río Cinético Austral (Horizontal Pinned Stream)
  const riverRunwayRef = useRef<HTMLDivElement>(null);
  const riverTrackRef = useRef<HTMLDivElement>(null);
  const riverProgressFillRef = useRef<HTMLDivElement>(null);
  const [riverActiveIdx, setRiverActiveIdx] = useState<number>(0);

  useEffect(() => {
    if (modoParam === 'latitud') {
      setViewMode('latitud');
    } else if (modoParam === 'grid') {
      setViewMode('grid');
    }
  }, [modoParam]);

  const filteredProjects = selectedCategory === 'Todos'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);

  const currentProjectIndex = activeModalProject
    ? filteredProjects.findIndex((p) => p.id === activeModalProject.id)
    : -1;

  const activeGallery = activeModalProject
    ? (activeModalProject.gallery && activeModalProject.gallery.length > 0
        ? activeModalProject.gallery
        : [activeModalProject.image])
    : [];

  const handleOpenProject = (project: ProjectItem) => {
    setActiveModalProject(project);
    setCurrentImageIndex(0);
  };

  const nextProject = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const list = filteredProjects.length > 0 ? filteredProjects : PORTFOLIO_PROJECTS;
    const currIdx = activeModalProject ? list.findIndex((p) => p.id === activeModalProject.id) : 0;
    const nextIdx = (currIdx + 1) % list.length;
    setActiveModalProject(list[nextIdx]);
    setCurrentImageIndex(0);
  }, [activeModalProject, filteredProjects]);

  const prevProject = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const list = filteredProjects.length > 0 ? filteredProjects : PORTFOLIO_PROJECTS;
    const currIdx = activeModalProject ? list.findIndex((p) => p.id === activeModalProject.id) : 0;
    const prevIdx = (currIdx - 1 + list.length) % list.length;
    setActiveModalProject(list[prevIdx]);
    setCurrentImageIndex(0);
  }, [activeModalProject, filteredProjects]);

  const activeProjectList = filteredProjects.length > 0 ? filteredProjects : PORTFOLIO_PROJECTS;
  const activeProjectIndex = activeModalProject ? activeProjectList.findIndex((p) => p.id === activeModalProject.id) : 0;
  const prevProjectItem = activeProjectList[(activeProjectIndex - 1 + activeProjectList.length) % activeProjectList.length];
  const nextProjectItem = activeProjectList[(activeProjectIndex + 1) % activeProjectList.length];

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeGallery.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % activeGallery.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeGallery.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + activeGallery.length) % activeGallery.length);
    }
  };

  // Keyboard navigation for multi-piece gallery, next/prev project & escape to close
  useEffect(() => {
    if (!activeModalProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalProject(null);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        nextProject();
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        prevProject();
      } else if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        nextProject();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        prevProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalProject, activeGallery.length, currentImageIndex, nextProject, prevProject]);

  // Auto-open project modal if ?proyecto= query param is provided
  useEffect(() => {
    if (projectParam) {
      const match = PORTFOLIO_PROJECTS.find(
        (p) =>
          p.slug === projectParam ||
          p.id === projectParam ||
          p.title.toLowerCase().includes(projectParam.toLowerCase())
      );
      if (match) {
        setActiveModalProject(match);
        setCurrentImageIndex(0);
      }
    }
  }, [projectParam]);

  // Pause Lenis and lock body scroll when modal is active
  useEffect(() => {
    const lenis = (window as any).lenisInstance;
    if (activeModalProject) {
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    }
    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    };
  }, [activeModalProject]);

  // ── GSAP ScrollTrigger: Sincronización del Río Cinético Austral (Horizontal Pinned Stream) ──
  useEffect(() => {
    if (viewMode !== 'river') return;

    const runway = riverRunwayRef.current;
    const track = riverTrackRef.current;
    if (!runway || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const getScrollDistance = () => {
          return Math.max(0, track.scrollWidth - window.innerWidth + 120);
        };

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: runway,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.75,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (riverProgressFillRef.current) {
                gsap.set(riverProgressFillRef.current, { scaleX: Math.max(0.04, self.progress) });
              }
              const nextIdx = Math.min(
                filteredProjects.length - 1,
                Math.floor(self.progress * filteredProjects.length)
              );
              setRiverActiveIdx((curr) => (curr === nextIdx ? curr : nextIdx));
            },
          },
        });
      }, runway);

      return () => ctx.revert();
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      media.revert();
    };
  }, [viewMode, filteredProjects, selectedCategory]);

  return (
    <div className="w-full min-h-screen bg-puelche-dark text-white flex flex-col -mt-20">
      {/* ── AUTHENTIC HERO BANNER (bg-portafolios-min.jpg) ── */}
      <section className="relative w-full h-screen min-h-[640px] overflow-hidden border-b border-white/10 bg-black">
        <Image
          src="/images/real/bg-portafolios-min.jpg"
          alt="Portafolio Puelche Lab"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-puelche-dark via-transparent to-black/35" />

        <div className="absolute bottom-12 left-6 sm:left-12 md:left-16 max-w-xl z-20">
          <h1 className="font-condensed text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-[#59BFD6] leading-none mb-3 drop-shadow-md">
            PORTAFOLIO
          </h1>
          <p className="font-condensed uppercase tracking-wider text-sm sm:text-base md:text-lg text-white font-medium max-w-md leading-relaxed drop-shadow-md">
            Fotografía de autor, plataformas web e identidades visuales con arraigo territorial austral.
          </p>
        </div>
      </section>

      {/* Editorial Header & Filters */}
      <div className="max-w-7xl mx-auto w-full px-6 py-10 md:py-14">
        <div className="border-b border-white/10 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs tracking-widest uppercase font-condensed text-[#59BFD6] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#59BFD6]"></span>
            <span>Colección Austral</span>
            <span className="text-white/30">/</span>
            <span>2020 — 2026</span>
          </div>
          <h2 className="font-condensed text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4">
            Obras que narran el sur.
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-3xl leading-relaxed font-sans font-light">
            Selección curada de proyectos desarrollados para clientes en Puerto Varas, Los Lagos, Chile y Argentina. 
            Dirección creativa sin artificios, fotografía territorial de autor y plataformas visuales de escala internacional.
          </p>
        </div>

        {/* Selector de Modo de Visualización (Río Cinético vs Archivo en Grilla vs Regla de Latitud) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <div className="inline-flex p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setViewMode('river')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-condensed uppercase tracking-wider transition-all duration-300 ${
                viewMode === 'river'
                  ? 'bg-[#59BFD6] text-puelche-dark font-bold shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Waves className="w-3.5 h-3.5" />
              <span>Río Cinético (Scroll)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-condensed uppercase tracking-wider transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-[#59BFD6] text-puelche-dark font-bold shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Archivo en Grilla ({filteredProjects.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('latitud')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-condensed uppercase tracking-wider transition-all duration-300 ${
                viewMode === 'latitud'
                  ? 'bg-[#59BFD6] text-puelche-dark font-bold shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Regla de Latitud Austral (41°S — 53°S)</span>
            </button>
          </div>

          <span className="font-mono text-xs text-white/50">
            {viewMode === 'latitud' ? '6 estaciones territoriales' : `${filteredProjects.length} obras documentadas`}
          </span>
        </div>

        {/* Regla de Latitud Austral — Recorrido Territorial de 41°S a 53°S */}
        {viewMode === 'latitud' && (
          <LatitudeWorksRail
            onSelectProject={(slug) => {
              const matched = PORTFOLIO_PROJECTS.find((p) => p.slug === slug || p.id === slug);
              if (matched) handleOpenProject(matched);
            }}
          />
        )}

        {/* Category Filters (Activos en Modo Río y Modo Grilla) */}
        <div className={`flex flex-wrap items-center gap-2 pb-4 ${viewMode === 'latitud' ? 'hidden' : ''}`}>
          {CATEGORIES.map((category) => {
            const count = category === 'Todos'
              ? PORTFOLIO_PROJECTS.length
              : PORTFOLIO_PROJECTS.filter((p) => p.category === category).length;
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-condensed uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#59BFD6] border-[#59BFD6] text-puelche-dark font-bold shadow-[0_0_15px_rgba(89,191,214,0.3)]'
                    : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                }`}
              >
                <span>{category}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-puelche-dark/20 text-puelche-dark' : 'bg-white/10 text-white/60'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 
        ======================================================================
        MODO 1: EL RÍO VISUAL CINÉTICO AUSTRAL (AWWWARDS SOTD PINNED STREAM)
        Las fotografías monumentales desfilan de derecha a izquierda conforme
        avanza el scroll vertical. Sin tarjetas rígidas; la luz y la imagen
        mandan. Clic en cualquier obra expande la Hoja de Contactos / Bitácora.
        ======================================================================
      */}
      {viewMode === 'river' && (
        <section
          ref={riverRunwayRef}
          aria-label="Río Cinético Austral — Pasarela de Obras al Scroll"
          className="relative w-full overflow-visible"
          style={{
            height: `${Math.max(260, Math.round(filteredProjects.length * 48 + 120))}vh`,
          }}
        >
          {/* Contenedor Sticky que se ancla en el viewport mientras el scroll vertical desplaza el track */}
          <div className="sticky top-0 w-full h-screen min-h-screen overflow-hidden flex flex-col justify-between pt-20 pb-8 bg-[#090a0d]">
            {/* Barra Superior de Estado y Coordenadas del Río */}
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center justify-between font-mono text-xs text-white/60 border-b border-white/10 pb-4 z-20">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#59BFD6] animate-pulse shadow-[0_0_8px_#59BFD6]" />
                <span className="text-white uppercase tracking-wider font-semibold">
                  41°S &mdash; 53°S &bull; RÍO VISUAL AUSTRAL
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-[#59BFD6] uppercase tracking-wider font-semibold">
                  [ 0{riverActiveIdx + 1} / 0{filteredProjects.length} ]
                </span>
                <span className="hidden sm:inline text-white/70">
                  {filteredProjects[riverActiveIdx]?.title || ''}
                </span>
              </div>
            </div>

            {/* Pista Horizontal de Fotografías Monumentales (Track Pinned al Scroll) */}
            <div className="relative w-full flex-1 flex items-center overflow-hidden">
              <div
                ref={riverTrackRef}
                className="flex items-center gap-8 sm:gap-12 lg:gap-16 px-6 md:px-16 w-max will-change-transform py-4"
              >
                {filteredProjects.map((project, idx) => {
                  const isActive = idx === riverActiveIdx;

                  return (
                    <article
                      key={project.id}
                      data-cursor="explore"
                      data-cursor-text="ABRIR OBRA"
                      onClick={() => setActiveModalProject(project)}
                      className="group shrink-0 cursor-pointer w-[85vw] sm:w-[68vw] md:w-[54vw] lg:w-[46vw] xl:w-[42vw] select-none flex flex-col justify-between transition-all duration-700"
                    >
                      {/* Ventana Fotográfica Panorámica en Gran Formato (16:10 para máxima inmersión) */}
                      <div className="aspect-[16/10] relative w-full overflow-hidden rounded-[24px] sm:rounded-[36px] bg-black/80 border border-white/10 group-hover:border-[#59BFD6] shadow-[0_25px_70px_rgba(0,0,0,0.85)] transition-all duration-700 group-hover:-translate-y-2">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          priority={idx < 2}
                          draggable={false}
                          className="object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out select-none"
                          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 68vw, 46vw"
                        />

                        {/* Viñeta Óptica de Cuarto Oscuro */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d]/90 via-black/15 to-transparent pointer-events-none opacity-85 group-hover:opacity-60 transition-opacity duration-500" />

                        {/* Badges de Categoría y Expedición */}
                        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 flex items-center gap-2">
                          <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[#59BFD6] font-mono text-[11px] uppercase tracking-wider font-semibold shadow-md">
                            {project.category}
                          </span>
                          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/80 font-mono text-[10px] uppercase tracking-widest border border-white/10">
                            EXPEDICIÓN 0{idx + 1}
                          </span>
                        </div>

                        {/* Botón Circular Cinético de Apertura */}
                        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#59BFD6] group-hover:text-puelche-dark transition-all duration-500 backdrop-blur-md shadow-xl group-hover:scale-110">
                          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>

                        {/* Coordenadas Geográficas & Año al Pie de la Foto */}
                        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-10 flex items-center justify-between text-xs font-mono text-white/90">
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

                      {/* Bloque Editorial & Narrativa al Pie */}
                      <div className="pt-5 sm:pt-6 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono text-[#59BFD6] uppercase tracking-wider">
                          <span>Cliente: {project.client}</span>
                          <span className="text-white/40">41°S &mdash; 53°S</span>
                        </div>

                        <h3 className="font-condensed text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white group-hover:text-[#59BFD6] transition-colors leading-[1.02]">
                          {project.title}
                        </h3>

                        <p className="text-sm text-white/70 font-sans font-light leading-relaxed line-clamp-2 max-w-xl">
                          {project.description}
                        </p>

                        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 mt-3">
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

                          <div className="inline-flex items-center gap-1.5 text-xs font-condensed uppercase tracking-wider text-[#59BFD6] font-bold group-hover:underline">
                            <span>VER BITÁCORA</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Barra Inferior de Control, Scrubber & Guía de Navegación */}
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 z-20">
              <div className="flex items-center gap-3 w-full sm:w-auto text-xs font-mono text-white/50">
                <Waves className="w-4 h-4 text-[#59BFD6] animate-pulse" />
                <span>DESLIZA EL SCROLL PARA BAILAR CON LAS FOTOGRAFÍAS &bull; CLICK PARA VER DETALLE</span>
              </div>

              {/* Scrubber Lineal Fino */}
              <div className="w-full sm:w-80 flex items-center gap-3">
                <span className="font-mono text-xs text-[#59BFD6]">01</span>
                <div className="relative flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
                  <div
                    ref={riverProgressFillRef}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#59BFD6] to-[#C29B63] transition-all duration-150 ease-out origin-left"
                    style={{ width: '100%', transform: 'scaleX(0.08)' }}
                  />
                </div>
                <span className="font-mono text-xs text-white/50">
                  {String(filteredProjects.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 
        ======================================================================
        MODO 2: ARCHIVO GENERAL EN GRILLA EDITORIAL (HOJA DE CONTACTOS)
        Para revisión rápida de vista de pájaro y compatibilidad de runner E2E.
        ======================================================================
      */}
      <div className={`max-w-7xl mx-auto w-full px-6 pb-32 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 ${viewMode !== 'grid' ? 'hidden' : ''}`}>
        {filteredProjects.map((project, idx) => {
          const isMonumental = idx % 3 === 0;
          const isLeftStagger = idx % 3 === 1;
          const isRightStagger = idx % 3 === 2;

          const colSpanClass = isMonumental
            ? 'md:col-span-12'
            : isLeftStagger
            ? 'md:col-span-7'
            : 'md:col-span-5 md:pt-16 lg:pt-28';

          return (
            <article
              key={project.id}
              data-cursor="explore"
              data-cursor-text="VER OBRA"
              onClick={() => setActiveModalProject(project)}
              className={`group cursor-pointer bg-[#0e1014]/90 border border-white/10 rounded-[30px] sm:rounded-[40px] overflow-hidden hover:border-[#59BFD6]/70 hover:shadow-[0_30px_80px_rgba(0,0,0,0.85)] transition-all duration-700 flex flex-col justify-between hover:-translate-y-2 ${colSpanClass}`}
            >
              <div>
                {/* Contenedor Fotográfico de Gran Escala */}
                <div
                  className={`relative w-full overflow-hidden bg-black/60 ${
                    isMonumental
                      ? 'aspect-[16/10] sm:aspect-[21/9] min-h-[320px] sm:min-h-[460px] lg:min-h-[520px]'
                      : 'aspect-[16/10] sm:aspect-[4/3] min-h-[280px] sm:min-h-[380px]'
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                    sizes={isMonumental ? '100vw' : '(max-width: 768px) 100vw, 55vw'}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1014] via-transparent to-black/30 opacity-80 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

                  {/* Badge de Disciplina y Botón Cinético Flotante */}
                  <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[#59BFD6] font-mono text-[11px] uppercase tracking-wider font-semibold shadow-lg">
                      {project.category}
                    </span>
                    <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/80 font-mono text-[10px] uppercase tracking-widest border border-white/10">
                      EXPEDICIÓN Nº {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#59BFD6] group-hover:text-puelche-dark transition-all duration-500 backdrop-blur-md shadow-xl group-hover:scale-110">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  {/* Coordenadas Geográficas & Año al Pie de la Foto */}
                  <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between text-xs font-mono text-white/90">
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

                {/* Bloque Editorial & Narrativa de Autor */}
                <div className="p-7 sm:p-9 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#59BFD6] uppercase tracking-wider font-medium">
                      Cliente: {project.client}
                    </span>
                    <span className="text-[11px] font-mono text-white/40 uppercase">
                      41°S &mdash; 53°S
                    </span>
                  </div>

                  <h3
                    className={`font-condensed font-bold uppercase tracking-tight text-white group-hover:text-[#59BFD6] transition-colors leading-[1.05] ${
                      isMonumental
                        ? 'text-3xl sm:text-4xl lg:text-5xl max-w-4xl'
                        : 'text-2xl sm:text-3xl lg:text-4xl'
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base text-white/75 font-sans font-light leading-relaxed line-clamp-2 max-w-3xl pt-1">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Pie de Ficha con Soportes Técnicos & Acción Inmediata */}
              <div className="px-7 sm:px-9 pb-8 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.deliverables.slice(0, 3).map((d) => (
                    <span
                      key={d}
                      className="text-[11px] font-mono text-white/60 bg-white/[0.04] px-3 py-1 rounded-full border border-white/10"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                <div className="shrink-0 w-full sm:w-auto">
                  <div className="inline-flex items-center gap-2 font-condensed uppercase tracking-wider text-xs font-bold text-[#59BFD6] group-hover:text-white transition-colors">
                    <span>EXPLORAR OBRA &amp; BITÁCORA</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* 
        ======================================================================
        MODAL DRAWER: SPLIT EDITORIAL 2 COLUMNAS (AWWWARDS GRADE)
        Centrado, de alto contraste, sin sangrado de fondo.
        Navegación completa por teclado (← / → / ESC), flechas laterales flotantes
        y scrubber vertical discreto.
        ======================================================================
      */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/85 bg-black/70 backdrop-blur-sm backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalProject(null)}
          data-lenis-prevent="true"
        >
          {/* Fondo oscuro sólido extra para garantizar 100% de legibilidad sin sangrado de fondo */}
          <div className="absolute inset-0 bg-[#090a0d]/95 pointer-events-none" />

          {/* ── BOTONES DE NAVEGACIÓN LATERAL FLOTANTES (< y >) ── */}
          <button
            type="button"
            onClick={prevProject}
            className="hidden xl:flex fixed left-4 2xl:left-8 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 rounded-full bg-[#16171B]/95 hover:bg-[#59BFD6] text-white hover:text-puelche-dark border border-white/20 hover:border-[#59BFD6] shadow-[0_0_30px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 items-center justify-center group"
            aria-label="Proyecto anterior"
            title={`Anterior: ${prevProjectItem?.title || ''} (Tecla ← o A)`}
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={nextProject}
            className="hidden xl:flex fixed right-4 2xl:right-8 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 rounded-full bg-[#16171B]/95 hover:bg-[#59BFD6] text-white hover:text-puelche-dark border border-white/20 hover:border-[#59BFD6] shadow-[0_0_30px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 items-center justify-center group"
            aria-label="Siguiente proyecto"
            title={`Siguiente: ${nextProjectItem?.title || ''} (Tecla → o D)`}
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* ── CONTENEDOR MODAL SPLIT EDITORIAL ── */}
          <div
            className="relative w-full max-w-6xl max-h-[90vh] bg-[#111215] border border-white/20 rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_25px_90px_rgba(0,0,0,0.95)] flex flex-col z-10"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header del Modal con Datos de Campo y Botón Cerrar */}
            <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 border-b border-white/10 bg-[#16171B]/90 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#59BFD6] animate-pulse"></span>
                <span className="font-condensed uppercase tracking-wider text-xs sm:text-sm text-white/70 font-semibold">
                  PLIEGO DE LABORATORIO FOTOGRÁFICO &bull; CASO DE ESTUDIO
                </span>
                <span className="hidden md:inline-block font-mono text-[11px] text-white/40">
                  [{currentProjectIndex + 1} de {filteredProjects.length}]
                </span>
              </div>

              {/* Controles de Navegación Rápida & Botón Cerrar */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white/5 rounded-full border border-white/10 p-0.5">
                  <button
                    type="button"
                    onClick={prevProject}
                    className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Proyecto anterior"
                    title="Anterior (←)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-2 font-mono text-xs text-white/60 select-none">
                    {currentProjectIndex + 1}/{filteredProjects.length}
                  </span>
                  <button
                    type="button"
                    onClick={nextProject}
                    className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Siguiente proyecto"
                    title="Siguiente (→)"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalProject(null)}
                  className="z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-[#59BFD6] text-white hover:text-puelche-dark flex items-center justify-center transition-all duration-200 border border-white/10 hover:scale-105 ml-1"
                  aria-label="Cerrar modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cuerpo del Modal: Split Editorial 2 Columnas */}
            <div className="flex-1 overflow-y-auto no-scrollbar grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              {/* Columna Izquierda (7 cols): Visor Fotográfico & Galería Multi-Pieza */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-black/40">
                <div className="space-y-4">
                  {/* Visor Principal con Proporción 16:10 y Controles de Galería */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black/80 border border-white/10 group">
                    <Image
                      src={activeGallery[currentImageIndex] || activeModalProject.image}
                      alt={activeModalProject.title}
                      fill
                      priority
                      className="object-cover object-center transition-all duration-500"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />

                    {/* Guías Ópticas de Encuadre (Crosshair) de Cámara Profesional */}
                    <div className="absolute inset-4 pointer-events-none border border-white/15 opacity-40">
                      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#59BFD6]" />
                      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#59BFD6]" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#59BFD6]" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#59BFD6]" />
                    </div>

                    {/* Contador de Fotos */}
                    {activeGallery.length > 1 && (
                      <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono text-white/90">
                        FOTOGRAMA {currentImageIndex + 1} DE {activeGallery.length}
                      </div>
                    )}

                    {/* Controles de Foto Anterior / Siguiente dentro de la Galería */}
                    {activeGallery.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-[#59BFD6] text-white hover:text-puelche-dark flex items-center justify-center backdrop-blur-md transition-all duration-200 border border-white/10"
                          aria-label="Foto anterior"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-[#59BFD6] text-white hover:text-puelche-dark flex items-center justify-center backdrop-blur-md transition-all duration-200 border border-white/10"
                          aria-label="Siguiente foto"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Tira de Miniaturas (Contact Sheet Strip) */}
                  {activeGallery.length > 1 && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                      {activeGallery.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setCurrentImageIndex(i)}
                          className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all duration-200 ${
                            i === currentImageIndex
                              ? 'border-[#59BFD6] scale-105 shadow-[0_0_12px_rgba(89,191,214,0.5)]'
                              : 'border-white/20 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`${activeModalProject.title} toma ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                          <span className="absolute bottom-0.5 right-1 font-mono text-[9px] text-white bg-black/70 px-1 rounded">
                            0{i + 1}A
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Metadatos EXIF / Registro de Cámara de Autor */}
                <div className="bg-[#18191E]/90 border border-white/10 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">Lente / Óptica</span>
                    <span className="text-white/90">Sony FE 24-70mm G Master</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">Luz Solar</span>
                    <span className="text-[#59BFD6]">Hora Dorada Austral</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">Coordenadas</span>
                    <span className="text-white/90">41°19′S 72°59′W</span>
                  </div>
                </div>
              </div>

              {/* Columna Derecha (5 cols): Ficha Curatorial, Metadatos y Conversión */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#131418]">
                <div className="space-y-5">
                  {/* Badge & Categoría */}
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#59BFD6]/15 border border-[#59BFD6]/40 text-[#59BFD6] font-mono text-xs uppercase tracking-wider font-semibold">
                      {activeModalProject.category}
                    </span>
                    <span className="font-mono text-xs text-white/50">
                      Año {activeModalProject.year}
                    </span>
                  </div>

                  {/* Título de la Obra */}
                  <div>
                    <h3
                      id="modal-title"
                      className="font-condensed text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white leading-tight mb-2"
                    >
                      {activeModalProject.title}
                    </h3>
                    <p className="text-xs font-mono text-[#59BFD6] uppercase tracking-wide">
                      Cliente: {activeModalProject.client}
                    </p>
                  </div>

                  {/* Metadatos de Territorio & Especialidad */}
                  <div className="border-y border-white/10 py-3 grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="flex items-center gap-2 text-white/80">
                      <MapPin className="w-4 h-4 text-[#59BFD6] shrink-0" />
                      <span>{activeModalProject.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <Calendar className="w-4 h-4 text-[#59BFD6] shrink-0" />
                      <span>{activeModalProject.year}</span>
                    </div>
                  </div>

                  {/* Crónica de Campo / Relato de Autor */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-white/40 block">
                      Crónica de Campo &amp; Expedición
                    </span>
                    <p className="text-sm sm:text-base text-white/85 font-sans font-light leading-relaxed">
                      {activeModalProject.description}
                    </p>
                  </div>

                  {/* Entregables y Disciplinas Realizadas */}
                  {activeModalProject.deliverables && activeModalProject.deliverables.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <span className="text-xs font-mono uppercase tracking-wider text-white/40 block">
                        Entregables de la Obra
                      </span>
                      <div className="space-y-1.5">
                        {activeModalProject.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-mono text-white/80">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#59BFD6] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Acciones de Cierre & Conversión a Contacto */}
                <div className="pt-6 border-t border-white/10 space-y-3">
                  <Link
                    href={`/contacto?proyecto=${encodeURIComponent(activeModalProject.title)}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#59BFD6] text-puelche-dark font-condensed font-bold uppercase tracking-wider text-sm hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(89,191,214,0.4)]"
                  >
                    <span>Cotizar Proyecto Similar</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center justify-between text-[11px] font-mono text-white/40 pt-1">
                    <span>Navega con flechas [← / →]</span>
                    <span>Cerrar con [ESC]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-puelche-dark flex items-center justify-center text-white">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-[#59BFD6] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-condensed text-xs uppercase tracking-widest text-[#59BFD6]">
              Cargando Portafolio Puelche...
            </p>
          </div>
        </div>
      }
    >
      <PortfolioContent />
    </Suspense>
  );
}
