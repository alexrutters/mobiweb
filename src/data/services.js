import iphone from '../assets/services/iphone.svg'
import battery from '../assets/services/battery.svg'
import screen from '../assets/services/screen.svg'
import faceidReal1 from '../assets/services/faceid-real1.jpeg'
import faceidReal2 from '../assets/services/faceid-real2.jpeg'
import logic from '../assets/services/logic.svg'
import solder from '../assets/services/solder.svg'
import charging from '../assets/services/charging.svg'
import data from '../assets/services/data.svg'
import camera from '../assets/services/camera.svg'
import ipad from '../assets/services/ipad.svg'
import macbook from '../assets/services/macbook.svg'
import multibrand from '../assets/services/multibrand.svg'

export const services = [
  {
    id: 'reparacion-iphone',
    nombre: 'Reparación de iPhone',
    categoria: 'Apple',
    descripcion: 'Diagnóstico preciso y reparación especializada para modelos actuales y de generaciones anteriores.',
    imagen: 'iphone',
    imageUrl: iphone,
    destacado: true,
    beneficios: ['Diagnóstico profesional', 'Repuestos de calidad', 'Garantía en servicio'],
    proceso: ['Recepción y revisión', 'Diagnóstico técnico', 'Reparación y prueba final'],
  },
  {
    id: 'cambio-bateria',
    nombre: 'Cambio de batería',
    categoria: 'Rendimiento',
    descripcion: 'Recupera autonomía y rendimiento con baterías de calidad y pruebas de carga.',
    imagen: 'battery',
    imageUrl: battery,
    destacado: true,
    beneficios: ['Autonomía restaurada', 'Carga segura', 'Durabilidad comprobada'],
    proceso: ['Evaluación de estado', 'Instalación de batería', 'Control de rendimiento'],
  },
  {
    id: 'cambio-pantalla',
    nombre: 'Cambio de pantalla',
    categoria: 'Display',
    descripcion: 'Cambio de vidrio y pantallas con precisión para mantener la experiencia visual original.',
    imagen: 'screen',
    imageUrl: screen,
    destacado: true,
    beneficios: ['Color fiel', 'Calidad visual', 'Instalación precisa'],
    proceso: ['Diagnóstico visual', 'Cambio de panel', 'Pruebas finales'],
  },
  {
    id: 'reparacion-face-id',
    nombre: 'Reparación de Face ID',
    categoria: 'Biometría',
    descripcion: 'Solución para sensores y componentes del sistema facial con calibración profesional.',
    imagen: 'faceid',
    imageUrl: faceidReal1,
    detailImage: faceidReal2,
    destacado: false,
    beneficios: ['Recalibración', 'Sensor funcional', 'Diagnóstico preciso'],
    proceso: ['Revisión del módulo', 'Reemplazo o ajuste', 'Validación biométrica'],
  },
  {
    id: 'reparacion-placa-logica',
    nombre: 'Reparación de placa lógica',
    categoria: 'Técnico',
    descripcion: 'Reparación técnica de fallas complejas en circuitos y componentes esenciales.',
    imagen: 'logic',
    imageUrl: logic,
    destacado: true,
    beneficios: ['Análisis profundo', 'Precisión técnica', 'Soluciones especializadas'],
    proceso: ['Diagnóstico de falla', 'Reparación de circuito', 'Prueba funcional'],
  },
  {
    id: 'microsoldadura',
    nombre: 'Microsoldadura',
    categoria: 'Electrónica',
    descripcion: 'Reparación especializada en conexiones delicadas y fallas de soldadura.',
    imagen: 'solder',
    imageUrl: solder,
    destacado: false,
    beneficios: ['Control de calidad', 'Técnicas precisas', 'Repuestos certificados'],
    proceso: ['Inspección de conexión', 'Soldadura especializada', 'Verificación final'],
  },
  {
    id: 'circuito-carga',
    nombre: 'Reparación de circuito de carga',
    categoria: 'Carga',
    descripcion: 'Solución para fallas de carga, puerto USB-C o Lightning y conexiones eléctricas.',
    imagen: 'charging',
    imageUrl: charging,
    destacado: false,
    beneficios: ['Carga estable', 'Puerto funcional', 'Prevención de daños'],
    proceso: ['Revisión del puerto', 'Diagnóstico de circuito', 'Reparación y prueba'],
  },
  {
    id: 'recuperacion-datos',
    nombre: 'Recuperación de datos',
    categoria: 'Datos',
    descripcion: 'Recuperación cuidadosa de información en dispositivos con fallas de sistema o físico.',
    imagen: 'data',
    imageUrl: data,
    destacado: false,
    beneficios: ['Atención cuidadosa', 'Diagnóstico de almacenamiento', 'Resguardo de información'],
    proceso: ['Inspección del equipo', 'Extracción de datos', 'Validación de resultados'],
  },
  {
    id: 'reparacion-camaras',
    nombre: 'Reparación de cámaras',
    categoria: 'Fotografía',
    descripcion: 'Solución para problemas en módulos de cámara, enfoque y calidad de imagen.',
    imagen: 'camera',
    imageUrl: camera,
    destacado: false,
    beneficios: ['Calidad óptica', 'Enfoque preciso', 'Reparación integral'],
    proceso: ['Diagnóstico de lente', 'Reemplazo del módulo', 'Prueba de cámara'],
  },
  {
    id: 'reparacion-ipad',
    nombre: 'Reparación de iPad',
    categoria: 'Apple',
    descripcion: 'Servicio técnico para tablets con fallas de pantalla, batería, lógica y conectividad.',
    imagen: 'ipad',
    imageUrl: ipad,
    destacado: true,
    beneficios: ['Compatibilidad Apple', 'Atención especializada', 'Calidad de servicio'],
    proceso: ['Revisión del equipo', 'Reparación del componente', 'Prueba funcional'],
  },
  {
    id: 'reparacion-macbook-laptops',
    nombre: 'Reparación de MacBook y laptops',
    categoria: 'Portátiles',
    descripcion: 'Diagnóstico y reparación de equipos premium para trabajo, diseño y uso diario.',
    imagen: 'macbook',
    imageUrl: macbook,
    destacado: true,
    beneficios: ['Ponibilidad', 'Rendimiento restaurado', 'Soporte profesional'],
    proceso: ['Diagnóstico inicial', 'Reparación de hardware', 'Control final'],
  },
  {
    id: 'equipos-multimarca',
    nombre: 'Reparación de equipos multimarca',
    categoria: 'Multimarca',
    descripcion: 'Atención para marcas líderes con soluciones adaptadas a cada tipo de dispositivo.',
    imagen: 'multibrand',
    imageUrl: multibrand,
    destacado: false,
    beneficios: ['Ampliado soporte', 'Servicio profesional', 'Múltiples marcas'],
    proceso: ['Evaluación del equipo', 'Diagnóstico especializado', 'Reparación y prueba'],
  },
]

export const getServiceById = (id) => services.find((service) => service.id === id)
