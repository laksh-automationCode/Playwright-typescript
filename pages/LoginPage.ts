import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';


export class LoginPage extends BasePage {

  private  usernameInput: Locator;
  private  passwordInput: Locator;
  private  submitButton: Locator;
  private  errorMessage: Locator;

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
  async login(username: string, password: string): Promise<void> {
    await this.waitForVisible(this.usernameInput);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  /**
   * Assert that the error banner is shown with the expected text.
   */
  async expectErrorMessage(expected: string): Promise<void> {
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
