import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Correo electrónico requerido' })
    .email({ message: 'Correo electrónico inválido' }),

  password: z
    .string()
    .min(1, { message: 'Contraseña requerida' })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
});
