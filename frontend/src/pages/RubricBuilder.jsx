import React, { useState } from 'react';
import { Plus, Trash2, Save, FileText, Sparkles } from 'lucide-react';

export default function RubricBuilder() {
  const [title, setTitle] = useState('');
  const [criteria, setCriteria] = useState([
    { id: 1, name: 'Introduction', weight: 20, description: '' },
    { id: 2, name: 'Analysis', weight: 40, description: '' },
    { id: 3, name: 'Conclusion', weight: 20, description: '' },
    { id: 4, name: 'Formatting', weight: 20, description: '' },
  ]);

  const addCriterion = () => {
    setCriteria([...criteria, { id: Date.now(), name: '', weight: 0, description: '' }]);
  };

  const removeCriterion = (id) => {
    setCriteria(criteria.filter(c => c.id !== id));
  };

  const updateCriterion = (id, field, value) => {
    setCriteria(criteria.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const totalWeight = criteria.reduce((sum, c) => sum + Number(c.weight), 0);

  return (
    <div>
      <div className="header-light">
        <h1>Rubric <span className="header-accent">Builder</span></h1>
        <p style={{ color: '#aaa', marginTop: '10px' }}>Create structured grading templates for AI analysis.</p>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div>
          <div className="card">
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>Rubric Title</label>
              <input 
                type="text" 
                placeholder="e.g. CS101 Term Paper Final" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={20} /> Criteria Breakdown
            </h3>

            {criteria.map((c) => (
              <div key={c.id} style={{ display: 'flex', gap: '15px', marginBottom: '1rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ flex: 2 }}>
                  <input 
                    type="text" 
                    placeholder="Criterion Name" 
                    value={c.name}
                    onChange={(e) => updateCriterion(c.id, 'name', e.target.value)}
                    style={{ marginBottom: '5px' }}
                  />
                  <textarea 
                    placeholder="Description / Guidance"
                    rows="2"
                    value={c.description}
                    onChange={(e) => updateCriterion(c.id, 'description', e.target.value)}
                    style={{ fontSize: '0.9rem' }}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <label style={{ fontSize: '0.8rem', color: '#aaa' }}>Weight %</label>
                  <input 
                    type="number" 
                    value={c.weight}
                    onChange={(e) => updateCriterion(c.id, 'weight', e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => removeCriterion(c.id)}
                  style={{ background: 'transparent', border: 'none', color: '#e74c3c', cursor: 'pointer', marginTop: '30px' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            <button onClick={addCriterion} className="btn btn-outline" style={{ borderStyle: 'dashed', width: '100%', marginTop: '1rem' }}>
              <Plus size={20} /> Add New Criterion
            </button>
          </div>
        </div>

        <div>
          <div className="card" style={{ position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>Total Weight:</span>
              <span style={{ fontWeight: 'bold', color: totalWeight === 100 ? '#2ecc71' : '#e74c3c' }}>{totalWeight}%</span>
            </div>
            {totalWeight !== 100 && (
              <p style={{ fontSize: '0.8rem', color: '#e74c3c', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '1.5rem' }}>
                Total weight must equal 100%
              </p>
            )}
            
            <button className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
              <Save size={20} /> Save Rubric
            </button>
            <button className="btn btn-outline" style={{ width: '100%' }}>
              <Sparkles size={20} /> Generate with AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
