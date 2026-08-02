import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Key, TrendingUp, FileText, Users, Search, Star, ChevronDown,
  Sparkles, Clock, CheckCircle2, ArrowRight, BookOpen
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const tips = [
  {
    id: 1,
    category: 'ATS Optimization',
    icon: <Key className="w-6 h-6" />,
    color: 'bg-blue-50 text-brand-900',
    title: 'Optimize for Keywords',
    readTime: '4 min read',
    difficulty: 'Beginner',
    summary: 'Include specific skills mentioned in job descriptions to pass through automated ATS filters effortlessly.',
    steps: [
      'Copy the exact skills/tools listed in the job description.',
      'Mirror the terminology recruiters use (e.g., "REST APIs" not "API development").',
      'Put keywords naturally in your summary, skills, and work bullet points.',
      'Avoid keyword stuffing — each keyword should appear 2–3 times max.',
    ],
  },
  {
    id: 2,
    category: 'Impact Writing',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'bg-indigo-50 text-indigo-600',
    title: 'Highlight Impact with Metrics',
    readTime: '5 min read',
    difficulty: 'Beginner',
    summary: "Don't just list duties. Use numbers and metrics to show the real-world value of your work.",
    steps: [
      'Start every bullet with a strong action verb (Built, Reduced, Led, Designed).',
      'Add a number: "Reduced page load time by 40%" > "Improved performance".',
      'Show scope: "Managed a team of 5 interns" shows leadership.',
      'Use the XYZ formula: Accomplished [X] as measured by [Y], by doing [Z].',
    ],
  },
  {
    id: 3,
    category: 'Formatting',
    icon: <FileText className="w-6 h-6" />,
    color: 'bg-purple-50 text-purple-600',
    title: 'Keep it to One Page',
    readTime: '3 min read',
    difficulty: 'Beginner',
    summary: "As a student, a concise one-page resume is professional and ensures recruiters find your best work quickly.",
    steps: [
      'Target font size 10–11pt for body, 14–16pt for headers.',
      'Set margins to 0.5–0.75 inches on all sides.',
      'Prioritize recent, relevant experiences — cut unrelated older roles.',
      'Use a clean, ATS-friendly template with no tables or graphics.',
    ],
  },
  {
    id: 4,
    category: 'Networking',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-sky-50 text-sky-600',
    title: 'Leverage LinkedIn Before Applying',
    readTime: '6 min read',
    difficulty: 'Intermediate',
    summary: "80% of jobs are filled through networking. Use LinkedIn strategically to get referrals before you hit Apply.",
    steps: [
      'Connect with alumni from your college at the target company.',
      'Send a short, personalized message — ask for a 15-min call, not a job.',
      "Share the specific role you're applying for and why you're a fit.",
      "After your chat, ask if they'd be comfortable referring you internally.",
    ],
  },
  {
    id: 5,
    category: 'Interview Prep',
    icon: <Star className="w-6 h-6" />,
    color: 'bg-yellow-50 text-yellow-600',
    title: 'Ace the Behavioural Round',
    readTime: '7 min read',
    difficulty: 'Intermediate',
    summary: "Use the STAR method to structure your answers and stand out in HR and managerial rounds.",
    steps: [
      'Situation: Set the context — what was happening?',
      'Task: What was your responsibility in that situation?',
      'Action: What specific steps did YOU take?',
      'Result: What was the measurable outcome?',
      'Prepare 6–8 STAR stories that cover teamwork, conflict, leadership, and failure.',
    ],
  },
  {
    id: 6,
    category: 'Portfolio',
    icon: <Search className="w-6 h-6" />,
    color: 'bg-green-50 text-green-600',
    title: 'Build a Project Portfolio',
    readTime: '8 min read',
    difficulty: 'Advanced',
    summary: "Side projects are the #1 differentiator for campus hires. Learn how to build and present yours effectively.",
    steps: [
      'Pick 2–3 projects that solve real problems — not just tutorials.',
      'Host every project live (Vercel, Netlify, Railway) and link it on your resume.',
      'Write a clear README: problem, solution, tech stack, screenshots.',
      'Document your project on GitHub with clean commits and a good description.',
    ],
  },
];

