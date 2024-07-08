import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

interface HeaderProps {
  title: string;
  label: string;
}

export const Header = ({ title, label }: HeaderProps) => {
  return (
    <header className="relative flex w-full flex-col items-center gap-y-4">
      <h1 className="absolute -top-10 rounded-lg bg-black p-2 text-xs font-semibold text-white">
        Colegio Nuevo Amanecer
      </h1>
      <h1 className={cn('text-3xl font-semibold', font.className)}>{title}</h1>
      <p className="text-muted-foregroun text-sm">{label}</p>
    </header>
  );
};
