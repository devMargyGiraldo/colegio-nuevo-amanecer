import { ContentTabs } from '@/components/home/content-tabs';
import { HeroHome } from '@/components/home/hero-home';

export default async function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="flex w-full flex-col items-center md:gap-4">
        <HeroHome>
          <ContentTabs />
        </HeroHome>
      </div>
    </main>
  );
}
