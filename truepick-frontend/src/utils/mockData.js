// ─────────────────────────────────────────────────────────────────────────────
// mockData.js  —  TEMPORARY MOCK DATA
//
// HOW TO INTEGRATE WITH BACKEND:
//   1. Replace each function below with a real fetch() / axios call to your API.
//   2. Keep the same function names and return shapes — the UI depends on them.
//   3. Example for fetchProducts():
//        export const fetchProducts = async () => {
//          const res = await fetch('https://your-api.com/products')
//          return res.json()
//        }
//
// DATA SHAPES ARE DOCUMENTED ABOVE EACH EXPORT.
// ─────────────────────────────────────────────────────────────────────────────


// ─── PRODUCT SHAPE ────────────────────────────────────────────────────────────
// {
//   id:               number       — unique product identifier
//   name:             string       — product display name
//   brand:            string       — seller / brand name
//   image:            string       — main image URL
//   images:           string[]     — all product image URLs (gallery)
//   trustScore:       number       — 0–100 trust score
//   commentsAnalyzed: number       — total comments scanned
//   platforms:        string[]     — ['tiktok', 'instagram', 'facebook']
//   positiveKeywords: string[]     — top positive phrases found
//   redFlags:         number       — count of red-flag signals
//   viralThreadUrl:   string       — original viral post URL
// }

const mockProducts = [
  {
    id: 1,
    name: 'Sunset Lamp',
    brand: 'Trentsource',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
      'https://images.unsplash.com/photo-1534337621606-e3df5ee0e97f?w=800',
    ],
    trustScore: 92,
    commentsAnalyzed: 12000,
    platforms: ['tiktok', 'instagram', 'facebook'],
    positiveKeywords: ['High quality', 'Fast shipping', 'Game changer'],
    redFlags: 0,
    viralThreadUrl: 'https://tiktok.com/example',
  },
  {
    id: 2,
    name: 'Smart Air Condenser',
    brand: 'TechHome',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
    trustScore: 82,
    commentsAnalyzed: 8500,
    platforms: ['tiktok', 'instagram'],
    positiveKeywords: ['Quiet operation', 'Energy efficient', 'Easy install'],
    redFlags: 2,
    viralThreadUrl: 'https://tiktok.com/example2',
  },
  {
    id: 3,
    name: 'Portable Projector',
    brand: 'ViewMax',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800',
    images: ['https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800'],
    trustScore: 77,
    commentsAnalyzed: 6200,
    platforms: ['tiktok', 'instagram'],
    positiveKeywords: ['Bright display', 'Compact', 'Good value'],
    redFlags: 1,
    viralThreadUrl: 'https://tiktok.com/example3',
  },
  {
    id: 4,
    name: 'Smart Essential Oil Diffuser',
    brand: 'AromaLife',
    image: 'https://images.unsplash.com/photo-1602874801006-e421a0e18c3b?w=800',
    images: ['https://images.unsplash.com/photo-1602874801006-e421a0e18c3b?w=800'],
    trustScore: 82,
    commentsAnalyzed: 9100,
    platforms: ['tiktok', 'facebook', 'instagram'],
    positiveKeywords: ['Calming', 'Beautiful design', 'Long lasting'],
    redFlags: 0,
    viralThreadUrl: 'https://instagram.com/example4',
  },
  {
    id: 5,
    name: 'Portable Projector',
    brand: 'CinemaGo',
    image: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=800',
    images: ['https://images.unsplash.com/photo-1593642532400-2682810df593?w=800'],
    trustScore: 79,
    commentsAnalyzed: 5800,
    platforms: ['tiktok', 'facebook', 'instagram'],
    positiveKeywords: ['HD quality', 'Portable', 'Easy setup'],
    redFlags: 1,
    viralThreadUrl: 'https://tiktok.com/example5',
  },
  {
    id: 6,
    name: 'Geometric Light Fixture',
    brand: 'ModernLux',
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800',
    images: ['https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800'],
    trustScore: 77,
    commentsAnalyzed: 7300,
    platforms: ['tiktok', 'facebook', 'instagram'],
    positiveKeywords: ['Unique design', 'Warm light', 'Statement piece'],
    redFlags: 3,
    viralThreadUrl: 'https://instagram.com/example6',
  },
  {
    id: 7,
    name: 'Diamond Light Sculpture',
    brand: 'LuxDecor',
    image: 'https://images.unsplash.com/photo-1545652985-5edd365b12eb?w=800',
    images: ['https://images.unsplash.com/photo-1545652985-5edd365b12eb?w=800'],
    trustScore: 68,
    commentsAnalyzed: 4500,
    platforms: ['tiktok', 'facebook', 'instagram'],
    positiveKeywords: ['Modern', 'Eye-catching', 'Conversation starter'],
    redFlags: 5,
    viralThreadUrl: 'https://tiktok.com/example7',
  },
  {
    id: 8,
    name: 'Sunset Lamp Pro',
    brand: 'Trentsource',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
    images: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800'],
    trustScore: 72,
    commentsAnalyzed: 6800,
    platforms: ['tiktok', 'facebook', 'instagram'],
    positiveKeywords: ['Adjustable', 'Great ambiance', 'Quality build'],
    redFlags: 2,
    viralThreadUrl: 'https://tiktok.com/example8',
  },
]


