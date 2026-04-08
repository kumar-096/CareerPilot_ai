'use client';

import React from 'react';

export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-10">
      {/* Mobile Menu & Title */}
      <div className="flex items-center md:hidden">
        <button className="text-slate-500 hover:text-slate-700 p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="ml-3 font-bold text-slate-800 text-lg flex items-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">CareerPilot</span>
        </div>
      </div>

      {/* Desktop Search */}
      <div className="hidden md:flex flex-1 max-w-xl">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 sm:text-sm text-slate-900 transition-all duration-200"
            placeholder="Search roles, skills, or applications..."
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-3 sm:space-x-4 ml-auto">
        {/* Theme Toggle Placeholder */}
        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors hidden sm:block">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        {/* Notifications Placeholder */}
        <button className="relative p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
          <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></div>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* Profile Avatar Placeholder */}
        <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-100 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 flex items-center justify-center text-white font-medium shadow-sm">
            JD
          </div>
          <svg className="w-4 h-4 text-slate-400 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </header>
  );
}
