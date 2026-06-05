import { test as base } from '@playwright/test';
import { LoginPage } from '../pages';

type LoginCredentials = {
  credentials: { username: string; password: string };
};

type PageObjects = {
  loginPage: LoginPage;
 
};

const credentials = base.extend<LoginCredentials>({
  credentials: async ({}, use) => {
    const allEnv: Record<string, { username: string; password: string }> = {
      qa: { username: 'student', password: 'Password123' },
      staging: { username: 'student', password: 'Password123' },
      production: { username: 'student', password: 'Password123' }
    }
    const env = process.env.ENV || 'qa';
    
    await use(allEnv[env] || allEnv.qa);
  },
});

export const test = credentials.extend<PageObjects>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from '@playwright/test';
