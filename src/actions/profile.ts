'use server';

import { z } from 'zod';
import db from '@/lib/db';
import { hashPassword } from '@/lib/utils';
import { changePasswordSchema } from '@/schemas';
import bcrypt from 'bcryptjs';

export const changePassword = async (
  userId: string,
  data: z.infer<typeof changePasswordSchema>,
) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      error: "User doesn't exist",
    };
  }

  const isValidPasswrod = await bcrypt.compare(
    data.actualPassword,
    user.password,
  );

  if (!isValidPasswrod) {
    return {
      error: 'Contraseña incorrecta',
    };
  }

  const newHashedPassword = await hashPassword(data.newPassword);

  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newHashedPassword,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: 'Error al cambiar la contraseña' };
  }

  return { success: 'Contraseña actualizada' };
};
