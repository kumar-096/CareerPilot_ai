import React from 'react';
import { Task } from '../../types/roadmap';

export default function TaskTimeline() {
  const tasks: Task[] = [
    { day: 1, title: 'Arrays & Two Pointers', description: 'Solve 5 medium LC array problems, optimize space complexity.', status: 'completed', category: 'dsa' },
    { day: 2, title: 'Graphs & BFS/DFS', description: 'Implement standard traversals and shortest path algorithms.', status: 'completed', category: 'dsa' },
    { day: 3, title: 'DBMS Foundations', description: 'ACID properties, Normalization, indexing and query optimization.', status: 'completed', category: 'core' },
    { day: 4, title: 'Operating Systems', description: 'Process management, concurrency, deadlocks, and memory paging.', status: 'current', category: 'core' },
    { day: 5, title: 'OOP Principles', description: 'Deep dive into polymorphism, inheritance, and design patterns.', status: 'locked', category: 'core' },
    { day: 6, title: 'Comprehensive Mock Interview', description: '1-hour behavioral + technical live simulation.', status: 'locked', category: 'interview' },
    { day: 7, title: 'Project Deep Dive Revision', description: 'Articulate architecture, trade-offs, and scalability bottlenecks.', status: 'locked', category: 'project' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 py-6 px-4 sm:px-8">
      <h2 className="text-xl font-bold text-slate-900 mb-8 tracking-tight">Execution Checklist</h2>
      <div className="relative border-l-2 border-slate-100 ml-3 space-y-8">
        {tasks.map((task) => (
          <div key={task.day} className="relative pl-8">
            <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center
              ${task.status === 'completed' ? 'border-emerald-500' : task.status === 'current' ? 'border-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.1)]' : 'border-slate-300'}
            `}>
              {task.status === 'completed' && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
              {task.status === 'current' && <div className="w-2 h-2 rounded-full bg-indigo-500"></div>}
            </div>

            <div className={`transition-all ${task.status === 'locked' ? 'opacity-60' : 'opacity-100'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded
                  ${task.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : task.status === 'current' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-500'}
                `}>
                  Day {task.day}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded
                  ${task.category === 'dsa' ? 'bg-orange-50 text-orange-700' : task.category === 'core' ? 'bg-cyan-50 text-cyan-700' : task.category === 'interview' ? 'bg-rose-50 text-rose-700' : 'bg-purple-50 text-purple-700'}
                `}>
                  {task.category}
                </span>
              </div>
              <h3 className={`text-base font-bold ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                {task.title}
              </h3>
              <p className="text-sm font-medium text-slate-500 mt-1">{task.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
