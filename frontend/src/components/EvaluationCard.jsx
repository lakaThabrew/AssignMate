import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

export default function EvaluationCard({ evaluation }) {
  const { _id, assignmentName, createdAt, scorePredicted, missingCriteria } = evaluation;

  return (
    <div className="card" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px', color: 'var(--color-primary)' }}>
        <FileText size={32} />
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ marginBottom: '5px' }}>{assignmentName}</h3>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>
          {new Date(createdAt).toLocaleString()}
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span className={`badge ${scorePredicted >= 80 ? 'badge-success' : scorePredicted >= 60 ? 'badge-warning' : 'badge-danger'}`}>
            Score: {scorePredicted}/100
          </span>
          {missingCriteria && missingCriteria.length > 0 && (
            <span className="badge badge-warning" style={{ background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c' }}>
              {missingCriteria.length} Missing
            </span>
          )}
        </div>
      </div>
      <Link to={`/results/${_id}`} state={{ evaluation }} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>View Report</Link>
    </div>
  );
}
