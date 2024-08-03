import {
  DialogHeader,
  Dialog,
  DialogDescription,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { getUser } from '@/lib/utils';
import { ChangePasswordForm } from './change-password-form';

export const ChangePassword = async () => {
  const user = await getUser();
  return (
    <div className="flex w-full items-center justify-center pt-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link">Cambiar contrasena? </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[1000px]">
          <DialogHeader>
            <DialogTitle>Cambiar contrasena</DialogTitle>
            <DialogDescription>
              Aqui puedes cambiar tu contrasena
            </DialogDescription>
          </DialogHeader>
          <div className="w-[350px] md:w-full">
            <ChangePasswordForm userId={user.id} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
