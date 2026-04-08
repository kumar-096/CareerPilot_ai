import React from 'react';

const activities = [
  {
    id: 1,
    title: 'Resume analyzed for Software Engineer role',
    time: '2 hours ago',
    type: 'resume',
    score: 90,
  },
  {
    id: 2,
    title: 'Readiness report generated',
    time: '5 hours ago',
    type: 'readiness',
  },
  {
    id: 3,
    title: 'Skill gaps updated (React, GraphQL)',
    time: '1 day ago',
    type: 'skill',
  },
  {
    id: 4,
    title: '7-day roadmap refreshed',
    time: '2 days ago',
    type: 'roadmap',
  },
];

export default function RecentActivityCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
        <button className="text-sm font-medium text-sky-500 hover:text-sky-600">View All</button>
      </div>
      <div className="p-6 flex-1">
        <div className="space-y-6">
          {activities.map((activity, idx) => (
            <div key={activity.id} className="flex relative">
              {idx !== activities.length - 1 && (
                <div className="absolute top-8 bottom-[-24px] left-[15px] w-px bg-slate-100"></div>
              )}
              <div className="relative mr-4 mt-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-white shadow-sm ${
                  activity.type === 'resume' ? 'bg-sky-100 text-sky-500' :
                  activity.type === 'readiness' ? 'bg-indigo-100 text-indigo-500' :
                  activity.type === 'skill' ? 'bg-emerald-100 text-emerald-500' :
                  'bg-amber-100 text-amber-500'
                }`}>
                  {activity.type === 'resume' && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  )}
                  {activity.type === 'readiness' && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  )}
                  {activity.type === 'skill' && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  )}
                  {activity.type === 'roadmap' && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                  )}
                </div>
              </div>
              <div className="flex-1 py-1">
                <p className="text-sm font-medium text-slate-800">{activity.title}</p>
                <div className="flex items-center mt-1 space-x-2">
                  <span className="text-xs text-slate-500">{activity.time}</span>
                  {activity.score && (
                    <>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <span className="text-xs font-semibold text-emerald-600">Score: {activity.score}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
