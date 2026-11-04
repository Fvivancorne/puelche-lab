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


## Follow-up — 2026-10-27T18:47:29Z

Reconstruir con fidelidad 1:1 el sitio web de Puelche Lab (https://www.puelchelab.cl) en Next.js 16 + React 19 + Tailwind CSS, respetando estrictamente su paleta cromática real (Cian Puelche #59BFD6 y Gris Pizarra #3B3D42), su storytelling de scroll a pantalla completa (100vh), su emblema central blanco, sus franjas panorámicas de proyectos con pills cian, su grilla de 20 clientes en fondo cian y su formulario de contacto genuino.

Working directory: /Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab
Integrity mode: development

## Requirements

### R1. Paleta de Color & Header Idénticos a la Marca
- Configurar como colores primarios de Tailwind:
  - `puelche-cyan`: `#59BFD6` (Turquesa/Cian Puelche oficial).
  - `puelche-slate`: `#3B3D42` (Gris Pizarra del Header).
  - `puelche-dark`: `#1D2024`.
- Header en `#3B3D42` con `logo-top.png` en color cian a la izquierda, y navegación con mayúsculas condensed (`HOME`, `PORTAFOLIO` con dropdown, `CLIENTES`, `CONTACTO`) a la derecha.

### R2. Storytelling de Portada & Emblema Central
- **Sección 1 (100vh):** Fondo de bosque patagónico con niebla (`bg-agencia.jpg`). En el centro vertical y horizontal, el emblema colosal blanco de Puelche Lab (`logo-puelche.png` blanco, "VIENTO CREATIVO" y subtítulo "Un Estudio de Diseño Cross Media y Fotografía de Puerto Varas.").
- **Sección 2 (100vh):** Fondo de pastizal con cerca de madera y lago nublado (`bg-home-2.jpg`). Texto central de storytelling sobre *¿Qué es Cross Media?*, estudio propio y equipamiento de tierra y aire.
- **Sección 3 (Cierre):** Bloque completo en Cian `#59BFD6` con marco geométrico blanco, titular `CONTACTANOS`, botón `CONTACTO` e iconos sociales.

### R3. Segmentación de Portafolio con Pills Cian
- En las páginas de portafolio/fotografía, presentar franjas fotográficas a ancho completo para cada cliente real (Estancia Rilán, Cala Melí, Costaustralis, Cabo de Hornos, Muebles Yunge, Tagua Tagua Lodge, AquaChile, etc.).
- Cada proyecto debe llevar en la esquina inferior izquierda su tarjeta distintiva con fondo Cian `#59BFD6` conteniendo el nombre del cliente, ubicación, especialidad y botón `VER FOTOGRAFÍAS`.

### R4. Directorio de Clientes & Formulario de Contacto
- `/clientes`: Fondo 100% Cian `#59BFD6` con la grilla de los 20 logotipos de clientes reales en blanco puro (`cliente1-1.png` a `cliente20-1.png`) descargados en `public/images/real/clients/`.
- `/contacto`: Formulario con los campos reales: Nombre y Apellido, Teléfono de Contacto, Correo Electrónico, checkboxes de Solicitud (Fotografía, Sitio Web, Redes Sociales, Diseño Gráfico), campo de detalles y botón cian `ENVIAR`, junto a la columna de datos reales de Paula Valdivieso.

## Acceptance Criteria

### Fidelidad Visual y de Marca
- [ ] Header con fondo `#3B3D42` y logo oficial `logo-top.png`.
- [ ] Portada Home estructurada en storytelling de 3 secciones (Hero con emblema blanco central, narrativa Cross Media y cierre cian con marco blanco).
- [ ] Grilla de clientes sobre fondo cian `#59BFD6` con los 20 logos reales en blanco.
- [ ] Franjas de proyectos de fotografía con sus correspondientes pills cian de cliente.
- [ ] Formulario de contacto con checkboxes de solicitud y datos directos de Paula Valdivieso.

### Verificación Técnica
- [ ] `npm run build` compila con 0 errores de TypeScript y todas las rutas estáticas prerenderizadas.
- [ ] Auditoría visual en 1440px, 768px y 375px confirmando la exactitud cromática y de storytelling.
