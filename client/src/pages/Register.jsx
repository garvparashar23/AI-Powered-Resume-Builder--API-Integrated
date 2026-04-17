import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { login as loginAction } from '../store/authSlice';
import { API_URL } from '../config';
import { Mail, Lock, User as UserIcon, UserPlus, LogIn, ArrowRight } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

export default function Register() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/register`, data);
      if (res.data) {
        dispatch(loginAction(res.data));
        toast.success('Account created successfully! Welcome!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join thousands of professionals building amazing resumes.
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('name')}
                    type="text"
                    className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border border-gray-300 rounded-lg py-3 px-4 bg-gray-50 focus:bg-white transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('email')}
                    type="email"
                    className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border border-gray-300 rounded-lg py-3 px-4 bg-gray-50 focus:bg-white transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('password')}
                    type="password"
                    className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border border-gray-300 rounded-lg py-3 px-4 bg-gray-50 focus:bg-white transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.password.message}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all lg:hover:-translate-y-0.5"
                >
                  {loading ? (
                    'Creating account...'
                  ) : (
                    <>
                      Sign Up <UserPlus className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-500 hover:underline transition-colors">
                  Sign in instantly
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image/Gradient */}
      <div className="hidden lg:flex lg:flex-1 relative bg-slate-900 overflow-hidden items-center justify-center">
        {/* Abstract Background Design */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-900 opacity-90 z-0" />
        <div className="absolute top-0 -left-10 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-0 -right-10 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-20 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10 w-full max-w-lg px-8 text-center text-white">
          <div className="mb-8 flex justify-center">
            <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-lg border border-white/20">
              <LogIn className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-6 tracking-tight drop-shadow-sm">Join the AI Revolution</h2>
          <p className="text-lg text-emerald-100 mb-8 leading-relaxed">
            Register today and automatically unleash the power of Artificial Intelligence to craft your perfectly optimized resume. 
          </p>
          <div className="flex items-center justify-center space-x-4 pb-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-teal-900 bg-gray-300 flex items-center justify-center overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt={`user ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-sm text-emerald-200 font-medium">Join 10,000+ professionals</div>
          </div>
        </div>
      </div>
    </div>
  );
}
