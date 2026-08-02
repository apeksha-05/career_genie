import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, AlertTriangle, Scale } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    text: 'By accessing or using CareerGenie ("the Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Platform. These Terms constitute a legally binding agreement between you and CareerGenie Technologies Pvt. Ltd.',
  },
  {
    id: 'eligibility',
    title: '2. Eligibility',
    text: 'You must be at least 16 years of age to use CareerGenie. By creating an account, you represent and warrant that you are at least 16 years old and that all information you provide is accurate, current, and complete. Users under 18 should review these Terms with a parent or guardian.',
  },
  {
    id: 'accounts',
    title: '3. User Accounts',
    text: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately at support@careergenie.in of any unauthorised use of your account. CareerGenie reserves the right to suspend or terminate accounts that violate these Terms.',
  },
  {
    id: 'student-conduct',
    title: '4. Student Conduct',
    text: 'Students using CareerGenie agree to provide accurate information in their profiles and resumes, to apply only to roles for which they are genuinely interested, to not create fake or duplicate accounts, and to not use the Platform to harass, mislead, or defraud recruiters or other users. Violations may result in permanent account suspension.',
  },
  {
    id: 'recruiter-conduct',
    title: '5. Recruiter Conduct',
    text: 'Recruiters agree to post only genuine, non-discriminatory job openings, to treat all candidates with respect and fairness, to not misrepresent compensation, job scope, or company identity, and to not harvest student contact information for unsolicited marketing. CareerGenie reserves the right to remove any posting that violates these standards.',
  },
  {
    id: 'content',
    title: '6. User Content',
    text: 'You retain ownership of any content you upload (e.g., resumes, job postings). By uploading content, you grant CareerGenie a non-exclusive, royalty-free, worldwide licence to use, display, and process your content solely to provide the Platform\'s services. You represent that your content does not infringe any third-party intellectual property rights.',
  },
  {
    id: 'ai-services',
    title: '7. AI Resume Analysis',
    text: 'CareerGenie\'s AI Resume Analyzer is provided as a guidance tool only. Scores, suggestions, and match percentages are generated algorithmically and should not be interpreted as guarantees of employment outcomes. CareerGenie does not warrant that following AI recommendations will result in shortlisting or placement.',
  },
  {
    id: 'intellectual-property',
    title: '8. Intellectual Property',
    text: 'All Platform content, design, code, trademarks, and logos ("CareerGenie IP") are owned by CareerGenie Technologies Pvt. Ltd. and protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from CareerGenie IP without prior written consent.',
  },
  {
    id: 'disclaimers',
    title: '9. Disclaimers & Limitation of Liability',
    text: 'The Platform is provided "as is" without warranties of any kind, express or implied. CareerGenie does not guarantee uninterrupted availability or error-free operation. To the maximum extent permitted by law, CareerGenie shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Platform.',
  },
  {
    id: 'termination',
    title: '10. Termination',
    text: 'CareerGenie may suspend or terminate your account at any time for violation of these Terms, fraudulent activity, or any other reason at our sole discretion. Upon termination, your right to use the Platform ceases immediately. Sections relating to intellectual property, disclaimers, and limitation of liability survive termination.',
  },
  {
    id: 'governing-law',
    title: '11. Governing Law & Disputes',
    text: 'These Terms are governed by the laws of India. Any disputes arising from or related to these Terms or the Platform shall be subject to the exclusive jurisdiction of the courts of Bangalore, Karnataka. Before initiating legal proceedings, the parties agree to attempt good-faith resolution through mediation.',
  },
  {
    id: 'changes',
    title: '12. Changes to Terms',
    text: 'We may update these Terms from time to time. We will notify you of material changes by email or a prominent in-app notice at least 14 days before the new Terms take effect. Continued use of the Platform after the effective date constitutes acceptance of the updated Terms.',
  },
];

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero */}
        <section className="bg-white border-b border-gray-100 py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-8 h-8 text-brand-900" />
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">Terms of Service</h1>
            </div>
            <p className="text-gray-500 leading-relaxed">
              Last updated: <strong>1 August 2024</strong> &nbsp;·&nbsp; Effective: <strong>1 August 2024</strong>
            </p>
            <p className="text-gray-500 mt-4 leading-relaxed">
              Please read these Terms of Service carefully before using CareerGenie. These terms outline your rights and responsibilities as a user of our platform.
            </p>

            {/* Quick Note */}
            <div className="mt-6 flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 leading-relaxed">
                <strong>Plain English summary:</strong> Be honest in your profile, respect other users, don't abuse the platform, and understand that our AI tools are guidance aids — not guarantees. Full details below.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12">

            {/* Sticky ToC */}
            <aside className="lg:w-56 shrink-0">
              <div className="sticky top-24 bg-white rounded-xl border border-gray-100 p-5 space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Sections</p>
                {sections.map(s => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-sm text-gray-500 hover:text-brand-900 hover:font-medium transition py-0.5"
                  >
                    {s.title.replace(/^\d+\.\s/, '')}
                  </a>
                ))}
                <div className="pt-3 border-t border-gray-100 mt-3">
                  <Link to="/contact" className="block text-sm text-brand-900 font-semibold hover:text-brand-700 transition">
                    Questions? Contact us →
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Sections */}
            <div className="flex-grow space-y-6">
              {sections.map(sec => (
                <div
                  key={sec.id}
                  id={sec.id}
                  className="bg-white rounded-xl border border-gray-100 p-6 scroll-mt-28"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="w-4 h-4 text-brand-900 shrink-0" />
                    <h2 className="font-bold text-gray-900">{sec.title}</h2>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{sec.text}</p>
                </div>
              ))}

              {/* Contact Block */}
              <div className="bg-brand-900 rounded-2xl p-7 text-white">
                <h2 className="text-lg font-bold mb-2">Legal Queries</h2>
                <p className="text-blue-200 text-sm mb-4">
                  For legal enquiries, notices, or disputes related to these Terms, contact:
                </p>
                <div className="text-sm space-y-1">
                  <p className="text-white font-semibold">CareerGenie Technologies Pvt. Ltd.</p>
                  <p className="text-blue-200">IndiQube Gamma, Outer Ring Road, Bangalore – 560103</p>
                  <a href="mailto:legal@careergenie.in" className="font-bold text-white underline underline-offset-2 hover:text-blue-200 transition">
                    legal@careergenie.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
