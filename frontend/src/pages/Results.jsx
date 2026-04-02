import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Download,
  AlertCircle,
  TrendingUp,
  BrainCircuit,
  Zap,
  Target,
  ChevronRight,
} from "lucide-react";
import api from "../services/api";
import generatePDF from "../utils/pdfExport";
import logger from "../utils/logger";
import { useRole } from "../context/useRole";

const Results = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role, userInfo } = useRole();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const headers = {
          "x-user-role": role,
        };
        if (userInfo.email) {
          headers["x-user-email"] = userInfo.email;
        }

        const res = await api.get(`/history/${id}`, { headers });
        setData(res.data);
      } catch (err) {
        logger.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [id, role, userInfo.email]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 animate-pulse font-medium">
          Generating Report with Gemini 3 Pro AI...
        </p>
      </div>
    );

  if (!data)
    return (
      <div className="glass-card max-w-lg mx-auto mt-20 p-12 text-center">
        <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Report Not Found</h2>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>
      </div>
    );

  return (
    <div className="results-container pb-20 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 mt-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="text-slate-400 hover:text-white flex items-center gap-2 text-sm mb-2 transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Overview
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Evaluation <span className="text-primary italic">Result</span>
            </h1>
            <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-mono text-slate-400">
              #{id?.substring(0, 8)}
            </span>
          </div>
          <p className="text-slate-400 mt-1 flex items-center gap-2">
            <FileText size={14} /> {data.assignmentName}
          </p>
        </div>

        <button
          onClick={() => generatePDF(data)}
          className="btn-primary flex items-center gap-3 px-6 py-3 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
        >
          <Download size={20} /> Download PDF Report
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Score & Key Metrics */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap size={120} />
            </div>
            <h3 className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-2">
              Overall Score
            </h3>
            <div className="relative inline-block">
              <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 leading-none">
                {data.scorePredicted}
              </div>
              <div className="absolute -right-8 bottom-2 text-xl font-bold text-slate-500">
                /100
              </div>
            </div>
            <div className="mt-8 bg-slate-800/50 h-3 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-1000 ease-out"
                style={{ width: `${data.scorePredicted}%` }}
              ></div>
            </div>
          </div>

          <div
            className={`glass-card p-6 border-l-4 ${data.plagiarismRisk === "High" ? "border-red-500 pulse-animation" : "border-emerald-500"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="flex items-center gap-2 font-bold text-lg">
                <Target size={20} className="text-slate-500" /> Plagiarism
              </h3>
              <span
                className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                  data.plagiarismRisk === "High"
                    ? "bg-red-500 text-white"
                    : data.plagiarismRisk === "Medium"
                      ? "bg-amber-500 text-black"
                      : "bg-emerald-500 text-white"
                }`}
              >
                {data.plagiarismRisk} RISK
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {data.plagiarismRisk === "Low"
                ? "Our AI audit found the writing to be highly original and consistent with authentic human prose."
                : "Warning: High level of predictable linguistic patterns detected. Recommend thorough manual review."}
            </p>
          </div>
        </div>

        {/* Breakdown & Analysis */}
        <div className="lg:col-span-8 space-y-8">
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="flex items-center gap-3 font-bold text-xl text-white">
                <CheckCircle className="text-emerald-500" size={24} />
                Rubric Breakdown
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900/50 text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5">
                    <th className="px-8 py-4">Criterion</th>
                    <th className="px-8 py-4">Weight</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.rubricBreakdown.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="font-bold text-slate-200 group-hover:text-white transition-colors">
                          {item.criterion}
                        </div>
                        <div className="text-xs text-slate-500 mt-1 max-w-sm italic opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300">
                          Evidence: "{item.supportingEvidence}"
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-slate-500"
                              style={{ width: `${item.weight}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-mono text-slate-400">
                            {item.weight}%
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`status-pill ${item.status}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right font-mono font-bold text-primary">
                        {item.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-8 border-t-4 border-emerald-500/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/10 rounded-xl">
                  <BrainCircuit className="text-emerald-400" size={24} />
                </div>
                <h3 className="font-bold text-lg text-white">Top Strengths</h3>
              </div>
              <ul className="space-y-4">
                {data.strengths.map((s, i) => (
                  <li key={i} className="flex gap-4 group">
                    <ChevronRight
                      size={18}
                      className="text-emerald-500 mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform"
                    />
                    <span className="text-sm text-slate-300 leading-relaxed">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-8 border-t-4 border-amber-500/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-500/10 rounded-xl">
                  <AlertCircle className="text-amber-400" size={24} />
                </div>
                <h3 className="font-bold text-lg text-white">Growth Areas</h3>
              </div>
              <ul className="space-y-4">
                {data.suggestions.map((s, i) => (
                  <li key={i} className="flex gap-4 group">
                    <Zap
                      size={16}
                      className="text-amber-500 mt-1 flex-shrink-0 group-hover:rotate-12 transition-transform"
                    />
                    <span className="text-sm text-slate-300 leading-relaxed">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
