import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../components/Button'
import OrderCard from '../components/OrderCard'
import SectionTitle from '../components/SectionTitle'
import { orderStatusMessages } from '../data/orderStatusMessages'
import { findOrderByCode, getStatusIndex } from '../services/orderService'

export default function TrackingPage() {
  const location = useLocation()
  const [codigoIngresado, setCodigoIngresado] = useState('')
  const [ordenEncontrada, setOrdenEncontrada] = useState(null)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const currentIndex = useMemo(
    () => (ordenEncontrada ? getStatusIndex(ordenEncontrada.state || ordenEncontrada.estado) : 0),
    [ordenEncontrada],
  )

  const consultarOrden = async (codigo) => {
    const codigoLimpio = String(codigo ?? '').trim()

    console.log('CODIGO INGRESADO:', codigoLimpio)

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
          <div className="tracking-result">
            <OrderCard order={ordenEncontrada} />

            <div className="status-progress card">
              <h3>Progreso de reparación</h3>
              <div className="status-progress__bar">
                <span style={{ width: `${((currentIndex + 1) / (ordenEncontrada.stages?.length || 1)) * 100}%` }} />
              </div>
              <div className="status-progress__steps">
                {(ordenEncontrada.stages || []).map((stage, index) => (
                  <div
                    key={stage}
                    className={['status-progress__step', index <= currentIndex ? 'is-done' : ''].filter(Boolean).join(' ')}
                  >
                    <span>{stage}</span>
                  </div>
                ))}
              </div>

              <div className="tracking-status-message">
                <strong>{ordenEncontrada.codigo || ordenEncontrada.id}</strong>
                <p>{currentMessage}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
