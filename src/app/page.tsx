'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const session = sessionStorage.getItem('vitar_slideshow_auth');
    if (session) {
      router.replace('/builder');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="login-bg flex items-center justify-center">
      <div className="text-white/50 text-sm">Načítání...</div>
    </div>
  );
}
