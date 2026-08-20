import { Link } from 'react-router-dom'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'
import OrderCard from '../components/OrderCard'
import { services } from '../data/services'
import { sampleOrder } from '../data/orders'
import heroImage from '../assets/hero.png'

const trustItems = [
  'Diagnóstico profesional',
  'Técnicos especializados',
  'Repuestos de calidad',
  'Garantía en reparaciones',
  'Atención personalizada',
]

const specialtyItems = [
  { title: 'iPhone', text: 'Pantallas, batería y lógica', tone: 'primary' },
  { title: 'iPad', text: 'Tablets y accesorios', tone: 'soft' },
  { title: 'MacBook', text: 'Portátiles premium', tone: 'muted' },
  { title: 'Multimarca', text: 'Samsung, Xiaomi y más', tone: 'primary' },
]

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Servicio técnico premium</span>
            <h1>
              <span className="hero-title-line">Tu equipo</span>
              <span className="hero-title-line">en manos de</span>
              <span className="hero-title-line hero-title-line--accent">expertos.</span>
            </h1>
            <p>
              Diagnóstico profesional, reparaciones especializadas y atención para los equipos que usas cada día.
            </p>
            <div className="hero-actions">
              <Link to="/seguimiento" className="btn btn-primary">Consultar mi orden</Link>
              <Link to="/servicios" className="btn btn-secondary">Ver servicios</Link>
            </div>
            <ul className="hero-meta">
              <li>Apple y multimarca</li>
              <li>Diagnóstico rápido</li>
              <li>Garantía</li>
            </ul>
          </div>

          <div className="hero-visual" aria-label="Equipos premium atendidos por mobifixes">
            <div className="hero-visual__frame">
              <img src={heroImage} alt="Selección premium de dispositivos Apple y multimarca atendidos por mobifixes" className="hero-visual__image" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionTitle
            eyebrow="Servicios"
            title="Soluciones técnicas para cada necesidad"
            description="Atención especializada para equipos Apple, Samsung, Motorola y más."
          />

          <div className="services-grid">
            {services.slice(0, 4).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--specialties">
        <div className="container">
          <SectionTitle
            eyebrow="Especialidades"
            title="Reparaciones premium para todos tus dispositivos"
            description="Atención exclusiva y personalizada"
          />

          <div className="specialty-grid">
            {specialtyItems.map((item) => (
              <div key={item.title} className={`specialty-card specialty-card--${item.tone}`}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--order">
        <div className="container order-layout">
          <div className="order-copy">
            <SectionTitle
              eyebrow="Seguimiento"
              title="Consulta tu orden"
              description="Ingresa el número de tu orden para conocer el estado actual de tu equipo."
            />
            <form className="order-search">
              <input type="text" defaultValue="OT-000001" aria-label="Número de orden" />
              <Button type="submit">Consultar</Button>
            </form>
          </div>

          <div className="order-result">
            <OrderCard order={sampleOrder} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Confianza"
            title="¿Por qué elegir mobifixes?"
            description="Una propuesta clara, segura y orientada al cuidado de tus dispositivos."
          />

          <div className="feature-grid">
            {trustItems.map((item) => (
              <div key={item} className="feature-item card">
                <div className="feature-item__icon">✓</div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
