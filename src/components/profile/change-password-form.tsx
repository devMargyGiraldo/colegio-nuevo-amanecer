'use client';

import { z } from 'zod';
import { Form } from '@/components/shared/form';
import { User } from '@prisma/client';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { changePasswordSchema } from '@/schemas';
import { changePassword } from '@/actions/profile';

export const ChangePasswordForm = ({ userId }: { userId: string }) => {
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
    startTransition(() => {
      changePassword(userId, data).then((response) => {
        if (response.error) {
          toast.error(response.error);
        } else if (response.success) {
          toast.success(response.success);
        }
      });
    });
  };

  return (
    <>
      <Form
        zodSchema={changePasswordSchema}
        fields={[
          {
            name: 'actualPassword',
            label: 'Contraseña actual',
            defaultValue: '',
            placeholder: '********',
            type: 'password',
            description: 'Tu contraseña actual',
            pending: isPending,
          },
          {
            name: 'newPassword',
            label: 'Nueva contraseña',
            defaultValue: '',
            placeholder: '********',
            type: 'password',
            description: 'Tu nueva contraseña',
            pending: isPending,
          },
        ]}
        onSubmit={onSubmit}
        buttonLabel={'Cambiar contraseña'}
        buttonStatus={isPending}
      />
    </>
  );
};
