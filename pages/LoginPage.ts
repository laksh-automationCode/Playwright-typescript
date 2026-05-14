import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Credentials accepted by the login form.
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Page Object for the Practice Test Automation login page:
 * https://practicetestautomation.com/practice-test-login/
 *
 * Exposes only behaviour that has semantic meaning for tests
 * (`login`, `expectErrorMessage`, ...). All selectors are kept
 * private so the spec layer is decoupled from the DOM.
 */
export class LoginPage extends BasePage {
  protected readonly path = '/practice-test-login/';

  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('#submit');
    this.errorMessage = page.locator('#error');
                        
  }

  /**
   * Fill in credentials and submit the form.
   */
  async login(credentials: LoginCredentials): Promise<void> {
    await this.waitForVisible(this.usernameInput);
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.submitButton.click();
  }

  /**
   * Assert that the error banner is shown with the expected text.
   */
  async expectErrorMessage(expected: string | RegExp): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expected);
  }

  /**
   * Assert that the login form is rendered and ready for input.
   */
  async expectLoaded(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async assertPageTitle(): Promise<void> {
    const title = await this.page.title();
    await expect(this.page).toHaveTitle(title);
  }

  async assertPageUrl(): Promise<void> {
    await expect(this.page).toHaveURL('https://practicetestautomation.com/practice-test-login/');
  }
}
