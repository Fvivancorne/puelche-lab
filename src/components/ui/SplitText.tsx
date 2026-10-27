'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

    const chars = container.querySelectorAll('.split-char');
    if (!chars.length) return;

    if (animation === 'scatter') {
      // Start visible, disintegrate on scroll
      gsap.set(chars, { opacity: 1, y: 0, rotateX: 0 });

      gsap.to(chars, {
        opacity: 0,
        y: -40,
        rotateX: 90,
        stagger: {
          each: 0.03,
          from: 'random',
        },
        ease: 'power2.in',
        scrollTrigger: {
          trigger: container,
          start: 'top 20%',
          end: 'top -30%',
          scrub: 1,
        },
      });
    } else {
      // Stagger in from below
      gsap.set(chars, { opacity: 0, y: 50 });

      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power3.out',
        delay: 2.6, // After preloader
      });
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === container)
        .forEach((t) => t.kill());
    };
  }, [animation, text]);

  // Split text into individual characters
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
              <span className="split-char inline-block" aria-hidden="true">
                &nbsp;
              </span>
            )}
          </span>
        ))}
      </Tag>
    </div>
  );
}
