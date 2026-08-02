import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import { GraduationCap, Briefcase } from 'lucide-react';
import { signup as signupApi } from '../api/auth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[700px]">
        {/* Left Side - Branding */}
        <div className="w-full md:w-1/2 bg-brand-900 p-12 text-white flex flex-col justify-center relative overflow-hidden hidden md:flex">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>
          
          <div className="relative z-10 max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-white rounded-2xl mx-auto flex items-center justify-center mb-10 shadow-lg">
               <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-brand-900">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed mb-12">
              {subtitle}
            </p>
            
            {/* Match Score Mock */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-left relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 left-0 w-1 bg-green-400 h-full"></div>
               <div className="flex justify-between items-center mb-4">
                 <span className="font-semibold text-white">Match Score</span>
                 <span className="bg-green-500/20 text-green-300 px-2.5 py-1 rounded-md text-xs font-bold border border-green-500/30">85% High Match</span>
               </div>
               <div className="w-full bg-white/10 rounded-full h-1.5 mb-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-400 to-green-300 h-1.5 rounded-full" style={{ width: '85%' }}></div>
               </div>
               <p className="text-sm text-blue-50 italic">
                 "Your Python and Machine Learning skills align perfectly with this role."
               </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}

const Signup = () => {
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword) {
        alert("Passwords don't match");
        return;
    }
    try {
      const data = await signupApi(formData.name, formData.email, formData.password, role);
      if (data.success) {
        dispatch(setCredentials({ user: data.data, token: data.data.token }));
        navigate(role === 'student' ? '/dashboard/student' : '/dashboard/recruiter');
      } else {
        alert(data.error || 'Failed to sign up');
      }
    } catch (err) {
      alert(err.message || 'Error signing up');
    }
  };

  return (
    <AuthLayout 
      title="Join the Future of Campus Hiring" 
      subtitle="Bridge the gap between academic excellence and professional success with AI-powered resume analysis."
    >
      <div className="max-w-md w-full mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
        <p className="text-gray-500 mb-8">Start your professional journey today.</p>

        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">I am a...</p>
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={() => setRole('student')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                role === 'student' ? 'border-brand-900 bg-blue-50 text-brand-900' : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              <GraduationCap className="h-6 w-6 mb-2" />
              <span className="font-semibold">Student</span>
            </button>
            <button 
              type="button"
              onClick={() => setRole('recruiter')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                role === 'recruiter' ? 'border-brand-900 bg-blue-50 text-brand-900' : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              <Briefcase className="h-6 w-6 mb-2" />
              <span className="font-semibold">Recruiter</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input 
            type="text" 
            required
            label="Full Name"
            placeholder="John Doe"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <Input 
            type="email" 
            required
            label="Email Address"
            placeholder="john@university.edu"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              type="password" 
              required
              label="Password"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <Input 
              type="password" 
              required
              label="Confirm Password"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <div className="flex items-start mt-4">
            <input id="terms" type="checkbox" required className="h-4 w-4 mt-1 text-brand-900 focus:ring-brand-500 border-gray-300 rounded" />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
              I agree to the <Link to="/terms" className="text-brand-900 font-semibold hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-brand-900 font-semibold hover:underline">Privacy Policy</Link>.
            </label>
          </div>

          <Button 
            type="submit"
            fullWidth
            className="mt-6"
          >
            Create Account
          </Button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <Button variant="outline" fullWidth className="!font-semibold !text-gray-700 !border-gray-300">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 mr-2" />
              Continue with Google
            </Button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-brand-900 hover:text-brand-800 hover:underline transition-all">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Signup;
