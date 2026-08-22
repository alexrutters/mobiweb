import { orderStatuses, sampleOrder } from '../data/orders'

const STORAGE_KEY = 'mobios_ordenes'

export const getOrderStages = () => orderStatuses

export const getStatusIndex = (status) => {
  const value = String(status ?? '').trim()
  const index = orderStatuses.indexOf(value)
  return index >= 0 ? index : 0
}

const normalizeOrderCode = (code = '') => {
  const value = String(code ?? '').trim().replace(/\s+/g, '').toUpperCase()
  if (!value) {
    return ''
  }

  if (value.startsWith('OT-')) {
    return value
  }

  return `OT-${value.replace(/^OT-/, '')}`
}

const normalizePublicState = (state = 'Recepción') => {
  const value = String(state ?? '').trim()
  return value || 'Recepción'
}

const readLocalOrders = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const toOrderCodeFromNumber = (numero) => {
  const value = Number(numero)
  if (!Number.isFinite(value)) {
    return ''
  }

  return `OT-${String(value).padStart(6, '0')}`
}

const mapLocalOrderToPublic = (record) => {
  if (!record || typeof record !== 'object') {
    return null
  }

  const numero = Number(record.numero ?? record.id ?? 0)
  const estado = normalizePublicState(record.estado || record.state || 'Recepción')
  const codigo = String(record.codigo || toOrderCodeFromNumber(numero) || record.id || '').trim()
  const deviceName = [record.dispositivo || record.equipo || record.device, record.modelo].filter(Boolean).join(' ')
  const lastUpdated = record.fechaUltimoEstado || record.fechaActualizacion || record.fecha || record.fechaIngreso || record.date || 'Sin fecha'

  const publicOrder = {
    id: codigo || String(record.id || numero || 'sin-codigo'),
    codigo: codigo || toOrderCodeFromNumber(numero) || String(record.id || 'sin-codigo'),
    cliente: record.cliente_nombre || record.cliente || 'Cliente',
    cliente_nombre: record.cliente_nombre || record.cliente || 'Cliente',
    dispositivo: record.dispositivo || record.equipo || 'Dispositivo',
    modelo: record.modelo || 'Modelo',
    servicio: record.servicio || record.falla || 'Servicio',
    estado,
    state: estado,
    fechaIngreso: record.fecha_ingreso || record.fechaIngreso || record.fecha || 'Sin fecha',
    fechaActualizacion: lastUpdated,
    date: lastUpdated,
    descripcion: record.descripcion || record.observaciones || 'Tu equipo está en proceso de revisión.',
    progreso: Number(record.progreso ?? record.progress ?? orderStatuses.indexOf(estado) ?? 0),
    progress: Number(record.progreso ?? record.progress ?? orderStatuses.indexOf(estado) ?? 0),
    stages: orderStatuses,
  }

  return publicOrder
}

const findLocalOrderByCode = (code = '') => {
  const normalizedCode = normalizeOrderCode(code)
  if (!normalizedCode || normalizedCode === 'OT-') {
    return null
  }

  const ordenes = readLocalOrders()

  return ordenes.find((orden) => {
    const recordCodigo = String(orden.codigo || '').trim()
    const numero = Number(orden.numero ?? 0)
    const computedCode = numero ? toOrderCodeFromNumber(numero) : ''
    const idCode = String(orden.id || '').trim()

    return [recordCodigo, computedCode, idCode].some((value) => {
      if (!value) {
        return false
      }
      return normalizeOrderCode(value) === normalizedCode
    })
  }) || null
}

export const findOrderByCode = async (code = '') => {
  const rawCode = String(code ?? '').trim()
  const normalizedCode = normalizeOrderCode(rawCode)

  if (!normalizedCode || normalizedCode === 'OT-') {
    return { found: false, order: null, message: 'Introduce un código de orden válido.' }
  }

  try {
    const localOrder = findLocalOrderByCode(normalizedCode)

    if (!localOrder) {
      return {
        found: false,
        order: null,
        message: 'No encontramos una orden con ese número. Verifica el código e inténtalo nuevamente.',
      }
    }

    const publicOrder = mapLocalOrderToPublic(localOrder)

    if (!publicOrder) {
      return {
        found: false,
        order: null,
        message: 'No encontramos una orden con ese número. Verifica el código e inténtalo nuevamente.',
      }
    }

    return { found: true, order: publicOrder, message: 'Orden encontrada.' }
  } catch (error) {
    console.error('Error buscando orden local:', error)
    return {
      found: false,
      order: null,
      message: 'No encontramos una orden con ese número. Verifica el código e inténtalo nuevamente.',
      error,
    }
  }
}

export const getSampleOrder = () => sampleOrder
