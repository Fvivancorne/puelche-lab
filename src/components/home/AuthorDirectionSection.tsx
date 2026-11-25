'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, Compass, MapPin, Award, CheckCircle2, ArrowUpRight, PhoneCall, Sparkles } from 'lucide-react';

export function AuthorDirectionSection() {
  const [activePhoto, setActivePhoto] = useState<'portrait' | 'field'>('portrait');

  return (
    <section
      id="direccion-creativa"
      aria-label="Dirección Creativa y Autoría Austral"
      className="relative w-full bg-[#0a0c10] py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-white/10 overflow-hidden text-white"
    >
      {/* Kinetic Watermark Typography */}
      <div aria-hidden="true" className="absolute -top-12 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.02] whitespace-nowrap font-condensed text-[14vw] font-black uppercase text-white leading-none">
        DIRECCIÓN DE AUTOR
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Encabezado de Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#59BFD6]/10 border border-[#59BFD6]/20 font-mono text-[11px] text-[#59BFD6] uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '18s' }} />
              <span>Puerto Varas &bull; 41°19&apos;S 72°59&apos;W</span>
            </div>
            <h2 className="font-condensed text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white leading-[0.95]">
              Detrás del Lente y la <span className="text-[#59BFD6]">Dirección de Arte</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-white/60 max-w-2xl leading-relaxed">
              No somos un banco de imágenes ni una agencia que subcontrata a terceros. Cada toma, pliego editorial e identidad de marca es capturada, revelada y firmada personalmente por sus fundadores en terreno austral.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-[#59BFD6] hover:text-[#08090b] text-white border border-white/15 font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-lg hover:scale-105"
            >
              <span>Conversar con la Dirección</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Grilla Asimétrica de Dirección: Alejandro Lattes + Paula Valdivieso + Manifiesto Técnico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card Principal: Alejandro Lattes (7 cols) */}
          <div className="lg:col-span-7 bg-[#111318] border border-white/10 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row gap-8 shadow-2xl relative overflow-hidden group">
            {/* Ambient Cyan Aura */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#59BFD6]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Foto de Alejandro con selector interactivo */}
            <div className="w-full md:w-56 shrink-0 space-y-3">
              <div
                className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black/60 border border-white/15 shadow-inner cursor-pointer"
                onClick={() => setActivePhoto(activePhoto === 'portrait' ? 'field' : 'portrait')}
                title="Clic para alternar captura en terreno"
              >
                <Image
                  src={
                    activePhoto === 'portrait'
                      ? '/images/real/equipo/alejandro-lattes.jpg'
                      : '/images/real/equipo/alejandro-lattes-field.jpg'
                  }
                  alt="Alejandro Lattes Corona: Fundador y Director Creativo de Puelche Lab"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale contrast-125"
                />
                
                {/* Badge en vivo sobre la foto */}
                <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 flex items-center justify-between text-[10px] font-mono text-white/80">
                  <span>{activePhoto === 'portrait' ? 'En Faena Austral' : 'Trípode & Encuadre'}</span>
                  <span className="text-[#59BFD6] font-bold">&bull; 41°S</span>
                </div>
              </div>

              {/* Botones de alternar encuadre */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActivePhoto('portrait')}
                  className={`flex-1 py-1 rounded-lg font-mono text-[9px] uppercase tracking-wider transition-colors border ${
                    activePhoto === 'portrait'
                      ? 'bg-[#59BFD6]/20 border-[#59BFD6]/40 text-[#59BFD6] font-bold'
                      : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
                  }`}
                >
                  Retrato
                </button>
                <button
                  type="button"
                  onClick={() => setActivePhoto('field')}
                  className={`flex-1 py-1 rounded-lg font-mono text-[9px] uppercase tracking-wider transition-colors border ${
                    activePhoto === 'field'
                      ? 'bg-[#59BFD6]/20 border-[#59BFD6]/40 text-[#59BFD6] font-bold'
                      : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
                  }`}
                >
                  Locación
                </button>
              </div>
            </div>

            {/* Texto y Bio de Alejandro */}
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#59BFD6]">
                    FUNDADOR &bull; DIRECCIÓN CREATIVA
                  </span>
                </div>
                <h3 className="font-condensed text-3xl sm:text-4xl font-bold uppercase tracking-wide text-white">
                  Alejandro Lattes Corona
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
                  Fotógrafo y diseñador con más de 12 años recorriendo la geografía del sur de Chile: desde la cuenca del Lago Llanquihue y Chiloé hasta los fiordos de Última Esperanza y Cabo de Hornos. Combina el rigor del revelado analógico y la fotografía de arquitectura con la dirección de arte digital contemporánea.
                </p>
              </div>

              {/* Badges de Especialidad */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-white/40">
                  ESPECIFICACIONES DE CAPTURA & INSTRUMENTAL:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-[10px] text-white/80">
                    Sony Alpha &bull; G Master
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-[10px] text-white/80">
                    Piloto Dron 4K Certificado DGAC
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-[10px] text-white/80">
                    Revelado RAW Fine-Art 16-Bit
                  </span>
                </div>
              </div>

              {/* Contacto Directo */}
              <div className="pt-2 flex items-center gap-4 text-xs font-mono">
                <a
                  href="mailto:alejandro@puelchelab.cl"
                  className="text-white/60 hover:text-[#59BFD6] transition-colors"
                >
                  alejandro@puelchelab.cl
                </a>
                <span className="text-white/20">&bull;</span>
                <a
                  href="tel:+56999363705"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  +56 9 9936 3705
                </a>
              </div>
            </div>
          </div>

          {/* Card Secundaria: Paula Valdivieso + Taller Territorial (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Paula Valdivieso */}
            <div className="bg-[#111318] border border-white/10 rounded-3xl p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4 shadow-xl">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#C29B63]">
                    SOCIA &bull; PRODUCCIÓN EJECUTIVA & ARTE
                  </span>
                  <Award className="w-4 h-4 text-[#C29B63]" />
                </div>
                <h3 className="font-condensed text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white">
                  Paula Valdivieso
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
                  Lidera el acompañamiento consultivo, el diseño editorial y la gestión de expediciones en terreno. Garantiza que cada entrega técnica responda a la visión comercial y cultural del cliente, cuidando la retícula suiza y la armonía tipográfica.
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-[10px] text-white/80">
                    Dirección de Arte
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-[10px] text-white/80">
                    Diseño Editorial Suizo
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-[10px] text-white/80">
                    Coordinación en Faena
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs font-mono">
                  <a
                    href="mailto:paula.valdivieso@puelchelab.cl"
                    className="text-white/60 hover:text-[#C29B63] transition-colors"
                  >
                    paula.valdivieso@puelchelab.cl
                  </a>
                  <a
                    href="tel:+56966177500"
                    className="text-[#59BFD6] hover:underline"
                  >
                    +56 9 6617 7500
                  </a>
                </div>
              </div>
            </div>

            {/* Manifiesto del Taller Austral */}
            <div className="bg-[#14171d] border border-white/10 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Pacto de Cero Stock & Autoría Viva</span>
              </div>
              <p className="font-sans text-xs text-white/60 leading-relaxed">
                Ninguna imagen en nuestro portafolio proviene de librerías prediseñadas ni algoritmos sintéticos. El 100% de la luz, el grano y las composiciones fueron ejecutadas en faena real bajo el clima cambiante de la Patagonia.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
