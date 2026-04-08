import React from 'react';

interface Props {
  applied: number;
  oaCleared: number;
  interviews: number;
  offers: number;
}

export default function ApplicationFunnel({ applied, oaCleared, interviews, offers }: Props) {
  const funnelStages = [
    { label: 'Applied', value: applied, color: 'from-blue-500 to-indigo-500' },
    { label: 'OA Cleared', value: oaCleared, color: 'from-indigo-500 to-purple-500' },
    { label: 'Interviews', value: interviews, color: 'from-purple-500 to-fuchsia-500' },
    { label: 'Offers', value: offers, color: 'from-emerald-400 to-teal-500' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Application Funnel</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {funnelStages.map((stage, idx) => (
          <div key={idx} className="relative rounded-xl border border-slate-100 p-5 overflow-hidden transition-all hover:shadow-md group bg-white">
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stage.color}`}></div>
            <p className="text-sm font-semibold text-slate-500 mb-1">{stage.label}</p>
            <p className="text-3xl font-black text-slate-900 tracking-tight">{stage.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
