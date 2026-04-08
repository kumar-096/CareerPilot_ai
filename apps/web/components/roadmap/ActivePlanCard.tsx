import React from 'react';

export default function ActivePlanCard() {
  const currentDay = 4;
  const totalDays = 7;
  const progressPercent = Math.round(( (currentDay - 1) / totalDays) * 100);

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl shadow-lg border border-indigo-800 p-6 md:p-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl transition-all duration-700 group-hover:bg-indigo-500/20"></div>
      
      <div className="relative z-10">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-4 border border-indigo-500/30 uppercase tracking-widest">
          Active Sprint
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">SDE Readiness Crash Course</h2>
        <p className="text-indigo-200 font-medium mb-8">Target Focus: System Design + DSA Intensive</p>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
          <div>
            <p className="text-4xl font-black text-white tracking-tighter mb-1">{progressPercent}%</p>
            <p className="text-sm font-bold text-slate-400">Completion Milestone</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xl font-bold text-white mb-1">Day {currentDay} <span className="text-slate-500 font-medium">of {totalDays}</span></p>
            <p className="text-sm font-bold text-slate-400">Next: OS Concepts</p>
          </div>
        </div>

        <div className="w-full bg-slate-800 rounded-full h-2.5 mb-8 shadow-inner overflow-hidden flex">
          <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
        </div>

        <button className="w-full py-4 text-center rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-lg transition-all shadow-md hover:shadow-indigo-500/25 active:scale-[0.98] cursor-pointer">
          Continue Today's Plan
        </button>
      </div>
    </div>
  );
}
