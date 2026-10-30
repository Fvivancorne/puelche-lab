'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PORTFOLIO_PROJECTS, ProjectItem } from '@/data/portfolio';
import { MapPin, Calendar, CheckCircle2, X, ArrowUpRight } from 'lucide-react';

const CATEGORIES = ['Todos', 'Fotografía', 'Edición Fotográfica', 'Branding', 'Desarrollo Web', 'Editorial'] as const;

function PortfolioContent() {
  const searchParams = useSearchParams();
  const projectParam = searchParams.get('proyecto');

  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Auto-open project modal if ?proyecto= query param is provided
  useEffect(() => {
    if (projectParam) {
      const match = PORTFOLIO_PROJECTS.find(
        (p) =>
          p.slug === projectParam ||
          p.id === projectParam ||
          p.title.toLowerCase().includes(projectParam.toLowerCase())
      );
      if (match) setActiveModalProject(match);
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

  const filteredProjects = selectedCategory === 'Todos'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full min-h-screen bg-puelche-dark text-white flex flex-col pt-[70px]">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto w-full px-6 py-12 md:py-16">
        <div className="border-b border-white/10 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs tracking-widest uppercase font-condensed text-[#59BFD6] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#59BFD6]"></span>
            <span>Archivo de Obras & Expediciones</span>
            <span className="text-white/30">/</span>
            <span>2020 — 2026</span>
          </div>
          <h1 className="font-condensed text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white mb-4">
            Obras que narran el sur.
          </h1>
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

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            onClick={() => setActiveModalProject(project)}
            className="group cursor-pointer bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#59BFD6]/60 transition-all duration-500 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D2024] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded bg-[#59BFD6] text-puelche-dark font-condensed font-bold text-xs uppercase tracking-wider shadow-md">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#59BFD6] group-hover:text-puelche-dark transition-colors duration-300">
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

              <div className="p-6">
                <div className="text-xs font-mono text-[#59BFD6] uppercase tracking-wider mb-2">
                  Cliente: {project.client}
                </div>
                <h3 className="font-condensed text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white group-hover:text-[#59BFD6] transition-colors mb-3">
                  {project.title}
                </h3>
                <p className="text-sm text-white/70 font-sans font-light leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {project.deliverables.slice(0, 3).map((d) => (
                  <span key={d} className="text-[11px] font-mono text-white/50 bg-white/5 px-2 py-1 rounded">
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
                  className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-[#59BFD6] border border-white text-white font-condensed font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-[#59BFD6] transition-all duration-300 shadow-md flex items-center justify-center"
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
        Con data-lenis-prevent y pausa de Lenis para scroll 100% fluido y natural
        ======================================================================
      */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setActiveModalProject(null)}
          data-lenis-prevent="true"
        >
          <div
            className="bg-[#1D2024] text-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-white/20 shadow-2xl relative flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
          >
            {/* Botón Cerrar Flotante */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#3B3D42]/90 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#59BFD6] hover:text-puelche-dark transition-colors shadow-xl border border-white/10"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Columna Izquierda: Fotografía en Alta Resolución */}
            <div className="relative w-full md:w-1/2 min-h-[280px] sm:min-h-[360px] md:min-h-full bg-black/60 shrink-0">
              <Image
                src={activeModalProject.image}
                alt={activeModalProject.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D2024] via-transparent to-black/30 md:hidden" />
              
              {/* Badge de Categoría y Micro-Datos flotantes sobre la foto */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3.5 py-1 rounded-full bg-[#59BFD6] text-puelche-dark text-xs uppercase font-bold tracking-wider shadow-lg">
                  {activeModalProject.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10 hidden md:block font-mono text-xs text-white/90 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10">
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

            {/* Columna Derecha: Información Editorial con Scroll Nativo Ligero */}
            <div
              className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto max-h-[55vh] md:max-h-[90vh] space-y-6"
              data-lenis-prevent="true"
            >
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#59BFD6] uppercase tracking-wider mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#59BFD6]" />
                    <span>EXPEDICIÓN PUELCHE LAB</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-condensed font-bold uppercase tracking-wide leading-tight text-white">
                    {activeModalProject.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-white/70 mt-3 font-mono border-b border-white/10 pb-4">
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

                <div>
                  <h4 className="font-condensed text-xs uppercase tracking-widest text-[#59BFD6] font-bold mb-2">
                    Desafío & Dirección
                  </h4>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
                    {activeModalProject.description}
                  </p>
                </div>

                <div className="bg-[#2B2D31]/80 p-5 rounded-xl border border-white/10">
                  <h4 className="font-condensed text-xs uppercase tracking-widest text-white font-bold mb-3">
                    Entregables & Soportes Técnicos
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeModalProject.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs sm:text-sm text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-[#59BFD6] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botón de Conversión CTA */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <span className="text-xs text-white/60">
                  ¿Tienes una iniciativa similar en la Región de Los Lagos o Patagonia?
                </span>
                <Link
                  href={`/contacto?proyecto=${encodeURIComponent(activeModalProject.title)}`}
                  className="w-full text-center px-6 py-3.5 rounded-full bg-[#59BFD6] text-puelche-dark text-xs font-condensed uppercase tracking-wider font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(89,191,214,0.3)] hover:scale-[1.02]"
                >
                  Cotizar propuesta similar
                </Link>
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
    <Suspense fallback={<div className="min-h-screen bg-puelche-dark" />}>
      <PortfolioContent />
    </Suspense>
  );
}
