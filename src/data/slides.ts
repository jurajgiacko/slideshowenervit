export interface SlideDefinition {
  id: number;
  key: string;
  category: 'brand' | 'product' | 'offer' | 'logistics' | 'contact';
  required: boolean;
  defaultEnabled: boolean;
}

export const slideDefinitions: SlideDefinition[] = [
  { id: 1,  key: 'title',          category: 'brand',     required: true,  defaultEnabled: true },
  { id: 2,  key: 'brand_intro',    category: 'brand',     required: false, defaultEnabled: true },
  { id: 3,  key: 'ambassadors',    category: 'brand',     required: false, defaultEnabled: true },
  { id: 4,  key: 'product_lines',  category: 'product',   required: false, defaultEnabled: true },
  { id: 5,  key: 'portfolio',      category: 'product',   required: false, defaultEnabled: true },
  { id: 6,  key: 'why_enervit',    category: 'offer',     required: false, defaultEnabled: true },
  { id: 7,  key: 'pricing',        category: 'offer',     required: false, defaultEnabled: true },
  { id: 8,  key: 'planogram',      category: 'offer',     required: false, defaultEnabled: false },
  { id: 9,  key: 'support',        category: 'logistics', required: false, defaultEnabled: true },
  { id: 10, key: 'conditions',     category: 'logistics', required: false, defaultEnabled: true },
  { id: 11, key: 'summary',        category: 'contact',   required: true,  defaultEnabled: true },
  { id: 12, key: 'thankyou',       category: 'contact',   required: true,  defaultEnabled: true },
];

export const categoryLabels: Record<string, Record<string, string>> = {
  brand:     { cs: 'Značka',    sk: 'Značka',    en: 'Brand' },
  product:   { cs: 'Produkty',  sk: 'Produkty',  en: 'Products' },
  offer:     { cs: 'Nabídka',   sk: 'Ponuka',    en: 'Offer' },
  logistics: { cs: 'Podpora',   sk: 'Podpora',   en: 'Support' },
  contact:   { cs: 'Kontakt',   sk: 'Kontakt',   en: 'Contact' },
};
