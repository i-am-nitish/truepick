import React from 'react'
import { pricingTiers, submitPurchase } from '../../utils/mockData'
import './PricingTiers.css'

const PricingTiers = () => {
  const handleSelect = async (tier) => {
    const result = await submitPurchase(tier.id)
    alert(result.message)
  }

  return (
    <div className="pricing-page page">
      <div className="container">

        <div className="pricing-hero">
          <h2 className="pricing-title">Audit Tiers:</h2>
        </div>

        <div className="tiers-grid">
          {pricingTiers.map((tier) => (
            <div key={tier.id} className={`tier-card ${tier.highlighted ? 'featured' : ''}`}>
              <div className="tier-header">
                <h3 className="tier-name">{tier.name}</h3>
                <p className="tier-sub">{tier.subtitle}</p>
                <div className="tier-price">${tier.price}</div>
              </div>
              <hr className="tier-divider" />
              <ul className="tier-features">
                {tier.features.map(f => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <button className="btn-select" onClick={() => handleSelect(tier)}>
                Select and Pay
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default PricingTiers
