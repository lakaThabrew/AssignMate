import React, { useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { CheckCircle, AlertTriangle, Info, ShieldAlert, Navigation, ArrowLeft } from 'lucide-react';
import axios from 'axios';

export default function Results() {
  const { id } = useParams();
  const location = useLocation();
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If we have state (passing from Upload or Dashboard)
    if (location.state && location.state.evaluation) {
      setEvaluation(location.state.evaluation);
      setLoading(false);
    } 
    // If no state but we have an ID (page refresh or direct link)
    else if (id && id !== 'new') {
      axios.get(`http://localhost:5000/api/history/${id}`)
        .then(res => {
          setEvaluation(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching evaluation:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, location]);

  if (loading) return <div style={{ textAlign: 'center', padding: '10rem' }}><div className="loader"></div><p>Fetching evaluation report...</p></div>;

  if (!evaluation) return (
    <div className="card" style={{ textAlign: 'center', padding: '5rem' }}>
      <AlertTriangle size={48} color="#e74c3c" style={{ marginBottom: '1rem' }} />
      <h2>Report Not Found</h2>
      <p style={{ marginTop: '1rem', color: '#666' }}>We couldn't find the evaluation report you're looking for.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '2rem' }}><ArrowLeft size={20} /> Back to Dashboard</Link>
    </div>
  );

  const scoreColor = evaluation.scorePredicted >= 80 ? 'var(--color-accent)' : evaluation.scorePredicted >= 60 ? '#f0ad4e' : '#dc3545';

  return (
    <div>
      <div className="header-light" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
        <div>
          <h1 style={{ color: 'var(--color-dark)', marginBottom: '5px' }}>Evaluation Report</h1>
          <p style={{ color: '#666' }}>Document analysis finished safely.</p>
        </div>
        <div style={{ '--score-pct': `${evaluation.scorePredicted}%` }} className="score-circle">
          <div className="score-circle-text" style={{ color: scoreColor }}>
            {evaluation.scorePredicted}
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#155724' }}>
            <CheckCircle size={24} /> Strengths
          </h2>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
            {evaluation.strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>

        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#721c24' }}>
            <AlertTriangle size={24} /> Missing Criteria
          </h2>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
            {evaluation.missingCriteria.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        </div>
      </div>

      <div className="card">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>
          <Navigation size={24} /> Improvement Suggestions
        </h2>
        <div style={{ background: 'rgba(193, 191, 255, 0.1)', padding: '1.5rem', borderRadius: '8px' }}>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.8', margin: 0 }}>
            {evaluation.suggestions.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <Info size={24} /> Rubric Alignment
          </h2>
          {evaluation.rubricBreakdown.map((r, i) => (
            <div key={i} className={`rubric-item ${r.status === 'missing' ? 'missing' : ''}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '600' }}>{r.criterion}</span>
                <span className={`badge ${r.status === 'met' ? 'badge-success' : r.status === 'partial' ? 'badge-warning' : 'badge-danger'}`}>
                  {r.score}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#856404' }}>
            <ShieldAlert size={24} /> Plagiarism / Originality
          </h2>
          <p>The document was analyzed against known academic databases and patterns.</p>
          <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#fff3cd', border: '1px solid #ffeeba', borderRadius: '8px', color: '#856404', fontWeight: 'bold' }}>
            Risk Level: {evaluation.plagiarismRisk}
          </div>
          <p style={{ marginTop: '20px', color: '#666', fontSize: '0.9rem' }}>
            * Note: This score is a prediction based on structural commonalities and LLM analysis.
          </p>
        </div>
      </div>

    </div>
  );
}
