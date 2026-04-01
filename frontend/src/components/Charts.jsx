import React from 'react';
import {
  RadialBarChart, RadialBar, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend
} from 'recharts';

/* ── 1. Radial Score Gauge ───────────────────────────────────── */
export function ScoreGauge({ score }) {
  const color = score >= 80 ? '#2ecc71' : score >= 60 ? '#f39c12' : '#e74c3c';
  const label  = score >= 80 ? 'Excellent' : score >= 60 ? 'Satisfactory' : 'Needs Work';
  const data   = [{ name: 'score', value: score }];

  return (
    <div style={{ textAlign: 'center' }}>
      <ResponsiveContainer width="100%" height={200}>
        <RadialBarChart
          cx="50%" cy="80%" innerRadius="70%" outerRadius="100%"
          startAngle={180} endAngle={0} data={data}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background={{ fill: 'rgba(255,255,255,0.05)' }}
            dataKey="value" angleAxisId={0}
            fill={color} cornerRadius={10}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div style={{ marginTop: '-30px' }}>
        <div style={{ fontSize: '3.5rem', fontWeight: 800, color, lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: '0.85rem', color: '#aaa', marginTop: '4px' }}>/ 100 &nbsp;·&nbsp; {label}</div>
      </div>
    </div>
  );
}

/* ── 2. Criteria Horizontal Bar Chart ───────────────────────── */
const STATUS_COLOR = { met: '#2ecc71', partial: '#f39c12', missing: '#e74c3c' };

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: '10px', fontSize: '0.85rem' }}>
      <p style={{ margin: 0, fontWeight: 700, color: '#fff' }}>{d.criterion}</p>
      <p style={{ margin: '4px 0 0', color: STATUS_COLOR[d.status] || '#aaa' }}>{d.coverage}% coverage · {d.score}</p>
    </div>
  );
};

export function CriteriaChart({ rubricBreakdown = [] }) {
  if (!rubricBreakdown.length) return null;
  const chartData = rubricBreakdown.map(r => ({
    criterion: r.criterion?.length > 16 ? r.criterion.slice(0, 16) + '…' : r.criterion,
    coverage: r.coveragePercent ?? (r.status === 'met' ? 100 : r.status === 'partial' ? 55 : 10),
    status: r.status,
    score: r.score,
  }));

  return (
    <div>
      <h3 style={{ marginBottom: '1rem' }}>Criteria Coverage</h3>
      <ResponsiveContainer width="100%" height={Math.max(200, chartData.length * 52)}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 20 }}>
          <XAxis type="number" domain={[0, 100]} tick={{ fill: '#555', fontSize: 11 }} tickFormatter={v => `${v}%`} />
          <YAxis type="category" dataKey="criterion" width={110} tick={{ fill: '#aaa', fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="coverage" radius={[0, 6, 6, 0]}>
            {chartData.map((d, i) => (
              <Cell key={i} fill={STATUS_COLOR[d.status] || '#555'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ── 3. Score History Line Chart ────────────────────────────── */
export function ScoreHistoryChart({ history = [] }) {
  const data = history.slice(-10).map((h, i) => ({
    name: `#${i + 1}`,
    score: h.scorePredicted,
    title: h.assignmentName,
  }));

  if (data.length < 2) return null;

  return (
    <div>
      <h3 style={{ marginBottom: '1rem' }}>Score Trend (Last {data.length} Submissions)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="name" tick={{ fill: '#555', fontSize: 11 }} />
          <YAxis domain={[0, 100]} tick={{ fill: '#555', fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
            labelStyle={{ color: '#fff' }}
            formatter={(val, _, props) => [`${val}/100`, props.payload.title]}
          />
          <Line
            type="monotone" dataKey="score" stroke="var(--color-primary)"
            strokeWidth={2.5} dot={{ r: 5, fill: 'var(--color-primary)', strokeWidth: 0 }}
            activeDot={{ r: 7, fill: 'var(--color-secondary)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
