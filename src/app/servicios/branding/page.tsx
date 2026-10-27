'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const BRANDING_CLIENTS = [
  { name: 'Estancia Rilan', category: 'Hospitalidad & Cava', location: 'Chiloé', image: '/images/real/bg-portafolios-fotografia-min.jpg' },
  { name: 'Blue Seal', category: 'Robótica Submarina', location: 'Puerto Montt', image: '/images/real/bg-portafolios-fotografia-h-min.jpg' },
  { name: 'Cirumed', category: 'Equipamiento Clínico', location: 'Los Lagos', image: '/images/real/bg-portafolios-fotografia-d-min.jpg' },
  { name: 'TRI Chile', category: 'Deporte & Triatlón', location: 'Nacional', image: '/images/real/bg-fotografia-6-min.jpg' },
  { name: 'RMH', category: 'Ingeniería & Maquinaria', location: 'Puerto Montt', image: '/images/real/bg-portafolios-fotografia-i-min.jpg' },
  { name: 'Centro Maqui', category: 'Agroindustria Orgánica', location: 'Los Lagos', image: '/images/real/bg-home-2.jpg' },
  { name: 'San Ambrosio', category: 'Desarrollo Territorial', location: 'Sur de Chile', image: '/images/real/bg-agencia.jpg' },
  { name: 'Sur Terra', category: 'Conservación Inmobiliaria', location: 'Lago Llanquihue', image: '/images/real/bg-portafolios-fotografia-a-min.jpg' },
  { name: 'Andesmaq', category: 'Maquinaria Pesada', location: 'Zona Sur', image: '/images/real/bg-fotografia-9-min.jpg' },
  { name: 'Gallo Negro', category: 'Gastronomía & Coctelería', location: 'Puerto Varas', image: '/images/real/bg-portafolios-fotografia-b-min.jpg' },
];

export default function BrandingPage() {
  return (
    <div className="w-full flex flex-col bg-white">
      {/* Top Banner */}
      <section className="bg-puelche-slate py-16 px-6 text-center border-b border-puelche-slate-dark">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="font-condensed uppercase tracking-widest text-xs font-bold text-puelche-cyan">
            ESTUDIO PUELCHE LAB
          </span>
          <h1 className="font-condensed text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider text-white font-bold">
            DISEÑO DE MARCA
          </h1>
          <p className="font-sans text-sm sm:text-base text-white/80 max-w-xl mx-auto font-light leading-relaxed">
            Identidades visuales integrales, imagotipos y sistemas de diseño para empresas, instituciones y proyectos con sello patagónico.
          </p>
        </div>
      </section>

      {/* Bomberos de Santiago Feature Story (Real Live Puelche Lab DNA) */}
      <section className="bg-[#F8FAFB] py-16 px-6 sm:px-8 border-b border-gray-200">
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-lg border border-puelche-cyan/30 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-puelche-cyan" />
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 font-condensed uppercase tracking-widest text-xs font-bold text-puelche-cyan">
              <Award className="w-4 h-4" />
              <span>Hito Destacado</span>
            </span>
            <blockquote className="font-sans text-lg sm:text-xl md:text-2xl text-puelche-dark font-light italic leading-relaxed">
              &ldquo;Nuestro orgullo más grande, haber tenido el honor de crear la marca para la Vigésima Compañía de Bomberos de Santiago. Ver nuestro trabajo bordado en cada butaca de la nueva máquina, no tiene precio.&rdquo;
            </blockquote>
            <p className="font-condensed uppercase tracking-wider text-xs sm:text-sm font-bold text-puelche-slate">
              — Equipo Puelche Lab
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Real Brand Clients */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-condensed uppercase tracking-widest text-xs font-bold text-puelche-cyan block mb-2">
            CASOS DE IDENTIDAD
          </span>
          <h2 className="font-condensed text-3xl sm:text-4xl uppercase tracking-wider text-puelche-dark font-bold">
            Marcas Creadas por Puelche Lab
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRANDING_CLIENTS.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden bg-puelche-slate">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <span className="font-condensed text-xs uppercase tracking-widest text-puelche-cyan font-bold block">
                    {item.location}
                  </span>
                  <h3 className="font-condensed text-xl uppercase tracking-wider font-bold">
                    Cliente: {item.name}
                  </h3>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="font-sans text-sm text-puelche-gray mb-4">
                  Desarrollo de identidad de marca, manual de normas y aplicaciones cross-media en soporte físico y digital.
                </p>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="font-condensed text-xs uppercase tracking-wider font-semibold text-puelche-slate">
                    {item.category}
                  </span>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-1 font-condensed text-xs uppercase tracking-widest text-puelche-cyan font-bold hover:text-puelche-slate transition-colors"
                  >
                    <span>Cotizar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
