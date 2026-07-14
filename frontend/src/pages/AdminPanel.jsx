import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  getAnalytics, getUsers, updateUser, deleteUser,
  getAdminJobs, approveJob, rejectJob,
} from '../api/admin';

// ─── Tiny SVG Sparkline (no external deps) ────────────────────────────────
const Sparkline = ({ data = [], colour = '#a78bfa', height = 40 }) => {
  if (!data || data.length < 2) return <div style={{ height }} className="flex items-center justify-center text-gray-600 text-xs">No data</div>;
  const values = data.map(d => d.count);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const w = 200;
  const h = height;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 8) - 4;
    return `${x},${y}`;
  });
  const polyline = pts.join(' ');
  // Area fill
  const areaPoints = `0,${h} ${pts[0]} ${pts.join(' ')} ${w},${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={`sg-${colour.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colour} stopOpacity="0.3" />
          <stop offset="100%" stopColor={colour} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#sg-${colour.replace('#', '')})`} />
      <polyline points={polyline} fill="none" stroke={colour} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {values.map((v, i) => {
        const x = (i / (values.length - 1)) * w;
        const y = h - ((v - min) / range) * (h - 8) - 4;
        return <circle key={i} cx={x} cy={y} r="3" fill={colour} />;
      })}
    </svg>
  );
};

// ─── Donut Chart ──────────────────────────────────────────────────────────
const DonutChart = ({ slices = [], size = 120, thickness = 22 }) => {
  const total = slices.reduce((s, d) => s + d.value, 0) || 1;
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices.map((slice, i) => {
        const pct = slice.value / total;
        const dash = pct * circumference;
        const gap = circumference - dash;
        const el = (
          <circle
            key={i}
            cx={cx} cy={cx} r={r}
            fill="none"
            stroke={slice.colour}
            strokeWidth={thickness}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset * circumference}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          />
        );
        offset += pct;
        return el;
      })}
      <text x={cx} y={cx + 5} textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">{total}</text>
    </svg>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon, gradient, trend }) => (
  <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6">
    <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${gradient}`} />
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} text-white text-xl`}>{icon}</div>
        {trend !== undefined && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trend >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-3xl font-extrabold text-white mb-1">{value?.toLocaleString()}</p>
      <p className="text-sm text-gray-400 font-medium">{label}</p>
    </div>
  </div>
);

