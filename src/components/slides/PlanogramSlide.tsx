'use client';

import { t, Locale } from '@/data/translations';

interface Props { locale: Locale; }

const shelves = [
  {
    label: { cs: 'POLICE 1 — Enervit Sport', sk: 'POLICA 1 — Enervit Sport', en: 'SHELF 1 — Enervit Sport' },
    color: '#E3001B',
    items: ['PRE Sport\npomeranč', 'PRE Sport\ncola', 'Gel 25ml\npomeranč', 'Gel 25ml\ncitron', 'Gel kofein\ncitrus', 'Carbo Tab\n24ks citron'],
  },
  {
    label: { cs: 'POLICE 2 — C2:1PRO', sk: 'POLICA 2 — C2:1PRO', en: 'SHELF 2 — C2:1PRO' },
    color: '#FF6B35',
    items: ['Carbo Gel\nmango', 'Carbo Gel\npomeranč', 'Gel + Na\ncitron', 'Gel kofein\ncola', 'Jelly\ntropic', 'Chews\npomeranč', 'Bar + Na\narašíd'],
  },
  {
    label: { cs: 'POLICE 3 — Nápoje a regenerace', sk: 'POLICA 3 — Nápoje a regenerácia', en: 'SHELF 3 — Drinks & Recovery' },
    color: '#4CAF50',
    items: ['Isotonic\ncitron', 'Isotonic\npomeranč', 'Isocarb\ncitron', 'Electrolytes\ncitron', 'Magnesium\ncitron', 'R2 Recovery\n400g', 'R2 Recovery\n50g', 'After Sport\ncitron'],
  },
];

export default function PlanogramSlide({ locale }: Props) {
  const content = t(locale, 'planogram');

  return (
    <div className="slide bg-[var(--slide-bg)] text-white">
      <div className="slide-content">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#E3001B] rounded-xl flex items-center justify-center">
            <span className="text-lg font-bold">E</span>
          </div>
          <span className="text-[#E3001B] text-sm font-semibold uppercase tracking-widest">Planogram</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in-up">{content.title}</h2>
        <p className="text-sm text-white/50 mb-8 animate-fade-in-up animate-delay-1">{content.subtitle}</p>

        <div className="space-y-4">
          {shelves.map((shelf, si) => (
            <div key={si} className={`animate-fade-in-up animate-delay-${Math.min(si + 2, 6)}`}>
              <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: shelf.color }}>
                {shelf.label[locale]}
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-2">
                {shelf.items.map((item, i) => {
                  const [name, variant] = item.split('\n');
                  return (
                    <div key={i} className="flex-shrink-0 w-20 h-16 rounded-lg border border-white/10 bg-white/5 flex flex-col items-center justify-center p-1.5 hover:bg-white/10 transition">
                      <div className="text-[9px] text-white/70 font-medium text-center leading-tight">{name}</div>
                      <div className="text-[8px] text-white/30 text-center">{variant}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 animate-fade-in-up animate-delay-6">
          <div className="text-center p-3 rounded-xl bg-[#E3001B]/10 border border-[#E3001B]/20">
            <div className="text-white/70 text-xs font-medium">SPORT</div>
            <div className="text-white/30 text-[10px]">12 SKU</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-[#FF6B35]/10 border border-[#FF6B35]/20">
            <div className="text-white/70 text-xs font-medium">C2:1PRO</div>
            <div className="text-white/30 text-[10px]">8 SKU</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-[#4CAF50]/10 border border-[#4CAF50]/20">
            <div className="text-white/70 text-xs font-medium">PURE-PRO</div>
            <div className="text-white/30 text-[10px]">1 SKU</div>
          </div>
        </div>
      </div>
    </div>
  );
}
