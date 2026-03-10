'use client';

import { t, Locale } from '@/data/translations';

interface Props { locale: Locale; }

export default function EventsSlide({ locale }: Props) {
  const content = t(locale, 'events');

  return (
    <div className="slide bg-[var(--slide-bg)] text-white">
      <div className="slide-content">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
            <span className="text-lg">🏆</span>
          </div>
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Events</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-3 animate-fade-in-up">
          {content.title}
        </h2>
        <p className="text-lg text-white/50 mb-10 animate-fade-in-up animate-delay-1">
          {content.subtitle}
        </p>

        <div className="space-y-3">
          {content.items?.map((item, i) => (
            <div
              key={i}
              className={`product-card flex items-center gap-4 animate-fade-in-up animate-delay-${Math.min(i + 2, 6)}`}
            >
              <div className="text-2xl flex-shrink-0">{item.split(' ')[0]}</div>
              <div>
                <p className="text-white/90 text-sm font-medium">
                  {item.replace(/^[^\s]+ /, '').split(' — ')[0]}
                </p>
                {item.includes(' — ') && (
                  <p className="text-white/40 text-xs mt-0.5">
                    {item.split(' — ')[1]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
