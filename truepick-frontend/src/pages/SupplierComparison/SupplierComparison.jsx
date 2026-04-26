import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProductById, fetchSuppliers } from '../../utils/mockData'
import './SupplierComparison.css'

const SupplierComparison = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [suppliers, setSuppliers] = useState([])

  useEffect(() => {
    const load = async () => {
      const [p, s] = await Promise.all([
        fetchProductById(id),
        fetchSuppliers(parseInt(id))
      ])
      setProduct(p)
      setSuppliers(s)
    }
    load()
  }, [id])

  if (!product) return <div className="page"><div className="container"><p>Loading...</p></div></div>

  return (
    <div className="supplier-page page">
      <div className="container">
        <Link to={`/product/${id}`} className="back-link">← Back to Product</Link>

        {/* Header: title + product image */}
        <div className="supplier-page-header">
          <div>
            <h2 className="page-title">Verify and Optimize Your Purchase</h2>
            <p className="page-sub">
              Choose from multiple verified sellers, and stay protected from Unknown unreliable sellers
            </p>
          </div>
          <img src={product.image} alt={product.name} className="product-preview-img" />
        </div>

        <hr className="section-divider" />

        <h3 className="comparison-title">Verified Supplier Comparison</h3>

        {suppliers.length === 0 ? (
          <p>No supplier data available for this product yet.</p>
        ) : (
          <div className="suppliers-grid">
            {suppliers.map((s, i) => (
              <div key={i} className={`supplier-card ${s.platform === 'Amazon' ? 'featured' : ''}`}>
                <p className="supplier-source-label">
                  Source {String.fromCharCode(65 + i)}: {s.platform} Verified Listing
                </p>

                <div className="supplier-body">
                  {/* Platform logo */}
                  <div className="supplier-logo">
                    {s.logo === 'amazon' && <AmazonLogo />}
                    {s.logo === 'flipkart' && <FlipkartLogo />}
                  </div>

                  <div className="supplier-details">
                    <p className="supplier-seller">{s.seller}</p>
                    <p className="supplier-store">{s.sellerInfo}</p>
                    <p className="supplier-price">${s.price.toFixed(2)}</p>
                  </div>
                </div>

                <p className="supplier-delivery">{s.delivery}</p>

                <a
                  href={s.url}
                  className={`btn supplier-cta ${s.platform === 'Amazon' ? 'btn-primary' : 'btn-outline-blue'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Proceed to {s.platform} Checkout
                </a>
              </div>
            ))}
          </div>
        )}

        <p className="supplier-note">
          Both Sources meet our shipping reliability and product consistency standards.
          We redirect you to a trusted partner only.
        </p>
      </div>
    </div>
  )
}

/* ── Inline SVG Logos ─────────────────────────────────────────────────── */

const AmazonLogo = () => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="8" fill="white" stroke="#e5e5e5" strokeWidth="2"/>
    <text x="50" y="68" textAnchor="middle" fontSize="52" fontWeight="800" fontFamily="Arial" fill="#FF9900">a</text>
    <path d="M22 72 Q50 82 78 72" stroke="#FF9900" strokeWidth="4" fill="none" strokeLinecap="round"/>
  </svg>
)

const FlipkartLogo = () => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="8" fill="#F8D020"/>
    <text x="50" y="68" textAnchor="middle" fontSize="52" fontWeight="800" fontFamily="Arial" fill="white">F</text>
  </svg>
)

export default SupplierComparison
