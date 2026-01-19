export class AboutPage {
  constructor(page) {
    this.page = page;
  }

  async openAbout() {
    try {
      await this.page.goto('/about', {
        timeout: 60000,
        waitUntil: 'domcontentloaded',
      });

      await this.page.waitForLoadState('networkidle');
    } catch (error) {
      console.error('About page navigation failed:', error);
      throw error;
    }
  }

  async scrollAboutPage() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await this.page.waitForTimeout(2000);
  }
}
