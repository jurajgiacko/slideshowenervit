export interface TeamMember {
  key: string;
  name: string;
  role: string;
  region: string;
  email: string;
  phone: string;
}

export const teamMembers: Record<string, TeamMember> = {
  'karolina.calda': {
    key: 'karolina.calda',
    name: 'Karolína Calda',
    role: 'Sales Manager',
    region: 'Praha & střední Čechy',
    email: 'calda.karolina@vitarsport.cz',
    phone: '+420 724 963 739',
  },
  'jiri.gois': {
    key: 'jiri.gois',
    name: 'Jiří Gois',
    role: 'Sales Manager',
    region: 'Morava & Slovensko',
    email: 'gois.jiri@vitarsport.cz',
    phone: '+420 XXX XXX XXX',
  },
  'stepan.frysara': {
    key: 'stepan.frysara',
    name: 'Štěpán Fryšara',
    role: 'Sales Manager',
    region: 'Slovensko & Retail CZ',
    email: 'frysara.stepan@vitarsport.cz',
    phone: '+420 XXX XXX XXX',
  },
  general: {
    key: 'general',
    name: 'VITAR Sport s.r.o.',
    role: 'Exkluzivní distributor ENERVIT pro ČR a SR',
    region: 'Česko & Slovensko',
    email: 'info@vitarsport.cz',
    phone: '+420 XXX XXX XXX',
  },
};
