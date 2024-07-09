import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { Poppins } from 'next/font/google';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export const HeroHome = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div
        className={`flex w-full flex-col items-center justify-center pt-2 text-gray-900 ${font.className}`}
      >
        <p className="text-center text-sm font-bold underline underline-offset-4">
          BIENVENIDOS
        </p>
        <h1 className="p-0 text-center text-lg font-bold">
          COLEGIO NUEVO AMANECER
        </h1>
      </div>

      <div className="mt-4 flex w-full flex-col gap-4 px-2 md:flex-row">
        <AspectRatio ratio={16 / 9} className="bg-muted md:h-1/2">
          <Image
            src={'/img/children-home-page.webp'}
            alt="Children Home Page"
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
        {children}
      </div>
    </>
  );
};
