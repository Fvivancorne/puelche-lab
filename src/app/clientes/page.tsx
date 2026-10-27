'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// The 20 real clients of Puelche Lab
const CLIENT_LOGOS = [
  { id: 1, name: 'Soldasur', file: 'cliente1-1.png' },
  { id: 2, name: 'Seremi de Salud', file: 'cliente2-1.png' },
  { id: 3, name: 'Anasac', file: 'cliente3-1.png' },
  { id: 4, name: 'Estancia Rilán', file: 'cliente4-1.png' },
  { id: 5, name: 'Hotel Quilquico', file: 'cliente5-1.png' },
  { id: 6, name: 'Hotel Costaustralis', file: 'cliente6-1.png' },
  { id: 7, name: 'Hotel Cabo de Hornos', file: 'cliente7-1.png' },
  { id: 8, name: 'Viajes Falabella', file: 'cliente8-1.png' },
  { id: 9, name: 'AquaChile', file: 'cliente9-1.png' },
  { id: 10, name: 'Cala Melí', file: 'cliente10-1.png' },
  { id: 11, name: 'Tagua Tagua Lodge', file: 'cliente11-1.png' },
  { id: 12, name: 'Hotel Ohana', file: 'cliente12-1.png' },
  { id: 13, name: 'Gallo Negro', file: 'cliente13-1.png' },
  { id: 14, name: 'Blue Seal Subsea', file: 'cliente14-1.png' },
  { id: 15, name: 'Cirumed', file: 'cliente15-1.png' },
  { id: 16, name: 'El Triwe', file: 'cliente16-1.png' },
  { id: 17, name: 'Centro Maqui', file: 'cliente17-1.png' },
  { id: 18, name: 'ARMH', file: 'cliente18-1.png' },
  { id: 19, name: 'San Ambrosio', file: 'cliente19-1.png' },
  { id: 20, name: 'Saltos del Maullín', file: 'cliente20-1.png' },
];

export default function ClientesPage() {
  return (
    <div className="w-full flex-1 bg-puelche-cyan min-h-screen text-white">
      {/* Top Banner on Cyan */}
      <section className="py-16 md:py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="font-condensed uppercase tracking-widest text-xs font-bold text-white/80 block">
            CONFIANZA & TRAYECTORIA
          </span>
          <h1 className="font-condensed text-5xl sm:text-6xl md:text-7xl uppercase tracking-wider text-white font-bold">
            CLIENTES
          </h1>
          <p className="font-sans text-base sm:text-lg text-white/95 max-w-2xl mx-auto font-light leading-relaxed">
            Empresas, hoteles, industrias y marcas que han confiado su imagen y comunicación al viento creativo de Puelche Lab.
          </p>
        </div>
      </section>

      {/* 20 White Logos Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 items-center justify-center">
          {CLIENT_LOGOS.map((client) => (
            <div
              key={client.id}
              className="h-32 sm:h-36 p-6 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-lg group"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={`/images/real/clients/${client.file}`}
                  alt={`Logo ${client.name} — Cliente Puelche Lab`}
                  width={270}
                  height={180}
                  className="max-h-full max-w-full object-contain filter brightness-100 group-hover:brightness-110 transition-all duration-200"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
