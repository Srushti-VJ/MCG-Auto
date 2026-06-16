const { defineConfig } = require('@playwright/test');

const isCI = !!process.env.CI;

module.exports = defineConfig({
  timeout: 60000,
  reporter: isCI
    ? [['html'], ['json', { outputFile: 'test-results.json' }]]
    : 'html',
  use: {
    baseURL: 'https://www.marwadichandaranagroup.com',
    headless: isCI,
    slowMo: isCI ? 0 : 1000,
  }
});
