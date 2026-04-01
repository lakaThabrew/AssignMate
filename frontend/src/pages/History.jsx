import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Search, Filter, ArrowRight, BookOpen } from 'lucide-react';
import axios from 'axios';
import { useRole } from '../App';

export default function History() {
  const { role } = useRole();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredHistory = history.filter(item => 
    item.assignmentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="header-light">
        <h1>Evaluation <span className="header-accent">History</span></h1>
        <p style={{ color: '#aaa', marginTop: '10px' }}>Review and manage all {role === 'student' ? 'your' : 'class'} past submissions.</p>
      </div>

      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', display: 'flex', gap: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
            <input 
              type="text" 
              placeholder="Search by assignment name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '45px', width: '100%' }}
            />
          </div>
          <button className="btn btn-outline" style={{ display: 'flex', gap: '8px' }}>
            <Filter size={18} /> Filter
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '4rem' }}><div className="loader"></div></div>
        ) : filteredHistory.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <FileText size={48} color="#333" style={{ marginBottom: '1rem' }} />
            <p style={{ color: '#666' }}>No evaluations found matching your search.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', color: '#aaa', fontSize: '0.9rem' }}>
                <th style={{ padding: '1.2rem' }}>Assignment Name</th>
                <th style={{ padding: '1.2rem' }}>Date</th>
                <th style={{ padding: '1.2rem' }}>Score</th>
                <th style={{ padding: '1.2rem' }}>Status</th>
                <th style={{ padding: '1.2rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item) => (
                <tr key={item._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '1.2rem', fontWeight: 'bold' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FileText size={18} color="var(--color-primary)" />
                      {item.assignmentName}
                    </div>
                  </td>
                  <td style={{ padding: '1.2rem', color: '#aaa' }}>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '1.2rem' }}>
                    <span style={{ fontWeight: 'bold' }}>{item.scorePredicted}</span>/100
                  </td>
                  <td style={{ padding: '1.2rem' }}>
                    <span className={`badge ${item.scorePredicted >= 80 ? 'badge-success' : item.scorePredicted >= 60 ? 'badge-warning' : 'badge-danger'}`}>
                      {item.scorePredicted >= 80 ? 'Passed' : 'Review'}
                    </span>
                  </td>
                  <td style={{ padding: '1.2rem' }}>
                    <Link to={`/results/${item._id}`} state={{ evaluation: item }} className="nav-link" style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      Full Report <ArrowRight size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
