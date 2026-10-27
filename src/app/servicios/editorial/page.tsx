'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Layers, Printer, ArrowRight } from 'lucide-react';

export default function EditorialPage() {
  return (
    <div className="w-full flex flex-col bg-white">
      {/* Banner */}
      <section className="bg-puelche-slate py-16 px-6 text-center border-b border-puelche-slate-dark">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="font-condensed uppercase tracking-widest text-xs font-bold text-puelche-cyan">
            ESTUDIO PUELCHE LAB
          </span>
          <h1 className="font-condensed text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider text-white font-bold">
            DISEÑO EDITORIAL
          </h1>
          <p className="font-sans text-sm sm:text-base text-white/80 max-w-xl mx-auto font-light leading-relaxed">
            Memorias anuales, libros institucionales, catálogos comerciales y piezas gráficas impresas con el más alto estándar de diagramación.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 bg-[#F8FAFB] border border-gray-100 rounded-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-puelche-cyan/15 flex items-center justify-center text-puelche-cyan">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-condensed text-2xl uppercase tracking-wide font-bold text-puelche-dark">
              Memorias & Libros
            </h3>
            <p className="font-sans text-sm text-puelche-gray leading-relaxed">
              Diagramación rigurosa de publicaciones corporativas, memorias de sustentabilidad y libros de autor que documentan el patrimonio austral.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFB] border border-gray-100 rounded-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-puelche-cyan/15 flex items-center justify-center text-puelche-cyan">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-condensed text-2xl uppercase tracking-wide font-bold text-puelche-dark">
              Catálogos & Folletos
            </h3>
            <p className="font-sans text-sm text-puelche-gray leading-relaxed">
              Brochures de alta gama para proyectos inmobiliarios, cartas gastronómicas y catálogos de productos pensados para cautivar al cliente final.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFB] border border-gray-100 rounded-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-puelche-cyan/15 flex items-center justify-center text-puelche-cyan">
              <Printer className="w-6 h-6" />
            </div>
            <h3 className="font-condensed text-2xl uppercase tracking-wide font-bold text-puelche-dark">
              Supervisión de Imprenta
            </h3>
            <p className="font-sans text-sm text-puelche-gray leading-relaxed">
              Control técnico de pre-prensa, selección de papeles especiales, barnices y pruebas de color para asegurar que la impresión sea fiel al diseño.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-3 px-8 py-4 bg-puelche-cyan text-white font-condensed uppercase tracking-widest text-base font-bold rounded-sm hover:bg-puelche-cyan-dark transition-colors shadow-md"
          >
            <span>Cotizar Proyecto Editorial</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
