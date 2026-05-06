import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import SupplierComparison from './pages/SupplierComparison/SupplierComparison'
import MerchantPortal from './pages/MerchantPortal/MerchantPortal'
import PricingTiers from './pages/PricingTiers/PricingTiers'
// import AnalyticsReport from './pages/AnalyticsReport/AnalyticsReport'
import './index.css'

// ─── ROUTES ────────────────────────────────────────────────────────────────────
// Add new pages here as the product grows.
// Each <Route> maps a URL path to a page component.
// ───────────────────────────────────────────────────────────────────────────────

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/product/:id"   element={<ProductDetail />} />
        <Route path="/compare/:id"   element={<SupplierComparison />} />
        <Route path="/merchant"      element={<MerchantPortal />} />
        <Route path="/pricing"       element={<PricingTiers />} />
        {/* <Route path="/report/:id"    element={<AnalyticsReport />} /> */}
      </Routes>
    </Router>
  )
}

export default App
