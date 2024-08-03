import { auth } from '@/auth';
import { getUserByEmail } from '@/services/user';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session?.user || !session?.user.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = await getUserByEmail(session.user.email);

    return NextResponse.json({
      id: user?.id,
      name: user?.name,
      role: user?.role,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
}
