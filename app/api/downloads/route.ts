import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(req: Request) {
  const { userId } = getAuth(req);
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('remote-addr');

  const res = await fetch(`http://localhost:8080/downloads/${userId ?? ip}`);

  if (!res.ok) {
    return new NextResponse('Failed to get download count', { status: 500 });
  }
  
  const count = await res.json();
  
  return NextResponse.json(count);
}