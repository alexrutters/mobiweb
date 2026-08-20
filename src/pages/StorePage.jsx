import ProductCard from '../components/ProductCard'
import SectionTitle from '../components/SectionTitle'
import { products } from '../data/products'

export default function StorePage() {
  return (
    <section className="page-shell section">
      <div className="container">
        <SectionTitle
          eyebrow="Tienda"
          title="Productos y accesorios seleccionados"
          description="Herramientas, protección y accesorios para mantener tus dispositivos en óptimas condiciones."
        />

        <div className="products-grid products-grid--page">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              description={product.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
