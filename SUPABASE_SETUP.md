# Configuración de Supabase para mobiWEB

## 1. Crear la tabla principal

Crea una tabla llamada `orders` con estas columnas:

- id: bigint / identity primary key
- codigo: text unique not null
- cliente_nombre: text not null
- dispositivo: text not null
- modelo: text not null
- servicio: text not null
- estado: text not null
- fecha_ingreso: date
- fecha_actualizacion: date
- descripcion: text
- progreso: integer default 0
- created_at: timestamptz default now()
- updated_at: timestamptz default now()

Estados permitidos:
- Recepción
- Diagnóstico
- Esperando aprobación
- Reparación
- Listo para retirar
- Entregado

## 2. Variables de entorno

Crea un archivo `.env` local en la raíz del proyecto:

VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anon_publica

No subas el archivo `.env` al repositorio.

## 3. Configuración pública

mobiWEB solo debe usar la clave anónima pública de Supabase.
No se debe usar `SUPABASE_SERVICE_ROLE_KEY` en la app pública.

## 4. Campos que manda mobiOS

mobiOS debe enviar la información necesaria para cada orden:

- codigo
- cliente_nombre
- dispositivo
- modelo
- servicio
- estado
- fecha_ingreso
- fecha_actualizacion
- descripcion
- progreso

## 5. Campos que consulta mobiWEB

mobiWEB solo debe mostrar la información pública necesaria:

- codigo
- dispositivo
- modelo
- servicio
- estado
- fecha_ingreso
- fecha_actualizacion
- progreso
- mensaje público del estado

## 6. Seguridad

Se recomienda activar RLS (Row Level Security) y permitir lectura pública solo a columnas no sensibles.

## 7. Ejecutar el proyecto

1. Copia `.env.example` a `.env`
2. Rellena tus claves reales
3. Ejecuta:

npm install
npm run dev

## 8. Integración futura

Cuando mobiOS escriba en Supabase, mobiWEB puede leer esas mismas filas sin cambiar la estructura visual, siempre que mantenga los mismos nombres de columnas y estados.
