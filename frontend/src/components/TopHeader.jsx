import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopHeader = ({ showNav = false, customRightItem = null }) => {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
      
      {/* Left section - Nav Links */}
      <div className="flex-1 flex items-center">
        {showNav && (
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard/student/jobs" className="text-sm font-bold text-brand-900 border-b-2 border-brand-900 pb-1">Jobs</Link>
            <Link to="/resume-tips" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors pb-1">Resume Tips</Link>
            <Link to="/companies" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors pb-1">Companies</Link>
            <Link to="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors pb-1">Profile</Link>
          </nav>
        )}
      </div>

      {/* Right section - Search and Actions */}
      <div className="flex-1 flex items-center justify-end space-x-6">
        {customRightItem ? (
          customRightItem
        ) : (
          <>
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search internships..."
                className="pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent w-64 transition-all"
              />
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-4 text-gray-400">
              <button className="hover:text-gray-600 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
              <button className="hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              
              {/* Avatar */}
              <div className="ml-2 w-8 h-8 rounded-full overflow-hidden border border-gray-200 cursor-pointer">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" className="w-full h-full object-cover" />
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default TopHeader;
