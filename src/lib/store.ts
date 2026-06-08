import fs from 'fs';
import path from 'path';
import { createClient } from '@vercel/kv';
import type { PresentationData } from './template';
import seedData from '@/data/presentations.json';

const KV_KEY = 'presentations:v1';
const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'presentations.json');

// Vercel KV (Upstash). Connect a KV store in the Vercel dashboard and these
// env vars get injected automatically. When absent (local dev), we fall back
// to the JSON file on disk.
const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const kv = kvUrl && kvToken ? createClient({ url: kvUrl, token: kvToken }) : null;

const seed = seedData as unknown as PresentationData[];

function readFile(): PresentationData[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  } catch {
    return seed;
  }
}

async function readAll(): Promise<PresentationData[]> {
  if (kv) {
    const data = await kv.get<PresentationData[]>(KV_KEY);
    if (!data || !Array.isArray(data)) {
      // First run: seed KV from the committed JSON.
      await kv.set(KV_KEY, seed);
      return seed;
    }
    return data;
  }
  return readFile();
}

async function writeAll(data: PresentationData[]): Promise<void> {
  if (kv) {
    await kv.set(KV_KEY, data);
    return;
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getAllPresentations(): Promise<PresentationData[]> {
  return readAll();
}

export async function getPresentationBySlug(slug: string): Promise<PresentationData | undefined> {
  return (await readAll()).find((p) => p.slug === slug);
}

export async function getPresentationById(id: string): Promise<PresentationData | undefined> {
  return (await readAll()).find((p) => p.id === id);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function createPresentation(
  input: Omit<PresentationData, 'id' | 'slug' | 'createdAt' | 'status'>
): Promise<PresentationData> {
  const all = await readAll();
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
  await writeAll(all);
  return presentation;
}

export async function updatePresentation(
  id: string,
  updates: Partial<Omit<PresentationData, 'id' | 'slug' | 'createdAt'>>
): Promise<PresentationData | null> {
  const all = await readAll();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  all[idx] = { ...all[idx], ...updates };
  await writeAll(all);
  return all[idx];
}

export async function deletePresentation(id: string): Promise<boolean> {
  const all = await readAll();
  const filtered = all.filter((p) => p.id !== id);
  if (filtered.length === all.length) return false;
  await writeAll(filtered);
  return true;
}
