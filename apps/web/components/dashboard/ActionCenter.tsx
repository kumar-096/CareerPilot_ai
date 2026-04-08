import React from 'react';
import Link from 'next/link';

const actions = [
  {
    title: 'Upload Resume',
    description: 'Check how ATS parsers read your CV.',
    href: '/resume',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    bgColor: 'bg-sky-50',
    iconColor: 'bg-sky-500 text-white',
    hoverRing: 'hover:ring-sky-500/30'
  },
  {
    title: 'Analyze Readiness',
    description: 'Discover skill gaps for targeted roles.',
    href: '/readiness',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    ),
    bgColor: 'bg-indigo-50',
    iconColor: 'bg-indigo-500 text-white',
    hoverRing: 'hover:ring-indigo-500/30'
  },
  {
    title: 'Start Mock Interview',
    description: 'Practice with an AI hiring manager.',
    href: '#mock-interview',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    bgColor: 'bg-violet-50',
    iconColor: 'bg-violet-500 text-white',
    hoverRing: 'hover:ring-violet-500/30'
  },
  {
    title: 'Verify Job Post',
    description: 'Check actual credibility before applying.',
    href: '#verify-job',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    bgColor: 'bg-emerald-50',
    iconColor: 'bg-emerald-500 text-white',
    hoverRing: 'hover:ring-emerald-500/30'
  },
];

export default function ActionCenter() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Action Center</h2>
        <p className="text-sm text-slate-500 mt-1">Recommended next steps based on your progress.</p>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className={`group block p-4 rounded-xl border border-transparent transition-all duration-200 bg-slate-50 hover:bg-white hover:shadow-md ring-1 ring-slate-200 ${action.hoverRing}`}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-2.5 rounded-xl ${action.iconColor} shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                {action.icon}
              </div>
              <div className="flex-1 mt-0.5">
                <h3 className="font-semibold text-slate-900 text-sm">{action.title}</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-snug">{action.description}</p>
                <div className="mt-3 flex items-center text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                  Get Started 
                  <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
