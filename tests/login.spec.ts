import { test, expect } from '../fixtures/pages.fixture';
import { users } from '../test-data/users';

test.describe('Practice Test Automation - Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.login(users.validUser);
  });

  test('TC-01 @smoke positive login redirects to the success page', async ({
    loginPage,
    loggedInPage,
    page,
  }) => {
    // await loginPage.login(users.validUser);

    await loggedInPage.expectLoggedIn();
    expect(page.url()).toContain('practicetestautomation.com/logged-in-successfully/');
  });

  // test('TC-02 negative login shows error for invalid username', async ({
  //   loginPage,
  // }) => {
  //   await loginPage.login(users.invalidUsername);

  //   await loginPage.expectErrorMessage('Your username is invalid!');
  //   await loginPage.expectUrlToContain(/practice-test-login\/?/);
  // });

  // test('TC-03 negative login shows error for invalid password', async ({
  //   loginPage,
  // }) => {
  //   await loginPage.login(users.invalidPassword);

  //   await loginPage.expectErrorMessage('Your password is invalid!');
  //   await loginPage.expectUrlToContain(/practice-test-login\/?/);
  // });

  test('TC-04 assert page title', async ({ page, loginPage }) => {  
    expect(page.url()).toContain('practicetestautomation.com/logged-in-successfully/');

    await loginPage.assertPageTitle();
  });

  // test('TC-05 assert page url', async ({ loginPage }) => {
  //   await loginPage.assertPageUrl();
  // });

});
