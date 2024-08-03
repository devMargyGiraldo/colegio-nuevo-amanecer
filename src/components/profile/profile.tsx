import { auth } from '@/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { getUserByEmail } from '@/services/user';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ProfileForm } from './profile-form';
import { redirect } from 'next/navigation';
import { Separator } from '../ui/separator';
import { getInitials } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ChangePassword } from './change-password';

export const Profile = async () => {
  const session = await auth();

  const authUser = session?.user;

  const user = await getUserByEmail(authUser?.email || '');

  if (!user) {
    redirect('/auth/login');
  }

  const fallbackName = getInitials(user.name);

  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.image || ''} alt="user-image" />
              <AvatarFallback>{fallbackName}</AvatarFallback>
            </Avatar>

            <div className="flex w-full flex-col">
              <CardTitle className="self-end text-xl capitalize">
                {user.name}
              </CardTitle>
              <CardDescription className="self-end">
                {user.role}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <div className="p-4">
          <Separator className="w-full" />
        </div>
        <CardContent className="flex flex-col">
          <ProfileForm user={user} />

          <ChangePassword />
        </CardContent>
      </Card>
    </div>
  );
};
