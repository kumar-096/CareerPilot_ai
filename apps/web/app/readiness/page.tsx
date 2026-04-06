'use client';

import React, { useState } from 'react';
import { analyzeReadiness } from '../../lib/api/readiness';
import { ReadinessRequest, ReadinessResponse } from '../../types/readiness';
import ReadinessHeroCard from '../../components/dashboard/ReadinessHeroCard';
import SkillGapList from '../../components/readiness/SkillGapList';
import RoadmapTimeline from '../../components/readiness/RoadmapTimeline';

export default function ReadinessPage() {
  const [formData, setFormData] = useState<Omit<ReadinessRequest, 'skills'> & { cgpa: string | number, dsa_count: string | number }>({
    cgpa: '',
    dsa_count: '',
    target_role: 'SDE',
    target_company: ''
  });
  const [skillsInput, setSkillsInput] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReadinessResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const payload: ReadinessRequest = {
        cgpa: parseFloat(formData.cgpa as string) || 0,
        dsa_count: parseInt(formData.dsa_count as string) || 0,
        target_role: formData.target_role,
        target_company: formData.target_company,
        skills: skillsInput.split(',').map(s => s.trim()).filter(s => s.length > 0)
      };
      
      const data = await analyzeReadiness(payload);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-200 selection:text-indigo-900">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4 pt-6 pb-4">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Placement <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Readiness</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Analyze your profile against industry standards and generate a personalized 7-day interview crash course.
          </p>
        </div>

        {/* Input Form Stage */}
        {!result && (
          <div className="max-w-xl mx-auto mt-12 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10 transition-all">
            <h2 className="text-2xl font-black text-slate-800 mb-6">Your Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">CGPA</label>
                  <input 
                    type="number" step="0.01" min="0" max="10" required 
                    value={formData.cgpa}
                    onChange={(e) => setFormData({...formData, cgpa: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-semibold text-slate-700 placeholder-slate-400" 
                    placeholder="e.g. 8.5"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">DSA Problems Solved</label>
                  <input 
                    type="number" min="0" required
                    value={formData.dsa_count}
                    onChange={(e) => setFormData({...formData, dsa_count: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-semibold text-slate-700 placeholder-slate-400" 
                    placeholder="e.g. 300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Skills <span className="text-slate-400 font-normal">(comma-separated)</span></label>
                <input 
                  type="text" required
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-semibold text-slate-700 placeholder-slate-400" 
                  placeholder="e.g. react, dsa, oops, os"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Target Role</label>
                  <input 
                    type="text" required
                    value={formData.target_role}
                    onChange={(e) => setFormData({...formData, target_role: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-semibold text-slate-700 placeholder-slate-400" 
                    placeholder="e.g. SDE"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Target Company</label>
                  <input 
                    type="text" required
                    value={formData.target_company}
                    onChange={(e) => setFormData({...formData, target_company: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-semibold text-slate-700 placeholder-slate-400" 
                    placeholder="e.g. Google"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3">
                  <span className="text-rose-500 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <p className="text-sm text-rose-800 font-medium">{error}</p>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg transition-all mt-2 cursor-pointer disabled:cursor-not-allowed
                  ${isLoading ? 'bg-indigo-400' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-indigo-500/25 hover:-translate-y-0.5'}
                `}
              >
                {isLoading ? 'Analyzing Profile...' : 'Generate Roadmap'}
              </button>
            </form>
          </div>
        )}

        {/* Dashboard Intelligence Stage */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 outline-none items-stretch">
              <ReadinessHeroCard 
                score={result.readiness_score} 
                level={result.level} 
                onRecalculate={resetState} 
              />
              <SkillGapList 
                missingSkills={result.missing_skills} 
                weakZones={result.weak_zones} 
              />
            </div>
            
            <RoadmapTimeline roadmap={result.roadmap} />
          </div>
        )}
      </div>
    </div>
  );
}
