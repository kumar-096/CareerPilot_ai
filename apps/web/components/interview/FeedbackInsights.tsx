import React from 'react';

export default function FeedbackInsights() {
  const feedback = [
    { type: 'critical', title: 'STAR Missing Situation', description: 'Your answer jumped straight into the action without establishing business context or the core problem.' },
    { type: 'warning', title: 'Overuse of Filler Words', description: 'Detected 14 instances of "like" and "um" which detracted from authoritativeness.' },
    { type: 'suggestion', title: 'Needs Stronger Metrics', description: 'You mentioned improving performance, but quantifying it (e.g., "by 40%") proves impact.' },
    { type: 'critical', title: 'Improve Project Architecture Explanation', description: 'The transition between frontend interaction and database state was ambiguous.' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full">
      <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Actionable Feedback</h2>
      <div className="space-y-4">
        {feedback.map((item, idx) => (
          <div key={idx} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 items-start">
            <div className="shrink-0 mt-0.5">
              {item.type === 'critical' && (
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              )}
              {item.type === 'warning' && (
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
              {item.type === 'suggestion' && (
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">{item.title}</p>
              <p className="text-xs font-medium text-slate-600 mt-1 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
