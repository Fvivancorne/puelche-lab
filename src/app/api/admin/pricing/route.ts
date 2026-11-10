import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'src/data/pricing-config.json');

export async function GET() {
  try {
    if (!fs.existsSync(CONFIG_PATH)) {
      return NextResponse.json({ error: 'Config file not found' }, { status: 404 });
    }
    const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read pricing config' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const body = await request.json();

    // Verification: simple master PIN or admin token
    const ADMIN_PIN = process.env.ADMIN_PRICING_PIN || 'puelche2026';
    const providedPin = authHeader?.replace('Bearer ', '') || body?.pin;

    if (providedPin !== ADMIN_PIN) {
      return NextResponse.json(
        { error: 'Credencial inválida. Ingresa el PIN maestro de administración.' },
        { status: 401 }
      );
    }

    const { config } = body;
    if (!config || !config.companySizes || !config.addons) {
      return NextResponse.json({ error: 'Estructura de configuración incompleta' }, { status: 400 });
    }

    // Stamp update metadata
    config.lastUpdated = new Date().toISOString();
    config.updatedBy = body.updatedBy || 'Alejandro / Paula';

    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Configuración paramétrica de precios actualizada correctamente en Puelche Lab.',
      config,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error al persistir la configuración' }, { status: 500 });
  }
}
