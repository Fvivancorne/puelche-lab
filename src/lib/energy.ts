/**
 * Energía ambiental compartida: una sola "ráfaga" (0 a 1) que crece con el scroll y el
 * movimiento del cursor y se calma sola. Todos los efectos continuos (niebla, sonido,
 * transiciones) la leen para moverse con la misma fuerza poética.
 */
export type WindState = {
  gust: number;
  mouse: { x: number; y: number; sx: number; sy: number };
};

export const energy: WindState = {
  gust: 0,
  mouse: { x: 0.5, y: 0.5, sx: 0.5, sy: 0.5 },
};

let target = 0;
let started = false;

export function startEnergy() {
  if (started || typeof window === 'undefined') return;
  started = true;
  (window as any).__puelche_energy = energy;

  let lastX: number | null = null;
  let lastY: number | null = null;
  window.addEventListener(
    'pointermove',
    (e) => {
      const nx = e.clientX / window.innerWidth;
      const ny = e.clientY / window.innerHeight;
      if (lastX !== null && lastY !== null) {
        target = Math.min(1, target + Math.hypot(nx - lastX, ny - lastY) * 2.2);
      }
      lastX = nx;
      lastY = ny;
      energy.mouse.x = nx;
      energy.mouse.y = ny;
    },
    { passive: true }
  );

  let lastScroll = window.scrollY;
  window.addEventListener(
    'scroll',
    () => {
      target = Math.min(1, target + Math.abs(window.scrollY - lastScroll) * 0.004);
      lastScroll = window.scrollY;
    },
    { passive: true }
  );

  const tick = () => {
    target *= 0.94;
    energy.gust += (target - energy.gust) * 0.08;
    energy.mouse.sx += (energy.mouse.x - energy.mouse.sx) * 0.06;
    energy.mouse.sy += (energy.mouse.y - energy.mouse.sy) * 0.06;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
