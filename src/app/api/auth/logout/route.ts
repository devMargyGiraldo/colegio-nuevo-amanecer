import { signOut } from '@/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await signOut({ redirect: false });
    return NextResponse.json({ message: 'Logged out' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error logging out' }, { status: 401 });
  }
}
