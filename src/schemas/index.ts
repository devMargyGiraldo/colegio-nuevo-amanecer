import { UserRole } from '@prisma/client';
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

export const profileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export const RegisterSchema = z.object({
  documentId: z
    .string()
    .min(1, { message: 'Documento de identidad requerido' }),
  name: z.string().min(1, { message: 'Nombre requerido' }),
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  role: z.enum([UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN], {
    message: 'Rol inválido',
  }),
  phoneNumber: z.string().min(1, { message: 'Número de contacto requerido' }),
  address: z.string().min(1, { message: 'Dirección requerida' }),
});
