'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PORTFOLIO_PROJECTS, ProjectItem } from '@/data/portfolio';
import { ArrowUpRight, MapPin, Calendar, CheckCircle2, X } from 'lucide-react';

const CATEGORIES = ['Todos', 'Fotografía', 'Branding', 'Desarrollo Web', 'Editorial'] as const;

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const filteredProjects = selectedCategory === 'Todos'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full flex-1 bg-white text-puelche-dark">
      {/* Top Banner */}
      <section className="bg-puelche-slate py-16 px-6 text-center border-b border-puelche-slate-dark">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="font-condensed uppercase tracking-widest text-xs font-bold text-puelche-cyan">
            ESTUDIO PUELCHE LAB
          </span>
          <h1 className="font-condensed text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider text-white font-bold">
            PORTAFOLIO DE OBRAS
          </h1>
          <p className="font-sans text-sm sm:text-base text-white/80 max-w-xl mx-auto font-light leading-relaxed">
            Fotografía, identidad de marca, plataformas web y proyectos editoriales en el sur de Chile y Patagonia.
          </p>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 justify-center pt-6">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = cat === 'Todos'
                ? PORTFOLIO_PROJECTS.length
                : PORTFOLIO_PROJECTS.filter(p => p.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-sm font-condensed uppercase tracking-wider text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-puelche-cyan text-white shadow'
                      : 'bg-puelche-slate-dark/60 text-white/80 hover:bg-puelche-slate-dark hover:text-white border border-white/10'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-white/70'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid of Projects */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveModalProject(project)}
              className="group cursor-pointer bg-[#F8FAFB] border border-gray-200 rounded-sm overflow-hidden hover:border-puelche-cyan hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-puelche-slate">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-puelche-cyan text-white font-condensed text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow">
                  {project.category}
                </span>
                <span className="absolute bottom-3 left-3 text-white font-sans text-xs flex items-center gap-1 font-light">
                  <MapPin className="w-3.5 h-3.5 text-puelche-cyan" />
                  <span>{project.location}</span>
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-condensed text-xl font-bold uppercase tracking-wider text-puelche-dark group-hover:text-puelche-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs text-puelche-gray mt-2 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                  {project.deliverables && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {project.deliverables.slice(0, 2).map((d, i) => (
                        <span key={i} className="text-[10px] bg-gray-100 text-puelche-slate px-2 py-0.5 rounded">
                          {d}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200 flex items-center justify-between">
                  <span className="font-condensed text-xs uppercase tracking-wider text-puelche-slate font-bold">
                    Cliente: {project.client}
                  </span>
                  <span className="inline-flex items-center gap-1 font-condensed text-xs uppercase tracking-widest text-puelche-cyan font-bold">
                    <span>Ver Obra</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Detail Modal Drawer */}
      {activeModalProject && (
        <div
          onClick={() => setActiveModalProject(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl space-y-6"
          >
            <button
              type="button"
              onClick={() => setActiveModalProject(null)}
              aria-label="Cerrar modal"
              className="absolute top-4 right-4 p-2 text-puelche-slate hover:text-puelche-cyan transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-sm bg-puelche-slate">
              <Image
                src={activeModalProject.image}
                alt={activeModalProject.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <span className="text-xs font-condensed uppercase tracking-widest text-puelche-cyan font-bold">
                  {activeModalProject.category} &bull; {activeModalProject.location}
                </span>
                <span className="text-xs font-condensed text-puelche-gray">
                  Año {activeModalProject.year}
                </span>
              </div>

              <h2 className="font-condensed text-3xl font-bold uppercase tracking-wider text-puelche-dark">
                {activeModalProject.title}
              </h2>

              <p className="font-sans text-sm text-puelche-dark leading-relaxed font-light">
                {activeModalProject.description}
              </p>

              <div>
                <h4 className="font-condensed text-xs uppercase tracking-widest text-puelche-slate font-bold mb-3">
                  Entregables del Proyecto
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalProject.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-sans text-puelche-dark">
                      <CheckCircle2 className="w-4 h-4 text-puelche-cyan shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-sans text-puelche-gray">
                  Cliente oficial verificado: <strong className="text-puelche-dark">{activeModalProject.client}</strong>
                </span>
                <Link
                  href={`/contacto?proyecto=${encodeURIComponent(activeModalProject.title)}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-puelche-cyan text-white font-condensed uppercase tracking-widest text-xs font-bold rounded-sm hover:bg-puelche-cyan-dark transition-all"
                >
                  <span>Cotizar Proyecto Similar</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
