import SectionTitle from '../components/SectionTitle'

export default function ContactPage() {
  return (
    <section className="page-shell section">
      <div className="container contact-layout">
        <SectionTitle
          eyebrow="Contacto"
          title="Hablemos de tu equipo"
          description="Te ayudamos a resolver tu caso de forma rápida, clara y profesional."
        />

        <div className="contact-grid">
          <div className="card contact-card contact-card--primary">
            <h3>WhatsApp</h3>
            <p className="contact-number">0958612055</p>
            <a
              href="https://wa.me/593958612055"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary contact-whatsapp__button"
            >
              Escribir por WhatsApp
            </a>
          </div>

          <div className="card contact-card">
            <h3>Visítanos</h3>
            <p className="contact-address">Av. Maldonado y Palmas</p>
          </div>

          <div className="card contact-card">
            <h3>Horario de atención</h3>
            <ul className="contact-hours">
              <li>
                <span>Lunes a viernes</span>
                <strong>10:00 — 20:00</strong>
              </li>
              <li>
                <span>Sábados</span>
                <strong>10:00 — 19:00</strong>
              </li>
              <li>
                <span>Domingos</span>
                <strong>10:00 — 16:00</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
