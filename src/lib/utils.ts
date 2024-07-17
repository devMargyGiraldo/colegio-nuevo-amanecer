import bcrypt from 'bcryptjs';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import generator from 'generate-password';
import db from '@/lib/db';
import { auth } from '@/auth';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUser = async () => {
  const session = await auth();

  if (!session) {
    throw new Error('You must be logged in to access this resource');
  }

  const { user } = session;
  if (!user) {
    throw new Error('User not found');
  }

  const userDb = await db.user.findUnique({
    where: {
      email: user.email || '',
    },
  });

  if (!userDb) {
    throw new Error('User not found');
  }

  return userDb;
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
};

export const generateTemporaryPassword = () => {
  return generator.generate({
    length: 10,
    numbers: true,
    uppercase: true,
    excludeSimilarCharacters: true,
    lowercase: true,
    symbols: false,
  });
};
