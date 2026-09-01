import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button'
import { getServiceById } from '../data/services'
import bateriaReal from '../assets/services/bateria-real.jpeg'

const batterySignals = [
  'La batería dura muy poco',
  'El iPhone se apaga inesperadamente',
  'El porcentaje baja rápidamente',
  'El rendimiento se ha reducido',
  'El dispositivo se calienta más de lo normal',
]

const batteryProcess = [
  {
    step: '01',
    title: 'Diagnóstico',
    text: 'Revisamos el estado general del equipo y la batería.',
  },
  {
    step: '02',
    title: 'Evaluación',
    text: 'Comprobamos el comportamiento, rendimiento y condición.',
  },
  {
    step: '03',
    title: 'Reemplazo',
    text: 'Realizamos el procedimiento técnico correspondiente.',
  },
  {
    step: '04',
    title: 'Pruebas',
    text: 'Verificamos carga, consumo y funcionamiento general.',
  },
  {
    step: '05',
    title: 'Entrega',
    text: 'El equipo queda listo para continuar su uso.',
  },
]

export default function ServiceDetailPage() {
  const { serviceId } = useParams()
  const service = getServiceById(serviceId)

  const handleConsultRepair = () => {
    const whatsappNumber = '593958612055'
    const message = encodeURIComponent(
      `Hola, quiero consultar una reparación para ${service?.nombre || 'un dispositivo'}.`
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer')
  }

  if (!service) {
    return (
      <section className="page-shell section">
        <div className="container">
          <div className="card empty-state">
            <p>Servicio no encontrado.</p>
          </div>
        </div>
      </section>
    )
  }

  if (service.id === 'cambio-bateria') {
    return (
      <section className="page-shell section service-detail-page">
        <div className="container">
          <article className="service-detail-hero card">
            <div className="service-detail-hero__content">
              <span className="eyebrow">Servicio especializado</span>
              <h1>Cambio de batería para iPhone</h1>
              <p>
                Recupera autonomía y rendimiento con un diagnóstico profesional y
                una instalación realizada con precisión.
              </p>

              <div className="service-detail__actions">
                <Link to="/seguimiento" className="btn btn-primary">
                  Solicitar servicio
                </Link>
                <Link to="/servicios" className="btn btn-secondary">
                  Volver a servicios
                </Link>
              </div>
            </div>

            <div className="service-detail-hero__media">
              <img
                src={bateriaReal}
                alt="Cambio de batería para iPhone"
                className="service-detail-hero__image"
                loading="eager"
              />
            </div>
          </article>

          <section className="service-detail-meta">
            <div className="service-detail-meta__item">
              <span className="service-detail-meta__check">✓</span>
              <span>Diagnóstico profesional</span>
            </div>
            <div className="service-detail-meta__item">
              <span className="service-detail-meta__check">✓</span>
              <span>Revisión del estado de la batería</span>
            </div>
            <div className="service-detail-meta__item">
              <span className="service-detail-meta__check">✓</span>
              <span>Pruebas de carga y consumo</span>
            </div>
            <div className="service-detail-meta__item">
              <span className="service-detail-meta__check">✓</span>
              <span>Garantía del servicio</span>
            </div>
          </section>

          <section className="service-detail-section">
            <div className="section-heading service-detail-section__heading">
              <span className="eyebrow eyebrow--muted">Señales comunes</span>
              <h2>¿Cuándo necesitas cambiar la batería?</h2>
            </div>

            <div className="signal-grid">
              {batterySignals.map((item) => (
                <div key={item} className="signal-card card">
                  <span className="signal-card__dot" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="service-detail-section">
            <div className="section-heading service-detail-section__heading">
              <span className="eyebrow eyebrow--muted">Proceso</span>
              <h2>Cómo trabajamos en mobifixes</h2>
            </div>

            <div className="service-process">
              {batteryProcess.map((item) => (
                <div key={item.step} className="service-process__item card">
                  <span className="service-process__step">{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="service-detail-section">
            <div className="section-heading service-detail-section__heading">
              <span className="eyebrow eyebrow--muted">Compatibilidad</span>
              <h2>Equipos compatibles</h2>
            </div>

            <div className="compatibility-grid">
              <div className="compatibility-card card">
                <h3>iPhone</h3>
                <p>Modelos actuales y de generaciones anteriores.</p>
              </div>
              <div className="compatibility-card card">
                <h3>iPad</h3>
                <p>Dispositivos con batería integrada y consumo intensivo.</p>
              </div>
              <div className="compatibility-card card">
                <h3>Otros dispositivos compatibles</h3>
                <p>Equipo preparado para ampliar compatibilidad en futuras soluciones.</p>
              </div>
            </div>
          </section>

          <section className="service-cta card">
            <div>
              <span className="eyebrow">¿Tu batería ya no rinde como antes?</span>
              <h2>Solicita un diagnóstico y recupera el rendimiento.</h2>
            </div>

            <div className="service-detail__actions service-detail__actions--cta">
              <Link to="/seguimiento" className="btn btn-primary">
                Solicitar diagnóstico
              </Link>
              <Link to="/servicios" className="btn btn-secondary">
                Volver a servicios
              </Link>
            </div>
          </section>
        </div>
      </section>
    )
  }

  const renderVisual = () => {
    if (service.imagen === 'faceid') {
      return (
        <div className="service-detail__visual service-detail__visual--faceid" aria-hidden="true">
          <img
            src={service.detailImage ?? service.imageUrl}
            alt={service.nombre}
            className="service-detail__image"
          />
        </div>
      )
    }

    return (
      <div className="service-detail__visual" aria-hidden="true">
        <img src={service.imageUrl} alt={service.nombre} className="service-detail__image" />
      </div>
    )
  }

  return (
    <section className="page-shell section">
      <div className="container">
        <div className="service-detail card">
          {renderVisual()}

          <div className="service-detail__content">
            <span className="chip">{service.categoria}</span>
            <h1>{service.nombre}</h1>
            <p>{service.descripcion}</p>

            <div className="service-detail__actions">
              <Button onClick={handleConsultRepair}>Consultar reparación</Button>
              <Link to="/servicios" className="btn btn-secondary">
                Volver a servicios
              </Link>
            </div>

            <div className="service-detail__grid">
              <div>
                <h3>Beneficios</h3>
                <ul>
                  {service.beneficios.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3>Proceso</h3>
                <ul>
                  {service.proceso.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
