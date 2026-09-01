import SectionTitle from '../components/SectionTitle'

const portalCards = [
  'Mis órdenes',
  'Mis equipos',
  'Historial de servicios',
]

export default function PortalPage() {
  return (
    <section className="page-shell section">
      <div className="container">
        <SectionTitle
          eyebrow="Portal del cliente"
          title="Accede a tu información de cliente"
          description="Una vista inicial del futuro portal conectado con mobiOS y tus órdenes reales."
        />

        <div className="portal-card card">
          <p className="portal-note">Acceso de demostración • sin autenticación</p>
          <div className="portal-grid">
            {portalCards.map((item) => (
              <div key={item} className="portal-item">
                <span>{item}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
