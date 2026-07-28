import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { Calendar, BarChart2, Briefcase, Send, Download, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import TopHeader from '../components/TopHeader';
import JobCard from '../components/JobCard';
import Button from '../components/ui/Button';

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar role="student" />
      
      <main className="flex-1 flex flex-col h-screen">
        <TopHeader showNav={true} />
        <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">Welcome back, {user?.name || 'Student'}</h2>
              <p className="text-gray-500">Your career journey is looking promising today.</p>
            </div>
            <div className="flex items-center text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
              <Calendar className="h-4 w-4 mr-2 text-brand-900" />
              October 24, 2024
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Resume Score</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-brand-900">85</span>
                  <span className="text-sm text-gray-400 font-medium ml-1">/100</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-brand-900">
                <BarChart2 className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Jobs Matched</p>
                <div className="text-3xl font-bold text-green-600">12</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <Briefcase className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Applications Sent</p>
                <div className="text-3xl font-bold text-orange-500">05</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                <Send className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Resume Analysis */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">Your Resume Analysis</h3>
                
                {/* Circular Score */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-48 h-48 rounded-full border-[16px] border-gray-100 flex items-center justify-center">
                    {/* Active border overlay - simulated with CSS */}
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-[16px] border-brand-900 border-t-transparent border-r-transparent transform -rotate-45" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
                    <div className="text-center z-10">
                      <span className="text-5xl font-extrabold text-brand-900">85</span>
                      <p className="text-xs font-semibold text-gray-500 mt-1 uppercase tracking-wider">Expert Level</p>
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-100">
                  <div className="flex items-center text-brand-900 font-bold mb-4">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Top 3 Suggestions
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="mt-0.5 bg-white text-green-500 rounded-full p-0.5 border border-green-200 mr-3 shrink-0">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                      </div>
                      <span className="text-sm text-gray-700">Add more technical keywords like <strong className="text-brand-900">'React.js'</strong></span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-0.5 bg-white text-green-500 rounded-full p-0.5 border border-green-200 mr-3 shrink-0">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                      </div>
                      <span className="text-sm text-gray-700">Quantify your impact in the internship section (e.g. "Improved efficiency by 20%")</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-0.5 bg-white text-green-500 rounded-full p-0.5 border border-green-200 mr-3 shrink-0">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                      </div>
                      <span className="text-sm text-gray-700">Include a compelling summary section to highlight your career goals</span>
                    </li>
                  </ul>
                </div>

                <button className="w-full flex justify-center items-center py-3.5 border-2 border-brand-900 rounded-xl text-brand-900 font-bold hover:bg-blue-50 transition-colors">
                  <Download className="mr-2 w-5 h-5" /> Download AI Report
                </button>
              </div>
            </div>

            {/* Right Column - Recommended Jobs */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Recommended Jobs</h3>
                <Link to="/dashboard/student/jobs" className="text-sm font-medium text-brand-900 flex items-center hover:underline">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="space-y-4 flex-grow">
                {[
                  {
                    _id: '1',
                    title: 'Software Engineering Intern',
                    company: 'TechCorp',
                    location: 'Palo Alto, CA (Remote)',
                    matchPercentage: 98,
                    postedAt: '2d ago',
                    companyLogo: null,
                  },
                  {
                    _id: '2',
                    title: 'Junior Frontend Developer',
                    company: 'CreativeFlow',
                    location: 'Austin, TX',
                    matchPercentage: 92,
                    postedAt: '5d ago',
                    companyLogo: null,
                  },
                  {
                    _id: '3',
                    title: 'Data Analyst Intern',
                    company: 'Finalyze Systems',
                    location: 'New York, NY',
                    matchPercentage: 88,
                    postedAt: '1w ago',
                    companyLogo: null,
                  },
                  {
                    _id: '4',
                    title: 'Product Design Fellow',
                    company: 'CloudScale UI',
                    location: 'Remote',
                    matchPercentage: 85,
                    postedAt: '3d ago',
                    companyLogo: null,
                  }
                ].map(job => (
                  <JobCard key={job._id} job={job} variant="compact" />
                ))}
              </div>

              {/* Banner ad */}
              <div className="mt-6 rounded-2xl overflow-hidden relative shadow-md">
                <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-40 object-cover" alt="Interview prep" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40 p-6 flex flex-col justify-center items-start">
                  <h4 className="text-white font-bold text-xl mb-2">Prepare for your next interview</h4>
                  <p className="text-gray-200 text-sm max-w-sm mb-4">Use our AI interview simulator to practice role-specific questions for TechCorp.</p>
                  <Button variant="solid" className="bg-white !text-gray-900 hover:bg-gray-100">Start Practice</Button>
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

export default StudentDashboard;
