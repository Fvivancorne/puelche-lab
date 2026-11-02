# docs/SPEC.md — Especificación Maestra de Ingeniería: Puelche Lab (v2.0)
## Antigravity 2.0 · Spec-Driven Development · Nivel Awwwards · SEO/GEO Multi-Motor · Capa Jev

> **Estatus:** `ACTIVE` (Aprobado y Desplegado en Producción) | **Versión:** `2.0.0`  
> **Estándar:** AI Engineer Web Playbook & Master Playbook SDD / Antigravity Studio  
> **Dominio Canónico:** `https://www.puelchelab.cl` | **Producción Vercel Edge:** `https://puelche-lab.vercel.app`  
> **Ubicación Física:** Puerto Varas, Región de Los Lagos, Patagonia, Chile  

---

## 0. Metadatos del Proyecto
```yaml
spec_version: "2.0.0"
status: active
project_name: "Puelche Lab"
type: "website"
industry: "boutique"
audience_type: "b2b"
market: "es-CL"
canonical_domain: "https://www.puelchelab.cl"
has_client_portal: false
edge_runtime: "Vercel Edge Network"
image_compression: "AVIF + WebP (Zero-Unsplash Asset Library)"
test_contracts_count: 128
```

---

## 1. Propósito, Posicionamiento y Métrica OMTM

### 1.1 Objetivo Principal
Posicionar a **Puelche Lab** como el estudio líder de diseño cross-media, fotografía de autor y plataformas digitales en Puerto Varas y la Patagonia chilena, compitiendo con estándares de dirección de arte nivel Awwwards y atrayendo clientes corporativos y de hospitalidad high-ticket (hoteles boutique, industrias acuícolas, marcas territoriales y cumbres de innovación).

### 1.2 OMTM (One Metric That Matters)
| Métrica | Definición Exacta | Meta Operativa | Herramienta de Medición |
| :--- | :--- | :--- | :--- |
| **Tasa de Calificación y Contacto** | Leads que completan el brief en `/contacto` + clics en WhatsApp directo | $\ge 5.2\%$ de las sesiones únicas | Capa Jev `/api/contact` + Webhook / WhatsApp |
| **Rendimiento Edge** | Tiempo de carga de activos fotográficos en móvil | $< 1.2\text{ s}$ (AVIF $\le 55\text{ KB}$) | Vercel Edge Optimization + Lighthouse |

---

## 2. Mapa de Rutas y Arquitectura de Contenidos

| Ruta | Propósito | H1 Principal | CTA Primario |
| :--- | :--- | :--- | :--- |
| `/` | Portada institucional, manifiesto del viento y autoridad | *Puelche Lab: Estudio de Diseño Cross Media y Fotografía* | Explorar Obras / Cotizar |
| `/portafolio` | Archivo interactivo de expediciones y obras con modal multi-pieza | *PORTAFOLIO — Obras que narran el sur* | Ver Obras / Cotizar Similar |
| `/servicios` | Resumen de los 5 pilares creativos y alcance territorial | *Servicios de Autor — Viento Creativo en la Patagonia* | Cotizar Proyecto |
| `/servicios/fotografia` | Especialidad insigne: hospitalidad, faenas marítimas y dron 4K | *Fotografía Profesional & Film en la Patagonia* | Cotizar Expedición |
| `/servicios/branding` | Estrategia de marca, manual de normas y diseño de personaje | *Diseño de Marca & Identidad Cross-Media* | Cotizar Branding |
| `/servicios/editorial` | Memorias corporativas, libros de autor y pre-prensa fine-art | *Diseño Editorial & Publicaciones de Colección* | Cotizar Publicación |
| `/servicios/edicion-fotografica` | Sala de magia digital, balance cromático y retoque industrial | *Edición Fotográfica & Postproducción Digital* | Cotizar Retoque |
| `/servicios/desarrollo-web` | Sitios web artesanales en Next.js sin plantillas genéricas | *Desarrollo Web & Experiencias Digitales* | Cotizar Plataforma |
| `/servicios/redes-sociales` | Estrategia visual y curaduría editorial para Instagram | *Gestión Editorial de Redes & Storytelling* | Cotizar Redes |
| `/clientes` | Directorio verificable de empresas atendidas y testimonios | *Trayectoria Territorial & Prueba Social* | Iniciar Alianza |
| `/contacto` | Embudo de 4 fases (servicios, presupuesto, región, contacto) | *Hablemos de tu Proyecto en el Sur* | Enviar Brief a WhatsApp |

---

## 3. Design Tokens (Fidelidad Visual Awwwards)

