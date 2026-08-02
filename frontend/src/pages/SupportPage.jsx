import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, BookOpen, MessageSquare, FileText, Zap, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const categories = [
  {
    id: 'getting-started',
    icon: <Zap className="w-5 h-5" />,
    color: 'bg-blue-50 text-brand-900',
    label: 'Getting Started',
    faqs: [
      { q: 'How do I create a CareerGenie account?', a: 'Click "Sign Up" on the homepage, choose your role (Student or Recruiter), fill in your details, and verify your email. The whole process takes under 2 minutes.' },
      { q: 'Is CareerGenie free for students?', a: 'Yes — CareerGenie is completely free for students. All features including resume analysis, job matching, and application tracking are included at no cost.' },
      { q: 'What roles can I sign up as?', a: 'You can sign up as a Student, Recruiter, or Administrator. Each role has a dedicated dashboard tailored to your needs.' },
    ],
  },
  {
    id: 'resume',
    icon: <FileText className="w-5 h-5" />,
    color: 'bg-purple-50 text-purple-600',
    label: 'Resume & AI Analysis',
    faqs: [
      { q: 'How does the AI Resume Analyzer work?', a: 'Upload your resume (PDF or DOCX). Our AI engine parses it, checks for ATS compliance, identifies missing keywords for your target roles, and gives you an actionable improvement score out of 100.' },
      { q: 'What file formats are supported for resume upload?', a: 'We support PDF and Microsoft Word (.docx) formats. PDF is recommended for best parsing accuracy.' },
      { q: 'How long does the analysis take?', a: 'Resume analysis is completed within 10–15 seconds after upload. Results are instant and displayed directly in your dashboard.' },
      { q: 'Can I upload multiple resume versions?', a: 'Yes. You can maintain multiple resume versions for different roles (e.g., a tech resume and a product resume) and compare their scores.' },
    ],
  },
  {
    id: 'jobs',
    icon: <BookOpen className="w-5 h-5" />,
    color: 'bg-green-50 text-green-600',
    label: 'Jobs & Applications',
    faqs: [
      { q: 'How are job matches calculated?', a: 'Our matching algorithm compares your resume skills, CGPA, branch, and past experience against job requirements. Each job gets a percentage match score.' },
      { q: 'Can I apply to jobs directly through CareerGenie?', a: 'Yes. For partnered companies, you can apply in one click using your CareerGenie profile. Your resume and details are sent directly to the recruiter.' },
      { q: 'How do I track my applications?', a: 'Your Applications Tracker (under the student dashboard) shows the real-time status of every application — Applied, Under Review, Interview Scheduled, Offered, or Rejected.' },
      { q: 'Can I save jobs to apply later?', a: 'Yes. Use the bookmark icon on any job card to save it to your wishlist. Saved jobs are accessible from your dashboard sidebar.' },
    ],
  },
  {
    id: 'account',
    icon: <MessageSquare className="w-5 h-5" />,
    color: 'bg-yellow-50 text-yellow-600',
    label: 'Account & Privacy',
    faqs: [
      { q: 'How do I reset my password?', a: 'On the Login page, click "Forgot password?" and enter your registered email. You\'ll receive a reset link within 5 minutes.' },
      { q: 'Can I change my role after signing up?', a: 'Role changes are not supported directly. Please contact support at students@careergenie.in if you need your role updated.' },
      { q: 'How do I delete my account?', a: 'Go to Settings > Account > Delete Account. Account deletion is permanent and removes all your data from our systems within 30 days.' },
      { q: 'Is my resume data shared with third parties?', a: 'No. Your resume data is only shared with recruiters you explicitly apply to. We never sell or share your data without consent. See our Privacy Policy for full details.' },
    ],
  },
];

const SupportPage = () => {
  const [openItem, setOpenItem] = useState(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = categories
    .filter(cat => activeCategory === 'all' || cat.id === activeCategory)
    .map(cat => ({
      ...cat,
      faqs: cat.faqs.filter(
        faq =>
          search === '' ||
          faq.q.toLowerCase().includes(search.toLowerCase()) ||
          faq.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(cat => cat.faqs.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero */}
        <section className="bg-brand-900 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
              How can we help?
            </h1>
            <p className="text-blue-200 mb-8">Search for answers or browse by category below.</p>
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-0 bg-white shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>
        </section>

        {/* Category Filter + FAQs */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeCategory === 'all' ? 'bg-brand-900 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-brand-500'}`}
              >
                All Topics
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition ${activeCategory === cat.id ? 'bg-brand-900 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-brand-500'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* FAQ Sections */}
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p className="text-lg">No results found for "{search}"</p>
                <p className="text-sm mt-2">Try a different keyword or <Link to="/contact" className="text-brand-900 font-semibold hover:underline">contact us</Link>.</p>
              </div>
            ) : (
              <div className="space-y-10">
                {filtered.map(cat => (
                  <div key={cat.id}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-9 h-9 ${cat.color} rounded-lg flex-center`}>{cat.icon}</div>
                      <h2 className="text-lg font-bold text-gray-900">{cat.label}</h2>
                    </div>

                    <div className="space-y-3">
                      {cat.faqs.map((faq, i) => {
                        const key = `${cat.id}-${i}`;
                        return (
                          <div key={key} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                            <button
                              className="w-full flex items-center justify-between p-5 text-left"
                              onClick={() => setOpenItem(openItem === key ? null : key)}
                            >
                              <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                              <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${openItem === key ? 'rotate-180' : ''}`} />
                            </button>
                            {openItem === key && (
                              <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                                {faq.a}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Still Need Help */}
        <section className="py-16 px-4 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Still need help?</h2>
            <p className="text-gray-500 mb-8">Our support team is available Mon–Fri and responds within 4 hours.</p>
            <Link
              to="/contact"
              className="inline-flex items-center px-7 py-3.5 bg-brand-900 text-white font-bold rounded-xl hover:bg-brand-800 shadow-lg transition-all hover:-translate-y-0.5 gap-2"
            >
              Contact Support <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SupportPage;
