'use client';

import React from 'react';

/**
 * Grano analógico exclusivo de fotografía.
 * Mantiene la definición vectorial del filtro SVG disponible en el DOM
 * sin cubrir la pantalla con velos oscuros ni degradar la nitidez de la tipografía.
 */
export function FilmGrain() {
  return (
    <svg
      className="hidden pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <filter id="puelche-film-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.75"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </svg>
  );
}

export function PhotoGrainOverlay({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay ${className}`}
      style={{ filter: 'url(#puelche-film-grain)' }}
      aria-hidden="true"
    />
  );
}
