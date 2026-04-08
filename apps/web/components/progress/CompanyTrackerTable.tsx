import React from 'react';
import { CompanyApplication } from '../../types/progress';

export default function CompanyTrackerTable() {
  const applications: CompanyApplication[] = [
    { id: '1', company: 'Amazon', role: 'Frontend Engineer', current_stage: 'Offer', last_updated: '2023-11-10', result: 'Secured' },
    { id: '2', company: 'ServiceNow', role: 'UI Engineer', current_stage: 'Interview', last_updated: '2023-11-15', result: 'Pending' },
    { id: '3', company: 'Autodesk', role: 'SDE I', current_stage: 'OA', last_updated: '2023-11-16', result: 'Pending' },
    { id: '4', company: 'Atlassian', role: 'Software Engineer', current_stage: 'Applied', last_updated: '2023-11-18', result: 'Pending' },
    { id: '5', company: 'Google', role: 'Software Engineer', current_stage: 'Rejected', last_updated: '2023-11-01', result: 'Failed' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Tracker Log</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
            <tr>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Stage</th>
              <th className="px-6 py-4">Last Updated</th>
              <th className="px-6 py-4 text-right">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {applications.map(app => (
              <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">{app.company}</td>
                <td className="px-6 py-4 font-medium text-slate-600">{app.role}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-slate-100 text-slate-700">
                    {app.current_stage}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 text-xs font-medium">{app.last_updated}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide ${
                    app.result === 'Secured' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                    app.result === 'Failed' ? 'bg-rose-50 text-rose-600 border border-rose-200' :
                    'bg-amber-50 text-amber-600 border border-amber-200'
                  }`}>
                    {app.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
