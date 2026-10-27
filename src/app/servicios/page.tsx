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
    <div className="w-full flex flex-col bg-white">
      {/* Banner */}
      <section className="bg-puelche-slate py-16 px-6 text-center border-b border-puelche-slate-dark">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="font-condensed uppercase tracking-widest text-xs font-bold text-puelche-cyan">
            ESTUDIO PUELCHE LAB
          </span>
          <h1 className="font-condensed text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider text-white font-bold">
            NUESTROS SERVICIOS
          </h1>
          <p className="font-sans text-sm sm:text-base text-white/80 max-w-xl mx-auto font-light leading-relaxed">
            Diseño Cross Media y Fotografía profesional en Puerto Varas y la Región de Los Lagos.
          </p>
        </div>
      </section>

      {/* Grid of 6 Services */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((serv) => {
            const Icon = serv.icon;
            return (
              <div
                key={serv.title}
                className="p-8 bg-[#F8FAFB] border border-gray-100 rounded-sm hover:border-puelche-cyan/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-puelche-cyan/15 flex items-center justify-center text-puelche-cyan mb-6 group-hover:bg-puelche-cyan group-hover:text-white transition-colors duration-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="font-condensed text-2xl uppercase tracking-wider font-bold text-puelche-dark mb-3">
                    {serv.title}
                  </h2>
                  <p className="font-sans text-sm text-puelche-gray leading-relaxed mb-6">
                    {serv.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href={serv.href}
                    className="inline-flex items-center gap-2 font-condensed uppercase tracking-widest text-xs font-bold text-puelche-cyan hover:text-puelche-slate transition-colors"
                  >
                    <span>Ver Detalles</span>
                    <ArrowRight className="w-4 h-4" />
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
