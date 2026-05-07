import React from 'react';
import './CircularProgress.css';

const CircularProgress = ({
  percentage,
  size = 'medium',
  showLabel = true,
  variant = 'circle'
}) => {

  // =====================================================
  // DYNAMIC SCORE COLOR
  // =====================================================

  const getScoreColor = () => {

    if (percentage < 40) {
      return '#ef4444'; // red
    }

    if (percentage < 70) {
      return '#f59e0b'; // yellow
    }

    return '#22c55e'; // green
  };

  const progressColor = getScoreColor();

  // =====================================================
  // SIZE CONFIG
  // =====================================================

  const radius =
    size === 'large'
      ? 90
      : size === 'medium'
      ? 50
      : 30;

  const stroke =
    size === 'large'
      ? 12
      : size === 'medium'
      ? 8
      : 6;

  const normalizedRadius =
    radius - stroke * 2;

  const sizeClass =
    `circular-progress--${size}`;

  const variantClass =
    `circular-progress--${variant}`;

  // =====================================================
  // GAUGE VARIANT
  // =====================================================

  if (variant === 'gauge') {

    const circumference =
      normalizedRadius * Math.PI;

    const strokeDashoffset =
      circumference -
      (percentage / 100) * circumference;

    const startX = stroke * 2;

    const endX =
      radius * 2 - stroke * 2;

    const startY = radius;

    const pathData =
      `M ${startX} ${startY}
       A ${normalizedRadius} ${normalizedRadius}
       0 0 1 ${endX} ${startY}`;

    return (

      <div
        className={`
          circular-progress
          ${sizeClass}
          ${variantClass}
        `}
      >

        <svg
          height={radius}
          width={radius * 2}
          className="
            circular-progress-svg-gauge
          "
        >

          {/* BACKGROUND */}

          <path
            className="
              circular-progress-bg
            "
            d={pathData}
            strokeWidth={stroke}
            fill="transparent"
            strokeLinecap="round"
          />

          {/* PROGRESS */}

          <path
            className="
              circular-progress-bar
            "
            d={pathData}
            strokeWidth={stroke}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              stroke: progressColor
            }}
          />

        </svg>

        {/* LABEL */}

        {showLabel && (

          <div
            className="
              circular-progress-label-gauge
            "
          >

            <span
              className="percentage"
              style={{
                color: progressColor
              }}
            >

              {percentage}%

            </span>

          </div>

        )}

      </div>

    );

  }

  // =====================================================
  // FULL CIRCLE VARIANT
  // =====================================================

  const circumference =
    normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference -
    (percentage / 100) * circumference;

  return (

    <div
      className={`
        circular-progress
        ${sizeClass}
        ${variantClass}
      `}
    >

      <svg
        height={radius * 2}
        width={radius * 2}
        className="
          circular-progress-svg
        "
      >

        {/* BACKGROUND */}

        <circle
          className="
            circular-progress-bg
          "
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* PROGRESS */}

        <circle
          className="
            circular-progress-bar
          "
          strokeWidth={stroke}
          strokeDasharray={
            circumference +
            ' ' +
            circumference
          }
          strokeDashoffset={
            strokeDashoffset
          }
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{
            stroke: progressColor
          }}
        />

      </svg>

      {/* LABEL */}

      {showLabel && (

        <div
          className="
            circular-progress-label
          "
        >

          <span
            className="percentage"
            style={{
              color: progressColor
            }}
          >

            {percentage}%

          </span>

        </div>

      )}

    </div>

  );

};

export default CircularProgress;