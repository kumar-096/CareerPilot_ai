import React from 'react';
import { CompanyApplication, ApplicationStage } from '../../types/progress';

interface Props {
  applications: CompanyApplication[];
}

export default function StageBoard({ applications }: Props) {
  const stages: ApplicationStage[] = ['Applied', 'OA', 'Interview', 'Offer', 'Rejected'];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 overflow-hidden">
      <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Stage Board</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
        {stages.map(stage => {
          const stageApps = applications.filter(a => a.current_stage === stage);
          return (
            <div key={stage} className="min-w-[280px] bg-slate-50/80 rounded-xl p-4 border border-slate-200 shrink-0 snap-start">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-700">{stage}</h3>
                <span className="bg-slate-200/80 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-bold">{stageApps.length}</span>
              </div>
              <div className="space-y-3">
                {stageApps.map(app => (
                  <div key={app.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{app.company}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-1">{app.role}</p>
                    <p className="text-[10px] text-slate-400 mt-3 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Last updated {app.last_updated}
                    </p>
                  </div>
                ))}
                {stageApps.length === 0 && (
                  <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl">
                    <p className="text-xs text-slate-400 font-medium tracking-tight">No applications</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
