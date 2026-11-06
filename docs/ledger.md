# docs/ledger.md — Constatación Formal & Ledger de Entrega Puelche Lab

**Proyecto:** Réplica Fiel & Rediseño de Autor de Puelche Lab (`https://www.puelchelab.cl`)  
**Directorio:** `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab`  
**Stack:** Next.js 16.4.3 (Turbopack) + React 19 + TypeScript + Tailwind CSS 3.4 + Lenis Smooth Scroll  
**Fecha de Certificación:** 27 de Octubre, 2026  
**Auditor:** Antigravity (Modo Goal / Liderazgo Delegado / Teamwork Verification)

---

## 1. Matriz de Constatación Formal (27 Capturas / 9 Rutas / 3 Viewports)

| Ruta / Módulo | Estado | 1440px Desktop | 768px Tablet | 375px Mobile | Activos Reales Utilizados | Evidencia Capturada |
|---|---|---|---|---|---|---|
| **`/` (Home)** | **Validado** | OK (Logo oficial, Hero con fondo Elementor `bg-home-2.jpg`, Manifiesto) | OK (Grid 2 col, tipografía fluida) | OK (Menú hamburguesa, 0 overflow) | `logo-top.png`, `bg-home-2.jpg`, `bg-agencia.jpg` | `puelche_audit/home_{1440,768,375}.png` |
| **`/portafolio`** | **Validado** | OK (Pestañas de filtro dinámicas, modal drawer, 8 obras reales) | OK (Grilla adaptada) | OK (Columna única, botones táctiles) | `bg-portafolios-fotografia-*.jpg` | `puelche_audit/portafolio_{1440,768,375}.png` |
| **`/servicios`** | **Validado** | OK (4 tarjetas de disciplinas con iconografía y alcance) | OK (Grilla 2x2) | OK (Stack vertical ordenado) | `logo-top.png`, Tokens de marca | `puelche_audit/servicios_{1440,768,375}.png` |
| **`/servicios/fotografia`** | **Validado** | OK (Ficha técnica 61MP, tilt-shift, drones DGAC, galería real) | OK (Distribución 2x2) | OK (Lectura fluida y botones) | `bg-portafolios-fotografia-*.jpg` | `puelche_audit/fotografia_{1440,768,375}.png` |
| **`/servicios/branding`** | **Validado** | OK (Metodología cross-media, caso Blue Seal, 4 fases) | OK (Ajuste equilibrado) | OK (Chips táctiles) | `bg-portafolios-fotografia-h-min.jpg` | `puelche_audit/branding_{1440,768,375}.png` |
| **`/servicios/desarrollo-web`** | **Validado** | OK (Tabla comparativa Next.js vs WordPress, caso Sur Terra) | OK (Scroll horizontal seguro) | OK (Optimización móvil) | `bg-fotografia-6-min.jpg` | `puelche_audit/desarrollo_web_{1440,768,375}.png` |
| **`/servicios/editorial`** | **Validado** | OK (Grilla suiza, memorias corporativas, caso Falabella) | OK (Bloques legibles) | OK (Tipografía compacta) | `bg-portafolios-fotografia-d-min.jpg` | `puelche_audit/editorial_{1440,768,375}.png` |
| **`/clientes`** | **Validado** | OK (4 nodos territoriales, directorio de 12 clientes, testimonios) | OK (Tarjetas reorganizadas) | OK (Cards apiladas, tabla) | Cartera real (AquaChile, Rilán, Doosan, etc.) | `puelche_audit/clientes_{1440,768,375}.png` |
| **`/contacto`** | **Validado** | OK (Brief interactivo, WhatsApp dinámico a Paula Valdivieso) | OK (Dos columnas) | OK (Formulario verticalizado) | Datos reales (+56 9 6617 7500) | `puelche_audit/contacto_{1440,768,375}.png` |

---

## 2. Certificación Anti-Stock & Integridad de Marca

- **Auditoría de Código Fuente:** `grep -rn "unsplash" src/` retorna **0 coincidencias**.
- **Activos Oficiales Descargados:** Todos los activos residen en `public/images/real/` y se cargan localmente (sin CDNs externas de stock).
- **Logotipo Oficial:** `Puelche Lab — VIENTO CREATIVO` en Navbar (`logo-top.png`) y Footer (`logo-puelche.png`).
- **Directora Creativa & Contacto:** Paula Valdivieso (`paula.valdivieso@puelchelab.cl`, `+56 9 6617 7500`).
- **Pruebas Automatizadas:** **140 de 140 tests aprobados al 100%** en `tests/e2e/runner.ts` (validado el 5 de noviembre de 2026).
- **Compilación de Producción:** `npm run build` finaliza con exit code 0; Next.js genera 17 rutas, con `/api/contact` dinámica y las demás estáticas.

---

## 3. Optimización de Animaciones y Scroll (5 de noviembre de 2026)

- **Lenis + GSAP:** comparten el ticker de GSAP; Lenis se desactiva con `prefers-reduced-motion` y se destruye de forma simétrica al desmontar.
- **Canvas del viento y preloader:** el RAF se cancela fuera de viewport, con pestaña oculta, al terminar/saltar la intro y en movimiento reducido. El canvas limita DPR a 2 y restablece la transformación con `setTransform` al redimensionar.
- **Crónicas horizontales:** GSAP ScrollTrigger aplica el desplazamiento directamente al track; React sólo recibe cambios discretos de historia, no actualizaciones por cada frame. En movimiento reducido, las historias pasan a una disposición vertical estática.
- **Componentes GSAP:** `ScrollReveal`, `SplitText`, manifiesto, cursor y transición de página usan contextos/media queries con cleanup reversible.
- **Carrusel y comparador:** autoplay pausado fuera de pantalla, con pestaña oculta o movimiento reducido; progreso visual del carrusel actualizado por transform, y comparador limitado a Pointer Events con actualización por frame.
- **Verificación:** `npm run build` OK; `npx tsx tests/e2e/runner.ts` OK (**140/140**); `git diff --check` sin errores. Se realizaron capturas locales de portada y crónicas en escritorio; no se atribuye una puntuación Lighthouse/FPS no medida.
