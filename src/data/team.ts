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
    region: 'Sever a západ ČR, Praha',
    email: 'calda.karolina@vitarsport.cz',
    phone: '+420 724 963 739',
  },
  'jiri.gois': {
    key: 'jiri.gois',
    name: 'Jiří Goiš',
    role: 'Sales Manager',
    region: 'Jih a východ ČR',
    email: 'gois.jiri@vitarsport.cz',
    phone: '+420 601 690 754',
  },
  'stepan.frysara': {
    key: 'stepan.frysara',
    name: 'Štěpán Fryšara',
    role: 'Sales Manager',
    region: 'Slovensko',
    email: 'frysara.stepan@vitarsport.cz',
    phone: '+420 606 048 557',
  },
  'juraj.giacko': {
    key: 'juraj.giacko',
    name: 'Juraj Giacko',
    role: 'Obchodní ředitel',
    region: 'Česko & Slovensko',
    email: 'giacko.juraj@vitarsport.cz',
    phone: '+420 604 319 719',
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
