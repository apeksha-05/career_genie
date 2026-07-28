import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { Plus, Users, Briefcase, CheckCircle2, MoreHorizontal, Bookmark, BookmarkCheck } from 'lucide-react';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';

const RecruiterDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  // Using empty arrays to demonstrate the new empty states
  const [postings, setPostings] = React.useState([]);
  const [talentRadar, setTalentRadar] = React.useState([]);

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
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Good morning, {user?.name || 'Recruiter'}.</h2>
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
                    {postings.length === 0 ? (
                      <EmptyState 
                        icon={Briefcase}
                        title="No Active Postings"
                        description="You haven't posted any jobs yet. Create a new job posting to start finding great candidates."
                        action={<Button variant="solid" className="mt-4"><Plus className="w-4 h-4 mr-2" /> Post a Job</Button>}
                      />
                    ) : (
                      <table className="w-full text-left border-collapse">
                        {/* Table would go here */}
                      </table>
                    )}
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
                    {talentRadar.length === 0 ? (
                      <EmptyState 
                        icon={Users}
                        title="No Talent Matches"
                        description="Once you post jobs, AI will start recommending top talent right here."
                      />
                    ) : (
                      <div>{/* Radar Items */}</div>
                    )}
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
