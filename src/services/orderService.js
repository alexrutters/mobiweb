import { createSupabaseClient, hasSupabaseConfig } from '../lib/supabase'
import { orderStatuses } from '../data/orders'

const STATE_PROGRESS_MAP = {
  Recepción: 1,
  Diagnóstico: 2,
  'Esperando aprobación': 3,
  Reparación: 4,
  'Control de calidad': 5,
  'Listo para retirar': 6,
  Entregado: 7,
  'Rechazo cliente': 0,
}

export const getOrderStages = () => orderStatuses

export const getStateProgress = (state = 'Recepción') => {
  const safeState = String(state ?? '').trim()
  return STATE_PROGRESS_MAP[safeState] ?? 1
}

export const getStatusIndex = (status) => {
  const value = String(status ?? '').trim()
  const index = orderStatuses.indexOf(value)
  return index >= 0 ? index : 0
}

export const normalizeOrderCode = (code = '') => {
  const value = String(code ?? '').trim().replace(/\s+/g, '').toUpperCase()
  if (!value) {
    return ''
  }

  if (value.startsWith('OT-')) {
    return value
  }

  return `OT-${value.replace(/^OT-/, '')}`
}

const normalizeState = (state = 'Recepción') => {
  const value = String(state ?? '').trim()
  return value || 'Recepción'
}

const pick = (record, ...keys) => {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null) return record[key]
  }
  return undefined
}

export const mapSupabaseOrderToLocal = (record) => {
  if (!record || typeof record !== 'object') {
    return null
  }

  const estado = normalizeState(record.estado ?? record.state ?? 'Recepción')
  const codigo = String(record.codigo ?? '').trim() || `OT-${String(record.id ?? '').padStart(6, '0')}`
  const costoValue = Number(pick(record, 'costo', 'coste') ?? 0)
  const fechaActualizacion =
    record.fecha_actualizacion ?? record.date ?? record.updated_at ?? record.created_at ?? record.fechaIngreso ?? 'Sin fecha'
  const clienteNombre = record.cliente_nombre ?? record.cliente ?? 'Cliente'
  const aprobacionOrigen = String(
    record.aprobacion_origen ?? record.aprobacionOrigen ?? record.medio_aprobacion ?? record.medioAprobacion ?? ''
  ).trim()
  const estadoAprobacion = Boolean(record.cliente_aprobo ?? pick(record, 'clienteAprobo', 'clienteaprobo') ?? false)
  const aprobacionWeb = aprobacionOrigen.toLowerCase() === 'web' || record.medio_aprobacion === 'web' || record.medioAprobacion === 'web'
  const clienteAprobo = Boolean(estadoAprobacion || aprobacionWeb)
  const progreso = Number(record.progreso ?? getStateProgress(estado))

  return {
    id: record.id ?? codigo,
    codigo,
    cliente: clienteNombre,
    cliente_nombre: clienteNombre,
    dispositivo: record.dispositivo ?? record.device ?? 'Dispositivo',
    modelo: record.modelo ?? 'Modelo',
    servicio: record.servicio ?? 'Servicio',
    estado,
    state: estado,
    diagnostico: typeof record.diagnostico === 'string' ? record.diagnostico : '',
    trabajoPropuesto: pick(record, 'trabajoPropuesto', 'trabajopropuesto') ?? record.trabajo ?? record.trabajoARealizar ?? '',
    costo: Number.isFinite(costoValue) ? costoValue : 0,
    fechaIngreso: record.fecha_ingreso ?? record.fechaIngreso ?? 'Sin fecha',
    fechaActualizacion,
    date: fechaActualizacion,
    descripcion: typeof record.descripcion === 'string' && record.descripcion.trim() ? record.descripcion : 'Tu equipo está en proceso de revisión.',
    aprobacion_origen: aprobacionOrigen || (clienteAprobo ? 'web' : ''),
    aprobacionOrigen: aprobacionOrigen || (clienteAprobo ? 'web' : ''),
    medio_aprobacion: record.medio_aprobacion ?? record.medioAprobacion ?? '',
    medioAprobacion: record.medio_aprobacion ?? record.medioAprobacion ?? '',
    cliente_aprobo: clienteAprobo,
    clienteAprobo: clienteAprobo,
    fecha_aprobacion_cliente: record.fecha_aprobacion_cliente ?? pick(record, 'fechaAprobacionCliente', 'fecha_aprobacion_cliente') ?? '',
    fechaAprobacionCliente: record.fecha_aprobacion_cliente ?? pick(record, 'fechaAprobacionCliente', 'fecha_aprobacion_cliente') ?? '',
    progreso,
    progress: progreso,
    stages: orderStatuses,
    updated_at: record.updated_at ?? '',
    created_at: record.created_at ?? '',
  }
}

