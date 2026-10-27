'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-puelche-cyan text-white relative overflow-hidden">
      {/* Framed Geometric Container matching the real Puelche Lab signature section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="border border-white/60 p-8 sm:p-12 md:p-16 text-center relative">
          {/* Subtle Corner Accents */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/80" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/80" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/80" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/80" />

          {/* Heading */}
          <h2 className="font-condensed text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider uppercase text-white mb-6">
            CONTACTANOS
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-white/95 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Lo que necesites saber, lo que necesites cotizar, lo que necesites hacer,
            <span className="block font-semibold">contáctanos!</span>
          </p>

          {/* Action Button */}
          <div className="inline-block mb-12">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-10 py-3.5 border-2 border-white text-white font-condensed uppercase tracking-widest text-lg font-bold hover:bg-white hover:text-puelche-cyan transition-all duration-300 shadow-md hover:scale-105"
            >
              <span>CONTACTO</span>
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center space-x-6 pt-4 border-t border-white/30 max-w-xs mx-auto">
            <a
              href="https://www.facebook.com/puelchelab"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Puelche Lab"
              className="w-10 h-10 rounded-full border border-white/70 flex items-center justify-center text-white hover:bg-white hover:text-puelche-cyan transition-all duration-200"
            >
              <Facebook className="w-5 h-5 fill-current" />
            </a>
            <a
              href="https://www.instagram.com/puelchelab"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Puelche Lab"
              className="w-10 h-10 rounded-full border border-white/70 flex items-center justify-center text-white hover:bg-white hover:text-puelche-cyan transition-all duration-200"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="w-full bg-[#44A8BE] py-4 px-4 text-center text-xs font-condensed uppercase tracking-widest text-white/90">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Puelche Lab &bull; Puerto Varas, Región de Los Lagos</span>
          <span>Estudio de Diseño Cross Media y Fotografía</span>
        </div>
      </div>
    </footer>
  );
}
