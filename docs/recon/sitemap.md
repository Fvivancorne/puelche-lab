# Mapa del Sitio (Sitemap) y Metadata — Puelche Lab

**URL Base:** `https://www.puelchelab.cl`  
**Tecnología Actual:** WordPress 6.x + Elementor  
**Fecha de Extracción:** 2026-10-26  
**Auditoría:** REA / Headless Discovery

---

## 1. Inventario de URLs Indexadas

| URL Actual | Título Actual (`<title>`) | Encabezado Principal (`<h1>`) | Meta Description Actual | Estado de Migración |
|---|---|---|---|---|
| `/` | Puelche Lab – Una agencia digital de Puerto Varas. | *Vacío (Sin H1)* ⚠️ | *Vacío* ⚠️ | Migrar a Nueva Home Next.js |
| `/diseno-de-marca/` | Diseño de Marca – Puelche Lab | *Vacío (Sin H1)* ⚠️ | *Vacío* ⚠️ | Redirección 301 $\rightarrow$ `/servicios/branding` |
| `/desarrollo-web/` | Desarrollo Web – Puelche Lab | *Vacío (Sin H1)* ⚠️ | *Vacío* ⚠️ | Redirección 301 $\rightarrow$ `/servicios/desarrollo-web` |
| `/fotografia-y-edicion-2/` | Fotografía – Puelche Lab | *Vacío (Sin H1)* ⚠️ | *Vacío* ⚠️ | Redirección 301 $\rightarrow$ `/servicios/fotografia` |
| `/edicion-fotografica/` | Edición Fotográfica – Puelche Lab | *Vacío (Sin H1)* ⚠️ | *Vacío* ⚠️ | Redirección 301 $\rightarrow$ `/servicios/fotografia` |
| `/diseno-editorial/` | Diseño Editorial – Puelche Lab | *Vacío (Sin H1)* ⚠️ | *Vacío* ⚠️ | Redirección 301 $\rightarrow$ `/servicios/editorial` |
| `/redes-sociales/` | Redes Sociales – Puelche Lab | `REDES SOCIALES` *(Doble H1)* ⚠️ | *Vacío* ⚠️ | Redirección 301 $\rightarrow$ `/servicios/branding` |
| `/portafolio/` | Portafolio – Puelche Lab | `PORTAFOLIO` | *Vacío* ⚠️ | Migrar a `/portafolio` con filtros interactivos |
| `/nuestros-clientes/` | Clientes – Puelche Lab | *Vacío (Sin H1)* ⚠️ | *Vacío* ⚠️ | Migrar a `/clientes` |
| `/contacto/` | Contacto – Puelche Lab | *Vacío (Sin H1)* ⚠️ | *Vacío* ⚠️ | Migrar a `/contacto` con Brief Interactivo |

---

## 2. Mapa Canónico de Redirecciones 301 (Next.js)

Para garantizar cero pérdidas de tráfico orgánico y cero errores 404 en Google Search Console:

```typescript
// next.config.ts (Redirecciones 301 Permanentes)
module.exports = {
  async redirects() {
    return [
      { source: '/diseno-de-marca', destination: '/servicios/branding', permanent: true },
      { source: '/diseno-de-marca/', destination: '/servicios/branding', permanent: true },
      { source: '/fotografia-y-edicion-2', destination: '/servicios/fotografia', permanent: true },
      { source: '/fotografia-y-edicion-2/', destination: '/servicios/fotografia', permanent: true },
      { source: '/edicion-fotografica', destination: '/servicios/fotografia', permanent: true },
      { source: '/edicion-fotografica/', destination: '/servicios/fotografia', permanent: true },
      { source: '/diseno-editorial', destination: '/servicios/editorial', permanent: true },
      { source: '/diseno-editorial/', destination: '/servicios/editorial', permanent: true },
      { source: '/redes-sociales', destination: '/servicios/branding', permanent: true },
      { source: '/redes-sociales/', destination: '/servicios/branding', permanent: true },
      { source: '/nuestros-clientes', destination: '/clientes', permanent: true },
      { source: '/nuestros-clientes/', destination: '/clientes', permanent: true },
    ];
  },
};
```
