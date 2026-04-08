import React from 'react';
import { RiskFlag } from '../../types/trust';

export default function RiskFlagsList() {
  const flags: RiskFlag[] = [
    { id: '1', severity: 'high', category: 'Domain', message: 'Email domain mismatch (using generic provider or altered spelling)' },
    { id: '2', severity: 'high', category: 'URL', message: 'Suspicious shortened URL obscures final destination' },
    { id: '3', severity: 'medium', category: 'Compensation', message: 'Salary claim exhibits severe anomaly (+45% above market average)' },
    { id: '4', severity: 'low', category: 'Timeline', message: 'Stale job posting (active for 8+ months)' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-1">
      <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Security Flags Detected</h2>
      <div className="space-y-4">
        {flags.map((flag) => (
          <div key={flag.id} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <div className="shrink-0 pt-0.5">
              {flag.severity === 'high' && (
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shadow-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              )}
              {flag.severity === 'medium' && (
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shadow-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
              {flag.severity === 'low' && (
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shadow-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                  flag.severity === 'high' ? 'bg-rose-100 text-rose-700' :
                  flag.severity === 'medium' ? 'bg-amber-100 text-amber-700' :
                  'bg-slate-200 text-slate-700'
                }`}>
                  {flag.severity}
                </span>
                <span className="text-xs font-bold text-slate-500">{flag.category}</span>
              </div>
              <p className="text-sm font-semibold text-slate-700 mt-1">{flag.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
