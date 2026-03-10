'use client';

import { t, Locale } from '@/data/translations';

interface Props { locale: Locale; }

const products = [
  { name: 'Carbo Gel C2:1',       line: 'C2:1',  moc: '87 Kč',  nc: '50,49 Kč' },
  { name: 'Gel 25 ml',            line: 'Sport', moc: '54 Kč',  nc: '31,34 Kč' },
  { name: 'Competition Bar 30 g', line: 'Sport', moc: '48 Kč',  nc: '27,86 Kč' },
  { name: 'Isotonic Drink 420 g', line: 'Sport', moc: '339 Kč', nc: '196,74 Kč' },
  { name: 'Electrolytes Boost',   line: 'PURE',  moc: '239 Kč', nc: '138,71 Kč' },
];

const included = {
  cs: [
    'POS materiály pro prodejny',
    'Školení personálu (online + prezenční)',
    'Vstupní balíček vzorků pro zaměstnance',
    'Výměna zboží 60 dní před expirací',
    'Individuální závozy na každou prodejnu',
    'Expedice do 5 pracovních dnů (skladem)',
    'Doprava zdarma nad 5 000 Kč',
    'Splatnost 30 dní',
    'Bez minimální objednávky',
  ],
  sk: [
    'POS materiály pre predajne',
    'Školenie personálu (online + prezenčné)',
    'Vstupný balíček vzoriek pre zamestnancov',
    'Výmena tovaru 60 dní pred expiráciou',
    'Individuálne závozy na každú predajňu',
    'Expedícia do 5 pracovných dní (skladom)',
    'Doprava zadarmo nad 5 000 Kč',
    'Splatnosť 30 dní',
    'Bez minimálnej objednávky',
  ],
  en: [
    'POS materials for stores',
    'Staff training (online + in-person)',
    'Starter sample pack for employees',
    'Product exchange 60 days before expiry',
    'Individual deliveries to each store',
    'Shipping within 5 business days (in stock)',
    'Free shipping over 5,000 CZK',
    'Payment terms: 30 days',
    'No minimum order',
  ],
};

export default function PricingSlide({ locale }: Props) {
  const content = t(locale, 'pricing');

  return (
    <div className="slide bg-[var(--slide-bg)] text-white">
      <div className="slide-content">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#E3001B] rounded-xl flex items-center justify-center">
            <span className="text-lg font-bold">E</span>
          </div>
          <span className="text-[#E3001B] text-sm font-semibold uppercase tracking-widest">Pricing</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-3 animate-fade-in-up">{content.title}</h2>
        <p className="text-sm text-white/50 mb-8 animate-fade-in-up animate-delay-1">{content.subtitle}</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="animate-fade-in-up animate-delay-2">
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <div className="bg-white/5 px-4 py-3 border-b border-white/10">
                <div className="grid grid-cols-4 text-[10px] text-white/40 uppercase tracking-wider font-medium">
                  <div className="col-span-1">{locale === 'en' ? 'Product' : 'Produkt'}</div>
                  <div>{locale === 'en' ? 'Line' : 'Řada'}</div>
                  <div>MOC</div>
                  <div>{locale === 'en' ? 'Your price' : 'Vaše NC'}</div>
                </div>
              </div>
              {products.map((p, i) => (
                <div key={i} className="px-4 py-3 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition">
                  <div className="grid grid-cols-4 text-xs">
                    <div className="col-span-1 text-white/80 font-medium">{p.name}</div>
                    <div className="text-white/40">{p.line}</div>
                    <div className="text-white/40">{p.moc}</div>
                    <div className="text-[#E3001B] font-semibold">{p.nc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 mt-4">
              <div className="text-center">
                <div className="text-[#E3001B] font-extrabold text-3xl">35 %</div>
                <div className="text-white/30 text-[10px] uppercase tracking-wider">
                  {locale === 'en' ? 'Discount from RRP' : 'Sleva z MOC'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-[#E3001B] font-extrabold text-3xl">80+</div>
                <div className="text-white/30 text-[10px] uppercase tracking-wider">
                  {locale === 'en' ? 'Products' : 'Produktů'}
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up animate-delay-3">
            <div className="text-xs text-white/30 uppercase tracking-wider font-medium mb-3">
              ✓ {locale === 'en' ? 'Included in price' : locale === 'sk' ? 'Zahrnuté v cene' : 'Co je zahrnuto v ceně'}:
            </div>
            <div className="space-y-2">
              {included[locale].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[#4CAF50] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/60 text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
