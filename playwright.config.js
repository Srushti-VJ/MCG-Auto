const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 60000, // 30 seconds timeout for all actions
  use: {
    baseURL: 'https://www.marwadichandaranagroup.com',
    headless: false,
    slowMo: 1000   // 👈 1 second delay between actions
  }
});
