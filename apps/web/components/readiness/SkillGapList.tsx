'use client';

import React from 'react';

interface SkillGapListProps {
  missingSkills: string[];
  weakZones: string[];
}

export default function SkillGapList({ missingSkills, weakZones }: SkillGapListProps) {
  const isPerfect = missingSkills.length === 0 && weakZones.length === 0;

  if (isPerfect) {
    return (
      <div className="bg-emerald-50 rounded-3xl p-8 text-center border border-emerald-100 shadow-sm h-full flex flex-col justify-center items-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-emerald-900 tracking-tight">Excellent Profile!</h3>
        <p className="text-emerald-700 mt-2 font-medium">No critical missing skill gaps detected.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 p-8 h-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-slate-800 tracking-tight">Areas for Improvement</h3>
      </div>
      
      <div className="space-y-6">
        {missingSkills.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Missing Core Skills</h4>
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-lg text-sm font-bold capitalize">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {weakZones.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Identified Weak Zones</h4>
            <ul className="space-y-3">
              {weakZones.map((zone, i) => (
                <li key={i} className="flex gap-3 items-center bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 text-sm font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  {zone}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
