import React, { useEffect, useState } from 'react';
import { TrendingUp, Users, AlertCircle, BookOpen, Clock, Activity, Zap, BarChart3, ChevronRight } from 'lucide-react';
import { useRole } from '../context/RoleContext';
import { Link } from 'react-router-dom';
import useEvaluations from '../hooks/useEvaluations';
import Hero from '../components/Hero';
import StatsCard from '../components/StatsCard';
import EvaluationCard from '../components/EvaluationCard';
import { ScoreHistoryChart, DistributionChart } from '../components/Charts';
import api from '../services/api';

export default function Dashboard() {
  const { role, userInfo } = useRole();
  const { history, loading: historyLoading } = useEvaluations();
  const [analytics, setAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(role === 'lecturer');

  useEffect(() => {
    if (role === 'lecturer') {
      api.get("/analytics/summary")
        .then(res => setAnalytics(res.data))
        .catch(err => console.error("Analytics fetch fail:", err))
        .finally(() => setLoadingAnalytics(false));
    }
  }, [role]);

  const averageScore = history.length > 0 
    ? (history.reduce((acc, curr) => acc + curr.scorePredicted, 0) / history.length).toFixed(1) 
    : 0;

  const isLecturer = role === 'lecturer';
  const loading = historyLoading || (isLecturer && loadingAnalytics);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Online</span>
          </div>
          <h2 style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Welcome back, {userInfo.name || (isLecturer ? 'Lecturer' : 'Student')}
          </h2>
          <h1 className="text-4xl font-extrabold mt-1 tracking-tight text-white">
            Workspace <span className="header-accent italic">Overview</span>
          </h1>
        </div>
        <div className="hidden md:flex flex-col items-end text-slate-500">
           <div className="flex items-center gap-2 font-mono text-sm">
             <Clock size={14} />
             {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
           </div>
           <span className="text-[10px] uppercase font-bold tracking-tighter">Region: Global-1</span>
        </div>
      </div>

      {!isLecturer && <Hero />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {isLecturer ? (
          <>
            <StatsCard label="Class Average" value={`${analytics?.avgScore || 0}%`} icon={TrendingUp} color="#6366f1" />
            <StatsCard label="Total Papers" value={analytics?.total || 0} icon={Users} color="#10b981" />
            <StatsCard label="High Risk" value={analytics?.plagiarismSummary?.High || 0} icon={AlertCircle} color="#ef4444" />
            <StatsCard label="Success Rate" value="92%" icon={Activity} color="#8b5cf6" />
          </>
        ) : (
          <>
            <StatsCard label="Personal Average" value={`${averageScore}%`} icon={Zap} color="#f59e0b" />
            <StatsCard label="Evaluations" value={history.length} icon={BookOpen} color="#6366f1" />
            <StatsCard label="Improvement" value="+12%" icon={TrendingUp} color="#10b981" />
            <StatsCard label="Status" value="On Track" icon={Activity} color="#8b5cf6" />
          </>
        )}
      </div>

      {isLecturer && analytics && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 glass-card p-6">
            <DistributionChart distribution={analytics.scoreDistribution} />
          </div>
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="text-primary" />
              <h3 className="font-bold text-lg">Top Pain Points</h3>
            </div>
            <div className="space-y-4">
              {analytics.commonWeaknesses.map((w, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-xs font-mono text-slate-500">0{i+1}</span>
                    <span className="text-sm truncate font-medium">{w.text}</span>
                  </div>
                  <span className="px-2 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-slate-400">
                    {w.count} hits
                  </span>
                </div>
              ))}
              {analytics.commonWeaknesses.length === 0 && (
                <p className="text-slate-500 text-sm italic">Gathering data from submissions...</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <ChevronRight size={24} className="text-primary" />
          {isLecturer ? 'Global Submissions' : 'Your Recent AI Audits'}
        </h2>
        {history.length > 5 && <Link to="/results" className="text-primary hover:underline text-sm font-semibold">View All History</Link>}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1,2,3,4].map(n => (
            <div key={n} className="glass-card h-48 animate-pulse p-6">
               <div className="w-1/2 h-6 bg-white/5 rounded-lg mb-4"></div>
               <div className="w-1/3 h-4 bg-white/5 rounded-lg mb-8"></div>
               <div className="flex gap-4">
                  <div className="w-20 h-8 bg-white/5 rounded-full"></div>
                  <div className="w-20 h-8 bg-white/5 rounded-full"></div>
               </div>
            </div>
          ))}
        </div>
      ) : history.length === 0 ? (
        <div className="glass-card p-20 text-center flex flex-col items-center gap-4">
          <div className="p-6 bg-white/5 rounded-full">
            <BookOpen size={48} className="text-slate-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold">No Records Found</h3>
            <p className="text-slate-500">System is ready for new evaluations.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {history.map((evalDoc) => (
            <EvaluationCard key={evalDoc._id} evaluation={evalDoc} />
          ))}
        </div>
      )}
    </div>
  );
}
