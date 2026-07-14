import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getJobs } from '../api/jobs';
import JobCard from '../components/JobCard';

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
    <div className="min-h-screen bg-[#0f1115] p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4 tracking-tight">
            Recommended Jobs
          </h1>
          <p className="text-gray-400 text-lg">
            Based on your resume's skills and experience.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl">
            {error}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No jobs found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
