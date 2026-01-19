const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    baseURL: 'https://www.marwadichandaranagroup.com',
    headless: false,
    slowMo: 1000   // 👈 1 second delay between actions
  }
});
