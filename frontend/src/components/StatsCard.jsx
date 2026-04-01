import React from 'react';

export default function StatsCard({ label, value, icon: Icon, color = 'var(--color-primary)' }) {
  return (
    <div className="card" style={{ padding: '1.5rem', marginBottom: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p style={{ color: '#aaa', fontSize: '0.9rem' }}>{label}</p>
          <h2 style={{ fontSize: '2rem', margin: '5px 0' }}>{value}</h2>
        </div>
        {Icon && <Icon size={32} color={color} />}
      </div>
    </div>
  );
}
