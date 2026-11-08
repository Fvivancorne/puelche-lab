'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SplitTextProps {
  text: string;
  className?: string;
  /** Tag to render (default 'h1') */
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  /** Animation: 'scatter' disintegrates on scroll, 'stagger' staggers in on load */
  animation?: 'scatter' | 'stagger';
}

export function SplitText({
  text,
  className = '',
  as: Tag = 'h1',
  animation = 'scatter',
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const chars = container.querySelectorAll('.split-char');
      if (!chars.length) return;

      const context = gsap.context(() => {
        if (animation === 'scatter') {
          const triggerEl = container.closest('section') || container;
          gsap.set(chars, { opacity: 1, y: 0, x: 0, rotateZ: 0, filter: 'blur(0px)' });

          chars.forEach((char, i) => {
            // Dispersión cinética del viento Puelche: cada letra toma su propio vuelo al descender el scroll
            const dir = (i % 2 === 0 ? 1 : -1);
            const driftX = dir * (25 + (i * 7)) + ((i * 13) % 40) - 20;
            const liftY = -90 - (i * 14) - ((i * 19) % 60);
            const tilt = dir * (6 + ((i * 4) % 18));
            const blurAmt = 3 + (i % 4);

            gsap.to(char, {
              y: liftY,
              x: driftX,
              rotation: tilt,
              opacity: 0,
              filter: `blur(${blurAmt}px)`,
              ease: 'power1.inOut',
              scrollTrigger: {
                trigger: triggerEl,
                start: 'top top',
                end: 'bottom 25%',
                scrub: 0.8,
              },
            });
          });
        } else {
          gsap.set(chars, { opacity: 0, y: 50 });
          gsap.to(chars, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: 'power3.out',
            delay: 2.6,
          });
        }
      }, container);

      return () => context.revert();
    });

    return () => media.revert();
  }, [animation, text]);

  const words = text.split(' ');

  return (
    <div ref={containerRef} className="inline-block" aria-label={text}>
      <Tag className={className}>
        {words.map((word, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.split('').map((char, ci) => (
              <span
                key={`${wi}-${ci}`}
                className="split-char inline-block"
                style={{ perspective: '600px' }}
                aria-hidden="true"
              >
                {char}
              </span>
            ))}
            {wi < words.length - 1 && (
              <span key={`space-${wi}`} className="split-char inline-block" aria-hidden="true">
                &nbsp;
              </span>
            )}
          </span>
        ))}
      </Tag>
    </div>
  );
}
