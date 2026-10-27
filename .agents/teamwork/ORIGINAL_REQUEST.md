# Original User Request

## Initial Request — 2026-10-27T13:37:14Z

Replicar y rediseñar fielmente el sitio web de Puelche Lab (https://www.puelchelab.cl) extrayendo sus contenidos reales, su logotipo original, sus fotografías genuinas de portafolio y su identidad de marca exacta, implementándolo en Next.js 16 + React 19 + Tailwind CSS sin usar imágenes genéricas de Unsplash ni logotipos ficticios.

Working directory: /Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab
Integrity mode: development

## Requirements

### R1. Extracción y Uso de Activos Reales (Zero Unsplash)
- Extraer y descargar a local (`public/images/real/`) el logotipo real de Puelche Lab (`logo-top.png`, `logo-puelche.png`). Nota: los activos base ya han sido descargados en `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/public/images/real/`.
- Usar las fotografías reales de fondo y portafolio de Elementor/WordPress (`bg-home-2.jpg`, `bg-portafolios-fotografia-*.jpg`, `bg-agencia.jpg`, etc.).
- Prohibición estricta de imágenes de stock de Unsplash o logotipos genéricos SVG inventados. Reemplazar cualquier referencia residual a Unsplash.

### R2. Replicación Fiel de Identidad y Contenido
- Respetar la estructura real, textos y mensaje de marca de Puelche Lab: Estudio de Diseño Cross Media y Fotografía en Puerto Varas.
- Mantener sus categorías y servicios reales (Fotografía y Edición, Diseño de Marca, Redes Sociales, Diseño Editorial, Nuestros Clientes, Contacto).
- Preservar los clientes reales documentados (Anasac, AquaChile, Doosan, etc.).
- El Navbar y el Footer DEBEN renderizar el logotipo oficial (`/images/real/logo-top.png` o `/images/real/logo-puelche.png`).

### R3. Ubicación Mandatoria y Calidad Técnica
- El proyecto debe residir estrictamente en `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab`.
- Stack moderno: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS + Lenis.
- Compilación limpia con `npm run build` y validación responsive en 1440px, 768px y 375px.

## Acceptance Criteria

### Integridad de Marca
- [ ] Logotipo oficial de Puelche Lab visible en Navbar y Footer.
- [ ] Cero imágenes de Unsplash en el código fuente (`grep -r "unsplash" src/` retorna vacío).
- [ ] Textos y casos de estudio reales de la marca presentes en las páginas.

### Verificación Técnica
- [ ] El repositorio reside en `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab`.
- [ ] `npm run build` pasa con 0 errores y todas las rutas estáticas prerenderizadas.
- [ ] Capturas de verificación formal registradas en `docs/ledger.md`.
