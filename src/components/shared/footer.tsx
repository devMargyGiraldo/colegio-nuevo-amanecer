import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import React from 'react';
import { RoutesIcons } from '@/components/shared/routes-icons';
import { auth } from '@/auth';
import { LogoutButton } from '@/components/shared/logout-button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import { getInitials } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export const Footer = async () => {
  const session = await auth();
  const user = session?.user;

  const fallbackName = getInitials(user?.name || '');

  return (
    <footer className="fixed bottom-0 h-16 w-full px-2 pb-2">
      <Card className="flex h-full items-center justify-between p-2 md:justify-center">
        <div className="flex items-center justify-center gap-x-4 px-4">
          <RoutesIcons />
        </div>
        <div className="md:absolute md:right-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  <Avatar>
                    <AvatarImage
                      src={user?.image ? user.image : ''}
                      alt="user-image"
                    />
                    <AvatarFallback className="text-xs">
                      {fallbackName}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Configuracion</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
