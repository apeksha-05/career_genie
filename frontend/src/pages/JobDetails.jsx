import React from 'react';
import { useParams, Link } from 'react-router-dom';
import TopHeader from '../components/TopHeader';
import { Bookmark, Share2, Calendar, CheckCircle2, Code, Users, Beaker, Lightbulb } from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <TopHeader showNav={true} />

      <main className="flex-1 pb-20 pt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start justify-between mb-8">
            <div className="flex items-start">
              <div className="w-20 h-20 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mr-6 shadow-sm overflow-hidden shrink-0">
                <img src="https://logo.clearbit.com/techcorp.com" onError={(e) => { e.target.onerror = null; e.target.src = 'https://ui-avatars.com/api/?name=TC&background=0F4CBA&color=fff'; }} alt="TechCorp" className="w-12 h-12 object-contain" />
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="bg-blue-100 text-brand-900 text-xs font-bold px-2.5 py-1 rounded-full">Full-time Internship</span>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">Active</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Software Engineering Intern</h1>
                <p className="text-lg text-gray-600 font-medium">TechCorp <span className="mx-2">•</span> Palo Alto, CA (Remote Friendly)</p>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6 md:mt-0">
              <button className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:text-brand-900 hover:border-brand-300 transition-colors shadow-sm">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:text-brand-900 hover:border-brand-300 transition-colors shadow-sm">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* About the Role */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About the Role</h2>
                <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
                  <p className="mb-4">
                    Join TechCorp's engineering team this summer to build the future of cloud-scale infrastructure. 
                    As a Software Engineering Intern, you won't just be fetching coffee; you'll be shipping 
                    production code that impacts millions of users worldwide. You'll work alongside senior 
                    mentors in an agile environment, participating in daily stand-ups, code reviews, and 
                    architectural deep-dives.
                  </p>
                  <p>
                    We are looking for ambitious students who are passionate about solving complex distributed 
                    systems problems. At TechCorp, we value curiosity, clean code, and collaborative problem-solving. 
                    This is a high-growth opportunity where your contributions will be valued and your 
                    professional development prioritized.
                  </p>
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Requirements</h2>
                <ul className="space-y-4">
                  {[
                    "Currently pursuing a BS/MS in Computer Science or a related technical field.",
                    "Strong foundational knowledge in Data Structures, Algorithms, and System Design.",
                    "Proficiency in at least one modern programming language such as Python, Java, or C++.",
                    "Familiarity with modern web technologies, specifically React and Node.js.",
                    "Excellent problem-solving skills and the ability to thrive in a fast-paced team environment.",
                    "Previous internship experience or high-quality personal projects are a major plus."
                  ].map((req, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-6 h-6 text-brand-900 mr-3 shrink-0" />
                      <span className="text-gray-700 leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What You'll Do */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">What You'll Do</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-brand-900 shrink-0 mr-4">
                      <Code className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Feature Dev</h3>
                      <p className="text-sm text-gray-600">Develop and maintain scalable backend services and APIs.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-brand-900 shrink-0 mr-4">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Collaboration</h3>
                      <p className="text-sm text-gray-600">Collaborate with designers and product managers to define specs.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-brand-900 shrink-0 mr-4">
                      <Beaker className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">QA & Testing</h3>
                      <p className="text-sm text-gray-600">Write unit, integration, and end-to-end tests for reliability.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-brand-900 shrink-0 mr-4">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Mentorship</h3>
                      <p className="text-sm text-gray-600">Participate in technical design sessions and peer reviews.</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Right Column - Sidebar Widgets */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Apply Widget */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <button className="w-full bg-brand-900 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-brand-500/30 hover:bg-brand-800 transition-colors mb-4">
                  Apply Now
                </button>
                <div className="flex items-center justify-center text-sm text-gray-500 font-medium mb-6">
                  <Calendar className="w-4 h-4 mr-2" /> Apply by Oct 30, 2024
                </div>
                
                <div className="space-y-4 border-t border-gray-100 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Job ID</span>
                    <span className="text-gray-900 font-medium text-sm">TC-ENG-2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Experience</span>
                    <span className="text-gray-900 font-medium text-sm">Internship</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Location</span>
                    <span className="text-gray-900 font-medium text-sm">Palo Alto / Remote</span>
                  </div>
                </div>
              </div>

              {/* Compatibility Score */}
              <div className="bg-blue-50/50 rounded-3xl p-6 border border-blue-100 shadow-sm">
                <div className="flex items-center mb-6">
                  <svg className="w-5 h-5 text-brand-900 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <h3 className="font-bold text-brand-900 text-lg">Compatibility Score</h3>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="relative w-20 h-20 mr-4 shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="#dbeafe" strokeWidth="8" />
                      <circle 
                        cx="40" 
                        cy="40" 
                        r="34" 
                        fill="none" 
                        stroke="#0F4CBA" 
                        strokeWidth="8" 
                        strokeDasharray="213.6" 
                        strokeDashoffset={213.6 - (213.6 * 98) / 100}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-extrabold text-brand-900">98%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Excellent Match</h4>
                    <p className="text-sm text-gray-500">Top 1% of applicants</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Matching Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-brand-900 text-xs font-bold px-2.5 py-1 rounded">Python</span>
                    <span className="bg-blue-100 text-brand-900 text-xs font-bold px-2.5 py-1 rounded">React</span>
                    <span className="bg-blue-100 text-brand-900 text-xs font-bold px-2.5 py-1 rounded">Data Structures</span>
                    <span className="bg-blue-100 text-brand-900 text-xs font-bold px-2.5 py-1 rounded">Git</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-blue-100 text-sm italic text-gray-600">
                  "Your background in React and successful projects in Python align perfectly with this role's specific technical requirements."
                </div>
              </div>

              {/* Hiring Team */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Hiring Team</h3>
                <div className="flex items-center">
                  <img src="https://i.pravatar.cc/150?u=a042581f4" alt="Sarah Mitchell" className="w-12 h-12 rounded-full object-cover mr-4 border border-gray-200" />
                  <div>
                    <h4 className="font-bold text-gray-900">Sarah Mitchell</h4>
                    <p className="text-xs text-gray-500">Senior Technical Recruiter</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 py-8 border-t border-gray-200 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-brand-900 text-lg mr-2">CareerGenie</span>
            <span className="text-gray-500">© 2024 CareerGenie. Empowering Campus Futures.</span>
          </div>
          <div className="flex space-x-6 text-gray-500 font-medium">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Terms of Service</a>
            <a href="#" className="hover:text-gray-900">Contact Support</a>
            <a href="#" className="hover:text-gray-900">Accessibility</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default JobDetails;
