export interface PresentationConfig {
  partner: string;
  logo: string; // key from predefined logos or 'custom'
  locale: 'cs' | 'sk' | 'en';
  slides: number[];
  salesPerson: string; // team member key
}

export function encodeConfig(config: PresentationConfig): string {
  return btoa(encodeURIComponent(JSON.stringify(config)));
}

export function decodeConfig(encoded: string): PresentationConfig | null {
  try {
    return JSON.parse(decodeURIComponent(atob(encoded)));
  } catch {
    return null;
  }
}

export const PARTNER_LOGOS: Record<string, { name: string; file: string }> = {
  intersport: { name: 'INTERSPORT', file: '/logos/intersport.svg' },
  sportisimo: { name: 'Sportisimo', file: '/logos/sportisimo.svg' },
  decathlon: { name: 'Decathlon', file: '/logos/decathlon.svg' },
  alza: { name: 'Alza.cz', file: '/logos/alza.svg' },
  globus: { name: 'Globus', file: '/logos/globus.svg' },
  general: { name: '', file: '' },
};
