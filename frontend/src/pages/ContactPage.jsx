import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageSquare, MapPin, Phone, Clock, CheckCircle2, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const contactOptions = [
  { icon: <MessageSquare className="w-6 h-6" />, color: 'bg-blue-50 text-brand-900', title: 'General Enquiries', desc: 'Questions about CareerGenie or our platform.', email: 'hello@careergenie.in' },
  { icon: <Mail className="w-6 h-6" />, color: 'bg-green-50 text-green-600', title: 'Student Support', desc: 'Need help with your account or resume?', email: 'students@careergenie.in' },
  { icon: <Phone className="w-6 h-6" />, color: 'bg-purple-50 text-purple-600', title: 'Recruiter Sales', desc: 'Want to hire campus talent through us?', email: 'recruiter@careergenie.in' },
];

const ContactPage = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '', type: 'Student' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero */}
        <section className="bg-white border-b border-gray-100 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Get in <span className="text-brand-900">Touch</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              We typically respond within 4 business hours. Choose the channel that works best for you.
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {contactOptions.map((opt, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 ${opt.color} rounded-xl flex-center mb-4`}>
                  {opt.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{opt.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{opt.desc}</p>
                <a
                  href={`mailto:${opt.email}`}
                  className="text-sm font-semibold text-brand-900 hover:text-brand-700 transition"
                >
                  {opt.email}
                </a>
              </div>
            ))}
          </div>

          {/* Form + Aside */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex-center mx-auto mb-5">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    Thanks for reaching out. Our team will get back to you within 4 business hours.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Type toggle */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-2">I am a...</label>
                      <div className="flex gap-2">
                        {['Student', 'Recruiter', 'University'].map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setFormState(prev => ({ ...prev, type: t }))}
                            className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                              formState.type === t
                                ? 'bg-brand-900 text-white border-brand-900'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-brand-500'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1.5" htmlFor="contact-name">Full Name</label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1.5" htmlFor="contact-email">Email Address</label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1.5" htmlFor="contact-subject">Subject</label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        required
                        value={formState.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1.5" htmlFor="contact-message">Message</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        required
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Tell us more about what you need..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-brand-900 text-white font-bold rounded-xl hover:bg-brand-800 shadow-lg shadow-brand-500/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Aside Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-brand-900" />
                  <h3 className="font-bold text-gray-900">Response Time</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Mon – Fri: within 4 hours<br />
                  Weekends: within 24 hours
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-brand-900" />
                  <h3 className="font-bold text-gray-900">Office</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  CareerGenie HQ<br />
                  IndiQube Gamma, Outer Ring Road<br />
                  Bangalore, Karnataka 560103
                </p>
              </div>

              <div className="bg-brand-900 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Looking for tech support?</h3>
                <p className="text-sm text-blue-200 mb-4">Check our support centre for instant answers to common issues.</p>
                <Link to="/support" className="text-sm font-bold text-white underline underline-offset-2 hover:text-blue-200 transition">
                  Visit Support Centre →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
