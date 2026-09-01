import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../components/Button'
import OrderCard from '../components/OrderCard'
import SectionTitle from '../components/SectionTitle'
import { orderStatusMessages } from '../data/orderStatusMessages'
import { approveOrderByCode, findOrderByCode, subscribeToOrderRealtime } from '../services/orderService'

export default function TrackingPage() {
  const location = useLocation()
  const [codigoIngresado, setCodigoIngresado] = useState('')
  const [ordenEncontrada, setOrdenEncontrada] = useState(null)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isApproving, setIsApproving] = useState(false)

  useEffect(() => {
    if (!ordenEncontrada?.codigo) {
      return undefined
    }

    const channel = subscribeToOrderRealtime(ordenEncontrada.codigo, (nextOrder) => {
      if (!nextOrder) {
        setOrdenEncontrada(null)
        setStatus('not_found')
        setMessage('Orden no encontrada')
        return
      }

      setOrdenEncontrada(nextOrder)
      setStatus('found')
      setMessage(orderStatusMessages[nextOrder.state || nextOrder.estado] || 'Tu equipo está en proceso de revisión.')
    })

    return () => {
      if (channel?.unsubscribe) {
        channel.unsubscribe()
      }
    }
  }, [ordenEncontrada?.codigo])

  const consultarOrden = async (codigo) => {
    const codigoLimpio = String(codigo ?? '').trim()

    setOrdenEncontrada(null)

    if (!codigoLimpio) {
      setStatus('empty')
      setMessage('Introduce un código de orden para consultar el estado de tu reparación.')
      return
    }

    setIsLoading(true)
    setStatus('loading')
    setMessage('Consultando tu orden...')

    const result = await findOrderByCode(codigoLimpio)

    setIsLoading(false)

    if (result && result.found && result.order) {
      setOrdenEncontrada(result.order)
      setStatus('found')
      setMessage(orderStatusMessages[result.order.state || result.order.estado] || 'Tu equipo está en proceso de revisión.')
      return
    }

    setOrdenEncontrada(null)
    setStatus(result && result.error ? 'error' : 'not_found')
    setMessage(result && result.message ? result.message : 'No encontramos una orden con ese código.')
  }

  const handleApproveOrder = async () => {
    if (!ordenEncontrada?.codigo || ordenEncontrada.estado !== 'Esperando aprobación') {
      return
    }

    setIsApproving(true)
    setMessage('Aprobando reparación...')

    try {
      const result = await approveOrderByCode(ordenEncontrada.codigo)

      if (result && result.success && result.order) {
        setOrdenEncontrada(result.order)
        setStatus('found')
        setMessage(
          result.order.cliente_aprobo ? 'El cliente aprobó la reparación desde la web.' : 'La reparación fue aprobada y la orden avanzó a Reparación.'
        )
        return
      }

      setStatus(result && result.error ? 'error' : 'not_found')
      setMessage(result && result.message ? result.message : 'No se pudo aprobar la reparación.')
    } catch (error) {
      console.error('Error aprobando la reparación:', error)
      setStatus('error')
      setMessage(error?.message || 'No se pudo aprobar la reparación. Inténtalo nuevamente.')
    } finally {
      setIsApproving(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await consultarOrden(codigoIngresado)
  }

  useEffect(() => {
    const incomingCode = location.state?.codigo

    if (!incomingCode) {
      return
    }

    setCodigoIngresado(String(incomingCode).trim())
    void consultarOrden(String(incomingCode).trim())
  }, [location.state])

  const currentMessage = ordenEncontrada ? (orderStatusMessages[ordenEncontrada.state || ordenEncontrada.estado] || 'Tu equipo está en proceso de revisión.') : message

  return (
    <section className="page-shell section">
      <div className="container tracking-layout">
        <SectionTitle
          eyebrow="Seguimiento"
          title="Consulta el estado de tu reparación"
          description="Ingresa tu número de orden para ver el progreso actual de tu equipo."
        />

        <form className="tracking-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={codigoIngresado}
            onChange={(e) => setCodigoIngresado(e.target.value)}
            placeholder="Número de orden"
            aria-label="Número de orden"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Consultando...' : 'Consultar orden'}
          </Button>
        </form>

        {status === 'loading' && (
          <div className="card empty-state">
            <p>{message}</p>
          </div>
        )}

        {status === 'empty' && (
          <div className="card empty-state">
            <p>{message}</p>
          </div>
        )}

        {status === 'not_found' && (
          <div className="card empty-state">
            <p>{message}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="card empty-state">
            <p>{message}</p>
          </div>
        )}

        {ordenEncontrada && (
          <div className="tracking-result tracking-result--single">
            <OrderCard order={ordenEncontrada} />

            {ordenEncontrada.estado === 'Esperando aprobación' && !ordenEncontrada.cliente_aprobo ? (
              <div className="card" style={{ marginTop: 16, padding: 20 }}>
                <h3 style={{ margin: '0 0 16px' }}>Diagnóstico y aprobación</h3>

                <div style={{ display: 'grid', gap: 12 }}>
                  {ordenEncontrada.diagnostico ? (
                    <div>
                      <strong style={{ display: 'block', marginBottom: 6 }}>Diagnóstico</strong>
                      <div>{ordenEncontrada.diagnostico}</div>
                    </div>
                  ) : null}

                  {ordenEncontrada.trabajoPropuesto ? (
                    <div>
                      <strong style={{ display: 'block', marginBottom: 6 }}>Trabajo a realizar</strong>
                      <div>{ordenEncontrada.trabajoPropuesto}</div>
                    </div>
                  ) : null}

                  {Number(ordenEncontrada.costo ?? 0) > 0 ? (
                    <div>
                      <strong style={{ display: 'block', marginBottom: 6 }}>Costo</strong>
                      <div>${Number(ordenEncontrada.costo).toLocaleString('es-CL')}</div>
                    </div>
                  ) : null}
                </div>

                <div style={{ marginTop: 18 }}>
                  <Button onClick={handleApproveOrder} disabled={isApproving}>
                    {isApproving ? 'Aprobando...' : 'Aprobar reparación'}
                  </Button>
                </div>
              </div>
            ) : null}

            {ordenEncontrada.cliente_aprobo && ordenEncontrada.estado === 'Reparación' ? (
              <div className="card" style={{ marginTop: 16, padding: 20 }}>
                <h3 style={{ margin: '0 0 16px' }}>Reparación aprobada</h3>
                <p style={{ margin: 0 }}>El cliente aprobó la reparación desde la web.</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  )
}
