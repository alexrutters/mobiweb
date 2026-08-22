CREATE TABLE IF NOT EXISTS public.orders (
  id BIGSERIAL PRIMARY KEY,
  codigo TEXT UNIQUE NOT NULL,
  cliente_nombre TEXT NOT NULL,
  dispositivo TEXT NOT NULL,
  modelo TEXT NOT NULL,
  servicio TEXT NOT NULL,
  estado TEXT NOT NULL CHECK (
    estado IN (
      'Recepción',
      'Diagnóstico',
      'Esperando aprobación',
      'Reparación',
      'Listo para retirar',
      'Entregado'
    )
  ),
  fecha_ingreso DATE,
  fecha_actualizacion DATE,
  descripcion TEXT,
  progreso INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

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
