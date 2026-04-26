import React from 'react';
import './CircularProgress.css';

const CircularProgress = ({ percentage, size = 'medium', showLabel = true, variant = 'circle' }) => {
  const radius = size === 'large' ? 90 : size === 'medium' ? 50 : 30;
  const stroke = size === 'large' ? 12 : size === 'medium' ? 8 : 6;
  const normalizedRadius = radius - stroke * 2;
  
  const sizeClass = `circular-progress--${size}`;
  const variantClass = `circular-progress--${variant}`;

  if (variant === 'gauge') {
    // For a semicircle, circumference is PI * r. We draw a half circle path.
    const circumference = normalizedRadius * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    // SVG path for a top half circle: 
    // Start at (stroke*2, radius)
    // Arc to (radius*2 - stroke*2, radius)
    // with radius = normalizedRadius
    const startX = stroke * 2;
    const endX = radius * 2 - stroke * 2;
    const startY = radius;
    const pathData = `M ${startX} ${startY} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${endX} ${startY}`;

    return (
      <div className={`circular-progress ${sizeClass} ${variantClass}`}>
        {/* We only need half the height for a gauge */}
        <svg
          height={radius}
          width={radius * 2}
          className="circular-progress-svg-gauge"
        >
          <path
            className="circular-progress-bg"
            d={pathData}
            strokeWidth={stroke}
            fill="transparent"
            strokeLinecap="round"
          />
          <path
            className="circular-progress-bar"
            d={pathData}
            strokeWidth={stroke}
            fill="transparent"
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  // Default circle variant
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`circular-progress ${sizeClass} ${variantClass}`}>
      <svg
        height={radius * 2}
        width={radius * 2}
        className="circular-progress-svg"
      >
        <circle
          className="circular-progress-bg"
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className="circular-progress-bar"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      {showLabel && (
        <div className="circular-progress-label">
          <span className="percentage">{percentage}%</span>
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
