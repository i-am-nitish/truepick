import React from 'react'
import { Link } from 'react-router-dom'
import CircularProgress from '../CircularProgress/CircularProgress'
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const { id, name, image, trustScore, platforms } = product

  const handlePlatformClick = (e, platform) => {
    e.preventDefault(); // Prevent navigating to the product detail page
    e.stopPropagation();
    // Open a search for this product on the respective platform
    window.open(`https://www.${platform}.com/search?q=${encodeURIComponent(name)}`, '_blank');
  };

  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
        
        <div className="platform-badges">
          {platforms?.includes('tiktok') && (
            <div className="platform-badge" onClick={(e) => handlePlatformClick(e, 'tiktok')}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
              </svg>
            </div>
          )}
          {platforms?.includes('instagram') && (
            <div className="platform-badge" onClick={(e) => handlePlatformClick(e, 'instagram')}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                <path d="M10 1.802c2.67 0 2.987.01 4.041.059 2.71.123 3.975 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.01 2.988-.057 4.042-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zM10 0C7.284 0 6.944.012 5.877.06 2.246.227.228 2.242.06 5.877.01 6.944 0 7.284 0 10s.012 3.057.06 4.123c.167 3.632 2.182 5.65 5.817 5.817 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c3.629-.167 5.652-2.182 5.816-5.817.05-1.066.061-1.407.061-4.123s-.012-3.056-.06-4.122C19.777 2.249 17.76.228 14.124.06 13.057.01 12.716 0 10 0zm0 4.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27zm0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666zm5.338-9.87a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" />
              </svg>
            </div>
          )}
          {platforms?.includes('facebook') && (
            <div className="platform-badge" onClick={(e) => handlePlatformClick(e, 'facebook')}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" />
              </svg>
            </div>
          )}
        </div>

        {/* Overlay score at bottom-right of image */}
        <div className="trust-score-overlay">
          <CircularProgress percentage={trustScore} size="small" />
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
      </div>
    </Link>
  )
}

export default ProductCard
