import React from 'react';
import { ExecutionStat } from '../../types/roadmap';

export default function ExecutionInsights() {
  const stats: ExecutionStat[] = [
    { title: 'Strongest Streak', value: '14 Days', description: 'Consecutive completed daily goals', trend: 'up' },
    { title: 'Weakest Completion Area', value: 'Sundays', description: 'Historical 30% drop in completion rate', trend: 'down' },
    { title: 'Repeated Weak Zone', value: 'System Design', description: 'Appeared in 3 different sprints', trend: 'neutral' },
    { title: 'Projected Readiness', value: '+14%', description: 'Estimated boost upon sprint completion', trend: 'up' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-1 h-full">
      <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Execution Analytics</h2>
      <div className="space-y-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-center justify-between border-b last:border-0 border-slate-100 pb-4 last:pb-0">
            <div>
              <p className="text-sm font-bold text-slate-800">{stat.title}</p>
              <p className="text-xs font-medium text-slate-500 mt-0.5">{stat.description}</p>
            </div>
            <div className="text-right">
              <p className={`text-lg font-black tracking-tight ${
                stat.trend === 'up' ? 'text-emerald-600' :
                stat.trend === 'down' ? 'text-rose-600' :
                'text-slate-700'
              }`}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
