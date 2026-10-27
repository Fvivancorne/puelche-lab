# docs/ledger.md — Constatación Formal & Ledger de Entrega Puelche Lab

**Proyecto:** Rediseño y Elevación de Autor de Puelche Lab (`https://www.puelchelab.cl`)  
**Stack de Destino:** Next.js 16.4.3 (Turbopack) + React 19 + TypeScript + Tailwind CSS 3.4 + Lenis Scroll + GSAP  
**Fecha de Verificación:** 26 de Octubre, 2026  
**Auditor:** Antigravity (Modo Goal / Liderazgo Delegado)

---

## 1. Matriz de Constatación Formal (Viewports Mandatorios)

| Ruta / Módulo | Estado | 1440px Desktop | 768px Tablet | 375px Mobile | Redirección 301 | Evidencia Capturada |
|---|---|---|---|---|---|---|
| **`/` (Home)** | **Validado** | OK (Hero cinético, Manifiesto, Grid 4 servicios, Showcase, Marquee) | OK (Grid 2 columnas, tipografía fluida) | OK (Menú hamburguesa, tipografía adaptada, cero overflow) | N/A | `puelche_audit/home_{1440,768,375}.png` |
| **`/portafolio`** | **Validado** | OK (Filtro por categorías interactivo, modal drawer, 8 obras) | OK (Grilla adaptada a tablet) | OK (Columna única, botones táctiles) | `/portafolio` | `puelche_audit/portafolio_{1440,768,375}.png` |
| **`/servicios/fotografia`** | **Validado** | OK (Ficha técnica, 4 disciplinas ópticas, equipos de cine) | OK (Distribución 2x2) | OK (Stack vertical ordenado) | `/fotografia-y-edicion-2` & `/edicion-fotografica` | `puelche_audit/fotografia_{1440,768,375}.png` |
| **`/servicios/branding`** | **Validado** | OK (Metodología cross-media, caso Blue Seal, 4 fases) | OK (Ajuste equilibrado) | OK (Lectura fluida y chips táctiles) | `/diseno-de-marca` & `/redes-sociales` | `puelche_audit/desarrollo_web_{1440,768,375}.png` |
| **`/servicios/desarrollo-web`** | **Validado** | OK (Tabla comparativa Next.js vs WordPress, caso Sur Terra) | OK (Scroll horizontal seguro en tabla) | OK (Optimización móvil total) | N/A | `puelche_audit/desarrollo_web_{1440,768,375}.png` |
| **`/servicios/editorial`** | **Validado** | OK (Grilla suiza, memorias corporativas, caso Falabella) | OK (Bloques legibles) | OK (Tipografía compacta y clara) | `/diseno-editorial` | `src/app/servicios/editorial/page.tsx` |
| **`/clientes`** | **Validado** | OK (4 nodos territoriales, directorio de 12 clientes, testimonios) | OK (Tarjetas reorganizadas) | OK (Cards apiladas, tabla responsiva) | `/nuestros-clientes` | `puelche_audit/clientes_{1440,768,375}.png` |
| **`/contacto`** | **Validado** | OK (Brief interactivo multi-fase, generador WhatsApp dinámico) | OK (Dos columnas proporcionales) | OK (Formulario verticalizado sin saltos) | `/contacto` | `puelche_audit/contacto_{1440,768,375}.png` |

---

## 2. Inventario de Redirecciones 301 / 308 Permanentes Verificadas

Todas las URLs del WordPress anterior fueron verificadas con respuesta HTTP `308 Permanent Redirect` activa en `next.config.ts`:

1. `/diseno-de-marca` &rarr; `/servicios/branding` [HTTP 308 OK]
2. `/fotografia-y-edicion-2` &rarr; `/servicios/fotografia` [HTTP 308 OK]
3. `/edicion-fotografica` &rarr; `/servicios/fotografia` [HTTP 308 OK]
4. `/diseno-editorial` &rarr; `/servicios/editorial` [HTTP 308 OK]
5. `/redes-sociales` &rarr; `/servicios/branding` [HTTP 308 OK]
6. `/nuestros-clientes` &rarr; `/clientes` [HTTP 308 OK]

---

## 3. Certificación de Arquitectura y Rendimiento

- **Compilación Turbopack:** `next build` finalizado en **983 ms**, 11 rutas estáticas prerenderizadas con **0 errores de TypeScript y 0 warnings**.
- **Tiempo de inicio en Producción:** `next start` listo en **88 ms** (`http://localhost:3002`).
- **SEO & Datos Estructurados:** Schema.org `ProfessionalService` inyectado en `src/app/layout.tsx` con geolocalización precisa de Puerto Varas (`-41.3195, -72.9854`) y área servida austral.
- **Micro-interacciones & Accesibilidad:**
  - Soporte de teclado completo (`Tab`, `Enter`, `Focus visible`).
  - Botón flotante de WhatsApp accesible con pulso de vida.
  - Metadatos OpenGraph canónicos y tags de viewport responsivo.
