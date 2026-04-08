'use client';

import React, { useEffect, useState } from 'react';
import QuickStatsGrid from '../../components/dashboard/QuickStatsGrid';
import RecentActivityCard from '../../components/dashboard/RecentActivityCard';
import ActionCenter from '../../components/dashboard/ActionCenter';
import { DashboardSnapshot } from '../../types/dashboard';
import { getDashboardSnapshot } from '../../lib/api/dashboard';

export default function DashboardPage() {
  const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSnapshot() {
      try {
        const data = await getDashboardSnapshot();
        setSnapshot(data);
      } catch (err: any) {
        setError(err.message || 'Network error fetching state');
      } finally {
        setIsLoading(false);
      }
    }
    fetchSnapshot();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 h-full">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-pulse">
           <div className="w-1/3 h-10 bg-slate-200 rounded-lg"></div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
             <div className="bg-slate-200 h-32 rounded-2xl"></div>
             <div className="bg-slate-200 h-32 rounded-2xl"></div>
             <div className="bg-slate-200 h-32 rounded-2xl"></div>
             <div className="bg-slate-200 h-32 rounded-2xl"></div>
           </div>
           <div className="h-64 bg-slate-200 rounded-2xl w-full"></div>
        </div>
      </div>
    );
  }

  if (error || !snapshot) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col items-center justify-center">
        <div className="bg-rose-50 text-rose-600 p-4 rounded-xl border border-rose-100 font-bold max-w-lg text-center">
          <p>{error}</p>
          <p className="text-sm mt-2 font-medium opacity-80">Make sure the backend is running on port 8001.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-2">
        
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Overview</h1>
            <p className="text-slate-500 mt-1 font-medium">Welcome back! Here's your career progress.</p>
          </div>
          <button className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-slate-900 border border-transparent rounded-lg shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors cursor-pointer">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Export Report
          </button>
        </div>

        {/* Quick Stats */}
        <QuickStatsGrid snapshot={snapshot} />

        {/* Two Column Layout for Action Center & Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          <div className="xl:col-span-2">
            <ActionCenter />
          </div>
          <div className="xl:col-span-1">
            <RecentActivityCard activities={snapshot.recent_activities} />
          </div>
        </div>
        
      </div>
    </div>
  );
}