```yaml
colors:
  bg_dark: "#0c0d10"
  bg_surface: "#1D2024"
  bg_card: "#2B2D31"
  cyan_accent: "#59BFD6"
  slate_accent: "#3B3D42"
  white_pure: "#FFFFFF"
  border_subtle: "rgba(255, 255, 255, 0.10)"
  border_focus: "rgba(89, 191, 214, 0.60)"

fonts:
  sans: "Plus Jakarta Sans, sans-serif"
  condensed: "Oswald, sans-serif"
  mono: "JetBrains Mono, monospace"

cinematics:
  smooth_scroll: "Lenis (lerp 0.08, smoothWheel true)"
  cursor: "Awwwards interactive magnetic cursor (pointer tracking)"
  film_grain: "Canvas-based dynamic analog film grain"
  framing: "Studio stage with ambient blur (blur-3xl opacity-25 scale-125) + object-contain"
```

---

## 4. Biblioteca de Activos Auténticos (Zero-Unsplash Invariant)

1. **Catálogo de Imágenes Genuinas**:
   - **744 fotografías de archivo histórico** indexadas con Apple Vision OCR en `public/images/real/facebook/gallery/`.
   - **10 álbumes temáticos completos** descargados directamente de CDNs de Facebook en `public/images/real/facebook/albums/`:
     - `turistour/` (115 fotos de cruces andinos y lagos)
     - `carnaval_del_sur/` (85 fotos de arte escénico y cerro Philippi)
     - `pillan_aguas_azules/` (26 fotos de obra editorial fine-art)
     - `polo_sur/` (31 fotos de deporte ecuestre)
     - `branding/` (23 fotos de identidades australes)
     - `post_produccion/` (51 fotos de retoque técnico)
     - `diseno_editorial/` (58 fotos de pliegos y catálogos)
     - `art_and_deco/` (20 fotos de interiorismo)
     - `alimentos/` (9 fotos de gastronomía)
     - `fotografia_producto/` (3 fotos de estudio)
   - Casos insignes en alta resolución: Hotel Boutique Arrebol (4 piezas sin artefactos), El Reparabrisas (piezas originales sin cortes), Summit Transforma 2026, Nazca Robótica Submarina y CoHosting Chile.

---

## 5. Capa Jev Determinista de Validación de Contacto (`src/contracts/`)

* **Contrato Zod (`ContactBriefSchema`)**:
  - `name`: String [2, 100] caracteres.
  - `phone`: String [8, 25] caracteres.
  - `email`: Formato email válido o vacío.
  - `services`: Array de servicios solicitados.
  - `budget`: Selección entre los 4 rangos de inversión.
  - `region`: Ubicación territorial en el sur de Chile.
* **Route Handler (`/api/contact`)**:
  - Tiempo de ejecución: $< 5\text{ ms}$.
  - Valida el payload de entrada contra `ContactBriefSchema`.
  - Construye deterministamente el enlace con formato WhatsApp oficial (`https://wa.me/56966177500?text=...`).

---

## 6. Infraestructura de Rastreo, SEO y GEO Multi-Motor

1. **Rastreo e Indexación (`sitemap.ts` y `robots.ts`)**:
   - `/sitemap.xml` dinámico con prioridades ponderadas para las 11 rutas públicas.
   - `/robots.txt` autorizando explícitamente a Googlebot, Bingbot, GPTBot, PerplexityBot, ClaudeBot y Applebot.
2. **Entidades Canónicas Wikidata/Wikipedia (`layout.tsx`)**:
   - Mapeo en `about` de: Puerto Varas (`Q1012921`), Región de Los Lagos (`Q2170`), Patagonia (`Q1507`), Chiloé (`Q193630`) y Lago Llanquihue (`Q154432`).
3. **OpenGraph & Twitter Card Dinámico (`opengraph-image.tsx`)**:
   - Renderizado dinámico en Vercel Edge ($1200\times 630\text{ px}$).
   - Safe-zone 1:1 central para WhatsApp móvil y safe-zone 1.91:1 para LinkedIn y X.
4. **Marcado Estructurado por Página**:
   - Root: `ProfessionalService` con GPS, catálogo de ofertas y datos de fundadora.
   - Portafolio: `CollectionPage` con catálogo `ItemList` de `CreativeWork`.

---

## 7. Requisitos No Funcionales (NFRs) y Pruebas E2E

* **NFR-01 (Anti-Stock Compliance):** 0 referencias a Unsplash en código o metadatos.
* **NFR-02 (Rendimiento Edge):** Compresión automática a AVIF/WebP en Vercel Edge.
* **NFR-03 (Anti-Recortes):** Todas las piezas de arte se muestran completas en marcos de estudio con desenfoque ambiental.
* **NFR-04 (Suite de Pruebas E2E):** Suite automatizada de pruebas de caja opaca (`tests/e2e/runner.ts`) con 100% de éxito.
