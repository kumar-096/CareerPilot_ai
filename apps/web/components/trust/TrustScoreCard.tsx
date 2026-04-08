import React from 'react';

export default function TrustScoreCard() {
  const score = 76;
  const verdict = 'Medium Risk';
  const scamProbability = 24;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-lg border border-slate-700 p-6 relative overflow-hidden flex flex-col justify-between h-full group">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-rose-500/10 blur-3xl group-hover:bg-rose-500/20 transition-all duration-700"></div>
      
      <div className="relative z-10">
        <h2 className="font-bold text-slate-300 uppercase tracking-widest text-xs mb-6">Trust Verdict</h2>
        
        <div className="flex items-end gap-4 mb-2">
          <span className="text-6xl font-black text-white tracking-tighter tabular-nums leading-none">
            {score}
          </span>
          <span className="text-xl font-bold text-slate-400 mb-1">/ 100</span>
        </div>
        
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-bold mt-2 border border-amber-500/30">
          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {verdict}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-700/50 relative z-10">
        <div className="flex justify-between items-center text-sm font-medium text-slate-300 mb-2">
          <span>Scam Probability</span>
          <span className="text-white font-bold">{scamProbability}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden shadow-inner flex">
          <div className="bg-rose-500 h-2 rounded-l-full" style={{ width: `${scamProbability}%` }}></div>
          <div className="bg-emerald-500 h-2 rounded-r-full" style={{ width: `${100 - scamProbability}%` }}></div>
        </div>
      </div>
    </div>
  );
}
