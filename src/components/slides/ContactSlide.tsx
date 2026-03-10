'use client';

import { t, Locale } from '@/data/translations';
import { teamMembers, TeamMember } from '@/data/team';

interface Props {
  locale: Locale;
  salesPerson: string;
}

export default function ContactSlide({ locale, salesPerson }: Props) {
  const content = t(locale, 'contact');
  const member: TeamMember = teamMembers[salesPerson] || teamMembers.general;

  return (
    <div className="slide bg-[var(--slide-bg)] text-white">
      <div className="slide-content text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-3 animate-fade-in-up">
          {content.title}
        </h2>
        <p className="text-lg text-white/50 mb-12 animate-fade-in-up animate-delay-1">
          {content.subtitle}
        </p>

        <div className="business-card max-w-lg mx-auto animate-fade-in-up animate-delay-2">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#E3001B] to-[#0066B3] rounded-2xl flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white">{member.name}</h3>
              <p className="text-[#E3001B] text-sm font-medium">{member.role}</p>
              <p className="text-white/40 text-xs mt-0.5">{member.region}</p>
            </div>
          </div>

          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <span className="text-white/70 text-sm">{member.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <span className="text-white/70 text-sm">{member.phone}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#E3001B] rounded flex items-center justify-center">
                <span className="text-[10px] font-bold">E</span>
              </div>
              <div className="w-6 h-6 bg-[#0066B3] rounded flex items-center justify-center">
                <span className="text-[10px] font-bold">R</span>
              </div>
            </div>
            <span className="text-white/20 text-xs">VITAR Sport s.r.o.</span>
          </div>
        </div>

        <div className="mt-10 text-white/20 text-xs animate-fade-in-up animate-delay-4">
          www.enervit.cz • www.royalbay.cz • www.vitarsport.cz
        </div>
      </div>
    </div>
  );
}
