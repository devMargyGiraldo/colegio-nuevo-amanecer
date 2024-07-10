'use server';

import { generateTemporaryPassword, hashPassword } from '@/lib/utils';
import { RegisterSchema } from '@/schemas';
import { getUserByEmail } from '@/services/user';
import { z } from 'zod';
import db from '@/lib/db';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedValues = RegisterSchema.safeParse(values);

  if (!validatedValues.success) {
    return {
      error: 'Verifique los campos ingresados',
    };
  }

  const user = await getUserByEmail(validatedValues.data.email);

  if (user) {
    return {
      error: 'El correo electrónico ya está registrado',
    };
  }

  const temporaryPassword = generateTemporaryPassword();
  console.log(temporaryPassword);
  const hashedPassword = await hashPassword(temporaryPassword);

  try {
    await db.user.create({
      data: {
        ...validatedValues.data,
        password: hashedPassword,
      },
    });

    // TODO: Send email with temporary password

    return {
      message: 'Usuario registrado correctamente',
      description: `Se ha enviado una contraseña temporal a ${validatedValues.data.email}`,
    };
  } catch (error) {
    console.log(error);
    return {
      error: 'Error al registrar el usuario',
    };
  }
};
