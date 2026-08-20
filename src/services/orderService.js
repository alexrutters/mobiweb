import { orderStatuses, sampleOrder, getOrderByCodeDemo } from '../data/orders'
import { hasSupabaseConfig } from '../lib/supabase'

export const getOrderStages = () => orderStatuses

export const getStatusIndex = (status) => {
  const index = orderStatuses.indexOf(status)
  return index >= 0 ? index : 0
}

const normalizeOrderCode = (code = '') => String(code ?? '').trim().replace(/\s+/g, '').toUpperCase()

const mapOrderFromSupabase = (record) => ({
  id: record.codigo || record.id,
  codigo: record.codigo || record.id,
  cliente: record.cliente_nombre || record.cliente || 'Cliente demo',
  cliente_nombre: record.cliente_nombre || record.cliente || 'Cliente demo',
  dispositivo: record.dispositivo || 'Dispositivo',
  modelo: record.modelo || 'Modelo',
  servicio: record.servicio || 'Servicio',
  estado: record.estado || 'Recepción',
  state: record.estado || 'Recepción',
  fechaIngreso: record.fecha_ingreso || record.fechaIngreso || 'Sin fecha',
  fechaActualizacion: record.fecha_actualizacion || record.fechaActualizacion || 'Sin fecha',
  date: record.fecha_actualizacion || record.fechaActualizacion || 'Sin fecha',
  descripcion: record.descripcion || 'Tu equipo está en proceso de revisión.',
  progreso: Number(record.progreso ?? 0),
  progress: Number(record.progreso ?? 0),
  stages: orderStatuses,
})

export const findOrderByCode = async (code = '') => {
  const normalizedCode = normalizeOrderCode(code)

  if (!normalizedCode) {
    return { found: false, order: null, message: 'Introduce un código de orden válido.' }
  }

  if (!hasSupabaseConfig) {
    const demoOrder = getOrderByCodeDemo(normalizedCode)

    if (!demoOrder) {
      return { found: false, order: null, message: 'No encontramos una reparación con ese código. Revisa la información e inténtalo nuevamente.' }
    }

    return { found: true, order: demoOrder, message: 'Orden encontrada.' }
  }

  try {
    const { createSupabaseClient } = await import('../lib/supabase')
    const supabase = await createSupabaseClient()

    if (!supabase) {
      return { found: false, order: null, message: 'La conexión con Supabase no está configurada todavía.' }
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('codigo', normalizedCode)
      .maybeSingle()

    if (error) {
      throw error
    }

    if (!data) {
      return { found: false, order: null, message: 'No encontramos una reparación con ese código. Revisa la información e inténtalo nuevamente.' }
    }

    return { found: true, order: mapOrderFromSupabase(data), message: 'Orden encontrada.' }
  } catch (error) {
    return {
      found: false,
      order: null,
      message: 'No pudimos consultar la orden en este momento. Inténtalo de nuevo más tarde.',
      error,
    }
  }
}

export const getSampleOrder = () => sampleOrder
