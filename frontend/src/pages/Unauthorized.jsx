import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-500 mb-8">
          You don't have permission to view this page. If you believe this is a mistake, please contact support.
        </p>
        <Button variant="solid" onClick={() => navigate(-1)} fullWidth className="mb-3">
          <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
        </Button>
        <Button variant="ghost" onClick={() => navigate('/')} fullWidth>
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
