import React, { useState } from 'react';
import './MerchantPortal.css';

const MerchantPortal = () => {

  const [form, setForm] = useState({
    title: '',
    productUrl: '',
    productImageUrl: '',
    viralUrl: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // =====================================================
  // INSIGHTS
  // =====================================================

  const generateRecommendations = (trust) => {
    const tips = [];

    if (!trust) return tips;

    if (trust.trust_score < 0.7) {
      tips.push('Increase verified customer reviews to improve trust.');
    }

    if (trust.red_flag_penalty > 0.2) {
      tips.push('Negative keywords detected frequently. Improve customer satisfaction.');
    }

    if (trust.sentiment_score < 0.5) {
      tips.push('Overall sentiment is low. Improve product quality or support.');
    }

    if (trust.recency_score < 0.5) {
      tips.push('Recent engagement is weak. Run new campaigns or promotions.');
    }

    if (trust.verified_ratio < 0.5) {
      tips.push('Encourage more verified purchases and authentic reviews.');
    }

    if (tips.length === 0) {
      tips.push('Your product has strong credibility and customer trust.');
    }

    return tips;
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch('https://backend-truepick.onrender.com/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_name: form.title,
          external_url: form.productUrl,
          reddit_url: form.viralUrl
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'API Error');
      }

      data.product_image_url =
        form.productImageUrl || data.product_image_url;

      const tips = generateRecommendations(data.trust_analysis);

      setRecommendations(tips);
      setResult(data);
      setSubmitted(true);

    } catch (err) {
      console.error(err);
      alert('API request failed');
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI HELPERS (progress bars)
  // =====================================================

  const getScoreColor = (score) => {
    const safe = (Number(score) || 0) * 100;

    if (safe < 40) return '#ef4444';
    if (safe < 70) return '#f59e0b';
    return '#22c55e';
  };

  const ProgressBar = ({ value }) => {
    const safe = Math.max(0, Math.min((Number(value) || 0) * 100, 100));

    return (
      <div
        style={{
          width: '100%',
          height: '10px',
          background: '#e5e7eb',
          borderRadius: '999px',
          overflow: 'hidden',
          marginTop: '10px'
        }}
      >
        <div
          style={{
            width: `${safe}%`,
            height: '100%',
            background: getScoreColor(value),
            transition: '0.3s ease'
          }}
        />
      </div>
    );
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="merchant-page page">

      <div className="container">

        <div className="merchant-hero">
          <h2 className="merchant-title">
            <span className="brand-highlight">TruePick</span>{' '}
            Merchant Portal: Audit Your Product Credibility
          </h2>
        </div>

        <div className="merchant-form-wrap">

          {submitted && result ? (

            <div className="success-msg">

              <h3>✓ Audit Completed</h3>

              <div className="audit-card">

                <img
                  src={result.product_image_url}
                  alt={result.product_name}
                  className="audit-image"
                />

                <h2>{result.product_name}</h2>


                {/* ================= TRUST SCORE ================= */}
                <p>
                  <strong>Trust Score:</strong>{' '}
                  {Math.round((result.trust_analysis.trust_score || 0) * 100)}%
                </p>
                <ProgressBar value={result.trust_analysis.trust_score} />

                {/* ================= SENTIMENT ================= */}
                <p style={{ marginTop: '12px' }}>
                  <strong>Sentiment:</strong>{' '}
                  {Math.round((result.trust_analysis.sentiment_score || 0) * 100)}%
                </p>
                <ProgressBar value={result.trust_analysis.sentiment_score} />

                {/* ================= CREDIBILITY ================= */}
                <p style={{ marginTop: '12px' }}>
                  <strong>Credibility:</strong>{' '}
                  {Math.round((result.trust_analysis.credibility_score || 0) * 100)}%
                </p>
                <ProgressBar value={result.trust_analysis.credibility_score} />

                {/* ================= VERIFIED ================= */}
                <p style={{ marginTop: '12px' }}>
                  <strong>Verified Ratio:</strong>{' '}
                  {Math.round((result.trust_analysis.verified_ratio || 0) * 100)}%
                </p>
                <ProgressBar value={result.trust_analysis.verified_ratio} />

                <p style={{ marginTop: '12px' }}>
                  <strong>Red Flag Penalty:</strong>{' '}
                  {result.trust_analysis.red_flag_penalty}
                </p>

                <div className="recommendations">
                  <h4>Insights</h4>
                  <ul>
                    {recommendations.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>

              </div>

              <button
                className="btn btn-outline-blue"
                onClick={() => {
                  setSubmitted(false);
                  setResult(null);
                  setRecommendations([]);
                }}
              >
                Submit Another
              </button>

            </div>

          ) : (

            <form className="merchant-form" onSubmit={handleSubmit}>

              <h3 className="form-title">Submit your Product for Audit:</h3>

              <div className="form-grid">

                <div className="field">
                  <label>Product Name</label>
                  <input name="title" value={form.title} onChange={handleChange} required />
                </div>

                <div className="field">
                  <label>Product URL</label>
                  <input name="productUrl" type="url" value={form.productUrl} onChange={handleChange} required />
                </div>

                <div className="field">
                  <label>Product Image URL</label>
                  <input name="productImageUrl" type="url" value={form.productImageUrl} onChange={handleChange} />
                </div>

                <div className="field">
                  <label>Thread URL</label>
                  <input name="viralUrl" value={form.viralUrl} onChange={handleChange} required />
                </div>

              </div>

              <div className="form-footer">
                <button type="submit" disabled={loading} className="btn btn-outline-blue btn-proceed">
                  {loading ? 'Analyzing...' : 'Proceed →'}
                </button>
              </div>

            </form>

          )}

        </div>

      </div>

    </div>
  );
};

export default MerchantPortal;