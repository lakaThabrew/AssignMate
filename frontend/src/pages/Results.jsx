import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, Info, ShieldAlert, Navigation } from 'lucide-react';

export default function Results() {
  const location = useLocation();
  const [evaluation, setEvaluation] = useState(null);

  // Mock data to preview UI layout if accessed directly
  const mockData = {
    scorePredicted: 82,
    strengths: [
      "Excellent introduction and clear thesis statement.",
      "Methodology section uses rigorous statistical tools.",
      "Good structure and readability."
    ],
    weaknesses: [
      "Missing critical review of existing literature in chapter 2.",
      "Conclusion is too brief and rushed."
    ],
    missingCriteria: [
      "Original dataset link or reference not provided.",
      "No appendices with code snippets as requested."
    ],
    suggestions: [
      "Expand the literature review by citing recent 2024 papers.",
      "Add a detailed discussion on limitations.",
      "Include dataset references and code block in the appendix."
    ],
    plagiarismRisk: "Low (12% match)",
    rubricBreakdown: [
      { criterion: "Introduction", status: "met", score: "20/20" },
      { criterion: "Methodology", status: "met", score: "25/30" },
      { criterion: "Literature Review", status: "partial", score: "10/20" },
      { criterion: "Conclusion", status: "missing", score: "5/15" },
      { criterion: "Formatting", status: "met", score: "15/15" },
    ]
  };

  useEffect(() => {
    if (location.state && location.state.evaluation) {
      setEvaluation(location.state.evaluation);
    } else {
      setEvaluation(mockData); // Use mock for demo
    }
  }, [location]);

  if (!evaluation) return <div style={{ textAlign: 'center', padding: '5rem' }}><div className="loader"></div></div>;

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
