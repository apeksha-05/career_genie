import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createJob, updateJob, getJobById } from '../api/jobs';

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
      <div className="min-h-screen bg-[#0f1115] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1115] p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-[2rem] blur opacity-25"></div>
        <div className="relative bg-[#1a1d24] rounded-[2rem] border border-white/10 p-10 md:p-12 shadow-2xl">
          
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
              {editMode ? 'Edit Job Posting' : 'Post a New Job'}
            </h2>
            <p className="text-gray-400">
              {editMode ? 'Update the details below to modify your posting.' : 'Fill out the details below to publish your opening.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  placeholder="e.g. Senior Frontend Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                <input 
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  placeholder="e.g. Acme Corp"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  placeholder="e.g. Remote, NY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Salary Range (Optional)</label>
                <input 
                  type="text" 
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  placeholder="e.g. $100k - $120k"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Job Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
                placeholder="Describe the role and responsibilities..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Requirements & Skills</label>
              <input 
                type="text" 
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                placeholder="Comma separated (e.g. React, Node.js, Python)"
              />
              <p className="text-xs text-gray-500 mt-2">These skills will be used by the matching engine to find top candidates.</p>
            </div>

            <div className="pt-4 flex items-center justify-end gap-4">
              <button 
                type="button"
                onClick={() => navigate('/dashboard/recruiter')}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition-transform hover:-translate-y-1"
              >
                {loading ? (editMode ? 'Saving...' : 'Posting...') : (editMode ? 'Save Changes' : 'Publish Job')}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default PostJobForm;
