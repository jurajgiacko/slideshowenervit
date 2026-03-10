export interface TeamMember {
  key: string;
  name: string;
  role: string;
  region: string;
  email: string;
  phone: string;
  photo: string;
}

export const teamMembers: Record<string, TeamMember> = {
  'karolina.calda': {
    key: 'karolina.calda',
    name: 'Karolína Calda',
    role: 'B2B Sales Manager',
    region: 'Praha & střední Čechy',
    email: 'karolina.calda@vitarsport.cz',
    phone: '+420 777 XXX XXX',
    photo: '/team/karolina.jpg',
  },
  'jiri.gois': {
    key: 'jiri.gois',
    name: 'Jiří Gois',
    role: 'B2B Sales Representative',
    region: 'Morava & Slovensko',
    email: 'jiri.gois@vitarsport.cz',
    phone: '+420 777 XXX XXX',
    photo: '/team/jirka.jpg',
  },
  'stepan.frysara': {
    key: 'stepan.frysara',
    name: 'Štěpán Fryšara',
    role: 'B2B Sales Representative',
    region: 'Slovensko & Retail CZ',
    email: 'stepan.frysara@vitarsport.cz',
    phone: '+420 777 XXX XXX',
    photo: '/team/stepan.jpg',
  },
  general: {
    key: 'general',
    name: 'VITAR Sport s.r.o.',
    role: 'Exclusive Distributor CZ & SK',
    region: 'Česko & Slovensko',
    email: 'info@vitarsport.cz',
    phone: '+420 XXX XXX XXX',
    photo: '/team/vitar-logo.png',
  },
};
