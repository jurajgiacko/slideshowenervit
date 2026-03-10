'use client';

import { t, Locale } from '@/data/translations';
import { PARTNER_LOGOS } from '@/lib/config';

interface Props { locale: Locale; partnerLogo?: string; partnerName?: string; }

export default function WhyEnervitSlide({ locale, partnerLogo, partnerName }: Props) {
  const content = t(locale, 'why_enervit');
  const partner = partnerName || (partnerLogo ? PARTNER_LOGOS[partnerLogo]?.name : '') || '';
  const title = partner
    ? `${content.title?.replace('?', '')} ${locale === 'en' ? 'for' : locale === 'sk' ? 'pre' : 'pro'} ${partner}?`
    : content.title;

  return (
    <div className="slide bg-[var(--slide-bg)] text-white">
      <div className="slide-content">
        <div className="flex items-center gap-3 mb-2">
          {partner && (
            <>
              <div className="w-10 h-10 bg-[#E3001B] rounded-xl flex items-center justify-center">
                <span className="text-lg font-bold">E</span>
              </div>
              <span className="text-white/20 text-lg">×</span>
              <span className="text-white/60 text-sm font-semibold uppercase tracking-widest">{partner}</span>
            </>
          )}
          {!partner && (
            <>
              <div className="w-10 h-10 bg-[#E3001B] rounded-xl flex items-center justify-center">
                <span className="text-lg font-bold">E</span>
              </div>
              <span className="text-[#E3001B] text-sm font-semibold uppercase tracking-widest">ENERVIT</span>
            </>
          )}
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-3 animate-fade-in-up">{title}</h2>
        <p className="text-sm text-white/50 mb-10 animate-fade-in-up animate-delay-1">{content.subtitle}</p>

        <div className="grid md:grid-cols-2 gap-4">
          {content.items?.map((item, i) => {
            const emoji = item.match(/^([\p{Emoji}\u200d]+)/u)?.[1] || '';
            const text = item.replace(/^[\p{Emoji}\u200d]+\s*/u, '');
            const [bold, ...rest] = text.split(' — ');
            return (
              <div key={i} className={`product-card animate-fade-in-up animate-delay-${Math.min(i + 2, 6)}`}>
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0">{emoji}</div>
                  <div>
                    <div className="text-white font-semibold text-sm">{bold}</div>
                    {rest.length > 0 && (
                      <p className="text-white/40 text-xs mt-1 leading-relaxed">{rest.join(' — ')}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
