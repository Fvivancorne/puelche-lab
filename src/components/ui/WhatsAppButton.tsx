'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const whatsappUrl = 'https://wa.me/56966177500?text=' + encodeURIComponent(
    'Hola Paula y equipo Puelche Lab, me gustaría cotizar un proyecto de fotografía o diseño en Puerto Varas.'
  );

  return (
    <aside aria-label="Contacto directo por WhatsApp" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar a Puelche Lab por WhatsApp"
        className="group flex items-center gap-3 px-4 py-3 rounded-full bg-puelche-slate text-white border border-white/20 shadow-2xl hover:bg-puelche-cyan hover:text-white hover:scale-105 transition-all duration-300"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-puelche-cyan opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-puelche-cyan" />
        </span>
        <MessageCircle className="w-5 h-5 text-puelche-cyan group-hover:text-white transition-colors" />
        <span className="font-condensed text-xs uppercase tracking-widest hidden sm:inline-block font-bold">
          CONVERSEMOS
        </span>
      </a>
    </aside>
  );
}
