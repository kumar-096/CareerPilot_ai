'use client';

import React, { useState } from 'react';
import ResumeUpload from '../../components/resume/ResumeUpload';
import ATSHeroCard from '../../components/dashboard/ATSHeroCard';
import IssuesList from '../../components/resume/IssuesList';
import { uploadResume } from '../../lib/api/resume';
import { ATSResponse } from '../../types/resume';

export default function ResumePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ATSResponse | null>(null);

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    setResult(null);
    try {
      const data = await uploadResume(file);
      setResult(data);
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setResult(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-sky-200 selection:text-sky-900">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4 pt-6 pb-4">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            ATS <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Resume Scanner</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Upload your resume to instantly see how applicant tracking systems read it. Discover your true match score and fix buried critical issues.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="space-y-10">
          {!result && (
            <div className="max-w-2xl mx-auto mt-12 transition-all duration-500 ease-in-out">
              <div className="bg-white p-2 sm:p-3 rounded-[2rem] shadow-xl shadow-sky-900/5 border border-slate-100">
                <ResumeUpload onUpload={handleUpload} isLoading={isLoading} />
              </div>
            </div>
          )}

          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
              <ATSHeroCard 
                score={result.score} 
                breakdown={result.breakdown} 
                onUploadAnother={resetState}
              />
              <IssuesList issues={result.issues} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
