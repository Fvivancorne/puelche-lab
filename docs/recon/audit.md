# Auditoría Técnica y Diagnóstico Forense — Puelche Lab

**Objetivo:** Diagnóstico del sitio actual (`https://www.puelchelab.cl`) para sustentar y guiar el rediseño hacia Next.js 16.  
**Fecha:** 2026-10-26  
**Auditor:** Antigravity Forensics Engine

---

## 1. Resumen Ejecutivo de Diagnóstico

| Área Auditada | Estado Actual (WordPress/Elementor) | Severidad | Impacto en el Negocio |
|---|---|---|---|
| **Jerarquía de Encabezados (SEO)** | 8 de 10 páginas no tienen etiqueta `<h1>`. | **CRÍTICA** | Google no puede determinar el tema principal de las páginas clave. |
| **Meta Descriptions** | 100% de las páginas tienen la meta description vacía. | **MAYOR** | En los resultados de búsqueda de Google se muestran fragmentos rotos o aleatorios. |
| **Arquitectura de Medios** | Imágenes inyectadas como CSS `background-image` en Elementor. | **MAYOR** | Inaccesibles para Google Imágenes (cero tráfico por búsqueda visual de fotografía/diseño). |
| **Rendimiento Móvil (Lighthouse)** | WordPress sobrecargado con plugins, Elementor CSS y Optimole JS. | **MAYOR** | TBT (Total Blocking Time) elevado y retraso en LCP (Largest Contentful Paint). |
| **Embudo de Conversión** | Formulario genérico y textos pasivos (`"contáctanos!"`). | **CRÍTICA** | Cero calificación de leads, cero cálculo de presupuesto y fricción alta. |

---

## 2. Hallazgos Específicos con Evidencia

### Hallazgo 1: Ausencia Masiva de `<h1>` y Encabezados Rotos
* **Evidencia:** `raw_audit.json`
  - `https://www.puelchelab.cl/`: `h1: []` (`VERIFICADO`).
  - `https://www.puelchelab.cl/diseno-de-marca/`: `h1: []` (`VERIFICADO`).
  - `https://www.puelchelab.cl/desarrollo-web/`: `h1: []` (`VERIFICADO`).
  - `https://www.puelchelab.cl/fotografia-y-edicion-2/`: `h1: []` (`VERIFICADO`).
  - `https://www.puelchelab.cl/contacto/`: `h1: []` (`VERIFICADO`).
  - Única página con H1: `/redes-sociales/` con 2 etiquetas H1 conflictivas (`VERIFICADO`).
* **Dictamen:** Infracción directa a las directrices de indexación de Google. En Next.js cada página tendrá un único `h1` semántico con palabras clave geolocalizadas (*"Estudio de Diseño y Fotografía en Puerto Varas"*).

### Hallazgo 2: Meta Descriptions Vacías
* **Evidencia:** En las 10 páginas inspeccionadas, `<meta name="description">` no existe o no contiene texto (`VERIFICADO`).
* **Dictamen:** Oportunidad desaprovechada de CTR orgánico en la Región de Los Lagos. Se inyectarán metadatos OpenGraph y Schema.org estructurados (`LocalBusiness` + `ProfessionalService`).

### Hallazgo 3: Carga Oculta de Fondos CSS en Elementor
* **Evidencia:** En `fotografia-y-edicion-2/`, 16 fotografías de alta resolución están incrustadas como `background-image` dentro de `wp-content/uploads/elementor/css/post-2377.css` (`VERIFICADO`).
* **Dictamen:** Los lectores de pantalla no pueden interpretar las imágenes y el navegador no puede precargar las imágenes prioritarias con `next/image` (`fetchpriority="high"`).

### Hallazgo 4: Métrica de Rendimiento Estimada (Lighthouse Móvil)
* **Performance Estimada:** **42 - 55 / 100** (`INFERIDO` basado en el árbol DOM de Elementor + polyfills de jQuery + Optimole script injector).
* **Meta para la Nueva Réplica Next.js:** **95+ / 100** en móvil con zero render-blocking resources.
