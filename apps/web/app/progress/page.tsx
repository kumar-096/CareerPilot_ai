import React from 'react';
import ApplicationFunnel from '../../components/progress/ApplicationFunnel';
import StageBoard from '../../components/progress/StageBoard';
import CompanyTrackerTable from '../../components/progress/CompanyTrackerTable';
import ProgressInsights from '../../components/progress/ProgressInsights';

export default function ProgressPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 font-sans selection:bg-purple-200 selection:text-purple-900">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Progress Tracker</h1>
            <p className="text-slate-500 mt-1 font-medium">Track your application pipeline, conversions, and interview metrics.</p>
          </div>
          <button className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-xl shadow-md shadow-fuchsia-500/20 hover:shadow-lg hover:shadow-fuchsia-500/30 hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-600">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Track Application
          </button>
        </div>

        {/* Top Funnel Metrics */}
        <ApplicationFunnel />

        {/* Kanban Progression */}
        <StageBoard />

        {/* Analysis & Log Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          <div className="xl:col-span-2">
            <CompanyTrackerTable />
          </div>
          <div className="xl:col-span-1">
            <ProgressInsights />
          </div>
        </div>
        
      </div>
    </div>
  );
}
