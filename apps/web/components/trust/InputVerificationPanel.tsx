import React, { useState } from 'react';

interface Props {
  onVerify: () => void;
  isLoading: boolean;
}

export default function InputVerificationPanel({ onVerify, isLoading }: Props) {
  const [formData, setFormData] = useState({
    email: '',
    jobUrl: '',
    salaryClaim: '',
    companyName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
      <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Verify Opportunity</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Recruiter Email</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              placeholder="e.g. HR@company-careers.com"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder-slate-400"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Job URL / Link</label>
            <input 
              type="url" 
              required
              value={formData.jobUrl}
              onChange={e => setFormData({...formData, jobUrl: e.target.value})}
              placeholder="e.g. bit.ly/tech-job-24"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder-slate-400"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Salary Claimed</label>
            <input 
              type="text" 
              required
              value={formData.salaryClaim}
              onChange={e => setFormData({...formData, salaryClaim: e.target.value})}
              placeholder="e.g. $150,000"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder-slate-400"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Company Name</label>
            <input 
              type="text" 
              required
              value={formData.companyName}
              onChange={e => setFormData({...formData, companyName: e.target.value})}
              placeholder="e.g. Google"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder-slate-400"
            />
          </div>
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-md transition-all mt-6
            ${isLoading ? 'bg-rose-400 cursor-wait' : 'bg-gradient-to-r from-rose-500 to-orange-500 hover:shadow-lg hover:shadow-rose-500/25 hover:-translate-y-0.5'}
          `}
        >
          {isLoading ? 'Scanning Factors...' : 'Verify Trust'}
        </button>
      </form>
    </div>
  );
}
