'use client';

import React, { useEffect, useState } from 'react';

interface ReadinessHeroCardProps {
  score: number;
  level: 'high' | 'medium' | 'low';
  onRecalculate: () => void;
}

export default function ReadinessHeroCard({ score, level, onRecalculate }: ReadinessHeroCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; 
    const intervalTime = 16;
    const steps = duration / intervalTime;
    const increment = score / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [score]);

  const levelConfig = {
    high: { color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'High Readiness' },
    medium: { color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Medium Readiness' },
    low: { color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', label: 'Low Readiness' }
  };

  const currentLevel = levelConfig[level] || levelConfig.low;

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/40 border border-slate-100 overflow-hidden relative h-full">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
      
      <div className="p-8 sm:p-10 flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-8">Placement Readiness</h2>
        
        <div className="relative w-56 h-56 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90 absolute" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="8" 
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - animatedScore / 100)}`}
              className={`transition-all duration-300 ease-out ${currentLevel.color}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="text-center absolute flex flex-col items-center justify-center">
            <span className={`text-7xl font-black tracking-tighter ${currentLevel.color}`}>
              {animatedScore}
            </span>
            <span className="text-sm font-bold text-slate-400 tracking-widest uppercase mt-1">%</span>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className={`px-6 py-2 rounded-full text-sm font-bold shadow-sm border ${currentLevel.bg} ${currentLevel.text} ${currentLevel.border}`}>
            {currentLevel.label}
          </div>
          <button 
            onClick={onRecalculate}
            className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors mt-2 underline decoration-indigo-200 underline-offset-4"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
