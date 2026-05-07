import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import ProductCard from '../../components/ProductCard/ProductCard'
import CircularProgress from '../../components/CircularProgress/CircularProgress'

import './Home.css'

const API_BASE_URL = 'https://backend-truepick.onrender.com'

const Home = () => {

  const [products, setProducts] = useState([])
  const [featuredProduct, setFeaturedProduct] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // =====================================================
  // PLATFORM SEARCH
  // =====================================================

  const handlePlatformClick = (e, platform, name) => {

    e.preventDefault()
    e.stopPropagation()

    window.open(
      `https://www.${platform}.com/search?q=${encodeURIComponent(name)}`,
      '_blank'
    )
  }

  // =====================================================
  // SLUG HELPER (IMPORTANT FIX)
  // =====================================================

  const createSlug = (text, index) => {
    if (!text) return `product-${index}`

    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  // =====================================================
  // LOAD DATA FROM API
  // =====================================================

  useEffect(() => {

    const loadProducts = async () => {

      try {

        setLoading(true)
        setError(null)

        const response = await fetch(
          `${API_BASE_URL}/weekly-deals-analysis`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const data = await response.json()

        // =================================================
        // FORMAT BACKEND DATA
        // =================================================

        const formattedProducts = data.map((item, index) => ({

          // ✅ FIXED ID (slug instead of broken encodeURIComponent)
          id: createSlug(item.product_name, index),

          // PRODUCT INFO
          name: item.product_name || "Unknown Product",
          brand: "Amazon",
          image: item.product_image_url || "https://via.placeholder.com/300",

          // TRUST ANALYSIS
          trustScore: Math.round(
            (item.trust_analysis?.trust_score || 0) * 100
          ),

          status: item.trust_analysis?.status || "UNKNOWN",

          confidenceInterval:
            item.trust_analysis?.confidence_interval || 0,

          sentimentScore:
            item.trust_analysis?.sentiment_score || 0,

          credibilityScore:
            item.trust_analysis?.credibility_score || 0,

          recencyScore:
            item.trust_analysis?.recency_score || 0,

          volumeConfidence:
            item.trust_analysis?.volume_confidence || 0,

          redFlagPenalty:
            item.trust_analysis?.red_flag_penalty || 0,

          verifiedRatio:
            item.trust_analysis?.verified_ratio || 0,

          topAspects:
            item.trust_analysis?.top_aspects || {},

          // COMMENTS ESTIMATE
          commentsAnalyzed: Math.round(
            1 / ((item.trust_analysis?.confidence_interval || 1) ** 2)
          ),

          // URLS
          redditUrl: item.reddit_url || "",
          externalUrl: item.external_url || "",

          platforms: ["reddit"]

        }))

        setProducts(formattedProducts)

        if (formattedProducts.length > 0) {
          setFeaturedProduct(formattedProducts[0])
        }

      } catch (err) {

        console.error("API Load Error:", err)
        setError("Failed to load products")

      } finally {

        setLoading(false)

      }
    }

    loadProducts()

  }, [])

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="home page">
        <div className="container">
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <h2>Loading Products...</h2>
          </div>
        </div>
      </div>
    )
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="home page">
        <div className="container">
          <div style={{ padding: '4rem', textAlign: 'center', color: 'red' }}>
            <h2>{error}</h2>
          </div>
        </div>
      </div>
    )
  }

  return (

    <div className="home page">

      <div className="container">

        {/* FEATURED PRODUCT */}
        {featuredProduct && (

          <section className="featured-section fade-in">

            {/* LEFT HERO */}
            <div className="video-container">

              <Link
                to={`/product/${featuredProduct.id}`}
                className="video-player"
                style={{
                  display: 'block',
                  color: 'inherit',
                  textDecoration: 'none'
                }}
              >

                {/* HEADER */}
                <div className="video-header">

                  <div className="video-title-section">

                    <svg
                      className="logo-icon"
                      width="28"
                      height="28"
                      viewBox="0 0 48 48"
                      fill="none"
                    >
                      <path
                        d="M12 36L18 12L36 18L30 42L12 36Z"
                        fill="#2D9B87"
                      />
                      <path
                        d="M18 12L36 18L42 6L24 0L18 12Z"
                        fill="#3FAAA0"
                      />
                    </svg>

                    <h2 className="video-title">
                      {featuredProduct.name}
                    </h2>

                  </div>

                </div>

                {/* IMAGE */}
                <div
                  className="video-content"
                  onClick={(e) => {
                    if (!isPlaying) {
                      e.preventDefault()
                      setIsPlaying(true)
                    }
                  }}
                >

                  <img
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="video-thumbnail"
                  />

                  {/* PLATFORM BADGES */}
                  <div
                    className="platform-badges"
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      zIndex: 10
                    }}
                  >

                    <div
                      className="platform-badge"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()

                        if (featuredProduct.redditUrl) {
                          window.open(featuredProduct.redditUrl, '_blank')
                        }
                      }}
                    >
                      🧵
                    </div>

                    <div
                      className="platform-badge"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()

                        if (featuredProduct.externalUrl) {
                          window.open(featuredProduct.externalUrl, '_blank')
                        }
                      }}
                    >
                      🛒
                    </div>

                  </div>

                </div>

                {/* TRUST SCORE */}
                <div className="trust-score-card">

                  <CircularProgress
                    percentage={featuredProduct.trustScore}
                    size="large"
                  />

                  <div className="trust-score-text">

                    <p className="trust-score-title">
                      Trust Score:{" "}
                      <span className="highlight">
                        {featuredProduct.trustScore}%
                      </span>
                    </p>

                    

                    <p className="trust-score-sub">
                      Based on{" "}
                      <strong>{featuredProduct.commentsAnalyzed}</strong>{" "}
                      comments
                    </p>

                  </div>

                </div>

              </Link>

            </div>

            {/* SIDEBAR */}
            {products.length > 1 && (

              <div className="sidebar-products">

                {products.slice(1, 3).map((product) => (

                  <div key={product.id} className="sidebar-product-card">

                    <Link to={`/product/${product.id}`}>

                      <div className="sidebar-image-container">
                        <img src={product.image} alt={product.name} />
                      </div>

                      <div className="sidebar-product-info">
                        <h4>{product.name}</h4>
                        <CircularProgress
                          percentage={product.trustScore}
                          size="small"
                        />
                      </div>

                    </Link>

                  </div>

                ))}

              </div>

            )}

          </section>

        )}

        {/* GRID */}
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