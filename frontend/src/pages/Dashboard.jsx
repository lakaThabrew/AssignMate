import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, BarChart, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
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
            <Link to="/rubrics" className="btn btn-outline">
              Manage Rubrics
            </Link>
          </div>
        </div>
      </section>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Recent Evaluations</h2>
        <Link to="/results" className="nav-link">View All</Link>
      </div>

      <div className="grid-2">
        <div className="card" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ background: 'var(--color-light)', padding: '15px', borderRadius: '12px', color: 'var(--color-accent)' }}>
            <FileText size={32} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: '5px' }}>CS101 Final Project</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>Analyzed 2 hours ago</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span className="badge badge-success">Score: 85/100</span>
              <span className="badge badge-warning">2 Missing Criteria</span>
            </div>
          </div>
          <Link to="/results/1" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>View</Link>
        </div>

        <div className="card" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ background: 'var(--color-light)', padding: '15px', borderRadius: '12px', color: 'var(--color-accent)' }}>
            <FileText size={32} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: '5px' }}>Data Science Assignment</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>Analyzed yesterday</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span className="badge badge-warning">Score: 68/100</span>
              <span className="badge badge-danger">High Plagiarism Risk</span>
            </div>
          </div>
          <Link to="/results/2" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>View</Link>
        </div>
      </div>
    </div>
  );
}
