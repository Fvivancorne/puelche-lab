'use client';

import { useState } from 'react';
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
    <div className="w-full flex-1 pt-8 md:pt-12 pb-24 px-6 md:px-12 bg-puelche-canvas">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <div className="border-b border-puelche-ink/10 pb-12 mb-12">
          <div className="flex flex-wrap items-center gap-3 text-xs tracking-widest uppercase font-mono text-puelche-forest mb-4">
            <span className="w-2 h-2 rounded-full bg-puelche-copper"></span>
            <span>Archivo de Obras & Expediciones</span>
            <span className="text-puelche-ink/30">/</span>
            <span>2020 — 2026</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-puelche-ink mb-6">
            Obras que narran el sur.
          </h1>
          <p className="text-lg md:text-xl text-puelche-charcoal max-w-3xl leading-relaxed font-sans">
            Cada proyecto es un encuentro entre la precisión técnica del diseño cross-media y la fuerza indomable de la Patagonia. Hotelería, industrias australes, arquitectura y marcas de origen.
          </p>

          {/* Interactive Category Filter */}
          <div className="flex flex-wrap items-center gap-2 pt-8">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = cat === 'Todos'
                ? PORTFOLIO_PROJECTS.length
                : PORTFOLIO_PROJECTS.filter(p => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'bg-puelche-ink text-puelche-canvas shadow-md'
                      : 'bg-puelche-sand/60 text-puelche-charcoal hover:bg-puelche-sand hover:text-puelche-ink border border-puelche-ink/10'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-puelche-canvas/20 text-puelche-canvas' : 'bg-puelche-ink/10 text-puelche-charcoal'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              onClick={() => setActiveModalProject(project)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-puelche-ink/10 hover:border-puelche-copper/40 transition-all duration-500 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-puelche-sand">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider bg-white/90 backdrop-blur-sm text-puelche-ink font-semibold">
                      {project.category}
                    </span>
                  </div>

                  {/* Year & Action */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider bg-black/60 backdrop-blur-sm text-white/90">
                      {project.year}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/90 text-puelche-ink flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                    <div className="flex items-center gap-2 text-xs font-mono text-white/80 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-puelche-copper" />
                      <span>{project.location}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-puelche-sand transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Content info */}
                <div className="p-6 md:p-8 space-y-4">
                  <div className="text-xs uppercase tracking-wider font-mono text-puelche-forest font-semibold">
                    Cliente: {project.client}
                  </div>
                  <p className="text-sm md:text-base text-puelche-charcoal leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Deliverables tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.deliverables.map((del) => (
                      <span
                        key={del}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-puelche-sand/50 text-puelche-charcoal border border-puelche-ink/5"
                      >
                        {del}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 pt-0 border-t border-puelche-ink/5 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-puelche-copper group-hover:text-puelche-ink transition-colors">
                <span>Ver expediente completo</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </article>
          ))}
        </div>

        {/* Modal Drawer for Project Detail */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
            <div
              className="bg-puelche-canvas rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-puelche-ink/20 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-puelche-ink text-white flex items-center justify-center hover:bg-puelche-copper transition-colors shadow-lg"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cover Image */}
              <div className="relative aspect-[16/9] w-full bg-puelche-ink">
                <Image
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="px-3 py-1 rounded-full text-xs uppercase font-mono tracking-wider bg-puelche-copper text-puelche-ink font-bold mb-3 inline-block">
                    {activeModalProject.category}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
                    {activeModalProject.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/80 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-puelche-sand" />
                      {activeModalProject.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-puelche-sand" />
                      Año {activeModalProject.year}
                    </span>
                    <span>Cliente: {activeModalProject.client}</span>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-10 space-y-8">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-puelche-forest mb-2">Desafío & Dirección</h4>
                  <p className="text-base sm:text-lg text-puelche-charcoal leading-relaxed font-sans">
                    {activeModalProject.description}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-puelche-ink/10">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-puelche-ink mb-4">Entregables & Soportes Técnicos</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModalProject.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-sm text-puelche-charcoal">
                        <CheckCircle2 className="w-4 h-4 text-puelche-copper shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-puelche-ink/10">
                  <div className="text-xs text-puelche-charcoal font-sans">
                    ¿Tienes una iniciativa similar en la Región de Los Lagos o Patagonia?
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Link
                      href={`/contacto?proyecto=${encodeURIComponent(activeModalProject.title)}`}
                      className="flex-1 sm:flex-none text-center px-6 py-3 rounded-full bg-puelche-ink text-puelche-canvas text-xs font-mono uppercase tracking-wider hover:bg-puelche-copper hover:text-puelche-ink transition-colors font-semibold"
                    >
                      Cotizar propuesta similar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Contact Strip */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-puelche-ink text-puelche-canvas flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-puelche-copper">Proyectos a Medida</span>
            <h3 className="font-serif text-3xl md:text-4xl font-bold mt-2">¿Requieres documentación para tu obra o marca?</h3>
            <p className="text-puelche-canvas/70 text-sm md:text-base mt-2 max-w-xl">
              Coordinamos traslados a lo largo de Los Lagos, Chiloé, Aysén y Magallanes con logística propia y equipamiento para clima adverso.
            </p>
          </div>
          <Link
            href="/contacto"
            className="px-8 py-4 rounded-full bg-puelche-copper text-puelche-ink font-mono text-xs uppercase tracking-widest font-bold hover:bg-puelche-sand transition-all duration-300 shrink-0"
          >
            Iniciar conversación
          </Link>
        </div>
      </div>
    </div>
  );
}
