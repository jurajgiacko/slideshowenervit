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
      title: 'Obchodní nabídka',
      subtitle: 'Prémiová sportovní výživa pro vaše zákazníky',
      description: 'Kompletní obchodní nabídka včetně cenových podmínek',
    },
    brand_intro: {
      title: 'O značce ENERVIT',
      subtitle: 'The Positive Nutrition Company · Since 1954',
      description: 'ENERVIT je prémiová italská značka sportovní výživy, která od roku 1954 vyvíjí produkty ve spolupráci s vrcholovými sportovci a sportovními vědci. Značka je distribuována ve 44 zemích světa a je lídrem na italském trhu.',
      items: [
        '70+ let zkušeností — jedna z nejstarších značek sportovní výživy v Evropě',
        'Vědecký přístup — vlastní výzkumné centrum, spolupráce s univerzitami',
        'Patentovaná technologie C2:1 — maximální vstřebávání energie',
        'Ambasadoři světové úrovně — Sinner, Pogačar, Del Toro, Puppi',
        'Certifikovaná udržitelnost — EcoVadis Silver Medal',
      ],
    },
    ambassadors: {
      title: 'Ambasadoři světové úrovně',
      subtitle: 'Multi-sport DNA: Cyklistika · Tenis · Běh · Trail Running · Triatlon · Běžecké lyžování',
    },
    product_lines: {
      title: 'Tři specializované produktové řady',
      subtitle: 'Portfolio ENERVIT pokrývá všechny potřeby sportovců — od rekreačních běžců po profesionální vytrvalce.',
    },
    portfolio: {
      title: 'Kompletní portfolio pro každou fázi sportu',
      subtitle: 'Technologie C2:1 — patentovaný poměr sacharidů maltodextrin:fruktóza = 2:1 umožňuje až o 40 % vyšší vstřebávání energie.',
    },
    why_enervit: {
      title: 'Proč ENERVIT?',
      subtitle: 'ENERVIT přináší synergii s vaším sortimentem sportovního vybavení.',
      items: [
        '💰 Prémiové produkty — 35 % sleva z MOC. Vyšší prodejní cena = vyšší absolutní zisk na kus.',
        '🎯 Vaši zákazníci — Aktivní sportovci nakupující u vás vybavení = ideální cílová skupina.',
        '🏆 Prémiový positioning — ENERVIT posiluje image jako odborníka na sport.',
        '📦 Kompletní podpora — POS materiály, školení personálu, marketingová podpora.',
        '🔄 Bez rizika zásob — Výměna zboží 60 dní před expirací. Dodání do 5 pracovních dnů.',
        '📈 Růstový segment — Evropský trh sportovní výživy roste +8 % ročně.',
      ],
    },
    pricing: {
      title: 'Cenové podmínky',
      subtitle: 'Nabízíme 35 % slevu z doporučené maloobchodní ceny (MOC s DPH).',
    },
    planogram: {
      title: 'Doporučený planogram — police 90 cm',
      subtitle: 'Navrženo pro standardní polici 90 cm se 3 úrovněmi. Celkem 21 SKU.',
    },
    support: {
      title: 'Co vám poskytneme',
      subtitle: 'Podpora prodeje přizpůsobená typu prodejny.',
      items: [
        '📦 POS materiály — Stojany, shelf-talkery, plakáty s ambasadory, produktové letáky',
        '🎓 Školení personálu — Online modul (30 min), certifikace "ENERVIT Expert"',
        '📣 Marketingová podpora — Účast na sportovních akcích, společné promo kampaně',
        '🚚 Logistika — Expedice do 5 dní, individuální závozy, doprava zdarma nad 5 000 Kč',
      ],
    },
    conditions: {
      title: 'Klíčové podmínky spolupráce',
      subtitle: 'Transparentní a flexibilní podmínky navržené tak, aby spolupráce byla bezriziková.',
    },
    summary: {
      title: 'Shrnutí nabídky',
      subtitle: 'Váš Key Account Manager',
    },
    thankyou: {
      title: 'Děkujeme za váš čas',
      subtitle: 'Věříme, že ENERVIT bude skvělým doplněním vašeho sortimentu.',
    },
    ui: {
      title: 'Obchodní prezentace',
      subtitle: 'Vytvořte profesionální prezentaci pro partnera',
    },
  },
  sk: {
    title: {
      title: 'Obchodná ponuka',
      subtitle: 'Prémiová športová výživa pre vašich zákazníkov',
      description: 'Kompletná obchodná ponuka vrátane cenových podmienok',
    },
    brand_intro: {
      title: 'O značke ENERVIT',
      subtitle: 'The Positive Nutrition Company · Since 1954',
      description: 'ENERVIT je prémiová talianska značka športovej výživy, ktorá od roku 1954 vyvíja produkty v spolupráci s vrcholovými športovcami a športovými vedcami. Značka je distribuovaná v 44 krajinách sveta a je lídrom na talianskom trhu.',
      items: [
        '70+ rokov skúseností — jedna z najstarších značiek športovej výživy v Európe',
        'Vedecký prístup — vlastné výskumné centrum, spolupráca s univerzitami',
        'Patentovaná technológia C2:1 — maximálne vstrebávanie energie',
        'Ambasádori svetovej úrovne — Sinner, Pogačar, Del Toro, Puppi',
        'Certifikovaná udržateľnosť — EcoVadis Silver Medal',
      ],
    },
    ambassadors: {
      title: 'Ambasádori svetovej úrovne',
      subtitle: 'Multi-sport DNA: Cyklistika · Tenis · Beh · Trail Running · Triatlon · Bežecké lyžovanie',
    },
    product_lines: {
      title: 'Tri špecializované produktové rady',
      subtitle: 'Portfólio ENERVIT pokrýva všetky potreby športovcov — od rekreačných bežcov po profesionálnych vytrvalcov.',
    },
    portfolio: {
      title: 'Kompletné portfólio pre každú fázu športu',
      subtitle: 'Technológia C2:1 — patentovaný pomer sacharidov maltodextrín:fruktóza = 2:1 umožňuje až o 40 % vyššie vstrebávanie energie.',
    },
    why_enervit: {
      title: 'Prečo ENERVIT?',
      subtitle: 'ENERVIT prináša synergiu s vaším sortimentom športového vybavenia.',
      items: [
        '💰 Prémiové produkty — 35 % zľava z MOC. Vyššia predajná cena = vyšší absolútny zisk na kus.',
        '🎯 Vaši zákazníci — Aktívni športovci nakupujúci u vás vybavenie = ideálna cieľová skupina.',
        '🏆 Prémiový positioning — ENERVIT posilňuje image ako odborníka na šport.',
        '📦 Kompletná podpora — POS materiály, školenie personálu, marketingová podpora.',
        '🔄 Bez rizika zásob — Výmena tovaru 60 dní pred expiráciou. Dodanie do 5 pracovných dní.',
        '📈 Rastový segment — Európsky trh športovej výživy rastie +8 % ročne.',
      ],
    },
    pricing: {
      title: 'Cenové podmienky',
      subtitle: 'Ponúkame 35 % zľavu z doporučenej maloobchodnej ceny (MOC s DPH).',
    },
    planogram: {
      title: 'Odporúčaný planogram — polica 90 cm',
      subtitle: 'Navrhnuté pre štandardnú policu 90 cm s 3 úrovňami. Celkom 21 SKU.',
    },
    support: {
      title: 'Čo vám poskytneme',
      subtitle: 'Podpora predaja prispôsobená typu predajne.',
      items: [
        '📦 POS materiály — Stojany, shelf-talkery, plagáty s ambasádormi, produktové letáky',
        '🎓 Školenie personálu — Online modul (30 min), certifikácia "ENERVIT Expert"',
        '📣 Marketingová podpora — Účasť na športových akciách, spoločné promo kampane',
        '🚚 Logistika — Expedícia do 5 dní, individuálne závozy, doprava zadarmo nad 5 000 Kč',
      ],
    },
    conditions: {
      title: 'Kľúčové podmienky spolupráce',
      subtitle: 'Transparentné a flexibilné podmienky navrhnuté tak, aby spolupráca bola bezriziková.',
    },
    summary: {
      title: 'Zhrnutie ponuky',
      subtitle: 'Váš Key Account Manager',
    },
    thankyou: {
      title: 'Ďakujeme za váš čas',
      subtitle: 'Veríme, že ENERVIT bude skvelým doplnením vášho sortimentu.',
    },
    ui: {
      title: 'Obchodná prezentácia',
      subtitle: 'Vytvorte profesionálnu prezentáciu pre partnera',
    },
  },
  en: {
    title: {
      title: 'Business Proposal',
      subtitle: 'Premium sports nutrition for your customers',
      description: 'Complete business proposal including pricing terms',
    },
    brand_intro: {
      title: 'About ENERVIT',
      subtitle: 'The Positive Nutrition Company · Since 1954',
      description: 'ENERVIT is a premium Italian sports nutrition brand that has been developing products in collaboration with top athletes and sports scientists since 1954. The brand is distributed in 44 countries worldwide and is the market leader in Italy.',
      items: [
        '70+ years of experience — one of the oldest sports nutrition brands in Europe',
        'Scientific approach — own research center, university collaborations',
        'Patented C2:1 technology — maximum energy absorption',
        'World-class ambassadors — Sinner, Pogačar, Del Toro, Puppi',
        'Certified sustainability — EcoVadis Silver Medal',
      ],
    },
    ambassadors: {
      title: 'World-Class Ambassadors',
      subtitle: 'Multi-sport DNA: Cycling · Tennis · Running · Trail Running · Triathlon · Cross-country Skiing',
    },
    product_lines: {
      title: 'Three Specialized Product Lines',
      subtitle: 'ENERVIT portfolio covers all athlete needs — from recreational runners to professional endurance athletes.',
    },
    portfolio: {
      title: 'Complete Portfolio for Every Phase of Sport',
      subtitle: 'C2:1 Technology — patented carbohydrate ratio maltodextrin:fructose = 2:1 enables up to 40% higher energy absorption.',
    },
    why_enervit: {
      title: 'Why ENERVIT?',
      subtitle: 'ENERVIT brings synergy with your sports equipment assortment.',
      items: [
        '💰 Premium products — 35% discount from RRP. Higher selling price = higher absolute profit per unit.',
        '🎯 Your customers — Active athletes buying equipment from you = ideal target group.',
        '🏆 Premium positioning — ENERVIT strengthens your image as a sports expert.',
        '📦 Complete support — POS materials, staff training, marketing support.',
        '🔄 Zero stock risk — Product exchange 60 days before expiry. Delivery within 5 business days.',
        '📈 Growth segment — European sports nutrition market growing +8% annually.',
      ],
    },
    pricing: {
      title: 'Pricing Terms',
      subtitle: 'We offer 35% discount from the recommended retail price (RRP incl. VAT).',
    },
    planogram: {
      title: 'Recommended Planogram — 90 cm Shelf',
      subtitle: 'Designed for a standard 90 cm shelf with 3 levels. Total 21 SKUs.',
    },
    support: {
      title: 'What We Provide',
      subtitle: 'Sales support tailored to your store type.',
      items: [
        '📦 POS materials — Displays, shelf talkers, ambassador posters, product leaflets',
        '🎓 Staff training — Online module (30 min), "ENERVIT Expert" certification',
        '📣 Marketing support — Sports event participation, joint promo campaigns',
        '🚚 Logistics — Shipping within 5 days, individual deliveries, free shipping over 5,000 CZK',
      ],
    },
    conditions: {
      title: 'Key Cooperation Terms',
      subtitle: 'Transparent and flexible terms designed for risk-free cooperation.',
    },
    summary: {
      title: 'Proposal Summary',
      subtitle: 'Your Key Account Manager',
    },
    thankyou: {
      title: 'Thank You for Your Time',
      subtitle: 'We believe ENERVIT will be a great addition to your assortment.',
    },
    ui: {
      title: 'Business Presentation',
      subtitle: 'Build a professional presentation for your partner',
    },
  },
};

export function t(locale: Locale, slideKey: string): SlideContent {
  return translations[locale]?.[slideKey] || translations.cs[slideKey] || { title: slideKey };
}

export default translations;
