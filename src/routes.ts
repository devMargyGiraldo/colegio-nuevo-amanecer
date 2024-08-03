/**
 * An array of public routes that do not require authentication.
 * These routes are accessible to all users.
 * @type {string[]}
 */

export const publicRoutes: string[] = ['/', '/events'];

/**
 * An array of protected routes that require authentication.
 * These routes will redirect logged in users to /settings.
 * @type {string[]}
 */

export const authRoutes: string[] = [
  '/auth/login',
  '/auth/error',
  '/auth/reset',
  '/auth/new-password',
];

/**
 * The prefix for API authenticationr routes.
 * Routes that start with this prefix are used from the API authentication purposes.
 * @type {string}
 */

export const apiAuthPrefix: string = '/api/auth';

/**
 * The default redirect path after a successful login.
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = '/academic';
