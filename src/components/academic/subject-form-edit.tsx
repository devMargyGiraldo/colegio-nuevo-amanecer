'use client';

import Link from 'next/link';

import { z } from 'zod';
import { Form } from '@/components/shared/form';
import { LoginSchema } from '@/schemas';
import { Button } from '../ui/button';
import { useTransition } from 'react';
import { login } from '@/actions/login';
import { toast } from 'sonner';
import { Subject } from '@prisma/client';

export const subjectEditSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'El nombre de la asignatura es requerido' }),
});

export const SubjectEditForm = ({ data }: { data: Subject }) => {
  const [isPending, startTransition] = useTransition();
  const onSubmit = (formData: z.infer<typeof subjectEditSchema>) => {
    startTransition(() => {});

    toast.success('Asignatura actualizada');
  };

  return (
    <Form
      zodSchema={subjectEditSchema}
      fields={[
        {
          name: 'name',
          label: 'Nombre asignatura',
          defaultValue: data.name,
          placeholder: 'Matematicas',
          type: 'text',
          description: 'Ingresa el nombre de la asignatura',
          pending: isPending,
        },
      ]}
      onSubmit={onSubmit}
      buttonLabel={'Actualizar'}
      buttonStatus={isPending}
    />
  );
};
