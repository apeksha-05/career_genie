import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, TrendingUp, ExternalLink, Search, Building2, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const companies = [
  { id: 1, name: 'TechCorp', sector: 'Technology', location: 'Bangalore, IN', employees: '10,000+', openings: 12, rating: 4.8, hiring: true, color: 'bg-blue-600', initial: 'TC', desc: "India's leading cloud infrastructure company building next-gen developer tools." },
  { id: 2, name: 'Fintech.io', sector: 'Finance', location: 'Mumbai, IN', employees: '2,500+', openings: 7, rating: 4.5, hiring: true, color: 'bg-indigo-600', initial: 'F', desc: 'Revolutionizing campus banking with AI-driven financial products for students.' },
  { id: 3, name: 'GlobalConsult', sector: 'Consulting', location: 'Delhi, IN', employees: '50,000+', openings: 20, rating: 4.7, hiring: true, color: 'bg-teal-600', initial: 'GC', desc: 'Top-tier management consultancy offering graduate trainee programs across India.' },
  { id: 4, name: 'DeepMind Labs', sector: 'Technology', location: 'Hyderabad, IN', employees: '1,000+', openings: 5, rating: 4.9, hiring: true, color: 'bg-purple-600', initial: 'DL', desc: 'AI research startup solving complex real-world problems with deep learning.' },
  { id: 5, name: 'HealthPlus', sector: 'Healthcare', location: 'Pune, IN', employees: '8,000+', openings: 9, rating: 4.4, hiring: true, color: 'bg-green-600', initial: 'HP', desc: 'Digital health startup connecting doctors and patients through smart diagnostics.' },
  { id: 6, name: 'RetailMax', sector: 'E-Commerce', location: 'Chennai, IN', employees: '30,000+', openings: 15, rating: 4.3, hiring: false, color: 'bg-orange-500', initial: 'RM', desc: "India's fastest-growing D2C commerce platform powering 1M+ sellers." },
  { id: 7, name: 'EduBridge', sector: 'EdTech', location: 'Remote', employees: '500+', openings: 4, rating: 4.6, hiring: true, color: 'bg-cyan-600', initial: 'EB', desc: 'Reimagining K-12 and campus education through adaptive learning algorithms.' },
  { id: 8, name: 'AutoNova', sector: 'Automotive', location: 'Pune, IN', employees: '15,000+', openings: 11, rating: 4.5, hiring: true, color: 'bg-red-600', initial: 'AN', desc: 'Pioneering electric vehicle software and autonomous driving for Indian roads.' },
  { id: 9, name: 'CloudNest', sector: 'Technology', location: 'Bangalore, IN', employees: '3,000+', openings: 8, rating: 4.7, hiring: true, color: 'bg-sky-600', initial: 'CN', desc: 'SaaS platform helping enterprises manage cloud infrastructure at scale.' },
];

const sectors = ['All', 'Technology', 'Finance', 'Consulting', 'Healthcare', 'E-Commerce', 'EdTech', 'Automotive'];

const stats = [
  { label: 'Partner Companies', value: '200+' },
  { label: 'Active Openings', value: '1,400+' },
  { label: 'Universities Covered', value: '50+' },
  { label: 'Students Placed', value: '12,000+' },
];

const CompaniesPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = companies.filter(c => {
    const matchesSector = activeFilter === 'All' || c.sector === activeFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sector.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero */}
        <section className="bg-white border-b border-gray-100 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-900 text-xs font-semibold tracking-wide uppercase border border-blue-100 mb-6">
              <Building2 className="w-3.5 h-3.5" />
              200+ Partner Companies
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Explore Top <span className="text-brand-900">Hiring Companies</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
              Discover companies actively recruiting campus talent. Filter by industry, location, or open roles.
            </p>

            {/* Search */}
            <div className="max-w-lg mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies or sectors..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="bg-brand-900 py-10 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(s => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-white mb-1">{s.value}</p>
                <p className="text-blue-200 text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Filter + Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {/* Sector Filter */}
            <div className="flex flex-wrap gap-2 mb-10">
              {sectors.map(s => (
                <button
                  key={s}
                  onClick={() => setActiveFilter(s)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeFilter === s
                      ? 'bg-brand-900 text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-500 hover:text-brand-900'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Companies Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-24 text-gray-400">
                <Building2 className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p className="text-lg">No companies match your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(company => (
                  <div
                    key={company.id}
                    className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 ${company.color} rounded-xl flex-center text-white font-bold text-lg flex-shrink-0`}>
                          {company.initial}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg leading-tight">{company.name}</h3>
                          <span className="text-xs text-gray-400 font-medium">{company.sector}</span>
                        </div>
                      </div>
                      {company.hiring && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                          Hiring
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-grow">{company.desc}</p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {company.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> {company.employees}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> {company.rating}
                      </span>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs font-semibold text-brand-900 bg-blue-50 px-2.5 py-1 rounded-full">
                        {company.openings} openings
                      </span>
                      <Link
                        to="/signup"
                        className="flex items-center gap-1 text-sm font-semibold text-brand-900 hover:text-brand-700 transition"
                      >
                        View Jobs <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <TrendingUp className="w-10 h-10 text-brand-900 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to land your dream role?</h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">
              Create a free CareerGenie account and get AI-powered job matches from these top companies.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-3.5 bg-brand-900 text-white font-semibold rounded-xl hover:bg-brand-800 shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-0.5"
            >
              Get Started — It's Free
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CompaniesPage;
