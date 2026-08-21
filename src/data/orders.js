export const orderStatuses = [
  'Recepción',
  'Diagnóstico',
  'Esperando aprobación',
  'Reparación',
  'Listo para retirar',
  'Entregado',
]

export const demoOrders = [
  {
    id: 'MF-2026-001',
    codigo: 'MF-2026-001',
    cliente: 'María García',
    cliente_nombre: 'María García',
    dispositivo: 'iPhone',
    modelo: 'iPhone 15 Pro',
    servicio: 'Cambio de batería',
    estado: 'Diagnóstico',
    state: 'Diagnóstico',
    fechaIngreso: '2026-08-14',
    fechaActualizacion: '2026-08-20',
    date: '2026-08-20',
    descripcion: 'El equipo presenta apagados repentinos y rendimiento reducido durante el uso.',
    progreso: 2,
    progress: 2,
    stages: orderStatuses,
  },
  {
    id: 'MF-2026-002',
    codigo: 'MF-2026-002',
    cliente: 'Carlos Ruiz',
    cliente_nombre: 'Carlos Ruiz',
    dispositivo: 'iPhone',
    modelo: 'iPhone 14',
    servicio: 'Cambio de pantalla',
    estado: 'Esperando aprobación',
    state: 'Esperando aprobación',
    fechaIngreso: '2026-08-12',
    fechaActualizacion: '2026-08-19',
    date: '2026-08-19',
    descripcion: 'Pantalla rota en la zona inferior y pérdida parcial de respuesta táctil.',
    progreso: 3,
    progress: 3,
    stages: orderStatuses,
  },
  {
    id: 'MF-2026-003',
    codigo: 'MF-2026-003',
    cliente: 'Ana López',
    cliente_nombre: 'Ana López',
    dispositivo: 'iPad',
    modelo: 'iPad Air',
    servicio: 'Reparación de iPad',
    estado: 'Reparación',
    state: 'Reparación',
    fechaIngreso: '2026-08-10',
    fechaActualizacion: '2026-08-18',
    date: '2026-08-18',
    descripcion: 'Cierre del equipo con fallas de carga y rendimiento irregular.',
    progreso: 4,
    progress: 4,
    stages: orderStatuses,
  },
  {
    id: 'MF-2026-005',
    codigo: 'MF-2026-005',
    cliente: 'Laura Méndez',
    cliente_nombre: 'Laura Méndez',
    dispositivo: 'iPhone',
    modelo: 'iPhone 13',
    servicio: 'Cambio de batería',
    estado: 'Listo para retirar',
    state: 'Listo para retirar',
    fechaIngreso: '2026-08-01',
    fechaActualizacion: '2026-08-16',
    date: '2026-08-16',
    descripcion: 'Batería degradada y apagados inesperados. Revisión final completada.',
    progreso: 6,
    progress: 6,
    stages: orderStatuses,
  },
]

export const sampleOrder = demoOrders[0]

export const getOrderByCodeDemo = (code = '') => {
  const normalizedCode = String(code ?? '').trim().replace(/\s+/g, '').toUpperCase()

  if (!normalizedCode) {
    return null
  }

  return demoOrders.find((order) => (order.codigo || order.id).toUpperCase() === normalizedCode) || null
}
