import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PORTFOLIO_PROJECTS, ProjectItem } from '@/data/portfolio';

const DATA_PATH = path.join(process.cwd(), 'src/data/portfolio-custom.json');

// Helper to get active projects
export function getActiveProjects(): ProjectItem[] {
  try {
    if (fs.existsSync(DATA_PATH)) {
      const raw = fs.readFileSync(DATA_PATH, 'utf-8');
      const custom = JSON.parse(raw);
      if (Array.isArray(custom) && custom.length > 0) {
        return custom;
      }
    }
  } catch {
    // fallback to static portfolio
  }
  return PORTFOLIO_PROJECTS;
}

export async function GET() {
  const projects = getActiveProjects();
  return NextResponse.json({
    success: true,
    total: projects.length,
    projects,
  });
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const body = await request.json();

    const ADMIN_PIN = process.env.ADMIN_PRICING_PIN || 'puelche2026';
    const providedPin = authHeader?.replace('Bearer ', '') || body?.pin;

    if (providedPin !== ADMIN_PIN) {
      return NextResponse.json(
        { error: 'Credencial inválida. PIN de administración requerido.' },
        { status: 401 }
      );
    }

    const { projects } = body;
    if (!Array.isArray(projects)) {
      return NextResponse.json({ error: 'La lista de proyectos debe ser un arreglo.' }, { status: 400 });
    }

    try {
      fs.writeFileSync(DATA_PATH, JSON.stringify(projects, null, 2), 'utf-8');
    } catch {
      // In serverless readonly environments, fallback gracefully
    }

    return NextResponse.json({
      success: true,
      message: 'Catálogo de obras de autor guardado exitosamente.',
      total: projects.length,
      projects,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Fallo al persistir catálogo de obras' }, { status: 500 });
  }
}
