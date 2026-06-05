import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

 
  async goto(): Promise<void> {
    await this.page.goto('/practice-test-login/', { waitUntil: 'domcontentloaded' });
  }

 
  getUrl(): string {
    return this.page.url();
  }

  async expectUrlToContain(expected: string ): Promise<void> {
    await expect(this.page).toHaveURL(expected);
    
  }
  /**
   * Assert the page title matches the supplied value (string or RegExp).
   */
  async expectTitle(expected: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(expected);
  }

  /**
   * Waits for a locator to be visible. Useful as a single source of
   * truth for visibility waits across page objects.
   */
  protected async waitForVisible(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }
}
