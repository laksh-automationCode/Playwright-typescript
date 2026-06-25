import { test, expect } from '../fixtures/pages.fixture';
import { LOGIN_PATH } from '../pages/BasePage';

test.describe('Practice Test Automation - Login', () => {
  test.beforeEach(async ({ page, loginPage}) => {
    await loginPage.goto();
    await page.waitForURL(LOGIN_PATH);
 
  });

  test('@smoke Verify successful login', async ({
    loginPage,
    credentials,
  }) => {
    await loginPage.login(credentials.username, credentials.password);
    await loginPage.assertLoggedInUrl();
  });

  test('Verify page title', async ( {loginPage }) => {  
    await loginPage.assertPageTitle();
  });

});
