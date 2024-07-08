import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Link from 'next/link';
import { Header } from './header';
import { BackButton } from './back-button';

interface CardWrappedProps {
  children: React.ReactNode;
  headerTitle: string;
  headerLabel: string;
  backButtonLabel: string;
  backbuttonHref: string;
}

export const CardWrapped = ({
  children,
  headerTitle,
  headerLabel,
  backButtonLabel,
  backbuttonHref,
}: CardWrappedProps) => {
  return (
    <div className="w-full p-6">
      <Card className="shadow-md">
        <CardHeader>
          <Header title={headerTitle} label={headerLabel} />
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <BackButton label={backButtonLabel} href={backbuttonHref} />
        </CardFooter>
      </Card>
    </div>
  );
};
