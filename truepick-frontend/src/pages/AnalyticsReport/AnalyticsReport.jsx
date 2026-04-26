import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAnalytics, fetchProductById } from '../../utils/mockData';
import './AnalyticsReport.css';

const AnalyticsReport = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const load = async () => {
      const [p, a] = await Promise.all([fetchProductById(id), fetchAnalytics(parseInt(id))]);
      setProduct(p);
      setAnalytics(a);
    };
    load();
  }, [id]);

  if (!product || !analytics) {
    return (
      <div className="report-page page">
        <div className="container">
          <Link to="/" className="back-link">← Back</Link>
          <p style={{ marginTop: '2rem', color: 'var(--color-gray-500)' }}>
            No analytics report available for this product yet. Check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="report-page page">
      <div className="container">
        <Link to={`/product/${id}`} className="back-link">← Back to Product</Link>

        <div className="report-header">
          <p className="report-label">TruePick: Strategic Market Intelligence</p>
          <h2 className="report-title">Report: {analytics.productName}</h2>
        </div>

        <div className="report-body">
          <h3 className="section-title">Data Insights Breakdown</h3>

          <div className="insight-grid">
            {/* Negative Heatmap */}
            <div className="insight-card dark">
              <h4>Common Negative Feedback by Feature</h4>
              <div className="heatmap-grid">
                {analytics.negativeHeatmap?.map((item) => (
                  <div key={item.feature} className="heatmap-cell">
                    <div className="heatmap-label">{item.feature}</div>
                    <div className="heatmap-value">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sentiment Bars */}
            <div className="insight-card dark">
              <h4>Sentiment by Product Feature</h4>
              <div className="sentiment-bars">
                {analytics.sentimentData?.filter((v, i, a) => a.findIndex(t => t.feature === v.feature) === i).map((item) => (
                  <div key={item.feature} className="sentiment-row">
                    <div className="sentiment-labels">
                      <span>{item.feature}</span>
                      <span>{item.score > 0 ? '+' : ''}{item.score.toFixed(2)}</span>
                    </div>
                    <div className="bar-track">
                      <div
                        className={`bar-fill ${item.score < 0 ? 'negative' : ''}`}
                        style={{ width: `${Math.abs(item.score) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="recommendations-card">
            <h4>Recommendations for Improvement</h4>
            <p>{analytics.recommendations.summary}</p>
            <p className="reco-highlight">
              <strong>Recommendation:</strong> {analytics.recommendations.recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReport;
