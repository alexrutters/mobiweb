export default function StatusBadge({ status }) {
  const normalized = String(status ?? '').toLowerCase()

  let className = 'status-badge '

  if (normalized.includes('diagnóstico') || normalized.includes('reparación') || normalized.includes('calidad')) {
    className += 'status-badge--primary'
  } else if (normalized.includes('listo') || normalized.includes('entregado')) {
    className += 'status-badge--success'
  } else if (normalized.includes('aprobación') || normalized.includes('esperando')) {
    className += 'status-badge--warning'
  } else {
    className += 'status-badge--muted'
  }

  return <span className={className}>{status}</span>
}
