import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Search, FileText, ChevronRight, Key, TrendingUp, Briefcase } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-20">
        
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-brand-900 text-xs font-semibold tracking-wide uppercase border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              AI-Powered Campus Recruitment
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Smart Resume Analysis.<br/>
              <span className="text-brand-900">Smarter Job Matches.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              AI-powered feedback to land your dream campus placement. Optimized for students, loved by recruiters.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup" className="flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-xl text-white bg-brand-900 hover:bg-brand-800 shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-0.5">
                Get Started - It's Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="#jobs" className="flex items-center justify-center px-8 py-3.5 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-sm hover:shadow">
                Explore Jobs
              </a>
            </div>
            <div className="pt-4 flex items-center space-x-4 text-sm text-gray-500 font-medium">
              <span>TRUSTED BY 50+ UNIVERSITIES</span>
            </div>
          </div>

          <div className="relative lg:ml-10">
            {/* Main Image Mockup */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 transform lg:rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Students collaborating" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating UI Element */}
            <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 flex items-start space-x-4 animate-bounce-slow" style={{ animationDuration: '3s' }}>
              <div className="bg-green-50 p-2 rounded-full mt-1">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase mb-1">RESUME SCORE</p>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold text-gray-900">85</span>
                  <span className="text-sm font-medium text-gray-500">/100</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Top 5% in your branch</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Opportunities Section */}
        <section id="jobs" className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Trending Opportunities</h2>
                <p className="text-gray-500 text-lg">Recommended based on your profile skills and academic performance.</p>
              </div>
              <Link to="/signup" className="hidden sm:flex items-center text-brand-900 font-medium hover:text-brand-700 transition">
                View All Openings
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Job Card 1 */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    98% Match
                  </span>
                </div>
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center mb-6">
                  <div className="text-blue-600 font-bold text-xl">TC</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-brand-900 transition-colors">Software Engineer Intern</h3>
                <p className="text-brand-700 font-medium text-sm mb-4">TechCorp</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-8">
                  <span className="flex items-center"><Search className="h-4 w-4 mr-1.5" /> Bangalore, IN</span>
                  <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1.5" /> Full-time</span>
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-400">Posted 2d ago</span>
                  <Link to="/signup" className="px-4 py-2 bg-brand-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details
                  </Link>
                </div>
              </div>

              {/* Job Card 2 */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                    85% Match
                  </span>
                </div>
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center mb-6">
                  <div className="text-indigo-600 font-bold text-xl">F.io</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-brand-900 transition-colors">Product Analyst</h3>
                <p className="text-brand-700 font-medium text-sm mb-4">Fintech.io</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-8">
                  <span className="flex items-center"><Search className="h-4 w-4 mr-1.5" /> Remote</span>
                  <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1.5" /> Internship</span>
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-400">Posted 5h ago</span>
                  <Link to="/signup" className="px-4 py-2 bg-brand-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details
                  </Link>
                </div>
              </div>

              {/* Job Card 3 */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    79% Match
                  </span>
                </div>
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center mb-6">
                  <div className="text-teal-600 font-bold text-xl">GC</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-brand-900 transition-colors">Graduate Trainee</h3>
                <p className="text-brand-700 font-medium text-sm mb-4">GlobalConsult</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-8">
                  <span className="flex items-center"><Search className="h-4 w-4 mr-1.5" /> Mumbai, IN</span>
                  <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1.5" /> Full-time</span>
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-400">Posted 1w ago</span>
                  <Link to="/signup" className="px-4 py-2 bg-brand-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center sm:hidden">
              <Link to="/signup" className="inline-flex items-center text-brand-900 font-medium">
                View All Openings <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* AI Feedback Banner Section */}
        <section id="resume" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-brand-900 rounded-3xl overflow-hidden shadow-2xl relative">
            {/* Background decorative blob */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
              <div className="absolute -top-[50%] -right-[10%] w-[80%] h-[150%] rounded-full bg-gradient-to-b from-white/20 to-transparent blur-3xl"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 lg:p-20 relative z-10">
              <div className="text-white space-y-8">
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight">Get Instant AI Feedback on your Resume</h2>
                <p className="text-blue-100 text-lg leading-relaxed max-w-md">
                  Upload your resume and get an immediate breakdown of missing keywords, formatting errors, and actionable tips to boost your shortlist chances by up to 40%.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center text-blue-50">
                    <CheckCircle2 className="h-6 w-6 text-blue-300 mr-3 shrink-0" />
                    ATS-optimization score
                  </li>
                  <li className="flex items-center text-blue-50">
                    <CheckCircle2 className="h-6 w-6 text-blue-300 mr-3 shrink-0" />
                    Branch-specific keyword analysis
                  </li>
                  <li className="flex items-center text-blue-50">
                    <CheckCircle2 className="h-6 w-6 text-blue-300 mr-3 shrink-0" />
                    One-click profile parsing
                  </li>
                </ul>
                <div className="pt-4">
                  <Link to="/signup" className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-xl text-brand-900 bg-white hover:bg-gray-50 transition-colors shadow-lg">
                    Analyze My Resume
                  </Link>
                </div>
              </div>
              
              <div className="hidden lg:block relative">
                {/* Floating Mockup inside Blue section */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                    <div className="flex items-center space-x-2 text-gray-900 font-bold">
                      <div className="w-6 h-6 rounded bg-brand-100 text-brand-900 flex-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7L12 12L22 7L12 2Z"></path></svg>
                      </div>
                      <span>AI Suggestions</span>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">Processing...</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <p className="text-sm font-semibold text-brand-900 mb-1">Impact Check</p>
                      <p className="text-xs text-gray-600">"Managed database" is weak. Try: "Optimized SQL queries reducing response time by 30%."</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Missing Keywords</p>
                      <p className="text-xs text-gray-600">Consider adding: React.js, CI/CD, Agile Methodology.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Career Success Tips */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-3">Career Success Tips</h2>
              <p className="text-3xl font-bold text-gray-900">Master the art of campus placements with our expert-curated guides.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-brand-900 flex-center mb-6">
                  <Key className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Optimize for Keywords</h3>
                <p className="text-gray-500 leading-relaxed">
                  Include specific skills mentioned in job descriptions to pass through automated ATS filters effortlessly.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex-center mb-6">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Highlight Impact</h3>
                <p className="text-gray-500 leading-relaxed">
                  Don't just list duties. Use numbers and metrics to show the real-world value of your projects and internships.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex-center mb-6">
                  <FileText className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Keep it to One Page</h3>
                <p className="text-gray-500 leading-relaxed">
                  As a student, a concise one-page resume is professional and ensures recruiters find your best work quickly.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
