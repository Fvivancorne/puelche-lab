import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export interface AdminLead {
  id: string;
  nombre: string;
  empresa: string | null;
  email: string | null;
  telefono: string;
  servicios: string[];
  presupuesto: string;
  region: string;
  modalidad: string | null;
  mensaje: string | null;
  origen: string;
  status: 'nuevo' | 'contactado' | 'cotizado' | 'cerrado';
  created_at: string;
}

// In-memory persistent queue for runtime session
let memoryLeads: AdminLead[] = [
  {
    id: 'lead-001',
    nombre: 'Rodrigo Mansilla',
    empresa: 'Lodge & Cava Península',
    email: 'rodrigo.mansilla@lodgerilan.cl',
    telefono: '+56 9 9456 1234',
    servicios: ['Fotografía de Autor', 'Desarrollo Web Next.js'],
    presupuesto: '$3.0M a $6.0M CLP',
    region: 'Chiloé & Castro',
    modalidad: 'Producción en Terreno Completa',
    mensaje: 'Necesitamos renovar todo el material fotográfico de habitaciones, cava subterránea y rediseñar la plataforma web de reservas directas para la temporada alta.',
    origen: 'web_puelche_cotizador',
    status: 'nuevo',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'lead-002',
    nombre: 'Carla Sanhueza',
    empresa: 'Agrícola & Frutos Australes',
    email: 'c.sanhueza@frutosaustrales.cl',
    telefono: '+56 9 8234 5678',
    servicios: ['Diseño de Marca', 'Diseño Editorial'],
    presupuesto: '$1.5M a $3.0M CLP',
    region: 'Puerto Varas & Frutillar',
    modalidad: 'Identidad Visual & Packaging',
    mensaje: 'Buscamos rediseñar la marca corporativa de exportación de berries y crear el catálogo técnico impreso en papeles finos.',
    origen: 'web_puelche_contacto',
    status: 'contactado',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: 'lead-003',
    nombre: 'Ignacio Valenzuela',
    empresa: 'Naviera Seno Austral',
    email: 'ignacio@senoaustral.cl',
    telefono: '+56 9 7123 4567',
    servicios: ['Fotografía de Autor', 'Redes Sociales'],
    presupuesto: '$6.0M a $12.0M CLP',
    region: 'Puerto Montt & Fiordos',
    modalidad: 'Producción Documental con Dron',
    mensaje: 'Requerimos cobertura de faenas marítimas de remolcadores y robótica submarina en fiordos australes con entrega en alta resolución.',
    origen: 'web_puelche_auditor',
    status: 'cotizado',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  },
  {
    id: 'lead-004',
    nombre: 'Francisca Ovalle',
    empresa: 'Arquitectura Sur & Paisaje',
    email: 'fovalle@arquitecturasur.cl',
    telefono: '+56 9 6345 8901',
    servicios: ['Fotografía de Autor', 'Edición Fotográfica'],
    presupuesto: '$1.5M a $3.0M CLP',
    region: 'Llanquihue & Puerto Varas',
    modalidad: 'Sesión Arquitectónica',
    mensaje: 'Tres casas residenciales terminadas en madera nativa listas para reportaje fotográfico editorial.',
    origen: 'web_puelche_contacto',
    status: 'cerrado',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];

function computeLeadMetrics(leadsList: AdminLead[]) {
  let totalBudgetClp = 0;
  for (const l of leadsList) {
    if (l.presupuesto.includes('12.0M')) totalBudgetClp += 9000000;
    else if (l.presupuesto.includes('6.0M')) totalBudgetClp += 4500000;
    else if (l.presupuesto.includes('3.0M')) totalBudgetClp += 2250000;
    else totalBudgetClp += 1500000;
  }
  return {
    total: leadsList.length,
    nuevos: leadsList.filter((l) => l.status === 'nuevo').length,
    contactados: leadsList.filter((l) => l.status === 'contactado').length,
    cotizados: leadsList.filter((l) => l.status === 'cotizado').length,
    cerrados: leadsList.filter((l) => l.status === 'cerrado').length,
    totalBudgetClp,
  };
}

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/leads_puelche?select=*&order=created_at.desc`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Accept': 'application/json',
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(3500),
      });

      if (res.ok) {
        const dbLeads = await res.json();
        if (Array.isArray(dbLeads) && dbLeads.length > 0) {
          const formatted = dbLeads.map((item: Record<string, unknown>, idx: number) => ({
            id: String(item.id || `lead-db-${idx}`),
            nombre: String(item.nombre || 'Sin nombre'),
            empresa: item.empresa ? String(item.empresa) : null,
            email: item.email ? String(item.email) : null,
            telefono: String(item.telefono || ''),
            servicios: Array.isArray(item.servicios) ? item.servicios.map(String) : [],
            presupuesto: String(item.presupuesto || '$1.5M a $3.0M CLP'),
            region: String(item.region || 'Los Lagos'),
            modalidad: item.modalidad ? String(item.modalidad) : null,
            mensaje: item.mensaje ? String(item.mensaje) : null,
            origen: String(item.origen || 'web'),
            status: (item.status as AdminLead['status']) || 'nuevo',
            created_at: String(item.created_at || new Date().toISOString()),
          }));

          return NextResponse.json({
            success: true,
            leads: formatted,
            metrics: computeLeadMetrics(formatted),
            source: 'supabase_postgres',
            count: formatted.length,
          });
        }
      }
    } catch {
      // Falls through to in-memory store
    }
  }

  return NextResponse.json({
    success: true,
    leads: memoryLeads,
    metrics: computeLeadMetrics(memoryLeads),
    source: 'in_memory_hub',
    count: memoryLeads.length,
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Parámetros "id" y "status" requeridos' }, { status: 400 });
    }

    const validStatuses = ['nuevo', 'contactado', 'cotizado', 'cerrado'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: 'Estado no válido' }, { status: 400 });
    }

    const leadIndex = memoryLeads.findIndex((l) => l.id === id);
    if (leadIndex >= 0) {
      memoryLeads[leadIndex].status = status;
    }

    // Also update in Supabase if credentials are present
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/leads_puelche?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      }).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      id,
      status,
      metrics: computeLeadMetrics(memoryLeads),
      message: `Estado actualizado a "${status}" exitosamente.`,
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : 'Error al actualizar lead';
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newLead: AdminLead = {
      id: `lead-manual-${Date.now()}`,
      nombre: body.nombre || 'Lead Directo',
      empresa: body.empresa || null,
      email: body.email || null,
      telefono: body.telefono || '',
      servicios: Array.isArray(body.servicios) ? body.servicios : ['Fotografía de Autor'],
      presupuesto: body.presupuesto || '$1.5M a $3.0M CLP',
      region: body.region || 'Puerto Varas',
      modalidad: body.modalidad || 'Directo',
      mensaje: body.mensaje || '',
      origen: 'manual_admin',
      status: 'nuevo',
      created_at: new Date().toISOString(),
    };

    memoryLeads.unshift(newLead);

    return NextResponse.json({
      success: true,
      lead: newLead,
      message: 'Lead registrado en el hub.',
    }, { status: 201 });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : 'Error al registrar lead';
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
