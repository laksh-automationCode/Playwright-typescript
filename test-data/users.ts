import type { LoginCredentials } from '../pages/LoginPage';

/**
 * Centralised test data. Real projects should source secrets from
 * environment variables or a secret manager; the practice site
 * publishes these credentials openly so they are safe to commit.
 */
export const users = {
  validUser: {
    username: 'student',
    password: 'Password123',
  },
  invalidUsername: {
    username: 'incorrectUser',
    password: 'Password123',
  },
  invalidPassword: {
    username: 'student',
    password: 'incorrectPassword',
  },
} as const satisfies Record<string, LoginCredentials>;

export type UserKey = keyof typeof users;
