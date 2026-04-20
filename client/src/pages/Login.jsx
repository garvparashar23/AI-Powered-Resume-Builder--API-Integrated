import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { login as loginAction } from '../store/authSlice';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { API_URL } from '../config';

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, data);
      if (res.data) {
        dispatch(loginAction(res.data));
        toast.success('Welcome back to your workspace!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center sm:text-left mb-10">
            <h2 className="text-3xl font-serif text-[#051C2C] tracking-tight mb-2">
              Welcome back
            </h2>
            <p className="text-sm text-gray-500 font-light">
              Enter your credentials to access your intelligence dashboard.
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#051C2C] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('email')}
                    type="email"
                    className="block w-full pl-10 border border-gray-300 rounded-none py-3 px-4 bg-transparent outline-none focus:border-[#051C2C] transition-colors font-light"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-xs text-red-600 font-medium">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#051C2C] mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('password')}
                    type="password"
                    className="block w-full pl-10 border border-gray-300 rounded-none py-3 px-4 bg-transparent outline-none focus:border-[#051C2C] transition-colors font-light"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-xs text-red-600 font-medium">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#051C2C] border-gray-300 rounded-none accent-[#051C2C]"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 font-light">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-[#051C2C] hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-4 px-4 shadow-sm text-sm font-bold tracking-widest uppercase text-white bg-[#051C2C] hover:bg-gray-900 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? 'Authenticating...' : 'Sign In'}
                </button>
              </div>
            </form>
            
            <div className="mt-8 text-center sm:text-left border-t border-gray-100 pt-6">
              <p className="text-sm text-gray-500 font-light">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-[#051C2C] hover:underline transition-colors">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Deep Corporate Branding */}
      <div className="hidden lg:flex lg:flex-1 relative bg-[#051C2C] overflow-hidden items-center justify-center p-12">
        {/* Abstract minimalistic overlay */}
        <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-white">
               <path d="M 0 100 C 50 50, 50 0, 100 0 L 100 100 Z" fill="currentColor" />
            </svg>
        </div>
        
        <div className="relative z-10 w-full max-w-lg">
          <div className="mb-10">
            <div className="h-12 w-12 bg-white flex items-center justify-center text-[#051C2C] font-serif font-bold text-2xl italic">
              R
            </div>
          </div>
          <h2 className="text-5xl font-serif text-white mb-6 leading-tight">The Resume Doctrine</h2>
          <p className="text-lg text-white/70 font-light mb-12 leading-relaxed">
            Gain immediate access to premium parsing engines, advanced demographic styling, and enterprise-grade career optimization algorithms.
          </p>
          <div className="border-l border-white/20 pl-6 py-2">
            <p className="text-sm text-white/50 font-light tracking-wide uppercase">Trusted by top professionals worldwide</p>
          </div>
        </div>
      </div>
    </div>
  );
}
