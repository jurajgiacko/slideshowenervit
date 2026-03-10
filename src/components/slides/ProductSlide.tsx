'use client';

import { t, Locale } from '@/data/translations';

interface Props { locale: Locale; }

const productCategories = [
  { key: 'PRE-RACE', color: '#E3001B', icon: '⚡' },
  { key: 'DURING', color: '#FF6B35', icon: '🔥' },
  { key: 'RECOVERY', color: '#4CAF50', icon: '💚' },
  { key: 'DAILY', color: '#0066B3', icon: '☀️' },
];

export default function ProductSlide({ locale }: Props) {
  const content = t(locale, 'enervit_products');

  return (
    <div className="slide bg-[var(--slide-bg)] text-white">
      <div className="slide-content">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#E3001B] rounded-xl flex items-center justify-center">
            <span className="text-lg font-bold">E</span>
          </div>
          <span className="text-[#E3001B] text-sm font-semibold uppercase tracking-widest">Portfolio</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-3 animate-fade-in-up">
          {content.title}
        </h2>
        <p className="text-lg text-white/50 mb-10 animate-fade-in-up animate-delay-1">
          {content.subtitle}
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {content.items?.map((item, i) => {
            const cat = productCategories[i];
            return (
              <div key={i} className={`product-card animate-fade-in-up animate-delay-${Math.min(i + 2, 6)}`}>
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                    style={{ background: `${cat?.color}15`, }}
                  >
                    {cat?.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: cat?.color }}>
                      {cat?.key}
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {item.replace(/^[A-Z-]+ — /, '')}
                    </p>
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
