import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Tienda', to: '/tienda' },
  { label: 'Seguimiento', to: '/seguimiento' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Contacto', to: '/contacto' },
]

export default function Header() {
  return (
    <header className="topbar">
      <div className="container topbar__inner">
        <NavLink to="/" className="brand brand--black" aria-label="mobifixes inicio">
          mobifixes
        </NavLink>

        <nav className="main-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/seguimiento" className="btn btn-primary topbar__cta">
          Consultar mi orden
        </Link>
      </div>
    </header>
  )
}
