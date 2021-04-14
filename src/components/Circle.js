import React from 'react';
import PropTypes from 'prop-types';

const Circle = props => {
  const {
    quantity,
  } = props;

  const width = 80;
  const height = 80;
  const strWidth = 6;
  const radius = (width / 2) - (strWidth * 2);
  const circumference = radius * 2 * Math.PI;
  const strCircumference = `${circumference} ${circumference}`;
  const completed = circumference - ((circumference / 100) * quantity);

  return (
    <div className="book-child records">
      <svg style={{
        width,
        height,
      }}
      >
        <defs>
          <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
            <stop offset="60%" stopColor="#4333B3" />
            <stop offset="110%" stopColor="#E04534" />
          </radialGradient>
        </defs>
        <circle
          r={radius}
          cx={width / 2}
          cy={height / 2}
          stroke="#e8e8e8"
          style={{
            strokeWidth: strWidth,
            fill: 'transparent',
          }}
        />
        <circle
          r={radius}
          cx={width / 2}
          cy={height / 2}
          stroke="url(#gradient)"
          style={{
            strokeWidth: strWidth,
            strokeDasharray: strCircumference,
            strokeDashoffset: completed,
            fill: 'transparent',
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
          }}
        />
      </svg>
    </div>
  );
};

Circle.propTypes = {
  quantity: PropTypes.number.isRequired,
};

export default Circle;
