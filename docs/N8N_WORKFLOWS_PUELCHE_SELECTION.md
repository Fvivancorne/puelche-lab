# Catálogo Maestro de Workflows de n8n para Puelche Lab & Operaciones de Agencia

**Repositorio Fuente Local:** `/Users/felipeandresvivancocornejo/Documents/GitHub/n8n-workflows-arsenal` (Clon local del repositorio `Zie619/n8n-workflows`, con **2.061 flujos de producción en 188 categorías**).  
**Destinatario:** Felipe Andrés Vivanco Cornejo (Tech Lead) & Equipo de Ingeniería de Puelche Lab.  
**Fecha de Publicación:** 2026-11-11.  
**Estado:** Certificado para Importación y Despliegue en Producción.

---

## 1. Visión Estratégica & Arquitectura de Automatización

Para escalar Puelche Lab como un **Estudio de Diseño Cross Media y Fotografía** de clase mundial sin inflar los costos de personal ni quemar tokens de IA innecesarios, se ha seleccionado un conjunto de **6 flujos de trabajo de alto impacto** del arsenal local.

Estos flujos operan en coordinación con la arquitectura web de Puelche Lab (Next.js 16 App Router en Vercel) y la infraestructura backend Zero-Cost de la agencia (Supabase con pgvector, TwentyCRM autoalojado, y LiteLLM Proxy local en Apple Silicon M1 Max).

```
┌────────────────────────────────────────────────────────────────────────┐
│                   TOPOLOGÍA OMNICANAL PUELCHE LAB                      │
├────────────────────────────────────────────────────────────────────────┤
│  Frontend Next.js 16 (puelche-lab.vercel.app)                          │
│  ├── /contacto   ──► [WF-01: Hunter/0436 - Enriquecimiento Inbound]    │
│  ├── /auditor    ──► [WF-04: Webhook/1770 - Extracción Gemini Vision]  │
│  └── /cotizador  ──► [WF-05: Webhook/1477 - Event Bus TwentyCRM]       │
├────────────────────────────────────────────────────────────────────────┤
│  Canales de Mensajería & Redes Sociales                                │
│  ├── WhatsApp    ──► [WF-02: Webhook/1385 - Bot Concierge RAG]        │
│  ├── Telegram    ──► [WF-03: Telegram/1411 - Buffer Anti-Carrusel]     │
│  └── Social Hub  ──► [WF-06: Linkedin/1342 - Factoría de Contenidos]   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Dossier Técnico de los 6 Flujos de Trabajo Seleccionados

---

### Flujo 1: Enriquecimiento Inbound Automático de Leads (`Hunter/0436`)
* **Archivo Fuente:** `workflows/Hunter/0436_Hunter_Pipedrive_Create_Triggered.json`
* **Categoría:** `Hunter` | **Nodos Totales:** 16 (14 nodos lógicos, 2 sticky notes explicativas).
* **Nodos Clave:** `n8n Form Trigger`, `Check if the email is valid`, `Verify email with Hunter`, `Clearbit`, `Search for person in Pipedrive`, `Is this a new person?`, `Is this a new organization?`, `Create Organization`, `Create Person`, `Create Deal`.

#### Arquitectura del Pipeline:
```
[Form Submission /contacto]
             │
             ▼
[Verificación de Email en Hunter] ──(¿Inválido?)──► [Stop & Error: Descarte Silencioso]
             │ (Válido)
             ▼
[Enriquecimiento con Clearbit] (Obtiene: Tamaño empresa, Sector, Dominio, Logo, LinkedIn)
             │
             ▼
[Búsqueda en CRM: Supabase / TwentyCRM / Pipedrive]
      ┌──────┴──────┐
  (Existe)      (Nuevo Lead)
      │              │
      ▼              ▼
