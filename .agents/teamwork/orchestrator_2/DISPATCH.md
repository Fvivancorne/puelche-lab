# Orchestrator Dispatch

## Objective
Reconstruir con fidelidad 1:1 el sitio web de Puelche Lab (https://www.puelchelab.cl) en Next.js 16 + React 19 + Tailwind CSS en `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab`.

## Key Requirements from Follow-up Request
1. **R1. Paleta de Color & Header**:
   - `puelche-cyan`: `#59BFD6` (Turquesa/Cian Puelche oficial)
   - `puelche-slate`: `#3B3D42` (Gris Pizarra del Header)
   - `puelche-dark`: `#1D2024`
   - Header en `#3B3D42` con `logo-top.png` en color cian a la izquierda, y navegación en mayúsculas condensed (`HOME`, `PORTAFOLIO` con dropdown, `CLIENTES`, `CONTACTO`) a la derecha.
2. **R2. Storytelling de Portada & Emblema Central**:
   - Sección 1 (100vh): Fondo `bg-agencia.jpg` (bosque patagónico con niebla), emblema central colosal blanco de Puelche Lab (`logo-puelche.png` blanco, "VIENTO CREATIVO" y subtítulo "Un Estudio de Diseño Cross Media y Fotografía de Puerto Varas.").
   - Sección 2 (100vh): Fondo `bg-home-2.jpg` (pastizal con cerca de madera y lago nublado), texto central de storytelling sobre *¿Qué es Cross Media?*, estudio propio y equipamiento de tierra y aire.
   - Sección 3 (Cierre): Bloque completo en Cian `#59BFD6` con marco geométrico blanco, titular `CONTACTANOS`, botón `CONTACTO` e iconos sociales.
3. **R3. Segmentación de Portafolio con Pills Cian**:
   - Franjas panorámicas a ancho completo para proyectos reales (Estancia Rilán, Cala Melí, Costaustralis, Cabo de Hornos, Muebles Yunge, Tagua Tagua Lodge, AquaChile, etc.).
   - Tarjeta distintiva en esquina inferior izquierda con fondo Cian `#59BFD6` con nombre del cliente, ubicación, especialidad y botón `VER FOTOGRAFÍAS`.
4. **R4. Directorio de Clientes & Formulario de Contacto**:
   - `/clientes`: Fondo 100% Cian `#59BFD6` con grilla de 20 logos de clientes reales en blanco puro (`cliente1-1.png` a `cliente20-1.png`) desde `public/images/real/clients/`.
   - `/contacto`: Formulario con campos reales (Nombre y Apellido, Teléfono de Contacto, Correo Electrónico, checkboxes de Solicitud: Fotografía, Sitio Web, Redes Sociales, Diseño Gráfico; detalles y botón cian `ENVIAR`), datos de Paula Valdivieso.
5. **Technical Acceptance**:
   - `npm run build` con 0 errores de TypeScript y todas las rutas estáticas prerenderizadas.
   - Auditoría visual en 1440px, 768px y 375px confirmando exactitud cromática y storytelling.

## References
- Authoritative user request: `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/ORIGINAL_REQUEST.md`
- Previous generation context: `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/.agents/teamwork/orchestrator_1/handoff.md`
- Project specs & roadmap: `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/PROJECT.md`
- Test infrastructure: `/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/TEST_INFRA.md`
