import React from 'react';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { Plus, Users, Briefcase, CheckCircle2, MoreHorizontal, Bookmark, BookmarkCheck } from 'lucide-react';

const RecruiterDashboard = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar role="recruiter" />
      
      <main className="flex-1 flex flex-col h-screen">
        <TopHeader showNav={false} />
        
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            
            {/* Header Area */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Good morning, Priya.</h2>
                <p className="text-gray-600">Here is what's happening with your recruitment pipeline today.</p>
              </div>
              <button className="bg-brand-900 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm hover:bg-brand-800 transition-colors flex items-center">
                <Plus className="w-5 h-5 mr-2" /> Post a Job
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Applicants</h3>
                  <Users className="w-5 h-5 text-brand-900" />
                </div>
                <div className="text-4xl font-extrabold text-brand-900 mb-2">1,240</div>
                <div className="text-sm font-medium text-emerald-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  12% since last month
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active Postings</h3>
                  <Briefcase className="w-5 h-5 text-brand-900" />
                </div>
                <div className="text-4xl font-extrabold text-brand-900 mb-2">12</div>
                <div className="text-sm font-medium text-gray-500">
                  4 ending this week
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Avg. Match Score</h3>
                  <CheckCircle2 className="w-5 h-5 text-brand-900" />
                </div>
                <div className="text-4xl font-extrabold text-brand-900 mb-2">78%</div>
                <div className="text-sm font-medium text-amber-500 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Target score is 80%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column - Active Postings Table */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">Active Postings</h3>
                    <button className="text-sm font-medium text-brand-900 hover:underline">View All</button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-gray-400 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                          <th className="p-4 pl-6 font-semibold">Job Title</th>
                          <th className="p-4 font-semibold">Date Posted</th>
                          <th className="p-4 font-semibold">Apps</th>
                          <th className="p-4 font-semibold">Status</th>
                          <th className="p-4 font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm text-gray-900">
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-4 pl-6">
                            <p className="font-bold">Software Engineering Intern</p>
                            <p className="text-xs text-gray-500">Engineering Department</p>
                          </td>
                          <td className="p-4 text-gray-600">Oct 12, 2023</td>
                          <td className="p-4">
                            <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full text-xs">428</span>
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-xs">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span> Active
                            </span>
                          </td>
                          <td className="p-4 text-brand-900 font-medium cursor-pointer hover:underline">View</td>
                        </tr>
                        
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-4 pl-6">
                            <p className="font-bold">Product Design Graduate</p>
                            <p className="text-xs text-gray-500">Creative Ops</p>
                          </td>
                          <td className="p-4 text-gray-600">Oct 10, 2023</td>
                          <td className="p-4">
                            <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full text-xs">186</span>
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-xs">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span> Active
                            </span>
                          </td>
                          <td className="p-4 text-brand-900 font-medium cursor-pointer hover:underline">View</td>
                        </tr>

                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-4 pl-6">
                            <p className="font-bold">Data Analyst (Junior)</p>
                            <p className="text-xs text-gray-500">Data & AI</p>
                          </td>
                          <td className="p-4 text-gray-600">Oct 05, 2023</td>
                          <td className="p-4">
                            <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full text-xs">312</span>
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded-full text-xs">
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span> Closed
                            </span>
                          </td>
                          <td className="p-4 text-brand-900 font-medium cursor-pointer hover:underline">View</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column - Top Talent Radar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 bg-gradient-to-b from-blue-50/50 to-white h-full">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-brand-900 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                    <h3 className="text-lg font-bold text-gray-900">Top Talent Radar</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">AI-powered matches across all active postings.</p>

                  <div className="space-y-4">
                    {/* Radar Item 1 */}
                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 mr-3 shrink-0">
                             <img src="https://i.pravatar.cc/150?u=a04258" alt="Arjun Mehta" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900">Arjun Mehta</h4>
                            <p className="text-xs text-gray-500">Software Engineering</p>
                          </div>
                        </div>
                        <span className="bg-brand-900 text-white text-xs font-bold px-2 py-1 rounded">98%</span>
                      </div>
                      <button className="w-full mt-4 flex items-center justify-center py-1.5 border border-brand-900 text-brand-900 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors">
                        <Bookmark className="w-3.5 h-3.5 mr-1" /> Shortlist
                      </button>
                    </div>

                    {/* Radar Item 2 */}
                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 mr-3 shrink-0">
                             <img src="https://i.pravatar.cc/150?u=a042581f4" alt="Sarah Jenkins" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900">Sarah Jenkins</h4>
                            <p className="text-xs text-gray-500">Product Design</p>
                          </div>
                        </div>
                        <span className="bg-brand-900 text-white text-xs font-bold px-2 py-1 rounded">96%</span>
                      </div>
                      <button className="w-full mt-4 flex items-center justify-center py-1.5 border border-brand-900 text-brand-900 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors">
                        <Bookmark className="w-3.5 h-3.5 mr-1" /> Shortlist
                      </button>
                    </div>

                    {/* Radar Item 3 */}
                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 mr-3 shrink-0">
                             <img src="https://i.pravatar.cc/150?u=a04" alt="Leo Chen" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900">Leo Chen</h4>
                            <p className="text-xs text-gray-500">Data Analytics</p>
                          </div>
                        </div>
                        <span className="bg-brand-900 text-white text-xs font-bold px-2 py-1 rounded">94%</span>
                      </div>
                      <button className="w-full mt-4 flex items-center justify-center py-1.5 border border-brand-900 text-brand-900 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors">
                        <Bookmark className="w-3.5 h-3.5 mr-1" /> Shortlist
                      </button>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;
