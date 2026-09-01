import SectionTitle from '../components/SectionTitle'

const stats = [
  { value: '19+', label: 'Años de experiencia' },
  { value: '3.200+', label: 'Equipos reparados' },
  { value: '99%', label: 'Satisfacción' },
]

export default function AboutPage() {
  return (
    <section className="page-shell section">
      <div className="container about-layout">
        <SectionTitle
          eyebrow="Nosotros"
          title="Tecnología y atención con criterio profesional"
          description="En mobifixes combinamos experiencia técnica, calidad de servicio y atención cercana para cada cliente."
        />

        <div className="stats-grid">
          {stats.map((item) => (
            <div key={item.label} className="card stat-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="about-copy card">
          <p>
            Somos un equipo especializado en reparación técnica de equipos Apple y
            dispositivos multimarca. Nuestro enfoque combina diagnóstico profesional,
            atención clara y trabajo preciso para devolverle a cada equipo su máximo
            rendimiento.
          </p>
        </div>
      </div>
    </section>
  )
}
