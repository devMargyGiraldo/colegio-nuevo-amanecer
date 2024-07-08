import { signOut } from '@/auth';

const handleLogout = async () => {
  'use server';
  await signOut();
};

export const LogoutButton = () => {
  return (
    <form action={handleLogout}>
      <button type="submit">Cerrar sesión</button>
    </form>
  );
};
