'use client';

import { t, Locale } from '@/data/translations';

interface Props { locale: Locale; }

const phases = [
  {
    icon: '⚡',
    title: { cs: 'Před sportem', sk: 'Pred športom', en: 'Before Sport' },
    items: { cs: 'PRE Sport, Carbo Flow, Pre-Workout Boost', sk: 'PRE Sport, Carbo Flow, Pre-Workout Boost', en: 'PRE Sport, Carbo Flow, Pre-Workout Boost' },
    color: '#E3001B',
  },
  {
    icon: '🔥',
    title: { cs: 'Během sportu', sk: 'Počas športu', en: 'During Sport' },
    items: { cs: 'Gel, Isotonic, Carbo Gel C2:1, Bars, Carbo Tablets', sk: 'Gel, Isotonic, Carbo Gel C2:1, Bars, Carbo Tablets', en: 'Gel, Isotonic, Carbo Gel C2:1, Bars, Carbo Tablets' },
    color: '#FF6B35',
  },
  {
    icon: '💚',
    title: { cs: 'Regenerace', sk: 'Regenerácia', en: 'Recovery' },
    items: { cs: 'R2 Recovery, Whey Protein, BCAA, Glutamin', sk: 'R2 Recovery, Whey Protein, BCAA, Glutamín', en: 'R2 Recovery, Whey Protein, BCAA, Glutamine' },
    color: '#4CAF50',
  },
  {
    icon: '🧪',
    title: { cs: 'Vitamíny a minerály', sk: 'Vitamíny a minerály', en: 'Vitamins & Minerals' },
    items: { cs: 'Salt Caps, Magnesium, Electrolytes Boost, Vitamíny C, Multi, Fe', sk: 'Salt Caps, Magnesium, Electrolytes Boost, Vitamíny C, Multi, Fe', en: 'Salt Caps, Magnesium, Electrolytes Boost, Vitamins C, Multi, Fe' },
    color: '#0066B3',
  },
];

export default function PortfolioSlide({ locale }: Props) {
  const content = t(locale, 'portfolio');

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

        <div className="flex items-center gap-4 mb-10">
          {[
            { cs: 'PŘED SPORTEM', sk: 'PRED ŠPORTOM', en: 'BEFORE' },
            { cs: 'BĚHEM SPORTU', sk: 'POČAS ŠPORTU', en: 'DURING' },
            { cs: 'REGENERACE', sk: 'REGENERÁCIA', en: 'RECOVERY' },
            { cs: 'VITAMÍNY', sk: 'VITAMÍNY', en: 'VITAMINS' },
          ].map((label, i) => (
            <div key={i} className="flex-1 text-center">
              <div className={`text-[10px] font-bold uppercase tracking-wider animate-fade-in-up animate-delay-${i + 1}`}
                style={{ color: phases[i].color }}>
                {label[locale]}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {phases.map((phase, i) => (
            <div key={i} className={`product-card animate-fade-in-up animate-delay-${Math.min(i + 2, 6)}`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                  style={{ background: `${phase.color}15` }}>
                  {phase.icon}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{phase.title[locale]}</div>
                  <p className="text-white/40 text-xs mt-1 leading-relaxed">{phase.items[locale]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="product-card animate-fade-in-up animate-delay-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/15 flex items-center justify-center flex-shrink-0 text-xl">🔬</div>
            <div>
              <div className="text-[#FF6B35] font-bold text-sm">
                {locale === 'en' ? 'C2:1 Technology — competitive advantage' : 'Technologie C2:1 — konkurenční výhoda'}
              </div>
              <p className="text-white/50 text-xs mt-1 leading-relaxed">{content.subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
