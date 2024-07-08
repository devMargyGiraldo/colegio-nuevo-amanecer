'use server';

import { z } from 'zod';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedValues = LoginSchema.safeParse(values);

  if (!validatedValues.success) {
    return {
      error: 'Email o contraseña inválidos. Por favor intenta de nuevo.',
    };
  }

  try {
    await signIn('credentials', {
      email: validatedValues.data.email,
      password: validatedValues.data.password,
      redirectTo: '/',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error:
          error.cause?.err?.message ||
          'Algo salio mal. Por favor intenta de nuevo.',
      };
    }
    throw error;
  }
};
