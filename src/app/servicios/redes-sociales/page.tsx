'use client';

import React from 'react';
import Link from 'next/link';
import { Share2, MessageCircle, BarChart3, ArrowRight } from 'lucide-react';

export default function RedesSocialesPage() {
  return (
    <div className="w-full flex flex-col bg-white">
      {/* Banner */}
      <section className="bg-puelche-slate py-16 px-6 text-center border-b border-puelche-slate-dark">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="font-condensed uppercase tracking-widest text-xs font-bold text-puelche-cyan">
            ESTUDIO PUELCHE LAB
          </span>
          <h1 className="font-condensed text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider text-white font-bold">
            REDES SOCIALES
          </h1>
          <p className="font-sans text-sm sm:text-base text-white/80 max-w-xl mx-auto font-light leading-relaxed">
            Estrategia de contenidos, fotografía real y dirección de arte para canales de Instagram, Facebook y plataformas digitales.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 bg-[#F8FAFB] border border-gray-100 rounded-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-puelche-cyan/15 flex items-center justify-center text-puelche-cyan">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="font-condensed text-2xl uppercase tracking-wide font-bold text-puelche-dark">
              Contenido Real & Propio
            </h3>
            <p className="font-sans text-sm text-puelche-gray leading-relaxed">
              Generamos contenido fotográfico y audiovisual genuino con nuestro propio equipo en Puerto Varas, sin recurrir a bancos de imágenes genéricos.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFB] border border-gray-100 rounded-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-puelche-cyan/15 flex items-center justify-center text-puelche-cyan">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-condensed text-2xl uppercase tracking-wide font-bold text-puelche-dark">
              Coherencia de Marca
            </h3>
            <p className="font-sans text-sm text-puelche-gray leading-relaxed">
              Mantenemos una línea gráfica impecable en feeds, historias y reels, asegurando que cada publicación refuerce la personalidad de tu empresa.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFB] border border-gray-100 rounded-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-puelche-cyan/15 flex items-center justify-center text-puelche-cyan">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="font-condensed text-2xl uppercase tracking-wide font-bold text-puelche-dark">
              Estrategia Cross-Media
            </h3>
            <p className="font-sans text-sm text-puelche-gray leading-relaxed">
              Sincronizamos tus campañas en redes sociales con tu sitio web, lanzamientos de producto y material publicitario impreso.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-3 px-8 py-4 bg-puelche-cyan text-white font-condensed uppercase tracking-widest text-base font-bold rounded-sm hover:bg-puelche-cyan-dark transition-colors shadow-md"
          >
            <span>Cotizar Redes Sociales</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