// ─── Analytics Tab ────────────────────────────────────────────────────────
const AnalyticsTab = ({ analytics }) => {
  if (!analytics) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500" /></div>;
  const { totals, usersByRole, jobsByStatus, applicationsByStatus, trends } = analytics;

  const appStatusSlices = [
    { colour: '#60a5fa', value: applicationsByStatus?.applied || 0 },
    { colour: '#facc15', value: applicationsByStatus?.under_review || 0 },
    { colour: '#a78bfa', value: applicationsByStatus?.interview || 0 },
    { colour: '#34d399', value: applicationsByStatus?.accepted || 0 },
    { colour: '#f87171', value: applicationsByStatus?.rejected || 0 },
  ].filter(s => s.value > 0);

  const userRoleSlices = [
    { colour: '#818cf8', value: usersByRole?.student || 0, label: 'Students' },
    { colour: '#fb7185', value: usersByRole?.recruiter || 0, label: 'Recruiters' },
    { colour: '#fbbf24', value: usersByRole?.admin || 0, label: 'Admins' },
  ].filter(s => s.value > 0);

  return (
    <div className="space-y-8">
      {/* Top stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users"   value={totals?.users}        icon="👥" gradient="from-purple-500 to-indigo-500" />
        <StatCard label="Total Jobs"    value={totals?.jobs}         icon="💼" gradient="from-blue-500 to-cyan-500" />
        <StatCard label="Applications"  value={totals?.applications} icon="📋" gradient="from-pink-500 to-rose-500" />
        <StatCard label="Notifications" value={totals?.notifications} icon="🔔" gradient="from-amber-500 to-orange-500" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users trend */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 col-span-1 lg:col-span-2">
          <h3 className="text-white font-bold mb-1">Activity (Last 7 Days)</h3>
          <p className="text-gray-500 text-xs mb-4">Daily signups, job posts, applications</p>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1"><span>New Users</span></div>
              <Sparkline data={trends?.users} colour="#a78bfa" height={36} />
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1"><span>Job Posts</span></div>
              <Sparkline data={trends?.jobs} colour="#60a5fa" height={36} />
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1"><span>Applications</span></div>
              <Sparkline data={trends?.applications} colour="#34d399" height={36} />
            </div>
          </div>
        </div>

        {/* Donut charts */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <h4 className="text-white font-bold text-sm mb-4">Users by Role</h4>
            <div className="flex items-center gap-4">
              <DonutChart slices={userRoleSlices} size={90} thickness={16} />
              <div className="space-y-1.5">
                {userRoleSlices.map(s => (
                  <div key={s.label} className="flex items-center gap-2 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.colour }} />
                    <span className="text-gray-400">{s.label}</span>
                    <span className="text-white font-bold ml-auto">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <h4 className="text-white font-bold text-sm mb-4">Jobs by Status</h4>
            <div className="space-y-2">
              {[
                { label: 'Pending', value: jobsByStatus?.pending, colour: 'bg-yellow-500' },
                { label: 'Approved', value: jobsByStatus?.approved, colour: 'bg-emerald-500' },
                { label: 'Rejected', value: jobsByStatus?.rejected, colour: 'bg-red-500' },
              ].map(s => {
                const total = (jobsByStatus?.pending || 0) + (jobsByStatus?.approved || 0) + (jobsByStatus?.rejected || 0) || 1;
                return (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{s.label}</span><span className="text-white font-bold">{s.value || 0}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${s.colour} rounded-full transition-all duration-700`} style={{ width: `${((s.value || 0) / total) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Application status breakdown */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <h3 className="text-white font-bold mb-4">Applications by Status</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { key: 'applied',      label: 'Applied',      colour: 'from-blue-500/20 to-blue-600/10 border-blue-500/20 text-blue-400' },
            { key: 'under_review', label: 'Under Review', colour: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/20 text-yellow-400' },
            { key: 'interview',    label: 'Interview',    colour: 'from-purple-500/20 to-purple-600/10 border-purple-500/20 text-purple-400' },
            { key: 'accepted',     label: 'Accepted',     colour: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/20 text-emerald-400' },
            { key: 'rejected',     label: 'Rejected',     colour: 'from-red-500/20 to-red-600/10 border-red-500/20 text-red-400' },
          ].map(s => (
            <div key={s.key} className={`rounded-xl border bg-gradient-to-br ${s.colour} p-4 text-center`}>
              <p className="text-2xl font-extrabold">{applicationsByStatus?.[s.key] || 0}</p>
              <p className="text-xs font-medium mt-1 opacity-80">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Users Tab ────────────────────────────────────────────────────────────
const ROLE_BADGE = {
  student:   'bg-blue-500/15 text-blue-400 border-blue-500/25',
  recruiter: 'bg-pink-500/15 text-pink-400 border-pink-500/25',
  admin:     'bg-amber-500/15 text-amber-400 border-amber-500/25',
};

const UsersTab = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editRole, setEditRole] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 15 };
      if (search) params.search = search;
      if (roleFilter) params.role = roleFilter;
      const res = await getUsers(params, token);
      setUsers(res.data);
      setTotal(res.total);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [token, page, search, roleFilter]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleUpdateRole = async (id) => {
    setActionLoading(id);
    try {
      await updateUser(id, { role: editRole }, token);
      setEditingId(null);
      fetchUsers();
    } catch (e) { console.error(e); }
    finally { setActionLoading(null); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this user? This cannot be undone.')) return;
    setActionLoading(id);
    try {
      await deleteUser(id, token);
      fetchUsers();
    } catch (e) { console.error(e); }
    finally { setActionLoading(null); }
  };

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        />
        <select
          value={roleFilter}
          onChange={e => { setRoleFilter(e.target.value); setPage(1); }}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        >
          <option value="">All Roles</option>
          <option value="student">Students</option>
          <option value="recruiter">Recruiters</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/3">
                <th className="text-left px-5 py-3.5 text-gray-400 font-semibold text-xs uppercase tracking-wider">User</th>
                <th className="text-left px-5 py-3.5 text-gray-400 font-semibold text-xs uppercase tracking-wider">Role</th>
                <th className="text-left px-5 py-3.5 text-gray-400 font-semibold text-xs uppercase tracking-wider">Joined</th>
                <th className="text-right px-5 py-3.5 text-gray-400 font-semibold text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={4} className="py-16 text-center text-gray-500">Loading…</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={4} className="py-16 text-center text-gray-500">No users found</td></tr>
              ) : users.map(u => (
                <tr key={u._id} className="hover:bg-white/3 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {u.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-medium">{u.name}</p>
                        <p className="text-gray-500 text-xs">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {editingId === u._id ? (
                      <select
                        value={editRole}
                        onChange={e => setEditRole(e.target.value)}
                        className="bg-[#1a1d24] border border-purple-500/50 rounded-lg px-2 py-1 text-white text-xs focus:outline-none"
                      >
                        <option value="student">Student</option>
                        <option value="recruiter">Recruiter</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border capitalize ${ROLE_BADGE[u.role] || ''}`}>
                        {u.role}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-xs">
                    {new Date(u.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {editingId === u._id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleUpdateRole(u._id)}
                          disabled={actionLoading === u._id}
                          className="px-3 py-1.5 text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/30 transition-colors font-semibold"
                        >Save</button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1.5 text-xs bg-white/5 text-gray-400 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                        >Cancel</button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => { setEditingId(u._id); setEditRole(u.role); }}
                          className="px-3 py-1.5 text-xs bg-white/5 text-gray-300 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                        >Edit Role</button>
                        <button
                          onClick={() => handleDelete(u._id)}
                          disabled={actionLoading === u._id}
                          className="px-3 py-1.5 text-xs bg-red-500/15 text-red-400 border border-red-500/25 rounded-lg hover:bg-red-500/25 transition-colors"
                        >Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>Showing {Math.min((page - 1) * 15 + 1, total)}–{Math.min(page * 15, total)} of {total}</span>
        <div className="flex gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 disabled:opacity-40 hover:bg-white/10 transition-colors">← Prev</button>
          <button onClick={() => setPage(p => p + 1)} disabled={page * 15 >= total}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 disabled:opacity-40 hover:bg-white/10 transition-colors">Next →</button>
        </div>
      </div>
    </div>
  );
};

// ─── Jobs Tab ─────────────────────────────────────────────────────────────
const JOB_STATUS_STYLE = {
  pending:  'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  approved: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  rejected: 'bg-red-500/15 text-red-400 border-red-500/25',
};

const JobsTab = ({ token }) => {
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = { status: statusFilter, page, limit: 10 };
      const res = await getAdminJobs(params, token);
      setJobs(res.data);
      setTotal(res.total);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [token, statusFilter, page]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const handleApprove = async (id) => {
    setActionLoading(id + '_approve');
    try { await approveJob(id, token); fetchJobs(); }
    catch (e) { console.error(e); }
    finally { setActionLoading(null); }
  };

  const handleReject = async (id) => {
    setActionLoading(id + '_reject');
    try { await rejectJob(id, token); fetchJobs(); }
    catch (e) { console.error(e); }
    finally { setActionLoading(null); }
  };

  return (
    <div className="space-y-5">
      {/* Status filter */}
      <div className="flex gap-2">
        {['pending', 'approved', 'rejected', 'all'].map(s => (
          <button
            key={s}
            onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border capitalize transition-all
              ${statusFilter === s
                ? 'bg-purple-500 border-purple-400 text-white shadow-lg shadow-purple-500/25'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'}`}
          >{s}</button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500" /></div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20 rounded-2xl bg-white/3 border border-white/10 text-gray-500">No jobs found for this filter.</div>
      ) : (
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job._id} className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col md:flex-row md:items-start gap-5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="text-white font-bold text-lg">{job.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border capitalize ${JOB_STATUS_STYLE[job.status]}`}>
                    {job.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-1">{job.company} &bull; {job.location}</p>
                {job.postedBy && (
                  <p className="text-gray-600 text-xs mb-3">
                    Posted by <span className="text-gray-400">{job.postedBy.name}</span> ({job.postedBy.email})
                  </p>
                )}
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {job.requirements?.slice(0, 5).map((r, i) => (
                    <span key={i} className="px-2 py-0.5 text-xs rounded bg-white/5 text-gray-400 border border-white/5">{r}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 shrink-0">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{job.applicantCount || 0}</p>
                  <p className="text-xs text-gray-500">applicants</p>
                </div>
                <p className="text-xs text-gray-600">
                  {new Date(job.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                {job.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(job._id)}
                      disabled={actionLoading === job._id + '_approve'}
                      className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 rounded-xl text-sm font-bold transition-colors disabled:opacity-50"
                    >
                      {actionLoading === job._id + '_approve' ? '…' : '✓ Approve'}
                    </button>
                    <button
                      onClick={() => handleReject(job._id)}
                      disabled={actionLoading === job._id + '_reject'}
                      className="px-4 py-2 bg-red-500/15 text-red-400 border border-red-500/25 hover:bg-red-500/25 rounded-xl text-sm font-bold transition-colors disabled:opacity-50"
                    >
                      {actionLoading === job._id + '_reject' ? '…' : '✕ Reject'}
                    </button>
                  </div>
                )}
                {job.status !== 'pending' && (
                  <span className="text-xs text-gray-600 italic">No actions needed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>{total} total</span>
        <div className="flex gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 disabled:opacity-40 hover:bg-white/10 transition-colors">← Prev</button>
          <button onClick={() => setPage(p => p + 1)} disabled={page * 10 >= total}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 disabled:opacity-40 hover:bg-white/10 transition-colors">Next →</button>
        </div>
      </div>
    </div>
  );
};

// ─── Main AdminPanel ───────────────────────────────────────────────────────
const TABS = [
  { key: 'analytics', label: 'Analytics',    icon: '📊' },
  { key: 'jobs',      label: 'Job Postings', icon: '💼' },
  { key: 'users',     label: 'Users',        icon: '👥' },
];

const AdminPanel = () => {
  const token = useSelector(s => s.auth.token);
  const location = useLocation();

  const getInitialTab = () => {
    if (location.pathname.includes('/users')) return 'users';
    if (location.pathname.includes('/jobs'))  return 'jobs';
    return 'analytics';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    if (!token) return;
    getAnalytics(token).then(res => setAnalytics(res.data)).catch(console.error);
  }, [token]);

  return (
    <div className="min-h-screen bg-[#0f1115] p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl text-xl">🛡️</div>
            <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
              Admin Panel
            </h1>
          </div>
          <p className="text-gray-400 text-base ml-14">Manage users, review job postings, and monitor platform health.</p>
        </header>

        {/* Quick stats strip */}
        {analytics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Pending Jobs', value: analytics.jobsByStatus?.pending || 0,   colour: 'text-yellow-400', urgent: analytics.jobsByStatus?.pending > 0 },
              { label: 'Total Users',  value: analytics.totals?.users || 0,          colour: 'text-purple-400', urgent: false },
              { label: 'Applications', value: analytics.totals?.applications || 0,    colour: 'text-blue-400',   urgent: false },
              { label: 'Accepted',     value: analytics.applicationsByStatus?.accepted || 0, colour: 'text-emerald-400', urgent: false },
            ].map(s => (
              <div key={s.label} className={`rounded-2xl bg-white/5 border ${s.urgent ? 'border-yellow-500/30' : 'border-white/10'} p-4 text-center`}>
                <p className={`text-2xl font-extrabold ${s.colour} mb-0.5`}>{s.value}</p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                {s.urgent && <p className="text-[10px] text-yellow-500 mt-1 animate-pulse">Needs attention</p>}
              </div>
            ))}
          </div>
        )}

        {/* Tab bar */}
        <div className="flex gap-2 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border whitespace-nowrap transition-all duration-200
                ${activeTab === t.key
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 border-purple-400 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/8'}`}
            >
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'analytics' && <AnalyticsTab analytics={analytics} />}
        {activeTab === 'users'     && <UsersTab token={token} />}
        {activeTab === 'jobs'      && <JobsTab token={token} />}

      </div>
    </div>
  );
};

export default AdminPanel;
