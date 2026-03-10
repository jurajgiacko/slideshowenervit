'use client';

import { useEffect } from 'react';
import { getSession } from '@/lib/session';

export default function Home() {
  useEffect(() => {
    const session = getSession();
    if (session) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center">
      <div className="text-white/50">Přesměrování...</div>
    </div>
  );
}
