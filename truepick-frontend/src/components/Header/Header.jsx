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
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M12 36L18 12L36 18L30 42L12 36Z" fill="url(#gradient1)" />
              <path d="M18 12L36 18L42 6L24 0L18 12Z" fill="url(#gradient2)" />
              <defs>
                <linearGradient id="gradient1" x1="12" y1="12" x2="36" y2="42">
                  <stop stopColor="#2D9B87" />
                  <stop offset="1" stopColor="#1A7566" />
                </linearGradient>
                <linearGradient id="gradient2" x1="18" y1="0" x2="42" y2="18">
                  <stop stopColor="#3FAAA0" />
                  <stop offset="1" stopColor="#2D9B87" />
                </linearGradient>
              </defs>
            </svg>
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
