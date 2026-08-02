import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Target, Users, Lightbulb, ArrowRight, CheckCircle2, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const values = [
  { icon: <Target className="w-7 h-7" />, color: 'bg-blue-50 text-brand-900', title: 'Mission First', desc: 'Every feature we build starts with one question: does it help a student land their dream role?' },
  { icon: <Lightbulb className="w-7 h-7" />, color: 'bg-yellow-50 text-yellow-600', title: 'AI-Driven', desc: 'We believe the best career guidance comes from data, not guesswork. AI is at our core.' },
  { icon: <Users className="w-7 h-7" />, color: 'bg-green-50 text-green-600', title: 'Student-Centric', desc: 'We are students ourselves. We built CareerGenie because we experienced the gap firsthand.' },
  { icon: <Heart className="w-7 h-7" />, color: 'bg-red-50 text-red-500', title: 'Community', desc: 'From university partnerships to campus ambassador programs — community is how we grow.' },
];

const team = [
  { name: 'Arjun Verma', role: 'Co-founder & CEO', initials: 'AV', color: 'bg-brand-900', bio: 'Former IIT Delhi CS student. Built CareerGenie to help juniors not struggle like he did.' },
  { name: 'Sneha Kapoor', role: 'Co-founder & CTO', initials: 'SK', color: 'bg-indigo-600', bio: 'Ex-Google engineer. Leads AI/ML infrastructure and resume intelligence engine.' },
  { name: 'Rahul Iyer', role: 'Head of Product', initials: 'RI', color: 'bg-teal-600', bio: 'Former campus recruiter at Infosys. Brings recruiter perspective to every product decision.' },
  { name: 'Meera Nair', role: 'Head of Partnerships', initials: 'MN', color: 'bg-purple-600', bio: 'Manages relationships with 50+ university career centers across India.' },
];

const milestones = [
  { year: '2022', event: 'CareerGenie founded in a college hostel room in Bangalore by 2 IIT students.' },
  { year: '2023 Q1', event: 'Launched beta with 3 universities. 500 students placed in the first semester.' },
  { year: '2023 Q3', event: 'Secured seed funding. Expanded to 20+ university partnerships.' },
  { year: '2024 Q1', event: 'Launched AI Resume Analyzer. Platform hits 50,000 registered students.' },
  { year: '2024 Q3', event: '200+ companies onboarded. 12,000+ placements achieved. Series A in progress.' },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero */}
        <section className="bg-white border-b border-gray-100 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-900 text-xs font-semibold tracking-wide uppercase border border-blue-100 mb-6">
              Our Story
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
              We Built CareerGenie <br />
              <span className="text-brand-900">Because We Needed It</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Two final-year engineering students couldn't figure out why their resumes weren't getting shortlisted. After analysing hundreds of job descriptions and recruiter workflows, the answer was clear — campus students needed an AI-powered edge. So we built one.
            </p>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="bg-brand-900 py-10 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { v: '50,000+', l: 'Registered Students' },
              { v: '200+', l: 'Partner Companies' },
              { v: '50+', l: 'University Partners' },
              { v: '12,000+', l: 'Successful Placements' },
            ].map(s => (
              <div key={s.l}>
                <p className="text-3xl font-extrabold text-white mb-1">{s.v}</p>
                <p className="text-blue-200 text-sm font-medium">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-5">Our Mission</h2>
              <p className="text-gray-500 leading-relaxed mb-5">
                The campus hiring process is broken. Students don't know why they're getting rejected. Recruiters are overwhelmed with unqualified applications. CareerGenie fixes both sides of the equation.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                We use AI to bridge the information gap — giving students real-time feedback on their resumes, and giving recruiters pre-qualified, ranked candidate pipelines.
              </p>
              <ul className="space-y-3">
                {['Democratise access to career guidance for all students', 'Make resume optimization effortless with AI', 'Connect the right student to the right company — faster'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-900 rounded-3xl p-8 text-white">
              <Star className="w-8 h-8 text-blue-300 mb-6" />
              <p className="text-xl font-semibold leading-relaxed mb-4 italic">
                "Every student deserves to know exactly why their resume is or isn't getting shortlisted — and how to fix it instantly."
              </p>
              <p className="text-blue-200 text-sm font-medium">— Arjun Verma, CEO & Co-founder</p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div key={i} className="text-center p-6">
                  <div className={`w-16 h-16 ${v.color} rounded-2xl flex-center mx-auto mb-4`}>
                    {v.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:shadow-lg transition-shadow">
                  <div className={`w-16 h-16 ${member.color} rounded-full flex-center mx-auto mb-4 text-white font-bold text-xl`}>
                    {member.initials}
                  </div>
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-xs text-brand-900 font-semibold mb-3">{member.role}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-100" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-6 relative">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex-center shrink-0 text-xs font-bold text-brand-900 text-center leading-tight z-10">
                      {m.year}
                    </div>
                    <div className="flex-grow bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="text-sm text-gray-700 leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join 50,000+ Students &amp; 200+ Companies</h2>
            <p className="text-gray-500 mb-8">Start your CareerGenie journey today — it's completely free.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="inline-flex items-center px-8 py-3.5 bg-brand-900 text-white font-bold rounded-xl hover:bg-brand-800 shadow-lg transition-all hover:-translate-y-0.5 gap-2">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="inline-flex items-center px-8 py-3.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-white hover:shadow transition gap-2">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
