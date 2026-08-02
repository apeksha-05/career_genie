import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { Calendar, BarChart2, Briefcase, Send, Download, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import TopHeader from '../components/TopHeader';
import JobCard from '../components/JobCard';
import Button from '../components/ui/Button';

import { getMyResume } from '../api/resume';
import { getJobs } from '../api/jobs';
import { getMyApplications } from '../api/applications';

const StudentDashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  
  const [resumeData, setResumeData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resumeRes, jobsRes, appsRes] = await Promise.allSettled([
          getMyResume(token),
          getJobs(token),
          getMyApplications(token)
        ]);

        if (resumeRes.status === 'fulfilled') setResumeData(resumeRes.value.data);
        if (jobsRes.status === 'fulfilled') setJobs(jobsRes.value.data);
        if (appsRes.status === 'fulfilled') setApplications(appsRes.value.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchData();
  }, [token]);

  const score = resumeData?.analysisResult?.score || 0;
  const level = score >= 80 ? 'Expert Level' : score >= 50 ? 'Intermediate Level' : 'Beginner Level';
  const suggestions = resumeData?.analysisResult?.suggestions || [];
  
  // Sort jobs by match percentage descending
  const recommendedJobs = [...jobs].sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0)).slice(0, 4);
  const matchedCount = jobs.filter(j => (j.matchPercentage || 0) >= 40).length;

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
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-900" />
            </div>
          ) : (
            <>
              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Resume Score</p>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-brand-900">{score > 0 ? score : '--'}</span>
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
                    <div className="text-3xl font-bold text-green-600">{String(matchedCount).padStart(2, '0')}</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <Briefcase className="h-6 w-6" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Applications Sent</p>
                    <div className="text-3xl font-bold text-orange-500">{String(applications.length).padStart(2, '0')}</div>
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
                    
                    {resumeData ? (
                      <>
                        {/* Circular Score */}
                        <div className="flex justify-center mb-8">
                          <div className="relative w-48 h-48 rounded-full border-[16px] border-gray-100 flex items-center justify-center">
                            {/* Active border overlay - simulated with CSS */}
                            <div className="absolute top-0 left-0 w-full h-full rounded-full border-[16px] border-brand-900 border-t-transparent border-r-transparent transform -rotate-45" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
                            <div className="text-center z-10">
                              <span className="text-5xl font-extrabold text-brand-900">{score}</span>
                              <p className="text-xs font-semibold text-gray-500 mt-1 uppercase tracking-wider">{level}</p>
                            </div>
                          </div>
                        </div>

                        {/* Suggestions */}
                        <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-100">
                          <div className="flex items-center text-brand-900 font-bold mb-4">
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Top Suggestions
                          </div>
                          <ul className="space-y-4">
                            {suggestions.length > 0 ? (
                              suggestions.slice(0, 3).map((suggestion, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className="mt-0.5 bg-white text-green-500 rounded-full p-0.5 border border-green-200 mr-3 shrink-0">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                                  </div>
                                  <span className="text-sm text-gray-700">{suggestion}</span>
                                </li>
                              ))
                            ) : (
                              <li className="text-sm text-gray-700">Looking good! No major suggestions right now.</li>
                            )}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">Upload your resume to get an AI analysis and improve your matches.</p>
                        <Link to="/dashboard/student/resume">
                          <Button variant="solid" className="w-full">Upload Resume</Button>
                        </Link>
                      </div>
                    )}
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
                    {recommendedJobs.length > 0 ? (
                      recommendedJobs.map(job => (
                        <JobCard key={job._id} job={job} variant="compact" />
                      ))
                    ) : (
                      <div className="bg-white p-8 rounded-2xl text-center border border-gray-100">
                        <p className="text-gray-500">No jobs matched your profile yet. Make sure your resume is up to date.</p>
                      </div>
                    )}
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
            </>
          )}
        </div>
      </div>
    </main>
  </div>
);
};

export default StudentDashboard;
