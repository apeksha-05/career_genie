import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import NotificationBell from './NotificationBell';

const NAV_LINKS = {
  student: [
    { label: 'Jobs',         to: '/dashboard/student/jobs' },
    { label: 'Applications', to: '/dashboard/student/applications' },
  ],
  recruiter: [
    { label: 'Dashboard', to: '/dashboard/recruiter' },
    { label: 'Post Job',  to: '/dashboard/recruiter/jobs/new' },
  ],
  admin: [
    { label: 'Analytics', to: '/admin' },
    { label: 'Users',     to: '/admin/users' },
    { label: 'Jobs',      to: '/admin/jobs' },
  ],
};

const AppShell = ({ children }) => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const location  = useLocation();
  const user      = useSelector(s => s.auth.user);
  const role      = user?.role || 'student';

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const links = NAV_LINKS[role] || [];

  return (
    <div className="min-h-screen bg-[#0f1115] flex flex-col">
      {/* Top navigation bar */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#0f1115]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Career<span className="text-white">Genie</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ label, to }) => {
              const active = location.pathname === to || location.pathname.startsWith(to + '/');
              return (
                <Link
                  key={to}
                  to={to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${active
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right side — bell + user */}
          <div className="flex items-center gap-3">
            <NotificationBell />

            <div className="flex items-center gap-2 pl-3 border-l border-white/10">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-white leading-none">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize mt-0.5">{role}</p>
              </div>

              {/* Avatar circle */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {user?.name?.charAt(0)?.toUpperCase() || '?'}
              </div>

              <button
                onClick={handleLogout}
                className="ml-2 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Sign out"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden border-t border-white/5 px-4 pb-2 flex gap-2 overflow-x-auto">
          {links.map(({ label, to }) => {
            const active = location.pathname === to || location.pathname.startsWith(to + '/');
            return (
              <Link
                key={to}
                to={to}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all
                  ${active ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default AppShell;
