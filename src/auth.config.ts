import { type NextAuthConfig } from 'next-auth';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from './schemas';
import { getUserByEmail } from './services/user';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateValues = LoginSchema.safeParse(credentials);
        if (validateValues.success) {
          const { email, password } = validateValues.data;
          const user = await getUserByEmail(email);

          if (!user) {
            throw new Error('Correo o contraseña inválidos');
          }

          const isValid = await bcrypt.compare(password, user.password);

          if (!isValid) {
            throw new Error('Correo o contraseña inválidos');
          }

          return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
