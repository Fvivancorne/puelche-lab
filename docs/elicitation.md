# Elicitación de Requerimientos — Rediseño Estratégico Puelche Lab (Aprobado)

**Proyecto:** REDISEÑO COMPLETO Puelche Lab  
**URL Actual:** `https://www.puelchelab.cl` (WordPress / Elementor)  
**Ubicación:** Puerto Varas, Región de Los Lagos, Chile  
**Fecha de Cierre Gate 1:** 2026-10-26  
**Estatus:** APROBADO (Decisión de Liderazgo Delegado / Modo Experto)

---

## 1. Definición Estratégica del Negocio

### A. Posicionamiento: De Agencia Genérica a Estudio Boutique Cross-Media
* **Identidad:** Estudio de Diseño Cross-Media, Fotografía Profesional de Alta Gama y Desarrollo Web de Autor en Puerto Varas.
* **Diferenciador Radical:** El concepto del *"Viento Puelche"*: una fuerza natural, cálida y limpia que transforma la imagen de marcas patagónicas, inmobiliarias, hoteleras y productivas del sur de Chile.
* **Mercado Objetivo:** Marcas que buscan sofisticación visual, constructoras, hoteles boutique, estudios de arquitectura, industrias agroalimentarias y marcas con raíz territorial en la Región de Los Lagos y la Patagonia.

### B. Arquitectura de Servicios (4 Pilares High-Ticket)
1. **Fotografía & Film Profesional:**
   - Arquitectura, hotelería e interiores de lujo.
   - Fotografía aérea (Drone 4K), procesos productivos e industria agropecuaria.
   - Fotografía gastronómica y de producto.
2. **Identidad de Marca & Branding:**
   - Estrategia de marca, manual de identidad, tipografía y narrativa territorial.
3. **Desarrollo Web & Experiencias Digitales:**
   - Sitios web Next.js rápidos, modernos, nivel boutique internacional.
   - SEO Técnico Local (Puerto Varas / Llanquihue / Puerto Montt).
4. **Diseño Editorial & Publicaciones:**
   - Libros corporativos, memorias integradas, catálogos impresos y digitales.
*(El servicio anterior de "Redes Sociales" se absorbe como entregable de contenido dentro de Branding y Fotografía, eliminando el posicionamiento de bajo margen).*

### C. Embudo de Conversión (Métrica Principal)
* **Conversión Primaria:** Formulario interactivo de brief y cotización calificada en `/contacto`, guiando al prospecto por servicio y tipo de proyecto.
* **Conversión Secundaria Inmediata:** Botón flotante de WhatsApp Business con mensaje pre-rellenado (`"Hola Puelche Lab, me gustaría cotizar un proyecto de [Servicio] en Puerto Varas"`).

---

## 2. Dirección de Arte & Estética Visual

* **Modo Orgánico / Diurno:** En sintonía con la arquitectura del sur y la naturaleza del Lago Llanquihue, el sitio abandona la interfaz genérica de Elementor y adopta una estética editorial boutique:
  - **Fondo:** Off-white orgánico cálido `#F9F9F6` con contrastes en grafito volcánico `#18191B`.
  - **Acento Verde Bosque:** `#2C3A32` (profundidad de los bosques templados del sur).
  - **Acento Viento Puelche:** `#C29B63` / `#E6D5B8` (tonos trigo y madera de alerce).
* **Tipografía:** Fusión de precisión suiza sans-serif (`Inter` / `Plus Jakarta Sans`) con titulares refinados de alta elegancia editorial (`Playfair Display` / `Instrument Serif`).
* **Motion:** Desplazamiento fluido nativo (Lenis), zoom sutil de imágenes en scroll (GSAP ScrollTrigger) y microinteracciones fluidas.

---

## 3. Preservación de SEO y Redirecciones 301
* Todas las URLs indexadas en Google del WordPress anterior (`/diseno-de-marca/`, `/desarrollo-web/`, `/fotografia-y-edicion-2/`, etc.) serán mapeadas con **redirecciones 301 permanentes** en Next.js para transferir el 100% de la autoridad sin enlaces rotos.
