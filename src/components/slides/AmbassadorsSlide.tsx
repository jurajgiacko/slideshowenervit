'use client';

import { t, Locale } from '@/data/translations';

interface Props { locale: Locale; }

const ambassadors = [
  {
    name: 'Jannik Sinner',
    sport: { cs: 'Tenis', sk: 'Tenis', en: 'Tennis' },
    detail: { cs: '#1 ATP, 4× Grand Slam', sk: '#1 ATP, 4× Grand Slam', en: '#1 ATP, 4× Grand Slam' },
    emoji: '🎾',
    color: '#E3001B',
  },
  {
    name: 'Tadej Pogačar',
    sport: { cs: 'Cyklistika · UAE Team Emirates', sk: 'Cyklistika · UAE Team Emirates', en: 'Cycling · UAE Team Emirates' },
    detail: { cs: '4× Tour de France, 2× mistr světa', sk: '4× Tour de France, 2× majster sveta', en: '4× Tour de France, 2× World Champion' },
    emoji: '🚴',
    color: '#FF6B35',
  },
  {
    name: 'Federico Pellegrino',
    sport: { cs: 'Běh na lyžích', sk: 'Beh na lyžiach', en: 'Cross-country Skiing' },
    detail: { cs: '7× medailista MS', sk: '7× medailista MS', en: '7× World Championship medalist' },
    emoji: '🎿',
    color: '#0066B3',
  },
  {
    name: 'Isaac Del Toro',
    sport: { cs: 'Cyklistika · UAE Team Emirates', sk: 'Cyklistika · UAE Team Emirates', en: 'Cycling · UAE Team Emirates' },
    detail: { cs: 'Vycházející hvězda, osobní smlouva', sk: 'Vychádzajúca hviezda, osobná zmluva', en: 'Rising star, personal contract' },
    emoji: '⭐',
    color: '#4CAF50',
  },
  {
    name: 'Francesco Puppi',
    sport: { cs: 'Trail Running', sk: 'Trail Running', en: 'Trail Running' },
    detail: { cs: 'Vítěz CCC Chamonix', sk: 'Víťaz CCC Chamonix', en: 'CCC Chamonix winner' },
    emoji: '🏔️',
    color: '#9C27B0',
  },
];

export default function AmbassadorsSlide({ locale }: Props) {
  const content = t(locale, 'ambassadors');

  return (
    <div className="slide bg-[var(--slide-bg)] text-white">
      <div className="slide-content">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#E3001B] rounded-xl flex items-center justify-center">
            <span className="text-lg font-bold">E</span>
          </div>
          <span className="text-[#E3001B] text-sm font-semibold uppercase tracking-widest">Ambassadors</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-3 animate-fade-in-up">
          {content.title}
        </h2>
        <p className="text-sm text-white/40 mb-10 animate-fade-in-up animate-delay-1">
          {content.subtitle}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ambassadors.map((a, i) => (
            <div key={a.name} className={`product-card animate-fade-in-up animate-delay-${Math.min(i + 2, 6)}`}>
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                  style={{ background: `${a.color}15` }}
                >
                  {a.emoji}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{a.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: a.color }}>{a.sport[locale]}</div>
                  <div className="text-white/40 text-xs mt-1">{a.detail[locale]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-white/15 text-xs animate-fade-in-up animate-delay-6">
          SINNER · POGAČAR · PELLEGRINO · DEL TORO · PUPPI
        </div>
      </div>
    </div>
  );
}
