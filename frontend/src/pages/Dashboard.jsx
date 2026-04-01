import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, PlusCircle } from 'lucide-react';
import axios from 'axios';

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/history')
      .then(res => {
        setHistory(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching history", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <section className="hero-section">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-dark)' }}>
            Elevate Grading with <span className="header-accent">AI Precision</span>
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#555', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Rubric-aware academic evaluation system that analyzes student assignments against lecturer requirements to provide structured feedback and score prediction.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <Link to="/upload" className="btn btn-primary">
              <FileText size={20} />
              Start New Evaluation
            </Link>
          </div>
        </div>
      </section>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Recent Evaluations</h2>
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : history.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: '#666', marginBottom: '1rem' }}>No evaluations found.</p>
          <Link to="/upload" className="btn btn-primary"><PlusCircle size={20} /> Create the first one</Link>
        </div>
      ) : (
        <div className="grid-2">
          {history.map((evalDoc) => (
            <div key={evalDoc._id} className="card" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ background: 'var(--color-light)', padding: '15px', borderRadius: '12px', color: 'var(--color-accent)' }}>
                <FileText size={32} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '5px' }}>{evalDoc.assignmentName}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>
                  {new Date(evalDoc.createdAt).toLocaleString()}
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span className={`badge ${evalDoc.scorePredicted >= 80 ? 'badge-success' : evalDoc.scorePredicted >= 60 ? 'badge-warning' : 'badge-danger'}`}>
                    Score: {evalDoc.scorePredicted}/100
                  </span>
                  {evalDoc.missingCriteria && evalDoc.missingCriteria.length > 0 && (
                    <span className="badge badge-warning">{evalDoc.missingCriteria.length} Missing</span>
                  )}
                </div>
              </div>
              <Link to={`/results/${evalDoc._id}`} state={{ evaluation: evalDoc }} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>View</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
