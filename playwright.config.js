const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 1,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'on-failure' }],
    ['list']
  ],

  timeout: 60 * 1000,
  expect: {
    timeout: 10 * 1000,
  },

  use: {
    baseURL: 'http://localhost:3000',
    headless: false,
    screenshot: 'on',
    video: {
      mode: 'on',
      size: { width: 1920, height: 1080 }
    },
    trace: 'on-first-retry',
    actionTimeout: 15 * 1000,
    navigationTimeout: 30 * 1000,
    launchOptions: {
      slowMo: 500,
    },
    viewport: { width: 1920, height: 1080 },
    locale: 'en-US',
    timezoneId: 'Asia/Manila',
  },

  outputDir: './test-results',

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});
