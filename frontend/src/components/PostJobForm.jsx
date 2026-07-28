import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createJob, updateJob, getJobById } from '../api/jobs';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';

const PostJobForm = ({ editMode = false }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
    salary: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchingJob, setFetchingJob] = useState(editMode);
  const [error, setError] = useState(null);
  
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (editMode && id) {
      const fetchJob = async () => {
        try {
          const res = await getJobById(id, token);
          const job = res.data;
          setFormData({
            title: job.title || '',
            company: job.company || '',
            location: job.location || '',
            description: job.description || '',
            requirements: (job.requirements || []).join(', '),
            salary: job.salary || ''
          });
        } catch (err) {
          setError('Failed to load job details.');
        } finally {
          setFetchingJob(false);
        }
      };
      fetchJob();
    }
  }, [editMode, id, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...formData,
        requirements: formData.requirements.split(',').map(r => r.trim()).filter(r => r)
      };
      if (editMode) {
        await updateJob(id, payload, token);
      } else {
        await createJob(payload, token);
      }
      navigate('/dashboard/recruiter');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingJob) {
    return (
      <div className="flex bg-gray-50 min-h-screen font-sans">
        <Sidebar role="recruiter" />
        <main className="flex-1 flex flex-col h-screen">
          <TopHeader showNav={false} />
          <div className="flex-1 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-900"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar role="recruiter" />
      <main className="flex-1 flex flex-col h-screen">
        <TopHeader showNav={false} />
        
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl border border-gray-100 p-10 md:p-12 shadow-sm">
              
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {editMode ? 'Edit Job Posting' : 'Post a New Job'}
                </h2>
                <p className="text-gray-500">
                  {editMode ? 'Update the details below to modify your posting.' : 'Fill out the details below to publish your opening.'}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                    <input 
                      type="text" 
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all"
                      placeholder="e.g. Senior Frontend Developer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all"
                      placeholder="e.g. Acme Corp"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input 
                      type="text" 
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all"
                      placeholder="e.g. Remote, NY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range (Optional)</label>
                    <input 
                      type="text" 
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all"
                      placeholder="e.g. $100k - $120k"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all resize-none"
                    placeholder="Describe the role and responsibilities..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Requirements & Skills</label>
                  <input 
                    type="text" 
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all"
                    placeholder="Comma separated (e.g. React, Node.js, Python)"
                  />
                  <p className="text-xs text-gray-500 mt-2">These skills will be used by the matching engine to find top candidates.</p>
                </div>

                <div className="pt-4 flex items-center justify-end gap-4">
                  <button 
                    type="button"
                    onClick={() => navigate('/dashboard/recruiter')}
                    className="px-6 py-3 text-gray-500 hover:text-gray-700 transition-colors font-medium bg-gray-50 hover:bg-gray-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-brand-900 hover:bg-brand-800 disabled:opacity-50 text-white font-bold rounded-xl shadow-sm transition-transform hover:-translate-y-0.5"
                  >
                    {loading ? (editMode ? 'Saving...' : 'Posting...') : (editMode ? 'Save Changes' : 'Publish Job')}
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostJobForm;
