import { useMemo, useState } from 'react'
import Button from '../components/Button'
import OrderCard from '../components/OrderCard'
import SectionTitle from '../components/SectionTitle'
import { orderStatusMessages } from '../data/orderStatusMessages'
import { findOrderByCode, getStatusIndex } from '../services/orderService'

export default function TrackingPage() {
  const [code, setCode] = useState('')
  const [order, setOrder] = useState(null)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const currentIndex = useMemo(
    () => (order ? getStatusIndex(order.state || order.estado) : 0),
    [order],
  )

  const handleSubmit = async (event) => {
    event.preventDefault()

    const normalizedCode = code.trim()

    if (!normalizedCode) {
      setOrder(null)
      setStatus('empty')
      setMessage('Introduce un código de orden para consultar el estado de tu reparación.')
      return
    }

    setIsLoading(true)
    setStatus('loading')
    setMessage('Consultando tu orden...')

    const result = await findOrderByCode(normalizedCode)

    setIsLoading(false)

    if (result.found && result.order) {
      setOrder(result.order)
      setStatus('found')
      setMessage(orderStatusMessages[result.order.state || result.order.estado] || 'Tu equipo está en proceso de revisión.')
      return
    }

    setOrder(null)
    setStatus(result.error ? 'error' : 'not_found')
    setMessage(result.message || 'No encontramos una reparación con ese código. Revisa la información e inténtalo nuevamente.')
  }

  const currentMessage = order ? (orderStatusMessages[order.state || order.estado] || 'Tu equipo está en proceso de revisión.') : message

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
            value={code}
            onChange={(e) => setCode(e.target.value)}
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

        {order && (
          <div className="tracking-result">
            <OrderCard order={order} />

            <div className="status-progress card">
              <h3>Progreso de reparación</h3>
              <div className="status-progress__bar">
                <span style={{ width: `${((currentIndex + 1) / (order.stages?.length || 1)) * 100}%` }} />
              </div>
              <div className="status-progress__steps">
                {(order.stages || []).map((stage, index) => (
                  <div
                    key={stage}
                    className={['status-progress__step', index <= currentIndex ? 'is-done' : ''].filter(Boolean).join(' ')}
                  >
                    <span>{stage}</span>
                  </div>
                ))}
              </div>

              <div className="tracking-status-message">
                <strong>{order.codigo || order.id}</strong>
                <p>{currentMessage}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
