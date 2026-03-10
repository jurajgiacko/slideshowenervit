const users: Record<string, string> = {
  'admin': 'EnervitBoss2025!',
  'karolina.calda': 'SprintKral1ca#',
  'jiri.gois': 'MaratonMan42km',
  'stepan.frysara': 'TriathlonTurbo3!',
  'tomas.cervinka': 'PowerGel4Ever#',
  'vladimir.polasek': 'IsoCarb2Win!',
  'pozar.jindrich': 'RecoveryPro2025#',
  'adela.hrubosova': 'EnergyBoost2026!',
  'opinest': 'EcommGrowth2026#',
};

export function validateCredentials(username: string, password: string): boolean {
  const user = username.toLowerCase().trim();
  return users[user] === password;
}

export function getUserDisplayName(username: string): string {
  const names: Record<string, string> = {
    'admin': 'Admin',
    'karolina.calda': 'Karolína Calda',
    'jiri.gois': 'Jiří Goiš',
    'stepan.frysara': 'Štěpán Fryšara',
    'tomas.cervinka': 'Tomáš Červinka',
    'vladimir.polasek': 'Vladimír Polášek',
    'pozar.jindrich': 'Jindřich Požár',
    'adela.hrubosova': 'Adéla Hrubošová',
    'opinest': 'Opinest Agency',
  };
  return names[username.toLowerCase().trim()] || username;
}
