import React from 'react';
import { ProgressInsight } from '../../types/progress';

export default function ProgressInsights() {
  const insights: ProgressInsight[] = [
    { title: 'Shortlist Conversion', value: '41.6%', trend: '+12% from last wk', description: 'Applied to OA ratio', type: 'info' },
    { title: 'OA Success Rate', value: '40.0%', trend: 'Above avg', description: 'OA to Interview ratio', type: 'success' },
    { title: 'Interview Success', value: '25.0%', description: 'Interview to Offer ratio', type: 'warning' },
    { title: 'Strongest Category', value: 'Frontend', description: 'Based on OA pass rates', type: 'success' },
    { title: 'Funnel Weakness', value: 'System Design', description: 'Failed in 2 past interviews', type: 'warning' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-1 h-full">
      <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Placement Analytics</h2>
      <div className="space-y-4">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex items-center justify-between border-b last:border-0 border-slate-100 pb-4 last:pb-0">
            <div>
              <p className="text-sm font-bold text-slate-800">{insight.title}</p>
              <p className="text-xs font-medium text-slate-400 mt-0.5">{insight.description}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-black text-slate-900 tracking-tight">{insight.value}</p>
              {insight.trend && (
                <p className={`text-[10px] font-bold uppercase tracking-wide mt-0.5 ${
                  insight.type === 'success' ? 'text-emerald-500' :
                  insight.type === 'warning' ? 'text-amber-500' :
                  'text-indigo-500'
                }`}>
                  {insight.trend}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
