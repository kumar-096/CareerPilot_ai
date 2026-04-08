import React from 'react';
import { ProgressInsight } from '../../types/progress';

interface Props {
  insights: ProgressInsight[];
}

export default function ProgressInsights({ insights }: Props) {

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
