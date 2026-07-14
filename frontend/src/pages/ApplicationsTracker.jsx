import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyApplications } from '../api/applications';

// Status config: label, colour classes, step index (0-4)
const STATUS_CONFIG = {
  applied:      { label: 'Applied',      step: 0, dot: 'bg-blue-500',    badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  under_review: { label: 'Under Review', step: 1, dot: 'bg-yellow-500',  badge: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30' },
  interview:    { label: 'Interview',    step: 2, dot: 'bg-purple-500',  badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
  accepted:     { label: 'Accepted',     step: 3, dot: 'bg-emerald-500', badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  rejected:     { label: 'Rejected',     step: -1, dot: 'bg-red-500',   badge: 'bg-red-500/15 text-red-400 border-red-500/30' },
};

const PIPELINE_STEPS = ['applied', 'under_review', 'interview', 'accepted'];

const MatchBadge = ({ pct }) => {
  const colour =
    pct >= 80 ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
    : pct >= 50 ? 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30'
    : 'bg-red-500/15 text-red-400 border-red-500/30';
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${colour}`}>
      {pct}% Match
    </span>
  );
};

const StatusPipeline = ({ status }) => {
  const cfg = STATUS_CONFIG[status];
  const isRejected = status === 'rejected';
  const activeStep = cfg?.step ?? 0;

  if (isRejected) {
    return (
      <div className="flex items-center gap-2 mt-4">
        <div className="flex-1 h-1.5 rounded-full bg-red-500/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-red-500/60 w-full" />
        </div>
        <span className="text-xs text-red-400 font-semibold shrink-0">Not progressed</span>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex items-center gap-0">
        {PIPELINE_STEPS.map((step, i) => {
          const isFilled = i <= activeStep;
          const isActive = i === activeStep;
          const cfg = STATUS_CONFIG[step];
          return (
            <React.Fragment key={step}>
              {/* Node */}
              <div className="flex flex-col items-center">
                <div
                  className={`h-3 w-3 rounded-full border-2 transition-all duration-300
                    ${isFilled
                      ? `${cfg.dot} border-transparent shadow-lg shadow-current/30`
                      : 'bg-white/10 border-white/20'
                    }
                    ${isActive ? 'scale-125' : ''}
                  `}
                />
                <span className={`text-[10px] mt-1.5 font-medium hidden sm:block ${isFilled ? 'text-white' : 'text-gray-600'}`}>
                  {cfg.label}
                </span>
              </div>
              {/* Connector */}
              {i < PIPELINE_STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mb-3.5">
                  <div className={`h-full ${i < activeStep ? 'bg-white/30' : 'bg-white/10'} transition-all duration-500`} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const ApplicationCard = ({ app }) => {
  const job = app.jobId;
  const statusCfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.applied;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 transition-all duration-300 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/10">
      {/* Glow orb */}
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start gap-4 mb-3">
          <div className="min-w-0">
            <Link
              to={`/dashboard/student/jobs/${job?._id}`}
              className="text-lg font-bold text-white hover:text-purple-300 transition-colors line-clamp-1"
            >
              {job?.title || 'Unknown Role'}
            </Link>
            <p className="text-gray-400 text-sm">{job?.company} &bull; {job?.location}</p>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            {/* Status badge */}
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusCfg.badge}`}>
              {statusCfg.label}
            </span>
            {/* Match badge */}
            {app.matchPercentage !== undefined && <MatchBadge pct={app.matchPercentage} />}
          </div>
        </div>

        {/* Skill chips */}
        {job?.requirements?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {job.requirements.slice(0, 4).map((r, i) => (
              <span key={i} className="px-2 py-0.5 text-[11px] rounded bg-white/5 text-gray-400 border border-white/5">
                {r}
              </span>
            ))}
            {job.requirements.length > 4 && (
              <span className="px-2 py-0.5 text-[11px] rounded bg-white/5 text-gray-500 border border-white/5">
                +{job.requirements.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Pipeline */}
        {app.status !== 'rejected' ? (
          <StatusPipeline status={app.status} />
        ) : (
          <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
            <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-sm text-red-400">Application not progressed</span>
          </div>
        )}

        {/* Applied date */}
        <p className="mt-4 text-xs text-gray-600">
          Applied {new Date(app.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      </div>
    </div>
  );
};

// Stats bar at top
const StatsBar = ({ apps }) => {
  const total = apps.length;
  const active = apps.filter(a => !['accepted', 'rejected'].includes(a.status)).length;
  const accepted = apps.filter(a => a.status === 'accepted').length;
  const interviews = apps.filter(a => a.status === 'interview').length;

  const stats = [
    { label: 'Total Applied', value: total, colour: 'text-white' },
    { label: 'Active', value: active, colour: 'text-blue-400' },
    { label: 'Interviews', value: interviews, colour: 'text-purple-400' },
    { label: 'Accepted', value: accepted, colour: 'text-emerald-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {stats.map(s => (
        <div key={s.label} className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
          <p className={`text-3xl font-extrabold ${s.colour} mb-1`}>{s.value}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">{s.label}</p>
        </div>
      ))}
    </div>
  );
};

const ApplicationsTracker = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const token = useSelector(s => s.auth.token);

  useEffect(() => {
    (async () => {
      try {
        const res = await getMyApplications(token);
        setApps(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const filterTabs = [
    { key: 'all', label: 'All' },
    { key: 'applied', label: 'Applied' },
    { key: 'under_review', label: 'Under Review' },
    { key: 'interview', label: 'Interview' },
    { key: 'accepted', label: 'Accepted' },
    { key: 'rejected', label: 'Rejected' },
  ];

  const visible = filter === 'all' ? apps : apps.filter(a => a.status === filter);

  return (
    <div className="min-h-screen bg-[#0f1115] p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-3">
            My Applications
          </h1>
          <p className="text-gray-400 text-lg">Track every application and its current stage.</p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
          </div>
        ) : (
          <>
            <StatsBar apps={apps} />

            {/* Filter tabs */}
            <div className="flex gap-2 flex-wrap mb-8">
              {filterTabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
                    ${filter === tab.key
                      ? 'bg-purple-500 border-purple-400 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                    }`}
                >
                  {tab.label}
                  {tab.key !== 'all' && (
                    <span className="ml-1.5 text-xs opacity-60">
                      {apps.filter(a => a.status === tab.key).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {visible.length === 0 ? (
              <div className="text-center py-24 rounded-3xl bg-white/3 border border-white/10">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="text-2xl font-bold text-white mb-2">No applications yet</h3>
                <p className="text-gray-400 mb-6">Start exploring jobs and hit Apply to track them here.</p>
                <Link
                  to="/dashboard/student/jobs"
                  className="inline-block px-6 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:-translate-y-0.5 transition-transform"
                >
                  Browse Jobs
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {visible.map(app => (
                  <ApplicationCard key={app._id} app={app} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationsTracker;
