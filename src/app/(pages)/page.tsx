import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ContentTabs } from '@/components/home/content-tabs';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export default async function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="flex w-full flex-col items-center md:gap-4">
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
          <ContentTabs />
        </div>
      </div>
    </main>
  );
}
