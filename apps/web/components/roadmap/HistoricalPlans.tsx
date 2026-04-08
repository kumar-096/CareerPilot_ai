import React from 'react';
import { HistoricalSprint } from '../../types/roadmap';

export default function HistoricalPlans() {
  const plans: HistoricalSprint[] = [
    { id: '1', title: 'Resume Improvement Sprint', date: 'Oct 2025', status: 'completed', progress: 100 },
    { id: '2', title: 'Autodesk Interview Sprint', date: 'Sep 2025', status: 'completed', progress: 85 },
    { id: '3', title: 'Placement Recovery Sprint', date: 'Jul 2025', status: 'abandoned', progress: 20 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Past Roadmaps</h2>
      <div className="space-y-4">
        {plans.map((plan) => (
          <div key={plan.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">{plan.title}</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{plan.date}</p>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                plan.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
              }`}>
                {plan.status}
              </span>
            </div>
            
            <div className="flex items-center gap-3 mt-1">
              <div className="flex-1 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-1.5 rounded-full ${plan.status === 'completed' ? 'bg-emerald-500' : 'bg-slate-400'}`}
                  style={{ width: `${plan.progress}%` }}
                ></div>
              </div>
              <span className="text-xs font-bold text-slate-500">{plan.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
