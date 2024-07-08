'use client';

import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

const routesList = [
  { pathname: '/', Icon: HomeIcon },
  { pathname: '/events', Icon: CalendarDaysIcon },
  { pathname: '/academic', Icon: AcademicCapIcon },
];

const RouteIcon = ({
  pathname,
  actualPathName,
  Icon,
}: {
  pathname: string;
  actualPathName: string;
  Icon: typeof HomeIcon;
}) => {
  return (
    <>
      <Link href={pathname}>
        <Icon
          className={clsx(
            'h-8 w-8',
            actualPathName === pathname ? 'text-gray-800' : 'text-gray-300',
          )}
        />
      </Link>
      <Separator className="h-8" orientation="vertical" />
    </>
  );
};

export const RoutesIcons = () => {
  const actualPathName = usePathname();
  return (
    <>
      {routesList.map(({ pathname, Icon }) => (
        <RouteIcon
          pathname={pathname}
          actualPathName={actualPathName}
          Icon={Icon}
          key={pathname}
        />
      ))}
    </>
  );
};
