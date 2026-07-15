import React from 'react';
import './SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-location"></div>
        <div className="skeleton-description">
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
      </div>

      <div className="skeleton-highlights">
        <div className="skeleton-tag"></div>
        <div className="skeleton-tag"></div>
      </div>

      <div className="skeleton-footer">
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
