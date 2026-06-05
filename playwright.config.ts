import { defineConfig, devices } from '@playwright/test';
/**
 * Pick the env via `ENV=qa=staging npx playwright test`.
 * Defaults to `qa` when unset.
 */
const envConfig: Record<string, { baseURL: string }> = {
  qa: {
    baseURL: 'https://practicetestautomation.com',
  },
  staging: {
    baseURL: '',
  },
  production: {
    baseURL: '',
  },
};

const ENV = process.env.ENV || 'qa'


export default defineConfig({
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 60 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  /* Run tests in files in parallel. */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left `test.only` in source. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only. */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Where screenshots, videos, traces and other per-test artifacts land. */
  outputDir: 'reports/test-results',
  /* Reporters: human-friendly list locally, HTML + JSON saved under reports/. */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
  ],

  /* Shared settings for all projects. */
  use: {
    baseURL: envConfig[ENV].baseURL,
    actionTimeout: 15 * 1000,
    navigationTimeout: 30 * 1000,
    headless: true,
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  /* Cross-browser projects. */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
