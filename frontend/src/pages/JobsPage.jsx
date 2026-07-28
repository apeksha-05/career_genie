import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getJobs } from '../api/jobs';
import JobCard from '../components/JobCard';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import { Briefcase } from 'lucide-react';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getJobs(token);
        setJobs(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchJobs();
    }
  }, [token]);

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar role="student" />
      
      <main className="flex-1 flex flex-col h-screen">
        <TopHeader showNav={true} />
        
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <header className="mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Recommended Jobs
              </h1>
              <p className="text-gray-500 text-sm max-w-xl">
                Based on your resume's skills and experience.
              </p>
            </header>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-900"></div>
              </div>
            ) : error ? (
              <ErrorState 
                title="Failed to load jobs"
                message={error}
                onRetry={() => window.location.reload()}
              />
            ) : jobs.length === 0 ? (
              <EmptyState 
                icon={Briefcase}
                title="No jobs available right now"
                description="We couldn't find any job recommendations matching your profile at the moment. Check back later!"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobsPage;
