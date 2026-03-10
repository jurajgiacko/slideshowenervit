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
  const logo = partnerLogo ? PARTNER_LOGOS[partnerLogo] : undefined;
  const partner = partnerName || (logo ? logo.name : '') || '';

  return (
    <div className="slide bg-[var(--slide-bg)] text-white">
      <div className="slide-content text-center">
        <div className="mb-8 animate-fade-in-up animate-delay-1">
          <div className="inline-flex items-center gap-3">
            <div className="w-14 h-14 bg-[#E3001B] rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20">
              <span className="text-2xl font-black">E</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-white/40 uppercase tracking-[0.3em] mb-2 animate-fade-in-up animate-delay-1">
          The Positive Nutrition Company
        </p>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight animate-fade-in-up animate-delay-2">
          {content.title}
          {partner && (
            <>
              <br />
              <span className="text-white/40">{locale === 'en' ? 'for' : locale === 'sk' ? 'pre' : 'pro'} </span>
              <span className="text-[#E3001B]">{partner}</span>
            </>
          )}
        </h1>

        <p className="text-lg md:text-xl text-white/50 font-light mb-2 animate-fade-in-up animate-delay-3">
          {content.subtitle}
        </p>

        {partner && (
          <div className="mt-10 animate-fade-in-up animate-delay-4">
            <div className="inline-flex items-center gap-4">
              <div className="w-10 h-10 bg-[#E3001B] rounded-xl flex items-center justify-center">
                <span className="text-sm font-bold">E</span>
              </div>
              <span className="text-white/20 text-2xl">×</span>
              <div className="partner-logo-area">
                <span className="text-white font-semibold">{partner}</span>
              </div>
            </div>
          </div>
        )}

        <p className="mt-10 text-white/20 text-xs animate-fade-in-up animate-delay-5">
          {content.description}
        </p>

        <div className="mt-6 text-white/15 text-xs animate-fade-in-up animate-delay-6">
          VITAR Sport s.r.o. • www.enervit.cz
        </div>
      </div>
    </div>
  );
}
