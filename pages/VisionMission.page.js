export class VisionMissionPage {
  constructor(page) {
    this.page = page;
  }

  async openVisionMission() {
    try {
      await this.page.goto('/vision-mission', {
        timeout: 60000,
        waitUntil: 'domcontentloaded',
      });

      await this.page.waitForLoadState('networkidle');
    } catch (error) {
      console.error('Vision & Mission page navigation failed:', error);
      throw error;
    }
  }

  async scrollVisionMissionPage() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await this.page.waitForTimeout(2000);
  
  }
}
