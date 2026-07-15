import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { MoreHorizontal, Search, Bell, Settings, Filter, Plus, Briefcase, PenTool, Cloud, Shield, Video, Trophy, Paperclip } from 'lucide-react';

const initialApplications = [
  { id: 1, title: 'Software Engineer', company: 'TechCorp Inc.', date: 'Oct 12, 2023', match: '94%', status: 'Applied', icon: Briefcase, color: 'blue' },
  { id: 2, title: 'Data Analyst Intern', company: 'InsightFlow', date: 'Oct 14, 2023', match: '88%', status: 'Applied', icon: Briefcase, color: 'indigo' },
  { id: 3, title: 'Product Design Fellow', company: 'CreativeFlow', date: 'Oct 08, 2023', match: '98%', status: 'Under Review', icon: PenTool, color: 'purple' },
  { id: 4, title: 'Cloud Arch Specialist', company: 'SkyScale Solutions', date: 'Sep 28, 2023', match: '92%', status: 'Interview', icon: Cloud, color: 'cyan', nextStep: 'Round 2: Technical', nextDate: 'Tomorrow at 2:00 PM' },
  { id: 5, title: 'Cybersecurity Intern', company: 'SecureGate Ltd.', date: 'Sep 15, 2023', match: '85%', status: 'Accepted', icon: Shield, color: 'green' }
];

import TopHeader from '../components/TopHeader';

const ApplicationsTracker = () => {
  const [apps, setApps] = useState(initialApplications);

  const getColumnColor = (status) => {
    switch(status) {
      case 'Applied': return 'bg-gray-400';
      case 'Under Review': return 'bg-yellow-400';
      case 'Interview': return 'bg-blue-500';
      case 'Accepted': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getBorderColor = (status) => {
    switch(status) {
      case 'Applied': return 'border-gray-200';
      case 'Under Review': return 'border-yellow-400';
      case 'Interview': return 'border-blue-500';
      case 'Accepted': return 'border-green-500';
      default: return 'border-gray-200';
    }
  };

  const columns = ['Applied', 'Under Review', 'Interview', 'Accepted'];

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar role="student" />
      
      <main className="flex-1 overflow-x-hidden flex flex-col h-screen">
        <TopHeader showNav={true} />

        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Application Tracker</h2>
              <p className="text-gray-500 text-sm max-w-xl">
                Monitor your professional journey. Manage your pipeline and track interview stages to keep your career momentum moving forward.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Sort by: Most Recent
              </button>
              <button className="flex items-center px-4 py-2 bg-brand-900 rounded-lg text-sm font-medium text-white shadow-sm hover:bg-brand-800 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                New Application
              </button>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="flex space-x-6 overflow-x-auto pb-8 snap-x">
            {columns.map(col => {
              const colApps = apps.filter(a => a.status === col);
              return (
                <div key={col} className="w-80 flex-shrink-0 snap-start">
                  <div className="flex items-center justify-between mb-4 px-1">
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${getColumnColor(col)}`}></span>
                      <h3 className="font-bold text-gray-900 text-lg mr-2">{col}</h3>
                      <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{colApps.length}</span>
                    </div>
                    <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </div>

                  <div className="space-y-4">
                    {colApps.map(app => (
                      <div key={app.id} className={`bg-white rounded-xl p-5 shadow-sm border-l-4 border-y border-r border-gray-100 ${getBorderColor(app.status)} hover:shadow-md transition-shadow cursor-pointer group`}>
                        <div className="flex justify-between items-start mb-4">
                          <div className={`w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600`}>
                            <app.icon className="w-5 h-5" />
                          </div>
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                            {app.match} Match
                          </span>
                        </div>
                        
                        <h4 className="font-bold text-gray-900 text-base mb-1">{app.title}</h4>
                        <p className="text-sm text-gray-500 mb-4">{app.company}</p>
                        
                        {app.nextStep && (
                          <div className="bg-blue-50 rounded-lg p-3 mb-4 flex items-start">
                            <Video className="w-4 h-4 text-brand-900 mr-2 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-bold text-brand-900">{app.nextStep}</p>
                              <p className="text-xs text-gray-500">{app.nextDate}</p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                          <div className="flex items-center">
                            <Calendar className="w-3.5 h-3.5 mr-1.5" />
                            {app.date}
                          </div>
                          {app.status === 'Applied' && <Paperclip className="w-4 h-4" />}
                          {app.status === 'Accepted' && <Trophy className="w-4 h-4 text-yellow-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

// Reusable Calendar Icon since it wasn't imported from lucide-react in this block
const Calendar = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export default ApplicationsTracker;
