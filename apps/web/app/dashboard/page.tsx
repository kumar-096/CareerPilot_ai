import React from 'react';
import QuickStatsGrid from '../../components/dashboard/QuickStatsGrid';
import RecentActivityCard from '../../components/dashboard/RecentActivityCard';
import ActionCenter from '../../components/dashboard/ActionCenter';

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Overview</h1>
            <p className="text-slate-500 mt-1 font-medium">Welcome back! Here's your career progress.</p>
          </div>
          <button className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-slate-900 border border-transparent rounded-lg shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Export Report
          </button>
        </div>

        {/* Quick Stats */}
        <QuickStatsGrid />

        {/* Two Column Layout for Action Center & Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          <div className="xl:col-span-2">
            <ActionCenter />
          </div>
          <div className="xl:col-span-1">
            <RecentActivityCard />
          </div>
        </div>
        
      </div>
    </div>
  );
}
