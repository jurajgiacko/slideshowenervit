'use client';

import { t, Locale } from '@/data/translations';

interface Props { locale: Locale; }

export default function RoyalBaySlide({ locale }: Props) {
  const content = t(locale, 'royalbay');

  return (
    <div className="slide bg-[var(--slide-bg)] text-white">
      <div className="slide-content">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#0066B3] rounded-xl flex items-center justify-center">
            <span className="text-lg font-bold">R</span>
          </div>
          <span className="text-[#0066B3] text-sm font-semibold uppercase tracking-widest">ROYAL BAY</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-3 animate-fade-in-up">
          {content.title}
        </h2>
        <p className="text-lg text-white/50 italic mb-10 animate-fade-in-up animate-delay-1">
          {content.subtitle}
        </p>

        <div className="space-y-4">
          {content.items?.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 product-card animate-fade-in-up animate-delay-${Math.min(i + 2, 6)}`}
            >
              <div className="w-8 h-8 bg-[#0066B3]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#0066B3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white/80 text-sm">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4 animate-fade-in-up animate-delay-6">
          {['Sport', 'Recovery', 'Medical'].map((cat) => (
            <div key={cat} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[#0066B3] font-bold text-lg">{cat}</div>
              <div className="text-white/40 text-xs mt-1">Collection</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
