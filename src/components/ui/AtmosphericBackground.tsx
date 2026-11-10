'use client';

import React, { useEffect, useRef } from 'react';

interface AtmosphericBackgroundProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'vibrant';
  showParticles?: boolean;
}

export function AtmosphericBackground({
  className = '',
  intensity = 'medium',
  showParticles = true,
}: AtmosphericBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionQuery.matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frameId: number | null = null;
    let time = 0;

    // Mouse tracking for orbs (normalized 0..1)
    const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };

    // Real-time mouse tracking for particle wind vortex (actual pixels)
    const mousePixel = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      speedX: 0,
      speedY: 0,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;

        if (mousePixel.prevX !== -1000) {
          mousePixel.speedX = px - mousePixel.prevX;
          mousePixel.speedY = py - mousePixel.prevY;
        }
        mousePixel.prevX = px;
        mousePixel.prevY = py;
        mousePixel.x = px;
        mousePixel.y = py;
        mousePixel.active = true;

        mouse.targetX = px / rect.width;
        mouse.targetY = py / rect.height;
      }
    };

    const handleMouseLeave = () => {
      mousePixel.active = false;
      mousePixel.x = -1000;
      mousePixel.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Floating micro-particles (Patagonian mist & stardust reacting to wind & cursor)
    const particleCount = showParticles ? 80 : 0;
    const particles = Array.from({ length: particleCount }, () => {
      const baseVx = -(0.4 + Math.random() * 0.8); // Gentle leftward drift (Viento Puelche)
      const baseVy = (Math.random() - 0.5) * 0.3;
      return {
        x: Math.random() * 1920,
        y: Math.random() * 1080,
        vx: baseVx,
        vy: baseVy,
        baseVx,
        baseVy,
        radius: 1.1 + Math.random() * 2.2,
        baseAlpha: 0.16 + Math.random() * 0.45,
        pulse: Math.random() * Math.PI * 2,
        color: Math.random() > 0.35 ? '89, 191, 214' : '194, 155, 99', // Cyan or Ochre
      };
    });

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-scatter any particles outside bounds
      for (const p of particles) {
        if (p.x > width) p.x = Math.random() * width;
        if (p.y > height) p.y = Math.random() * height;
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Alpha multiplier based on intensity prop
    const alphaMult = intensity === 'vibrant' ? 1.4 : intensity === 'subtle' ? 0.7 : 1.0;

    const render = () => {
      time += reducedMotion ? 0.002 : 0.008;

      // Soft mouse lerp for ambient auroras
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Deep organic atmospheric base gradient (Rich Alpine Slate)
      const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
      baseGrad.addColorStop(0, '#131519');
      baseGrad.addColorStop(0.5, '#16191f');
      baseGrad.addColorStop(1, '#111317');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // ── ORB 1: CYAN AUSTRAL (Viento Puelche) ──
      const orb1X = width * (0.35 + Math.sin(time * 0.6) * 0.18 + (mouse.x - 0.5) * 0.12);
      const orb1Y = height * (0.3 + Math.cos(time * 0.5) * 0.14 + (mouse.y - 0.5) * 0.1);
      const orb1R = Math.max(width, height) * 0.55;
      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, orb1R);
      grad1.addColorStop(0, `rgba(89, 191, 214, ${0.14 * alphaMult})`);
      grad1.addColorStop(0.45, `rgba(45, 120, 150, ${0.06 * alphaMult})`);
      grad1.addColorStop(1, 'rgba(89, 191, 214, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // ── ORB 2: OCRE PATAGÓNICO (Luz de atardecer en los volcanes) ──
      const orb2X = width * (0.7 + Math.cos(time * 0.45) * 0.2 - (mouse.x - 0.5) * 0.1);
      const orb2Y = height * (0.65 + Math.sin(time * 0.55) * 0.16 - (mouse.y - 0.5) * 0.08);
      const orb2R = Math.max(width, height) * 0.5;
      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, orb2R);
      grad2.addColorStop(0, `rgba(194, 155, 99, ${0.11 * alphaMult})`);
      grad2.addColorStop(0.4, `rgba(160, 110, 60, ${0.04 * alphaMult})`);
      grad2.addColorStop(1, 'rgba(194, 155, 99, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // ── ORB 3: AZUL PROFUNDO LAGO LLANQUIHUE (Centro gravitacional) ──
      const orb3X = width * (0.5 + Math.sin(time * 0.35) * 0.15);
      const orb3Y = height * (0.8 + Math.cos(time * 0.4) * 0.12);
      const orb3R = Math.max(width, height) * 0.65;
      const grad3 = ctx.createRadialGradient(orb3X, orb3Y, 0, orb3X, orb3Y, orb3R);
      grad3.addColorStop(0, `rgba(32, 65, 95, ${0.16 * alphaMult})`);
      grad3.addColorStop(0.6, `rgba(18, 30, 45, ${0.05 * alphaMult})`);
      grad3.addColorStop(1, 'rgba(15, 25, 38, 0)');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);

      // ── PARTICULAS FLOTANTES REACTIVAS AL VIENTO Y AL CURSOR ──
      if (showParticles && width > 0 && height > 0) {
        const influenceRadius = 170;
        const influenceRadiusSq = influenceRadius * influenceRadius;

        for (const p of particles) {
          if (!reducedMotion) {
            p.pulse += 0.025;

            // Cursor wind vortex & aerodynamic repulsion
            if (mousePixel.active) {
              const dx = p.x - mousePixel.x;
              const dy = p.y - mousePixel.y;
              const distSq = dx * dx + dy * dy;

              if (distSq < influenceRadiusSq && distSq > 0) {
                const dist = Math.sqrt(distSq);
                const force = (1 - dist / influenceRadius) * 2.8;
                const angle = Math.atan2(dy, dx);

                // Repulsive push away from cursor
                p.vx += Math.cos(angle) * force;
                p.vy += Math.sin(angle) * force;

                // Swirling vortex (tangential eddy around cursor)
                const tangAngle = angle + Math.PI / 2;
                p.vx += Math.cos(tangAngle) * (force * 0.85);
                p.vy += Math.sin(tangAngle) * (force * 0.85);

                // Mouse momentum drag
                p.vx += mousePixel.speedX * 0.045;
                p.vy += mousePixel.speedY * 0.045;
              }
            }

            // Natural Puelche wind velocity recovery with gentle undulation
            const undulation = Math.sin(time * 1.5 + p.pulse) * 0.25;
            p.vx += (p.baseVx - p.vx) * 0.04;
            p.vy += (p.baseVy + undulation - p.vy) * 0.04;

            p.x += p.vx;
            p.y += p.vy;

            // Wrap around edges seamlessly
            if (p.x < -20) p.x = width + 20;
            if (p.x > width + 20) p.x = -20;
            if (p.y < -20) p.y = height + 20;
            if (p.y > height + 20) p.y = -20;
          }

          const alpha = p.baseAlpha * (0.7 + Math.sin(p.pulse) * 0.3) * alphaMult;
          const currentRadius = p.radius * (1 + (Math.abs(p.vx) > 1.8 ? 0.35 : 0));

          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
          ctx.fill();

          // Subtle wind streak tail when agitated by cursor movement
          if (!reducedMotion && Math.hypot(p.vx, p.vy) > 1.8) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - p.vx * 3.5, p.y - p.vy * 3.5);
            ctx.strokeStyle = `rgba(${p.color}, ${alpha * 0.4})`;
            ctx.lineWidth = currentRadius * 0.7;
            ctx.stroke();
          }
        }

        // Decay mouse speed over frames
        mousePixel.speedX *= 0.85;
        mousePixel.speedY *= 0.85;
      }

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
    };
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      motionQuery.removeEventListener('change', handleMotionChange);
      resizeObserver.disconnect();
    };
  }, [intensity, showParticles]);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block will-change-transform opacity-95"
      />
      {/* Subtle organic vignetting overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(13,15,18,0.6)_100%)] pointer-events-none" />
      {/* Micro film grain for analog studio prestige */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
