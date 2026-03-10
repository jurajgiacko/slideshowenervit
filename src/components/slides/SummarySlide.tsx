'use client';

import { t, Locale } from '@/data/translations';
import { teamMembers } from '@/data/team';

interface Props { locale: Locale; salesPerson: string; partnerLogo?: string; partnerName?: string; }

const benefits = {
  cs: [
    'Prémiovou italskou značku s globální reputací',
    'Tři specializované produktové řady',
    '35 % slevu z doporučené maloobchodní ceny',
    'Kompletní marketingovou a POS podporu',
    'Školení personálu + vstupní balíček vzorků',
    'Bezplatnou výměnu zboží 60 dní před expirací',
    'Individuální závozy na každou prodejnu',
    'Dodání do 5 pracovních dnů (skladové položky)',
    'Doprava zdarma nad 5 000 Kč',
    'Splatnost 30 dní, bez minimální objednávky',
    'Dedikovaného account managera',
  ],
  sk: [
    'Prémiovú taliansku značku s globálnou reputáciou',
    'Tri špecializované produktové rady',
    '35 % zľavu z doporučenej maloobchodnej ceny',
    'Kompletnú marketingovú a POS podporu',
    'Školenie personálu + vstupný balíček vzoriek',
    'Bezplatnú výmenu tovaru 60 dní pred expiráciou',
    'Individuálne závozy na každú predajňu',
    'Dodanie do 5 pracovných dní (skladové položky)',
    'Doprava zadarmo nad 5 000 Kč',
    'Splatnosť 30 dní, bez minimálnej objednávky',
    'Dedikovaného account managera',
  ],
  en: [
    'Premium Italian brand with global reputation',
    'Three specialized product lines',
    '35% discount from recommended retail price',
    'Complete marketing and POS support',
    'Staff training + starter sample pack',
    'Free product exchange 60 days before expiry',
    'Individual deliveries to each store',
    'Delivery within 5 business days (stock items)',
    'Free shipping over 5,000 CZK',
    'Payment terms: 30 days, no minimum order',
    'Dedicated account manager',
  ],
};

export default function SummarySlide({ locale, salesPerson }: Props) {
  const content = t(locale, 'summary');
  const member = teamMembers[salesPerson] || teamMembers.general;

  return (
    <div className="slide bg-[var(--slide-bg)] text-white">
      <div className="slide-content">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#E3001B] rounded-xl flex items-center justify-center">
            <span className="text-lg font-bold">E</span>
          </div>
          <span className="text-[#E3001B] text-sm font-semibold uppercase tracking-widest">Summary</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-in-up">{content.title}</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="animate-fade-in-up animate-delay-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-[#E3001B] font-extrabold text-3xl">35 %</div>
              <div className="text-white/30 text-xs uppercase tracking-wider">
                {locale === 'en' ? 'Discount from RRP' : 'Sleva z MOC'}
              </div>
              <div className="text-[#E3001B] font-extrabold text-3xl ml-4">80+</div>
              <div className="text-white/30 text-xs uppercase tracking-wider">
                {locale === 'en' ? 'Products' : 'Produktů'}
              </div>
            </div>

            <div className="text-xs text-white/30 uppercase tracking-wider font-medium mb-3">
              ✓ {locale === 'en' ? 'What you get' : locale === 'sk' ? 'Čo získate' : 'Co získáte spoluprací s ENERVIT'}:
            </div>
            <div className="space-y-2">
              {benefits[locale].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-[#4CAF50] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/60 text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-in-up animate-delay-3">
            <div className="text-xs text-white/30 uppercase tracking-wider font-medium mb-4">
              {content.subtitle}
            </div>
            <div className="business-card">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 bg-gradient-to-br from-[#E3001B] to-[#c5001a] rounded-2xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-[#E3001B] text-xs font-medium">{member.role}</p>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <span className="text-white/70 text-sm">{member.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <span className="text-white/70 text-sm">{member.email}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#E3001B] rounded flex items-center justify-center">
                    <span className="text-[10px] font-bold">E</span>
                  </div>
                  <span className="text-white/40 text-xs">ENERVIT</span>
                </div>
                <span className="text-white/20 text-xs">VITAR Sport s.r.o.</span>
              </div>
            </div>
            <p className="text-white/30 text-xs mt-4 italic">
              {locale === 'en'
                ? "Next step: I'll be happy to prepare a personal presentation and answer your questions."
                : locale === 'sk'
                  ? 'Ďalší krok: Rada vám pripravím osobnú prezentáciu a zodpoviem vaše otázky.'
                  : 'Další krok: Ráda vám připravím osobní prezentaci a zodpovím vaše dotazy.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
