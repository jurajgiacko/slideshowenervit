export interface SlideDefinition {
  id: number;
  key: string;
  category: 'brand' | 'product' | 'events' | 'partnership' | 'contact';
  required: boolean;
  defaultEnabled: boolean;
}

export const slideDefinitions: SlideDefinition[] = [
  { id: 1, key: 'title', category: 'brand', required: true, defaultEnabled: true },
  { id: 2, key: 'brand_intro', category: 'brand', required: false, defaultEnabled: true },
  { id: 3, key: 'enervit_products', category: 'product', required: false, defaultEnabled: true },
  { id: 4, key: 'royalbay', category: 'product', required: false, defaultEnabled: true },
  { id: 5, key: 'events', category: 'events', required: false, defaultEnabled: true },
  { id: 6, key: 'partnerships', category: 'partnership', required: false, defaultEnabled: true },
  { id: 7, key: 'b2b_program', category: 'partnership', required: false, defaultEnabled: true },
  { id: 8, key: 'contact', category: 'contact', required: true, defaultEnabled: true },
];

export const categoryLabels: Record<string, Record<string, string>> = {
  brand: { cs: 'Značka', sk: 'Značka', en: 'Brand' },
  product: { cs: 'Produkty', sk: 'Produkty', en: 'Products' },
  events: { cs: 'Eventy', sk: 'Eventy', en: 'Events' },
  partnership: { cs: 'Partnerství', sk: 'Partnerstvo', en: 'Partnership' },
  contact: { cs: 'Kontakt', sk: 'Kontakt', en: 'Contact' },
};
