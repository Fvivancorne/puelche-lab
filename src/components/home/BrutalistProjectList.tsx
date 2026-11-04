'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PORTFOLIO_PROJECTS } from '@/data/portfolio';
import { ArrowUpRight, MapPin, Calendar, Compass } from 'lucide-react';

// Seleccionamos 6 proyectos emblemáticos de autor con fotografía genuina de alto impacto
const CURATED_PROJECT_IDS = [
  'estancia-rilan',
  'turistour-expediciones',
  'cala-meli',
  'hotel-costaustralis',
  'hotel-cabo-de-hornos',
  'aquachile',
];

const CURATED_PROJECTS = CURATED_PROJECT_IDS.map((id) =>
  PORTFOLIO_PROJECTS.find((p) => p.id === id)
).filter(Boolean) as typeof PORTFOLIO_PROJECTS;

export function BrutalistProjectList() {
  return (
    <section
      id="proyectos-destacados"
      aria-label="Proyectos Seleccionados de Autor"
      className="relative w-full bg-[#0d0e12] py-24 sm:py-32 md:py-36 px-6 md:px-12 lg:px-16 border-t border-white/[0.08] overflow-hidden"
    >
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#59BFD6]/[0.02] blur-[160px] pointer-events-none" />

      {/* Cabecera Editorial Limpia */}
      <div className="max-w-7xl mx-auto w-full mb-14 md:mb-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#59BFD6] font-mono text-xs uppercase tracking-[0.25em]">
              <Compass className="w-3.5 h-3.5 text-[#59BFD6]" />
              <span>ARCHIVO DE AUTOR &bull; OBRAS EMBLEMÁTICAS</span>
            </div>

            <h2 className="font-condensed text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight font-bold text-white leading-tight">
              Obras que Hablan por Sí Mismas
            </h2>

            <p className="font-sans text-base sm:text-lg text-white/70 font-light leading-relaxed">
              Fotografía de autor, plataformas digitales y diseño territorial desarrollados para clientes en Puerto Varas, Chiloé y la Patagonia.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/portafolio"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-[#59BFD6] text-white hover:text-puelche-dark font-condensed uppercase tracking-wider text-xs font-bold transition-all shadow-md hover:scale-105 border border-white/15"
            >
              <span>Ver todas las obras ({PORTFOLIO_PROJECTS.length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Grilla Editorial de Gran Formato (2 Columnas con Siluetas de Canto Rodado) */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {CURATED_PROJECTS.map((project, idx) => (
          <Link
            key={project.id}
            href={`/portafolio?proyecto=${project.slug}`}
            className="group block bg-[#141518]/90 hover:bg-[#18191E] border border-white/10 hover:border-[#59BFD6]/60 rounded-[28px] sm:rounded-[36px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(0,0,0,0.7)] flex flex-col justify-between"
          >
            <div>
              {/* Escenario Fotográfico en Gran Formato */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141518] via-transparent to-black/30 opacity-70 group-hover:opacity-50 transition-opacity" />

                {/* Badge de Categoría */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#59BFD6] text-puelche-dark font-condensed font-bold text-xs uppercase tracking-wider shadow-md">
                    {project.category}
                  </span>
                </div>

                {/* Botón Circular Flotante */}
                <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#59BFD6] group-hover:text-puelche-dark transition-colors duration-300 backdrop-blur-md">
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
                  <span className="text-white/40">[ 0{idx + 1} ]</span>
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
            <div className="px-7 sm:px-8 pb-7 pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
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
                <span>Ver obra</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Banner Inferior de Llamado al Archivo Completo */}
      <div className="max-w-7xl mx-auto w-full mt-16 md:mt-24 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
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
