'use client';

import React, { useEffect, useState } from 'react';
import ApplicationFunnel from '../../components/progress/ApplicationFunnel';
import StageBoard from '../../components/progress/StageBoard';
import CompanyTrackerTable from '../../components/progress/CompanyTrackerTable';
import ProgressInsights from '../../components/progress/ProgressInsights';
import { ProgressSnapshot, ProgressInsight } from '../../types/progress';
import { getProgressSnapshot } from '../../lib/api/progress';

export default function ProgressPage() {
  const [snapshot, setSnapshot] = useState<ProgressSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getProgressSnapshot();
        setSnapshot(data);
      } catch (err: any) {
        setError(err.message || 'Error communicating with backend');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 font-sans selection:bg-purple-200 selection:text-purple-900 h-full">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-pulse">
           <div className="w-1/3 h-10 bg-slate-200 rounded-lg"></div>
           <div className="h-40 bg-slate-200 rounded-2xl w-full"></div>
           <div className="h-64 bg-slate-200 rounded-2xl w-full"></div>
           <div className="h-64 bg-slate-200 rounded-2xl w-full"></div>
        </div>
      </div>
    );
  }

  if (error || !snapshot) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 h-full flex items-center justify-center">
        <div className="bg-rose-50 text-rose-600 p-4 rounded-xl border border-rose-100 font-bold max-w-lg text-center">
          <p>{error || 'Error building tracking board'}</p>
          <p className="text-sm mt-2 font-medium opacity-80">Make sure the API server is running on port 8001.</p>
        </div>
      </div>
    );
  }

  // Calculate insights dynamically based on snapshot tracking
  const appliedValue = snapshot.applied || 1;
  const oaClearedValue = snapshot.oa_cleared || 0;
  const interviewsValue = snapshot.interviews || 0;
  
  const shortlistRatio = Math.round((oaClearedValue / appliedValue) * 100);
  const interviewRatio = oaClearedValue > 0 ? Math.round((interviewsValue / oaClearedValue) * 100) : 0;

  const dynamicInsights: ProgressInsight[] = [
    { title: 'Shortlist Conversion', value: `${shortlistRatio}%`, description: 'Applied to OA ratio', type: 'info' },
    { title: 'OA Success Rate', value: `${interviewRatio}%`, description: 'OA to Interview ratio', type: 'success' },
    { title: 'Funnel Progress', value: 'Active', description: `Tracking ${snapshot.companies.length} active applications`, type: 'info' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 font-sans selection:bg-purple-200 selection:text-purple-900">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Progress Tracker</h1>
            <p className="text-slate-500 mt-1 font-medium">Track your application pipeline, conversions, and interview metrics.</p>
          </div>
          <button className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-xl shadow-md shadow-fuchsia-500/20 hover:shadow-lg hover:shadow-fuchsia-500/30 hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-600 cursor-pointer">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Track Application
          </button>
        </div>

        {/* Top Funnel Metrics */}
        <ApplicationFunnel 
          applied={snapshot.applied}
          oaCleared={snapshot.oa_cleared}
          interviews={snapshot.interviews}
          offers={snapshot.offers}
        />

        {/* Kanban Progression */}
        <StageBoard applications={snapshot.companies} />

        {/* Analysis & Log Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          <div className="xl:col-span-2">
            <CompanyTrackerTable applications={snapshot.companies} />
          </div>
          <div className="xl:col-span-1">
            <ProgressInsights insights={dynamicInsights} />
          </div>
        </div>
        
      </div>
    </div>
  );
}
