export default function ProductCard({ name, category, price, description }) {
  return (
    <article className="card product-card">
      <div className="product-card__visual" aria-hidden="true" />
      <div className="product-card__content">
        <span className="chip chip--muted">{category}</span>
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="product-card__meta">
          <strong>{price}</strong>
          <button type="button" className="btn btn-secondary">Ver producto</button>
        </div>
      </div>
    </article>
  )
}
