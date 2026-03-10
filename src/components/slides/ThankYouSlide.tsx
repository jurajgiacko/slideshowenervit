'use client';

import { t, Locale } from '@/data/translations';
import { teamMembers } from '@/data/team';
import { PARTNER_LOGOS } from '@/lib/config';

interface Props { locale: Locale; salesPerson: string; partnerLogo?: string; partnerName?: string; }

export default function ThankYouSlide({ locale, salesPerson, partnerLogo, partnerName }: Props) {
  const content = t(locale, 'thankyou');
  const member = teamMembers[salesPerson] || teamMembers.general;
  const partner = partnerName || (partnerLogo ? PARTNER_LOGOS[partnerLogo]?.name : '') || '';

  return (
    <div className="slide bg-[var(--slide-bg)] text-white">
      <div className="slide-content text-center">
        <p className="text-sm text-white/30 uppercase tracking-[0.3em] mb-4 animate-fade-in-up animate-delay-1">
          The Positive Nutrition Company
        </p>

        <div className="mb-8 animate-fade-in-up animate-delay-2">
          <div className="w-16 h-16 bg-[#E3001B] rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-red-500/20">
            <span className="text-3xl font-black">E</span>
          </div>
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-up animate-delay-3">
          {content.title}
        </h2>

        <p className="text-lg text-white/50 font-light mb-8 max-w-xl mx-auto animate-fade-in-up animate-delay-4">
          {content.subtitle}
        </p>

        {partner && (
          <div className="mb-8 animate-fade-in-up animate-delay-4">
            <div className="inline-flex items-center gap-4">
              <div className="w-8 h-8 bg-[#E3001B] rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold">E</span>
              </div>
              <span className="text-white/20 text-lg">×</span>
              <span className="text-white/60 font-semibold">{partner}</span>
            </div>
          </div>
        )}

        <div className="text-white/30 text-sm animate-fade-in-up animate-delay-5">
          www.enervit.cz | {member.email} | {member.phone}
        </div>
        <div className="text-white/20 text-xs mt-2 animate-fade-in-up animate-delay-6">
          {member.name} | {member.role}
        </div>
      </div>
    </div>
  );
}
