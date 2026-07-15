import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center cursor-pointer mb-4">
              <div className="text-brand-900 mr-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-bold text-lg text-gray-900 tracking-tight">CareerGenie</span>
            </div>
            <p className="text-sm text-gray-500 mb-4 pr-4">
              Empowering campus careers through intelligent resume analysis and curated matching.
            </p>
            <div className="flex space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex-center text-brand-900 cursor-pointer hover:bg-brand-100 transition">
                {/* dummy icon */}
                <span className="font-bold text-sm">in</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-50 flex-center text-brand-900 cursor-pointer hover:bg-brand-100 transition">
                <span className="font-bold text-sm">X</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">PLATFORM</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand-900 transition">Find Jobs</a></li>
              <li><a href="#" className="hover:text-brand-900 transition">Resume Analyzer</a></li>
              <li><a href="#" className="hover:text-brand-900 transition">For Recruiters</a></li>
              <li><a href="#" className="hover:text-brand-900 transition">Admin Portal</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">COMPANY</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand-900 transition">About Us</a></li>
              <li><a href="#" className="hover:text-brand-900 transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-brand-900 transition">Careers</a></li>
              <li><a href="#" className="hover:text-brand-900 transition">Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">NEWSLETTER</h3>
            <p className="text-sm text-gray-500 mb-4">
              Stay updated on the latest placement trends.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-sm"
              />
              <button className="bg-brand-900 text-white px-4 py-2 rounded-r-lg hover:bg-brand-800 transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2024 CareerGenie. Empowering campus careers.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-900 transition">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
