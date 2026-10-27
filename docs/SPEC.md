# SPEC.md — Especificación Maestra de Ingeniería: Puelche Lab (v1.0)

**Proyecto:** Puelche Lab — Estudio de Diseño Cross-Media & Fotografía  
**Ubicación:** Puerto Varas, Región de Los Lagos, Chile  
**Estándar:** Master Playbook SDD / Antigravity Studio  
**Fecha:** 2026-10-26  
**Estatus:** APROBADO (Contrato de Construcción)

---

## 1. Visión y Métricas Clave

* **Objetivo Primario:** Transformar la presencia digital de Puelche Lab en una experiencia boutique que compita a nivel Awwwards/Boutique internacional, posicionando al estudio en el segmento High-Ticket de Puerto Varas y la Patagonia.
* **Métrica Principal (Conversión):** Tasa de envío de brief calificado en `/contacto` + CTR en el botón flotante de WhatsApp Business.
* **Lighthouse Target:** $\ge 95$ en Performance móvil, 100 en SEO, 100 en Accesibilidad y 100 en Best Practices.

---

## 2. Arquitectura de Rutas y Navegación

```
/                       ── Home (Hero editorial, Manifiesto, Servicios Core, Portafolio Showcase, Clientes, CTA)
/portafolio             ── Portafolio Interactivo (Filtros: Arquitectura, Industria, Branding, Editorial)
/servicios/fotografia   ── Fotografía de Arquitectura, Interiores, Aérea y Producto
/servicios/branding     ── Identidad Visual, Estrategia de Marca y Cross-Media
/servicios/desarrollo-web ── Sitios Web Boutique, Next.js y Experiencias Digitales
/servicios/editorial    ── Publicaciones, Memorias Corporativas y Libros
/clientes               ── Trayectoria, Empresas atendidas y Testimonios
/contacto               ── Brief de Proyecto Interactivo + WhatsApp Directo
```

---

## 3. Design Tokens (Fidelidad Visual y Paleta Orgánica)

```json
{
  "colors": {
    "background": "#F9F9F6",
    "surface": "#FFFFFF",
    "surfaceSecondary": "#F1F1EB",
    "border": "#E5E5DC",
    "borderSubtle": "#EBEBE5",
    "textPrimary": "#18191B",
    "textSecondary": "#666863",
    "textMuted": "#8E9089",
    "accentPuelche": "#C29B63",
    "accentForest": "#2C3A32",
    "accentForestDark": "#1E2722",
    "accentLight": "#EBE2D3"
  },
  "typography": {
    "fontSans": "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
    "fontSerif": "'Playfair Display', 'Instrument Serif', Georgia, serif",
    "fontMono": "'JetBrains Mono', 'Fira Code', monospace"
  },
  "radii": {
    "card": "1.5rem",
    "button": "9999px",
    "badge": "0.5rem"
  },
  "shadows": {
    "subtle": "0 4px 20px -2px rgba(24, 25, 27, 0.05)",
    "elevated": "0 20px 40px -4px rgba(24, 25, 27, 0.08)"
  }
}
```

---

## 4. Catálogo de Animaciones & Motion Physics (Lenis + GSAP)

1. **Virtual Smooth Scroll (Lenis):**
   - Parámetros: `lerp: 0.09`, `smoothWheel: true`, `wheelMultiplier: 1.0`.
2. **Text Reveal Kinetic Beam (Hero):**
   - CSS variables: `--wipe-lead` y `--wipe-trail` aplicadas a los titulares Display.
3. **Parallax y Zoom de Portafolio:**
   - Imágenes del portafolio con escala suave `scale: 1.05` y `yPercent: -8` sincronizadas con ScrollTrigger.
4. **Header Transparente a Sólido:**
   - Transición de fondo `bg-transparent` a `bg-[#F9F9F6]/90 backdrop-blur-md` tras pasar $80\text{ px}$ de scroll.

---

## 5. SEO y Schema.org Local (Puerto Varas)

Se inyectará JSON-LD estructurado en `app/layout.tsx`:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Puelche Lab",
  "description": "Estudio de diseño cross media, fotografía profesional y desarrollo web en Puerto Varas, Región de Los Lagos.",
  "url": "https://www.puelchelab.cl",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Puerto Varas",
    "addressRegion": "Región de Los Lagos",
    "addressCountry": "CL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-41.3195",
    "longitude": "-72.9854"
  },
  "priceRange": "$$$",
  "telephone": "+56994356789",
  "areaServed": ["Puerto Varas", "Llanquihue", "Frutillar", "Puerto Montt", "Chiloé", "Patagonia"]
}
```

---

## 6. Definition of Done (Criterios de Cierre)

- [ ] Todas las 7 rutas compilan cleanly en Next.js 16 con TypeScript.
- [ ] Mapeo de redirecciones 301 activo para las 10 URLs de WordPress.
- [ ] Diseño responsive validado en **1440 px, 768 px y 375 px**.
- [ ] Formulario de brief funcional con estados de validación y botón de WhatsApp interactivo.
- [ ] Assets reales de clientes (AquaChile, Estancia Rilán, Hotel Costaustralis) integrados.
- [ ] Documento `docs/ledger.md` creado y actualizado.
