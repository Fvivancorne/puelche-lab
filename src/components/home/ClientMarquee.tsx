'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Verified authentic client names matching public/images/real/clients/cliente1-1.png to cliente20-1.png
const CLIENT_NAMES = [
  'AquaChile',
  'Soldasur',
  'Seremi del Medio Ambiente',
  'Anasac',
  'Estancia Rilán',
  'Hotel Quilquico',
  'Hotel Costaustralis',
  'Hotel Cabo de Hornos',
  'Viajes Falabella',
  'Cala Melí',
  'Tagua Tagua Lodge',
  'Hotel Ohana',
  'Gallo Negro',
  'Blue Seal Subsea',
  'Cirumed',
  'El Triwe',
  'Centro Maqui',
  'ARMH',
  'San Ambrosio',
  'Saltos del Maullín',
];

// Generate the list of 20 client logo filenames
const LOGOS = Array.from({ length: 20 }, (_, i) => ({
  src: `/images/real/clients/cliente${i + 1}-1.png`,
  alt: `Logo oficial ${CLIENT_NAMES[i]}: Cliente Puelche Lab`,
  name: CLIENT_NAMES[i],
}));

// Split into two rows
const ROW_1 = LOGOS.slice(0, 10);
const ROW_2 = LOGOS.slice(10, 20);

function MarqueeRow({
  logos,
  direction = 'left',
  speed = 40,
}: {
  logos: typeof LOGOS;
  direction?: 'left' | 'right';
  speed?: number;
}) {
  // Triple the logos for seamless loop
  const tripled = [...logos, ...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden py-6 md:py-8">
      <div
        className="puelche-marquee flex items-center gap-12 md:gap-16 w-max"
        style={{
          animation: `${direction === 'left' ? 'marquee-left' : 'marquee-right'} ${speed}s linear infinite`,
        }}
      >
        {tripled.map((logo, idx) => (
          <div
            key={`${logo.src}-${idx}`}
            className="shrink-0 w-36 sm:w-44 md:w-52 h-20 sm:h-24 md:h-28 relative flex items-center justify-center opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 px-4 py-2 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 backdrop-blur-xs"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={200}
              height={100}
              unoptimized
              className="object-contain max-h-[85%] max-w-[85%] brightness-150 drop-shadow-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientMarquee() {
  return (
    <section className="relative w-full bg-puelche-dark py-16 md:py-24 overflow-hidden border-y border-white/5">
      {/* Section Label */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2 h-2 rounded-full bg-puelche-cyan" />
          <span className="font-mono text-xs uppercase tracking-widest text-puelche-cyan">
            Clientes & Territorio Austral
          </span>
        </div>
        <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide text-white">
          20 Marcas Destacadas de +50 Proyectos Australes
        </h2>
        <p className="font-sans text-sm md:text-base text-white/70 max-w-2xl font-light leading-relaxed pt-2">
          Selección de 20 marcas líderes extraídas de un archivo vivo de más de 50 proyectos y expediciones en terreno por Los Lagos, Chiloé y Patagonia profunda. Rigor visual certificado sin bancos de stock.
        </p>
      </div>

      {/* Double Marquee — opposite directions */}
      <MarqueeRow logos={ROW_1} direction="left" speed={45} />
      <MarqueeRow logos={ROW_2} direction="right" speed={50} />

      {/* Gradient fades on edges */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-puelche-dark to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-puelche-dark to-transparent pointer-events-none z-10" />

      {/* Behind The Scenes & Field Proof Strip */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mt-12 pt-8 border-t border-white/10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="text-[#59BFD6] font-mono text-[11px] uppercase tracking-wider">
              <span>Faena Industrial</span>
            </div>
            <div className="font-condensed text-lg font-bold text-white uppercase">Puerto Montt & Fiordos</div>
            <p className="font-sans text-xs text-white/60 leading-relaxed font-light">
              Producción fotográfica a bordo de embarcaciones y faenas marítimas para AquaChile y Soldasur.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="text-[#59BFD6] font-mono text-[11px] uppercase tracking-wider">
              <span>Hotelería Vernácula</span>
            </div>
            <div className="font-condensed text-lg font-bold text-white uppercase">Chiloé & Cava</div>
            <p className="font-sans text-xs text-white/60 leading-relaxed font-light">
              Registro de luz rasante y maderas nobles en Estancia Rilán y Hotel Quilquico en la península chilota.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="text-[#59BFD6] font-mono text-[11px] uppercase tracking-wider">
              <span>Dron & Aislamiento</span>
            </div>
            <div className="font-condensed text-lg font-bold text-white uppercase">Río Puelo & Cochamó</div>
            <p className="font-sans text-xs text-white/60 leading-relaxed font-light">
              Vuelos 4K a baja cota y navegación fluvial cordillerana para documentar Tagua Tagua Lodge sin señal telefónica.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="text-[#59BFD6] font-mono text-[11px] uppercase tracking-wider">
              <span>Confín Austral</span>
            </div>
            <div className="font-condensed text-lg font-bold text-white uppercase">Punta Arenas & Natales</div>
            <p className="font-sans text-xs text-white/60 leading-relaxed font-light">
              Dirección de arte e interiores patrimoniales en Hotel Cabo de Hornos y Costaustralis frente al Estrecho de Magallanes.
            </p>
          </div>
        </div>

        {/* Pacto de Autoría & Enlace */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5 text-xs font-mono text-white/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white/80">Evidencia 100% Verificable en Terreno &bull; Cero Imágenes de Stock</span>
          </div>
          <Link
            href="/clientes"
            className="text-[#59BFD6] hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider font-semibold"
          >
            <span>Ver Archivo Territorial Completo &rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
