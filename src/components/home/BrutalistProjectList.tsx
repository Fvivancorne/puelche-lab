'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PORTFOLIO_PROJECTS, ProjectItem } from '@/data/portfolio';
import { ArrowUpRight } from 'lucide-react';

const FEATURED = PORTFOLIO_PROJECTS.filter((p) => p.featured);

export function BrutalistProjectList() {
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  const startRaf = useCallback(() => {
    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;

      if (imageRef.current) {
        imageRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    },
    []
  );

  const handleMouseEnter = useCallback(
    (project: ProjectItem) => {
      setHoveredProject(project);
      startRaf();
    },
    [startRaf]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredProject(null);
    cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <section
      className="relative w-full bg-puelche-dark py-20 md:py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Section Label */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-puelche-cyan" />
              <span className="font-condensed text-xs uppercase tracking-widest text-puelche-cyan font-bold">
                Archivo Curado &bull; Obras & Expediciones
              </span>
            </div>
            <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider text-white font-bold">
              Proyectos Seleccionados
            </h2>
          </div>
          <p className="font-serif italic text-sm text-white/60 max-w-sm sm:text-right">
            Arquitectura, industria y hospitalidad retratadas bajo la luz del sur.
          </p>
        </div>
      </div>

      {/* Curated Text List */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <ul className="divide-y divide-white/10">
          {FEATURED.map((project, idx) => (
            <li key={project.id}>
              <Link
                href={`/portafolio?proyecto=${project.slug}`}
                className="group flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 transition-all hover:pl-3 duration-300 gap-2 md:gap-6"
                onMouseEnter={() => handleMouseEnter(project)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-baseline gap-4 md:gap-6 overflow-hidden">
                  {/* Subtle editorial index */}
                  <span className="font-serif italic text-sm sm:text-base text-puelche-cyan/60 shrink-0">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>

                  <div className="space-y-1">
                    <h3
                      className="font-condensed uppercase tracking-wide font-bold text-white
                        text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                        group-hover:text-puelche-cyan transition-colors duration-300
                        truncate"
                    >
                      {project.client}
                    </h3>
                    <p className="font-serif italic text-xs sm:text-sm text-white/50 group-hover:text-white/80 transition-colors">
                      {project.location}
                    </p>
                  </div>
                </div>

                {/* Category + Arrow */}
                <div className="flex items-center gap-4 shrink-0 self-end md:self-auto pt-2 md:pt-0">
                  <span className="font-condensed text-xs uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">
                    {project.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-puelche-cyan group-hover:text-puelche-dark transition-all">
                    <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-puelche-dark transition-colors" />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating Image that follows cursor */}
      {hoveredProject && (
        <div
          ref={imageRef}
          className="fixed top-0 left-0 z-50 pointer-events-none w-[280px] md:w-[340px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-md"
          style={{
            transform: `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`,
          }}
        >
          <Image
            src={hoveredProject.image}
            alt={hoveredProject.title}
            fill
            className="object-cover"
            sizes="340px"
          />
          {/* Bottom gradient overlay with location */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5">
            <span className="font-condensed text-xs uppercase tracking-wider text-puelche-cyan font-bold">
              {hoveredProject.client}
            </span>
            <span className="font-serif italic text-xs text-white/90">
              {hoveredProject.location}
            </span>
          </div>
        </div>
      )}

      {/* CTA link to full portfolio */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mt-14 flex items-center justify-between flex-wrap gap-4">
        <Link
          href="/portafolio"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-puelche-cyan text-puelche-dark font-condensed uppercase tracking-wider text-sm font-bold hover:bg-white transition-all duration-300 shadow-lg hover:scale-105"
        >
          <span>Ver Portafolio Completo</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
        <span className="font-serif italic text-xs text-white/40">
          Fotografía de interiores, faenas marinas y publicaciones impresas.
        </span>
      </div>
    </section>
  );
}
