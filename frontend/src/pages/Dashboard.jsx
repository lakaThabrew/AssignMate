import React from 'react';
import { TrendingUp, Users, AlertCircle, BookOpen, Clock } from 'lucide-react';
import { useRole } from '../context/RoleContext';
import useEvaluations from '../hooks/useEvaluations';
import Hero from '../components/Hero';
import StatsCard from '../components/StatsCard';
import EvaluationCard from '../components/EvaluationCard';
import { ScoreHistoryChart } from '../components/Charts';

export default function Dashboard() {
  const { role, userInfo } = useRole();
  const { history, loading } = useEvaluations();

  const averageScore = history.length > 0 ? (history.reduce((acc, curr) => acc + curr.scorePredicted, 0) / history.length).toFixed(1) : 0;

  return (
    <div>
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '1rem', color: 'var(--color-primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Welcome back, {userInfo.name || (role === 'student' ? 'Student' : 'Lecturer')}
          </h2>
          <h1 style={{ fontSize: '2.5rem', marginTop: '5px' }}>Your <span className="header-accent">Overview</span></h1>
        </div>
        <div style={{ color: '#aaa', fontSize: '0.9rem' }}>
          <Clock size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
          {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
        </div>
      </div>

      <Hero />

      {role === 'lecturer' ? (
        <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: '2rem' }}>
          <StatsCard label="Average Class Score" value={`${averageScore}%`} icon={TrendingUp} color="var(--color-primary)" />
          <StatsCard label="Total Submissions" value={history.length} icon={Users} color="var(--color-secondary)" />
          <StatsCard label="Common Concern" value="Methodology" icon={AlertCircle} color="#e74c3c" />
        </div>
      ) : (
        <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: '2rem' }}>
          <StatsCard label="Your Average Score" value={`${averageScore}%`} icon={TrendingUp} color="var(--color-primary)" />
          <StatsCard label="Evaluations Count" value={history.length} icon={BookOpen} color="var(--color-secondary)" />
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '1.5rem' }}>
        <h2>{role === 'student' ? 'Your Recent Evaluations' : 'Latest Submissions'}</h2>
      </div>

      {/* Score trend chart */}
      {history.length >= 2 && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <ScoreHistoryChart history={history} />
        </div>
      )}

      {loading ? (
        <div className="loader"></div>
      ) : history.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: '#666', marginBottom: '1rem' }}>No evaluations found.</p>
        </div>
      ) : (
        <div className="grid-2">
          {history.map((evalDoc) => (
            <EvaluationCard key={evalDoc._id} evaluation={evalDoc} />
          ))}
        </div>
      )}
    </div>
  );
}
