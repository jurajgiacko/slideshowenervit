'use client';

import { t, Locale } from '@/data/translations';

interface Props { locale: Locale; }

const stats = [
  { value: '70+', label: { cs: 'Let zkušeností', sk: 'Rokov skúseností', en: 'Years of experience' } },
  { value: '44', label: { cs: 'Zemí světa', sk: 'Krajín sveta', en: 'Countries worldwide' } },
  { value: '80+', label: { cs: 'Produktů v portfoliu', sk: 'Produktov v portfóliu', en: 'Products in portfolio' } },
  { value: '#1', label: { cs: 'Na italském trhu', sk: 'Na talianskom trhu', en: 'In Italian market' } },
];

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
        <p className="text-sm text-white/40 italic mb-6 animate-fade-in-up animate-delay-1">
          {content.subtitle}
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-2xl animate-fade-in-up animate-delay-1">
          {content.description}
        </p>

        <div className="space-y-3 mb-10">
          {content.items?.map((item, i) => (
            <div key={i} className={`product-card animate-fade-in-up animate-delay-${Math.min(i + 2, 6)}`}>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#E3001B]/10 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-[#E3001B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white/70 text-sm">{item}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4 animate-fade-in-up animate-delay-6">
          {stats.map((s) => (
            <div key={s.value} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[#E3001B] font-extrabold text-2xl">{s.value}</div>
              <div className="text-white/40 text-xs mt-1">{s.label[locale]}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-white/20 text-xs animate-fade-in-up animate-delay-6">
          <strong>Distributor pro ČR a SR:</strong> VITAR Sport, s.r.o. — exkluzivní distributor s kompletní logistickou a marketingovou podporou.
        </div>
      </div>
    </div>
  );
}
