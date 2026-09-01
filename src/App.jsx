import { useLayoutEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import StorePage from './pages/StorePage'
import TrackingPage from './pages/TrackingPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PortalPage from './pages/PortalPage'

function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/servicios/:serviceId" element={<ServiceDetailPage />} />
          <Route path="/tienda" element={<StorePage />} />
          <Route path="/seguimiento" element={<TrackingPage />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/portal" element={<PortalPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
