'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Monitor, Smartphone, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function DesarrolloWebPage() {
  return (
    <div className="w-full flex flex-col bg-white">
      {/* Banner */}
      <section className="bg-puelche-slate py-16 px-6 text-center border-b border-puelche-slate-dark">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="font-condensed uppercase tracking-widest text-xs font-bold text-puelche-cyan">
            ESTUDIO PUELCHE LAB
          </span>
          <h1 className="font-condensed text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider text-white font-bold">
            DESARROLLO WEB
          </h1>
          <p className="font-sans text-sm sm:text-base text-white/80 max-w-xl mx-auto font-light leading-relaxed">
            Sitios web y plataformas digitales de alto impacto visual, 100% adaptables a dispositivos móviles y diseñadas para posicionar tu marca.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 bg-[#F8FAFB] border border-gray-100 rounded-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-puelche-cyan/15 flex items-center justify-center text-puelche-cyan">
              <Monitor className="w-6 h-6" />
            </div>
            <h3 className="font-condensed text-2xl uppercase tracking-wide font-bold text-puelche-dark">
              Diseño a Medida
            </h3>
            <p className="font-sans text-sm text-puelche-gray leading-relaxed">
              Diseñamos interfaces web personalizadas que respetan y potencian la identidad corporativa de tu empresa, asegurando una presencia digital memorable.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFB] border border-gray-100 rounded-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-puelche-cyan/15 flex items-center justify-center text-puelche-cyan">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-condensed text-2xl uppercase tracking-wide font-bold text-puelche-dark">
              100% Responsive
            </h3>
            <p className="font-sans text-sm text-puelche-gray leading-relaxed">
              Navegación fluida y óptima en smartphones, tablets y pantallas de escritorio de gran resolución, garantizando una experiencia de usuario perfecta.
            </p>
          </div>

          <div className="p-8 bg-[#F8FAFB] border border-gray-100 rounded-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-puelche-cyan/15 flex items-center justify-center text-puelche-cyan">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-condensed text-2xl uppercase tracking-wide font-bold text-puelche-dark">
              Integración Cross-Media
            </h3>
            <p className="font-sans text-sm text-puelche-gray leading-relaxed">
              Fotografía profesional propia, videos en alta definición y copys sincronizados para que tu sitio web sea el centro neurálgico de tu negocio.
            </p>
          </div>
        </div>

        {/* Action Link */}
        <div className="text-center">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-3 px-8 py-4 bg-puelche-cyan text-white font-condensed uppercase tracking-widest text-base font-bold rounded-sm hover:bg-puelche-cyan-dark transition-colors shadow-md"
          >
            <span>Cotizar Sitio Web</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
