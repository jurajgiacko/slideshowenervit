export type Locale = 'cs' | 'sk' | 'en';

export interface SlideContent {
  title: string;
  subtitle?: string;
  items?: string[];
  description?: string;
}

const translations: Record<Locale, Record<string, SlideContent>> = {
  cs: {
    title: {
      title: 'ENERVIT & ROYAL BAY',
      subtitle: 'Váš partner ve sportovní výživě a kompresi',
      description: 'Exkluzivní distribuce pro Česko a Slovensko',
    },
    brand_intro: {
      title: 'ENERVIT — #1 sportovní výživa v Itálii',
      subtitle: 'Od roku 1969. Vědecky ověřené složení.',
      items: [
        'Top 5 značka sportovní výživy v Evropě',
        'Oficiální partner Pro Tour cyklistických týmů',
        'Unikátní Before-During-After systém',
        'Roční obrat CZ+SK: 42M+ CZK',
        'Cílová skupina: výkonnostní i amatérští sportovci',
      ],
    },
    enervit_products: {
      title: 'Produktové portfolio ENERVIT',
      subtitle: '4 kategorie pro kompletní sportovní výživu',
      items: [
        'PRE-RACE — Gely, tyčinky, nápoje pro přípravu',
        'DURING — Izotonické nápoje a gely pro výkon',
        'RECOVERY — Proteiny a regenerační produkty',
        'DAILY — Vitamíny a suplementy pro každý den',
      ],
    },
    royalbay: {
      title: 'ROYAL BAY — High-Tech Sportswear',
      subtitle: 'Better & Faster — for better performance and faster recovery',
      items: [
        'Česká značka s 30+ lety zkušeností (ARIES a.s.)',
        'Certifikovaná graduated compression technologie',
        'ISO 9001:2015 — medicínská kvalita',
        'Kategorie: Sport | Recovery | Medical',
        'Vlastní výroba a kontrola celého řetězce',
      ],
    },
    events: {
      title: 'Eventová sezóna 2026',
      subtitle: 'Jsme tam, kde jsou sportovci',
      items: [
        '🎿 Jizerská 50 — Hlavní nutriční partner (3-letý kontrakt)',
        '🏃 Prague Half Marathon — Expo a aktivace',
        '🏃 Prague Marathon — Expo a aktivace',
        '🚴 ROAD CLASSICS — 4× ročně (3-letý kontrakt)',
        '♿ Český paralympijský výbor — Oficiální nutriční partner',
        '🚴 ATT Investment Pro Cycling Team — Týmový partner',
      ],
    },
    partnerships: {
      title: 'Strategická partnerství 2026–2028',
      subtitle: 'Dlouhodobá stabilita a premium viditelnost',
      items: [
        '3-leté kontrakty s klíčovými sportovními organizacemi',
        'Přístup k 50 000+ sportovců ročně přes eventy',
        'Content a athlete stories pro sociální sítě',
        'VIP zážitky a networking v sportovní komunitě',
      ],
    },
    b2b_program: {
      title: 'B2B partnerský program',
      subtitle: 'Proč spolupracovat s VITAR Sport?',
      items: [
        '✅ Exkluzivní distribuce značek ENERVIT & ROYAL BAY pro CZ/SK',
        '✅ Konkurenceschopné velkoobchodní ceny a marže',
        '✅ Marketingová podpora — POS materiály, sampling, eventy',
        '✅ Pravidelné dodávky ze skladů v ČR',
        '✅ Dedikovaný obchodní zástupce pro váš region',
        '✅ Cross-sell příležitosti: výživa × komprese',
      ],
    },
    contact: {
      title: 'Kontaktujte nás',
      subtitle: 'Váš obchodní zástupce',
    },
    ui: {
      title: 'B2B Prezentace',
      subtitle: 'Vytvořte profesionální prezentaci pro partnera',
      description: 'VITAR Sport — Presentation Builder',
    },
  },
  sk: {
    title: {
      title: 'ENERVIT & ROYAL BAY',
      subtitle: 'Váš partner v športovej výžive a kompresii',
      description: 'Exkluzívna distribúcia pre Česko a Slovensko',
    },
    brand_intro: {
      title: 'ENERVIT — #1 športová výživa v Taliansku',
      subtitle: 'Od roku 1969. Vedecky overené zloženie.',
      items: [
        'Top 5 značka športovej výživy v Európe',
        'Oficiálny partner Pro Tour cyklistických tímov',
        'Unikátny Before-During-After systém',
        'Ročný obrat CZ+SK: 42M+ CZK',
        'Cieľová skupina: výkonnostní aj amatérski športovci',
      ],
    },
    enervit_products: {
      title: 'Produktové portfólio ENERVIT',
      subtitle: '4 kategórie pre kompletnú športovú výživu',
      items: [
        'PRE-RACE — Gély, tyčinky, nápoje pre prípravu',
        'DURING — Izotonické nápoje a gély pre výkon',
        'RECOVERY — Proteíny a regeneračné produkty',
        'DAILY — Vitamíny a suplementy na každý deň',
      ],
    },
    royalbay: {
      title: 'ROYAL BAY — High-Tech Sportswear',
      subtitle: 'Better & Faster — for better performance and faster recovery',
      items: [
        'Česká značka s 30+ rokmi skúseností (ARIES a.s.)',
        'Certifikovaná graduated compression technológia',
        'ISO 9001:2015 — medicínska kvalita',
        'Kategórie: Sport | Recovery | Medical',
        'Vlastná výroba a kontrola celého reťazca',
      ],
    },
    events: {
      title: 'Eventová sezóna 2026',
      subtitle: 'Sme tam, kde sú športovci',
      items: [
        '🎿 Jizerská 50 — Hlavný nutričný partner (3-ročný kontrakt)',
        '🏃 Prague Half Marathon — Expo a aktivácia',
        '🏃 Prague Marathon — Expo a aktivácia',
        '🚴 ROAD CLASSICS — 4× ročne (3-ročný kontrakt)',
        '♿ Český paralympijský výbor — Oficiálny nutričný partner',
        '🚴 ATT Investment Pro Cycling Team — Tímový partner',
      ],
    },
    partnerships: {
      title: 'Strategické partnerstvá 2026–2028',
      subtitle: 'Dlhodobá stabilita a prémiová viditeľnosť',
      items: [
        '3-ročné kontrakty s kľúčovými športovými organizáciami',
        'Prístup k 50 000+ športovcom ročne cez eventy',
        'Content a athlete stories pre sociálne siete',
        'VIP zážitky a networking v športovej komunite',
      ],
    },
    b2b_program: {
      title: 'B2B partnerský program',
      subtitle: 'Prečo spolupracovať s VITAR Sport?',
      items: [
        '✅ Exkluzívna distribúcia značiek ENERVIT & ROYAL BAY pre CZ/SK',
        '✅ Konkurencieschopné veľkoobchodné ceny a marže',
        '✅ Marketingová podpora — POS materiály, sampling, eventy',
        '✅ Pravidelné dodávky zo skladov v ČR',
        '✅ Dedikovaný obchodný zástupca pre váš región',
        '✅ Cross-sell príležitosti: výživa × kompresia',
      ],
    },
    contact: {
      title: 'Kontaktujte nás',
      subtitle: 'Váš obchodný zástupca',
    },
    ui: {
      title: 'B2B Prezentácia',
      subtitle: 'Vytvorte profesionálnu prezentáciu pre partnera',
      description: 'VITAR Sport — Presentation Builder',
    },
  },
  en: {
    title: {
      title: 'ENERVIT & ROYAL BAY',
      subtitle: 'Your partner in sports nutrition & compression',
      description: 'Exclusive distribution for Czech Republic & Slovakia',
    },
    brand_intro: {
      title: 'ENERVIT — #1 Sports Nutrition in Italy',
      subtitle: 'Since 1969. Scientifically proven formulas.',
      items: [
        'Top 5 sports nutrition brand in Europe',
        'Official partner of Pro Tour cycling teams',
        'Unique Before-During-After system',
        'Annual revenue CZ+SK: 42M+ CZK',
        'Target: competitive & amateur athletes',
      ],
    },
    enervit_products: {
      title: 'ENERVIT Product Portfolio',
      subtitle: '4 categories for complete sports nutrition',
      items: [
        'PRE-RACE — Gels, bars, drinks for preparation',
        'DURING — Isotonic drinks and gels for performance',
        'RECOVERY — Proteins and regeneration products',
        'DAILY — Vitamins and supplements for every day',
      ],
    },
    royalbay: {
      title: 'ROYAL BAY — High-Tech Sportswear',
      subtitle: 'Better & Faster — for better performance and faster recovery',
      items: [
        'Czech brand with 30+ years of experience (ARIES a.s.)',
        'Certified graduated compression technology',
        'ISO 9001:2015 — medical-grade quality',
        'Categories: Sport | Recovery | Medical',
        'Own manufacturing and full supply chain control',
      ],
    },
    events: {
      title: 'Event Season 2026',
      subtitle: "We're where the athletes are",
      items: [
        '🎿 Jizerská 50 — Main nutrition partner (3-year contract)',
        '🏃 Prague Half Marathon — Expo & activation',
        '🏃 Prague Marathon — Expo & activation',
        '🚴 ROAD CLASSICS — 4× per year (3-year contract)',
        '♿ Czech Paralympic Committee — Official nutrition partner',
        '🚴 ATT Investment Pro Cycling Team — Team partner',
      ],
    },
    partnerships: {
      title: 'Strategic Partnerships 2026–2028',
      subtitle: 'Long-term stability and premium visibility',
      items: [
        '3-year contracts with key sports organizations',
        'Access to 50,000+ athletes annually through events',
        'Content and athlete stories for social media',
        'VIP experiences and networking in sports community',
      ],
    },
    b2b_program: {
      title: 'B2B Partner Program',
      subtitle: 'Why partner with VITAR Sport?',
      items: [
        '✅ Exclusive distribution of ENERVIT & ROYAL BAY for CZ/SK',
        '✅ Competitive wholesale prices and margins',
        '✅ Marketing support — POS materials, sampling, events',
        '✅ Regular deliveries from CZ warehouses',
        '✅ Dedicated sales representative for your region',
        '✅ Cross-sell opportunities: nutrition × compression',
      ],
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Your sales representative',
    },
    ui: {
      title: 'B2B Presentation',
      subtitle: 'Build a professional presentation for your partner',
      description: 'VITAR Sport — Presentation Builder',
    },
  },
};

export function t(locale: Locale, slideKey: string): SlideContent {
  return translations[locale]?.[slideKey] || translations.cs[slideKey] || { title: slideKey };
}

export default translations;
