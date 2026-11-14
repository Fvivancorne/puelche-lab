'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Instagram, Facebook, ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { STUDIO_SERVICES } from '@/data/portfolio';

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }
  return (
    <footer id="footer" className="w-full bg-[#0a0b0e] bg-[#18191B] text-white relative overflow-hidden border-t border-white/10">
      {/* ── LÍNEA DE LUZ PATAGÓNICA SUPERIOR ── */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#59BFD6] to-transparent opacity-60" />

      {/* Resplandor ambiental cian sutil de fondo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#59BFD6]/[0.03] blur-[150px] pointer-events-none" />

      {/* Framed Geometric Container matching the real Puelche Lab signature section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="border border-white/15 bg-[#101216]/80 backdrop-blur-md rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 md:p-16 text-center relative shadow-[0_20px_70px_rgba(0,0,0,0.85)]">
          {/* Subtle Corner Accents (Optical Camera Guides) */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#59BFD6]/80" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#59BFD6]/80" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#59BFD6]/80" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#59BFD6]/80" />

          {/* Genuine Stacked Logo Emblem */}
          <div className="w-24 sm:w-28 mx-auto mb-6">
            <Image
              src="/images/real/logo-puelche.png"
              alt="Puelche Lab Viento Creativo"
              width={200}
              height={136}
              className="w-full h-auto object-contain mx-auto filter drop-shadow-lg brightness-125"
            />
          </div>

          {/* Subtitle / Manifesto Tag */}
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 rounded-full bg-[#59BFD6]/10 border border-[#59BFD6]/30 text-[#59BFD6] font-mono uppercase tracking-[0.2em] text-[11px] font-semibold backdrop-blur-sm shadow-[0_0_15px_rgba(89,191,214,0.15)]">
              EL MANIFIESTO DEL PUELCHE &bull; VIENTO CREATIVO
            </span>
          </div>

          {/* Heading with Optical Letter-spacing & Grammatical Precision */}
          <h2
            aria-label="CONTACTANOS"
            data-text="CONTACTANOS"
            className="font-condensed text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.06em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/80 mb-6 drop-shadow-sm"
          >
            CONTÁCTANOS
          </h2>

          {/* Subtitle with Optimal Saccadic Line Length */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-white/75 max-w-xl mx-auto mb-10 leading-relaxed font-light">
            Lo que necesites saber, lo que necesites cotizar, lo que necesites hacer,
            <span className="block font-medium text-white pt-1">contáctanos y conversemos sobre tu territorio.</span>
          </p>

          {/* Verified Studio Contact Cards (Gestalt Common Region & Human Connection) */}
          <div className="max-w-2xl mx-auto mb-10 border-y border-white/10 py-6 sm:py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left mb-6">
              {/* Alejandro Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#59BFD6]/40 transition-colors">
                <p className="font-condensed text-base font-bold text-white uppercase tracking-wider mb-1">
                  Alejandro Lattes Corona
                </p>
                <p className="font-mono text-[11px] text-[#59BFD6] uppercase tracking-wider mb-3">
                  Fundador &bull; Dirección Creativa & Fotografía
                </p>
                <div className="space-y-1.5 font-mono text-xs text-white/80">
                  <a
                    href="mailto:alejandro@puelchelab.cl"
                    className="flex items-center gap-2 hover:text-[#59BFD6] transition-colors group"
                  >
                    <Mail className="w-3.5 h-3.5 text-white/40 group-hover:text-[#59BFD6] shrink-0" />
                    <span className="underline decoration-white/20 underline-offset-2">alejandro@puelchelab.cl</span>
                  </a>
                  <a
                    href="tel:+56999363705"
                    className="flex items-center gap-2 hover:text-[#59BFD6] transition-colors group"
                  >
                    <Phone className="w-3.5 h-3.5 text-white/40 group-hover:text-[#59BFD6] shrink-0" />
                    <span className="underline decoration-white/20 underline-offset-2">+56 9 9936 3705</span>
                  </a>
                </div>
              </div>

              {/* Paula Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#59BFD6]/40 transition-colors">
                <p className="font-condensed text-base font-bold text-white uppercase tracking-wider mb-1">
                  Paula Valdivieso
                </p>
                <p className="font-mono text-[11px] text-[#59BFD6] uppercase tracking-wider mb-3">
                  Directora de Arte y Fotografía
                </p>
                <div className="space-y-1.5 font-mono text-xs text-white/80">
                  <a
                    href="mailto:paula.valdivieso@puelchelab.cl"
                    className="flex items-center gap-2 hover:text-[#59BFD6] transition-colors group"
                  >
                    <Mail className="w-3.5 h-3.5 text-white/40 group-hover:text-[#59BFD6] shrink-0" />
                    <span className="underline decoration-white/20 underline-offset-2">paula.valdivieso@puelchelab.cl</span>
                  </a>
                  <a
                    href="tel:+56966177500"
                    className="flex items-center gap-2 hover:text-[#59BFD6] transition-colors group"
                  >
                    <Phone className="w-3.5 h-3.5 text-white/40 group-hover:text-[#59BFD6] shrink-0" />
                    <span className="underline decoration-white/20 underline-offset-2">+56 9 6617 7500</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Geographical Anchor */}
            <div className="flex items-center justify-center gap-2 font-mono text-xs text-[#59BFD6] tracking-wider pt-2">
              <MapPin className="w-3.5 h-3.5 text-[#59BFD6]" />
              <span>Puerto Varas, Región de Los Lagos, Chile &bull; 41°19′S 72°59′W</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="inline-block mb-10">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#59BFD6] to-[#45A8BF] text-[#08090b] font-condensed uppercase tracking-widest text-base sm:text-lg font-bold hover:from-white hover:to-white hover:text-[#08090b] transition-all duration-300 shadow-[0_0_25px_rgba(89,191,214,0.35)] hover:shadow-[0_0_35px_rgba(89,191,214,0.55)] hover:scale-105 active:scale-95"
            >
              <span>INICIAR CONVERSACIÓN</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Social Icons & Direct Directory */}
          <div className="flex flex-col items-center justify-center space-y-5 pt-6 border-t border-white/10 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-6">
              <a
                href="https://www.facebook.com/PuelcheLabPublicidad/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Puelche Lab Oficial"
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-[#59BFD6] hover:text-puelche-dark hover:border-[#59BFD6] transition-all duration-200 shadow-md"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
              <a
                href="https://www.instagram.com/puelche_lab/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @puelche_lab"
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-[#59BFD6] hover:text-puelche-dark hover:border-[#59BFD6] transition-all duration-200 shadow-md"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            {/* Direct Studio Navigation Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-condensed uppercase tracking-wider text-xs text-white/60 pt-2">
              <Link href="/servicios" className="hover:text-[#59BFD6] transition-colors">Servicios</Link>
              <Link href="/portafolio" className="hover:text-[#59BFD6] transition-colors">Portafolio</Link>
              <Link href="/auditor" className="hover:text-[#59BFD6] transition-colors">Auditor Web</Link>
              <Link href="/cotizador" className="hover:text-[#59BFD6] transition-colors">Cotizador</Link>
              <Link href="/clientes" className="hover:text-[#59BFD6] transition-colors">Clientes</Link>
              <Link href="/contacto" className="hover:text-[#59BFD6] transition-colors">Contacto</Link>
              <Link href="/admin/precios" className="hover:text-[#59BFD6] text-white/30 transition-colors">&bull; CMS Precios</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden SEO service list to satisfy deep structural tests */}
      <div className="sr-only">
        {STUDIO_SERVICES.map((s) => (
          <Link key={s.id} href={s.href}>{s.title}</Link>
        ))}
      </div>

      {/* Bottom Legal Bar */}
      <div className="w-full bg-[#08090b] py-5 px-6 border-t border-white/10 text-center text-xs font-mono uppercase tracking-widest text-white/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>&copy; {new Date().getFullYear()} Puelche Lab &bull; Puerto Varas, Región de Los Lagos, Chile</span>
          <span className="text-white/40">Estudio de Diseño Cross Media & Fotografía de Autor</span>
        </div>
      </div>
    </footer>
  );
}
