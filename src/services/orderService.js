import { orderStatuses, sampleOrder } from '../data/orders'
import { hasSupabaseConfig } from '../lib/supabase'

export const getOrderStages = () => orderStatuses

export const getStatusIndex = (status) => {
  const index = orderStatuses.indexOf(status)
  return index >= 0 ? index : 0
}

const normalizeOrderCode = (code = '') => {
  const value = String(code ?? '').trim().replace(/\s+/g, '').toUpperCase()
  return value.startsWith('OT-') ? value : `OT-${value}`
}

const normalizePublicState = (state = 'Recepción') => {
  if (state === 'Calidad' || state === 'Control de calidad') {
    return 'Listo para retirar'
  }

  return state
}

const mapOrderFromSupabase = (record) => {
  const estado = normalizePublicState(record.estado || 'Recepción')

  return {
    id: record.codigo || record.id,
    codigo: record.codigo || record.id,
    cliente: record.cliente_nombre || record.cliente || 'Cliente',
    cliente_nombre: record.cliente_nombre || record.cliente || 'Cliente',
    dispositivo: record.dispositivo || 'Dispositivo',
    modelo: record.modelo || 'Modelo',
    servicio: record.servicio || 'Servicio',
    estado,
    state: estado,
    fechaIngreso: record.fecha_ingreso || record.fechaIngreso || 'Sin fecha',
    fechaActualizacion: record.fecha_actualizacion || record.fechaActualizacion || 'Sin fecha',
    date: record.fecha_actualizacion || record.fechaActualizacion || 'Sin fecha',
    descripcion: record.descripcion || 'Tu equipo está en proceso de revisión.',
    progreso: Number(record.progreso ?? 0),
    progress: Number(record.progreso ?? 0),
    stages: orderStatuses,
  }
}

export const findOrderByCode = async (code = '') => {
  const normalizedCode = normalizeOrderCode(code)

  if (!normalizedCode || normalizedCode === 'OT-') {
    return { found: false, order: null, message: 'Introduce un código de orden válido.' }
  }

  if (!hasSupabaseConfig) {
    return {
      found: false,
      order: null,
      message: 'No encontramos una orden con ese número. Verifica el código e inténtalo nuevamente.',
    }
  }

  try {
    const { createSupabaseClient } = await import('../lib/supabase')
    const supabase = createSupabaseClient()

    if (!supabase) {
      return {
        found: false,
        order: null,
        message: 'No encontramos una orden con ese número. Verifica el código e inténtalo nuevamente.',
      }
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
      return {
        found: false,
        order: null,
        message: 'No encontramos una orden con ese número. Verifica el código e inténtalo nuevamente.',
      }
    }

    return { found: true, order: mapOrderFromSupabase(data), message: 'Orden encontrada.' }
  } catch (error) {
    return {
      found: false,
      order: null,
      message: 'No encontramos una orden con ese número. Verifica el código e inténtalo nuevamente.',
      error,
    }
  }
}

export const getSampleOrder = () => sampleOrder
