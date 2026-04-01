import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Lightbulb } from 'lucide-react';

const TABS = [
  { key: 'strengths',       label: 'Strengths',    icon: CheckCircle,  color: '#2ecc71' },
  { key: 'weaknesses',      label: 'Weaknesses',   icon: AlertTriangle, color: '#f39c12' },
  { key: 'missingCriteria', label: 'Missing Parts', icon: XCircle,     color: '#e74c3c' },
  { key: 'suggestions',     label: 'Suggestions',   icon: Lightbulb,   color: 'var(--color-secondary)' },
];

export default function FeedbackPanel({ strengths = [], weaknesses = [], missingCriteria = [], suggestions = [] }) {
  const [active, setActive] = useState('strengths');

  const data = { strengths, weaknesses, missingCriteria, suggestions };
  const activeTab = TABS.find(t => t.key === active);
  const ActiveIcon = activeTab.icon;

  return (
    <div className="card">
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
        Detailed <span className="header-accent" style={{ marginLeft: '5px' }}>Feedback</span>
      </h2>

      {/* Tab Bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {TABS.map(tab => {
          const Icon = tab.icon;
          const count = data[tab.key]?.length || 0;
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px', borderRadius: '30px', border: 'none',
                cursor: 'pointer', transition: 'all 0.2s',
                background: isActive ? `${tab.color}20` : 'rgba(255,255,255,0.04)',
                color: isActive ? tab.color : '#777',
                fontWeight: isActive ? '700' : '400',
                outline: isActive ? `2px solid ${tab.color}50` : 'none',
                fontSize: '0.9rem'
              }}
            >
              <Icon size={16} />
              {tab.label}
              <span style={{
                background: isActive ? tab.color : 'rgba(255,255,255,0.1)',
                color: isActive ? '#000' : '#aaa',
                borderRadius: '50%', width: '20px', height: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.7rem', fontWeight: 'bold'
              }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '1.5rem', borderLeft: `4px solid ${activeTab.color}` }}>
        {data[active].length === 0 ? (
          <p style={{ color: '#555', fontStyle: 'italic' }}>
            {active === 'missingCriteria'
              ? '✓ All criteria appear to be addressed.'
              : 'No items found in this category.'}
          </p>
        ) : (
          <ol style={{ margin: 0, paddingLeft: '20px', lineHeight: '2' }}>
            {data[active].map((item, i) => (
              <li key={i} style={{ color: '#ccc', marginBottom: '6px' }}>
                <span style={{ color: activeTab.color, marginRight: '6px' }}>
                  <ActiveIcon size={14} style={{ verticalAlign: 'middle' }} />
                </span>
                {item}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
