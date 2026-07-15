import React from 'react';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { AlertTriangle, Users, Briefcase, CheckCircle, Search, MoreVertical, X, Check, Eye } from 'lucide-react';

const AdminPanel = () => {
  const customRightItem = (
    <div className="flex items-center space-x-6">
      <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
      </button>
      <div className="flex items-center text-right">
        <div className="mr-3 hidden md:block">
          <p className="text-sm font-bold text-gray-900">Alex Sterling</p>
          <p className="text-xs text-gray-500">System Administrator</p>
        </div>
        <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 cursor-pointer">
          <img src="https://i.pravatar.cc/150?u=a04258114e29026702d" alt="Admin" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar role="admin" />
      
      <main className="flex-1 flex flex-col h-screen">
        <TopHeader customRightItem={customRightItem} />

        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            
            {/* Header & Alert */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Admin Dashboard</h2>
              <div className="flex items-center text-amber-500 text-sm font-medium">
                <AlertTriangle className="w-4 h-4 mr-2" />
                System Status: <span className="font-bold ml-1">5 jobs pending approval</span>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-brand-900">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-emerald-500 text-xs font-bold flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    +12%
                  </span>
                </div>
                <div className="relative z-10">
                  <p className="text-sm font-medium text-gray-500 mb-1">Total Users</p>
                  <div className="text-4xl font-extrabold text-gray-900">2,840</div>
                </div>
                {/* Decorative bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
                  <div className="h-full bg-brand-900 w-1/2"></div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <span className="text-emerald-500 text-xs font-bold flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    +8%
                  </span>
                </div>
                <div className="relative z-10">
                  <p className="text-sm font-medium text-gray-500 mb-1">Active Jobs</p>
                  <div className="text-4xl font-extrabold text-gray-900">412</div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
                  <div className="h-full bg-slate-700 w-1/3"></div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-emerald-500 text-xs font-bold flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    +24%
                  </span>
                </div>
                <div className="relative z-10">
                  <p className="text-sm font-medium text-gray-500 mb-1">Successful Placements</p>
                  <div className="text-4xl font-extrabold text-gray-900">186</div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
                  <div className="h-full bg-emerald-500 w-2/3"></div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Users Over Time</h3>
                    <p className="text-xs text-gray-500">Registration growth over the last 6 months</p>
                  </div>
                  <select className="bg-gray-50 border-none rounded-lg text-sm font-medium text-gray-700 py-1.5 pl-3 pr-8 focus:ring-0 cursor-pointer">
                    <option>Last 6 Months</option>
                    <option>This Year</option>
                  </select>
                </div>
                
                {/* Mockup Bar Chart */}
                <div className="h-48 flex items-end justify-between space-x-2 pt-4">
                  <div className="w-full bg-gray-200 rounded-t-sm h-[30%] hover:bg-gray-300 transition-colors relative group"><span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-400">JAN</span></div>
                  <div className="w-full bg-gray-300 rounded-t-sm h-[40%] hover:bg-gray-400 transition-colors relative group"><span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-400">FEB</span></div>
                  <div className="w-full bg-slate-300 rounded-t-sm h-[35%] hover:bg-slate-400 transition-colors relative group"><span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-400">MAR</span></div>
                  <div className="w-full bg-slate-400 rounded-t-sm h-[55%] hover:bg-slate-500 transition-colors relative group"><span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-400">APR</span></div>
                  <div className="w-full bg-blue-400 rounded-t-sm h-[75%] hover:bg-blue-500 transition-colors relative group"><span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-400">MAY</span></div>
                  <div className="w-full bg-brand-900 rounded-t-sm h-[90%] hover:bg-brand-800 transition-colors relative group"><span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-900">JUN</span></div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Applications</h3>
                <p className="text-xs text-gray-500 mb-6">By Department</p>
                
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-sm font-bold text-gray-900 mb-2">
                      <span>Computer Science</span>
                      <span>42%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-brand-900 h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold text-gray-900 mb-2">
                      <span>Business Admin</span>
                      <span>28%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-slate-700 h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold text-gray-900 mb-2">
                      <span>Mechanical Eng.</span>
                      <span>15%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold text-gray-900 mb-2">
                      <span>Others</span>
                      <span>15%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-gray-300 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Job Moderation Table */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Job Moderation</h3>
                  <p className="text-sm text-gray-500">Review pending listings from recruiters</p>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">View All</button>
                  <button className="bg-blue-50 text-brand-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100">Bulk Approve</button>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                        <th className="p-4 pl-6">Job Title</th>
                        <th className="p-4">Company</th>
                        <th className="p-4">Posted Date</th>
                        <th className="p-4">Eligibility</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-gray-900 divide-y divide-gray-100">
                      
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 pl-6">
                          <p className="font-bold text-gray-900">Senior Frontend Engineer</p>
                          <p className="text-xs text-gray-500">Full-time • Remote</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-xs mr-3">TC</div>
                            <span className="font-medium text-gray-700">TechCorp Inc.</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-500">Oct 24, 2024</td>
                        <td className="p-4"><span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">BE/BTech</span></td>
                        <td className="p-4"><span className="bg-amber-50 border border-amber-200 text-amber-600 text-xs font-bold px-2.5 py-1 rounded-full">Pending</span></td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center space-x-2">
                            <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"><X className="w-4 h-4" /></button>
                            <button className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded-md transition-colors"><Check className="w-4 h-4" /></button>
                            <button className="p-1.5 text-brand-900 hover:bg-blue-50 rounded-md transition-colors"><Eye className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 pl-6">
                          <p className="font-bold text-gray-900">Product Marketing Intern</p>
                          <p className="text-xs text-gray-500">Internship • Bangalore</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-xs mr-3">Z</div>
                            <span className="font-medium text-gray-700">Zylos Global</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-500">Oct 23, 2024</td>
                        <td className="p-4"><span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">MBA/BBA</span></td>
                        <td className="p-4"><span className="bg-amber-50 border border-amber-200 text-amber-600 text-xs font-bold px-2.5 py-1 rounded-full">Pending</span></td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center space-x-2">
                            <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"><X className="w-4 h-4" /></button>
                            <button className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded-md transition-colors"><Check className="w-4 h-4" /></button>
                            <button className="p-1.5 text-brand-900 hover:bg-blue-50 rounded-md transition-colors"><Eye className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 pl-6">
                          <p className="font-bold text-gray-900">Data Science Associate</p>
                          <p className="text-xs text-gray-500">Full-time • Hybrid</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs mr-3">N</div>
                            <span className="font-medium text-gray-700">NexGen Analytics</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-500">Oct 22, 2024</td>
                        <td className="p-4"><span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">Masters</span></td>
                        <td className="p-4"><span className="bg-amber-50 border border-amber-200 text-amber-600 text-xs font-bold px-2.5 py-1 rounded-full">Pending</span></td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center space-x-2">
                            <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"><X className="w-4 h-4" /></button>
                            <button className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded-md transition-colors"><Check className="w-4 h-4" /></button>
                            <button className="p-1.5 text-brand-900 hover:bg-blue-50 rounded-md transition-colors"><Eye className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* User Management Cards */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">User Management</h3>
                  <p className="text-sm text-gray-500">Manage platform participants and permissions</p>
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search by name, email, or role..." 
                    className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 w-72"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center">
                    <img src="https://i.pravatar.cc/150?u=a042" alt="Sarah" className="w-12 h-12 rounded-full object-cover mr-4" />
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-bold text-gray-900 mr-2">Sarah Chen</h4>
                        <span className="bg-brand-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">STUDENT</span>
                      </div>
                      <p className="text-xs text-gray-500">sarah.c@university.edu</p>
                      <div className="flex items-center mt-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1"></span>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">Active</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center">
                    <img src="https://i.pravatar.cc/150?u=a0425" alt="Marcus" className="w-12 h-12 rounded-full object-cover mr-4" />
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-bold text-gray-900 mr-2">Marcus Thorne</h4>
                        <span className="bg-teal-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">RECRUITER</span>
                      </div>
                      <p className="text-xs text-gray-500">m.thorne@globaltech.com</p>
                      <div className="flex items-center mt-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1"></span>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">Active</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between opacity-75">
                  <div className="flex items-center">
                    <img src="https://i.pravatar.cc/150?u=a04258" alt="James" className="w-12 h-12 rounded-full object-cover mr-4 grayscale" />
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-bold text-gray-900 mr-2">James Miller</h4>
                        <span className="bg-slate-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">STUDENT</span>
                      </div>
                      <p className="text-xs text-gray-500">jmiller@campus.mail</p>
                      <div className="flex items-center mt-1">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1"></span>
                        <span className="text-[10px] font-bold text-red-600 uppercase">Suspended</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
                </div>

              </div>
            </div>
            
            <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center text-xs text-gray-400 mb-8">
              <p>© 2024 CareerGenie Platform. Institutional Admin Portal.</p>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-gray-600">Privacy Policy</a>
                <a href="#" className="hover:text-gray-600">Terms of Service</a>
                <a href="#" className="hover:text-gray-600">Security Audit</a>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
