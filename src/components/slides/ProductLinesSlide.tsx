'use client';

import { t, Locale } from '@/data/translations';

interface Props { locale: Locale; }

const lines = [
  {
    name: 'ENERVIT Sport',
    badge: { cs: 'ZÁKLADNÍ ŘADA', sk: 'ZÁKLADNÁ RADA', en: 'CORE LINE' },
    desc: {
      cs: 'Kompletní portfolio pro každodenní sportování a rekreační sportovce',
      sk: 'Kompletné portfólio pre každodenné športovanie a rekreačných športovcov',
      en: 'Complete portfolio for everyday sports and recreational athletes',
    },
    products: {
      cs: 'Gel 25 ml · Competition Bar · Carbo Tablets · Isotonic Drink · Salt Caps · Magnesium Sport · R2 Recovery · After Sport Drink',
      sk: 'Gel 25 ml · Competition Bar · Carbo Tablets · Isotonic Drink · Salt Caps · Magnesium Sport · R2 Recovery · After Sport Drink',
      en: 'Gel 25 ml · Competition Bar · Carbo Tablets · Isotonic Drink · Salt Caps · Magnesium Sport · R2 Recovery · After Sport Drink',
    },
    color: '#E3001B',
    icon: '⚡',
  },
  {
    name: 'C2:1PRO',
    badge: { cs: 'MAX. VÝKON', sk: 'MAX. VÝKON', en: 'MAX. PERFORMANCE' },
    desc: {
      cs: 'Patentovaná technologie pro maximální výkon při dlouhých závodech',
      sk: 'Patentovaná technológia pre maximálny výkon pri dlhých pretekoch',
      en: 'Patented technology for maximum performance during long races',
    },
    products: {
      cs: 'Carbo Gel C2:1 · Carbo Gel s kofeinem · Carbo Gel se sodíkem · Carbo Bar C2:1 · Isocarb C2:1 · Carbo Chews · Carbo Jelly',
      sk: 'Carbo Gel C2:1 · Carbo Gel s kofeínom · Carbo Gel so sodíkom · Carbo Bar C2:1 · Isocarb C2:1 · Carbo Chews · Carbo Jelly',
      en: 'Carbo Gel C2:1 · Carbo Gel with caffeine · Carbo Gel with sodium · Carbo Bar C2:1 · Isocarb C2:1 · Carbo Chews · Carbo Jelly',
    },
    color: '#FF6B35',
    icon: '🔥',
  },
  {
    name: 'PURE-PRO',
    badge: { cs: 'TRÉNINK', sk: 'TRÉNING', en: 'TRAINING' },
    desc: {
      cs: 'Čistá výživa bez kompromisů pro náročné tréninky',
      sk: 'Čistá výživa bez kompromisov pre náročné tréningy',
      en: 'Clean nutrition without compromise for demanding workouts',
    },
    products: {
      cs: 'Electrolytes Boost · Pre-Workout Boost · 100% Whey Protein · BCAA · Creatine · 100% L-Glutamin',
      sk: 'Electrolytes Boost · Pre-Workout Boost · 100% Whey Protein · BCAA · Creatine · 100% L-Glutamín',
      en: 'Electrolytes Boost · Pre-Workout Boost · 100% Whey Protein · BCAA · Creatine · 100% L-Glutamine',
    },
    color: '#4CAF50',
    icon: '💪',
  },
];

export default function ProductLinesSlide({ locale }: Props) {
  const content = t(locale, 'product_lines');

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
        <p className="text-sm text-white/50 mb-10 animate-fade-in-up animate-delay-1">
          {content.subtitle}
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          {lines.map((line, i) => (
            <div key={line.name} className={`product-card animate-fade-in-up animate-delay-${Math.min(i + 2, 6)}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">{line.icon}</div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: line.color }}>
                    {line.badge[locale]}
                  </div>
                  <div className="text-white font-bold text-lg">{line.name}</div>
                </div>
              </div>
              <p className="text-white/50 text-sm mb-4 leading-relaxed">{line.desc[locale]}</p>
              <div className="border-t border-white/10 pt-3">
                <div className="text-[10px] text-white/30 uppercase tracking-wider mb-2">
                  {locale === 'en' ? 'Key Products' : 'Klíčové produkty'}:
                </div>
                <p className="text-white/40 text-xs leading-relaxed">{line.products[locale]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
