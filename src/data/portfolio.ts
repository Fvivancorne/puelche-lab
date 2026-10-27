export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  location: string;
  category: 'Fotografía' | 'Branding' | 'Desarrollo Web' | 'Editorial';
  year: string;
  summary: string;
  description: string;
  image: string;
  deliverables: string[];
  featured?: boolean;
}

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'estancia-rilan',
    slug: 'estancia-rilan',
    title: 'Estancia Rilán — Hotel & Cava',
    client: 'Estancia Rilán',
    location: 'Península de Rilán, Chiloé',
    category: 'Fotografía',
    year: '2023',
    summary: 'Documentación fotográfica de arquitectura vernácula, cava subterránea e interiorismo frente al mar interior.',
    description: 'Estancia Rilán requería capturar la quietud y sofisticación de su propuesta en Chiloé: maderas nobles patagónicas, luz natural filtrada por la neblina costera y la experiencia culinaria de su cava.',
    image: '/images/real/bg-portafolios-fotografia-min.jpg',
    deliverables: ['Fotografía de Arquitectura', 'Interiores', 'Fotografía Aérea 4K', 'Campaña Editorial'],
    featured: true,
  },
  {
    id: 'aquachile',
    slug: 'aquachile',
    title: 'AquaChile — Trazabilidad & Alimentos',
    client: 'AquaChile',
    location: 'Puerto Montt & Fiordos Australes',
    category: 'Fotografía',
    year: '2023',
    summary: 'Fotografía industrial de procesos productivos, centros de cultivo y producto gastronómico de exportación.',
    description: 'Registro de alta precisión técnica en faenas marinas extremas y en plantas de procesamiento de estándar mundial, transmitiendo la pureza de las aguas del sur.',
    image: '/images/real/bg-portafolios-fotografia-g-min.jpg',
    deliverables: ['Fotografía Industrial', 'Procesos Productivos', 'Fotografía Gastronómica'],
    featured: true,
  },
  {
    id: 'cala-meli',
    slug: 'cala-meli',
    title: 'Cala Melí — Refugios del Lago',
    client: 'Cala Melí Cabañas',
    location: 'Puerto Varas',
    category: 'Fotografía',
    year: '2024',
    summary: 'Arquitectura bioclimática, calidez de maderas nativas y vista despejada a los volcanes Osorno y Calbuco.',
    description: 'Captura visual diseñada para plataformas de hospitalidad internacional, destacando el diálogo entre los interiores contemporáneos y el bosque templado lluvioso.',
    image: '/images/real/bg-portafolios-fotografia-a-min.jpg',
    deliverables: ['Fotografía Inmobiliaria', 'Dron Paisajístico', 'Contenido Web'],
    featured: true,
  },
  {
    id: 'blue-seal',
    slug: 'blue-seal',
    title: 'Blue Seal — Robótica & Buceo Técnico',
    client: 'Blue Seal Subsea Technologies',
    location: 'Puerto Montt',
    category: 'Branding',
    year: '2023',
    summary: 'Identidad visual integral, imagotipo de alta mar y narrativa técnica para robótica submarina.',
    description: 'Construcción de un lenguaje de marca de ingeniería y confianza extrema en profundidades marinas, conectando robótica autónoma con buceo humano especializado.',
    image: '/images/real/bg-portafolios-fotografia-h-min.jpg',
    deliverables: ['Manual de Identidad', 'Señalética de Flota', 'Diseño de Plataforma Web'],
    featured: true,
  },
  {
    id: 'hotel-costaustralis',
    slug: 'hotel-costaustralis',
    title: 'Hotel Costaustralis — Refugio del Seno Última Esperanza',
    client: 'Hotel Costaustralis',
    location: 'Puerto Natales, Patagonia',
    category: 'Fotografía',
    year: '2022',
    summary: 'Reportaje fotográfico de fachada al fiordo, suites ejecutivas y bar de coctelería patagónica.',
    description: 'La elegancia neoclásica patagónica retratada bajo la luz dorada austral, con encuadres que celebran el viento y las montañas de Última Esperanza.',
    image: '/images/real/bg-portafolios-fotografia-b-min.jpg',
    deliverables: ['Fotografía Hotelera', 'Interiores', 'Catálogo de Huéspedes'],
    featured: false,
  },
  {
    id: 'viajes-falabella-patagonia',
    slug: 'viajes-falabella-patagonia',
    title: 'Guía Territorial Patagonia Austral',
    client: 'Viajes Falabella',
    location: 'Chile & Argentina',
    category: 'Editorial',
    year: '2022',
    summary: 'Diseño editorial de catálogo de gran formato y curaduría fotográfica de destinos australes.',
    description: 'Diagramación con grilla suiza, espacios limpios y mapas topográficos vectoriales que acompañan una selección de expediciones por glaciares y estancias.',
    image: '/images/real/bg-portafolios-fotografia-d-min.jpg',
    deliverables: ['Diseño Editorial', 'Curaduría de Contenido', 'Impresión Fine Art'],
    featured: false,
  },
  {
    id: 'sur-terra',
    slug: 'sur-terra',
    title: 'Sur Terra — Propiedades de Conservación',
    client: 'Sur Terra Inmobiliaria',
    location: 'Lago Llanquihue',
    category: 'Desarrollo Web',
    year: '2024',
    summary: 'Plataforma web minimalista de parcelaciones ecológicas y reservas de conservación.',
    description: 'Sitio web ultra-rápido en Next.js con mapas interactivos satelitales, visor de parcelas por lotes y cotización en tiempo real vía WhatsApp.',
    image: '/images/real/bg-fotografia-6-min.jpg',
    deliverables: ['Desarrollo Web Next.js', 'Buscador de Lotes', 'Filtro de Inversión'],
    featured: true,
  },
  {
    id: 'tagua-tagua-lodge',
    slug: 'tagua-tagua-lodge',
    title: 'Tagua Tagua Lodge — Selva Fría & Pesca',
    client: 'Tagua Tagua Lodge',
    location: 'Río Puelo / Cochamó',
    category: 'Fotografía',
    year: '2023',
    summary: 'Inmersión visual en aguas turquesas del río Puelo, bosques de alerce y cabañas de montaña.',
    description: 'La experiencia de desconexión absoluta retratada a través de texturas de madera, niebla mañanera sobre el lago y pesca con mosca.',
    image: '/images/real/bg-portafolios-fotografia-c-min.jpg',
    deliverables: ['Fotografía Turística', 'Video Aéreo Drone', 'Brochure Digital'],
    featured: false,
  },
];

