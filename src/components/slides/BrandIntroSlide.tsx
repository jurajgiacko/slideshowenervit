'use client';

import { t, Locale } from '@/data/translations';

interface Props { locale: Locale; }

export default function BrandIntroSlide({ locale }: Props) {
  const content = t(locale, 'brand_intro');

  return (
    <div className="slide bg-[var(--slide-bg)] text-white">
      <div className="slide-content">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#E3001B] rounded-xl flex items-center justify-center">
            <span className="text-lg font-bold">E</span>
          </div>
          <span className="text-[#E3001B] text-sm font-semibold uppercase tracking-widest">ENERVIT</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-3 animate-fade-in-up">
          {content.title}
        </h2>
        <p className="text-lg text-white/50 mb-10 animate-fade-in-up animate-delay-1">
          {content.subtitle}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {content.items?.map((item, i) => (
            <div
              key={i}
              className={`product-card animate-fade-in-up animate-delay-${Math.min(i + 2, 6)}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#E3001B]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#E3001B] text-sm font-bold">{i + 1}</span>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
