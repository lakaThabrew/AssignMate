import React, { useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import useEvaluations from '../hooks/useEvaluations';
import EvaluationCard from '../components/EvaluationCard';

export default function History() {
  const { history, loading } = useEvaluations();
  const [search, setSearch] = useState('');

  const filtered = history.filter(item => 
    item.assignmentName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="header-light" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Assignment <span className="header-accent">History</span></h1>
          <p style={{ color: '#aaa', marginTop: '10px' }}>Review your previous evaluations and trends.</p>
        </div>
        <BookOpen size={48} color="var(--color-primary)" style={{ opacity: 0.2 }} />
      </div>

      <div className="card" style={{ marginBottom: '2rem', display: 'flex', gap: '15px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
          <input 
            type="text" 
            placeholder="Search by assignment name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '45px', marginBottom: 0 }}
          />
        </div>
        <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Filter size={18} /> Filters
        </button>
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
          <Search size={48} color="#333" style={{ marginBottom: '1.5rem' }} />
          <h3>No reports found</h3>
          <p style={{ color: '#666' }}>Try searching with a different term.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {filtered.map((item) => (
            <EvaluationCard key={item._id} evaluation={item} />
          ))}
        </div>
      )}
    </div>
  );
}
