'use client';

import { useParams } from 'next/navigation';
import { decodeConfig } from '@/lib/config';
import PresentationViewer from '@/components/PresentationViewer';

export default function PresentationPage() {
  const params = useParams();
  const configStr = params.config as string;
  const config = decodeConfig(configStr);

  if (!config) {
    return (
      <div className="login-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#E3001B]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#E3001B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Prezentace nenalezena</h1>
          <p className="text-white/50 text-sm mb-8">
            Tento odkaz je neplatný nebo byl odstraněn.
          </p>
          <a
            href="https://www.enervit.cz"
            className="inline-flex px-6 py-3 bg-[#E3001B] hover:bg-[#c5001a] text-white font-medium rounded-xl transition"
          >
            Navštívit enervit.cz
          </a>
          <p className="text-white/20 text-xs mt-8">VITAR Sport s.r.o.</p>
        </div>
      </div>
    );
  }

  return (
    <PresentationViewer
      locale={config.locale}
      selectedSlides={config.slides}
      partnerLogo={config.logo}
      partnerName={config.partner}
      salesPerson={config.salesPerson}
    />
  );
}
