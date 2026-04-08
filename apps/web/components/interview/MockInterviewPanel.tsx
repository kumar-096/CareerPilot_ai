import React, { useState } from 'react';

interface Props {
  onAnalyze: () => void;
  isLoading: boolean;
}

export default function MockInterviewPanel({ onAnalyze, isLoading }: Props) {
  const [formData, setFormData] = useState({
    type: 'HR / Behavioral',
    transcript: '',
    confidence: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.transcript.trim().length > 10) {
      onAnalyze();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
      <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Audio/Transcript Analysis</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Interview Type</label>
            <select
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium text-slate-700 cursor-pointer"
            >
              <option value="HR / Behavioral">HR / Behavioral</option>
              <option value="Technical / Coding">Technical / Coding</option>
              <option value="Project Deep Dive">Project Deep Dive</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Confidence Self-Rating ({formData.confidence}/10)</label>
            <div className="pt-3 px-2">
              <input
                type="range"
                min="1"
                max="10"
                value={formData.confidence}
                onChange={e => setFormData({...formData, confidence: parseInt(e.target.value)})}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Answer Transcript</label>
          <textarea
            required
            rows={6}
            value={formData.transcript}
            onChange={e => setFormData({...formData, transcript: e.target.value})}
            placeholder="Paste your interview answer response here for analysis..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium text-slate-700 resize-y placeholder-slate-400"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading || formData.transcript.trim().length < 10}
          className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-md transition-all mt-4 cursor-pointer
            ${isLoading || formData.transcript.trim().length < 10 ? 'bg-indigo-300' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5'}
          `}
        >
          {isLoading ? 'Analyzing NLP Markers...' : 'Analyze Response'}
        </button>
      </form>
    </div>
  );
}
