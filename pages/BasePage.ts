import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage encapsulates the common operations that every Page Object
 * shares (navigation, waits, URL/title assertions). Concrete page
 * objects should extend this class instead of duplicating logic.
 */
export abstract class BasePage {
  protected readonly page: Page;

  /**
   * Path relative to the configured `baseURL`. Subclasses MUST override
   * this so `goto()` works without arguments.
   */
  protected abstract readonly path: string;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the page using its configured `path`. Waits for the DOM
   * to be loaded which gives stable starting state for tests.
   */
  async goto(): Promise<void> {
    await this.page.goto(this.path, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Returns the current URL of the page under test.
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Assert that the current URL contains the expected fragment.
   */
  async expectUrlToContain(expected: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(
      typeof expected === 'string' ? new RegExp(expected) : expected,
    );
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
