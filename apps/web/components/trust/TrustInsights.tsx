import React from 'react';
import { TrustInsight } from '../../types/trust';

export default function TrustInsights() {
  const insights: TrustInsight[] = [
    { title: 'Verified Domain', description: 'The company name resolves to a registered enterprise domain.', type: 'positive' },
    { title: 'Suspicious Salary Range', description: 'Offered range is statistically improbable for this role tier.', type: 'negative' },
    { title: 'Company Claim Mismatch', description: 'Recruiter does not appear in verified company employee logs.', type: 'negative' },
    { title: 'Freshness Risk', description: 'Link redirects multiple times to a recently registered host.', type: 'negative' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full">
      <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Audit Insights</h2>
      <ul className="space-y-5">
        {insights.map((insight, idx) => (
          <li key={idx} className="flex items-start gap-4 p-2">
            <div className={`mt-0.5 shrink-0 ${insight.type === 'positive' ? 'text-emerald-500' : insight.type === 'negative' ? 'text-rose-500' : 'text-slate-400'}`}>
              {insight.type === 'positive' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">{insight.title}</p>
              <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">{insight.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
