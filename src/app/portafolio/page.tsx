'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PORTFOLIO_PROJECTS, ProjectItem } from '@/data/portfolio';
import { MapPin, Calendar, CheckCircle2, X } from 'lucide-react';

const CATEGORIES = ['Todos', 'Fotografía', 'Branding', 'Desarrollo Web', 'Editorial'] as const;

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

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
            Cada proyecto es un encuentro entre la precisión técnica del diseño cross-media y la fuerza indomable de la Patagonia.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-6">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = cat === 'Todos'
                ? PORTFOLIO_PROJECTS.length
                : PORTFOLIO_PROJECTS.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-condensed uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#59BFD6] text-white font-bold shadow-md'
                      : 'bg-[#2B2D31] text-white/80 hover:bg-[#3B3D42] hover:text-white border border-white/10'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/30 text-white' : 'bg-white/10 text-white/70'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Panoramic Bands Portfolio Showcase */}
      <div className="w-full flex flex-col" aria-label="Proyectos del Portafolio">
        {filteredProjects.map((project, idx) => (
          <article
            key={project.id}
            data-cursor="VER"
            className="relative w-full aspect-[16/10] sm:aspect-auto sm:h-[80vh] min-h-[500px] flex items-end overflow-hidden border-b border-white/10 group cursor-pointer"
            onClick={() => setActiveModalProject(project)}
          >
            {/* Full-Bleed Photograph */}
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority={idx < 2}
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-90 transition-opacity" />

            {/* Bottom-Left Cyan Card */}
            <div className="absolute bottom-8 sm:bottom-12 left-0 z-20 max-w-[92vw] sm:max-w-xl md:max-w-2xl bg-[#59BFD6] rounded-r-2xl sm:rounded-r-3xl shadow-2xl py-4 sm:py-5 px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-b border-r border-white/20">
              <div className="border-b sm:border-b-0 sm:border-r border-[#FBF5F5]/40 pb-3 sm:pb-0 sm:pr-6 text-white font-condensed">
                <h3 className="text-base sm:text-xl md:text-2xl font-bold uppercase tracking-wide leading-tight">
                  Cliente: {project.client}
                </h3>
                <p className="text-xs sm:text-sm text-white/95 mt-1 font-medium">
                  {project.location}.
                </p>
                <p className="text-xs sm:text-sm text-white/85 font-light">
                  {project.specialty || project.category}.
                </p>
                {/* Deliverables tags */}
                {project.deliverables && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.deliverables.slice(0, 3).map((del) => (
                      <span
                        key={del}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/20 text-white/90"
                      >
                        {del}
                      </span>
                    ))}
                  </div>
                )}
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

      {/* Modal Drawer for Project Detail */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="bg-[#1D2024] text-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#3B3D42] text-white flex items-center justify-center hover:bg-[#59BFD6] transition-colors shadow-lg"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/9] w-full bg-black">
              <Image
                src={activeModalProject.image}
                alt={activeModalProject.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white font-condensed">
                <span className="px-3 py-1 rounded bg-[#59BFD6] text-white text-xs uppercase font-bold tracking-wider mb-2 inline-block">
                  {activeModalProject.category}
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-wide">
                  {activeModalProject.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 mt-2 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#59BFD6]" />
                    {activeModalProject.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#59BFD6]" />
                    Año {activeModalProject.year}
                  </span>
                  <span>Cliente: {activeModalProject.client}</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-10 space-y-8 font-sans">
              <div>
                <h4 className="font-condensed text-xs uppercase tracking-widest text-[#59BFD6] font-bold mb-2">Desafío & Dirección</h4>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light">
                  {activeModalProject.description}
                </p>
              </div>

              <div className="bg-[#2B2D31] p-6 rounded-xl border border-white/10">
                <h4 className="font-condensed text-xs uppercase tracking-widest text-white font-bold mb-4">Entregables & Soportes Técnicos</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeModalProject.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-[#59BFD6] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="text-xs text-white/70">
                  ¿Tienes una iniciativa similar en la Región de Los Lagos o Patagonia?
                </div>
                <Link
                  href={`/contacto?proyecto=${encodeURIComponent(activeModalProject.title)}`}
                  className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-[#59BFD6] text-white text-xs font-condensed uppercase tracking-wider font-bold hover:bg-white hover:text-puelche-dark transition-colors"
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
