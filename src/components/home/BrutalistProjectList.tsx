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
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-puelche-cyan animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-puelche-cyan">
            Obras Destacadas
          </span>
        </div>
      </div>

      {/* Brutalist Text List */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <ul className="divide-y divide-white/10">
          {FEATURED.map((project, idx) => (
            <li key={project.id}>
              <Link
                href={`/portafolio`}
                className="group flex items-center justify-between py-6 md:py-8 transition-colors hover:pl-4 duration-500"
                data-cursor="VER"
                onMouseEnter={() => handleMouseEnter(project)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-baseline gap-4 md:gap-6 overflow-hidden">
                  {/* Index number */}
                  <span className="font-mono text-xs text-white/30 tabular-nums shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Project title — brutalist size */}
                  <h3
                    className="font-condensed uppercase tracking-wide font-bold text-white
                      text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                      group-hover:text-puelche-cyan transition-colors duration-300
                      truncate"
                  >
                    {project.client}
                  </h3>
                </div>

                {/* Category + Arrow */}
                <div className="hidden md:flex items-center gap-4 shrink-0">
                  <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-puelche-cyan group-hover:rotate-45 transition-all duration-300" />
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
          className="fixed top-0 left-0 z-50 pointer-events-none w-[300px] md:w-[380px] aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border border-white/10"
          style={{
            transform: `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`,
          }}
        >
          <Image
            src={hoveredProject.image}
            alt={hoveredProject.title}
            fill
            className="object-cover"
            sizes="380px"
          />
          {/* Bottom gradient overlay with location */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
            <span className="font-mono text-[10px] text-white/80 uppercase tracking-wider">
              {hoveredProject.location}
            </span>
          </div>
        </div>
      )}

      {/* CTA link to full portfolio */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mt-12">
        <Link
          href="/portafolio"
          className="inline-flex items-center gap-3 px-8 py-4 border-2 border-puelche-cyan text-puelche-cyan font-condensed uppercase tracking-widest text-sm font-bold hover:bg-puelche-cyan hover:text-puelche-dark transition-all duration-300"
          data-cursor="ABRIR"
        >
          <span>Ver Portafolio Completo</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
