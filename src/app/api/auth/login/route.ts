import { signIn } from '@/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  let body: { email: string; password: string };

  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    await signIn('credentials', {
      redirect: false,
      email: body.email,
      password: body.password,
    });

    return NextResponse.json({ message: 'Authenticated' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}
