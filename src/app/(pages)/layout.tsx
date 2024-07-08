import { Footer } from '@/components/shared/footer';

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="h-[calc(100dvh_-_4rem)] overflow-y-auto pb-4">
        {children}
      </div>
      <Footer />
    </>
  );
}
