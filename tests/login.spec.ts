import { test, expect } from '../fixtures/pages.fixture';

test.describe('Practice Test Automation - Login', () => {
  test.beforeEach(async ({ loginPage, credentials }) => {
    await loginPage.goto();

  });

  test('@smoke Verify successful login', async ({
    loginPage,
    credentials,
  }) => {
    await loginPage.login(credentials.username, credentials.password);
    expect(loginPage.getUrl()).toContain('practicetestautomation.com/logged-in-successfully/');
  });

  test('Verify page title', async ( {loginPage }) => {  
    await loginPage.assertPageTitle();
  });

});
