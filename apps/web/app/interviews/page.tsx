'use client';

import React, { useState } from 'react';
import MockInterviewPanel from '../../components/interview/MockInterviewPanel';
import InterviewScoreCard from '../../components/interview/InterviewScoreCard';
import WeaknessHeatmap from '../../components/interview/WeaknessHeatmap';
import FeedbackInsights from '../../components/interview/FeedbackInsights';

export default function InterviewsPage() {
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = () => {
    setIsLoading(true);
    // Setup artificial delay to mimic AI processing
    setTimeout(() => {
      setIsLoading(false);
      setIsAnalyzed(true);
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 font-sans selection:bg-indigo-200 selection:text-indigo-900 min-h-full">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Interview Intelligence</h1>
            <p className="text-slate-500 mt-1 font-medium">Record or paste interview answers to analyze delivery, STAR compliance, and depth.</p>
          </div>
          {isAnalyzed && (
            <button 
              onClick={() => setIsAnalyzed(false)}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 cursor-pointer"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Mock Analysis
            </button>
          )}
        </div>

        {/* Input Phase */}
        {!isAnalyzed && (
          <div className="max-w-3xl mx-auto mt-12 transition-all">
            <MockInterviewPanel onAnalyze={handleAnalyze} isLoading={isLoading} />
          </div>
        )}

        {/* Dashboard Phase */}
        {isAnalyzed && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6 sm:space-y-8 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
              <InterviewScoreCard />
              <WeaknessHeatmap />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:gap-8">
              <FeedbackInsights />
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
