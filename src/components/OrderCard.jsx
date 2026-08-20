import StatusBadge from './StatusBadge'

export default function OrderCard({ order }) {
  if (!order) {
    return null
  }

  const orderCode = order.codigo || order.id
  const clientName = order.cliente_nombre || order.cliente || order.client || 'Cliente demo'
  const deviceName = [order.dispositivo || order.device, order.modelo].filter(Boolean).join(' ')
  const lastUpdated = order.fechaActualizacion || order.date || 'Sin fecha'

  return (
    <div className="order-card card">
      <div className="order-card__header">
        <div>
          <span className="order-card__eyebrow">Orden</span>
          <h3>{orderCode}</h3>
        </div>
        <StatusBadge status={order.state || order.estado} />
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

      <div className="order-progress">
        {(order.stages || []).map((stage, index) => {
          const isActive = index <= Number(order.progress ?? order.progreso ?? 0)
          const isCurrent = index === Number(order.progress ?? order.progreso ?? 0)

          return (
            <div
              key={stage}
              className={['order-progress__step', isActive ? 'is-active' : '', isCurrent ? 'is-current' : ''].filter(Boolean).join(' ')}
            >
              <span>{stage}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
