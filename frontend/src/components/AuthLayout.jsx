import React from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[700px]">
        {/* Left Side - Branding */}
        <div className="w-full md:w-1/2 bg-brand-900 p-12 text-white flex flex-col justify-center relative overflow-hidden hidden md:flex">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>
          
          <div className="relative z-10 max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-white rounded-2xl mx-auto flex items-center justify-center mb-10 shadow-lg">
               <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-brand-900">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed mb-12">
              {subtitle}
            </p>
            
            {/* Match Score Mock */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-left relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 left-0 w-1 bg-green-400 h-full"></div>
               <div className="flex justify-between items-center mb-4">
                 <span className="font-semibold text-white">Match Score</span>
                 <span className="bg-green-500/20 text-green-300 px-2.5 py-1 rounded-md text-xs font-bold border border-green-500/30">85% High Match</span>
               </div>
               <div className="w-full bg-white/10 rounded-full h-1.5 mb-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-400 to-green-300 h-1.5 rounded-full" style={{ width: '85%' }}></div>
               </div>
               <p className="text-sm text-blue-50 italic">
                 "Your Python and Machine Learning skills align perfectly with this role."
               </p>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-12 flex items-center text-blue-200 text-sm font-medium">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
               <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
             </svg>
             Trusted by 500+ campus career centers.
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
