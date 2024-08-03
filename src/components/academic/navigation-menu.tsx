'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  BookmarkIcon,
  HamburgerMenuIcon,
  HomeIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { UserRole } from '@prisma/client';

export const NavigationMenu = ({ userRole }: { userRole: UserRole }) => {
  const router = useRouter();

  const handleRedirect = (value: string) => {
    router.push(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'}>
          <HamburgerMenuIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              handleRedirect('/academic');
            }}
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            <span>Inicio</span>
          </DropdownMenuItem>

          {userRole === UserRole.ADMIN && (
            <DropdownMenuItem
              onClick={() => {
                handleRedirect('/academic/register');
              }}
            >
              <PersonIcon className="mr-2 h-4 w-4" />
              <span>Registrar</span>
            </DropdownMenuItem>
          )}

          {userRole === UserRole.STUDENT && (
            <DropdownMenuItem
              onClick={() => {
                handleRedirect('/academic/period');
              }}
            >
              <BookmarkIcon className="mr-2 h-4 w-4" />
              <span>Calificaciones</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
