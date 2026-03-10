'use client';

import { useEffect, useState } from 'react';
import type { PresentationData } from '@/lib/template';

export default function DashboardPage() {
  const [presentations, setPresentations] = useState<PresentationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState('');

  useEffect(() => {
    const session = sessionStorage.getItem('enervit_user');
    if (!session) {
      window.location.href = '/login';
      return;
    }
    setUser(session);

    fetch('/api/presentations')
      .then((r) => r.json())
      .then((data) => {
        setPresentations(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Opravdu smazat tuto prezentaci?')) return;
    await fetch(`/api/presentations/${id}`, { method: 'DELETE' });
    setPresentations((prev) => prev.filter((p) => p.id !== id));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('enervit_user');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center">
        <div className="text-white/50 text-lg">Načítám...</div>
      </div>
    );
  }

  const active = presentations.filter((p) => p.status === 'active');

  const grouped = new Map<string, PresentationData[]>();
  for (const p of active) {
    const key = p.salesperson.name;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(p);
  }

  return (
    <div className="min-h-screen bg-[#0f0f23]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#1a1a2e]/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-[#E30613] px-3 py-1">
              <span className="text-white font-bold text-sm tracking-wider">ENERVIT</span>
            </div>
            <span className="text-white/50 text-sm">Presentation Builder</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-sm">{user}</span>
            <button
              onClick={handleLogout}
              className="text-white/40 hover:text-white text-sm transition-colors"
            >
              Odhlásit
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">Galerie prezentací</h1>
            <p className="text-white/40 mt-1">{active.length} aktivních prezentací</p>
          </div>
          <a
            href="/builder"
            className="bg-[#E30613] hover:bg-[#c00510] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <span className="text-xl">+</span> Nová prezentace
          </a>
        </div>

        {/* Grouped by salesperson */}
        <div className="space-y-10">
          {Array.from(grouped.entries()).map(([name, items]) => {
            const sp = items[0].salesperson;
            return (
              <section key={name}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#E30613] to-[#232F5D] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {sp.initials}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">{name}</h2>
                    <p className="text-white/40 text-sm">
                      {sp.role} &middot; {sp.email}
                    </p>
                  </div>
                  <span className="text-white/20 text-sm ml-auto">
                    {items.length} {items.length === 1 ? 'prezentace' : 'prezentací'}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((p) => (
                    <PresentationCard
                      key={p.id}
                      presentation={p}
                      onDelete={() => handleDelete(p.id)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* External presentations */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <h2 className="text-xl font-semibold text-white/50 mb-4">Externé prezentácie (live)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ExternalCard
              name="INTERSPORT CZ"
              url="https://intersport.enervit.online/"
              pin="intersport2026"
            />
            <ExternalCard
              name="SPORTISIMO"
              url="https://sportisimo.enervit.online/"
              pin="sportisimo2026"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function PresentationCard({
  presentation: p,
  onDelete,
}: {
  presentation: PresentationData;
  onDelete: () => void;
}) {
  const presentationUrl = `/p/${p.slug}`;
  const isGeneral = !p.partnerLogoPath;
  const displayName = isGeneral ? 'Všeobecná' : p.partnerName;

  return (
    <div className="bg-[#1a1a2e] border border-white/10 rounded-xl overflow-hidden hover:border-[#E30613]/30 transition-all">
      <div
        className={`p-4 ${
          isGeneral
            ? 'bg-gradient-to-r from-[#232F5D] to-[#1a1a2e]'
            : 'bg-gradient-to-r from-[#E30613] to-[#8b0000]'
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold">{displayName}</h3>
          <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
            {p.discount} %
          </span>
        </div>
        <p className="text-white/60 text-xs mt-1">PIN: {p.pinCode}</p>
      </div>

      <div className="p-4">
        <div className="flex gap-2">
          <a
            href={presentationUrl}
            target="_blank"
            className="flex-1 bg-[#E30613] hover:bg-[#c00510] text-white text-center py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Otvoriť
          </a>
          <a
            href={`/builder?edit=${p.id}`}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white text-center py-2 rounded-lg text-sm transition-colors"
          >
            Upraviť
          </a>
          <button
            onClick={onDelete}
            className="bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 px-3 py-2 rounded-lg text-sm transition-colors"
          >
            X
          </button>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.origin + presentationUrl);
            alert('URL skopírovaná do schránky!');
          }}
          className="w-full mt-2 text-white/30 hover:text-white/60 text-xs text-center py-1 transition-colors"
        >
          Kopírovať URL
        </button>
      </div>
    </div>
  );
}

function ExternalCard({ name, url, pin }: { name: string; url: string; pin: string }) {
  return (
    <div className="bg-[#1a1a2e] border border-white/10 rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-[#232F5D] to-[#1a1a2e] p-4">
        <h3 className="text-white font-bold">{name}</h3>
        <p className="text-white/50 text-xs mt-1">PIN: {pin}</p>
      </div>
      <div className="p-4">
        <p className="text-white/40 text-xs mb-3">Hostovaná externě na vlastní doméně</p>
        <a
          href={url}
          target="_blank"
          className="block w-full bg-white/10 hover:bg-white/20 text-white text-center py-2 rounded-lg text-sm transition-colors"
        >
          Otvoriť
        </a>
      </div>
    </div>
  );
}
