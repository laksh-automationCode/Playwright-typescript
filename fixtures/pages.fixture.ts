import { test as base } from '@playwright/test';
import { LoginPage, LoggedInPage } from '../pages';

/**
 * Custom fixtures that inject page objects into every test. This keeps
 * specs focused on intent ("given a login page, when I login, then...")
 * and removes per-test boilerplate to construct page objects.
 *
 * Usage:
 *   import { test, expect } from '../fixtures/pages.fixture';
 *   test('...', async ({ loginPage }) => { ... });
 */
type PageObjects = {
  loginPage: LoginPage;
  loggedInPage: LoggedInPage;
};

export const test = base.extend<PageObjects>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  loggedInPage: async ({ page }, use) => {
    await use(new LoggedInPage(page));
  },
});

export { expect } from '@playwright/test';
