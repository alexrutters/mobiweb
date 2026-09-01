import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'
import heroImage from '../assets/hero.png'

const trustItems = [
  'Diagnóstico profesional',
  'Técnicos especializados',
  'Repuestos de calidad',
  'Garantía en reparaciones',
  'Atención personalizada',
]

export default function HomePage() {
  const navigate = useNavigate()
  const [codigo, setCodigo] = useState('')

  const handleTrackingRedirect = (event) => {
    event.preventDefault()
    const trimmedCode = codigo.trim()

    if (!trimmedCode) {
      return
    }

    navigate('/seguimiento', { state: { codigo: trimmedCode } })
  }

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

      <section className="section section--order">
        <div className="container order-layout">
          <div className="order-copy">
            <SectionTitle
              eyebrow="Seguimiento"
              title="Consulta tu orden"
              description="Ingresa el número de tu orden para conocer el estado actual de tu equipo."
            />
            <form className="order-search" onSubmit={handleTrackingRedirect}>
              <input
                type="text"
                value={codigo}
                onChange={(event) => setCodigo(event.target.value)}
                aria-label="Número de orden"
                placeholder="Ej: OT-000123"
              />
              <Button type="submit">Consultar</Button>
            </form>
          </div>

          <div className="order-result">
            <div className="card empty-state">
              <h3>Estado de tu reparación</h3>
              <p>Ingresa el código de tu orden para consultar el estado actual de tu equipo.</p>
            </div>
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