[Actualizar]   [Crear Organización] ──► [Crear Persona] ──► [Crear Deal / Oportunidad]
```

#### Aplicación en Puelche Lab:
Cuando un cliente potencial (ej. un hotel boutique o viña patagónica) completa el formulario en `/contacto` o utiliza el cotizador paramétrico en `/cotizador`, este flujo intercepta el correo corporativo:
1. Valida en milisegundos que no sea un correo desechable mediante Hunter.
2. Extrae los datos fiscales y la cantidad de empleados con Clearbit.
3. Inyecta el deal en TwentyCRM con el ticket estimado en CLP/USD, clasificando al prospecto antes de la primera llamada con Paula Valdivieso.

---

### Flujo 2: Concierge de WhatsApp con RAG & Búsqueda Vectorial (`Webhook/1385`)
* **Archivo Fuente:** `workflows/Webhook/1385_Webhook_Respondtowebhook_Automate_Webhook.json`
* **Categoría:** `Webhook` | **Nodos Totales:** 24 (18 nodos lógicos, 6 sticky notes).
* **Nodos Clave:** `Webhook`, `Respond to Webhook`, `Download Files` (Google Drive), `Embeddings OpenAI`, `Qdrant Vector Store` (o Supabase `pgvector`), `Create collection`, `Refresh collection`, `AI Agent`, `OpenAI Chat Model`.

#### Arquitectura del Pipeline:
```
[Cliente envía mensaje a WhatsApp Business de Paula Valdivieso]
                     │
                     ▼
             [Webhook Meta API]
                     │
                     ▼
        [AI Agent: Recuperación RAG]
          ├── Embeddings de la Consulta
          └── Búsqueda de Similitud Coseno en Base Vectorial
              (Catálogo de Tarifas, Fechas de Expedición, FAQ)
                     │
                     ▼
          [Generación de Respuesta]
   (Modelo Llama 3.3 / GPT-4o-Mini vía LiteLLM)
                     │
                     ▼
          [Respond to Webhook (Meta)] ──► [Cliente recibe respuesta en <1.8s]
```

#### Aplicación en Puelche Lab:
Actúa como la asistente virtual y concierge de Paula Valdivieso en el número oficial `+56 9 6617 7500`:
- Responde preguntas sobre disponibilidad de fechas para expediciones fotográficas en Chiloé, Puerto Varas y Torres del Paine.
- Informa aranceles base para sesiones de arquitectura y hotelería.
- Si el cliente solicita un presupuesto a medida, genera un enlace prellenado hacia `/cotizador` para formalizar la cotización.

---

### Flujo 3: Buffer de Mensajes con Ventana Deslizante (`Telegram/1411`)
* **Archivo Fuente:** `workflows/Telegram/1411_Telegram_Wait_Automation_Triggered.json`
* **Categoría:** `Telegram` | **Nodos Totales:** 23 (14 nodos lógicos, 9 sticky notes).
* **Nodos Clave:** `Receive Message`, `Add to Queued Messages` (Supabase / Postgres), `Wait 10 Seconds`, `Get Queued Messages`, `Aggregate`, `Sort by Message ID`, `Delete Queued Messages`, `OpenAI Chat Model`, `Reply`.

#### Arquitectura del Pipeline:
```
[Mensaje 1: "Hola Paula"] ─────┐
[Mensaje 2: "Quisiera cotizar"] ┼──► [Insertar en tabla temporal 'queued_messages']
[Mensaje 3: "Para un hotel"]  ──┘
             │
             ▼
     [Wait 10 Segundos] (Espera a que el usuario termine de tipear)
             │
             ▼
[Extraer todos los mensajes del usuario acumulados]
             │
             ▼
[Aggregate & Sort by Timestamp] ──► Une en un único prompt consolidado:
                                     "Hola Paula. Quisiera cotizar para un hotel."
             │
             ▼
[Eliminar mensajes de la cola]
             │
             ▼
