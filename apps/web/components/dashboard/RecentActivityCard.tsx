import React from 'react';
import Link from 'next/link';

interface Props {
  activities: string[];
}

export default function RecentActivityCard({ activities }: Props) {
  const getActivityMeta = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('resume')) return { type: 'resume', color: 'bg-sky-100 text-sky-500' };
    if (lower.includes('readiness')) return { type: 'readiness', color: 'bg-indigo-100 text-indigo-500' };
    if (lower.includes('interview')) return { type: 'interview', color: 'bg-purple-100 text-purple-600' };
    if (lower.includes('trust')) return { type: 'trust', color: 'bg-rose-100 text-rose-500' };
    return { type: 'roadmap', color: 'bg-emerald-100 text-emerald-500' };
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
        <Link href="/progress" className="text-sm font-medium text-sky-500 hover:text-sky-600 cursor-pointer">View All</Link>
      </div>
      <div className="p-6 flex-1">
        <div className="space-y-6">
          {activities.map((title, idx) => {
            const meta = getActivityMeta(title);
            return (
            <div key={idx} className="flex relative">
              {idx !== activities.length - 1 && (
                <div className="absolute top-8 bottom-[-24px] left-[15px] w-px bg-slate-100"></div>
              )}
              <div className="relative mr-4 mt-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-white shadow-sm ${meta.color}`}>
                  {meta.type === 'resume' && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  )}
                  {meta.type === 'readiness' && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  )}
                  {meta.type === 'interview' && (
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  )}
                  {meta.type === 'trust' && (
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  )}
                  {meta.type === 'roadmap' && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                  )}
                </div>
              </div>
              <div className="flex-1 py-1">
                <p className="text-sm font-medium text-slate-800">{title}</p>
                <div className="flex items-center mt-1 space-x-2">
                  <span className="text-xs text-slate-500 font-medium">Recently recorded</span>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
