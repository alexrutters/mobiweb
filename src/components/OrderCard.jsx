import StatusBadge from './StatusBadge'
import { orderStatusMessages } from '../data/orderStatusMessages'

export default function OrderCard({ order }) {
  if (!order) {
    return null
  }

  const orderCode = order.codigo || order.id
  const clientName = order.cliente_nombre || order.cliente || order.client || 'Cliente demo'
  const deviceName = [order.dispositivo || order.device, order.modelo].filter(Boolean).join(' ')
  const lastUpdated = order.fechaActualizacion || order.date || 'Sin fecha'
  const currentState = order.state || order.estado || 'Recepción'
  const currentMessage = orderStatusMessages[currentState] || 'Tu equipo está en proceso de revisión.'

  return (
    <div className="order-card card">
      <div className="order-card__header">
        <div>
          <span className="order-card__eyebrow">Orden</span>
          <h3>{orderCode}</h3>
        </div>
        <StatusBadge status={currentState} />
      </div>

      <div className="order-card__details">
        <div>
          <span>Cliente</span>
          <strong>{clientName}</strong>
        </div>
        <div>
          <span>Equipo</span>
          <strong>{deviceName}</strong>
        </div>
        <div>
          <span>Última actualización</span>
          <strong>{lastUpdated}</strong>
        </div>
      </div>

      <div className="order-card__summary">
        <div className="order-card__summary-item">
          <span>Estado actual</span>
          <strong>{currentState}</strong>
        </div>
        <div className="order-card__summary-item">
          <span>Progreso</span>
          <strong>{Number(order.progress ?? order.progreso ?? 0)}/7</strong>
        </div>
      </div>

      <div className="order-card__message">
        {currentMessage}
      </div>

      <div className="order-progress">
        {(order.stages || []).map((stage, index) => {
          const currentIndex = order.stages?.indexOf(currentState) ?? 0
          const isCurrent = String(stage) === String(currentState)
          const isCompleted = index < currentIndex
          const isPending = index > currentIndex

          return (
            <div
              key={stage}
              className={[
                'order-progress__step',
                isCompleted ? 'is-completed' : '',
                isCurrent ? 'is-active' : '',
                isCurrent ? 'is-current' : '',
                isPending ? 'is-pending' : '',
              ].filter(Boolean).join(' ')}
            >
              <span>{stage}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
