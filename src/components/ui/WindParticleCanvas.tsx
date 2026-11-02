'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  alpha: number;
  color: string;
  pulsePhase: number;
}

interface WindParticleCanvasProps {
  className?: string;
  particleCount?: number;
}

export function WindParticleCanvas({ className = '', particleCount = 130 }: WindParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; prevX: number; prevY: number }>({
    x: -1000,
    y: -1000,
    active: false,
    prevX: -1000,
    prevY: -1000,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Palette: Patagonian mist cyan and morning alerce warm gold
    const colors = [
      'rgba(89, 191, 214, ', // #59BFD6 cyan
      'rgba(194, 155, 99, ', // #C29B63 warm gold
      'rgba(249, 249, 246, ', // #F9F9F6 off-white
    ];

    const particles: Particle[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      particles.length = 0;
      const count = reducedMotion ? Math.min(particleCount, 40) : particleCount;

      for (let i = 0; i < count; i++) {
        const baseSpeed = 0.8 + Math.random() * 1.4;
        const colorPrefix = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: -baseSpeed, // Puelche blows from East (right) to West (left)
          vy: (Math.random() - 0.5) * 0.4,
          baseVx: -baseSpeed,
          baseVy: (Math.random() - 0.5) * 0.4,
          radius: 1.2 + Math.random() * 2.2,
          alpha: 0.15 + Math.random() * 0.45,
          color: colorPrefix,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    resize();
    initParticles();

    // Mouse & Touch listeners on window / parent
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.prevX = mouseRef.current.x;
        mouseRef.current.prevY = mouseRef.current.y;
        mouseRef.current.x = e.touches[0].clientX - rect.left;
        mouseRef.current.y = e.touches[0].clientY - rect.top;
        mouseRef.current.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', () => {
      resize();
      initParticles();
    });

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // IntersectionObserver to pause loop offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Animation Loop
    let time = 0;
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const mouseSpeedX = mouse.active ? mouse.x - mouse.prevX : 0;
      const mouseSpeedY = mouse.active ? mouse.y - mouse.prevY : 0;
      const influenceRadius = 140;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Atmospheric undulation (sinusoidal breeze)
        p.pulsePhase += 0.02;
        const undulation = Math.sin(time + p.pulsePhase) * 0.3;

        // Interaction with mouse/finger
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < influenceRadius && dist > 0) {
            const force = (1 - dist / influenceRadius) * 2.5;
            const angle = Math.atan2(dy, dx);
            // Repel + swirl in the direction of mouse movement
            p.vx += Math.cos(angle) * force + mouseSpeedX * 0.05;
            p.vy += Math.sin(angle) * force + mouseSpeedY * 0.05;
          }
        }

        // Return smoothly to base laminar Puelche wind velocity
        p.vx += (p.baseVx - p.vx) * 0.04;
        p.vy += (p.baseVy + undulation - p.vy) * 0.04;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Render particle with subtle soft glow
        const currentAlpha = p.alpha * (0.8 + 0.2 * Math.sin(p.pulsePhase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.fill();

        // Atmospheric trailing streak for faster particles
        if (Math.abs(p.vx) > 1.8) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
          ctx.strokeStyle = `${p.color}${currentAlpha * 0.4})`;
          ctx.lineWidth = p.radius * 0.8;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-testid="wind-particle-canvas"
      className={`absolute inset-0 pointer-events-none z-[1] will-change-transform ${className}`}
    />
  );
}
