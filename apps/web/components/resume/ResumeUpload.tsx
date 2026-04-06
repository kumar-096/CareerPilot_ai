'use client';

import React, { useState, useRef } from 'react';

interface ResumeUploadProps {
  onUpload: (file: File) => Promise<void>;
  isLoading: boolean;
}

export default function ResumeUpload({ onUpload, isLoading }: ResumeUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndHandleFile = async (file: File) => {
    setError(null);
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are supported.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be strictly under 5MB.');
      return;
    }
    try {
      await onUpload(file);
    } catch (err: any) {
      setError(err.message || 'An error occurred during upload.');
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (isLoading) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndHandleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => !isLoading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer shadow-sm
          ${isLoading ? 'opacity-50 cursor-not-allowed bg-slate-50 border-slate-200' : 
            isDragging ? 'border-sky-500 bg-sky-50/50' : 'border-slate-300 hover:border-sky-400 hover:bg-slate-50'}
        `}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`p-4 rounded-full ${isLoading ? 'bg-slate-200 text-slate-400' : 'bg-sky-100 text-sky-600'}`}>
            <svg className={`w-10 h-10 ${isLoading ? 'animate-bounce' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <div>
            <p className="text-xl font-bold text-slate-800 tracking-tight">
              {isLoading ? 'Scanning Resume Elements...' : 'Drag & Drop your resume'}
            </p>
            <p className="text-sm text-slate-500 mt-1">
              or click to browse from your computer
            </p>
          </div>
          <div className="px-3 py-1 bg-slate-100 rounded-full">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">PDF Only • Max 5MB</p>
          </div>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="application/pdf"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              validateAndHandleFile(e.target.files[0]);
              // Reset value so the same file can be uploaded again if needed
              if (fileInputRef.current) fileInputRef.current.value = '';
            }
          }}
          disabled={isLoading}
        />
      </div>

      {error && (
        <div className="mt-5 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3">
          <span className="text-rose-500 mt-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <p className="text-sm text-rose-800 font-medium leading-relaxed">{error}</p>
        </div>
      )}
    </div>
  );
}
