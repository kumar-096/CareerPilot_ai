'use client';

import React, { useEffect, useState } from 'react';
import { ATSBreakdown } from '../../types/resume';

interface ATSHeroCardProps {
  score: number;
  breakdown: ATSBreakdown;
  onUploadAnother: () => void;
}

export default function ATSHeroCard({ score, breakdown, onUploadAnother }: ATSHeroCardProps) {
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

  const getScoreColor = (val: number) => {
    if (val >= 80) return 'text-emerald-500';
    if (val >= 60) return 'text-amber-500';
    return 'text-rose-500';
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-indigo-500"></div>
      
      <div className="p-8 sm:p-10 flex flex-col md:flex-row gap-12 items-center md:items-start">
        {/* Score Ring */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
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
                className={`transition-all duration-300 ease-out ${getScoreColor(animatedScore)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center absolute flex flex-col items-center justify-center">
              <span className={`text-6xl font-black tracking-tighter ${getScoreColor(animatedScore)}`}>
                {animatedScore}
              </span>
              <span className="text-xs font-bold text-slate-400 tracking-widest uppercase mt-1">out of 100</span>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className={`px-5 py-1.5 rounded-full text-sm font-bold shadow-sm ${
              score >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
              score >= 60 ? 'bg-amber-50 text-amber-700 border border-amber-200' :
              'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>
              {score >= 80 ? 'Excellent Match' : score >= 60 ? 'Needs Improvement' : 'Critical Fixes Required'}
            </div>
            <button 
              onClick={onUploadAnother}
              className="text-sm font-semibold text-slate-500 hover:text-sky-600 transition-colors"
            >
              Scan another resume
            </button>
          </div>
        </div>

        {/* Breakdown Progress Bars */}
        <div className="flex-grow w-full space-y-7 pt-2">
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">Score Breakdown</h3>
          
          <div className="space-y-5">
            <ProgressBar label="Formatting & Basics" score={breakdown.formatting} max={25} />
            <ProgressBar label="Keywords & Action Verbs" score={breakdown.keywords} max={35} />
            <ProgressBar label="Impact & Quantification" score={breakdown.impact_metrics} max={20} />
            <ProgressBar label="Length & Depth" score={breakdown.length} max={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ label, score, max }: { label: string, score: number, max: number }) {
  const percentage = Math.max(0, Math.min(100, Math.round((score / max) * 100)));
  
  const getBarColor = (pct: number) => {
    if (pct >= 80) return 'bg-emerald-500';
    if (pct >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-bold text-slate-700">{label}</span>
        <span className="text-sm font-black text-slate-900">{score} <span className="text-slate-400 text-xs font-semibold">/ {max}</span></span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-3 rounded-full transition-all duration-1000 ease-out ${getBarColor(percentage)}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
