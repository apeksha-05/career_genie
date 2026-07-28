import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getNotifications,
  markRead as apiMarkRead,
  markAllRead as apiMarkAllRead,
} from '../api/notifications';

// Icon map per notification type
const TYPE_ICON = {
  new_job_match: { icon: '💼', colour: 'bg-blue-50 text-blue-600' },
  status_change: { icon: '📋', colour: 'bg-purple-50 text-purple-600' },
  job_approved:  { icon: '✅', colour: 'bg-emerald-50 text-emerald-600' },
  new_applicant: { icon: '👤', colour: 'bg-pink-50 text-pink-600' },
};

const POLL_INTERVAL_MS = 30_000; // poll every 30 s for V1

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const NotificationBell = () => {
  const token    = useSelector(s => s.auth.token);
  const isAuthed = useSelector(s => s.auth.isAuthenticated);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount,   setUnreadCount]   = useState(0);
  const [open,          setOpen]          = useState(false);
  const [loading,       setLoading]       = useState(false);
  const dropdownRef = useRef(null);
  const timerRef    = useRef(null);

  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    try {
      const res = await getNotifications(token);
      setNotifications(res.data);
      setUnreadCount(res.unreadCount);
    } catch (_) { /* silent */ }
  }, [token]);

  // Initial fetch + polling
  useEffect(() => {
    if (!isAuthed) return;
    setLoading(true);
    fetchNotifications().finally(() => setLoading(false));
    timerRef.current = setInterval(fetchNotifications, POLL_INTERVAL_MS);
    return () => clearInterval(timerRef.current);
  }, [isAuthed, fetchNotifications]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleOpen = () => {
    setOpen(prev => !prev);
    if (!open) fetchNotifications(); // refresh on open
  };

  const handleMarkRead = async (n) => {
    if (!n.read) {
      await apiMarkRead(n._id, token);
      setNotifications(prev => prev.map(x => x._id === n._id ? { ...x, read: true } : x));
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    if (n.link) {
      setOpen(false);
      navigate(n.link);
    }
  };

  const handleMarkAllRead = async () => {
    await apiMarkAllRead(token);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  if (!isAuthed) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell button */}
      <button
        id="notification-bell"
        onClick={handleOpen}
        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors"
        aria-label="Notifications"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>

        {/* Unread badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-brand-900 text-[10px] font-bold text-white shadow-sm">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-12 w-80 sm:w-96 rounded-2xl bg-white border border-gray-200 shadow-xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <p className="text-xs text-gray-500 mt-0.5">{unreadCount} unread</p>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-brand-900 hover:text-brand-800 transition-colors font-medium"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notification list */}
          <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-900" />
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-10 px-4">
                <p className="text-3xl mb-2">🔔</p>
                <p className="text-gray-500 text-sm">No notifications yet</p>
              </div>
            ) : (
              notifications.map(n => {
                const cfg = TYPE_ICON[n.type] || { icon: '📌', colour: 'bg-gray-100 text-gray-500' };
                return (
                  <button
                    key={n._id}
                    onClick={() => handleMarkRead(n)}
                    className={`w-full text-left px-5 py-4 flex gap-3 hover:bg-gray-50 transition-colors group ${!n.read ? 'bg-blue-50/50' : ''}`}
                  >
                    {/* Icon */}
                    <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-base ${cfg.colour}`}>
                      {cfg.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-snug ${!n.read ? 'text-gray-900 font-semibold' : 'text-gray-700'} line-clamp-1`}>
                        {n.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                        {n.body}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1">{timeAgo(n.createdAt)}</p>
                    </div>

                    {/* Unread dot */}
                    {!n.read && (
                      <div className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-brand-900" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-5 py-3 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">Refreshes every 30 seconds</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
