import bcrypt from 'bcryptjs';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import generator from 'generate-password';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
