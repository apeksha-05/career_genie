import React from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase, Users, BarChart3, Zap, Search, CheckCircle2,
  Star, ArrowRight, Building2, ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const features = [
  {
    icon: <Search className="w-7 h-7" />,
    color: 'bg-blue-50 text-brand-900',
    title: 'Smart Candidate Discovery',
    desc: 'Our AI scans student profiles and surfaces the highest-match candidates for your open roles — filtered by branch, CGPA, skills, and location.',
  },
  {
    icon: <BarChart3 className="w-7 h-7" />,
    color: 'bg-indigo-50 text-indigo-600',
    title: 'Resume Intelligence Dashboard',
    desc: 'View ATS scores, keyword gap analysis, and fit rankings for every applicant — all in one unified recruiter portal.',
  },
  {
    icon: <Zap className="w-7 h-7" />,
    color: 'bg-yellow-50 text-yellow-600',
    title: 'One-Click Job Posting',
    desc: 'Post internships and full-time roles across 50+ connected campuses in under 2 minutes. Reach verified students instantly.',
  },
  {
    icon: <Users className="w-7 h-7" />,
    color: 'bg-green-50 text-green-600',
    title: 'Structured Application Pipeline',
    desc: 'Move candidates through screening, interview, offer, and onboarding stages with built-in status tracking and notifications.',
  },
  {
    icon: <Building2 className="w-7 h-7" />,
    color: 'bg-purple-50 text-purple-600',
    title: 'University Partnership Network',
    desc: 'Access verified students from 50+ university partners. Our campus relationships mean you reach top talent before they\'re on the open market.',
  },
  {
    icon: <Briefcase className="w-7 h-7" />,
    color: 'bg-teal-50 text-teal-600',
    title: 'Branded Company Profile',
    desc: 'Showcase your culture, perks, and mission to thousands of students actively exploring companies on CareerGenie.',
  },
];

const testimonials = [
  {
    quote: 'We hired 15 interns through CareerGenie last season. The AI matching saved our team 40+ hours of resume screening.',
    name: 'Priya Sharma',
    role: 'Campus Recruiter, TechCorp',
    avatar: 'PS',
    avatarColor: 'bg-blue-600',
  },
  {
    quote: 'The quality of candidates is exceptional. They all have ATS-optimized resumes and are genuinely prepared.',
    name: 'Rohit Mehta',
    role: 'HR Lead, Fintech.io',
    avatar: 'RM',
    avatarColor: 'bg-indigo-600',
  },
  {
    quote: 'Posting a job and getting shortlisted candidates in 24 hours is something we haven\'t seen on any other platform.',
    name: 'Anjali Nair',
    role: 'Talent Acquisition, GlobalConsult',
    avatar: 'AN',
    avatarColor: 'bg-teal-600',
  },
];

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    desc: 'Perfect for small teams testing campus hiring.',
    features: ['2 active job postings', 'Basic candidate matching', 'Standard application pipeline', 'Email support'],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '₹4,999/mo',
    desc: 'For growing companies with regular campus needs.',
    features: ['20 active job postings', 'AI-powered candidate ranking', 'Full pipeline management', 'University partner access', 'Priority support'],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For large organisations with dedicated hiring programs.',
    features: ['Unlimited postings', 'Dedicated account manager', 'Custom integrations (ATS/HRMS)', 'White-labeled portal', '50+ campus partnerships'],
    cta: 'Contact Sales',
    highlight: false,
  },
];

const ForRecruitersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero */}
        <section className="relative bg-brand-900 overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-300 blur-3xl" />
          </div>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold tracking-wide uppercase border border-white/20 mb-6">
              <Briefcase className="w-3.5 h-3.5" /> For Recruiters & HR Teams
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Hire Campus Talent<br /><span className="text-blue-300">10× Faster with AI</span>
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
              Stop sifting through hundreds of resumes. CareerGenie's AI surfaces the right campus candidates instantly — verified, ATS-scored, and ready to interview.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-3.5 bg-white text-brand-900 font-bold rounded-xl hover:bg-gray-50 shadow-xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Post a Job for Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3.5 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition flex items-center justify-center gap-2"
              >
                Talk to Sales
              </Link>
            </div>
            <p className="mt-6 text-blue-300 text-sm">No credit card required · Setup in 5 minutes</p>
          </div>
        </section>

        {/* Social Proof Strip */}
        <section className="py-8 px-4 bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-8 text-center text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 4.9/5 recruiter rating</span>
            <span className="hidden sm:block text-gray-300">|</span>
            <span>Trusted by <strong className="text-gray-800">200+ companies</strong></span>
            <span className="hidden sm:block text-gray-300">|</span>
            <span><strong className="text-gray-800">12,000+</strong> successful placements</span>
            <span className="hidden sm:block text-gray-300">|</span>
            <span>Avg. time-to-hire: <strong className="text-gray-800">8 days</strong></span>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Everything You Need to Hire Campus Talent</h2>
              <p className="text-gray-500 text-lg">One platform to post, discover, screen, and hire — built specifically for campus recruitment at scale.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`w-14 h-14 ${f.color} rounded-2xl flex-center mb-5`}>
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Post a Role', desc: 'Fill in the role details, skills required, CGPA cutoff, and package. Go live in under 2 minutes.' },
                { step: '02', title: 'AI Matches Candidates', desc: 'Our engine scans student profiles and ranks candidates by fit score, resume quality, and skills match.' },
                { step: '03', title: 'Review & Hire', desc: 'Use the pipeline dashboard to shortlist, schedule interviews, extend offers, and onboard — all in one place.' },
              ].map(item => (
                <div key={item.step} className="relative text-center">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex-center mx-auto mb-4 text-3xl font-extrabold text-brand-900/20">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What Recruiters Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${t.avatarColor} rounded-full flex-center text-white font-bold text-sm`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-gray-400 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Simple, Transparent Pricing</h2>
              <p className="text-gray-500">Start for free. Scale as you grow.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-7 border flex flex-col ${
                    plan.highlight
                      ? 'bg-brand-900 border-brand-900 shadow-2xl shadow-brand-500/20 scale-105'
                      : 'bg-white border-gray-100'
                  }`}
                >
                  <h3 className={`font-bold text-lg mb-1 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                  <p className={`text-3xl font-extrabold mb-1 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.price}</p>
                  <p className={`text-sm mb-6 ${plan.highlight ? 'text-blue-200' : 'text-gray-500'}`}>{plan.desc}</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((f, j) => (
                      <li key={j} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-blue-100' : 'text-gray-600'}`}>
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.highlight ? 'text-blue-300' : 'text-green-500'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={plan.name === 'Enterprise' ? '/contact' : '/signup'}
                    className={`w-full py-3 rounded-xl font-bold text-sm text-center transition flex items-center justify-center gap-2 ${
                      plan.highlight
                        ? 'bg-white text-brand-900 hover:bg-gray-50'
                        : 'bg-brand-900 text-white hover:bg-brand-800'
                    }`}
                  >
                    {plan.cta} <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Hiring Smarter Today</h2>
            <p className="text-gray-500 mb-8">Join 200+ companies using CareerGenie to build their campus hiring pipeline.</p>
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-3.5 bg-brand-900 text-white font-bold rounded-xl hover:bg-brand-800 shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-0.5 gap-2"
            >
              Create a Recruiter Account <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ForRecruitersPage;
