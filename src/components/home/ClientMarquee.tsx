'use client';

import React from 'react';
import Image from 'next/image';

// Generate the list of 20 client logo filenames
const LOGOS = Array.from({ length: 20 }, (_, i) => ({
  src: `/images/real/clients/cliente${i + 1}-1.png`,
  alt: `Cliente ${i + 1}`,
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
        className="flex items-center gap-12 md:gap-16 w-max"
        style={{
          animation: `${direction === 'left' ? 'marquee-left' : 'marquee-right'} ${speed}s linear infinite`,
        }}
      >
        {tripled.map((logo, idx) => (
          <div
            key={`${logo.src}-${idx}`}
            className="shrink-0 w-28 sm:w-32 md:w-36 h-16 sm:h-20 relative flex items-center justify-center opacity-50 hover:opacity-100 hover:scale-110 transition-all duration-300 grayscale hover:grayscale-0"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={144}
              height={80}
              className="object-contain w-full h-full brightness-200 invert"
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
          +50 Clientes en la Patagonia
        </h2>
      </div>

      {/* Double Marquee — opposite directions */}
      <MarqueeRow logos={ROW_1} direction="left" speed={45} />
      <MarqueeRow logos={ROW_2} direction="right" speed={50} />

      {/* Gradient fades on edges */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-puelche-dark to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-puelche-dark to-transparent pointer-events-none z-10" />
    </section>
  );
}
