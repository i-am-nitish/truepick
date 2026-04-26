import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/ProductCard/ProductCard'
import CircularProgress from '../../components/CircularProgress/CircularProgress'
import { fetchProducts } from '../../utils/mockData'
import './Home.css'

const Home = () => {
  const [products, setProducts] = useState([])
  const [featuredProduct, setFeaturedProduct] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlatformClick = (e, platform, name) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`https://www.${platform}.com/search?q=${encodeURIComponent(name)}`, '_blank');
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts()
      setProducts(data)
      setFeaturedProduct(data[0])
    }
    load()
  }, [])

  return (
    <div className="home page">
      <div className="container">

        {/* ── Featured Video + Sidebar ── */}
        {featuredProduct && (
          <section className="featured-section fade-in">

            {/* Left: Video Player */}
            <div className="video-container">
              <Link to={`/product/${featuredProduct.id}`} className="video-player" style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}>

                {/* Video header bar */}
                <div className="video-header">
                  <div className="video-title-section">
                    {/* Reuse the same SVG logo defined in Header — no duplicate defs needed */}
                    <svg className="logo-icon" width="28" height="28" viewBox="0 0 48 48" fill="none">
                      <path d="M12 36L18 12L36 18L30 42L12 36Z" fill="#2D9B87" />
                      <path d="M18 12L36 18L42 6L24 0L18 12Z" fill="#3FAAA0" />
                    </svg>
                    <h2 className="video-title">
                      {featuredProduct.name}, {featuredProduct.brand}
                    </h2>
                  </div>
                </div>

                {/* Video thumbnail + play button + trust overlay */}
                <div className="video-content" onClick={(e) => {
                  if (!isPlaying) {
                    e.preventDefault();
                    setIsPlaying(true);
                  }
                }}>
                  {isPlaying ? (
                    <video 
                      src="https://www.w3schools.com/html/mov_bbb.mp4" 
                      autoPlay 
                      controls 
                      className="video-thumbnail"
                      style={{ backgroundColor: '#000' }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    />
                  ) : (
                    <>
                      <img
                        src={featuredProduct.image}
                        alt={featuredProduct.name}
                        className="video-thumbnail"
                      />
                      <button className="play-button">
                        <svg width="64" height="64" viewBox="0 0 64 64">
                          <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.6)" />
                          <path d="M25 20l18 12-18 12V20z" fill="white" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Platform Badges for Featured Video */}
                  <div className="platform-badges" style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
                    {featuredProduct.platforms?.includes('tiktok') && (
                      <div className="platform-badge" onClick={(e) => handlePlatformClick(e, 'tiktok', featuredProduct.name)}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="white"><path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" /></svg>
                      </div>
                    )}
                    {featuredProduct.platforms?.includes('instagram') && (
                      <div className="platform-badge" onClick={(e) => handlePlatformClick(e, 'instagram', featuredProduct.name)}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="white"><path d="M10 1.802c2.67 0 2.987.01 4.041.059 2.71.123 3.975 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.01 2.988-.057 4.042-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zM10 0C7.284 0 6.944.012 5.877.06 2.246.227.228 2.242.06 5.877.01 6.944 0 7.284 0 10s.012 3.057.06 4.123c.167 3.632 2.182 5.65 5.817 5.817 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c3.629-.167 5.652-2.182 5.816-5.817.05-1.066.061-1.407.061-4.123s-.012-3.056-.06-4.122C19.777 2.249 17.76.228 14.124.06 13.057.01 12.716 0 10 0zm0 4.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27zm0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666zm5.338-9.87a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" /></svg>
                      </div>
                    )}
                    {featuredProduct.platforms?.includes('facebook') && (
                      <div className="platform-badge" onClick={(e) => handlePlatformClick(e, 'facebook', featuredProduct.name)}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="white"><path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" /></svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Trust Score Card beneath the video */}
                <div className="trust-score-card">
                  <CircularProgress percentage={featuredProduct.trustScore} size="large" />
                  <div className="trust-score-text">
                    <p className="trust-score-title">
                      Trust Score: <span className="highlight">{featuredProduct.trustScore}%</span> | Verified
                    </p>
                    <p className="trust-score-sub">
                      by <strong>{featuredProduct.commentsAnalyzed?.toLocaleString()}+</strong> Real Comments
                    </p>
                  </div>
                </div>

              </Link>
            </div>

            {/* Right: Sidebar product cards */}
            {products.length > 1 && (
              <div className="sidebar-products">
                {products.slice(1, 3).map(product => (
                  <div key={product.id} className="sidebar-product-card">
                    <Link to={`/product/${product.id}`}>
                      <div className="sidebar-image-container" style={{ position: 'relative' }}>
                        <img src={product.image} alt={product.name} />
                        <div className="platform-badges" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                          {product.platforms?.includes('tiktok') && (
                            <div className="platform-badge" onClick={(e) => handlePlatformClick(e, 'tiktok', product.name)}>
                              <svg width="16" height="16" viewBox="0 0 20 20" fill="white">
                                <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
                              </svg>
                            </div>
                          )}
                          {product.platforms?.includes('instagram') && (
                            <div className="platform-badge" onClick={(e) => handlePlatformClick(e, 'instagram', product.name)}>
                              <svg width="16" height="16" viewBox="0 0 20 20" fill="white">
                                <path d="M10 1.802c2.67 0 2.987.01 4.041.059 2.71.123 3.975 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.01 2.988-.057 4.042-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zM10 0C7.284 0 6.944.012 5.877.06 2.246.227.228 2.242.06 5.877.01 6.944 0 7.284 0 10s.012 3.057.06 4.123c.167 3.632 2.182 5.65 5.817 5.817 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c3.629-.167 5.652-2.182 5.816-5.817.05-1.066.061-1.407.061-4.123s-.012-3.056-.06-4.122C19.777 2.249 17.76.228 14.124.06 13.057.01 12.716 0 10 0zm0 4.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27zm0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666zm5.338-9.87a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" />
                              </svg>
                            </div>
                          )}
                          {product.platforms?.includes('facebook') && (
                            <div className="platform-badge" onClick={(e) => handlePlatformClick(e, 'facebook', product.name)}>
                              <svg width="16" height="16" viewBox="0 0 20 20" fill="white">
                                <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="sidebar-product-info">
                        <h4>{product.name}</h4>
                        <CircularProgress percentage={product.trustScore} size="small" />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

          </section>
        )}

        {/* ── Product Grid ── */}
        <section className="products-grid-section">
          <div className="products-grid">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="product-grid-item fade-in"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

export default Home