export const CLIENT_LOGOS = [
  'AquaChile',
  'Estancia Rilán',
  'Hotel Costaustralis',
  'Hotel Cabo de Hornos',
  'Doosan',
  'Viajes Falabella',
  'Tagua Tagua Lodge',
  'Blue Seal',
  'Sur Terra',
  'Cala Melí',
  'Muebles Yunge',
  'Cirumed',
];

export const STUDIO_SERVICES = [
  {
    id: 'fotografia',
    title: 'Fotografía Profesional & Film',
    shortDesc: 'Interiores, arquitectura, procesos industriales y drones 4K en el sur de Chile.',
    href: '/servicios/fotografia',
    tag: 'Especialidad Principal',
    details: [
      'Fotografía de arquitectura e interiorismo hotelero.',
      'Fotografía aérea y de procesos productivos con dron 4K.',
      'Fotografía gastronómica y de producto en estudio propio.',
      'Postproducción y retoque digital de precisión (sala de magia).',
    ],
  },
  {
    id: 'branding',
    title: 'Diseño de Marca & Identidad Cross-Media',
    shortDesc: 'Estrategia de marca, imagotipo, tipografía y narrativa con raíz territorial.',
    href: '/servicios/branding',
    tag: 'Estrategia Visual',
    details: [
      'Manuales de normas gráficas y sistemas visuales flexibles.',
      'Narrativa y tono de voz arraigado en la Patagonia.',
      'Diseño para soportes físicos, uniformes y señalética.',
      'Ecosistema digital coherente para todos los puntos de contacto.',
    ],
  },
  {
    id: 'desarrollo-web',
    title: 'Desarrollo Web & Experiencias Digitales',
    shortDesc: 'Sitios web rápidos, elegantes y nivel boutique programados en Next.js.',
    href: '/servicios/desarrollo-web',
    tag: 'Tecnología de Autor',
    details: [
      'Arquitectura Next.js con carga instantánea y 100% responsive.',
      'Diseño visual a medida, sin plantillas genéricas de WordPress.',
      'Optimización de motores de búsqueda local (SEO Puerto Varas y Lagos).',
      'Integración con WhatsApp y embudos de cotización calificada.',
    ],
  },
  {
    id: 'editorial',
    title: 'Diseño Editorial & Publicaciones',
    shortDesc: 'Memorias anuales, libros fotográficos corporativos y catálogos de arte.',
    href: '/servicios/editorial',
    tag: 'Diseño Tangible',
    details: [
      'Curaduría fotográfica y edición de textos corporativos.',
      'Diagramación suiza contemporánea y tipografías de colección.',
      'Supervisión de pre-prensa y selección de papeles fine art.',
      'Ediciones digitales interactivas para inversionistas y clientes.',
    ],
  },
];
