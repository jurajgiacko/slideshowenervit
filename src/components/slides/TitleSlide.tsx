'use client';

import { t, Locale } from '@/data/translations';
import { PARTNER_LOGOS } from '@/lib/config';

interface Props {
  locale: Locale;
  partnerLogo?: string;
  partnerName?: string;
}

export default function TitleSlide({ locale, partnerLogo, partnerName }: Props) {
  const content = t(locale, 'title');
  const logo = partnerLogo && PARTNER_LOGOS[partnerLogo];

  return (
    <div className="slide bg-[var(--slide-bg)] text-white">
      <div className="slide-content text-center">
        {logo && logo.name && (
          <div className="partner-logo-area inline-block mb-8 animate-fade-in-up animate-delay-1">
            <span className="text-white/40 text-xs uppercase tracking-widest">
              {locale === 'en' ? 'Prepared for' : locale === 'sk' ? 'Pripravené pre' : 'Připraveno pro'}
            </span>
            <div className="text-2xl font-bold text-white mt-1">{partnerName || logo.name}</div>
          </div>
        )}

        <div className="mb-6 animate-fade-in-up animate-delay-2">
          <div className="inline-flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#E3001B]" />
            <div className="w-14 h-14 bg-[#E3001B] rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20">
              <span className="text-2xl font-black">E</span>
            </div>
            <div className="text-3xl font-light text-white/30">×</div>
            <div className="w-14 h-14 bg-[#0066B3] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-2xl font-black">R</span>
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#0066B3]" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight animate-fade-in-up animate-delay-3">
          <span className="text-[#E3001B]">ENERVIT</span>
          <span className="text-white/30 mx-3">&</span>
          <span className="text-[#0066B3]">ROYAL BAY</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/60 font-light mb-2 animate-fade-in-up animate-delay-4">
          {content.subtitle}
        </p>

        <p className="text-sm text-white/30 animate-fade-in-up animate-delay-5">
          {content.description}
        </p>

        <div className="mt-12 animate-fade-in-up animate-delay-6">
          <div className="inline-flex items-center gap-2 text-white/20 text-xs">
            <span>VITAR Sport s.r.o.</span>
            <span>•</span>
            <span>2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
