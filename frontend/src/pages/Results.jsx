import React, { useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { AlertTriangle, Info, ShieldAlert, ArrowLeft, TrendingUp } from 'lucide-react';
import FeedbackPanel from '../components/FeedbackPanel';
import { evaluationService } from '../services/api';

export default function Results() {
  const { id } = useParams();
  const location = useLocation();
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.evaluation) {
      setEvaluation(location.state.evaluation);
      setLoading(false);
    } else if (id) {
      evaluationService.getById(id)
        .then(res => { setEvaluation(res.data); setLoading(false); })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id, location]);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '10rem' }}>
      <div className="loader"></div>
      <p style={{ marginTop: '1rem', color: '#aaa' }}>Fetching evaluation report...</p>
    </div>
  );

  if (!evaluation) return (
    <div className="card" style={{ textAlign: 'center', padding: '5rem' }}>
      <AlertTriangle size={48} color="#e74c3c" style={{ marginBottom: '1rem' }} />
      <h2>Report Not Found</h2>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '2rem' }}><ArrowLeft size={20} /> Back to Dashboard</Link>
    </div>
  );

  const { scorePredicted, strengths = [], weaknesses = [], missingCriteria = [], suggestions = [], plagiarismRisk, rubricBreakdown = [] } = evaluation;

  const scoreColor = scorePredicted >= 80 ? '#2ecc71' : scorePredicted >= 60 ? '#f39c12' : '#e74c3c';
  const scoreLabel = scorePredicted >= 80 ? 'Excellent' : scorePredicted >= 60 ? 'Satisfactory' : 'Needs Work';

  const statusColor = { met: '#2ecc71', partial: '#f39c12', missing: '#e74c3c' };
  const plagiarismColor = { Low: '#2ecc71', Medium: '#f39c12', High: '#e74c3c' };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <Link to="/" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>
            Evaluation <span className="header-accent">Report</span>
          </h1>
          <p style={{ color: '#666', marginTop: '5px' }}>{evaluation.assignmentName}</p>
        </div>
        {/* Score Circle */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '140px', height: '140px', borderRadius: '50%',
            border: `6px solid ${scoreColor}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: `radial-gradient(circle, ${scoreColor}15, transparent)`,
            boxShadow: `0 0 30px ${scoreColor}40`
          }}>
            <span style={{ fontSize: '2.8rem', fontWeight: 'bold', color: scoreColor }}>{scorePredicted}</span>
            <span style={{ fontSize: '0.75rem', color: '#aaa' }}>/ 100</span>
          </div>
          <p style={{ color: scoreColor, fontWeight: 'bold', marginTop: '8px', fontSize: '0.9rem' }}>{scoreLabel}</p>
        </div>
      </div>

      {/* Rubric Breakdown - main analysis section */}
      {rubricBreakdown.length > 0 && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <Info size={22} color="var(--color-primary)" /> Criterion-by-Criterion Analysis
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {rubricBreakdown.map((r, i) => {
              const coverage = r.coveragePercent ?? (r.status === 'met' ? 100 : r.status === 'partial' ? 55 : 5);
              const color = statusColor[r.status] || '#aaa';
              return (
                <div key={i} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '1.2rem', borderLeft: `4px solid ${color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: '700', fontSize: '1rem' }}>{r.criterion}</span>
                      {r.weight && <span style={{ fontSize: '0.75rem', color: '#aaa', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '20px' }}>{r.weight}%</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: 'bold', color, fontSize: '0.95rem' }}>{r.score}</span>
                      <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', background: `${color}20`, color }}>{r.status.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Coverage bar */}
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px' }}>
                    <div style={{ height: '100%', width: `${coverage}%`, background: `linear-gradient(90deg, ${color}, ${color}aa)`, borderRadius: '10px', transition: 'width 1s ease' }}></div>
                  </div>

                  {/* Supporting Evidence */}
                  {r.supportingEvidence && (
                    <blockquote style={{ margin: 0, padding: '8px 12px', borderLeft: '3px solid rgba(255,255,255,0.1)', color: '#888', fontSize: '0.85rem', fontStyle: 'italic', lineHeight: '1.6' }}>
                      "{r.supportingEvidence}"
                    </blockquote>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tabbed Feedback Panel */}
      <FeedbackPanel
        strengths={strengths}
        weaknesses={weaknesses}
        missingCriteria={missingCriteria}
        suggestions={suggestions}
      />

      {/* Plagiarism */}
      <div>
        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#f39c12' }}>
            <ShieldAlert size={22} /> Plagiarism / Originality
          </h2>
          <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>
            Based on structural patterns, writing style consistency, and generic phrasing analysis.
          </p>
          <div style={{ padding: '1rem 1.5rem', borderRadius: '12px', background: `${plagiarismColor[plagiarismRisk] || '#aaa'}15`, border: `1px solid ${plagiarismColor[plagiarismRisk] || '#aaa'}40`, display: 'flex', alignItems: 'center', gap: '15px' }}>
            <TrendingUp size={24} color={plagiarismColor[plagiarismRisk] || '#aaa'} />
            <div>
              <p style={{ fontSize: '0.8rem', color: '#aaa' }}>Risk Level</p>
              <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: plagiarismColor[plagiarismRisk] || '#aaa' }}>{plagiarismRisk}</p>
            </div>
          </div>
          <p style={{ marginTop: '1rem', color: '#555', fontSize: '0.8rem' }}>* Prediction based on AI pattern detection. Not a definitive plagiarism check.</p>
        </div>
      </div>
    </div>
  );
}
