'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Compass, Monitor, BookOpen, Sliders, Share2, ArrowRight } from 'lucide-react';

const SERVICES_LIST = [
  {
    title: 'Fotografía',
    desc: 'Interiores, hotelería, arquitectura y procesos industriales en el sur de Chile.',
    href: '/servicios/fotografia',
    icon: Camera,
  },
  {
    title: 'Diseño de Marca',
    desc: 'Identidades visuales, manuales de normas y branding integral con arraigo territorial.',
    href: '/servicios/branding',
    icon: Compass,
  },
  {
    title: 'Desarrollo Web',
    desc: 'Sitios web modernos, ultra-rápidos y adaptables a dispositivos móviles.',
    href: '/servicios/desarrollo-web',
    icon: Monitor,
  },
  {
    title: 'Edición Fotográfica',
    desc: 'Revelado de archivos RAW, retoque digital de precisión y color grading cinematográfico.',
    href: '/servicios/edicion-fotografica',
    icon: Sliders,
  },
  {
    title: 'Diseño Editorial',
    desc: 'Memorias corporativas, libros fotográficos y catálogos comerciales impresos.',
    href: '/servicios/editorial',
    icon: BookOpen,
  },
  {
    title: 'Redes Sociales',
    desc: 'Estrategia de contenidos, fotografía genuina y dirección de arte digital.',
    href: '/servicios/redes-sociales',
    icon: Share2,
  },
];

export default function ServiciosPage() {
  return (
    <div className="w-full flex flex-col bg-[#0b0d10] text-white min-h-screen selection:bg-[#59BFD6] selection:text-[#0b0d10]">
      {/* ── BANNER EDITORIAL DARK LUXURY (PLIEGOS DE OFICIO AWWWARDS SOTD) ── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 text-center border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#14161a] via-[#0b0d10] to-[#0b0d10]">
        {/* Kinetic Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.025] whitespace-nowrap font-condensed text-[18vw] font-black uppercase text-white leading-none">
          OFICIO AUSTRAL
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#59BFD6] font-mono text-[11px] uppercase tracking-[0.25em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#59BFD6] animate-pulse shadow-[0_0_8px_#59BFD6]" />
            <span>41°S &bull; DISCIPLINA TÉCNICA & EXPEDICIONES VISUALES</span>
          </div>

          <h1 className="font-condensed text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-white font-bold leading-[0.95] drop-shadow-2xl">
            PLIEGOS DE OFICIO
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-white/75 max-w-2xl mx-auto font-light leading-relaxed pt-2">
            Diseño Cross Media y Fotografía de autor esculpidos bajo el clima y las distancias de la Patagonia austral. Seis disciplinas técnicas guiadas por el rigor, la luz natural y el compromiso con el territorio.
          </p>
        </div>
      </section>

      {/* ── GRILLA DE 6 DISCIPLINAS DE AUTOR ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((serv, idx) => {
            const Icon = serv.icon;
            return (
              <div
                key={serv.title}
                id={serv.href.replace('/servicios/', '')}
                className="scroll-mt-28 p-8 sm:p-10 bg-white/[0.025] hover:bg-white/[0.05] border border-white/10 hover:border-[#59BFD6]/50 rounded-[28px] sm:rounded-[36px] transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#59BFD6] group-hover:bg-[#59BFD6] group-hover:text-puelche-dark transition-all duration-300 group-hover:scale-105 shadow-lg">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="font-mono text-xs text-white/30 group-hover:text-[#59BFD6] transition-colors">
                      [ MANIFIESTO 0{idx + 1} ]
                    </span>
                  </div>

                  <h2 className="font-condensed text-3xl uppercase tracking-wide font-bold text-white mb-3 group-hover:text-[#59BFD6] transition-colors">
                    {serv.title}
                  </h2>

                  <p className="font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed mb-8">
                    {serv.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={serv.href}
                    className="inline-flex items-center gap-2 font-mono uppercase tracking-widest text-xs font-semibold text-[#59BFD6] group-hover:text-white transition-colors"
                  >
                    <span>Explorar Oficio</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href={`/contacto?servicio=${serv.href.replace('/servicios/', '')}`}
                    className="text-[11px] font-mono uppercase tracking-wider text-white/50 hover:text-[#59BFD6] transition-colors"
                  >
                    <span>Cotizar</span> &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