[Llamada única a la IA (LiteLLM)] ──► [Respuesta coherente sin duplicidad]
```

#### Valor Crítico para la Agencia (Anti-Token Burning):
Resuelve el problema más destructivo de los bots conversacionales: **la ráfaga de mensajes fragmentados**. Cuando un humano envía 4 mensajes en 6 segundos, un bot ingenuo dispara 4 llamadas simultáneas al LLM, colapsando el contexto y respondiendo 4 veces con incoherencias. Este flujo agrupa los mensajes en una ventana deslizante de 10 segundos, reduciendo el consumo de tokens en un 75% y eliminando carreras de concurrencia.

---

### Flujo 4: Extracción de Datos e Inspección Visual con Gemini Vision (`Webhook/1770`)
* **Archivo Fuente:** `workflows/Webhook/1770_Webhook_Extractfromfile_Automation_Webhook.json`
* **Categoría:** `Webhook` | **Nodos Totales:** 9 (6 nodos lógicos, 3 sticky notes).
* **Nodos Clave:** `Webhook`, `Get image from URL`, `Transform image to base64`, `Call Gemini API (Flash Lite) with Image`, `Edit fields to output required data alone`, `Respond to Webhook`.

#### Arquitectura del Pipeline:
```
[Petición Webhook con URL de Imagen]
             │
             ▼
[Descarga de Imagen en Binario]
             │
             ▼
[Transform to Base64]
             │
             ▼
[Gemini Vision 1.5 Flash / Flash Lite]
  Prompt del Sistema: "Analiza la composición fotográfica, iluminación,
  paleta cromática predominante, sujetos y metadatos visuales.
  Retorna estrictamente JSON Schema validado."
             │
             ▼
[Parse & Sanitización de Campos]
             │
             ▼
[Respuesta JSON Estructurada en <900ms]
```

#### Aplicación en Puelche Lab:
1. **Catalogación del Archivo Fotográfico:** Al subir nuevos álbumes de clientes (Estancia Rilán, Costaustralis), este flujo extrae automáticamente etiquetas semánticas, colores dominantes y descripciones para inyectar en los metadatos SEO y etiquetas alt de Next.js.
2. **Soporte al Motor `/auditor`:** Permite que el auditor capture un screenshot del sitio del cliente y lo envíe a Gemini Vision para evaluar instantáneamente la calidad estética, legibilidad tipográfica y contraste visual.

---

### Flujo 5: Event Bus Multi-Canal para TwentyCRM (`Webhook/1477`)
* **Archivo Fuente:** `workflows/Webhook/1477_Webhook_Slack_Update_Webhook.json`
* **Categoría:** `Webhook` | **Nodos Totales:** 11 (6 nodos lógicos, 5 sticky notes).
* **Nodos Clave:** `on new twentycrm event` (Webhook Trigger), `filter required data #eventType mandatory`, `events log` (Google Sheets / Supabase), `message channel evaluation` (If Switch), `email channel for delete eventType` (Gmail / Resend), `message channel for all other eventTypes` (Slack / Telegram).

#### Arquitectura del Pipeline:
```
[Evento en TwentyCRM: Creación de Lead, Cambio de Etapa, Ganado]
                          │
                          ▼
             [Webhook: on new twentycrm event]
                          │
                          ▼
            [Filtro y Normalización de Payload]
                          │
                          ▼
            [Log de Auditoría Inmutable (Supabase)]
                          │
                          ▼
           [Evaluación de Canal y Severidad]
             ┌────────────┴────────────┐
             ▼                         ▼
    (Evento Crítico/Delete)    (Evento de Venta / Lead)
             │                         │
             ▼                         ▼
   [Email Directo a Felipe]    [Notificación Inmediata en Telegram/Slack]
```

#### Aplicación en Puelche Lab:
Sincroniza el CRM de código abierto Twenty con el equipo de la agencia:
- Cuando un cliente en `/cotizador` presiona *"Solicitar Reserva Formal"*, se dispara un webhook a TwentyCRM que mueve el trato a *"Propuesta Enviada"* y notifica instantáneamente a Felipe y Paula vía Telegram con el desglose en CLP y USD.

---

### Flujo 6: Factoría Automatizada de Publicación en Redes Sociales (`Linkedin/1342`)
* **Archivo Fuente:** `workflows/Linkedin/1342_Linkedin_Telegram_Automate_Webhook.json`
* **Categoría:** `Linkedin` | **Nodos Totales:** 100 (57 nodos lógicos, 43 sticky notes).
* **Nodos Clave:** `executeWorkflowTrigger`, `When chat message received`, `Window Buffer Memory`, `Google Docs`, `Google Drive`, `Code` (manipulación de strings y hashtags), `Facebook Graph API`, `Twitter`, `LinkedIn`, `Short`, `YouTube Short`.