// ─── SUPPLIER SHAPE ───────────────────────────────────────────────────────────
// {
//   platform:   string   — e.g. 'Amazon' | 'Flipkart'
//   seller:     string   — seller display name
//   sellerInfo: string   — seller sub-label / store name
//   price:      number   — price in USD
//   delivery:   string   — delivery timeframe text
//   logo:       string   — 'amazon' | 'flipkart' (used for logo rendering)
//   verified:   boolean  — TruePick verified supplier
//   url:        string   — affiliate / checkout URL
// }

const mockSuppliers = {
  1: [
    {
      platform: 'Amazon',
      seller: 'Trentsource via Amazon',
      sellerInfo: 'Trentstore B2C',
      price: 34.99,
      delivery: '2-day Delivery',
      logo: 'amazon',
      verified: true,
      url: 'https://amazon.com/example',
    },
    {
      platform: 'Flipkart',
      seller: 'Placewell via Flipkart',
      sellerInfo: 'Placewell Sales',
      price: 29.99,
      delivery: 'Same day Delivery',
      logo: 'flipkart',
      verified: true,
      url: 'https://flipkart.com/example',
    },
  ],
}


// ─── ANALYTICS SHAPE ──────────────────────────────────────────────────────────
// {
//   productName:     string
//   sentimentData:   { feature: string, score: number, count: number }[]
//   negativeHeatmap: { feature: string, value: number }[]
//   recommendations: { summary: string, recommendation: string }
// }

const mockAnalytics = {
  1: {
    productName: 'Sunset Lamp',
    sentimentData: [
      { feature: 'Vibrancy',      score:  0.95, count: 2100 },
      { feature: 'Durability',    score:  0.95, count: 1800 },
      { feature: 'Durability',    score: -0.4,  count:  450 },
      { feature: 'Shipping',      score: -0.2,  count:  320 },
      { feature: 'Color Accuracy',score:  0.11, count:  890 },
    ],
    negativeHeatmap: [
      { feature: 'Base Stability',     value: 0.84 },
      { feature: 'Brightness Control', value: 0.29 },
      { feature: 'Cord Length',        value: 0.25 },
      { feature: 'Color Accuracy',     value: 0.02 },
    ],
    recommendations: {
      summary: 'Based on 12,000 comment analysis, consumer complaints are concentrated on base weight and cord durability.',
      recommendation: 'Increase Base weight by 20% and use Braided Cords to capture +15% more positive sentiment.',
    },
  },
}


// ─── PRICING TIERS SHAPE ──────────────────────────────────────────────────────
// {
//   id:          number
//   name:        string
//   subtitle:    string
//   price:       number
//   features:    string[]
//   highlighted: boolean   — true = premium/featured card
// }

export const pricingTiers = [
  {
    id: 1,
    name: 'Basic Data Audit',
    subtitle: 'Sentiment scan only',
    price: 199,
    features: ['Basic Data Audit', 'Sentiment Scan'],
    highlighted: false,
  },
  {
    id: 2,
    name: 'Standard Verification',
    subtitle: '+ Competitive Analysis',
    price: 399,
    features: ['Basic Data Audit', 'Competitive Analysis', 'Product Verification', 'Product Analysis'],
    highlighted: false,
  },
  {
    id: 3,
    name: 'Premium Validation',
    subtitle: '+ Physical Sample testing',
    price: 799,
    features: ['Standard Verification', 'Physical Sample Testing', 'Product Trend Forecasting'],
    highlighted: true,
  },
]


// ─────────────────────────────────────────────────────────────────────────────
// API FUNCTIONS
// These are the only functions imported by page components.
// Replace the body of each with your real API call — do NOT change the names.
// ─────────────────────────────────────────────────────────────────────────────

// GET /api/products
export const fetchProducts = async () => {
  // TODO: replace with → const res = await fetch('/api/products'); return res.json()
  return mockProducts
}

// GET /api/products/:id
export const fetchProductById = async (id) => {
  // TODO: replace with → const res = await fetch(`/api/products/${id}`); return res.json()
  return mockProducts.find(p => p.id === parseInt(id))
}

// GET /api/products/:id/suppliers
export const fetchSuppliers = async (productId) => {
  // TODO: replace with → const res = await fetch(`/api/products/${productId}/suppliers`); return res.json()
  return mockSuppliers[productId] || []
}

// GET /api/products/:id/analytics
export const fetchAnalytics = async (productId) => {
  // TODO: replace with → const res = await fetch(`/api/products/${productId}/analytics`); return res.json()
  return mockAnalytics[productId]
}

// POST /api/merchant/submit
export const submitMerchantForm = async (formData) => {
  // TODO: replace with →
  //   const res = await fetch('/api/merchant/submit', { method: 'POST', body: JSON.stringify(formData), headers: { 'Content-Type': 'application/json' } })
  //   return res.json()
  console.log('Merchant form submitted:', formData)
  return { success: true }
}

// POST /api/pricing/purchase
export const submitPurchase = async (tierId) => {
  // TODO: replace with → integrate Stripe / Razorpay payment gateway here
  console.log('Purchase initiated for tier:', tierId)
  return { success: true, message: 'Redirecting to payment...' }
}
