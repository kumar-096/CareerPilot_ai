'use client';

import React from 'react';

interface RoadmapTimelineProps {
  roadmap: string[];
}

export default function RoadmapTimeline({ roadmap }: RoadmapTimelineProps) {
  if (!roadmap || roadmap.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 p-8 sm:p-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-indigo-50 text-indigo-500 rounded-xl">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-slate-800 tracking-tight">7-Day Starter Roadmap</h3>
      </div>
      
      <div className="relative border-l-2 border-indigo-100 ml-5 space-y-10 pb-4 mt-8">
        {roadmap.map((step, index) => {
          // Auto split formats like "Day 1 Advanced System Design"
          const match = step.match(/^(Day\s+\d+[:\s]*)(.*)/i);
          const dayLabel = match ? match[1].replace(':', '').trim() : `Day ${index + 1}`;
          const taskContent = match ? match[2].trim() : step;

          return (
            <div key={index} className="relative pl-8">
              {/* Timeline marker */}
              <div className="absolute w-7 h-7 bg-indigo-100 rounded-full -left-[15px] top-0 flex items-center justify-center border-4 border-white shadow-sm">
                <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>
              </div>
              
              {/* Content Box */}
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:border-indigo-200 hover:shadow-md transition-all -mt-3">
                <span className="block text-xs font-black text-indigo-500 tracking-wider uppercase mb-1.5">{dayLabel}</span>
                <span className="text-lg font-semibold text-slate-700">{taskContent}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
