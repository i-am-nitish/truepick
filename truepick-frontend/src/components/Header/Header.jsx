import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-section">
          <div className="logo">
            {/* Replace "truepicklogo.png" with your actual JPG filename if you add a .jpg file to the public folder */}
            <img 
              src="/truepicklogo.png" 
              alt="TruePick Logo" 
              style={{ width: '48px', height: '48px', objectFit: 'contain' }} 
            />
          </div>
          <div className="brand">
            <h1 className="brand-name">TruePick</h1>
            <p className="tagline">Viral Products, Verified by Data.</p>
          </div>
        </Link>

        <form className="search-section" onSubmit={handleSearch}>
          <div className="search-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search viral trends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <nav className="nav-links">
          <Link to="/merchant" className="nav-link">For Merchants</Link>
          <Link to="/pricing" className="nav-link">Pricing</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