export const subscribeToOrderRealtime = (codigo, onOrderChange) => {
  if (!hasSupabaseConfig || typeof onOrderChange !== 'function') {
    return null
  }

  const supabase = createSupabaseClient()
  if (!supabase) {
    return null
  }

  const normalizedCode = normalizeOrderCode(codigo)
  if (!normalizedCode || normalizedCode === 'OT-') {
    return null
  }

  const refreshOrder = async () => {
    const result = await findOrderByCode(normalizedCode)

    if (result?.found && result.order) {
      onOrderChange(result.order)
      return
    }

    if (result?.message === 'Orden no encontrada') {
      onOrderChange(null)
    }
  }

  const channel = supabase
    .channel(`orders-tracking-${normalizedCode}-${Date.now()}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'orders',
        filter: `codigo=eq.${normalizedCode}`,
      },
      () => {
        // Reconsultamos la fila completa para que la web siempre muestre
        // el estado real de Supabase y no un payload parcial o antiguo.
        void refreshOrder()
      },
    )
    .subscribe((status, error) => {
      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        console.error('Error en Supabase Realtime para la orden:', normalizedCode, error)
      }
    })

  // Fallback de sincronización: si Realtime aún no está habilitado en el proyecto,
  // la orden abierta sigue leyendo la fuente central cada 3 segundos.
  const pollingId = window.setInterval(() => {
    void refreshOrder()
  }, 3000)

  const originalUnsubscribe = channel.unsubscribe.bind(channel)
  channel.unsubscribe = async (...args) => {
    window.clearInterval(pollingId)
    return originalUnsubscribe(...args)
  }

  return channel
}

export const findOrderByCode = async (code = '') => {
  const rawCode = String(code ?? '').trim()
  const normalizedCode = normalizeOrderCode(rawCode)

  if (!normalizedCode || normalizedCode === 'OT-') {
    return { found: false, order: null, message: 'Orden no encontrada' }
  }

  if (!hasSupabaseConfig) {
    return {
      found: false,
      order: null,
      message: 'No fue posible consultar la orden en este momento.',
    }
  }

  try {
    const supabase = createSupabaseClient()
    if (!supabase) {
      return {
        found: false,
        order: null,
        message: 'No fue posible consultar la orden en este momento.',
      }
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('codigo', normalizedCode)
      .maybeSingle()

    if (error) {
      console.error('Error consultando orden desde Supabase:', error)
      return {
        found: false,
        order: null,
        message: 'No fue posible consultar la orden en este momento.',
        error,
      }
    }

    if (!data) {
      return {
        found: false,
        order: null,
        message: 'Orden no encontrada',
      }
    }

    const localOrder = mapSupabaseOrderToLocal(data)
    if (!localOrder) {
      return {
        found: false,
        order: null,
        message: 'La orden existe pero no se pudo transformar en un seguimiento válido.',
      }
    }

    return { found: true, order: localOrder, message: 'Orden encontrada.' }
  } catch (error) {
    console.error('Error buscando orden en Supabase:', error)
    return {
      found: false,
      order: null,
      message: 'No fue posible consultar la orden en este momento.',
      error,
    }
  }
}

export const approveOrderByCode = async (code = '') => {
  const normalizedCode = normalizeOrderCode(String(code ?? '').trim())

  if (!normalizedCode || normalizedCode === 'OT-') {
    return { success: false, order: null, message: 'Introduce un código de orden válido.' }
  }

  if (!hasSupabaseConfig) {
    return {
      success: false,
      order: null,
      message: 'La aprobación no está disponible porque Supabase no está configurado.',
    }
  }

  try {
    const supabase = createSupabaseClient()
    if (!supabase) {
      return {
        success: false,
        order: null,
        message: 'La aprobación no está disponible en este momento.',
      }
    }

    const existing = await supabase
      .from('orders')
      .select('*')
      .eq('codigo', normalizedCode)
      .maybeSingle()

    if (existing.error) {
      console.error('Error consultando la OT antes de aprobar desde Supabase:', existing.error)
      return {
        success: false,
        order: null,
        message: existing.error.message || 'No se pudo consultar la orden antes de aprobarla.',
        error: existing.error,
      }
    }

    if (!existing.data) {
      return {
        success: false,
        order: null,
        message: 'No encontramos la orden para aprobar.',
      }
    }

    const currentOrder = mapSupabaseOrderToLocal(existing.data)
    if (currentOrder?.cliente_aprobo) {
      return {
        success: true,
        order: currentOrder,
        message: 'El cliente aprobó la reparación desde la web.',
      }
    }

    if (String(existing.data.estado || '').trim() !== 'Esperando aprobación') {
      return {
        success: false,
        order: currentOrder,
        message: 'La orden ya no está en Esperando aprobación.',
      }
    }

    const nextState = 'Reparación'
    const now = new Date().toISOString()
    const today = now.slice(0, 10)
    const nextProgress = getStateProgress(nextState)

    const approvalPayload = {
      estado: nextState,
      progreso: nextProgress,
      aprobacion_origen: 'web',
      medio_aprobacion: 'web',
      cliente_aprobo: true,
      fecha_aprobacion_cliente: now,
      fecha_actualizacion: today,
      updated_at: now,
    }

    const { data, error } = await supabase
      .from('orders')
      .update(approvalPayload)
      .eq('codigo', normalizedCode)
      .select('*')
      .maybeSingle()

    if (error) {
      console.error('Error aprobando la reparación desde Supabase:', error)
      return {
        success: false,
        order: null,
        message: error.message || 'No se pudo aprobar la reparación en este momento.',
        error,
      }
    }

    if (!data) {
      return {
        success: false,
        order: null,
        message: 'La aprobación no afectó ninguna fila válida en Supabase.',
      }
    }

    const approvedOrder = mapSupabaseOrderToLocal(data)
    return {
      success: true,
      order: approvedOrder,
      message: 'La reparación fue aprobada correctamente.',
    }
  } catch (error) {
    console.error('Error en la aprobación pública:', error)
    return {
      success: false,
      order: null,
      message: error?.message || 'No se pudo aprobar la reparación en este momento.',
      error,
    }
  }
}

export const getSampleOrder = () => null
