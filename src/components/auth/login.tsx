import { LoginForm } from '@/components/auth/login-form';
import { CardWrapped } from './card-wrapped';

export const Login = () => {
  return (
    <CardWrapped
      headerTitle="🔐 Login"
      headerLabel="Bienvenido!"
      backButtonLabel="Volver al inicio"
      backbuttonHref="/"
    >
      <LoginForm />
    </CardWrapped>
  );
};
