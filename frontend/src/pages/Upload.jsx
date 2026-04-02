import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { evaluationService } from '../services/api';
import logger from '../utils/logger';

export default function Upload() {
  const [assignment, setAssignment] = useState(null);
  const [rubrics, setRubrics] = useState([]);
  const [selectedRubricId, setSelectedRubricId] = useState('');
  const [rubricText, setRubricText] = useState('');
  const [academicLevel, setAcademicLevel] = useState('University Undergraduate');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    evaluationService.getRubrics().then(res => {
      setRubrics(res.data);
    }).catch(err => logger.error("Error loading rubrics", err));
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAssignment(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAssignment(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!assignment) {
      setError('Please upload an assignment file.');
      return;
    }
    
    // Use selected rubric text or manual text
    let finalRubric = rubricText;
    if (selectedRubricId && selectedRubricId !== 'manual') {
      const rubric = rubrics.find(r => r._id === selectedRubricId);
      finalRubric = JSON.stringify(rubric.criteria);
    }

    if (!finalRubric.trim() && selectedRubricId === 'manual') {
      setError('Please provide rubric text.');
      return;
    }
    
    if (!selectedRubricId) {
      setError('Please select a rubric to continue.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('assignment', assignment);
      formData.append('rubricText', finalRubric);
      formData.append('academicLevel', academicLevel);

      const response = await evaluationService.evaluate(formData);
      navigate(`/results/${response.data._id}`, { state: { evaluation: response.data } });
    } catch (err) {
      logger.error(err);
      setError(err.response?.data?.error || 'Error analyzing assignment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="header-light">
        <h1 style={{ color: 'var(--color-dark)' }}>Start New <span className="header-accent">Evaluation</span></h1>
        <p style={{ marginTop: '10px', color: '#666' }}>Upload an assignment and select a rubric for AI analysis.</p>
      </div>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        {error && (
          <div style={{ background: '#f8d7da', color: '#721c24', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>1. Upload Assignment (PDF/DOCX)</label>
            <div 
              className="file-drop"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => document.getElementById('assignmentFile').click()}
            >
              <input 
                type="file" 
                id="assignmentFile" 
                accept=".pdf,.docx" 
                style={{ display: 'none' }} 
                onChange={handleFileChange}
              />
              {assignment ? (
                <>
                  <CheckCircle className="file-icon" style={{ color: '#28a745' }} size={48} />
                  <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>{assignment.name}</div>
                  <div style={{ color: '#666' }}>{(assignment.size / 1024 / 1024).toFixed(2)} MB</div>
                </>
              ) : (
                <>
                  <UploadCloud className="file-icon" size={48} />
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Drag & Drop file here</div>
                  <div style={{ color: '#666' }}>or click to browse</div>
                  <div style={{ fontSize: '0.85rem', color: '#999', marginTop: '10px' }}>Supports PDF and DOCX</div>
                </>
              )}
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>2. Academic Level / Context</label>
            <select 
              className="form-control" 
              value={academicLevel} 
              onChange={(e) => setAcademicLevel(e.target.value)}
              style={{ padding: '15px' }}
            >
              <option value="Primary School">Primary School</option>
              <option value="Secondary School">Secondary School (High School)</option>
              <option value="University Undergraduate">University Undergraduate</option>
              <option value="Post-Graduate/Masters/PhD">Post-Graduate / Masters / PhD</option>
              <option value="Professional Certification">Professional Certification</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>3. Select Grading Rubric</label>
            <select 
              className="form-control" 
              value={selectedRubricId} 
              onChange={(e) => setSelectedRubricId(e.target.value)}
              style={{ padding: '15px', marginBottom: '1rem' }}
            >
              <option value="">-- Choose a predefined rubric --</option>
              {rubrics.map(r => (
                <option key={r._id} value={r._id}>{r.title}</option>
              ))}
              <option value="manual">Enter custom rubric text</option>
            </select>

            {(selectedRubricId === 'manual' || rubrics.length === 0) && (
              <textarea 
                className="form-control" 
                rows="6" 
                placeholder="Paste rubric criteria here (e.g., Introduction: 20%, Methodology: 30%, ...)"
                value={rubricText}
                onChange={(e) => setRubricText(e.target.value)}
                style={{ padding: '15px' }}
              />
            )}
            
            {selectedRubricId && selectedRubricId !== 'manual' && (
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  <Settings size={14} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  Selected rubric criteria will be used for automated scoring.
                </p>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
            disabled={loading}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                <div className="loader" style={{ width: '20px', height: '20px', margin: '0', borderWidth: '3px' }}></div>
                Analyzing Document...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                <FileText size={20} />
                Generate Deep Analysis
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
