import React, { useState } from 'react';
import { submitMerchantForm } from '../../utils/mockData';
import './MerchantPortal.css';

const MerchantPortal = () => {
  const [form, setForm] = useState({ brand: '', title: '', productUrl: '', viralUrl: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitMerchantForm(form);
    setSubmitted(true);
  };

  return (
    <div className="merchant-page page">
      <div className="container">
        <div className="merchant-hero">
          <h2 className="merchant-title">
            <span className="brand-highlight">TruePick</span> Merchant Portal: Audit Your Product or Credibility
          </h2>
        </div>

        <div className="merchant-form-wrap">
          {submitted ? (
            <div className="success-msg">
              <h3>✓ Submitted Successfully!</h3>
              <p>We'll review your product and get back to you shortly.</p>
              <button className="btn btn-outline-blue" onClick={() => setSubmitted(false)}>Submit Another</button>
            </div>
          ) : (
            <form className="merchant-form" onSubmit={handleSubmit}>
              <h3 className="form-title">Submit your Product for Audit:</h3>
              <div className="form-grid">
                <div className="field">
                  {/* Removed label, using placeholder as label per design */}
                  <input name="brand" value={form.brand} onChange={handleChange} placeholder="Your Brand Name" required />
                </div>
                <div className="field">
                  <label>Product Title</label>
                  <input name="title" value={form.title} onChange={handleChange} placeholder="Product Title" required />
                </div>
                <div className="field">
                  <label>Product URL</label>
                  <input name="productUrl" type="url" value={form.productUrl} onChange={handleChange} placeholder="Product URL" required />
                </div>
                <div className="field">
                  <label>Viral Product Link</label>
                  <input name="viralUrl" value={form.viralUrl} onChange={handleChange} placeholder="Viral Post Link (e.g. TikTok / Instagram)" required />
                </div>
              </div>
              <div className="form-footer">
                <button type="submit" className="btn btn-outline-blue btn-proceed">Proceed →</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MerchantPortal;
