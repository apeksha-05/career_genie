import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getJobs } from '../api/jobs';
import JobCard from '../components/JobCard';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import { Briefcase, Search, SlidersHorizontal, X, Calendar } from 'lucide-react';

const POPULAR_SKILLS = ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Java', 'AWS', 'Docker', 'TypeScript', 'Go'];
const DEADLINE_OPTIONS = [
  { label: 'Any deadline', value: '' },
  { label: 'Closes this week', value: (() => { const d = new Date(); return d.toISOString().split('T')[0]; })() },
  { label: 'Closes this month', value: (() => { const d = new Date(); d.setDate(d.getDate() - 30); return d.toISOString().split('T')[0]; })() },
];

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter state
  const [roleFilter, setRoleFilter] = useState('');
  const [skillsFilter, setSkillsFilter] = useState('');
  const [deadlineFilter, setDeadlineFilter] = useState('');
  const [selectedSkillTags, setSelectedSkillTags] = useState([]);

  const token = useSelector((state) => state.auth.token);
  const debounceTimer = useRef(null);

  const fetchJobs = useCallback(async (filters) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getJobs(token, filters);
      setJobs(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Build effective skills string from both text input and quick-tag selections
  const buildSkillsParam = useCallback((textInput, tags) => {
    const all = [
      ...tags,
      ...textInput.split(',').map(s => s.trim()).filter(Boolean),
    ];
    return [...new Set(all)].join(',');
  }, []);

  // Debounced re-fetch when filters change
  useEffect(() => {
    if (!token) return;
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchJobs({
        role: roleFilter,
        skills: buildSkillsParam(skillsFilter, selectedSkillTags),
        deadline: deadlineFilter,
      });
    }, 400);
    return () => clearTimeout(debounceTimer.current);
  }, [token, roleFilter, skillsFilter, deadlineFilter, selectedSkillTags, fetchJobs, buildSkillsParam]);

  const toggleSkillTag = (skill) => {
    setSelectedSkillTags(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setRoleFilter('');
    setSkillsFilter('');
    setDeadlineFilter('');
    setSelectedSkillTags([]);
  };

  const hasActiveFilters = roleFilter || skillsFilter || deadlineFilter || selectedSkillTags.length > 0;

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar role="student" />

      <main className="flex-1 flex flex-col h-screen">
        <TopHeader showNav={true} />

        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">Recommended Jobs</h1>
                  <p className="text-gray-500 text-sm">
                    Based on your resume's skills and experience.{' '}
                    {!loading && (
                      <span className="font-semibold text-brand-700">
                        {jobs.length} job{jobs.length !== 1 ? 's' : ''} found
                      </span>
                    )}
                  </p>
                </div>
                <button
                  id="toggle-filters-btn"
                  onClick={() => setShowFilters(prev => !prev)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                    showFilters || hasActiveFilters
                      ? 'bg-brand-900 text-white border-brand-900 shadow-sm'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-brand-400'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-1 w-5 h-5 rounded-full bg-white text-brand-900 text-xs font-bold flex items-center justify-center">
                      {[roleFilter, skillsFilter, deadlineFilter].filter(Boolean).length + selectedSkillTags.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Filter Panel */}
              {showFilters && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5 animate-fade-in" id="filter-panel">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* Role / Title search */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Role / Title
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          id="filter-role-input"
                          type="text"
                          value={roleFilter}
                          onChange={e => setRoleFilter(e.target.value)}
                          placeholder="e.g. Software Engineer"
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                        />
                        {roleFilter && (
                          <button onClick={() => setRoleFilter('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Skills text input */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Skills (comma-separated)
                      </label>
                      <div className="relative">
                        <input
                          id="filter-skills-input"
                          type="text"
                          value={skillsFilter}
                          onChange={e => setSkillsFilter(e.target.value)}
                          placeholder="e.g. React, Python, SQL"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                        />
                        {skillsFilter && (
                          <button onClick={() => setSkillsFilter('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Deadline */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Closing Date (from)
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                          id="filter-deadline-input"
                          type="date"
                          value={deadlineFilter}
                          onChange={e => setDeadlineFilter(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quick Skill Tags */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Quick Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SKILLS.map(skill => (
                        <button
                          key={skill}
                          id={`skill-tag-${skill.toLowerCase().replace(/[\s.]/g, '-')}`}
                          onClick={() => toggleSkillTag(skill)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                            selectedSkillTags.includes(skill)
                              ? 'bg-brand-900 text-white border-brand-900'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <div className="pt-1 border-t border-gray-100 flex justify-end">
                      <button
                        id="clear-filters-btn"
                        onClick={clearFilters}
                        className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Clear all filters
                      </button>
                    </div>
                  )}
                </div>
              )}
            </header>

            {/* Job Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
                    <div className="h-3.5 bg-gray-100 rounded w-1/2 mb-5" />
                    <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-5/6" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <ErrorState
                title="Failed to load jobs"
                message={error}
                onRetry={() => fetchJobs({ role: roleFilter, skills: buildSkillsParam(skillsFilter, selectedSkillTags), deadline: deadlineFilter })}
              />
            ) : jobs.length === 0 ? (
              <EmptyState
                icon={Briefcase}
                title={hasActiveFilters ? 'No jobs match your filters' : 'No jobs available right now'}
                description={
                  hasActiveFilters
                    ? 'Try adjusting your filters or clearing them to see all available jobs.'
                    : "We couldn't find any job recommendations at the moment. Check back later!"
                }
                action={
                  hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="mt-4 px-5 py-2 bg-brand-900 text-white rounded-xl text-sm font-medium hover:bg-brand-800 transition-colors"
                    >
                      Clear Filters
                    </button>
                  )
                }
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs
                  .slice()
                  .sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0))
                  .map((job) => (
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
