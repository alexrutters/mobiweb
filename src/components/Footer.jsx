import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand brand--footer">mobifixes</div>
          <p className="footer-copy">Servicio técnico especializado para dispositivos Apple y multimarca.</p>
        </div>

        <div>
          <h3>Enlaces</h3>
          <ul className="footer-links">
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/tienda">Tienda</Link></li>
            <li><Link to="/seguimiento">Seguimiento de reparación</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h3>Social</h3>
          <ul className="footer-links">
            <li><a href="https://wa.me" target="_blank" rel="noreferrer">WhatsApp</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
          </ul>
        </div>

        <div>
          <h3>Contacto</h3>
          <ul className="footer-links">
            <li>Atención presencial</li>
            <li>Lunes a sábado</li>
            <li>9:00 - 18:00</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
