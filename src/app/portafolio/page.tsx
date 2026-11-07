'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PORTFOLIO_PROJECTS, ProjectItem } from '@/data/portfolio';
import { MapPin, Calendar, CheckCircle2, X, ArrowUpRight, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Compass, LayoutGrid } from 'lucide-react';
import { LatitudeWorksRail } from '@/components/portfolio/LatitudeWorksRail';

const CATEGORIES = ['Todos', 'Fotografía', 'Edición Fotográfica', 'Branding', 'Desarrollo Web', 'Editorial'] as const;

function PortfolioContent() {
  const searchParams = useSearchParams();
  const projectParam = searchParams.get('proyecto');
  const modoParam = searchParams.get('modo');

  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'grid' | 'latitud'>('grid');

  useEffect(() => {
    if (modoParam === 'latitud') {
      setViewMode('latitud');
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

        {/* Selector de Modo de Visualización (Archivo vs Regla de Latitud Austral) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <div className="inline-flex p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
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
              <span>Archivo General ({PORTFOLIO_PROJECTS.length})</span>
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

        {/* Category Filters (Activos en Modo Grilla) */}
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

      {/* Projects Grid — Siluetas Orgánicas de Canto Rodado (rounded-[32px]) */}
      <div className={`max-w-7xl mx-auto w-full px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 ${viewMode === 'latitud' ? 'hidden' : ''}`}>
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            data-cursor="explore"
            data-cursor-text="VER OBRA"
            onClick={() => setActiveModalProject(project)}
            className="group cursor-pointer bg-[#141519]/90 border border-white/10 rounded-[28px] sm:rounded-[36px] overflow-hidden hover:border-[#59BFD6]/60 hover:shadow-[0_25px_60px_rgba(0,0,0,0.65)] transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5"
          >
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141519] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#59BFD6] text-puelche-dark font-condensed font-bold text-xs uppercase tracking-wider shadow-md">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#59BFD6] group-hover:text-puelche-dark transition-colors duration-300 backdrop-blur-md">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#59BFD6]" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#59BFD6]" />
                    {project.year}
                  </span>
                </div>
              </div>

              <div className="p-7 sm:p-8 space-y-3">
                <div className="text-xs font-mono text-[#59BFD6] uppercase tracking-wider">
                  Cliente: {project.client}
                </div>
                <h3 className="font-condensed text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white group-hover:text-[#59BFD6] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-white/70 font-sans font-light leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="px-7 sm:px-8 pb-7 pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {project.deliverables.slice(0, 3).map((d) => (
                  <span key={d} className="text-[11px] font-mono text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    {d}
                  </span>
                ))}
              </div>

              <div className="shrink-0 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalProject(project);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#59BFD6] border border-white text-white font-condensed font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-[#59BFD6] transition-all duration-300 shadow-md flex items-center justify-center"
                >
                  VER FOTOGRAFÍAS
                </button>
              </div>
            </div>
          </article>
        ))}
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
            title={`Anterior: ${prevProjectItem?.title} (←)`}
          >
            <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={nextProject}
            className="hidden xl:flex fixed right-4 2xl:right-8 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 rounded-full bg-[#16171B]/95 hover:bg-[#59BFD6] text-white hover:text-puelche-dark border border-white/20 hover:border-[#59BFD6] shadow-[0_0_30px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 items-center justify-center group"
            aria-label="Siguiente proyecto"
            title={`Siguiente: ${nextProjectItem?.title} (→)`}
          >
            <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* ── BARRITA LATERAL DISCRETA Y ELEGANTE (SCRUBBER VERTICAL) ── */}
          <div
            className="hidden 2xl:flex fixed right-20 top-1/2 -translate-y-1/2 z-[105] flex-col items-center gap-2 p-2.5 rounded-full bg-[#16171B]/95 backdrop-blur-md border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={prevProject}
              className="p-1 rounded-full text-white/50 hover:text-[#59BFD6] transition-colors"
              title="Proyecto anterior"
            >
              <ChevronUp className="w-4 h-4" />
            </button>

            <div className="font-mono text-[10px] text-[#59BFD6] font-bold tracking-wider">
              {String(activeProjectIndex + 1).padStart(2, '0')}
            </div>

            {/* Track interactivo */}
            <div
              className="relative w-1.5 h-32 bg-white/10 rounded-full overflow-hidden cursor-pointer"
              title="Progreso de obras (click para navegar)"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickY = e.clientY - rect.top;
                const ratio = Math.max(0, Math.min(1, clickY / rect.height));
                const targetIdx = Math.floor(ratio * activeProjectList.length);
                setActiveModalProject(activeProjectList[targetIdx]);
                setCurrentImageIndex(0);
              }}
            >
              <div
                className="absolute top-0 left-0 w-full bg-[#59BFD6] rounded-full transition-all duration-300 shadow-[0_0_8px_#59BFD6]"
                style={{
                  height: `${((activeProjectIndex + 1) / activeProjectList.length) * 100}%`,
                }}
              />
            </div>

            <div className="font-mono text-[9px] text-white/40">
              {String(activeProjectList.length).padStart(2, '0')}
            </div>

            <button
              type="button"
              onClick={nextProject}
              className="p-1 rounded-full text-white/50 hover:text-[#59BFD6] transition-colors"
              title="Siguiente proyecto"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* ── CAJA CENTRAL DEL MODAL (FORMATO DE GRAN ESCALA: 68% FOTO GIGANTE / 32% TEXTO) ── */}
          <div
            className="bg-[#141518] text-white rounded-[24px] sm:rounded-[32px] max-w-7xl w-[96vw] max-h-[90vh] overflow-hidden border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.95)] relative flex flex-col lg:flex-row z-10 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
          >
            {/* Botón Cerrar Flotante */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#2B2D32]/90 hover:bg-[#59BFD6] text-white hover:text-puelche-dark flex items-center justify-center transition-all shadow-xl border border-white/15 backdrop-blur-md"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Columna Izquierda: Fotografía de Gran Formato (68% del ancho en Desktop, sin recortes) */}
            <div className="relative w-full lg:w-[68%] min-h-[380px] sm:min-h-[500px] lg:min-h-[700px] bg-[#090a0d] shrink-0 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
              {/* Ambient blur glow */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Image
                  src={activeGallery[currentImageIndex] || activeModalProject.image}
                  alt=""
                  fill
                  className="object-cover blur-3xl opacity-35 scale-125 transition-all duration-700"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Main Artwork Centered (Anti-Cropping & Gran Escala) */}
              <div className="relative w-full h-full min-h-[340px] sm:min-h-[460px] lg:min-h-[660px] flex items-center justify-center z-10">
                <Image
                  src={activeGallery[currentImageIndex] || activeModalProject.image}
                  alt={`${activeModalProject.title} — Pieza ${currentImageIndex + 1}`}
                  fill
                  priority
                  className="object-contain object-center drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] transition-all duration-500"
                />
              </div>

              {/* Controles de Navegación de Piezas de Galería < y > */}
              {activeGallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/75 hover:bg-[#59BFD6] hover:text-puelche-dark text-white flex items-center justify-center transition-all border border-white/20 shadow-2xl backdrop-blur-md hover:scale-105 active:scale-95"
                    aria-label="Pieza anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/75 hover:bg-[#59BFD6] hover:text-puelche-dark text-white flex items-center justify-center transition-all border border-white/20 shadow-2xl backdrop-blur-md hover:scale-105 active:scale-95"
                    aria-label="Siguiente pieza"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Badge de Categoría y Contador de Piezas */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="px-4 py-1.5 rounded-full bg-[#59BFD6] text-puelche-dark text-xs uppercase font-bold tracking-wider shadow-lg">
                  {activeModalProject.category}
                </span>
                {activeGallery.length > 1 && (
                  <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white/90 font-mono text-[11px] uppercase tracking-wider">
                    Pieza {currentImageIndex + 1} de {activeGallery.length}
                  </span>
                )}
              </div>

              {/* Miniaturas de selección rápida de fotos */}
              {activeGallery.length > 1 && (
                <div className="absolute bottom-16 md:bottom-20 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15">
                  {activeGallery.map((img, idx) => (
                    <button
                      key={img + idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        currentImageIndex === idx
                          ? 'bg-[#59BFD6] scale-125 shadow-[0_0_8px_#59BFD6]'
                          : 'bg-white/30 hover:bg-white/70'
                      }`}
                      aria-label={`Ver pieza ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Micro-datos cliente y expedición en la base de la imagen */}
              <div className="absolute bottom-4 left-4 right-4 z-10 hidden md:block font-mono text-xs text-white/90 bg-black/75 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">CLIENTE</span>
                  <span className="text-[#59BFD6] font-medium">{activeModalProject.client}</span>
                </div>
                <div className="flex items-center justify-between mt-1 pt-1 border-t border-white/10">
                  <span className="text-white/60">AÑO & EXPEDICIÓN</span>
                  <span>Año {activeModalProject.year} &bull; {activeModalProject.location}</span>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Información Editorial con Scroll Nativo */}
            <div
              className="w-full lg:w-[32%] p-6 sm:p-8 lg:p-9 flex flex-col justify-between overflow-y-auto max-h-[50vh] lg:max-h-[92vh] space-y-6 bg-[#141518]"
              data-lenis-prevent="true"
            >
              <div className="space-y-6">
                {/* Header Editorial del Modal */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 pr-12">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#59BFD6] uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#59BFD6] animate-pulse" />
                      <span>EXPEDICIÓN PUELCHE LAB</span>
                    </div>
                    {/* Contador de Obra */}
                    <span className="font-mono text-[11px] text-white/50 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                      {String(activeProjectIndex + 1).padStart(2, '0')} / {String(activeProjectList.length).padStart(2, '0')}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-condensed font-bold uppercase tracking-wide leading-tight text-white">
                    {activeModalProject.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-white/70 mt-3 font-mono border-b border-white/10 pb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#59BFD6]" />
                      {activeModalProject.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#59BFD6]" />
                      Año {activeModalProject.year}
                    </span>
                    <span className="md:hidden">Cliente: {activeModalProject.client}</span>
                  </div>
                </div>

                {/* Desafío & Dirección */}
                <div>
                  <div className="inline-block px-2.5 py-1 rounded bg-[#59BFD6]/15 border border-[#59BFD6]/30 mb-2">
                    <h4 className="font-condensed text-xs uppercase tracking-widest text-[#59BFD6] font-bold">
                      Desafío & Dirección
                    </h4>
                  </div>
                  <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
                    {activeModalProject.description}
                  </p>
                </div>

                {/* Entregables & Soportes Técnicos */}
                <div className="bg-[#22242A]/80 p-5 rounded-2xl border border-white/10">
                  <h4 className="font-condensed text-xs uppercase tracking-widest text-white font-bold mb-3">
                    Entregables & Soportes Técnicos
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeModalProject.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs sm:text-sm text-white/85">
                        <CheckCircle2 className="w-4 h-4 text-[#59BFD6] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botón de Conversión CTA y Navegación Móvil */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                {/* Atajo de navegación móvil entre proyectos */}
                <div className="flex xl:hidden items-center justify-between text-xs font-mono text-white/60 bg-white/5 p-2 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={prevProject}
                    className="flex items-center gap-1 hover:text-[#59BFD6] transition-colors px-2 py-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </button>
                  <span className="text-[#59BFD6] font-bold">
                    {activeProjectIndex + 1} / {activeProjectList.length}
                  </span>
                  <button
                    type="button"
                    onClick={nextProject}
                    className="flex items-center gap-1 hover:text-[#59BFD6] transition-colors px-2 py-1"
                  >
                    <span>Siguiente</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  <span className="text-xs text-white/60 block">
                    ¿Tienes una iniciativa similar en la Región de Los Lagos o Patagonia?
                  </span>
                  <Link
                    href={`/contacto?proyecto=${encodeURIComponent(activeModalProject.title)}`}
                    className="w-full text-center px-6 py-3.5 rounded-full bg-[#59BFD6] text-puelche-dark text-xs font-condensed uppercase tracking-wider font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(89,191,214,0.3)] hover:scale-[1.01] block"
                  >
                    Cotizar propuesta similar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Portafolio de Obras y Expediciones — Puelche Lab',
  description:
    'Catálogo de obras de diseño de marca, fotografía territorial, publicaciones editoriales y plataformas web desarrolladas en Puerto Varas y la Patagonia.',
  url: 'https://www.puelchelab.cl/portafolio',
  publisher: {
    '@type': 'Organization',
    name: 'Puelche Lab',
    url: 'https://www.puelchelab.cl',
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: PORTFOLIO_PROJECTS.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'CreativeWork',
        name: p.title,
        description: p.summary,
        creator: {
          '@type': 'Organization',
          name: 'Puelche Lab',
        },
        image: `https://www.puelchelab.cl${p.image}`,
        genre: p.category,
        datePublished: p.year,
        locationCreated: {
          '@type': 'Place',
          name: p.location,
        },
      },
    })),
  },
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-puelche-dark" />}>
        <PortfolioContent />
      </Suspense>
    </>
  );
}
