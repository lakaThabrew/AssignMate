import React from 'react';

export const SkeletonCard = () => (
  <div className="card" style={{ height: '120px', background: 'rgba(255,255,255,0.02)', position: 'relative', overflow: 'hidden' }}>
    <div className="skeleton-shine" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)', animation: 'shine 1.5s infinite' }}></div>
  </div>
);

export const SkeletonStats = () => (
  <div className="card" style={{ height: '100px', background: 'rgba(255,255,255,0.02)', position: 'relative', overflow: 'hidden' }}>
    <div className="skeleton-shine" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)', animation: 'shine 1.5s infinite' }}></div>
  </div>
);
