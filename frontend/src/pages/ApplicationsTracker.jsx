import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import { MoreHorizontal, Filter, RefreshCw, Briefcase, Video, Trophy, Paperclip, Calendar } from 'lucide-react';
import TopHeader from '../components/TopHeader';
import { useSelector } from 'react-redux';
import { getMyApplications } from '../api/applications';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import Button from '../components/ui/Button';

const STATUS_MAP = {
  applied:      'Applied',
  under_review: 'Under Review',
  interview:    'Interview',
  accepted:     'Accepted',
  rejected:     'Rejected',
};

const ApplicationsTracker = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const fetchApplications = useCallback(async (silent = false) => {
    if (!token) return;
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError(null);
    try {
      const res = await getMyApplications(token);
      const mapped = (res.data || []).map(app => ({
        id: app._id,
        title: app.jobId?.title || 'Unknown Job',
        company: app.jobId?.company || '',
        date: new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        match: `${app.matchPercentage ?? 0}%`,
        status: STATUS_MAP[app.status] || app.status,
        rawStatus: app.status,
        icon: Briefcase,
      }));
      setApps(mapped);
    } catch (err) {
      setError(err.message || 'Failed to load applications.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token]);

  useEffect(() => { fetchApplications(); }, [fetchApplications]);

  const getColumnColor = (status) => {
    switch(status) {
      case 'Applied':      return 'bg-gray-400';
      case 'Under Review': return 'bg-yellow-400';
      case 'Interview':    return 'bg-blue-500';
      case 'Accepted':     return 'bg-green-500';
      case 'Rejected':     return 'bg-red-400';
      default:             return 'bg-gray-400';
    }
  };

  const getBorderColor = (status) => {
    switch(status) {
      case 'Applied':      return 'border-gray-200';
      case 'Under Review': return 'border-yellow-400';
      case 'Interview':    return 'border-blue-500';
      case 'Accepted':     return 'border-green-500';
      case 'Rejected':     return 'border-red-400';
      default:             return 'border-gray-200';
    }
  };

  const columns = ['Applied', 'Under Review', 'Interview', 'Accepted', 'Rejected'];

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar role="student" />

      <main className="flex-1 overflow-x-hidden flex flex-col h-screen">
        <TopHeader showNav={true} />

        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Application Tracker</h2>
              <p className="text-gray-500 text-sm max-w-xl">
                Monitor your professional journey. Manage your pipeline and track interview stages to keep your career momentum moving forward.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                id="refresh-applications-btn"
                onClick={() => fetchApplications(true)}
                disabled={refreshing}
                title="Refresh to see latest status updates"
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-900" />
            </div>
          ) : error ? (
            <ErrorState 
              title="Failed to load tracking data"
              message={error}
              onRetry={() => window.location.reload()}
            />
          ) : apps.length === 0 ? (
            <EmptyState 
              icon={Briefcase}
              title="No applications yet"
              description="You haven't applied to any jobs yet. Start exploring jobs to begin your career journey!"
              action={<Button variant="solid" onClick={() => window.location.href = '/dashboard/student/jobs'}>Find Jobs</Button>}
            />
          ) : (
          <div className="flex space-x-6 overflow-x-auto pb-8 snap-x">
            {columns.map(col => {
              const colApps = apps.filter(a => a.status === col);
              return (
                <div key={col} className="w-80 flex-shrink-0 snap-start">
                  <div className="flex items-center justify-between mb-4 px-1">
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${getColumnColor(col)}`}></span>
                      <h3 className="font-bold text-gray-900 text-lg mr-2">{col}</h3>
                      <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{colApps.length}</span>
                    </div>
                    <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </div>

                  <div className="space-y-4">
                    {colApps.length === 0 ? (
                      <div className="text-center py-10 text-gray-400 text-sm">No applications</div>
                    ) : colApps.map(app => (
                      <div key={app.id} className={`bg-white rounded-xl p-5 shadow-sm border-l-4 border-y border-r border-gray-100 ${getBorderColor(app.status)} hover:shadow-md transition-shadow cursor-pointer group`}>
                        <div className="flex justify-between items-start mb-4">
                          <div className={`w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600`}>
                            <app.icon className="w-5 h-5" />
                          </div>
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                            {app.match} Match
                          </span>
                        </div>

                        <h4 className="font-bold text-gray-900 text-base mb-1">{app.title}</h4>
                        <p className="text-sm text-gray-500 mb-4">{app.company}</p>

                        {app.nextStep && (
                          <div className="bg-blue-50 rounded-lg p-3 mb-4 flex items-start">
                            <Video className="w-4 h-4 text-brand-900 mr-2 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-bold text-brand-900">{app.nextStep}</p>
                              <p className="text-xs text-gray-500">{app.nextDate}</p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                          <div className="flex items-center">
                            <Calendar className="w-3.5 h-3.5 mr-1.5" />
                            {app.date}
                          </div>
                          {app.status === 'Applied' && <Paperclip className="w-4 h-4" />}
                          {app.status === 'Accepted' && <Trophy className="w-4 h-4 text-yellow-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ApplicationsTracker;

