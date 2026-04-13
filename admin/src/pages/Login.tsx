import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        <div className="flex items-baseline justify-center gap-2 mb-10 text-[22px] text-gray-900 tracking-[-0.02em] font-black">
          <img src="/images/mailor-logo.png" alt="Mailor" className="h-[1em] w-auto shrink-0 self-center object-contain" />
          <span>Mailor</span>
        </div>

        <h1 className="text-[22px] font-bold text-gray-900 text-center mb-8">Welcome back</h1>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-3 h-[44px] border border-gray-200 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 h-[44px] border border-gray-200 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M15.284 6.364c-.103.08-1.922 1.105-1.922 3.386 0 2.64 2.318 3.575 2.387 3.598-.011.057-.37 1.27-1.222 2.506-.76 1.098-1.554 2.193-2.76 2.193-1.208 0-1.519-.702-2.908-.702-1.357 0-1.84.725-2.942.725-1.103 0-1.874-1.018-2.76-2.262C2.07 14.26 1.2 11.976 1.2 9.82c0-3.477 2.261-5.321 4.487-5.321 1.183 0 2.17.777 2.909.777.706 0 1.807-.823 3.148-.823.509 0 2.34.046 3.54 1.91Zm-4.177-3.505c.553-.657.944-1.567.944-2.477 0-.126-.011-.254-.034-.358-.9.034-1.969.6-2.614 1.337-.508.576-.978 1.486-.978 2.409 0 .138.023.276.034.322.058.01.15.023.24.023.81 0 1.83-.54 2.408-1.256Z" fill="currentColor"/>
            </svg>
            Sign in with Apple
          </button>
          <button className="w-full flex items-center justify-center gap-3 h-[44px] border border-gray-200 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Sign in with SSO
          </button>
        </div>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[12px] text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[44px] px-3 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[13px] font-medium text-gray-700">Password</label>
              <a href="#" className="text-[12px] text-gray-500 hover:text-gray-700 transition-colors">Forgot your password?</a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[44px] px-3 pr-10 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <Link
          to="/"
          className="w-full flex items-center justify-center h-[44px] mt-6 text-[14px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
        >
          Sign in
        </Link>

        <p className="text-center text-[13px] text-gray-500 mt-6">
          Don&apos;t have an account? <Link to="/signup" className="text-gray-700 font-medium hover:text-gray-900 transition-colors">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
