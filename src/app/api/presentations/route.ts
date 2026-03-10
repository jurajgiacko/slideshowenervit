import { NextRequest, NextResponse } from 'next/server';
import { getAllPresentations, createPresentation } from '@/lib/store';

export async function GET() {
  const presentations = getAllPresentations();
  return NextResponse.json(presentations);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { partnerName, partnerNameShort, partnerLogoPath, discount, pinCode, salesperson } = body;

    if (!partnerName || !partnerNameShort || !pinCode || !salesperson?.name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const presentation = createPresentation({
      partnerName,
      partnerNameShort: partnerNameShort || partnerName,
      partnerLogoPath: partnerLogoPath || '',
      discount: Number(discount) || 35,
      pinCode,
      salesperson: {
        name: salesperson.name,
        role: salesperson.role || 'Sales Manager',
        initials: salesperson.initials || salesperson.name.split(' ').map((w: string) => w[0]).join('').toUpperCase(),
        phone: salesperson.phone || '',
        email: salesperson.email || '',
      },
    });

    return NextResponse.json(presentation, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Invalid request body';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
