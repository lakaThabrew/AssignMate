import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function Upload() {
  const [assignment, setAssignment] = useState(null);
  const [rubricText, setRubricText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    if (!rubricText.trim()) {
      setError('Please provide rubric text or criteria.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('assignment', assignment);
      formData.append('rubricText', rubricText);

      const response = await axios.post('http://localhost:5000/api/evaluate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Navigate to results with the data
      navigate('/results/new', { state: { evaluation: response.data } });
    } catch (err) {
      console.error(err);
      setError('Error analyzing assignment. Please try again or check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="header-light">
        <h1 style={{ color: 'var(--color-dark)' }}>Start New <span className="header-accent">Evaluation</span></h1>
        <p style={{ marginTop: '10px', color: '#666' }}>Upload an assignment and provide the grading rubric for AI analysis.</p>
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
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>1. Upload Assignment (PDF)</label>
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
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>2. Grading Rubric</label>
            <textarea 
              className="form-control" 
              rows="8" 
              placeholder="Paste rubric criteria here (e.g., Introduction: 20%, Methodology: 30%, ...)"
              value={rubricText}
              onChange={(e) => setRubricText(e.target.value)}
              style={{ padding: '15px' }}
            />
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
