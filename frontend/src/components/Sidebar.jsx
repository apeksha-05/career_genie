import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  BarChart3, 
  Settings, 
  FileText, 
  CheckSquare, 
  HelpCircle, 
  LogOut,
  Rocket,
  Shield,
  Download
} from 'lucide-react';

const Sidebar = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getLinks = () => {
    switch (role) {
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
          { name: 'Students', path: '/admin/users', icon: Users },
          { name: 'Recruiters', path: '/admin/recruiters', icon: Briefcase },
          { name: 'Job Postings', path: '/admin/jobs', icon: FileText },
          { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
          { name: 'System Logs', path: '/admin/logs', icon: Shield },
        ];
      case 'recruiter':
        return [
          { name: 'Dashboard', path: '/dashboard/recruiter', icon: LayoutDashboard },
          { name: 'My Postings', path: '/dashboard/recruiter/jobs', icon: FileText },
          { name: 'Applicants', path: '/dashboard/recruiter/applicants', icon: Users },
          { name: 'Analytics', path: '/dashboard/recruiter/analytics', icon: BarChart3 },
        ];
      case 'student':
      default:
        return [
          { name: 'Dashboard', path: '/dashboard/student', icon: LayoutDashboard },
          { name: 'Resume', path: '/dashboard/student/resume', icon: FileText },
          { name: 'Jobs', path: '/dashboard/student/jobs', icon: Briefcase },
          { name: 'Applications', path: '/dashboard/student/applications', icon: CheckSquare },
        ];
    }
  };

  const links = getLinks();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col min-h-screen">
      {/* Header / Logo */}
      <div className="h-20 flex items-center px-6 border-b border-gray-50 mb-4">
        {role === 'admin' ? (
          <div className="flex items-center space-x-2">
            <div className="bg-brand-900 p-1.5 rounded-lg text-white">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">CareerGenie</h1>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Admin Terminal</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
             <Rocket className="w-6 h-6 text-brand-900" />
             <h1 className="text-xl font-bold text-gray-900">CareerGenie</h1>
          </div>
        )}
      </div>

      <div className="px-6 mb-2">
        <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">General</h3>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.path === '/admin' || link.path === '/dashboard/recruiter' || link.path === '/dashboard/student'}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                  ? 'bg-brand-900 text-white shadow-md shadow-brand-500/20'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <link.icon className="w-5 h-5 mr-3" />
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        {role === 'admin' && (
          <button className="w-full flex items-center justify-center px-4 py-3 mb-4 bg-brand-900 text-white rounded-xl font-medium hover:bg-brand-800 transition-colors shadow-sm">
             <Download className="w-4 h-4 mr-2" />
             Generate Report
          </button>
        )}
        
        {role === 'student' && (
          <div className="bg-blue-50 border border-brand-100 rounded-xl p-4 mb-4">
            <h4 className="font-bold text-brand-900 text-sm mb-1">Pro Plan</h4>
            <p className="text-xs text-gray-600 mb-3">Unlock AI resume rewriting & premium job matches.</p>
            <button className="w-full bg-brand-900 text-white text-xs font-bold py-2 rounded-lg hover:bg-brand-800 transition-colors">
              Upgrade Now
            </button>
          </div>
        )}

        <div className="space-y-1">
          {role === 'admin' ? (
            <>
              <button onClick={() => navigate('/support')} className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
                <HelpCircle className="w-5 h-5 mr-3 text-gray-400" />
                Support
              </button>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex items-center px-4 py-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors border-t border-gray-50 mt-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-3">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Profile</p>
              </div>
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-500">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
