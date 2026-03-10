'use client';

import { t, Locale } from '@/data/translations';

interface Props { locale: Locale; }

const highlights = [
  {
    value: '60',
    unit: { cs: 'dní', sk: 'dní', en: 'days' },
    title: { cs: 'Převíjení produktů před expirací', sk: 'Výmena produktov pred expiráciou', en: 'Product exchange before expiry' },
    desc: {
      cs: 'Bezplatná výměna zboží 60 dní před datem spotřeby. Nulové riziko prošlých produktů na prodejně.',
      sk: 'Bezplatná výmena tovaru 60 dní pred dátumom spotreby. Nulové riziko expirovaných produktov na predajni.',
      en: 'Free product exchange 60 days before expiry date. Zero risk of expired products in store.',
    },
    icon: '🔄',
    color: '#4CAF50',
  },
  {
    value: '',
    unit: { cs: '', sk: '', en: '' },
    title: { cs: 'Individuální závozy', sk: 'Individuálne závozy', en: 'Individual deliveries' },
    desc: {
      cs: 'Doručení přímo na jednotlivé prodejny — bez nutnosti centrálního skladu a vlastní redistribuce.',
      sk: 'Doručenie priamo na jednotlivé predajne — bez nutnosti centrálneho skladu a vlastnej redistribúcie.',
      en: 'Delivery directly to individual stores — no need for central warehouse and own redistribution.',
    },
    icon: '🚚',
    color: '#0066B3',
  },
  {
    value: '5',
    unit: { cs: 'dní SLA', sk: 'dní SLA', en: 'days SLA' },
    title: { cs: 'Dodání skladových položek', sk: 'Dodanie skladových položiek', en: 'Delivery of stock items' },
    desc: {
      cs: 'Objednávky expedujeme do 5 pracovních dnů od přijetí (u položek dostupných na skladě).',
      sk: 'Objednávky expedujeme do 5 pracovných dní od prijatia (u položiek dostupných na sklade).',
      en: 'Orders shipped within 5 business days of receipt (for items available in stock).',
    },
    icon: '⚡',
    color: '#FF6B35',
  },
];

const terms = {
  cs: [
    'Sleva: 35 % z doporučené MOC',
    'Splatnost: 30 dní od vystavení faktury',
    'Doprava: zdarma při objednávce nad 5 000 Kč',
    'Dodání: individuálně na každou prodejnu',
    'Expediční lhůta: 5 pracovních dnů (skladem)',
    'Výměna zboží: 60 dní před expirací',
    'Min. objednávka: bez limitu',
    'Objednávky: B2B portál / e-mail',
  ],
  sk: [
    'Zľava: 35 % z doporučenej MOC',
    'Splatnosť: 30 dní od vystavenia faktúry',
    'Doprava: zadarmo pri objednávke nad 5 000 Kč',
    'Dodanie: individuálne na každú predajňu',
    'Expedičná lehota: 5 pracovných dní (skladom)',
    'Výmena tovaru: 60 dní pred expiráciou',
    'Min. objednávka: bez limitu',
    'Objednávky: B2B portál / e-mail',
  ],
  en: [
    'Discount: 35% from recommended RRP',
    'Payment terms: 30 days from invoice date',
    'Shipping: free for orders over 5,000 CZK',
    'Delivery: individually to each store',
    'Shipping time: 5 business days (in stock)',
    'Product exchange: 60 days before expiry',
    'Min. order: no limit',
    'Orders: B2B portal / email',
  ],
};

export default function ConditionsSlide({ locale }: Props) {
  const content = t(locale, 'conditions');

  return (
    <div className="slide bg-[var(--slide-bg)] text-white">
      <div className="slide-content">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#E3001B] rounded-xl flex items-center justify-center">
            <span className="text-lg font-bold">E</span>
          </div>
          <span className="text-[#E3001B] text-sm font-semibold uppercase tracking-widest">Terms</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-3 animate-fade-in-up">{content.title}</h2>
        <p className="text-sm text-white/50 mb-8 animate-fade-in-up animate-delay-1">{content.subtitle}</p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {highlights.map((h, i) => (
            <div key={i} className={`product-card text-center animate-fade-in-up animate-delay-${Math.min(i + 2, 6)}`}>
              <div className="text-3xl mb-3">{h.icon}</div>
              {h.value && (
                <div className="font-extrabold text-2xl" style={{ color: h.color }}>
                  {h.value} <span className="text-sm font-normal text-white/40">{h.unit[locale]}</span>
                </div>
              )}
              <div className="text-white font-semibold text-sm mt-1">{h.title[locale]}</div>
              <p className="text-white/40 text-xs mt-2 leading-relaxed">{h.desc[locale]}</p>
            </div>
          ))}
        </div>

        <div className="product-card animate-fade-in-up animate-delay-5">
          <div className="text-xs text-white/30 uppercase tracking-wider font-medium mb-3">
            📋 {locale === 'en' ? 'Business Terms' : locale === 'sk' ? 'Obchodné podmienky' : 'Obchodní podmínky'}:
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            {terms[locale].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#E3001B] rounded-full flex-shrink-0" />
                <span className="text-white/60 text-xs">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
