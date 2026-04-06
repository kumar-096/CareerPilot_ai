'use client';

import React from 'react';

interface IssuesListProps {
  issues: string[];
}

export default function IssuesList({ issues }: IssuesListProps) {
  if (!issues || issues.length === 0) {
    return (
      <div className="bg-emerald-50 rounded-2xl p-8 text-center border border-emerald-100 shadow-sm">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full mb-4">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-emerald-900 tracking-tight">Perfect Formatting!</h3>
        <p className="text-emerald-700 mt-2 font-medium">No critical ATS issues found in your resume.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-rose-50 text-rose-500 rounded-xl">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-slate-800 tracking-tight">Issues Found</h3>
        <span className="bg-rose-100 text-rose-700 text-xs font-black px-3 py-1.5 rounded-full ml-auto">
          {issues.length} {issues.length === 1 ? 'Issue' : 'Issues'}
        </span>
      </div>
      
      <ul className="space-y-4">
        {issues.map((issue, index) => (
          <li key={index} className="flex gap-4 items-start bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
            <span className="text-rose-400 mt-0.5 flex-shrink-0 bg-white p-1 rounded-full shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
            <span className="text-base text-slate-700 font-semibold leading-relaxed">{issue}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
