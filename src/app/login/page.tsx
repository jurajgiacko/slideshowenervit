'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateCredentials, getUserDisplayName } from '@/lib/auth';
import { setSession } from '@/lib/session';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    setTimeout(() => {
      if (validateCredentials(username, password)) {
        setSession(getUserDisplayName(username));
        router.push('/dashboard');
      } else {
        setError(true);
        setPassword('');
      }
      setLoading(false);
    }, 300);
  };

  return (
    <div className="login-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#E3001B] rounded-xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8" />
                <path d="M12 17v4" />
              </svg>
            </div>
            <span className="text-white text-xl font-semibold tracking-tight">Slideshow</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">B2B Prezentace</h1>
          <p className="text-white/50 text-sm">ENERVIT — Presentation Builder</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wider">
              Uživatelské jméno
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#E3001B]/50 focus:ring-1 focus:ring-[#E3001B]/30 transition"
              placeholder="login"
              required
            />
          </div>

          <div>
            <label className="block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wider">
              Heslo
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#E3001B]/50 focus:ring-1 focus:ring-[#E3001B]/30 transition"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              Nesprávné přihlašovací údaje. Zkuste to znovu.
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#E3001B] hover:bg-[#c5001a] text-white font-semibold rounded-xl transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Přihlašování...' : 'Přihlásit se'}
          </button>
        </form>

        <p className="text-center text-white/30 text-xs mt-8">
          VITAR Sport s.r.o. — Interní nástroj
        </p>
      </div>
    </div>
  );
}