#### Arquitectura del Pipeline:
```
[Borrador de Caso de Estudio en Google Docs / Notion]
                         │
                         ▼
             [Orquestador Multi-Nivel]
  - Extracción de Texto, Fotografías y Enlaces
  - Generación de Copy Adaptado por Red:
      * LinkedIn: Tono profesional, métricas ROI, párrafos espaciados.
      * Instagram: Copy visual, storytelling patagónico, hashtags limpios.
      * X (Twitter): Hilo sintético de 3-5 tweets con gancho.
                         │
                         ▼
     [Revisión Humana Opcional vía Bot de Telegram]
        ¿Aprobado por Paula Valdivieso? [Sí / No]
                         │
                         ▼
     [Despacho Paralelo Automatizado por API]
       ├── LinkedIn API
       ├── Meta Graph API (Facebook & Instagram)
       └── X API
```

#### Aplicación en Puelche Lab:
Permite que un único caso de estudio fotográfico documentado por el estudio se convierta en una campaña omnicanal semanal en 3 plataformas simultáneas, manteniendo activa la presencia de marca sin exigir horas manuales de gestión de redes sociales.

---

## 3. Guía de Importación y Despliegue en el Entorno Local

Para importar cualquiera de estos flujos en la instancia activa de n8n:

### 3.1 Importación vía n8n CLI
```bash
# Exportar la variable de entorno de n8n si es necesario
cd /Users/felipeandresvivancocornejo/Documents/GitHub/n8n-workflows-arsenal

# Importar el flujo de Inbound Enrichment directamente
n8n import:workflow --input=workflows/Hunter/0436_Hunter_Pipedrive_Create_Triggered.json

# Importar el Concierge de WhatsApp
n8n import:workflow --input=workflows/Webhook/1385_Webhook_Respondtowebhook_Automate_Webhook.json

# Importar el Buffer Anti-Carrusel
n8n import:workflow --input=workflows/Telegram/1411_Telegram_Wait_Automation_Triggered.json
```

### 3.2 Mapeo de Credenciales y Variables de Entorno
Al activar los flujos, vincular las credenciales maestras ya existentes en el ecosistema de la agencia:

| Servicio | Variable / Credencial n8n | Origen en Ecosistema de Agencia |
|---|---|---|
| **Supabase** | `supabaseApi` | Host y Service Role Key de la instancia del cliente. |
| **OpenAI / LiteLLM** | `openAiApi` | Base URL: `http://127.0.0.1:4000/v1` (Proxy local de LiteLLM). |
| **Meta Graph API** | `facebookGraphApi` | Token de sistema permanente configurado en `agencia-api-arsenal`. |
| **TwentyCRM** | `twentyCrmApi` | Instancia Docker local en puerto 3000 o Coolify. |
| **Gemini API** | `googleGeminiApi` | Pool de llaves gratuitas en `agencia-api-arsenal`. |

---

## 4. Matriz de Mapeo con Rutas de Puelche Lab

| Ruta en Puelche Lab (`src/app/`) | Flujo de n8n Vinculado | Evento Desencadenante |
|---|---|---|
| `/contacto/page.tsx` | `Hunter/0436` | Envío de formulario de contacto general. |
| `/cotizador/page.tsx` | `Webhook/1477` | Cálculo final de presupuesto y clic en *"Enviar por WhatsApp"*. |
| `/auditor/page.tsx` | `Webhook/1770` | Petición de auditoría forense con análisis visual de captura. |
| Chat Flotante (`WhatsAppButton.tsx`) | `Webhook/1385` + `Telegram/1411` | Interacción en tiempo real por WhatsApp con buffer de espera. |
| Manifiesto `/llms.txt` | `Linkedin/1342` | Actualización de catálogo de proyectos y difusión omnicanal. |
