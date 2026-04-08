'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Resume Analyzer', href: '/resume', icon: DocumentIcon },
    { name: 'Placement Readiness', href: '/readiness', icon: ChartIcon },
    { name: 'Progress Tracker', href: '/progress', icon: TrendingUpIcon },
    { name: 'Mock Interviews', href: '/interviews', icon: VideoIcon },
    { name: 'Opportunity Trust', href: '/trust', icon: ShieldIcon },
    { name: 'Roadmaps', href: '/roadmaps', icon: MapIcon },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-300">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-sky-500/20">
          C
        </div>
        <span className="text-xl font-bold text-white tracking-tight">CareerPilot</span>
      </div>
      <div className="flex-1 px-4 space-y-1 overflow-y-auto pt-4">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Navigation</div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group cursor-pointer ${
                isActive 
                  ? 'bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20 shadow-sm shadow-sky-900/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-sky-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>
      <div className="p-4 border-t border-slate-800 mt-auto">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <p className="text-xs font-medium text-slate-400">Pro Plan Active</p>
          <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-gradient-to-r from-sky-400 to-indigo-500 h-1.5 rounded-full" style={{ width: '70%' }}></div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">70% ready for top-tier roles</p>
        </div>
      </div>
    </aside>
  );
}

function HomeIcon(props: React.SVGProps<SVGSVGElement>) { return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>; }
function DocumentIcon(props: React.SVGProps<SVGSVGElement>) { return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>; }
function ChartIcon(props: React.SVGProps<SVGSVGElement>) { return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>; }
function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) { return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>; }
function VideoIcon(props: React.SVGProps<SVGSVGElement>) { return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>; }
function ShieldIcon(props: React.SVGProps<SVGSVGElement>) { return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>; }
function MapIcon(props: React.SVGProps<SVGSVGElement>) { return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>; }
