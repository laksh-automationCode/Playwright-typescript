import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for the post-login success page:
 * https://practicetestautomation.com/logged-in-successfully/
 */
export class LoggedInPage extends BasePage {
  protected readonly path = '/logged-in-successfully/';

  private readonly successHeading: Locator;
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.successHeading = page.locator('h1.post-title, h1.entry-title').first();
    this.logoutButton = page.getByRole('link', { name: 'Log out' });
  }

  /**
   * Verifies all post-login signals required by the practice test spec:
   *   - URL contains `/logged-in-successfully/`
   *   - Page contains `Congratulations` or `successfully logged in`
   *   - Log out button is visible
   */
  async expectLoggedIn(): Promise<void> {
    await this.expectUrlToContain(/practicetestautomation\.com\/logged-in-successfully\/?/);
    await expect(this.successHeading).toContainText(
      /Logged In Successfully|Congratulations/i,
    );
    await expect(this.page.locator('body')).toContainText(
      /Congratulations|successfully logged in/i,
    );
    await expect(this.logoutButton).toBeVisible();
  }

  /**
   * Click the "Log out" link.
   */
  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}
