'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Camera, Compass, Monitor, BookOpen, Sliders, Share2, ArrowRight } from 'lucide-react';

const SERVICES_LIST = [
  {
    title: 'Fotografía',
    tag: 'FOTOGRAFÍA DE AUTOR',
    desc: 'Interiores, hotelería, arquitectura y procesos industriales en el sur de Chile. Óptica fija, rango dinámico y luz patagónica natural.',
    deliverables: ['Interiores & Hotelería', 'Faena Industrial', 'Drone 4K Certificado', 'Resolución 61MP'],
    href: '/servicios/fotografia',
    image: '/images/real/bg-portafolios-fotografia-a-min.jpg',
    icon: Camera,
  },
  {
    title: 'Diseño de Marca',
    tag: 'IDENTIDAD CON ARRAIGO AUSTRAL',
    desc: 'Identidades visuales, manuales de normas y branding integral con arraigo territorial. Naming, paleta cromática orgánica y tipografía suiza.',
    deliverables: ['Manual de Normas', 'Isotipo & Logotipo', 'Dirección de Arte', 'Papelería & Empaques'],
    href: '/servicios/branding',
    image: '/images/real/bg-portafolios-marca-blue-seal-min.jpg',
    icon: Compass,
  },
  {
    title: 'Desarrollo Web',
    tag: 'ARQUITECTURA DIGITAL SOTD',
    desc: 'Sitios web modernos, ultra-rápidos y adaptables a dispositivos móviles. Next.js App Router, GSAP cinemático y 100% Core Web Vitals.',
    deliverables: ['Next.js Turbopack', 'Micro-Interacciones GSAP', 'Zero-Latency UX', 'SEO Semántico GEO'],
    href: '/servicios/desarrollo-web',
    image: '/images/real/bg-portafolios-web-rilan-min.jpg',
    icon: Monitor,
  },
  {
    title: 'Edición Fotográfica',
    tag: 'REVELADO FINE-ART',
    desc: 'Revelado de archivos RAW, retoque digital de precisión y color grading cinematográfico. Calibración tonal pliego por pliego para imprenta y pantalla.',
    deliverables: ['Revelado RAW 16-bit', 'Separación de Frecuencias', 'Color Grading Editorial', 'Limpieza Microtexturas'],
    href: '/servicios/edicion-fotografica',
    image: '/images/real/edicion/bg-edit-fotografica-1-min.jpg',
    icon: Sliders,
  },
  {
    title: 'Diseño Editorial',
    tag: 'PUBLICACIONES & MEMORIAS',
    desc: 'Memorias corporativas, libros fotográficos y catálogos comerciales impresos. Maquetación reticular, selección de papeles y dirección de imprenta.',
    deliverables: ['Libros Fotográficos', 'Memorias Corporativas', 'Perfiles de Color CMYK', 'Acabados Especiales'],
    href: '/servicios/editorial',
    image: '/images/real/bg-portafolios-editorial-libro-min.jpg',
    icon: BookOpen,
  },
  {
    title: 'Redes Sociales',
    tag: 'DIRECCIÓN DE ARTE DIGITAL',
    desc: 'Estrategia de contenidos, fotografía genuina y dirección de arte digital. Narrativa visual que posiciona a tu marca lejos de la mediocridad de stock.',
    deliverables: ['Fotografía Genuina', 'Grillas Cinemáticas', 'Relatos Territoriales', 'Conversión Directa'],
    href: '/servicios/redes-sociales',
    image: '/images/real/bg-redes-1-min.jpg',
    icon: Share2,
  },
];

export default function ServiciosPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative w-full flex flex-col bg-[#0b0d10] text-white min-h-screen selection:bg-[#59BFD6] selection:text-[#0b0d10] overflow-hidden">
      {/* ── REVELADO DE FOTOGRAFÍA DE AUTOR EN SEGUNDO PLANO AL HOVER (R4) ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {SERVICES_LIST.map((serv, idx) => (
          <div
            key={serv.title}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              hoveredIndex === idx ? 'opacity-25 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <Image
              src={serv.image}
              alt=""
              fill
              className="object-cover object-center filter grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d10] via-[#0b0d10]/75 to-[#0b0d10]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b0d10]/80 via-transparent to-[#0b0d10]" />
          </div>
        ))}
      </div>

      {/* ── BANNER EDITORIAL DARK LUXURY (PLIEGOS DE OFICIO AWWWARDS SOTD) ── */}
      <section className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28 px-6 text-center border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#14161a]/90 via-[#0b0d10]/95 to-[#0b0d10]">
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

      {/* ── GRILLA ASIMÉTRICA TRÍPTICA DE SERVICIOS (R4: 48px 1fr 1.2fr) ── */}
      <section className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-16 md:py-28">
        <div className="flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
          {SERVICES_LIST.map((serv, idx) => {
            const Icon = serv.icon;
            return (
              <div
                key={serv.title}
                id={serv.href.replace('/servicios/', '')}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="scroll-mt-28 py-10 md:py-14 transition-all duration-500 group hover:bg-white/[0.02] px-4 -mx-4 rounded-3xl"
              >
                {/* Asymmetric Triptych Grid: 48px fixed ordinal, 1fr title/badge, 1.2fr description & pill button */}
                <div
                  className="grid grid-cols-1 lg:grid-cols-[48px_1fr_1.2fr] gap-6 lg:gap-12 items-baseline"
                  style={{ gridTemplateColumns: 'minmax(0, 48px) minmax(0, 1fr) minmax(0, 1.2fr)' }}
                >
                  {/* Column 1: Ordinal Numeral (48px fixed) */}
                  <div className="flex items-center gap-3 lg:block">
                    <span className="font-mono text-sm text-[#59BFD6] group-hover:text-white transition-colors">
                      [ 0{idx + 1} ]
                    </span>
                    <div className="lg:hidden w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#59BFD6]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Column 2: Service Title, Tag & Category (1fr) */}
                  <div className="space-y-2">
                    <div className="hidden lg:inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#59BFD6] font-mono text-[10px] uppercase tracking-wider mb-2">
                      <Icon className="w-3 h-3" />
                      <span>{serv.tag}</span>
                    </div>
                    <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl uppercase font-bold tracking-tight text-white group-hover:text-[#59BFD6] transition-colors">
                      {serv.title}
                    </h2>
                    <span className="lg:hidden block font-mono text-[10px] uppercase tracking-[0.2em] text-[#59BFD6]">
                      {serv.tag}
                    </span>
                  </div>

                  {/* Column 3: Description, Deliverables & rb-link-glanz Pill Button (1.2fr) */}
                  <div className="space-y-6">
                    <p className="font-sans text-sm sm:text-base text-white/75 font-light leading-relaxed">
                      {serv.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {serv.deliverables.map((d) => (
                        <span
                          key={d}
                          className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-white/60 group-hover:border-white/20 transition-colors"
                        >
                          {d}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                      {/* Interactive Pill Button with rb-link-glanz sheen effect */}
                      <Link
                        href={serv.href}
                        className="rb-link-glanz inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/5 hover:bg-[#59BFD6] text-white hover:text-[#0b0d10] border border-white/20 hover:border-[#59BFD6] font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-md"
                      >
                        <span>Explorar Oficio</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>

                      <Link
                        href={`/contacto?servicio=${serv.href.replace('/servicios/', '')}`}
                        className="text-xs font-mono uppercase tracking-wider text-white/50 hover:text-[#59BFD6] transition-colors"
                      >
                        <span>Cotizar Proyecto</span> &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
