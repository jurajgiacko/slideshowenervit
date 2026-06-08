import { NextResponse } from 'next/server';

// Temporary diagnostic — reports which KV/Redis related env var NAMES are
// present in the running deployment (no secret values). Safe to delete.
export async function GET() {
  const names = Object.keys(process.env).filter((k) =>
    /KV|UPSTASH|REDIS/i.test(k)
  );

  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  return NextResponse.json({
    relatedEnvNames: names,
    kvActive: Boolean(kvUrl && kvToken),
  });
}
