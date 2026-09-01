CREATE TABLE IF NOT EXISTS public.orders (
  id BIGSERIAL PRIMARY KEY,
  codigo TEXT UNIQUE NOT NULL,
  cliente_nombre TEXT NOT NULL DEFAULT 'Cliente',
  telefono TEXT DEFAULT NULL,
  dispositivo TEXT NOT NULL DEFAULT 'Dispositivo',
  marca TEXT DEFAULT NULL,
  modelo TEXT NOT NULL DEFAULT 'Modelo',
  imei TEXT DEFAULT NULL,
  serie TEXT DEFAULT NULL,
  servicio TEXT NOT NULL DEFAULT 'Reparación',
  estado TEXT NOT NULL CHECK (
    estado IN (
      'Recepción',
      'Diagnóstico',
      'Esperando aprobación',
      'Reparación',
      'Control de calidad',
      'Listo para retirar',
      'Entregado',
      'Rechazo cliente'
    )
  ),
  estadoEquipo TEXT DEFAULT NULL,
  accesorios JSONB DEFAULT '[]'::jsonb,
  codigoDesbloqueo TEXT DEFAULT NULL,
  falla TEXT DEFAULT NULL,
  diagnostico TEXT DEFAULT NULL,
  responsableDiagnostico TEXT DEFAULT NULL,
  fechaDiagnostico TIMESTAMPTZ DEFAULT NULL,
  trabajoPropuesto TEXT DEFAULT NULL,
  trabajoRealizado TEXT DEFAULT NULL,
  repuestosNecesarios TEXT DEFAULT NULL,
  repuestosUtilizados TEXT DEFAULT NULL,
  tiempoEstimado TEXT DEFAULT NULL,
  tiempoReparacion TEXT DEFAULT NULL,
  tecnico TEXT DEFAULT NULL,
  observacionesTecnico TEXT DEFAULT NULL,
  fechaReparacion TIMESTAMPTZ DEFAULT NULL,
  controlCalidad TEXT DEFAULT NULL,
  responsableCalidad TEXT DEFAULT NULL,
  fechaControlCalidad TIMESTAMPTZ DEFAULT NULL,
  responsableEntrega TEXT DEFAULT NULL,
  tecnicoEntrega TEXT DEFAULT NULL,
  observacionesFinales TEXT DEFAULT NULL,
  observacionesEntrega TEXT DEFAULT NULL,
  clienteConforme BOOLEAN DEFAULT FALSE,
  fechaEntrega TIMESTAMPTZ DEFAULT NULL,
  observaciones TEXT DEFAULT NULL,
  observacionesRecepcion TEXT DEFAULT NULL,
  historial JSONB DEFAULT '[]'::jsonb,
  ultimoEvento TEXT DEFAULT NULL,
  fechaUltimoEstado TIMESTAMPTZ DEFAULT NULL,
  clienteAprobo BOOLEAN DEFAULT FALSE,
  aprobacionOrigen TEXT DEFAULT NULL,
  medioAprobacion TEXT DEFAULT NULL,
  fechaAprobacionCliente TIMESTAMPTZ DEFAULT NULL,
  fechaRechazoCliente TIMESTAMPTZ DEFAULT NULL,
  motivoRechazoCliente TEXT DEFAULT NULL,
  costo NUMERIC(12,2) DEFAULT 0,
  progreso INTEGER NOT NULL DEFAULT 0 CHECK (progreso >= 0 AND progreso <= 7),
  fecha_ingreso DATE,
  fecha_actualizacion DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS telefono TEXT,
  ADD COLUMN IF NOT EXISTS marca TEXT,
  ADD COLUMN IF NOT EXISTS imei TEXT,
  ADD COLUMN IF NOT EXISTS serie TEXT,
  ADD COLUMN IF NOT EXISTS estadoEquipo TEXT,
  ADD COLUMN IF NOT EXISTS accesorios JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS codigoDesbloqueo TEXT,
  ADD COLUMN IF NOT EXISTS falla TEXT,
  ADD COLUMN IF NOT EXISTS diagnostico TEXT,
  ADD COLUMN IF NOT EXISTS responsableDiagnostico TEXT,
  ADD COLUMN IF NOT EXISTS fechaDiagnostico TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS trabajoPropuesto TEXT,
  ADD COLUMN IF NOT EXISTS trabajoRealizado TEXT,
  ADD COLUMN IF NOT EXISTS repuestosNecesarios TEXT,
  ADD COLUMN IF NOT EXISTS repuestosUtilizados TEXT,
  ADD COLUMN IF NOT EXISTS tiempoEstimado TEXT,
  ADD COLUMN IF NOT EXISTS tiempoReparacion TEXT,
  ADD COLUMN IF NOT EXISTS tecnico TEXT,
  ADD COLUMN IF NOT EXISTS observacionesTecnico TEXT,
  ADD COLUMN IF NOT EXISTS fechaReparacion TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS controlCalidad TEXT,
  ADD COLUMN IF NOT EXISTS responsableCalidad TEXT,
  ADD COLUMN IF NOT EXISTS fechaControlCalidad TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS responsableEntrega TEXT,
  ADD COLUMN IF NOT EXISTS tecnicoEntrega TEXT,
  ADD COLUMN IF NOT EXISTS observacionesFinales TEXT,
  ADD COLUMN IF NOT EXISTS observacionesEntrega TEXT,
  ADD COLUMN IF NOT EXISTS clienteConforme BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS fechaEntrega TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS observaciones TEXT,
  ADD COLUMN IF NOT EXISTS observacionesRecepcion TEXT,
  ADD COLUMN IF NOT EXISTS historial JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS ultimoEvento TEXT,
  ADD COLUMN IF NOT EXISTS fechaUltimoEstado TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS clienteAprobo BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS aprobacionOrigen TEXT,
  ADD COLUMN IF NOT EXISTS medio_aprobacion TEXT,
  ADD COLUMN IF NOT EXISTS cliente_aprobo BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS fecha_aprobacion_cliente TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS fecha_rechazo_cliente TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS motivo_rechazo_cliente TEXT,
  ADD COLUMN IF NOT EXISTS aprobacion_origen TEXT,
  ADD COLUMN IF NOT EXISTS costo NUMERIC(12,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS fecha_actualizacion DATE,
  ADD COLUMN IF NOT EXISTS fecha_ingreso DATE;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Orders are viewable by everyone"
ON public.orders FOR SELECT
USING (true);

CREATE POLICY "Orders are insertable by the app"
ON public.orders FOR INSERT
WITH CHECK (true);

CREATE POLICY "Orders are updatable by the app"
ON public.orders FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_orders_updated_at ON public.orders;
CREATE TRIGGER set_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Realtime: permite que mobiWEB reciba cambios de las órdenes de mobiOS.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'orders'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
  END IF;
END $$;