const faqs = [
  { q: 'Should I tailor my resume for every job?', a: 'Yes — even small changes (swapping keywords, reordering bullets) significantly improve your ATS score. CareerGenie\'s resume analyzer does this automatically.' },
  { q: 'Is a photo on a resume recommended in India?', a: 'It\'s neutral — neither required nor penalized. Focus on content. If you include one, keep it professional.' },
  { q: 'How do I explain a gap year on my resume?', a: 'Be honest and frame it positively. Mention what you learned, built, or pursued — freelancing, certifications, volunteering all count.' },
  { q: 'What GPA cutoff do most campus recruiters have?', a: 'Most top companies set a 7.0/10 CGPA cutoff. However, strong projects and skills can help you get referrals that bypass the filter.' },
];

const ResumeTipsPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeDifficulty, setActiveDifficulty] = useState('All');

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredTips = activeDifficulty === 'All'
    ? tips
    : tips.filter(t => t.difficulty === activeDifficulty);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero */}
        <section className="bg-white border-b border-gray-100 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-900 text-xs font-semibold tracking-wide uppercase border border-blue-100 mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              Expert Career Guides
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Resume Tips &amp; <span className="text-brand-900">Career Guides</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
              Master the art of campus placements with actionable, expert-curated guides that have helped 12,000+ students land their dream roles.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> ATS Optimization</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> Impact Writing</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> Interview Prep</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> Portfolio Building</span>
            </div>
          </div>
        </section>

        {/* AI Nudge Banner */}
        <section className="py-6 px-4 sm:px-6 lg:px-8 bg-brand-900">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-white">
              <Sparkles className="w-6 h-6 text-blue-300 shrink-0" />
              <p className="text-sm font-medium">
                <span className="font-bold">Save time:</span> Upload your resume and let CareerGenie AI apply these tips automatically.
              </p>
            </div>
            <Link
              to="/signup"
              className="shrink-0 px-5 py-2.5 bg-white text-brand-900 font-bold text-sm rounded-xl hover:bg-gray-50 transition whitespace-nowrap"
            >
              Try AI Resume Analyzer
            </Link>
          </div>
        </section>

        {/* Tips Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {/* Filter */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
              <h2 className="text-2xl font-bold text-gray-900">All Guides</h2>
              <div className="flex gap-2">
                {difficulties.map(d => (
                  <button
                    key={d}
                    onClick={() => setActiveDifficulty(d)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      activeDifficulty === d
                        ? 'bg-brand-900 text-white'
                        : 'bg-white text-gray-500 border border-gray-200 hover:border-brand-500'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTips.map(tip => (
                <div
                  key={tip.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Card Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${tip.color} rounded-xl flex-center shrink-0`}>
                        {tip.icon}
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        tip.difficulty === 'Beginner' ? 'bg-green-50 text-green-700' :
                        tip.difficulty === 'Intermediate' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {tip.difficulty}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-brand-900 uppercase tracking-wider mb-2">{tip.category}</p>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{tip.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{tip.summary}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3.5 h-3.5" /> {tip.readTime}
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="px-6 pb-4 flex-grow">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Key Takeaways</p>
                    <ul className="space-y-2">
                      {tip.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="w-5 h-5 rounded-full bg-blue-50 text-brand-900 text-xs font-bold flex-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer */}
                  <div className="px-6 pb-6 pt-4 border-t border-gray-50">
                    <Link
                      to="/signup"
                      className="flex items-center gap-2 text-sm font-semibold text-brand-900 hover:text-brand-700 transition"
                    >
                      Apply with AI Analyzer <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-center mb-10">Common questions from campus students about resumes and placements.</p>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden"
                >
                  <button
                    className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ResumeTipsPage;
