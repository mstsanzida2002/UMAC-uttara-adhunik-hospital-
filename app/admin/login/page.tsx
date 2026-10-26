'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Specific credentials check as requested
    const validCredentials = [
      { email: 'sakin5140@gmail.com', password: 'Sakin106' },
      { email: 'sanzida@gmail.com', password: '123admin' },
    ];
    const match = validCredentials.find(c => c.email === email && c.password === password);
    if (match) {
      setIsLoading(true);
      // Persist auth cookie for session verification across admin routes
      document.cookie = `admin_auth=${match.email}; path=/; max-age=86400; SameSite=Lax`;
      router.push('/admin/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#E6F4EB] flex flex-col justify-between items-center p-4 sm:p-6 relative select-none">
      {/* Top spacing / branding accent */}
      <div className="w-full pt-4 sm:pt-6" />

      {/* Center Login Card */}
      <div className="w-full max-w-[420px] my-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-emerald-950/5 border border-emerald-100/70 p-7 sm:p-9 transition-all">
          {/* Top of Card: Crest & Heading */}
          <div className="flex flex-col items-center text-center mb-7">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4 drop-shadow-sm">
              <Image
                src="/assets/college-emblem.png"
                alt="Uttara Adhunik Medical College Emblem"
                fill
                priority
                sizes="(max-width: 768px) 80px, 96px"
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Uttara Adhunik Medical College
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-red-600 text-sm font-medium animate-in fade-in duration-200"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5 text-left">
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold text-gray-700 tracking-wider uppercase"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 hover:bg-white focus:bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#018837] focus:ring-2 focus:ring-[#018837]/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-left">
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold text-gray-700 tracking-wider uppercase"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-3 bg-gray-50/50 hover:bg-white focus:bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#018837] focus:ring-2 focus:ring-[#018837]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#018837] hover:bg-[#016F2C] active:bg-[#015C24] text-white font-semibold py-3.5 px-4 rounded-xl transition duration-150 shadow-md shadow-emerald-900/10 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#018837] flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
                {!isLoading && (
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full pb-6 text-center">
        <p className="text-xs sm:text-sm text-gray-500 font-medium tracking-normal">
          System engineered by{' '}
          <span className="font-semibold text-gray-700">Sakin Bin Jabed</span>
        </p>
      </footer>
    </div>
  );
}
