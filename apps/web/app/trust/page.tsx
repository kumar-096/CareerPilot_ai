'use client';

import React, { useState } from 'react';
import InputVerificationPanel from '../../components/trust/InputVerificationPanel';
import TrustScoreCard from '../../components/trust/TrustScoreCard';
import RiskFlagsList from '../../components/trust/RiskFlagsList';
import TrustInsights from '../../components/trust/TrustInsights';

export default function TrustPage() {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = () => {
    setIsLoading(true);
    // Simulate network delay for verification
    setTimeout(() => {
      setIsLoading(false);
      setIsVerified(true);
    }, 1200);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 font-sans selection:bg-rose-200 selection:text-rose-900 min-h-full">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Opportunity Trust</h1>
            <p className="text-slate-500 mt-1 font-medium">Predict and identify fake recruitment scams before you proceed.</p>
          </div>
          {isVerified && (
            <button 
              onClick={() => setIsVerified(false)}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Scan Another Opportunity
            </button>
          )}
        </div>

        {/* Form Phase */}
        {!isVerified && (
           <div className="max-w-3xl mx-auto mt-12 transition-all">
             <InputVerificationPanel onVerify={handleVerify} isLoading={isLoading} />
           </div>
        )}

        {/* Dashboard View Phase */}
        {isVerified && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6 sm:space-y-8 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              
              <div className="lg:col-span-1">
                <TrustScoreCard />
              </div>
              
              <div className="lg:col-span-2">
                <TrustInsights />
              </div>
              
            </div>

            <div className="grid grid-cols-1 gap-6 sm:gap-8">
              <RiskFlagsList />
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
