import fs from 'fs';
import path from 'path';
import type { PresentationData } from './template';

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'presentations.json');

function readAll(): PresentationData[] {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeAll(data: PresentationData[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export function getAllPresentations(): PresentationData[] {
  return readAll();
}

export function getPresentationBySlug(slug: string): PresentationData | undefined {
  return readAll().find((p) => p.slug === slug);
}

export function getPresentationById(id: string): PresentationData | undefined {
  return readAll().find((p) => p.id === id);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function createPresentation(
  input: Omit<PresentationData, 'id' | 'slug' | 'createdAt' | 'status'>
): PresentationData {
  const all = readAll();
  const baseSlug = slugify(input.partnerNameShort || input.partnerName);
  let slug = baseSlug;
  let counter = 1;
  while (all.some((p) => p.slug === slug)) {
    slug = `${baseSlug}-${counter++}`;
  }

  const presentation: PresentationData = {
    ...input,
    id: slug,
    slug,
    createdAt: new Date().toISOString().split('T')[0],
    status: 'active',
  };

  all.push(presentation);
  writeAll(all);
  return presentation;
}

export function updatePresentation(
  id: string,
  updates: Partial<Omit<PresentationData, 'id' | 'slug' | 'createdAt'>>
): PresentationData | null {
  const all = readAll();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  all[idx] = { ...all[idx], ...updates };
  writeAll(all);
  return all[idx];
}

export function deletePresentation(id: string): boolean {
  const all = readAll();
  const filtered = all.filter((p) => p.id !== id);
  if (filtered.length === all.length) return false;
  writeAll(filtered);
  return true;
}
