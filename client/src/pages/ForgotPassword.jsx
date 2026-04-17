import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Mail, ArrowRight, ArrowLeft, KeyRound } from 'lucide-react';
import { API_URL } from '../config';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoLink, setDemoLink] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    setLoading(true);
    setDemoLink(''); // Reset
    try {
      const res = await axios.post(`${API_URL}/auth/forgotpassword`, { email });
      toast.success(res.data.message || 'Reset link requested');
      if (res.data.demoLink) {
        setDemoLink(res.data.demoLink); // For dev purposes
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <KeyRound size={24} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Forgot Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>
        
        {demoLink ? (
           <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-5 mt-4 text-center">
              <p className="text-sm font-medium mb-3">Email would be sent in production. For this demo, click the secure link below to reset your password:</p>
              <Link to={demoLink.replace('http://localhost:5173', '')} className="inline-block bg-emerald-600 text-white font-semibold py-2 px-4 rounded hover:bg-emerald-700 transition">
                Access Reset Portal <ArrowRight className="inline h-4 w-4 ml-1" />
              </Link>
           </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border border-gray-300 rounded-lg py-3 px-4 bg-gray-50 focus:bg-white transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-all"
              >
                {loading ? 'Processing...' : 'Send Reset Link'}
              </button>
            </div>
          </form>
        )}
        
        <div className="text-center mt-6">
          <Link to="/login" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-500">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
