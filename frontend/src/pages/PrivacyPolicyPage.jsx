import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Database, Bell, UserCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
  {
    id: 'information-collected',
    icon: <Database className="w-5 h-5" />,
    title: '1. Information We Collect',
    content: [
      {
        subtitle: 'Information you provide directly',
        text: 'When you register, we collect your name, email address, password, and role (student or recruiter). If you are a student, you may also provide your university, branch, CGPA, and resume file. Recruiters may provide company details and job postings.',
      },
      {
        subtitle: 'Automatically collected information',
        text: 'We automatically collect usage data including pages visited, features used, device type, browser, IP address, and session duration. This data helps us improve platform performance and user experience.',
      },
      {
        subtitle: 'Resume data',
        text: 'When you upload a resume, we parse and store its content to power our AI analysis and job matching features. This data is encrypted at rest and in transit.',
      },
    ],
  },
  {
    id: 'how-we-use',
    icon: <Eye className="w-5 h-5" />,
    title: '2. How We Use Your Information',
    content: [
      {
        subtitle: 'To provide our services',
        text: 'We use your data to power job matching, resume analysis, application tracking, and platform notifications — the core services you signed up for.',
      },
      {
        subtitle: 'To improve our platform',
        text: 'Aggregated, anonymised usage data helps us identify bugs, improve features, and personalise your experience. We never use individual data for this purpose without consent.',
      },
      {
        subtitle: 'To communicate with you',
        text: 'We may send transactional emails (e.g., application updates, password resets) and, with your opt-in consent, marketing updates about new features or placement opportunities.',
      },
    ],
  },
  {
    id: 'sharing',
    icon: <UserCheck className="w-5 h-5" />,
    title: '3. Sharing of Information',
    content: [
      {
        subtitle: 'With recruiters (only upon application)',
        text: 'Your profile and resume are shared with a recruiter only when you explicitly apply to their job posting. We do not automatically share your data with all company partners.',
      },
      {
        subtitle: 'With service providers',
        text: 'We use trusted third-party service providers (e.g., cloud hosting, email delivery, payment processing) who process data solely on our behalf under strict data processing agreements.',
      },
      {
        subtitle: 'No sale of personal data',
        text: 'We do not sell, rent, or trade your personal information to any third party for their own marketing purposes — ever.',
      },
    ],
  },
  {
    id: 'security',
    icon: <Lock className="w-5 h-5" />,
    title: '4. Data Security',
    content: [
      {
        subtitle: 'Encryption',
        text: 'All data is encrypted in transit using TLS 1.2+ and at rest using AES-256 encryption. Passwords are hashed using bcrypt with salting.',
      },
      {
        subtitle: 'Access controls',
        text: 'Access to user data is strictly role-based. Only authorised personnel with a legitimate business need can access personal data, and all access is logged.',
      },
      {
        subtitle: 'Incident response',
        text: 'In the event of a data breach, we will notify affected users and regulators within 72 hours as required by applicable law.',
      },
    ],
  },
  {
    id: 'your-rights',
    icon: <Bell className="w-5 h-5" />,
    title: '5. Your Rights',
    content: [
      {
        subtitle: 'Access and portability',
        text: 'You can request a copy of all personal data we hold about you at any time by contacting privacy@careergenie.in.',
      },
      {
        subtitle: 'Correction and deletion',
        text: 'You can update your profile information at any time from your dashboard. To delete your account and all associated data, go to Settings > Account > Delete Account.',
      },
      {
        subtitle: 'Marketing opt-out',
        text: 'You can unsubscribe from marketing communications at any time by clicking "Unsubscribe" in any email or updating your notification preferences in the app.',
      },
    ],
  },
  {
    id: 'cookies',
    icon: <Shield className="w-5 h-5" />,
    title: '6. Cookies',
    content: [
      {
        subtitle: 'What we use cookies for',
        text: 'We use essential cookies to keep you logged in and remember your preferences. With your consent, we also use analytics cookies (e.g., Google Analytics) to understand platform usage.',
      },
      {
        subtitle: 'Managing cookies',
        text: 'You can control or disable cookies through your browser settings. Disabling essential cookies may affect your ability to use certain features of CareerGenie.',
      },
    ],
  },
];

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero */}
        <section className="bg-white border-b border-gray-100 py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-brand-900" />
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">Privacy Policy</h1>
            </div>
            <p className="text-gray-500 leading-relaxed">
              Last updated: <strong>1 August 2024</strong> &nbsp;·&nbsp; Effective: <strong>1 August 2024</strong>
            </p>
            <p className="text-gray-500 mt-4 leading-relaxed">
              CareerGenie ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have regarding your personal data when you use our platform at <strong>careergenie.in</strong>.
            </p>
          </div>
        </section>

        {/* Table of Contents + Content */}
        <section className="py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12">

            {/* Sticky ToC */}
            <aside className="lg:w-56 shrink-0">
              <div className="sticky top-24 bg-white rounded-xl border border-gray-100 p-5 space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Contents</p>
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

            {/* Main Content */}
            <div className="flex-grow space-y-12">
              {sections.map(sec => (
                <section key={sec.id} id={sec.id} className="scroll-mt-28">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 bg-blue-50 text-brand-900 rounded-lg flex-center">
                      {sec.icon}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{sec.title}</h2>
                  </div>

                  <div className="space-y-5">
                    {sec.content.map((item, i) => (
                      <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
                        <h3 className="font-semibold text-gray-800 mb-2">{item.subtitle}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              {/* Contact */}
              <div className="bg-brand-900 rounded-2xl p-7 text-white">
                <h2 className="text-lg font-bold mb-2">Privacy Questions or Requests?</h2>
                <p className="text-blue-200 text-sm mb-4">
                  For data access requests, deletions, or any privacy-related queries, contact our Data Protection Officer:
                </p>
                <a href="mailto:privacy@careergenie.in" className="font-bold text-white underline underline-offset-2 hover:text-blue-200 transition">
                  privacy@careergenie.in
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
