import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Wind, MapPin, Mail, Phone, Instagram } from 'lucide-react';
import { STUDIO_SERVICES } from '@/data/portfolio';

export function Footer() {
  return (
    <footer className="w-full bg-[#18191B] text-[#F9F9F6] pt-24 pb-12 px-6 md:px-12 lg:px-16 border-t border-[#2A2B2E]">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Top Split: Manifesto & Quick Brief CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#2A2B2E]">
          <div className="lg:col-span-7 space-y-6">
            <Link href="/" className="inline-block group mb-2" aria-label="Puelche Lab Inicio">
              <Image
                src="/images/real/logo-puelche.png"
                alt="Puelche Lab — Viento Creativo"
                width={160}
                height={110}
                className="h-14 sm:h-16 w-auto object-contain opacity-95 group-hover:opacity-100 transition-opacity"
              />
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A2B2E] text-[#C29B63] text-xs font-mono uppercase tracking-widest">
              <Wind className="w-3.5 h-3.5" />
              <span>EL MANIFIESTO DEL PUELCHE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-[#F9F9F6]">
              Como el viento que desciende de la cordillera, transformamos la presencia visual de marcas australes.
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#8E9089] max-w-xl leading-relaxed">
              Trabajamos desde Puerto Varas para toda la cuenca del Lago Llanquihue, Chiloé y la Patagonia. Conectamos la fotografía de alta precisión, el diseño de autor y la tecnología web para que tu proyecto lidere su territorio.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-[#202225] border border-[#2A2B2E] space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C29B63]">
                [ NUEVA CONVERSACIÓN ]
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#F9F9F6]">
                ¿Tienes un proyecto en mente para este año?
              </h3>
              <p className="text-xs text-[#8E9089] leading-relaxed">
                Respondemos en menos de 24 horas hábiles con un plan de trabajo y presupuesto detallado.
              </p>
            </div>

            <Link
              href="/contacto"
              className="inline-flex items-center justify-between w-full px-6 py-4 rounded-2xl bg-[#C29B63] text-[#18191B] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#E6D5B8] transition-colors"
            >
              <span>Comenzar Brief</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Middle Columns: Services, Navigation, Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 font-mono text-xs uppercase tracking-wider text-[#8E9089]">
          {/* Col 1: Servicios Core */}
          <div className="space-y-4">
            <span className="text-[#F9F9F6] font-semibold text-sm">Servicios</span>
            <ul className="space-y-2.5">
              {STUDIO_SERVICES.map((s) => (
                <li key={s.id}>
                  <Link href={s.href} className="hover:text-[#C29B63] transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Exploración */}
          <div className="space-y-4">
            <span className="text-[#F9F9F6] font-semibold text-sm">Exploración</span>
            <ul className="space-y-2.5">
              <li>
                <Link href="/portafolio" className="hover:text-[#C29B63] transition-colors">
                  Portafolio de Obras
                </Link>
              </li>
              <li>
                <Link href="/clientes" className="hover:text-[#C29B63] transition-colors">
                  Clientes &amp; Trayectoria
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-[#C29B63] transition-colors">
                  Cotizador &amp; Brief
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Ubicación y Contacto */}
          <div className="space-y-4">
            <span className="text-[#F9F9F6] font-semibold text-sm">Territorio</span>
            <div className="space-y-2 text-[#8E9089] leading-relaxed">
              <p className="text-[#F9F9F6] font-medium text-xs tracking-wider">
                Paula Valdivieso
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C29B63] shrink-0" />
                <span>Puerto Varas, Región de Los Lagos</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C29B63] shrink-0" />
                <a
                  href="mailto:paula.valdivieso@puelchelab.cl"
                  className="hover:text-[#C29B63] transition-colors lowercase"
                >
                  paula.valdivieso@puelchelab.cl
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C29B63] shrink-0" />
                <a
                  href="https://wa.me/56966177500"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C29B63] transition-colors"
                >
                  +56 9 6617 7500
                </a>
              </p>
            </div>
          </div>

          {/* Col 4: Redes & Coordenadas */}
          <div className="space-y-4">
            <span className="text-[#F9F9F6] font-semibold text-sm">Digital</span>
            <div className="space-y-2.5">
              <a
                href="https://www.instagram.com/puelche_lab/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#C29B63] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#C29B63]" />
                <span>@puelche_lab</span>
              </a>
              <p className="text-[11px] text-[#55565A]">
                Coordenadas: 41.3195° S, 72.9854° W
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Colossal Wordmark */}
        <div className="pt-12 border-t border-[#2A2B2E] flex flex-col items-center text-center space-y-6">
          <div className="font-sans font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter text-[#2A2B2E] select-none">
            PUELCHE LAB
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono uppercase text-[#666863] gap-4">
            <span>&copy; {new Date().getFullYear()} Puelche Lab. Todos los derechos reservados.</span>
            <span>Diseño Cross-Media &bull; Fotografía de Autor &bull; Puerto Varas</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
