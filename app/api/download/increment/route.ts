import { NextResponse } from 'next/server';
import arcjet from '@/lib/arcjet';
import { getAuth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  const { userId } = getAuth(req);
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('remote-addr');

  const decision = await arcjet.protect(req, {
    userId: userId ?? ip ?? 'anonymous',
    max: 10,
    window: '1d',
  });

  if (decision.isDenied()) {
    return new NextResponse('Too many requests', { status: 429 });
  }

  const res = await fetch(`http://localhost:8080/downloads/${userId ?? ip}`,
    {
      method: 'POST',
    }
  );

  if (!res.ok) {
    return new NextResponse('Failed to increment download count', {
      status: 500,
    });
  }

  return new NextResponse('OK', { status: 200 });
}
