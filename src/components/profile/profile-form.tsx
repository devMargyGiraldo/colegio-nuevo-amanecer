'use client';

import { Form } from '@/components/shared/form';
import { profileSchema } from '@/schemas';
import { User } from '@prisma/client';
import { useTransition } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { toast } from 'sonner';

export const ProfileForm = ({ user }: { user: User }) => {
  const [isPending, startTransition] = useTransition();
  const onSubmit = async (data: any) => {
    startTransition(() => {
      toast.error('No se puede actualizar el perfil');
    });
  };

  return (
    <>
      <Form
        zodSchema={profileSchema}
        fields={[
          {
            name: 'documentId',
            label: 'Documento de identidad',
            defaultValue: '1006118705',
            placeholder: '123456789',
            type: 'text',
            description: 'El número de tu documento de identidad',
            pending: true,
          },
          {
            name: 'name',
            label: 'Nombre',
            defaultValue: user.name,
            placeholder: 'John Doe',
            type: 'text',
            description: 'El nombre que aparecerá en tu perfil',
            pending: true,
          },
          {
            name: 'email',
            label: 'Correo Electronico',
            defaultValue: user.email,
            placeholder: 'john.due@example.com',
            type: 'email',
            description: 'El correo electrónico que usas para iniciar sesión',
            pending: true,
          },
        ]}
        onSubmit={onSubmit}
        buttonLabel={'Actualizar perfil'}
        buttonStatus={isPending}
      />
    </>
  );
};
