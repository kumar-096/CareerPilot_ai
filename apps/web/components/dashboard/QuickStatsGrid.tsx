import React from 'react';
import { DashboardSnapshot } from '../../types/dashboard';

interface Props {
  snapshot: DashboardSnapshot;
}

export default function QuickStatsGrid({ snapshot }: Props) {
  const stats = [
    {
      name: 'ATS Score',
      value: snapshot.latest_ats_score.toString(),
      change: 'Resume match',
      changeType: 'positive',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      name: 'Readiness %',
      value: `${snapshot.latest_readiness_score}%`,
      change: 'Interview ready',
      changeType: 'positive',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      name: 'Weekly Trend',
      value: snapshot.weekly_execution_trend,
      change: 'Across all modules',
      changeType: 'neutral',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      name: 'Applications Tracked',
      value: snapshot.total_applications.toString(),
      change: 'Active in funnel',
      changeType: 'positive',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between text-slate-500 mb-4">
            <h3 className="text-sm font-medium">{stat.name}</h3>
            <div className="p-2 bg-slate-50 rounded-lg text-sky-500">
              {stat.icon}
            </div>
          </div>
          <div className="flex items-baseline mb-1">
            <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
          </div>
          <div className={`text-xs font-medium ${
            stat.changeType === 'positive' ? 'text-emerald-600' : 'text-slate-500'
          }`}>
            {stat.change}
          </div>
        </div>
      ))}
    </div>
  );
}
