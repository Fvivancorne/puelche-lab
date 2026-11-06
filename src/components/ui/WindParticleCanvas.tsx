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

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const colors = [
      'rgba(89, 191, 214, ',
      'rgba(194, 155, 99, ',
      'rgba(249, 249, 246, ',
    ];
    const mouse = { x: -1000, y: -1000, active: false, prevX: -1000, prevY: -1000 };
    const particles: Particle[] = [];

    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;
    let lastFrameTime = 0;
    let frameId: number | null = null;
    let isVisible = false;
    let pageIsVisible = !document.hidden;
    let reducedMotion = motionQuery.matches;
    let intersectionObserver: IntersectionObserver | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const initializeParticles = () => {
      particles.length = 0;
      const count = reducedMotion ? Math.min(particleCount, 40) : particleCount;

      for (let i = 0; i < count; i++) {
        const baseSpeed = 0.8 + Math.random() * 1.4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: -baseSpeed,
          vy: (Math.random() - 0.5) * 0.4,
          baseVx: -baseSpeed,
          baseVy: (Math.random() - 0.5) * 0.4,
          radius: 1.2 + Math.random() * 2.2,
          alpha: 0.15 + Math.random() * 0.45,
          color,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawFrame = (animate: boolean, delta = 1) => {
      if (width <= 0 || height <= 0) return;

      ctx.clearRect(0, 0, width, height);
      if (animate) time += 0.015 * delta;

      const mouseSpeedX = mouse.active ? mouse.x - mouse.prevX : 0;
      const mouseSpeedY = mouse.active ? mouse.y - mouse.prevY : 0;
      const influenceRadius = 140;
      const influenceRadiusSquared = influenceRadius * influenceRadius;

      for (const particle of particles) {
        if (animate) {
          particle.pulsePhase += 0.02 * delta;
          const undulation = Math.sin(time + particle.pulsePhase) * 0.3;

          if (mouse.active && !reducedMotion) {
            const dx = particle.x - mouse.x;
            const dy = particle.y - mouse.y;
            const distanceSquared = dx * dx + dy * dy;

            if (distanceSquared < influenceRadiusSquared && distanceSquared > 0) {
              const distance = Math.sqrt(distanceSquared);
              const force = (1 - distance / influenceRadius) * 2.5;
              const angle = Math.atan2(dy, dx);
              particle.vx += Math.cos(angle) * force + mouseSpeedX * 0.05;
              particle.vy += Math.sin(angle) * force + mouseSpeedY * 0.05;
            }
          }

          particle.vx += (particle.baseVx - particle.vx) * 0.04 * delta;
          particle.vy += (particle.baseVy + undulation - particle.vy) * 0.04 * delta;
          particle.x += particle.vx * delta;
          particle.y += particle.vy * delta;

          if (particle.x < -10) particle.x = width + 10;
          if (particle.x > width + 10) particle.x = -10;
          if (particle.y < -10) particle.y = height + 10;
          if (particle.y > height + 10) particle.y = -10;
        }

        const currentAlpha = particle.alpha * (0.8 + 0.2 * Math.sin(particle.pulsePhase));
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${currentAlpha})`;
        ctx.fill();

        if (!reducedMotion && Math.abs(particle.vx) > 1.8) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particle.x - particle.vx * 3, particle.y - particle.vy * 3);
          ctx.strokeStyle = `${particle.color}${currentAlpha * 0.4})`;
          ctx.lineWidth = particle.radius * 0.8;
          ctx.stroke();
        }
      }
    };

    const shouldAnimate = () => isVisible && pageIsVisible && !reducedMotion;

    const render = (timestamp: number) => {
      frameId = null;
      if (!shouldAnimate()) return;

      const delta = lastFrameTime
        ? Math.min(2, Math.max(0.25, (timestamp - lastFrameTime) / 16.67))
        : 1;
      lastFrameTime = timestamp;
      drawFrame(true, delta);
      frameId = window.requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (!shouldAnimate() || frameId !== null) return;
      lastFrameTime = 0;
      frameId = window.requestAnimationFrame(render);
    };

    const stopAnimation = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
      lastFrameTime = 0;
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // setTransform reemplaza la transformación anterior; scale() acumulaba DPR en cada resize.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initializeParticles();
      if (reducedMotion) drawFrame(false);
      else startAnimation();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion || !isVisible || !pageIsVisible) return;
      const rect = parent.getBoundingClientRect();
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    };

    const clearPointer = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.prevX = -1000;
      mouse.prevY = -1000;
    };

    const handleMotionPreference = () => {
      reducedMotion = motionQuery.matches;
      initializeParticles();
      clearPointer();
      if (reducedMotion) {
        stopAnimation();
        drawFrame(false);
      } else {
        startAnimation();
      }
    };

    const handlePageVisibility = () => {
      pageIsVisible = !document.hidden;
      if (pageIsVisible) startAnimation();
      else {
        stopAnimation();
        clearPointer();
      }
    };

    const handleResize = () => resize();

    resize();
    parent.addEventListener('pointermove', handlePointerMove, { passive: true });
    parent.addEventListener('pointerleave', clearPointer, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handlePageVisibility);
    motionQuery.addEventListener('change', handleMotionPreference);

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(parent);
    }

    if (typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible) startAnimation();
          else {
            stopAnimation();
            clearPointer();
          }
        },
        { threshold: 0.05 }
      );
      intersectionObserver.observe(canvas);
    } else {
      isVisible = true;
      startAnimation();
    }

    return () => {
      stopAnimation();
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      parent.removeEventListener('pointermove', handlePointerMove);
      parent.removeEventListener('pointerleave', clearPointer);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handlePageVisibility);
      motionQuery.removeEventListener('change', handleMotionPreference);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-testid="wind-particle-canvas"
      className={`absolute inset-0 pointer-events-none z-[1] ${className}`}
    />
  );
}
