import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [cooldown, setCooldown] = useState(0);

  const startCooldown = useCallback(() => {
    setCooldown(60);
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSubmit = () => {
    if (!email || !password || !agreed) return;
    setStep('verify');
    startCooldown();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        <div className="flex items-baseline justify-center gap-2 mb-10 text-[22px] text-gray-900 tracking-[-0.02em] font-black">
          <img src="/images/mailor-logo.png" alt="Mailor" className="h-[1em] w-auto shrink-0 self-center object-contain" />
          <span>Mailor</span>
        </div>

        <h1 className="text-[22px] font-bold text-gray-900 text-center mb-8">Create an account</h1>

        <button className="w-full flex items-center justify-center gap-3 h-[44px] border border-gray-200 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-2">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
          </svg>
          Sign up with Google
        </button>

        <p className="text-[12px] text-gray-500 leading-relaxed my-4">
          By clicking &quot;Sign up with Google&quot; I agree to the{' '}
          <a href="#" className="text-gray-700 hover:text-gray-900 underline">Terms of Service</a>, and acknowledge Mailor&apos;s{' '}
          <a href="#" className="text-gray-700 hover:text-gray-900 underline">Privacy Policy</a>.
        </p>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {step === 'form' ? (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full h-[44px] px-3 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Password</label>
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

            <label className="flex items-start gap-2.5 mt-5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 accent-gray-900"
              />
              <span className="text-[12px] text-gray-500 leading-relaxed">
                I agree to the <a href="#" className="text-gray-700 hover:text-gray-900 underline">Terms of Service</a>, and acknowledge Mailor&apos;s <a href="#" className="text-gray-700 hover:text-gray-900 underline">Privacy Policy</a>.
              </span>
            </label>

            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center h-[44px] mt-6 text-[14px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full h-[44px] px-3 text-[14px] border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
            </div>

            <p className="text-[13px] text-gray-500 leading-relaxed mt-5">
              We&apos;ve sent a verification link to {email}. If you don&apos;t see it within 5 minutes, please check your spam or click resend.
            </p>

            <button
              onClick={() => { if (cooldown <= 0) startCooldown(); }}
              disabled={cooldown > 0}
              className={`w-full flex items-center justify-center h-[44px] mt-6 text-[14px] font-medium rounded-lg transition-colors ${
                cooldown > 0
                  ? 'bg-gray-300 text-white cursor-not-allowed'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {cooldown > 0 ? `Resend (${cooldown}s)` : 'Resend'}
            </button>
          </>
        )}

        <p className="text-center text-[13px] text-gray-500 mt-6">
          Already registered? <Link to="/login" className="text-gray-700 font-medium hover:text-gray-900 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
