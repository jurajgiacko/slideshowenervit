'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { slideDefinitions, categoryLabels } from '@/data/slides';
import { teamMembers } from '@/data/team';
import { encodeConfig, PARTNER_LOGOS, PresentationConfig } from '@/lib/config';
import { Locale } from '@/data/translations';
import PresentationViewer from '@/components/PresentationViewer';

const SLIDE_LABELS: Record<string, Record<string, string>> = {
  title: { cs: 'Titulní slide', sk: 'Titulný slide', en: 'Title Slide' },
  brand_intro: { cs: 'ENERVIT — Představení značky', sk: 'ENERVIT — Predstavenie značky', en: 'ENERVIT — Brand Intro' },
  enervit_products: { cs: 'Produktové portfolio', sk: 'Produktové portfólio', en: 'Product Portfolio' },
  royalbay: { cs: 'ROYAL BAY — Komprese', sk: 'ROYAL BAY — Kompresia', en: 'ROYAL BAY — Compression' },
  events: { cs: 'Eventová sezóna 2026', sk: 'Eventová sezóna 2026', en: 'Event Season 2026' },
  partnerships: { cs: 'Strategická partnerství', sk: 'Strategické partnerstvá', en: 'Strategic Partnerships' },
  b2b_program: { cs: 'B2B partnerský program', sk: 'B2B partnerský program', en: 'B2B Partner Program' },
  contact: { cs: 'Kontakt', sk: 'Kontakt', en: 'Contact' },
};

export default function BuilderPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const [locale, setLocale] = useState<Locale>('cs');
  const [partnerKey, setPartnerKey] = useState('general');
  const [partnerName, setPartnerName] = useState('');
  const [salesPerson, setSalesPerson] = useState('');
  const [selectedSlides, setSelectedSlides] = useState<number[]>(
    slideDefinitions.filter(s => s.defaultEnabled).map(s => s.id)
  );
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem('vitar_slideshow_auth');
    if (!session) {
      router.replace('/login');
      return;
    }
    try {
      const data = JSON.parse(session);
      if (Date.now() - data.timestamp > 8 * 60 * 60 * 1000) {
        sessionStorage.removeItem('vitar_slideshow_auth');
        router.replace('/login');
        return;
      }
      setCurrentUser(data.username);
      setSalesPerson(data.username);
      setAuthenticated(true);
    } catch {
      router.replace('/login');
    }
  }, [router]);

  const toggleSlide = (id: number) => {
    const slide = slideDefinitions.find(s => s.id === id);
    if (slide?.required) return;
    setSelectedSlides(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id].sort((a, b) => a - b)
    );
  };

  const generateLink = () => {
    const config: PresentationConfig = {
      partner: partnerName || PARTNER_LOGOS[partnerKey]?.name || '',
      logo: partnerKey,
      locale,
      slides: selectedSlides,
      salesPerson,
    };
    return `${window.location.origin}/p/${encodeConfig(config)}`;
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generateLink());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const logout = () => {
    sessionStorage.removeItem('vitar_slideshow_auth');
    router.replace('/login');
  };

  if (!authenticated) return null;

  if (showPreview) {
    return (
      <div>
        <button
          onClick={() => setShowPreview(false)}
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-xl text-white/70 hover:text-white text-sm transition cursor-pointer"
        >
          &larr; Zpět do builderu
        </button>
        <PresentationViewer
          locale={locale}
          selectedSlides={selectedSlides}
          partnerLogo={partnerKey}
          partnerName={partnerName || PARTNER_LOGOS[partnerKey]?.name}
          salesPerson={salesPerson}
        />
      </div>
    );
  }

  const categories = [...new Set(slideDefinitions.map(s => s.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#E3001B] rounded-xl flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8" /><path d="M12 17v4" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Presentation Builder</h1>
              <p className="text-xs text-gray-400">ENERVIT & ROYAL BAY</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{teamMembers[currentUser]?.name || currentUser}</span>
            <button onClick={logout} className="text-xs text-gray-400 hover:text-red-500 transition cursor-pointer">
              Odhlásit
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Settings panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Partner */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Partner</h3>
              <select
                value={partnerKey}
                onChange={(e) => { setPartnerKey(e.target.value); setPartnerName(''); }}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 mb-3 focus:outline-none focus:border-[#E3001B]/50"
              >
                <option value="general">Všeobecná prezentace</option>
                {Object.entries(PARTNER_LOGOS).filter(([k]) => k !== 'general').map(([key, val]) => (
                  <option key={key} value={key}>{val.name}</option>
                ))}
              </select>
              {partnerKey !== 'general' && (
                <input
                  type="text"
                  placeholder="Vlastní název partnera (volitelné)"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#E3001B]/50"
                />
              )}
            </div>

            {/* Language */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Jazyk</h3>
              <div className="flex gap-2">
                {(['cs', 'sk', 'en'] as Locale[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                      locale === l
                        ? 'bg-[#E3001B] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Sales person */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Obchodní zástupce</h3>
              <select
                value={salesPerson}
                onChange={(e) => setSalesPerson(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#E3001B]/50"
              >
                {Object.entries(teamMembers).map(([key, member]) => (
                  <option key={key} value={key}>{member.name}</option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => setShowPreview(true)}
                className="w-full py-3 bg-[#E3001B] hover:bg-[#c5001a] text-white font-semibold rounded-xl transition cursor-pointer"
              >
                Zobrazit prezentaci
              </button>
              <button
                onClick={copyLink}
                className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition cursor-pointer"
              >
                {copied ? '✓ Odkaz zkopírován!' : 'Zkopírovat odkaz pro partnera'}
              </button>
            </div>
          </div>

          {/* Slide selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-6 uppercase tracking-wider">
                Slidy ({selectedSlides.length} vybráno)
              </h3>

              {categories.map((cat) => (
                <div key={cat} className="mb-6 last:mb-0">
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                    {categoryLabels[cat]?.[locale] || cat}
                  </div>
                  <div className="space-y-2">
                    {slideDefinitions.filter(s => s.category === cat).map((slide) => {
                      const isSelected = selectedSlides.includes(slide.id);
                      return (
                        <button
                          key={slide.id}
                          onClick={() => toggleSlide(slide.id)}
                          disabled={slide.required}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl border transition text-left cursor-pointer ${
                            isSelected
                              ? 'bg-[#E3001B]/5 border-[#E3001B]/20'
                              : 'bg-gray-50 border-gray-100 hover:border-gray-300'
                          } ${slide.required ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-[#E3001B] border-[#E3001B]' : 'border-gray-300'
                          }`}>
                            {isSelected && (
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-800">
                              {SLIDE_LABELS[slide.key]?.[locale] || slide.key}
                            </div>
                            {slide.required && (
                              <span className="text-[10px] text-[#E3001B] font-medium uppercase">Povinný</span>
                            )}
                          </div>
                          <span className="text-xs text-gray-400">#{slide.id}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
