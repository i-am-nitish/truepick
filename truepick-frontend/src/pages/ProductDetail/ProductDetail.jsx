import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CircularProgress from '../../components/CircularProgress/CircularProgress';
import { fetchProductById } from '../../utils/mockData';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    load();
  }, [id]);

  if (!product) return <div className="page"><div className="container"><p>Loading...</p></div></div>;

  return (
    <div className="product-detail page">
      <div className="container">
        <Link to="/" className="back-link">← Back to Products</Link>

        <div className="detail-grid">
          {/* Image Gallery */}
          <div className="gallery">
            <div className="main-image-wrap">
              <img src={product.images?.[activeImage] || product.image} alt={product.name} className="main-image" />
            </div>
            {product.images?.length > 1 && (
              <div className="thumbnails">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className={`thumb ${i === activeImage ? 'active' : ''}`}
                    onClick={() => setActiveImage(i)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Panel: Trust Score & Stats */}
          <div className="detail-info-panel">
            
            <div className="gauge-container">
              <CircularProgress percentage={product.trustScore} size="large" variant="gauge" />
              <div className="gauge-score-text">
                <p className="final-score-label">FINAL TRUST SCORE :</p>
                <p className="final-score-value"><strong>{product.trustScore}</strong>/100</p>
              </div>
            </div>

            <hr className="panel-divider" />

            <div className="stat-rows">
              <div className="stat-row">
                <div className="stat-icon blue">💬</div>
                <div className="stat-text">Comments Analyzed: {product.commentsAnalyzed?.toLocaleString()}+</div>
              </div>

              <div className="stat-row">
                <div className="stat-icon green">✅</div>
                <div className="stat-text">
                  Positive Keywords Identified:<br/>
                  <span className="stat-keywords">
                    {product.positiveKeywords?.map(k => `"${k}"`).join(', ')}
                  </span>
                </div>
              </div>

              <div className="stat-row">
                <div className="stat-icon red">🚨</div>
                <div className="stat-text">
                  Red Flags Found: <strong>{product.redFlags || 0}</strong>
                </div>
              </div>
            </div>

            <div className="detail-actions">
              {/* <Link to={`/report/${id}`} className="btn btn-outline-blue w-full">
                View Full Analytics Report
              </Link> */}
              <a href={product.viralThreadUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-blue w-full">
                View Original Viral Thread
              </a>
              <Link to={`/compare/${id}`} className="btn btn-primary w-full">
                Buy from Verified Seller
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
