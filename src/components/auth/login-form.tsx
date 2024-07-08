'use client';

import Link from 'next/link';

import { z } from 'zod';
import { Form } from '@/components/shared/form';
import { LoginSchema } from '@/schemas';
import { Button } from '../ui/button';
import { useTransition } from 'react';
import { login } from '@/actions/login';
import { toast } from 'sonner';

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(data).then((response) => {
        if (response?.error) {
          toast.error('Error', {
            description: response.error,
          });
        }
      });
    });
  };

  return (
    <>
      <Form
        zodSchema={LoginSchema}
        fields={[
          {
            name: 'email',
            label: 'Correo electrónico',
            defaultValue: '',
            placeholder: 'john.doe@ejemplo.com',
            type: 'email',
            description: 'Ingresa el correo electrónico asociado a tu cuenta',
            pending: isPending,
          },
          {
            name: 'password',
            label: 'Contraseña',
            defaultValue: '',
            placeholder: '********',
            type: 'password',
            description: 'Ingresa tu contraseña',
            pending: isPending,
          },
        ]}
        onSubmit={onSubmit}
        buttonLabel={'Login'}
      />
      <Button size={'sm'} variant={'link'} className="px-0 font-normal" asChild>
        <Link href={'/auth/reset'}>Olvidaste tu contraseña?</Link>
      </Button>
    </>
  );
};
