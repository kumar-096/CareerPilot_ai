import React from 'react';
import ActivePlanCard from '../../components/roadmap/ActivePlanCard';
import TaskTimeline from '../../components/roadmap/TaskTimeline';
import HistoricalPlans from '../../components/roadmap/HistoricalPlans';
import ExecutionInsights from '../../components/roadmap/ExecutionInsights';

export default function RoadmapsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 font-sans selection:bg-indigo-200 selection:text-indigo-900 min-h-full">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Execution Roadmaps</h1>
            <p className="text-slate-500 mt-1 font-medium">Manage active sprints and review historical placement preparation plans.</p>
          </div>
          <button className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-white bg-slate-900 rounded-lg shadow-sm hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 cursor-pointer">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Generate New Plan
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 items-start">
          
          {/* Main Visual: Active Plan + Checklist */}
          <div className="xl:col-span-2 space-y-6 sm:space-y-8">
            <ActivePlanCard />
            <TaskTimeline />
          </div>
          
          {/* Side Analytics & History */}
          <div className="xl:col-span-1 flex flex-col gap-6 sm:gap-8 min-h-full">
            <ExecutionInsights />
            <HistoricalPlans />
          </div>

        </div>
      </div>
    </div>
  );
}
