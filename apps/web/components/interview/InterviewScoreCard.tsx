import React from 'react';

export default function InterviewScoreCard() {
  const scores = [
    { label: 'Communication', score: 82, color: 'from-sky-400 to-indigo-500' },
    { label: 'Confidence', score: 76, color: 'from-indigo-400 to-purple-500' },
    { label: 'STAR Compliance', score: 71, color: 'from-purple-400 to-fuchsia-500' },
    { label: 'Technical Depth', score: 79, color: 'from-fuchsia-400 to-rose-500' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full">
      <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Performance Metrics</h2>
      <div className="grid grid-cols-2 gap-4">
        {scores.map((stat, idx) => (
          <div key={idx} className="relative bg-slate-50 p-4 rounded-xl border border-slate-100 overflow-hidden group hover:border-indigo-200 transition-colors">
            {/* Animated progress background indicator */}
            <div 
              className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color} transition-all duration-1000 ease-out`} 
              style={{ width: `${stat.score}%` }}
            ></div>
            
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-end gap-1">
              <span className="text-3xl font-black text-slate-900 tracking-tighter">{stat.score}</span>
              <span className="text-sm font-bold text-slate-400 mb-1">/100</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
