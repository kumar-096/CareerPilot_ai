import React from 'react';

export default function WeaknessHeatmap() {
  const weaknesses = [
    { name: 'Filler Words ("um", "like")', severity: 'high', heat: 85 },
    { name: 'Unclear Project Ownership', severity: 'high', heat: 78 },
    { name: 'Low Impact Storytelling', severity: 'medium', heat: 65 },
    { name: 'Weak System Design Articulation', severity: 'medium', heat: 58 },
  ];

  const getHeatColor = (heat: number) => {
    if(heat > 80) return 'bg-rose-500';
    if(heat > 70) return 'bg-rose-400';
    if(heat > 60) return 'bg-orange-400';
    return 'bg-amber-400';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Weakness Heatmap</h2>
      </div>
      
      <div className="space-y-4 flex-1 flex flex-col justify-center">
        {weaknesses.sort((a,b) => b.heat - a.heat).map((weakness, idx) => (
          <div key={idx} className="group">
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-sm font-semibold text-slate-700">{weakness.name}</span>
              <span className="text-xs font-bold text-slate-400">{weakness.heat}% Impact</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-2 rounded-full ${getHeatColor(weakness.heat)} transition-all duration-1000 ease-out shadow-inner`}
                style={{ width: `${weakness.heat}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
