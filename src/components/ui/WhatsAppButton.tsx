'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phoneNumber = '56966177500';
  const message = encodeURIComponent(
    'Hola Puelche Lab, me gustaría cotizar un proyecto de fotografía o diseño en Puerto Varas.'
  );
  // Canonical endpoint: https://wa.me/56966177500
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <aside aria-label="Contacto directo por WhatsApp" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar a Puelche Lab por WhatsApp"
        className="group flex items-center gap-3 px-4 py-3 rounded-full bg-[#18191B] text-[#F9F9F6] border border-[#2A2B2E] shadow-2xl hover:bg-[#2C3A32] hover:scale-105 transition-all duration-300"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C29B63] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C29B63]" />
        </span>
        <MessageCircle className="w-4 h-4 text-[#C29B63]" />
        <span className="font-mono text-xs uppercase tracking-wider hidden sm:inline-block">
          WhatsApp Directo
        </span>
      </a>
    </aside>
  );
}
