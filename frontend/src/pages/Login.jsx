import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '../store/authSlice';
import AuthLayout from '../components/AuthLayout';
import { Eye } from 'lucide-react';
import { login as loginApi } from '../api/auth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Login = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await loginApi(email, password);
      
      if (data.success) {
        dispatch(setCredentials({ user: data.data, token: data.data.token }));
        // Navigate based on role
        if (data.data.role === 'student') navigate('/dashboard/student');
        else if (data.data.role === 'recruiter') navigate('/dashboard/recruiter');
        else if (data.data.role === 'admin') navigate('/admin');
        else navigate('/');
      } else {
        setError(data.error || 'Failed to log in');
      }
    } catch (err) {
      setError(err.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Empowering your campus career journey." 
      subtitle="Analyze your resume, discover top jobs, and connect with recruiters in one place."
    >
      <div className="max-w-md w-full mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-8">Please enter your details to sign in to CareerGenie.</p>

        {error && <div className="mb-4 text-red-500 text-sm font-medium">{error}</div>}

        <div className="mb-6 p-1 bg-gray-200 rounded-lg flex">
          <button 
            type="button"
            onClick={() => setRole('student')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              role === 'student' ? 'bg-white text-brand-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Student
          </button>
          <button 
            type="button"
            onClick={() => setRole('recruiter')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              role === 'recruiter' ? 'bg-white text-brand-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Recruiter
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input 
            type="email" 
            required
            label="Email Address"
            placeholder="name@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <a href="#" className="text-sm font-semibold text-brand-900 hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className="absolute right-4 top-3 text-gray-400 hover:text-gray-600">
                <Eye className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center mt-4">
            <input id="remember-me" type="checkbox" className="h-4 w-4 text-brand-900 focus:ring-brand-500 border-gray-300 rounded" />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
              Remember me for 30 days
            </label>
          </div>

          <Button 
            type="submit"
            disabled={loading}
            fullWidth
            className="mt-6"
          >
            {loading ? 'Logging in...' : 'Login'}
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
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-brand-900 hover:text-brand-800 hover:underline transition-all">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
