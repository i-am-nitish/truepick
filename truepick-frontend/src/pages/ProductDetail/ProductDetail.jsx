import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CircularProgress from '../../components/CircularProgress/CircularProgress';
import './ProductDetail.css';

const API_BASE_URL = 'https://backend-truepick.onrender.com';

const createSlug = (text, index) => {
  if (!text) return `product-${index}`;

  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const ProductDetail = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const getScoreColor = (score) => {

    const safe = Number(score) || 0;

    if (safe < 40) return '#ef4444';
    if (safe < 70) return '#f59e0b';
    return '#22c55e';

  };

  useEffect(() => {

    const loadProduct = async () => {

      try {

        setLoading(true);
        setNotFound(false);

        const response = await fetch(`${API_BASE_URL}/weekly-deals-analysis`);

        if (!response.ok) throw new Error("API failed");

        const data = await response.json();

        const formattedProducts = data.map((item, index) => ({

          id: createSlug(item.product_name, index),

          name: item.product_name,
          image: item.product_image_url,
          images: [item.product_image_url],

          redditUrl: item.reddit_url,
          externalUrl: item.external_url,

          trustScore: Math.round((item.trust_analysis?.trust_score || 0) * 100),
          sentimentScore: Math.round((item.trust_analysis?.sentiment_score || 0) * 100),
          credibilityScore: Math.round((item.trust_analysis?.credibility_score || 0) * 100),
          recencyScore: Math.round((item.trust_analysis?.recency_score || 0) * 100),
          verifiedRatio: Math.round((item.trust_analysis?.verified_ratio || 0) * 100),

          confidenceInterval: item.trust_analysis?.confidence_interval || 0,

          commentsAnalyzed: Math.round(
            1 / ((item.trust_analysis?.confidence_interval || 1) ** 2)
          )

        }));

        const found = formattedProducts.find(p => p.id === id);

        if (!found) setNotFound(true);
        else setProduct(found);

      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }

    };

    loadProduct();

  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="page">
        <div className="container">
          <p>Product not found</p>
          <Link to="/">← Back</Link>
        </div>
      </div>
    );
  }

  return (

    <div className="product-detail page">

      <div className="container">

        <Link to="/" className="back-link">
          ← Back to Products
        </Link>

        <div className="detail-grid">

          {/* IMAGE */}
          <div className="gallery">
            <div className="main-image-wrap">
              <img
                src={product.images?.[activeImage] || product.image}
                alt={product.name}
                className="main-image"
              />
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="detail-info-panel">

            {/* TRUST SCORE (UNCHANGED LOGIC + KEEP BAR HERE OR REMOVE IF YOU WANT) */}
            <div className="gauge-container">

              <CircularProgress
                percentage={product.trustScore || 0}
                size="large"
                variant="gauge"
              />

              <div className="gauge-score-text">

                <p className="final-score-label">
                  FINAL TRUST SCORE
                </p>

                <p className="final-score-value">
                  <strong>{product.trustScore || 0}</strong>/100
                </p>

              </div>

            </div>

            <hr className="panel-divider" />

            {/* STATS + BARS (USING YOUR EXACT BAR LOGIC) */}
            <div className="stat-rows">

              {/* COMMENTS */}
              <div className="stat-row">
                💬 Comments: {product.commentsAnalyzed}
              </div>

              {/* SENTIMENT */}
              <div className="stat-row">
                😊 Sentiment: {product.sentimentScore}%

                <div
                  style={{
                    width: '100%',
                    height: '10px',
                    background: '#e5e7eb',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    marginTop: '12px'
                  }}
                >
                  <div
                    style={{
                      width: `${product.sentimentScore || 0}%`,
                      height: '100%',
                      background: getScoreColor(product.sentimentScore),
                      transition: '0.3s ease'
                    }}
                  />
                </div>
              </div>

              {/* CREDIBILITY */}
              <div className="stat-row">
                🛡️ Credibility: {product.credibilityScore}%

                <div
                  style={{
                    width: '100%',
                    height: '10px',
                    background: '#e5e7eb',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    marginTop: '12px'
                  }}
                >
                  <div
                    style={{
                      width: `${product.credibilityScore || 0}%`,
                      height: '100%',
                      background: getScoreColor(product.credibilityScore),
                      transition: '0.3s ease'
                    }}
                  />
                </div>
              </div>

              {/* RECENCY */}
              <div className="stat-row">
                ⏳ Recency: {product.recencyScore}%

                <div
                  style={{
                    width: '100%',
                    height: '10px',
                    background: '#e5e7eb',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    marginTop: '12px'
                  }}
                >
                  <div
                    style={{
                      width: `${product.recencyScore || 0}%`,
                      height: '100%',
                      background: getScoreColor(product.recencyScore),
                      transition: '0.3s ease'
                    }}
                  />
                </div>
              </div>

              {/* VERIFIED */}
              <div className="stat-row">
                ✅ Verified: {product.verifiedRatio}%

                <div
                  style={{
                    width: '100%',
                    height: '10px',
                    background: '#e5e7eb',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    marginTop: '12px'
                  }}
                >
                  <div
                    style={{
                      width: `${product.verifiedRatio || 0}%`,
                      height: '100%',
                      background: getScoreColor(product.verifiedRatio),
                      transition: '0.3s ease'
                    }}
                  />
                </div>
              </div>

            </div>

            {/* ACTIONS */}
            <div className="detail-actions">

              <a
                href={product.redditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-blue w-full"
              >
                View Original Thread
              </a>

              <a
                href={product.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full"
              >
                Buy from Verified Seller
              </a>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ProductDetail;