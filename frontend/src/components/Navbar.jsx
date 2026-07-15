import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <div className="text-brand-900 mr-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">CareerGenie</span>
          </div>

          {/* Center Nav Links */}
          <div className="hidden md:flex space-x-10">
            <a href="#jobs" className="text-gray-600 hover:text-brand-900 font-medium transition-colors">Jobs</a>
            <a href="#resume" className="text-gray-600 hover:text-brand-900 font-medium transition-colors">Resume Tips</a>
            <a href="#companies" className="text-gray-600 hover:text-brand-900 font-medium transition-colors">Companies</a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            <Link to="/login" className="text-brand-900 font-medium hover:text-brand-700 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="bg-brand-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-brand-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
