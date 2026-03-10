'use client';

import { t, Locale } from '@/data/translations';

interface Props { locale: Locale; }

export default function PartnershipsSlide({ locale }: Props) {
  const content = t(locale, 'partnerships');

  return (
    <div className="slide bg-[var(--slide-bg)] text-white">
      <div className="slide-content">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
            <span className="text-lg">🤝</span>
          </div>
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">Partnerships</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-3 animate-fade-in-up">
          {content.title}
        </h2>
        <p className="text-lg text-white/50 mb-10 animate-fade-in-up animate-delay-1">
          {content.subtitle}
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {content.items?.map((item, i) => (
            <div key={i} className={`product-card animate-fade-in-up animate-delay-${Math.min(i + 2, 6)}`}>
              <p className="text-white/80 text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center animate-fade-in-up animate-delay-6">
          <div className="inline-flex items-center gap-6 text-white/20 text-xs">
            <span>Jizerská 50</span>
            <span>•</span>
            <span>ROAD CLASSICS</span>
            <span>•</span>
            <span>Český paralympijský výbor</span>
            <span>•</span>
            <span>ATT Pro Cycling</span>
          </div>
        </div>
      </div>
    </div>
  );
}
