import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'
import { services } from '../data/services'

export default function ServicesPage() {
  return (
    <section className="page-shell section">
      <div className="container">
        <SectionTitle
          eyebrow="Servicios"
          title="Reparaciones técnicas para cada tipo de equipo"
          description="Soluciones especializadas para Apple, Samsung, Motorola y equipos multimarca."
        />

        <div className="services-grid services-grid--page">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
