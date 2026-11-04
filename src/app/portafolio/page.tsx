'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PORTFOLIO_PROJECTS, ProjectItem } from '@/data/portfolio';
import { MapPin, Calendar, CheckCircle2, X, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = ['Todos', 'Fotografía', 'Edición Fotográfica', 'Branding', 'Desarrollo Web', 'Editorial'] as const;

function PortfolioContent() {
  const searchParams = useSearchParams();
  const projectParam = searchParams.get('proyecto');

  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

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
        if (e.shiftKey || activeGallery.length <= 1 || currentImageIndex === activeGallery.length - 1) {
          nextProject();
        } else {
          setCurrentImageIndex((prev) => prev + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        if (e.shiftKey || activeGallery.length <= 1 || currentImageIndex === 0) {
          prevProject();
        } else {
          setCurrentImageIndex((prev) => prev - 1);
        }
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
            Deslízate hacia abajo y mira lo que este viento a dejado en cada uno de los servicios que tenemos.
          </p>
        </div>
      </section>

      {/* Editorial Header & Filters */}
      <div className="max-w-7xl mx-auto w-full px-6 py-10 md:py-14">
        <div className="border-b border-white/10 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs tracking-widest uppercase font-condensed text-[#59BFD6] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#59BFD6]"></span>
            <span>Archivo de Obras & Expediciones</span>
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

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pb-4">
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
      <div className="max-w-7xl mx-auto w-full px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
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
        RUNWAY INMERSIVO FULL-BLEED DE PROYECTOS (ESTILO LOCOMOTIVE / STUDIO FREIGHT)
        Experiencia cinematográfica a pantalla completa (100vw x 100vh)
        Navegación completa por teclado (← / → / A / D / ESC) y riel lateral tickeable
        ======================================================================
      */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-[100] w-screen h-screen min-h-screen bg-black/70 backdrop-blur-sm bg-[#08090c] text-white overflow-y-auto overflow-x-hidden flex flex-col animate-in fade-in duration-300 selection:bg-[#59BFD6] selection:text-[#08090c]"
          data-lenis-prevent="true"
        >
          {/* ── BARRA SUPERIOR FIJA DE COMANDO EDITORIAL ── */}
          <header className="sticky top-0 z-50 w-full px-6 md:px-12 py-4 bg-[#08090c]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#59BFD6] bg-[#59BFD6]/10 px-2.5 py-1 rounded-sm border border-[#59BFD6]/30">
                [ {activeProjectIndex >= 0 ? String(activeProjectIndex + 1).padStart(2, '0') : '01'} / {String(filteredProjects.length).padStart(2, '0')} ]
              </span>
              <span className="font-condensed text-xs uppercase tracking-wider font-bold text-white/90 hidden sm:inline">
                {activeModalProject.category}
              </span>
              <span className="text-white/30 hidden sm:inline">&bull;</span>
              <span className="font-mono text-xs text-white/60 hidden md:inline">
                Cliente: <strong className="text-white font-medium">{activeModalProject.client}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] text-white/50 uppercase tracking-widest bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/10">
                <span>Navegar:</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[9px] border border-white/15">←</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[9px] border border-white/15">→</kbd>
                <span className="text-white/30">|</span>
                <span>Cerrar:</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[9px] border border-white/15">ESC</kbd>
              </div>

              {/* Botón Cerrar Modal Accesible */}
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#59BFD6] text-white hover:text-puelche-dark transition-all duration-300 border border-white/15 shadow-lg"
                aria-label="Cerrar modal"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider hidden sm:inline font-medium">
                  Cerrar
                </span>
                <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
              </button>
            </div>
          </header>

          {/* ── BOTONES LATERALES FLOTANTES EN PANTALLA (< y >) ── */}
          <button
            type="button"
            onClick={prevProject}
            className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[110] group flex items-center gap-2 p-3 sm:p-4 rounded-full bg-[#18191B]/95 hover:bg-[#59BFD6] text-white hover:text-puelche-dark border border-white/20 hover:border-[#59BFD6] shadow-[0_0_30px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Proyecto anterior"
            title={`Anterior: ${prevProjectItem?.title}`}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="hidden xl:inline-block max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-condensed text-xs uppercase tracking-wider font-bold pr-1">
              Anterior
            </span>
          </button>

          <button
            type="button"
            onClick={nextProject}
            className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[110] group flex items-center gap-2 p-3 sm:p-4 rounded-full bg-[#18191B]/95 hover:bg-[#59BFD6] text-white hover:text-puelche-dark border border-white/20 hover:border-[#59BFD6] shadow-[0_0_30px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Siguiente proyecto"
            title={`Siguiente: ${nextProjectItem?.title}`}
          >
            <span className="hidden xl:inline-block max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-condensed text-xs uppercase tracking-wider font-bold pl-1 text-right">
              Siguiente
            </span>
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* ── BARRITA LATERAL VERTICAL TICKEABLE DE PROYECTOS ── */}
          <aside
            aria-label="Navegación lateral de proyectos"
            className="hidden 2xl:flex fixed right-24 top-1/2 -translate-y-1/2 z-[105] flex-col items-center gap-1.5 p-2.5 rounded-full bg-[#18191B]/90 backdrop-blur-md border border-white/15 shadow-2xl max-h-[75vh] overflow-y-auto scrollbar-none"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[8px] font-mono uppercase text-white/40 tracking-widest writing-mode-vertical mb-1 select-none">
              OBRAS
            </span>
            {filteredProjects.map((proj, idx) => {
              const isActive = proj.id === activeModalProject.id;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalProject(proj);
                    setCurrentImageIndex(0);
                  }}
                  className={`group relative flex items-center justify-center p-1 rounded-full transition-all duration-200 ${
                    isActive ? 'scale-125' : 'hover:scale-110'
                  }`}
                  aria-label={`Ir a ${proj.title}`}
                  title={`${idx + 1}. ${proj.title}`}
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-6 h-1.5 bg-[#59BFD6] shadow-[0_0_10px_#59BFD6]'
                        : 'w-2 h-1 bg-white/30 group-hover:bg-white/80 group-hover:w-4'
                    }`}
                  />
                  <span className="absolute right-full mr-3 hidden group-hover:block whitespace-nowrap px-3 py-1 rounded-md bg-[#18191B] border border-white/20 text-white font-condensed text-xs uppercase tracking-wider shadow-2xl z-30 pointer-events-none">
                    {idx + 1}. {proj.title}
                  </span>
                </button>
              );
            })}
          </aside>

          {/* ── CONTENIDO PRINCIPAL: RUNWAY INMERSIVO FULL-BLEED ── */}
          <main className="flex-1 w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-12 md:py-20 flex flex-col space-y-16 max-h-[90vh] overflow-y-auto">
            {/* 1. Header Editorial Monumental */}
            <div className="space-y-6 border-b border-white/10 pb-10">
              <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[#59BFD6] uppercase tracking-widest">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#59BFD6] animate-pulse" />
                  EXPEDICIÓN PUELCHE LAB
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5 text-white/70">
                  <MapPin className="w-3.5 h-3.5 text-[#59BFD6]" />
                  {activeModalProject.location}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5 text-white/70">
                  <Calendar className="w-3.5 h-3.5 text-[#59BFD6]" />
                  Año {activeModalProject.year}
                </span>
              </div>

              <h1 className="font-condensed text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight font-bold text-white leading-none">
                {activeModalProject.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="font-mono text-xs text-white/50 uppercase tracking-widest mr-2">Soporte:</span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white font-mono text-xs uppercase tracking-wider border border-white/10">
                  {activeModalProject.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#59BFD6]/15 text-[#59BFD6] font-mono text-xs uppercase tracking-wider border border-[#59BFD6]/30">
                  Cliente: {activeModalProject.client}
                </span>
              </div>
            </div>

            {/* 2. Escenario Fotográfico a Pantalla Completa (The Masterpiece Artwork Stage) */}
            <div className="relative w-full rounded-xl overflow-hidden bg-[#040507] border border-white/10 p-4 sm:p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col items-center justify-center">
              {/* Resplandor ambiental de fondo */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 blur-3xl">
                <Image
                  src={activeGallery[currentImageIndex] || activeModalProject.image}
                  alt=""
                  fill
                  className="object-cover scale-150"
                  aria-hidden="true"
                />
              </div>

              {/* Obra Principal en Resolución Completa (Anti-Cropping) */}
              <div className="relative w-full min-h-[380px] sm:min-h-[520px] md:min-h-[640px] flex items-center justify-center z-10">
                <Image
                  src={activeGallery[currentImageIndex] || activeModalProject.image}
                  alt={`${activeModalProject.title} — Pieza ${currentImageIndex + 1}`}
                  fill
                  priority
                  className="object-contain object-center drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] transition-all duration-500"
                />
              </div>

              {/* Controles Multi-Pieza si hay más de 1 imagen */}
              {activeGallery.length > 1 && (
                <div className="relative z-20 w-full mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={prevImage}
                      className="p-2.5 rounded-full bg-white/10 hover:bg-[#59BFD6] hover:text-puelche-dark text-white transition-all border border-white/15"
                      aria-label="Pieza anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-xs uppercase tracking-widest text-white/70 px-2">
                      Pieza {currentImageIndex + 1} de {activeGallery.length}
                    </span>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="p-2.5 rounded-full bg-white/10 hover:bg-[#59BFD6] hover:text-puelche-dark text-white transition-all border border-white/15"
                      aria-label="Siguiente pieza"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Tira de Miniaturas (Filmstrip Selector) */}
                  <div className="flex items-center gap-2.5 overflow-x-auto max-w-full pb-1">
                    {activeGallery.map((img, idx) => (
                      <button
                        key={img + idx}
                        type="button"
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative w-14 h-10 rounded-sm overflow-hidden border transition-all duration-300 shrink-0 ${
                          currentImageIndex === idx
                            ? 'border-[#59BFD6] scale-105 shadow-[0_0_12px_#59BFD6]'
                            : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/50'
                        }`}
                        aria-label={`Ver pieza ${idx + 1}`}
                      >
                        <Image src={img} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Narrativa Editorial & Entregables Técnicos en Doble Columna */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-4">
              {/* Columna Izquierda: Desafío & Dirección Artística */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#59BFD6] font-medium">
                    DIRECCIÓN ARTÍSTICA &bull; ANÁLISIS DE CASO
                  </span>
                  <h3 className="font-condensed text-3xl sm:text-4xl uppercase tracking-wide font-bold text-white">
                    Desafío & Dirección
                  </h3>
                </div>
                <p className="font-sans text-base sm:text-lg text-white/85 font-light leading-relaxed">
                  {activeModalProject.description}
                </p>
              </div>

              {/* Columna Derecha: Entregables Técnicos & Conversión */}
              <div className="lg:col-span-5 space-y-6 bg-white/[0.03] p-8 rounded-xl border border-white/10">
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#59BFD6]">
                    ALCANCE DEL PROYECTO
                  </span>
                  <h4 className="font-condensed text-xl sm:text-2xl uppercase tracking-wider font-bold text-white">
                    Entregables & Soportes Técnicos
                  </h4>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-4">
                  {activeModalProject.deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-white/85">
                      <CheckCircle2 className="w-4 h-4 text-[#59BFD6] shrink-0 mt-0.5" />
                      <span className="font-sans font-light">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10 space-y-3">
                  <span className="font-mono text-[11px] text-white/50 block">
                    ¿Iniciativa similar en la Patagonia o territorio austral?
                  </span>
                  <Link
                    href={`/contacto?proyecto=${encodeURIComponent(activeModalProject.title)}`}
                    className="w-full text-center px-6 py-4 rounded-full bg-[#59BFD6] text-puelche-dark font-condensed uppercase tracking-wider font-bold text-xs hover:bg-white transition-all shadow-[0_0_25px_rgba(89,191,214,0.35)] flex items-center justify-center gap-2 group hover:scale-[1.02]"
                  >
                    <span>Cotizar propuesta similar</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 4. Siguiente Obra (Continuous Flow — Estilo Locomotive Runway) */}
            <div className="border-t border-white/10 pt-16 pb-8">
              <button
                type="button"
                onClick={nextProject}
                className="w-full group p-8 sm:p-12 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-[#59BFD6]/40 transition-all duration-500 text-left flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#59BFD6] group-hover:text-white transition-colors">
                    CONTINUAR LA EXPEDICIÓN &bull; SIGUIENTE OBRA
                  </span>
                  <h3 className="font-condensed text-3xl sm:text-5xl uppercase tracking-wide font-bold text-white group-hover:text-[#59BFD6] transition-colors">
                    {nextProjectItem?.title}
                  </h3>
                  <p className="font-mono text-xs text-white/50">
                    {nextProjectItem?.category} &bull; {nextProjectItem?.location}
                  </p>
                </div>

                <div className="w-14 h-14 rounded-full bg-white/10 group-hover:bg-[#59BFD6] text-white group-hover:text-puelche-dark flex items-center justify-center transition-all duration-300 shrink-0 group-hover:scale-110">
                  <ChevronRight className="w-7 h-7" />
                </div>
              </button>
            </div>
          </main>
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
