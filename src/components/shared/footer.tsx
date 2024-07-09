import Link from 'next/link';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RoutesIcons } from '@/components/shared/routes-icons';
import { auth } from '@/auth';
import { UserMenu } from '@/components/shared/user-menu';

export const Footer = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <footer className="fixed bottom-0 h-16 w-full px-2 pb-2">
      <Card className="flex h-full items-center justify-between p-2 md:justify-center">
        <div className="flex items-center justify-center gap-x-4 px-4">
          <RoutesIcons />
        </div>
        <div className="md:absolute md:right-4">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Button variant={'outline'} asChild>
              <Link href={'/auth/login'}>Login</Link>
            </Button>
          )}
        </div>
      </Card>
    </footer>
  );
};
