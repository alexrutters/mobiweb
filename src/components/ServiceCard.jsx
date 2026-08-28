import { Link } from 'react-router-dom'
import bateriaReal from '../assets/services/bateria-real.jpeg'

export default function ServiceCard({ service }) {
  const renderVisual = () => {
    if (service.imagen === 'battery') {
      return (
        <div className="service-card__visual service-card__visual--battery" aria-hidden="true">
          <img
            src={bateriaReal}
            alt="Cambio de batería mobifixes"
            className="service-real-image"
            loading="lazy"
          />
        </div>
      )
    }

    return (
      <div className="service-card__visual" aria-hidden="true">
        <img
          src={service.imageUrl}
          alt={service.nombre}
          className="service-card__image"
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <article className="card service-card">
      {renderVisual()}
      <div className="service-card__content">
        <span className="chip">{service.categoria}</span>
        <h3>{service.nombre}</h3>
        <p>{service.descripcion}</p>
        <Link to={`/servicios/${service.id}`} className="text-link">
          Ver servicio
        </Link>
      </div>
    </article>
  )
}
