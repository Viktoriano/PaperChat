// This is a mock API route for checking chat room codes.
// Replace with real backend integration as needed.
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { code } = await request.json();
  // Simulate valid codes for demo purposes
  const validCodes = ['1234', 'abcd', 'test1'];
  if (typeof code === 'string' && validCodes.includes(code.trim().toLowerCase())) {
    return NextResponse.json({ valid: true });
  }
  return NextResponse.json({ valid: false }, { status: 404 });
}
